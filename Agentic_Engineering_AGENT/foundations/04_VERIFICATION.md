# Verification

## Ladder

Run the highest applicable levels:

1. format, lint, typecheck, and config/schema validation;
2. focused unit tests;
3. integration and database/API tests;
4. production build/package;
5. controlled end-to-end tests;
6. security and broader regression checks;
7. human acceptance for outcomes automation cannot establish.

Discover actual commands from project instructions, manifests, scripts, and CI.

## Evidence record

For each check capture:

| Field | Content |
|---|---|
| Criterion | Acceptance criterion or risk addressed |
| Command/directory | Exact command with secrets redacted; working directory |
| Result | pass, fail, skipped, or blocked; exit code |
| Duration | Measured value or `NOT MEASURED` |
| Scope | Behavior/components exercised |
| Artifact/caveat | Relevant non-sensitive output, mocks, missing service, or skipped cases |
| Identity/freshness | Run/phase/attempt, timestamp, checked revision and diff identity |
| Bounds | Timeout and expected check ID |

## Gate rules

- A required failure blocks readiness until repaired or explicitly human-waived; later steps never erase its failed result. Record waiver evidence, approver, time, scope, and accepted consequences in task state and handoff.
- A skipped suite is not a pass.
- “No tests found” is not proof of correctness.
- Review prose does not replace executable checks.
- Previous artifacts do not prove current correctness.
- Configured tooling does not prove it ran.
- Compare the full expected check set with actual results; missing, malformed, duplicate, empty, stale or contradictory results cannot pass.
- Agent completion, populated state, an existing directory and a path-looking string do not prove correct output. Validate identity, containment, content and freshness.
- Keep required mechanical gates in the controller and outside builder control. In supervised sessions label agent-only checks honestly.

## Review checklist

Inspect the final diff for criteria coverage, invalid inputs, error cleanup, injection and authorization, secret handling, transaction/migration safety, concurrency, compatibility, UI states, performance, sensitive logging, meaningful tests, documentation impact, and unrelated files.

| Severity | Disposition |
|---|---|
| Blocker | Repair or obtain explicit human waiver before readiness; blocked handoff is allowed |
| High | Repair or receive explicit risk acceptance |
| Medium | Repair in scope or document follow-up |
| Low | Optional documented improvement |
| Note | No action required |

After any repair or review revision, invalidate affected downstream evidence, re-run the reproducing check and affected required gates, then review the current diff. A later successful phase cannot clear an earlier failure.

For workflow implementation, also test the [control-plane failure cases](06_ADW_COMPOSITION.md) before unattended adoption. Static file/link validation is not an end-to-end ADW test.
