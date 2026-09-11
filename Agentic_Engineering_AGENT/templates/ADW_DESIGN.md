# ADW Design

## Outcome and adoption

- Workflow name / version:
- Original request, target and acceptance owner:
- Trigger and typed input (manual first):
- Observable criteria / non-goals:
- Why an ADW rather than one prompt:
- Existing primitives reused; missing primitives to create:
- Mode: design / supervised / unattended (unattended needs demonstrated gates):

## Composition

| Phase / entry point | Actor: code / agent / human | Input / prerequisite | Output contract / artifact | Independent gate | Failure / repair route |
|---|---|---|---|---|---|
| | | | | | |

## Agent invocations

| Role | Context / prompt path + version | Model/provider + reason | Tools / allowed effects | Cwd / writer owner | Output type |
|---|---|---|---|---|---|
| | | | | | |

## Gates and authority

| Criterion / check ID | Exact argv + cwd | Prerequisites / side effects | Timeout | Required? | Evidence / revision binding | Enforcement kind |
|---|---|---|---|---|---|---|
| | | | | | | |

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
- Human-supervised end-to-end walkthrough:
- Exact entry invocation / prerequisites / host registration (if applicable):
- Fresh-agent discovery and artifact handoff:
- Configured / tested / actually used / UNVERIFIED distinctions:
- Human approval and remaining decisions:
