# 🧾 Harness manifest -- this bench, as actually installed

> **Surveyed 2026-09-16** against Claude Code on this machine, by reading the live files rather than by recalling what was installed. Template and method: [`templates/harness_manifest.md`](../templates/harness_manifest.md). Capability lookups: [`harnesses/equivalents.md`](../harnesses/equivalents.md). Port procedure: [`harnesses/porting.md`](../harnesses/porting.md). Same-harness, different-machine reproduction: [`templates/claude_home/`](../templates/claude_home/README.md).

**Why this file is here and not in `templates/` or `harnesses/`.** It names one person's absolute paths, one employer's repositories, and one account's integrations. `Agentic_00` is a public repository and `.profile/` is gitignored, which makes this the only correct home -- and `.profile/`'s stated subject is *who operates this package*, which a bench inventory is.

**What this file is not.** It is not a list of what Claude Code can do -- that is [`harnesses/claude_code.md`](../harnesses/claude_code.md). **Capability is not deployment**, and a port costed from a capability list is costed from the wrong document.

## 1. Instruction -- text that reaches the model

| Capability key | What it does | Fires / loads when | Realised as | If absent | Port |
|---|---|---|---|---|---|
| `instruction:always-loaded` | Personal global preferences -- explanation style, shell and runtime tooling, shortcut trigger index, state-store pointers | every session, found by file discovery | `~/.claude/CLAUDE.md`, 168 lines, a **real file, not a symlink** | Sessions run on harness defaults. Silent -- an agent with no global instructions cannot know it is missing any | rebuild |
| `instruction:always-loaded-by-mechanism` | The ten rules that countermand a harness default -- no attribution trailers, confirm before pushing, show status before committing, never write a credential, scope improvements to the diff, subagents authorised, confirm a bug before coding, the sweep triggers, where state lives, no hard-wrapping | every session **and after compaction**, pushed in regardless of what file discovery finds | `~/.claude/CRITICAL_RULES.md`, emitted by `hooks/guard_claude_md.sh` on `SessionStart` (`startup\|resume\|clear\|compact`) | The rules most likely to be silently lost are the ones lost. This exists precisely because the row above fails silently | rebuild |
| `instruction:directory-scoped` | Solution-wide command aliases, the onboarding runbook pointer, and the state-store traversal order for every repo beneath it | when the session's cwd is at or below the directory | `~/dealpath/CLAUDE.md`; also `~/dealpath/sunspear/CLAUDE.md`, `~/dealpath/the_wall/CLAUDE.md`, and this package's own `CLAUDE.md` / `AGENTS.md` | Per-repo conventions vanish; the alias table stops routing | free |
| `instruction:on-demand` | Packaged capabilities whose description is loaded at startup and whose body enters on invocation | on invocation | 16 entries in `~/.claude/skills/` plus 22 from the plugin -- see section 4 | Named workflows stop being reachable by name | free |
| `instruction:carried-forward` | **76 memory files** under ``__MEMORY_STORE__``, of which four are **pinned and injected into every conversation in that project**: the sweep triggers, agency-versus-growth, orchestrate-do-not-implement, confirm-the-bug-first | automatically, scoped by project directory | harness-managed auto-memory | The accumulated corrections of dozens of sessions. Nothing re-derives them | **GAP** |

**Two things worth noticing in this table.** First, the always-loaded budget is larger than it looks: the global file, the critical rules, the directory-scoped file, and four pinned memories are all present on every call in `~/dealpath`. Second, **the `~/.claude/CLAUDE.md` currently in place is the pre-consolidation file**, not `CLAUDE.md.proposed` -- see the fragility register, because that difference is load-bearing this week.

## 2. Mechanized triggers -- things the runtime fires

Five global, all installed 2026-09-16, all verified by piping a payload to the script and observing the output. Two further project-scoped triggers exist and are easy to forget -- they are in the table too.

