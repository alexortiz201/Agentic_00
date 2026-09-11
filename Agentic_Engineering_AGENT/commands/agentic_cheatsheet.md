# Agentic Cheat Sheet

> Show an at-a-glance menu of the pieces I can use and compose for Agentic Engineering. Inform only; do not create, install or execute anything.

## Read

- [Quick reference](../ADW_QUICK_REF.md)
- [Package routing](../README.md)

Inspect the relevant files in this package's `commands/`, `skills/`, `prompts/`, `templates/` and `hooks/` to confirm available entries. Resolve paths relative to this command, not the current working directory. Inspect a target project's primitives only if a target and read scope were supplied. Never inspect secret values or global configuration for this menu.

## Report

Return one concise table, roughly 10–12 rows:

| Piece | What it does / when to use | Composes with | Available entry / status |
|---|---|---|---|

Cover prompts, commands, skills, hooks, tools/adapters, plans/templates, roles, types/state, checks/gates, phase/composite ADWs, and triggers/workspaces. Make the command-versus-skill distinction plain: a command is explicitly invoked for a task; a skill packages reusable know-how and when/how to apply it.

Link concrete existing files. Label status **present**, **template/recipe only**, **needs creating**, or **UNVERIFIED**. File presence does not prove host registration, installation, execution or enforcement. Show slash invocation only when registration is verified; otherwise show the file to load.

Finish with three short example compositions, labeled as examples rather than installed workflows:

- **Bug:** reproduce → plan → approve → build → regression checks → review → bounded repair/recheck → handoff.
- **New primitive:** define consumer contract → create prompt/command/skill/tool/hook → test → expose an entry point.
- **Unattended work:** authenticated trigger → atomic claim → isolated workflow → gates → human acceptance; shipping separately authorized.

If I supplied a task, recommend the smallest composition and identify missing pieces in one sentence. No tutorial or full repository inventory unless requested.
