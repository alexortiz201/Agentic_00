# `~/.claude/hooks/` — runtime-fired behaviours

These run because **the harness runs them**, not because an assistant remembered to. That is the whole point: a rule that depends on a model noticing a trigger is a rule that fails exactly when the session is busy, which is when it matters.

Wired in `~/.claude/settings.json` under the `hooks` key. Every script here **always exits 0** — a hook that errors must never block work. Exit 2 would block an action; nothing here ever uses it.

**None of these files may be a symlink.** They are what is supposed to survive when a symlink target goes away.

| Script | Event | Fires when | Emits |
|---|---|---|---|
| `guard_claude_md.sh` | `SessionStart` (`startup\|resume\|clear\|compact`) | every session, and again after compaction | `~/.claude/CRITICAL_RULES.md`, unconditionally — plus a loud banner if `~/.claude/CLAUDE.md` is dangling, empty or missing |
| `boot_memory.sh` | `SessionStart` (`startup\|clear`) | a fresh session only, not on resume/compact | the `boot memory` read order and the in-flight / blocked / next report format |
| `cleanup_on_stop_phrase.sh` | `UserPromptSubmit` | a prompt matches `stopping_phrases.txt` | the `clean_up_hook` sweep, **stopping-point** flavour — record where things stopped, do not delete |
| `cleanup_on_git.sh` | `PostToolUse` on `Bash`, narrowed by `if: "Bash(git *)"` | a `git commit` or `git push` just ran | the `clean_up_hook` sweep, **completion** flavour — update, clean, delete |

## Extending the stopping-point triggers

Edit **`stopping_phrases.txt`**. One extended regular expression per line, matched case-insensitively against the prompt; `#` comments and blank lines are ignored. No JSON to touch, no restart needed — the file is read on every prompt.

## Design notes worth knowing before changing anything

- **`cleanup_on_git.sh` matches on command position, not on mention.** The word must sit at the start of a line or straight after a separator, and comment lines are stripped before matching. Without that, any command that merely *talks about* committing — an `rg` for the phrase, a heredoc writing a script — fires it. This was caught live: the hook fired twice while being tested, on the test harness's own text. Verified against a 14-case matrix covering `-C <path>`, chained and piped forms, multi-line scripts, and the false-positive classes above.
- **`cleanup_on_git.sh` filters twice on purpose.** `settings.json` narrows with an `if` rule, and the script re-checks the command out of `tool_input.command` itself. The script's check is the guarantee: if `if` is ever unsupported or changes shape, the hook still stays silent on every non-git Bash call instead of firing on all of them.
- **`PostToolUse` must emit JSON.** Plain stdout from a `PostToolUse` hook is *not* added to the model's context — only `hookSpecificOutput.additionalContext` is, and it must be **nested** under `hookSpecificOutput`; a top-level `additionalContext` is silently ignored. `SessionStart` and `UserPromptSubmit` inject plain stdout directly, which is why those three scripts print text and this one prints JSON.
- **`UserPromptSubmit` has a 30-second timeout**, not the 10 minutes other events get. `cleanup_on_stop_phrase.sh` runs in ~25 ms and bails early on prompts over 600 characters, which are pasted material rather than a sign-off.
- **`cleanup_on_git.sh` debounces for 60 seconds** via `state/last_cleanup_reminder`, because `git commit && git push` is one landing and should produce one reminder. Delete the debounce block if a missed second sweep ever matters more than the duplicate.
- **`jq` is required** (`/usr/bin/jq`). Every script that needs it checks and exits 0 silently if it is absent, so a missing `jq` degrades to "hooks do nothing" rather than "everything breaks".

## Verifying a hook actually fires

```sh
# PostToolUse — should print JSON
echo '{"tool_input":{"command":"git commit -m x"}}' | ~/.claude/hooks/cleanup_on_git.sh
rm -f ~/.claude/hooks/state/last_cleanup_reminder   # clear the debounce between tries

# UserPromptSubmit — should print the stopping-point sweep
echo '{"prompt":"closing up shop"}' | ~/.claude/hooks/cleanup_on_stop_phrase.sh

# SessionStart
~/.claude/hooks/boot_memory.sh </dev/null
~/.claude/hooks/guard_claude_md.sh </dev/null
```

In a live session, `/hooks` lists what is registered, and `claude --debug` shows each hook running.

**If `cleanup_on_git.sh` never fires in a real session** but works standalone, the `if` rule is the suspect. Remove the `"if": "Bash(git *)"` line from `settings.json`; the script's own command check then does all the filtering, at the cost of one ~25 ms process spawn per Bash call.

## Watched symlinks

`guard_claude_md.sh` warns each session about symlinks in `~/.claude/` whose target has gone away — the same silent-failure class as a dangling `CLAUDE.md`, since a broken link reads as *absent* rather than as an error. The watch list is the `WATCHED_LINKS` variable at the top of that script, one path per line. `~/.claude/adws` is on it because it points into `~/agentic/`, which is being wiped.

## Restore on a new machine — NOT SOLVED

**There is no committed backup of these files.** `~/.claude/` is not a git repository, which is exactly why it survives every repo operation — and exactly why it has no history. A copy briefly lived in `~/agentic/claude-hooks/`; that repo is being wiped, so it is not a restore path.

When a successor private repo exists, take a committed copy of `hooks/`, `CRITICAL_RULES.md`, `CLAUDE.md` and `SHORTCUTS.md`, and re-enable a drift check in `guard_claude_md.sh` against it. See `~/.claude/CONFIG_SETUP.md` → *Still open*.