| Capability key | What it does | Fires / loads when | Realised as | If absent | Port |
|---|---|---|---|---|---|
| `trigger:session-opened` | Emits the critical rules; warns loudly if the global instruction file is dangling, empty or missing; warns about watched links whose target has gone | `SessionStart`, matcher `startup\|resume\|clear\|compact` | `~/.claude/hooks/guard_claude_md.sh` | The only detector of a silent-instruction-loss failure. Its absence is itself undetectable | rebuild |
| `trigger:session-opened` | Emits the state-store read order and the in-flight / blocked / next report shape, as a gather-and-wait instruction | `SessionStart`, matcher `startup\|clear` only -- deliberately not on resume or compact | `~/.claude/hooks/boot_memory.sh` | Sessions start cold and reason from whatever they happen to read | rebuild |
| `trigger:session-opened` | **Parses the priority queue out of `.memory/todo_list.md` and emits it as a numbered list to create session tasks from** -- the import half of the task-list view. Only the priority queue, because the three-queue structure exists so the other two do *not* compete for attention | same script, same matcher, so same firing condition | `~/.claude/hooks/boot_memory.sh`, second half | The durable list stays invisible in the TUI, and the session task list is either empty or invented | rebuild |
| `trigger:tool-completed` | **Demands the write-back when a session task is completed** -- the durable entry is closed against its own source and then deleted, not ticked. Never edits the file itself: a script cannot tell which markdown item a task id maps to, and a bad write to an unversioned store is unrecoverable | `PostToolUse` on `TaskUpdate`, only when `status` is exactly `completed`. **Deduped by `(session, taskId)` identity, not by a timer** -- a timer cannot tell two different closures apart | `~/.claude/hooks/reconcile_on_task_done.sh` | Completing a task in the TUI changes nothing durable. The task store is session-scoped, so the closure is simply lost at session end | rebuild |
| `trigger:prompt-submitted` | Fires the reconciliation sweep in its **stopping-point** flavour -- record where things stopped, do not delete | a prompt matches one of 19 patterns in `hooks/stopping_phrases.txt`; bails on prompts over 600 characters | `~/.claude/hooks/cleanup_on_stop_phrase.sh` | Stores go stale across a session boundary and are read as current by the next one | rebuild |
| `trigger:tool-completed` | Fires the reconciliation sweep in its **completion** flavour -- update, clean, delete | a `git commit` or `git push` in command position completes through the shell tool; debounced 60s | `~/.claude/hooks/cleanup_on_git.sh`, `PostToolUse` on `Bash`, narrowed by `if: "Bash(git *)"` | The specific failure that prompted all four: having to ask for the sweep out loud | rebuild |
| `trigger:tool-completed` | Suggests a repo-local knowledge-graph query instead of a raw search, when a search command is about to run and a graph exists | `PreToolUse` on `Bash`, matched on search-tool names in the command string | `~/dealpath/sunspear/.claude/settings.json` and `~/dealpath/the_wall/.claude/settings.json` -- **identical inline shell, project-scoped, not authored in this pass** | Searches stay raw. Low cost, and worth knowing it is there before diagnosing an unexpected injection | rebuild |

**Filter placement.** `cleanup_on_git.sh` is the only one filtered twice -- declaratively via `if`, and again inside the script against `tool_input.command`, matching on **command position rather than mention**. That inner check is the guarantee and was earned: the hook fired twice on its own test harness's text before the position-matching was added. The two project hooks filter declaratively and inside the inline shell, but the inline form makes the inner check hard to read and harder to change.

**Failure direction.** All seven degrade to silence. Every one exits 0 unconditionally, checks for `jq` before using it, and uses exit 2 nowhere. **None of them can block work**, by construction.

**Debounce vs. dedupe, and why they differ.** `cleanup_on_git.sh` debounces on a 60-second timer because a shell command has no stable identity -- and that timer was observed swallowing a genuine second trigger. `reconcile_on_task_done.sh` has an identity available (a task id), so it dedupes on `(session, taskId)` instead. That can suppress only a repeat of the *same* closure and never a different one, which is exactly what a timer cannot promise. **Where an identity exists, prefer it to a timer**: the failure modes are asymmetric, since a duplicate reminder is cheap noise and a suppressed one is silent staleness.

**Where the firing conditions live.** `hooks/stopping_phrases.txt` -- one extended regular expression per line, read on every prompt, no restart. This is the only trigger data kept as data; everything else is compiled into a script or into JSON.

## 3. Gates -- things that refuse

| Capability key | What it does | Fires / loads when | Realised as | If absent | Port |
|---|---|---|---|---|---|
| `gate:declarative-tool-policy` | Allowlists tool invocations so routine work does not prompt | every tool call | **Nothing at the global level** beyond `settings.local.json` allowing `WebSearch`. Project-scoped: 27 rules in `sunspear/.claude/settings.json`, the same 27 in `the_wall/`, and **119 further rules** in `sunspear/.claude/settings.local.json` | Constant prompting, and in unattended runs a different decision path entirely | **GAP** |
| `gate:autonomous-mode-policy` | A soft-deny list plus a 30-line declared environment -- org, repo visibility, protected branches, sensitive file paths, protected infrastructure scopes -- used to judge autonomous actions | autonomous operation | the `autoMode` key in `~/.claude/settings.json` | The judgement basis for unattended work. **This is the least visible thing on the bench** and the most consequential if it silently stopped applying | **GAP** |

**Neither of these gates exists in a controller.** Both live entirely in harness configuration, which means both disappear on a harness without them -- silently, in exactly the way [the capability surface](../foundations/Harness_Engineering/01_THE_CAPABILITY_SURFACE.md) warns about. That is a `GAP` regardless of how well they work today.

**`autoMode.environment` also contains employer-internal facts** -- repository names, protected branch names, sensitive environment-file paths, an internal package registry. It must not be copied into anything public. It is excluded from the reproduction kit for that reason.

## 4. Packaged capability and bundles

| Capability key | What it does | Fires / loads when | Realised as | If absent | Port |
|---|---|---|---|---|---|
| `capability:packaged` | 13 code-discipline skills -- TypeScript, layout, structure, namespacing, TDD, JWT and timing-safe security, churn analysis, writing | description at startup, body on invocation | `~/.claude/skills/aidd-*` -- **12 are symlinks into `~/Projects/aidd/ai/skills/`**, which is a clone of `github.com/paralleldrive/aidd`, **not his repository**. `aidd-typescript` alone is a real directory | Code-quality guidance falls back to model defaults | free |
| `capability:packaged` | Skill discovery, and terminal-multiplexer control | as above | `~/.claude/skills/find-skills`, `herdr` -- symlinks into `~/.agents/skills/`, which is **installer-managed and tracks a content hash per skill** | Two conveniences | free |
| `capability:packaged` | Manual browser verification against his real logged-in browser | on invocation | `~/.claude/skills/ui-verify-manually/` -- a **real directory, authored by him, existing nowhere else**. Seeded into the reproduction kit | The one workflow whose subject is a running application. No copy exists elsewhere | free |
| `bundle:installed-set` | The SDLC lifecycle -- 22 skills covering design, spec, architect, develop, deliver, triage, test, validate, zap | at startup | ``__PLUGIN__@__MARKETPLACE__`` **v1.8.1**, commit `6a013d6`, from marketplace `dealpath/claude-plugins-proddev`, **autoUpdate on**. v1.7.81 is orphaned but still marked `.in_use` | Every `/`-prefixed lifecycle command in the alias table | rebuild |

**`autoUpdate: true` on that marketplace is a moving floor**, and worth stating as a fact rather than a complaint: the bundle's contents can change between two sessions with no action taken and no record in this file. Re-verify the version before relying on a behaviour it provides.

**A dangling reference, found during this survey.** `ui-verify-manually/SKILL.md` routes automated checks to a skill called `ui-verify` -- *"For automated checks prefer `ui-verify`, which drives a headless browser"* -- and **no skill by that name is installed**. The instruction points at nothing.

## 5. External tools

| Capability key | What it does | Fires / loads when | Realised as | If absent | Port |
|---|---|---|---|---|---|
| `tool:external-protocol-server` | Tracker read and write -- issues, projects, documents, comments, labels | on tool call | account-provisioned integration, surfaced as `mcp__claude_ai_Linear__*` | The tracker is the source of truth for every in-flight ticket. Losing it breaks the ticket workflow end to end | **GAP** |
| `tool:external-protocol-server` | ~23 further account-provisioned integrations -- chat, docs, design, analytics, error monitoring, warehouse, CRM, and an internal one | on tool call, after authorisation | same mechanism; 24 recorded in `~/.claude/mcp-needs-auth-cache.json` | Varies by integration; most are discovery sources rather than load-bearing | **GAP** |
| `tool:browser-control` | Drives his real Chrome profile -- navigate, click, read page and console, capture GIFs | on tool call | `mcp__claude-in-chrome__*`, a browser extension plus its bridge | The entire UI-verification flow, which is his stated ADW candidate | **GAP** |
| `tool:local-binary` | Repo-local knowledge graph, queried instead of raw search | when invoked, and suggested by the project trigger in section 2 | `graphify`, allowlisted in both project settings files | Searches stay raw | free |

