# `hooks/` -- runtime-fired behaviours

These run because **the harness runs them**, not because an assistant remembered to. That is the whole point: a rule that depends on a model noticing a trigger is a rule that fails exactly when the session is busy, which is when it matters. The reasoning is [`foundations/Harness_Engineering/04_MECHANIZED_TRIGGERS.md`](../../../foundations/Harness_Engineering/04_MECHANIZED_TRIGGERS.md).

Wired in `settings.json` under the `hooks` key. Every script here **always exits 0** -- a hook that errors must never block work. Exit 2 would block an action; nothing here ever uses it.

**None of these files may be a symlink.** They are what is supposed to survive when a symlink target goes away.

| Script | Event | Fires when | Emits |
|---|---|---|---|
| `guard_claude_md.sh` | `SessionStart` (`startup\|resume\|clear\|compact`) | every session, and again after compaction | `CRITICAL_RULES.md`, unconditionally -- plus a loud banner if the global instruction file is dangling, empty or missing |
| `boot_memory.sh` | `SessionStart` (`startup\|clear`) | a fresh session only, not on resume or compact | the state-store read order and the in-flight / blocked / next report format |
| `cleanup_on_stop_phrase.sh` | `UserPromptSubmit` | a prompt matches `stopping_phrases.txt` | the reconciliation sweep, **stopping-point** flavour -- record where things stopped, do not delete |
| `cleanup_on_git.sh` | `PostToolUse` on `Bash`, narrowed by `if: "Bash(git *)"` | a `git commit` or `git push` just ran | the reconciliation sweep, **completion** flavour -- update, clean, delete |

## Placeholders in these scripts

`install.sh` substitutes them. If you copy by hand, substitute them by hand -- an unsubstituted script runs, exits 0, and emits a path that does not exist, which is the silent failure this whole directory exists to avoid.

| Placeholder | Means |
|---|---|
| `__STATE_ROOT__` | Absolute path to the repository holding the local state folders the sweep reconciles |
| `__SOLUTION__` | Name of the multi-repo grouping whose topology map the boot instruction points at |

## Extending the stopping-point triggers

Edit **`stopping_phrases.txt`**. One extended regular expression per line, matched case-insensitively against the prompt; `#` comments and blank lines are ignored. No JSON to touch, no restart needed -- the file is read on every prompt. **The set of triggers is the part that changes most often, which is why it is data in its own file rather than logic inside a script.**

## Design notes worth knowing before changing anything

- **`cleanup_on_git.sh` matches on command position, not on mention.** The word must sit at the start of a line or straight after a separator, and comment lines are stripped before matching. Without that, any command that merely *talks about* committing -- a search for the phrase, a heredoc writing a script -- fires it. This was caught live: the hook fired twice while being tested, on the test harness's own text. Verified against a 14-case matrix covering `-C <path>`, chained and piped forms, multi-line scripts, and the false-positive classes above.
- **`cleanup_on_git.sh` filters twice on purpose.** `settings.json` narrows with an `if` rule, and the script re-checks the command out of the payload itself. The script's check is the guarantee: if `if` is ever unsupported or changes shape, the hook still stays silent on every non-git call instead of firing on all of them.
- **`PostToolUse` must emit JSON.** Plain stdout from a `PostToolUse` hook is *not* added to the model's context -- only `hookSpecificOutput.additionalContext` is, and it must be **nested** under `hookSpecificOutput`; a top-level `additionalContext` is silently ignored. `SessionStart` and `UserPromptSubmit` inject plain stdout directly, which is why three of these scripts print text and one prints JSON.
- **`UserPromptSubmit` has a 30-second timeout**, not the ten minutes other events get. `cleanup_on_stop_phrase.sh` runs in roughly 25 ms and bails early on prompts over 600 characters, which are pasted material rather than a sign-off.
- **`cleanup_on_git.sh` debounces for 60 seconds** via `state/last_cleanup_reminder`, because a commit followed by a push is one landing and should produce one reminder. Delete the debounce block if a missed second sweep ever matters more than the duplicate.
- **`jq` is required.** Every script that needs it checks and exits 0 silently if it is absent, so a missing `jq` degrades to "hooks do nothing" rather than "everything breaks". Install it before concluding the hooks are broken.
- **`guard_claude_md.sh` must not depend on anything it might report as missing.** It is the detector; a detector that shares a fate with the thing it watches reports nothing at the exact moment it is needed.

## Verifying a hook actually fires

```sh
# PostToolUse -- should print JSON
echo '{"tool_input":{"command":"git commit -m x"}}' | ~/.claude/hooks/cleanup_on_git.sh
rm -f ~/.claude/hooks/state/last_cleanup_reminder   # clear the debounce between tries

# UserPromptSubmit -- should print the stopping-point sweep
echo '{"prompt":"closing up shop"}' | ~/.claude/hooks/cleanup_on_stop_phrase.sh

# SessionStart
~/.claude/hooks/boot_memory.sh </dev/null
~/.claude/hooks/guard_claude_md.sh </dev/null
```

In a live session, `/hooks` lists what is registered, and running the harness in debug mode shows each hook executing.

**If `cleanup_on_git.sh` never fires in a real session** but works standalone, the `if` rule is the suspect. Remove the `"if": "Bash(git *)"` line from `settings.json`; the script's own command check then does all the filtering, at the cost of one process spawn per call of that tool.

## Watched symlinks

`guard_claude_md.sh` warns each session about links in the configuration directory whose target has gone away -- the same silent-failure class as a dangling instruction file, since a broken link reads as *absent* rather than as an error. The watch list is the `WATCHED_LINKS` variable at the top of that script, one path per line. **Add a link to it at the moment you create the link**, not at the moment it breaks.
