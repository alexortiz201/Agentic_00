---
name: adw-authoring
description: Design, compose, implement, and validate AI Developer Workflows and their supporting primitives for a scoped software-delivery task.
---

# ADW Authoring

Use when asked to create an ADW, compose phases, add a workflow primitive, or make an existing workflow agent-operable. Do not scaffold an ADW for a one-off task that a bounded prompt and checks can handle.

This is a portable recipe, not installed host automation. Resolve links relative to this skill; do not assume cwd is the package root. Read [AGENTS.md](../../AGENTS.md) and complete its boot if not already loaded.

## Route the request

| Request | Load |
|---|---|
| Design or compose a workflow | [compose ADW](../../commands/compose_adw.md) |
| Create a prompt, command, skill, tool, hook or adapter | [create primitive](../../commands/create_primitive.md) |
| Choose between competing designs, or salvage mechanisms from a rejected one | [salvage](../../prompts/salvage.md) |
| Validate adoption, debug orchestration, or rehearse failure | [validate ADW](../../commands/validate_adw.md) |
| Identify what pieces are needed | [quick reference](../../ADW_QUICK_REF.md) |

## Operate

1. Confirm target, outcome, acceptance criteria, engagement mode, scope and authority. Reuse supplied answers.
2. Inspect the existing entry points and actual implementation. Select the smallest sufficient recipe.
3. Resolve phase contracts, workspace, real checks, limits and approvals before launch.
4. Use an existing verified controller when present; do not bypass its gates with agent confidence. If missing, design/build it within approval; do not pretend this skill enforces transitions.
5. Return artifact links, exact check evidence, configured-versus-tested status, failures/waivers, and the next human decision.

## Engagement mode

Declare one of `delivery`, `coaching`, `audit` or `design`, defined in the [quick reference](../../ADW_QUICK_REF.md):

- **`delivery`** — do the authorized work, within the approved scope only.
- **`coaching`** — have the engineer explain the actor allocation, handoffs, gate evidence and failure routes before implementing.
- **`audit`** — inspect and report what exists. Create, install and execute nothing.
- **`design`** — propose and stop at the proposal. Design artifacts describe a change; they are not the change.

Never let engagement expand authority. Engagement is separate from a workflow's `autonomy_rung` (`supervised_task` / `gated_local` / `bounded_isolated` / `authorized_trigger` / `approved_shipping`), which records how far that workflow has been proven and is recorded in [ADW_DESIGN.md](../../templates/ADW_DESIGN.md).
