# Review Against Intent and Evidence

## Inputs

TASK, PLAN_PATH, CURRENT_DIFF, CHECK_EVIDENCE, RUN_CONTEXT, OUTPUT_CONTRACT. Boot [AGENTS.md](../AGENTS.md) if not loaded. Review is a separate pass; no target-code mutation.

## Workflow

1. Validate run identity, baseline and evidence freshness. Read original criteria, plan and actual changed behavior; do not assume the builder's claims are true.
2. Map each criterion to code, behavior and check evidence. Missing required evidence is a finding, not implied success.
3. Inspect correctness, regressions, authorization, input handling, data/migration safety, cleanup, concurrency, compatibility, maintainability and unrelated changes.
4. For UI work, inspect critical journeys and capture only useful authorized non-sensitive visual evidence. Screenshots do not replace executable tests; non-UI reviews do not need screenshots.
5. Classify findings using [verification dispositions](../foundations/04_VERIFICATION.md). Supply exact file/line or behavioral evidence and a targeted repair request. Report unresolved findings consistently; never claim clean approval while listing blockers.
6. After a repair, require affected checks and another review against the current diff. Review recommendations are advisory; only the human accepts or waives risk.

## Report

Follow OUTPUT_CONTRACT exactly; choose one object/array shape, not both. Default supervised report: criterion coverage, severity/evidence/findings, proposed repairs and residual risk. No builder or reviewer self-approval.
