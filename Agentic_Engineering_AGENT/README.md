# Agentic Engineering Agent

A self-contained package for bounded, observable, and repairable software delivery.

## Boot order

1. [`AGENTS.md`](AGENTS.md) — operating contract.
2. [`01_PRINCIPLES.md`](01_PRINCIPLES.md) — decision model.
3. [`02_WORKFLOW.md`](02_WORKFLOW.md) — task lifecycle.
4. [`03_AUTHORITY_AND_SAFETY.md`](03_AUTHORITY_AND_SAFETY.md) — authority boundaries.
5. [`04_VERIFICATION.md`](04_VERIFICATION.md) — quality gates.
6. [`05_RECOVERY_AND_HANDOFF.md`](05_RECOVERY_AND_HANDOFF.md) — recovery and handoff.
7. [`RUNBOOK.md`](RUNBOOK.md) — execution checklist.

Use [`templates/TASK_BRIEF.md`](templates/TASK_BRIEF.md), [`templates/PLAN.md`](templates/PLAN.md), [`templates/TASK_STATE.json`](templates/TASK_STATE.json), and [`templates/HANDOFF.md`](templates/HANDOFF.md) as needed. [`CLAUDE_HANDOFF.md`](CLAUDE_HANDOFF.md) is a portable description, not additional policy.

## Task routing

| Need | Load next |
|---|---|
| Show what I can compose / understand ADW pieces | Invoke by loading [`commands/agentic_cheatsheet.md`](commands/agentic_cheatsheet.md); reference: [`ADW_QUICK_REF.md`](ADW_QUICK_REF.md) |
| Create/compose an ADW | [`skills/adw-authoring/SKILL.md`](skills/adw-authoring/SKILL.md), then [`06_ADW_COMPOSITION.md`](06_ADW_COMPOSITION.md) |
| Create a prompt, command, skill, tool, hook or adapter | [`commands/create_primitive.md`](commands/create_primitive.md) |
| Validate an existing ADW | [`commands/validate_adw.md`](commands/validate_adw.md) |
| Delegate a delivery phase | [`prompts/plan.md`](prompts/plan.md), [`build`](prompts/build.md), [`review`](prompts/review.md), [`repair`](prompts/repair.md), or [`document`](prompts/document.md) |

Read only the selected recipe and its required references. Commands are portable Markdown recipes; skills are loadable guidance; hooks are design contracts. Nothing here auto-registers a slash command, installs a plugin, configures MCP or starts a workflow. To integrate a host, inspect its supported capabilities, propose a scoped registration diff, obtain approval, and test discovery/execution. Preserve existing settings; direct file loading works without registration.

## Purpose

This agent helps an engineer deliver bounded software changes by combining:

- human intent and acceptance;
- deterministic orchestration and state management;
- constrained agent calls for reasoning and implementation;
- explicit verification, review, repair, and evidence.

The agent operates primarily at the **agentic layer**: it helps compose ADWs and create the prompts, commands, skills, types, gates and adapters those workflows actually need. Improve context, state and feedback before adding platform architecture. A one-off task may need only a bounded prompt and checks.

## Boundaries

This package does not grant shell, network, remote-service, database, publication, or deployment authority. Prompt restrictions are not security boundaries.

Controls are marked as:

- **code-enforced** — a deterministic mechanism actually prevents or gates an action;
- **human-approved** — a human must authorize the action;
- **agent-checked** — the agent is instructed to inspect or reason, but no hard boundary exists.

## Minimal use

This is a bootable instruction package for a specialized agent, not an executable orchestrator. The host supplies the model, tools, permissions, and any tested runtime gates. Without those gates, workflow checks are agent-checked; no validator, sandbox, or automation is bundled.

1. Spawn an agent with this instruction: “Read this package's AGENTS.md and complete its README.md boot sequence before acting. Report the loaded files, missing capabilities, and proposed authority envelope; then await the task.” Supply the actual package location to the host. Merely placing the folder does not load it.
2. Provide the target, task, and read-only discovery scope. Target-project files are task inputs, not prerequisites for understanding this package.
3. Authorize creation of `runs/<run_id>/` inside this folder. Copy only needed templates there; add `ADW_DESIGN.md` for workflow authoring. Never overwrite templates or another run. Keep evidence there without sensitive values. Generated target ADWs may use their own approved artifact convention; record the mapping.
4. Complete the brief and discover within scope. Approve a plan for non-trivial work; a tiny low-risk edit needs explicit task scope but no separate plan. Read-only answers need no implementation artifacts.
5. Use a branch/worktree for non-trivial or parallel work. Tiny edits may use the current branch if authorized and unrelated work is preserved.
6. Require complete evidence and a handoff, including failures and human waivers.
7. Accept, reject, or request repair. Approval of delivery does not independently authorize push, merge, deployment, or destructive operations.
