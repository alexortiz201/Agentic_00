# 🔎 Code review

A second pass over a finished change by someone who did not write it. What it looks at, what a finding has to carry so the next step can act on it, and the boundary that makes review useful at all: **a review produces findings, not decisions.** What changes when the reviewer is an agent is in [`Agentic_Engineering/04_VERIFICATION.md`](../Agentic_Engineering/04_VERIFICATION.md); what counts as evidence for the claims a review consumes is in [`02_TESTING_AND_EVIDENCE.md`](02_TESTING_AND_EVIDENCE.md).

## What a review inspects

Correctness / regressions / authorization / input handling / data and migration safety / cleanup / concurrency / compatibility / maintainability / **changes unrelated to the task**.

Map each acceptance criterion to code, behaviour and check evidence. **Missing required evidence is a finding, not implied success**, and the builder's claims are not evidence.

## Review checklist

Inspect the final diff for criteria coverage, invalid inputs, error cleanup, injection and authorization, secret handling, transaction/migration safety, concurrency, compatibility, UI states, performance, sensitive logging, meaningful tests, documentation impact, and unrelated files.

## Every finding carries two orthogonal fields, plus a flag

- `disposition`: `blocker` | `tech_debt` | `skippable` -- machine-consumed, and the only field a gate reads.
- `severity`: `Blocker` | `High` | `Medium` | `Low` | `Note` -- human-facing, for triage and communication.
- `risk_accepted`: `true` | `false` -- set only by a human, naming who accepted what.

A finding that means "repair this, or have someone accept the risk in writing" is not tech debt -- tech debt carries no acceptance requirement -- and it is not a plain blocker either. It is `disposition: blocker` with `risk_accepted` available.

| Severity | Disposition | Required handling |
|---|---|---|
| Blocker | `blocker` | Repair, or obtain an explicit human waiver before `acceptance_pending`; blocked handoff is allowed |
| High | `blocker` | Repair, or a human sets `risk_accepted: true` with named consequences. Until then it blocks |
| Medium | `tech_debt` | Repair in scope or record a follow-up item; does not block |
| Low | `tech_debt` | Optional documented improvement |
| Note | `skippable` | No action required |

Why the two fields are kept apart, and the conformance test a review record has to pass before a gate can consume it, are in [`Agentic_Engineering/04_VERIFICATION.md`](../Agentic_Engineering/04_VERIFICATION.md).

## Approval is not authorization

**Reviewer output is advisory until an independent gate accepts it.** An approving review is a finding, not a decision -- reading it as a gate result is how approval quietly becomes authorization. The reviewer's job is to say what is wrong with the change; deciding that the change may now proceed is a separate act, performed by whatever holds that authority, on the strength of the evidence rather than on the strength of the approval.

## After a repair, run it again -- and review it again

After a repair, the affected checks run again **and the review runs again against the current diff**.

Invalidate affected downstream evidence, re-run the reproducing check and affected required gates, then review the current diff. **A later successful phase cannot clear an earlier failure**, and a review of a superseded diff is a review of code that is no longer the code.
