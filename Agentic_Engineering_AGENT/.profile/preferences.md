# ⚙️ Preferences -- choices that are his, not the discipline's

Things the discipline deliberately leaves open and he has decided. They belong here, never in `foundations/`: a preference that dictated doctrine would make the doctrine unportable.

- **Implementation language for ADW controllers: TypeScript, run with `bun`.** He was shown a Python/`uv` reference implementation and said the *shape* was right but stated `.ts` as his preference. This is why `foundations/06` now names compositions (**plan -> build -> test**) rather than files (`adw_plan_build_test.py`) -- the filenames came verbatim from the source material and silently committed the discipline to Python.
- **Credentials are never handed to an agent.** Not "requires approval" -- the agent does not receive them. Where a system needs a credential, it is **injected into a function the agent may call**: code holds the secret, the agent holds only the capability to invoke. See `foundations/03_AUTHORITY_AND_SAFETY.md`.
- **Naming: descriptive over opaque.** He rejected hashed artifact filenames outright -- he wants to know what something is from a folder listing without opening it.
- **Less is more, but not at the cost of self-transparency.** Terseness is not the goal; unexplained terseness is the failure. When cutting, keep the reasoning that makes a rule checkable.
- **He works in several terminal tabs at once, so the same item can be dictated into two sessions.** Anything that appends to a shared list -- the parked/deferred list most of all -- must **dedupe against what is already in the file** rather than blindly appending. Recorded here 2026-09-16 when the auto-memory that carried it was retired; it could not be merged into `~/.claude/SHORTCUTS.md`, where it belongs, because the harness refuses agent writes under `~/.claude/`.

## Harness

- **He prefers pi.dev, and works somewhere heavily invested in Claude Code.** The preference is personal and the constraint is real, so both hold at once: Claude Code is what the work runs on today, pi.dev is where he wants his own work to go because it is open source.
- **The consequence is a requirement, not a wish.** An ADW must be constructible so it runs on **both** -- one to run at work, the other to build toward something open. Treat the harness as a variable behind an adapter, never as the ground a design stands on.
- Suggesting a switch of harness at work is not useful. He is constrained, not undecided. Making the work portable is the help.

- **UI testing is driven through Claude-in-Chrome against his real browser, and it is manual today.** He has an established flow for it and drives it himself, session by session. He **wants it automated**, which makes it a named ADW candidate rather than a habit to leave alone. Two things matter when that work starts: it is the one workflow whose subject is a **running application** rather than a repository, so its checks bind to what the interface does rather than to what the tree contains; and a browser-driving tool is a harness capability like any other, so it belongs behind the adapter rather than written into a flow, or the ADW binds to one harness through the back door.

## Global operator preferences -- pointed at, not restated

**Canonical home: `~/.claude/CLAUDE.md`, live as of 2026-09-16.** The rewrite was installed by hand -- the harness refuses agent writes to that file, so a swap is always the operator's step. It is the real file rather than a symlink, and `~/.claude/` is not a git repository, so no clone, clean or wipe touches it. Arrangement and verification: `~/.claude/CONFIG_SETUP.md`., with the must-never-be-missed subset in `~/.claude/CRITICAL_RULES.md`, which a `SessionStart` hook injects into every session whether or not any file is found. `~/.claude/` is not a git repository, so nothing in it is destroyed by re-cloning, wiping or moving any repo -- the property that actually matters, and the one `~/agentic` turned out not to have. What used to sit here -- naming and attribution, shell and runtime tooling, record formats, how he wants to be worked with, how he wants things built -- was stated twice, once there and once here, and the two drifted. One canonical statement per rule; read it there.

What stays here is only what is genuinely about operating **this package**, plus the two details the global file does not carry:

- **Existing commits keep their attribution trailers.** He declined a retroactive cleanup when the no-`Co-Authored-By` rule was adopted -- the rule is forward-looking only.
- **`.profile/` is where a preference lives so that `foundations/` does not have to carry it.** A preference that leaked into doctrine would make the doctrine unportable; that is the boundary this folder exists to hold.

