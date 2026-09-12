# Implementation Plan

## Summary

- Mode: delivery / coaching / audit / design
- Operating level for this plan: L1 / L2 / L3 / L4 / L5
- Descent reason / return condition:

## Discovery evidence

| Claim | Source | Reference |
|---|---|---|
| Repository instructions | executed / inspected / documented / asserted | |
| Relevant implementation | | |
| Relevant tests/commands | | |
| Git/worktree state | | |

Source is provenance, not confidence: "the README says the suite is green" is `documented` and ranks fifth in the evidence hierarchy even when you are certain it was written in good faith. Never promote a weaker claim into a stronger one by restating it.

## Reproduction (bug tasks only)

- Repro record path (see [`REPRO_RESULT.json`](REPRO_RESULT.json)):
- Case that fails **for the defect** — expected vs received:
- Existing tests audited for whether they can distinguish the broken state from the fixed one:

Build may not begin without a repro record carrying at least one `fails_for_defect: true` case. A test that errors on a missing module also fails and is not a reproduction, and a test whose before and after values are equal by construction is not coverage.

## Acceptance mapping

| Criterion | Change | Verification | Gate ID |
|---|---|---|---|
| | | | G0–G7 |

## Ordered steps

1.

## Files/interfaces expected to change

-

## Risks and controls

| Risk | Control | Label: code-enforced / human-approved / agent-checked |
|---|---|---|
| | | |

## Verification plan

| # | Check | Gate ID | Exact argv + cwd | Required? | Applicable? |
|---|---|---|---|---|---|
| 1 | | | | | |

Every gate whose subject is a change binds to a workspace, a `diff_base` and a `changed_file_count`. Plan for the null case: a gate that observes zero changed files has not found its subject and reports `blocked`, never `pass`. A check that does not apply is recorded as `applicable: false` with a reason — never as a result, and never as a pass.

## Rollback/recovery

## Stop conditions

Separate caps per retry kind, under one shared total budget (default: two supervised repair attempts):

| Kind | Cap |
|---|---|
| invocation_retry | |
| output_correction | |
| gate_repair | |
| test_fix | |
| review_revision | |
| restart | |

- Shared total budget (attempts / time / cost):
- Per-command timeout:
- Scope/risk escalation triggers:

Caps bind the run, not the conversation. Do not evade them by starting a new session, a new subagent, or a new run ID for the same task; carry the counters forward on resume. Raising a cap requires explicit human approval, recorded as a waiver. Exhaustion or a repeated identical failure is `blocked`, not another attempt.

## Repair routing

| Failure class | Responsible state (`return_to`) | Evidence invalidated by the repair |
|---|---|---|
| | requested / scoped / ready / building / validating / reviewing / documenting | |

Repair returns to the state responsible for the failure, not unconditionally to validation. A missing requirement repaired and returned to validation skips re-scoping entirely and validates the wrong thing correctly.

## Plan review

- Scope approved by:
- Authority approved by:
- Approval timestamp/reference:
