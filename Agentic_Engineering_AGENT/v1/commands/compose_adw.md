# Compose ADW

Portable command recipe. Input: TASK, TARGET, ENGAGEMENT_MODE, authorized SCOPE. Not a registered slash command.

ENGAGEMENT_MODE is `delivery`, `coaching`, `audit` or `design`, defined in the [quick reference](../ADW_QUICK_REF.md). This recipe runs in `design` through step 4 and only enters `delivery` at step 5, after implementation approval. `audit` stops at step 1 with an inventory of what already exists. Engagement is separate from the workflow's `autonomy_rung` (`supervised_task` / `gated_local` / `bounded_isolated` / `authorized_trigger` / `approved_shipping`), which records how far the composed ADW has been proven; record both.

## Workflow

1. Load [composition](../foundations/06_ADW_COMPOSITION.md) and [quick reference](../ADW_QUICK_REF.md). Preserve the original intent and discover existing target primitives.
2. Decide whether a prompt, single phase, or composition is sufficient. Label human judgment, agent judgment and deterministic nodes.
3. Where alternative designs were produced, run the salvage pass with [salvage](../prompts/salvage.md) before contracting the chosen one. Rejecting an alternative's scope is not rejecting its mechanisms; classify each mechanism promote / defer / drop and record the result in the design's salvage table. A mechanism that replaces an inferred success signal with an explicit one is `promote` by default. The rules a conformant pass is checked against are in [composition](../foundations/06_ADW_COMPOSITION.md).
4. Create a run-local [ADW design](../templates/ADW_DESIGN.md) after artifact-write approval. Specify contracts, gates, failure/repair routes, real commands, workspace, budgets and authority. Draw gate IDs from the default `G0`–`G7` namespace so records compare across projects; name any project-specific gate beside its `G` mapping.
5. Ask only unresolved consequential questions. In `design` engagement stop with the proposal; in `coaching` ask the engineer to defend the flow; in `audit` report and create nothing. No engagement except `delivery` permits target-code mutation, and `delivery` permits only the approved scope.
6. After implementation approval, build the smallest useful phase and missing primitives via [create primitive](create_primitive.md), then thin composition scripts using `adw_<phase>_<phase>.py` naming.
7. Perform [validation](validate_adw.md); add an entry recipe and usage/limits based on actual behavior. Do not install host integrations or launch external workflows merely because files exist.

## Report

Concise Markdown: chosen flow and rationale; salvage decisions and the failing scenario each promoted mechanism prevents; existing/reused/new primitive inventory; design and implementation paths; exact checks/results; declared engagement and autonomy rung; missing capabilities; approval needed. A proposal is not a verified runnable ADW.