**`~/.claude.json` has `mcpServers: {}`. There is no local integration configuration at all.** Every one of these is provisioned by the account, which is the single most important line in this manifest for porting purposes: **there is nothing on disk to copy and nothing to point another harness at.** A port does not translate these; it rebuilds each one as a command-line tool, which is the approach [`porting.md`](../harnesses/porting.md) already recommends and which works on both harnesses.

## 6. Invocation and delegation

| Capability key | What it does | Fires / loads when | Realised as | If absent | Port |
|---|---|---|---|---|---|
| `invocation:default-model` | Sets the default model for every session | at startup | `"model": "opus[1m]"` in `~/.claude/settings.json` | Falls back to the harness default -- a smaller context window, which changes what a long orchestration can hold | free |
| `delegation:nested-agent` | Parallel fan-out search, forked long legs, per-repo implementation agents. **Standing-authorised in every session** by the critical rules | on invocation | harness-native subagents. **No definitions in `~/.claude/agents/` -- that directory does not exist.** Built-in types only | His whole orchestration pattern. The critical rules assume it is available | rebuild |
| `invocation:worktree-base` | New worktrees branch from local `HEAD` rather than from the remote default branch | on worktree creation | `"worktree": {"baseRef": "head"}` in `sunspear/.claude/settings.json` | Worktrees would silently branch from a different base -- a wrong-base branch looks identical to a right-base one | rebuild |

## 7. State the bench reads and writes

| Capability key | What it does | Fires / loads when | Realised as | If absent | Port |
|---|---|---|---|---|---|
| `state:operator-store` | `.memory/`, `.profile/`, `.workgroup/` -- carried-forward context, who operates the bench, work-about-the-work | read at session start by `boot_memory.sh`, written by the sweep triggers | **two roots since 2026-09-16**: `.memory/` and `.workgroup/` are real directories at `~/.workbench/Dealpath/` (no longer gitignored, because they are no longer inside a repository); `.profile/` is still a gitignored folder under `~/Projects/Agentic_00/Agentic_Engineering_AGENT/` | Every session starts cold. This is the store the whole trigger set exists to keep true | free |
| `state:transcript` | Session transcripts, prompt history, file-edit history | continuously | `~/.claude/projects/`, `history.jsonl`, `file-history/` | Evidence for anything not written down at the time | free |

## 8. Gap register

| Capability key | Why there is no equivalent | What the port must do instead | Decided? |
|---|---|---|---|
| `gate:declarative-tool-policy` | Pi has **no permission system at all** | Bound the tool set with an allowlist, write a blocking `tool_call` extension, or containerise. The 146 allow rules do not translate -- they are an artifact of a prompting model that would not exist | **no** |
| `gate:autonomous-mode-policy` | No counterpart anywhere. It is a product-specific judgement layer, not a general capability | Either rebuild the declared environment as controller-side policy, or narrow the claim and do not run unattended off this harness | **no** |
| `instruction:carried-forward` | Harness-managed auto-memory, including pinning, has no Pi equivalent | The four pinned memories are policy and should move to a standing instruction file. The remaining 72 are a retrieval problem, not an instruction one | **no** |
| `tool:external-protocol-server` | Pi does not build in a tool protocol, **by stated preference** -- and these are account-provisioned, so there is no local config even on this harness | Replace each needed one with a command-line tool plus a skill. Works on both harnesses. The tracker integration is the only load-bearing one | **no** |
| `tool:browser-control` | Extension-based and bound to this harness's bridge | Behind the adapter, as `.profile/preferences.md` already requires -- *"a browser-driving tool is a harness capability like any other"*. Not yet built | **no** |
| `delegation:nested-agent` | Not built into Pi; the reference approach spawns a child process per delegation | Move concurrency to the controller, which is where [portability](../foundations/Harness_Engineering/02_PORTABILITY.md) says it belonged | **no** |
| `bundle:installed-set` | Plugin format does not port. The 22 skills inside it mostly do | Point Pi at the skills directory; rebuild the command surface. **Untested** | **no** |

**Every row says no.** That is the honest state and is worth one line rather than being smoothed over: portability is currently a design property of this package, not a tested property of this bench, and nothing here has run on a second harness.

## 9. Fragility register

