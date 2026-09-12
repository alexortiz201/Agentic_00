# Salvage Mechanisms from Rejected Designs

## Inputs

CHOSEN_DESIGN, REJECTED_DESIGNS, RUN_CONTEXT (identity/workspace/scope/authority/budgets), OUTPUT_CONTRACT. Boot [AGENTS.md](../AGENTS.md) if not loaded. This is a separate pass over a decision already made; do not reopen the choice, and do not mutate target code. This prompt grants no authority.

## Workflow

1. Validate that the selection is settled and read why. Separate the two judgments the rejection actually made: *this alternative's scope is too large, slow or risky to ship now* and *this alternative's mechanisms are wrong*. They are independent, and the first is routinely used to silently decide the second. Only the second disqualifies a mechanism.
2. Enumerate the mechanisms in each rejected design — the specific technical devices, not the lanes: what signals completion, what owns state, what fails closed, what is checked and when. A mechanism named only inside a rejected lane is still a claim about the problem, not about that lane.
3. For each mechanism, state the concrete scenario in which CHOSEN_DESIGN behaves incorrectly without it. Write the scenario as an executable-sounding case with the expected and the wrong outcome. A mechanism replacing an **inferred** success signal with an **explicit** one is `promote` by default; `defer` or `drop` requires a stated reason. Inference holds on the happy path and fails on exactly the error path nobody exercised, so its absence is invisible until a failed operation is treated as a successful one.
4. Classify each mechanism **promote / defer / drop**. `promote` requires the step-3 scenario and must fit inside the chosen scope — if it does not, it is a `defer` with its blocking condition named. `drop` requires a reason the mechanism is wrong, unnecessary or superseded, never a reason its source design was too large — if scope is the only reason, the classification is `defer`. Record the result in the salvage table of [ADW_DESIGN.md](../templates/ADW_DESIGN.md).
5. Read the rejected designs' self-criticism and record what they say about the **winner**. A losing lane frequently names the real weakness of the chosen one, which is the highest-value paragraph the divergence produced. Report promoted mechanisms as scope changes needing approval; do not implement them here.

## Report

Follow OUTPUT_CONTRACT exactly. Default supervised report: the salvage table (mechanism, source design, promote/defer/drop, failing scenario), residual weaknesses the rejected lanes identified in CHOSEN_DESIGN, and the scope decision each `promote` now requires. "Nothing to salvage" is a permitted result only with the mechanisms examined listed and each shown already covered; an empty table is not that result.
