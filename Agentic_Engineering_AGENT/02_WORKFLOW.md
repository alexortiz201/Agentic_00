# Workflow

## Choose the smallest safe flow

| Task | Flow |
|---|---|
| Read-only question | discover → answer with evidence |
| Tiny low-risk edit | discover → implement → verify → review → handoff |
| Feature, bug, or chore | intake → discover → plan → approve → implement → verify → review → repair → handoff |
| Independent parallel work | decompose → isolate workers → verify each → integrate → full verify |
| External/high-risk action | plan → explicit approval → one bounded action → verify → pause |
| Create/compose an ADW | discover primitives → contract phases/gates → approve → build vertical slice → test failures → supervised walkthrough → handoff |

## Lifecycle

1. **Intake** — assign a run ID; capture outcome, scope, constraints, risks, and acceptance criteria. Clarify ambiguity.
2. **Discovery** — read instructions/manifests; inspect Git state, relevant code/tests/scripts/CI, dependencies, data, and services. Mark unknowns `UNVERIFIED`.
3. **Planning** — map every criterion to changes and checks; identify files, interfaces, risks, rollback, and optional follow-up. Obtain plan approval for non-trivial work; tiny low-risk edits require explicit task scope only.
4. **Implementation** — use a branch/worktree for non-trivial or parallel work; make the smallest coherent change; add tests; record deviations; preserve unrelated work.
5. **Verification** — run focused then broader checks; capture command, directory, result, exit code, scope, duration, and caveats. Required failures transition to `repairing` or `blocked` unless explicitly waived by a human; failed results remain failed.
6. **Review** — independently inspect correctness, security, regressions, maintainability, and scope. Classify findings.
7. **Repair** — use concrete failures/findings, change the hypothesis before retrying, and re-run affected checks. Stop when the retry budget is exhausted.
8. **Handoff** — report changes, evidence, gaps, risks, and recovery. A human accepts or requests repair.

## State

Use `intake`, `discovery`, `planned`, `implementing`, `verifying`, `reviewing`, `repairing`, `blocked`, `ready_for_acceptance`, and `accepted`. These track this agent's task. Generated ADWs define separate phase execution and gate records using [composition contracts](06_ADW_COMPOSITION.md); do not overload task state with check outcomes.

Persist at least:

```json
{
  "run_id": "task-YYYYMMDD-name",
  "state": "planned",
  "attempt": 0,
  "task": "bounded outcome",
  "acceptance_criteria": [],
  "scope": {"allowed": [], "excluded": []},
  "authority": {"approved": [], "requires_approval": []},
  "artifacts": {"plan": null, "evidence": [], "handoff": null},
  "failures": [],
  "next_action": "human approves plan"
}
```

Use the complete state template for run records; this example is only the minimum shape. Store per-run copies under `runs/<run_id>/` inside this package after authorizing artifact writes. Update state after each step and before yielding; retain failure evidence. Write a temporary file then rename within the same directory where practical. Never store secrets.

Normal transitions follow `intake → discovery → planned → implementing → verifying → reviewing → ready_for_acceptance → accepted`. Tiny edits may skip `planned`; read-only answers stop after discovery. Failures enter `repairing` or `blocked`; repair returns to verification. Resume a blocked run only after checking current Git state, evidence, scope, and authority, then recording the chosen next state. `failed` is a check result, not a task state.

Before readiness, every required failure/material finding must be repaired or explicitly human-waived. Record who approved, when, the exact failure/finding, evidence reference, scope, and accepted consequences. Destructive next actions require separate explicit authorization describing loss and recovery limits. Human acceptance never changes a failed check into a pass.

## Role separation

Planning does not edit target code; authorized task artifacts may be written. Implementation follows the approved plan or explicitly authorized tiny-edit scope. Verification checks observable behavior. Review searches for defects. Repair receives specific findings. These may be separate agents or deliberately separate passes.

## Parallel work

Parallelize only when tasks have independent criteria, explicit ownership, isolated branches/worktrees, safe shared resources, an integration order, and a combined test plan. Enforce one active writer per workspace, atomic task claims, duplicate protection and live-worker accounting before unattended pickup. A queue shows status; it does not guarantee correctness. Cancellation must account for detached workers; port probes are not reservations.