| What | Depends on | Failure is | Noticed how? |
|---|---|---|---|
| `~/.claude/adws` -> `~/agentic/adws` | `~/agentic` continuing to exist. **It was wiped on 2026-09-16 today** | silent -- a dangling link reads as *absent*, not as an error | `guard_claude_md.sh` warns every session; it is the sole entry in `WATCHED_LINKS` |
| **The live `~/.claude/CLAUDE.md` still points into `~/agentic`** -- five references: `SHORTCUTS.md` twice, `scratchpad/` for the `adw this` shortcut, `README.md`, and the library section | `~/agentic` existing | silent -- the instruction reads fine and names a path that is gone. `~/.claude/SHORTCUTS.md` already exists and is where the file actually lives now | **nothing watches for this.** `guard_claude_md.sh` checks whether the file exists, not whether its contents point at real paths |
| `CLAUDE.md.proposed` is staged and **not installed** | a manual `mv` the operator has not run | not a failure, but every claim in `CONFIG_SETUP.md` about deduplication describes the proposed file, not the live one | `CONFIG_SETUP.md` step 2 |
| The five hook scripts, `CRITICAL_RULES.md`, `SHORTCUTS.md` | `~/.claude/` not being a git repository -- which is the property that makes them survive every repo operation, and the same property that gives them no history | an accidental overwrite is unrecoverable | **[`templates/claude_home/`](../templates/claude_home/README.md) now closes this**, and is the first off-machine copy. The `~/agentic/claude-hooks/` copy dies with that repo |
| 12 `aidd-*` skills | `~/Projects/aidd`, a clone of a **third-party** repository | dangling symlinks, silently | `guard_claude_md.sh` would warn -- **if the paths were added to `WATCHED_LINKS`. They are not** |
| `find-skills`, `herdr` | `~/.agents/skills/`, installer-managed with a per-skill content hash | hand-editing breaks the installer's tracking | not watched |
| ``__PLUGIN__@__MARKETPLACE__`` v1.8.1 | a marketplace with `autoUpdate: true` | behaviour changes between sessions with no action and no record | nothing |
| Every hook needing `jq` | `jq` on `PATH` | degrades to silence **by design** -- the triggers stop firing and nothing says so | nothing. This is the accepted cost of failing open |
| `boot_memory.sh` defaults its state root to `$HOME/.workbench/Dealpath` | that exact path, and that it holds `.memory/` and `.workgroup/` | the boot instruction names a directory that does not exist, and the queue import silently reports the master list as missing | **fixed in the kit** as `__STATE_ROOT__`. The live script reads `${AGENT_STATE_ROOT:-$HOME/.workbench/Dealpath}`, so it is overridable -- but the **default is still a hardcoded path**, so a wrong default fails exactly as before. Note the root covers `.memory/` and `.workgroup/` ONLY: `.profile/` is under a different root and this script never reads it, which is why one variable still suffices |
| The priority-queue parser in `boot_memory.sh` | `.memory/todo_list.md` keeping its shape: a top-level `# ... Priority queue` heading, `## ` items, `- [ ]` steps | the import goes empty or partial | **not silent, by design** -- a missing heading emits an explicit "the file's structure may have changed, tell the operator" rather than nothing. An *empty* queue is reported as empty and is distinguished from a missing one |
| `reconcile_on_task_done.sh` depends on `TaskUpdate`'s payload carrying `status: "completed"` | the task tool's input shape, which is **undocumented and read off live transcripts** | the write-back reminder stops firing and the durable list silently drifts | nothing watches for it. If the field is ever renamed the hook goes quiet, which looks identical to no tasks being completed |

## Reading this alongside the kit

This manifest ports the bench to a **different harness**. [`templates/claude_home/`](../templates/claude_home/README.md) reproduces it on a **different machine**. Sections 4, 5 and 6 are the ones the kit cannot carry -- plugins, account-provisioned integrations, and linked skills are reinstalled rather than copied -- so **this file is the record those depend on**, and losing it loses everything the kit's own README says to re-create by hand.


## Placeholders

This file records one bench, and the tokens below stand in for the parts that identify a person or an employer -- so the manifest can be read, diffed and ported without publishing either.

| Token | Stands for |
|---|---|
| `__MEMORY_STORE__` | The per-project auto-memory directory under `~/.claude/projects/` |
| `__PLUGIN__` | The installed lifecycle plugin |
| `__MARKETPLACE__` | The marketplace it is installed from, an employer-owned private repository |

**Everything else here is a capability key and is deliberately not tokenised** -- the keys are the portable part, and obscuring them would defeat the file's purpose.
