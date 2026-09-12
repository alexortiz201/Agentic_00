# Prime

> Load the context this TASK needs in the TARGET, then summarize your understanding and state what you did not read.

Input: TARGET (the repository being worked on — not this package), TASK, read-only SCOPE. Engagement mode: `audit` — priming reads; it never writes, installs, or runs project scripts.

Priming is selection, not ingestion. Loading everything contradicts this package's own rule to load only relevant context, and stops working at the first repository too large to hold. Stop when you can name the task's entry points, its conventions and its unknowns — not when you have read everything. All paths below resolve inside TARGET.

## Run

Read-only, from the TARGET root:

- `git ls-files` — scope it to the paths TASK touches (`git ls-files '<dir>'`) once the listing is larger than you will actually read.
- `git log --oneline -n 20` — recent direction and commit conventions.
- `git status --short --branch` — uncommitted work you must not overwrite.

## Read

In this order, stopping at the first level that answers TASK:

1. **Boundaries.** `AGENTS.md`, `CLAUDE.md`, `README.md` at the TARGET root, plus the nearest equivalents inside the directories TASK touches. Instructions nearer the code add constraints; they do not expand authority.
2. **How it builds and checks.** Manifests, scripts, and CI configuration — the source of the real check commands. Do not run them during priming.
3. **Workflow layer, if the target has one.** A workflow directory and its own README — `adws/README.md` in the reference layout described in the [quick reference](../ADW_QUICK_REF.md). Absent in most targets, including this package; record it missing rather than treating the path as broken.
4. **The task's own surface.** The entry points, modules and tests TASK names, followed only by what those directly reference.

## Report

Concise Markdown: what TARGET is and how it is checked; the files read and why each was relevant; conventions that constrain the change; open unknowns; and an explicit list of what you deliberately did not read. Priming establishes orientation, not verified behavior — label anything taken from documentation rather than code as a documentation claim.
