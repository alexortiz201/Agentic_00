# Plan a Bounded Change

## Inputs

TASK, RUN_CONTEXT (identity/workspace/scope/authority/budgets), RELEVANT_CONTEXT, OUTPUT_CONTRACT. Boot [AGENTS.md](../AGENTS.md) if not loaded. This prompt grants no authority.

## Workflow

1. Validate target, original intent, criteria and allowed artifact path. Inspect current instructions, relevant code/tests, Git baseline and unknowns.
2. For a bug, reproduce or record why blocked before proposing a cause. For a feature, specify the user journey and edge cases. For a chore/refactor, specify behavior that must remain unchanged.
3. Write the smallest implementation plan using [PLAN.md](../templates/PLAN.md), including exact checks/cwd, baseline failures, scope, rollback and criteria mapping. A fresh builder must not need hidden chat context.
4. Add only needed domain/stack context; no scaffolding, dependency installation or target-code edits during planning.
5. Report unresolved requirements and required human approval. Do not invent readiness or accept your own plan.

## Report

Follow OUTPUT_CONTRACT exactly. Default for supervised use: concise Markdown with plan path, unknowns and approval needed. For an ADW, the controller must supply its typed phase-result contract; missing contract blocks invocation. Only use a single-path output when that consumer explicitly requires it and has a separate failure channel.