## Code standards when an agent writes the JavaScript

He keeps a curated rule set for this and treats it as the standard rather than as a suggestion, because a coding agent left to its own defaults writes plausible code in whatever style the surrounding file implies. **The rules are the correction for that**, and they are the reason he brought an external set in rather than relying on what the workflow tooling already loads.

- **The source is a third-party open-source rule library** -- neither his nor his employer's. It is **pointed at rather than copied**, so upstream improvements arrive without a merge, and the posture toward it is read-only: nothing of ours is authored inside that checkout. The rules are installed as personal skills in the harness's user-level skills directory -- outside every repository, which makes them impossible to commit by accident and keeps adoption into a repository a separate, deliberate decision.
- **Rules go in; workflows stay out.** A rule says how code is written and composes with whatever process is driving. A workflow bids for a lane the existing process already owns, and running two of those makes it impossible to tell which one caused a change in the output. The selection question is always *is this a standard or a process?*
- **Check the repository before installing a rule, not just the rule's description.** A description states what a rule is about, never whether this codebase can use it. Two were recommended and withdrawn on reading `package.json` -- one taught a library the repo does not depend on, the other required a major version it does not have.
- **A rule set written in its own notation needs that notation installed too.** Several of his rules are authored in a pseudocode dialect; without the syntax reference their constraint blocks degrade into ordinary prose and stop binding.
- **The content he actually wants** is functional composition, small pure functions, immutability, self-describing signatures with defaults in the parameter list, naming that reads as verbs and yes/no predicates, and composition over inheritance. This is the same taste already recorded above under how he wants things built -- the rule set is that preference made enforceable rather than a new position.

**The standing gap, stated so it is not mistaken for covered:** the set is JavaScript discipline wearing a TypeScript title. Nothing in it addresses `any` versus `unknown`, narrowing, discriminated unions, generics, `readonly` or strictness. Where the work is TypeScript-first, that discipline still has to come from somewhere, and it is a rule he would have to author rather than install.

**Risk targeting is part of the standard, not a separate curiosity.** He wants the highest-risk files named before a change lands in them -- size, change frequency and complexity multiplied, so the overlap surfaces rather than any single signal. Two thirds of it is available from `git log` alone with no dependency, which is worth remembering whenever the tooling that computes it is unavailable or unwelcome in a given repository.

## The scope of an improvement -- a hard rule

**Improvements are confined to the files the change creates or already touches.** Type strictness, style conformance, splitting a large file, applying a standard newly adopted -- all of it stops at the edge of the current diff. The repository is never swept, and adopting a standard is not a licence to retrofit it.

He attached this limit to the rule set in the same breath as adopting it, including for the hotspot guidance that explicitly recommends decomposing large files before merging. **A rule saying a file should be split is authority to split a file already in the diff, never authority to go find the others.**

The reason is what a wide diff does to review. A change that fixes one defect and restyles forty untouched files can no longer be reviewed for the defect: the signal is buried, the blast radius has nothing to do with the intent, and a reviewer cannot separate the necessary edits from the opportunistic ones. It also destroys any comparison being run on the tooling, because the output is then dominated by edits nobody asked for.

**When a standard or a report identifies work outside the current change: report it, do not do it.** Naming what was found and deliberately left alone is the correct deliverable -- the finding survives for a future change that legitimately touches those files, and this one stays reviewable.

## Machine quirks that make a command lie

- **`cp`, `mv` and `rm` are aliased to their `-i` form** (`~/.zshrc:77-79`). That is a deliberate safety net and should stay. **What must change is anything assuming the bare form:** an aliased copy waits for a confirmation that never comes in a non-interactive call, and with `2>/dev/null` the prompt is invisible -- so the command reports nothing and does nothing. It has now caused a silently skipped file restore, a hung symlink removal, four backup copies that all failed while printing no error, and a latent defect in the bench installer's own backup step. **Use `command cp` / `cp -f`, `command mv` or `unlink` in any script or non-interactive call**, and check the effect rather than the exit code -- a suppressed prompt looks exactly like success.
