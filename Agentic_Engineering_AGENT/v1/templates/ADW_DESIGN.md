# ADW Design

## Outcome and adoption

- Workflow name / version:
- Original request, target and acceptance owner:
- Trigger and typed input (manual first):
- Observable criteria / non-goals:
- Why an ADW rather than one prompt:
- Existing primitives reused; missing primitives to create:
- Engagement mode: delivery / coaching / audit / design (what this session may change):
- Autonomy rung: supervised_task / gated_local / bounded_isolated / authorized_trigger / approved_shipping (claimed from evidence; each rung earned separately, not skipped):

## Composition

| Phase / entry point | Actor: code / agent / human | Input / prerequisite | Output contract / artifact | Independent gate | Failure / repair route |
|---|---|---|---|---|---|
| | | | | | |

### Salvage from rejected designs

Complete before contracting the phases above. Rejecting an alternative's **scope** is not rejecting its **mechanisms**; the two judgments are independent and the first is routinely used to silently decide the second.

| Mechanism | Source design | promote / defer / drop | Failing scenario it prevents |
|---|---|---|---|
| | | | |

- A `promote` requires a concrete failing scenario in the last column — the specific case the chosen design gets wrong without this mechanism. "Seems safer" is not a scenario.
- A `defer` names the condition that makes the mechanism required; a `drop` names why the mechanism is wrong, unnecessary or superseded. Scope alone is never a `drop` reason — it is a `defer`.
- A mechanism replacing an **inferred** success signal with an **explicit** one is `promote` by default; `defer` or `drop` needs a stated reason. Inference is sound in the happy case and wrong in exactly the error case nobody exercised.
- "Nothing to salvage" is an outcome, not a default: state which rejected mechanisms were examined and why each is already covered by the chosen design.
- If no alternative was produced, say so here rather than leaving the table blank.

## Agent invocations

| Role | Context / prompt path + version | Model/provider + reason | Tools / allowed effects | Cwd / writer owner | Output type |
|---|---|---|---|---|---|
| | | | | | |

## Gates and authority

| Gate ID (`G0`–`G7`, or a named gate mapped to one) | Criterion / check ID | Exact argv + cwd | Prerequisites / side effects | Timeout | Required? | Evidence / revision + diff-base binding | Enforcement kind |
|---|---|---|---|---|---|---|---|
| | | | | | | | |

- A gate whose subject is a change binds to a non-empty diff: record base revision and changed-file count, and block on zero changed files rather than passing.
- Execution policy: fail-fast / collect-all; dependent failures:
- Approved files/resources/actions and approval reference:
- Secret/data/network boundary and actual enforcing mechanism:
- Waiver owner, required fields and validity limit:
- Destructive/external actions (targets, possible loss, reversibility, recovery):
- Shipping disabled unless separately authorized:

## State and recovery

- Run/phase/attempt identity and artifact root (map to existing conventions):
- Schema version / consumer validation / effective configuration record:
- Atomic state writes; transition actor/evidence/next state:
- Baseline commit + diff identity; downstream invalidation after repair:
- Separate caps: invocation retries / output corrections / test repairs / review revisions / restarts:
- Shared total time/cost/attempt budget; default two supervised repair attempts:
- Claim/idempotency key, writer ownership and live-worker accounting:
- Resource reservation, cancellation, partial-effects inspection, resume, cleanup owner:

## Adoption evidence

- Mocked success and failure cases from the composition guide:
- Real target check commands and observed results:
- Wrong-workspace case exercised for each gate and primitive:
- Human-supervised end-to-end walkthrough:
- Exact entry invocation / prerequisites / host registration (if applicable):
- Fresh-agent discovery and artifact handoff:
- Configured / tested / actually used / UNVERIFIED distinctions:
- Human approval and remaining decisions:
