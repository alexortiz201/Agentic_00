# Compose ADW

Portable command recipe. Input: TASK, TARGET, MODE (design/coaching/delivery), authorized SCOPE. Not a registered slash command.

## Workflow

1. Load [composition](../06_ADW_COMPOSITION.md) and [quick reference](../ADW_QUICK_REF.md). Preserve the original intent and discover existing target primitives.
2. Decide whether a prompt, single phase, or composition is sufficient. Label human judgment, agent judgment and deterministic nodes.
3. Create a run-local [ADW design](../templates/ADW_DESIGN.md) after artifact-write approval. Specify contracts, gates, failure/repair routes, real commands, workspace, budgets and authority.
4. Ask only unresolved consequential questions. In design mode stop with the proposal; in coaching mode ask the engineer to defend the flow. Neither mode permits target-code mutation by itself.
5. After implementation approval, build the smallest useful phase and missing primitives via [create primitive](create_primitive.md), then thin composition scripts using `adw_<phase>_<phase>.py` naming.
6. Perform [validation](validate_adw.md); add an entry recipe and usage/limits based on actual behavior. Do not install host integrations or launch external workflows merely because files exist.

## Report

Concise Markdown: chosen flow and rationale; existing/reused/new primitive inventory; design and implementation paths; exact checks/results; missing capabilities; approval needed. A proposal is not a verified runnable ADW.
