# Build from an Approved Plan

## Inputs

PLAN_PATH, RUN_CONTEXT, OUTPUT_CONTRACT. Boot [AGENTS.md](../AGENTS.md) if not loaded. This prompt grants no authority.

## Workflow

1. Verify the plan exists, is current, belongs to this run and is within authorized roots. Confirm approval, cwd, branch/worktree, user changes and one-writer ownership.
2. Read the plan and only the required context. Implement small coherent changes and meaningful tests without weakening gates.
3. Stop before changes to scope, acceptance, permissions or gate policy. Request a new decision rather than silently broadening the plan.
4. Run understood authorized focused checks; record exact results. The independent controller remains responsible for required verification gates.
5. Inspect changed, staged and untracked files; report task-owned changes and deviations. No automatic commit, push, tracker update or shipping without its own authority.

## Report

Follow OUTPUT_CONTRACT exactly. Default supervised report: changed files/behavior, check commands/cwd/results, deviations, gaps and next gate. In an ADW use the supplied typed envelope with artifact/evidence references; never equate execution completion with verification or acceptance.
