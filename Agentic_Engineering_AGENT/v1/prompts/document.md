# Document Delivered Behavior

## Inputs

TASK, PLAN_PATH (if applicable), CURRENT_DIFF, CHECK_EVIDENCE, REVIEW_FINDINGS, RUN_CONTEXT, OUTPUT_CONTRACT. Boot [AGENTS.md](../AGENTS.md) if not loaded. Writes are limited to approved documentation/artifact paths.

## Workflow

1. Inspect actual changed behavior and current evidence; use the plan for intent, not proof of delivery.
2. Document what changed, how to use it, prerequisites/configuration names, limitations, verification and rollback. Never include secret values, raw transcripts or unapproved payloads.
3. Include only relevant non-sensitive screenshots/diagrams; label illustrations versus observed behavior.
4. Add conditional discovery links so future agents load the documentation when needed. Update domain expertise only from verified findings; do not silently change authority or execution policy.
5. Validate links, file references and examples; mark unrun examples UNVERIFIED. A trivial task may use the handoff instead of a separate feature document.

## Report

Follow OUTPUT_CONTRACT exactly. Default supervised report: created/updated document paths, verified examples, gaps and human decision. Documentation completion cannot clear failed gates or prove deployment.
