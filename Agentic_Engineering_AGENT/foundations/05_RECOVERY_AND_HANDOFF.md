# Recovery and Handoff

## Record failures

Preserve the state, failed step, command/tool, exit status, concise output, changed artifacts, cause hypothesis, retry safety, next action, and approval needed. Never overwrite the only failure evidence.

## Retry deliberately

Retry only after something changes: input, code, configuration, dependency, scope, justified timeout, or a bounded transient backoff. Set and persist a numeric retry budget before implementation (default: two repair attempts). Increment `attempt` for each repair attempt. Exhaustion or repeated identical failure becomes `blocked`; budget changes require human approval.

## Make runs resumable

Another agent must be able to identify:

- outcome and approved scope;
- current state and last successful step;
- branch/worktree and Git status;
- changed files and completed checks;
- unresolved failures/findings;
- next action and required authority.

Use per-run copies of [`templates/TASK_STATE.json`](templates/TASK_STATE.json) and [`templates/HANDOFF.md`](templates/HANDOFF.md). Before resuming, recheck Git status and current files against recorded evidence, confirm approvals still cover the next action, and inspect possible partial side effects before retrying. Do not assume a timed-out action did nothing.

## Rollback

Plan rollback before high-risk changes. Prefer reversible edits and additive migrations. Preserve unrelated work. In order:

1. regenerate artifacts from their source;
2. revert only agent-owned changes;
3. use a tested application/database rollback;
4. ask a human to choose among destructive alternatives.

## Handoff

Report:

1. requested and delivered outcome;
2. run state and branch/worktree;
3. files and behavioral impact;
4. verification commands and results;
5. skipped or blocked checks;
6. review findings and dispositions;
7. plan deviations;
8. residual risk and `UNVERIFIED` claims;
9. rollback instructions;
10. decision required from the human.

## Escalation

> **Blocked on:** specific condition  
> **Evidence:** concise facts  
> **Options:** choices and consequences  
> **Recommendation:** choice and rationale  
> **Approval needed:** exact action and scope
