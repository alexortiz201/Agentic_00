# Agentic Cheat Sheet

> Show an at-a-glance menu of the pieces I can use and compose for Agentic Engineering. Inform only; do not create, install or execute anything.

Engagement mode: **`audit`** (see the [quick reference](../ADW_QUICK_REF.md)). Inspecting and reporting is the whole permitted scope. Recommending a composition stays inside `audit`; drafting one is `design` and needs to be asked for.

## Read

- [Quick reference](../ADW_QUICK_REF.md)
- [Package routing](../README.md)

Inspect the relevant files in this package's `commands/`, `skills/`, `prompts/`, `templates/` and `hooks/` to confirm available entries. Resolve paths relative to this command, not the current working directory. Inspect a target project's primitives only if a target and read scope were supplied. Never inspect secret values or global configuration for this menu.

## Report

Return one concise table — one row per canonical primitive kind in the [quick reference](../ADW_QUICK_REF.md) taxonomy that is present in this package or relevant to the supplied task, roughly 10–14 rows:

| Kind | What it does / when to use | Composes with | Available entry / status |
|---|---|---|---|

Use the canonical kind ids and add none beside them. Make the command-versus-skill distinction plain: a command is explicitly invoked for a task; a skill packages reusable know-how and when/how to apply it.

Link concrete existing files. Label status **present**, **template/recipe only**, **needs creating**, or **UNVERIFIED**. File presence does not prove host registration, installation, execution or enforcement. Show slash invocation only when registration is verified; otherwise show the file to load.

Finish with three short example compositions, labeled as examples rather than installed workflows:

- **Bug:** reproduce → plan → approve → build → regression checks → review → bounded repair/recheck → handoff.
- **New primitive:** define consumer contract → create prompt/command/skill/tool/hook → test the six mandatory cases → expose an entry point.
- **Unattended work:** authenticated trigger → atomic claim → isolated workflow → gates → human acceptance; shipping separately authorized.

If I supplied a task, recommend the smallest composition and identify missing pieces in one sentence. No tutorial or full repository inventory unless requested.
