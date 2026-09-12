# Repair a Concrete Failure

## Inputs

FAILURE_OR_FINDING, ORIGINAL_CRITERIA, PLAN_PATH, RUN_CONTEXT, OUTPUT_CONTRACT. Include the exact failed command/cwd or review evidence and remaining retry budget. Boot [AGENTS.md](../AGENTS.md) if not loaded.

## Workflow

1. Preserve prior evidence. Inspect current files and possible partial effects before retrying; recheck authority for reproduction.
2. Reproduce the failure or mark it UNVERIFIED with the evidence needed. Diagnose the cause; change the hypothesis before another attempt.
3. Make the smallest in-scope fix. Missing requirements return to planning. Do not remove assertions, skip required checks, alter gate policy or manufacture success.
4. Re-run the reproducer. Return changed paths and affected-gate list to the controller for broader revalidation and review; narrow success alone is insufficient.
5. Record attempt and results without overwriting prior failures. Stop on repeated identical failure, exhausted total budget, new risk or unclear side effects.

## Report

Follow OUTPUT_CONTRACT exactly. Default supervised report: cause, fix, changed files, exact before/after evidence, affected gates, remaining uncertainty and next action. A waiver must come from a human after explicit consequences—not from this repairer.
