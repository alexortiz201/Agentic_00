# Task Handoff

## Status

- Run ID:
- Mode: delivery / coaching / audit / design
- Outcome: accepted / acceptance_pending / partially_verified / blocked / failed
- Task state: requested / scoped / ready / building / validating / reviewing / documenting / acceptance_pending / accepted / authorized_handoff
- Blocked: yes / no — Repairing: yes / no — Return to (responsible state):
- Branch/worktree:
- Starting/current commit:
- Diff base / changed file count:

`partially_verified` is the honest report for real but incomplete verification; do not round it up to `acceptance_pending` or down to `blocked`. Outcome is not task state: `accepted` is a human's acceptance of the work, and shipping still requires the separate `authorized_handoff` step. A zero changed-file count means the evidence below was gathered against nothing — report that as `blocked`, never as a pass.

## Operating level movement

| From → to | Trigger / descent reason | Return condition | Evidence that satisfied it |
|---|---|---|---|
| | | | |

- Level at handoff:
- Attention spent per level (or `NOT MEASURED`):

Record every meaningful movement, including descents that were never returned from. A descent with no recorded return condition is an open loop for whoever picks this up.

## Outcome

- Requested:
- Delivered:

## Changes

| File/component | Behavioral impact |
|---|---|
| | |

## Reproduction (bug tasks)

- Repro record:
- Case that fails for the defect (expected vs received):
- Existing tests audited for whether they can distinguish the two states:

## Acceptance evidence

| Criterion | Exact command/inspection | Directory | Source | Result / exit code | Duration | Exercised scope | Caveat/artifact |
|---|---|---|---|---|---|---|---|
| | | | | | | | |

Result is `passed`, `failed`, `not_run`, or `error`. Source is `executed`, `inspected`, `documented`, or `asserted` — the provenance of the claim, which is a different question from how confident you are in it. A check that did not apply is not a result: list it under inapplicable checks with its reason.

## Inapplicable checks

| Check | Reason it does not apply |
|---|---|
| | |

## Review

| Finding | Disposition | Severity | Risk accepted | Evidence |
|---|---|---|---|---|
| | blocker / tech_debt / skippable | Blocker / High / Medium / Low / Note | yes / no | |

Disposition is what a gate reads; severity is for the human. An unaccepted `blocker` contradicts approval.

## Retry accounting

| Kind | Used | Notes |
|---|---|---|
| invocation_retry | | |
| output_correction | | |
| gate_repair | | |
| test_fix | | |
| review_revision | | |
| restart | | |

- Shared total budget used / available:

Caps bind the run, not the conversation. Starting a new session, a new subagent, or a new run ID for the same task does not reset these counters; carry them forward and say so here.

## Skipped, blocked, or UNVERIFIED

-

### Safe work remaining

What can still be progressed without the blocking decision, and what it must not touch:

-

## Plan deviations

-

## Residual risks

-

## Recovery/rollback

-

## Human waivers

| Failed check/finding and evidence | Approver / timestamp | Approved scope | Accepted consequences |
|---|---|---|---|
| | | | |

Failed checks remain failed even when waived. A waived gate records `human_waived`, which is not `pass`.

## Next exercise (coaching mode only)

Omit this section entirely outside coaching mode. In coaching mode it is mandatory and must be concrete enough to start cold.

- Competency being developed:
- Mastery score from this session (0–4, scored only from recorded evidence):
- Next exercise (task, operating level, what the engineer must predict before running it):
- Session record:

## Human decision required

- [ ] Accept
- [ ] Request repair
- [ ] Authorize handoff (shipping) — separate from acceptance
- [ ] Approve next external/destructive action (exact action, targets, potential loss, reversibility, recovery limits):
