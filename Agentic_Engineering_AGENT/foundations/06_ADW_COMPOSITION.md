# Compose AI Developer Workflows

An **ADW (AI Developer Workflow)** is executable orchestration combining deterministic code with bounded agent judgment to deliver a defined outcome. A prompt is an instruction; a phase is a contracted unit of work; an ADW can contain one or several phases; a composition reuses those phases or proven ADWs. A skill makes the workflow discoverable and operable—it is not the controller.

Use [ADW_QUICK_REF.md](ADW_QUICK_REF.md) for primitive selection and naming. These are portable design conventions, not installed commands or claims that every workflow needs every component.

## Authoring process

1. **Define the outcome before the technology.** Preserve the original request; specify trigger, input, target, criteria, non-goals, acceptance owner, and side effects. Decide whether one focused prompt is sufficient.
2. **Inspect existing primitives.** Locate relevant instructions, prompt/command templates, scripts, tools, types, checks, state and workspace helpers. Trace implementations, not just descriptions. Reuse before scaffolding.
3. **Draw the sequence and failure routes.** Label every node human judgment, agent judgment, or deterministic code. Known commands, IDs, counters, routing enums, and receipts belong in code. Classification needs an agent only when meaning is ambiguous; validate its output against an allowed set.
4. **Contract each phase.** Define required predecessor artifacts, actor, Core Four (context, model, prompt, tools), cwd, allowed mutations, output schema, limits, checks, and next transitions. Build uses the approved plan; review uses the original criteria AND actual diff/evidence.
5. **Design gates before prompts.** Define the expected check set and real commands/cwd/timeouts. Specify success, failure, missing-output and interruption cases. Make independent code check artifacts and claims before advancing; agent confidence cannot approve its own transition.
6. **Persist the design.** Use [templates/ADW_DESIGN.md](templates/ADW_DESIGN.md). Obtain approval for the scoped implementation and side effects. Scaffolding, dependency installation, hooks, tracker updates, and worktree creation are mutations—even if a phase is called “plan.”
7. **Build the smallest vertical slice.** Implement typed contracts, the agent adapter, one useful phase, real quality checks and state/evidence storage. Use focused [prompts](prompts/plan.md); generate missing primitives with [commands/create_primitive.md](commands/create_primitive.md). Do not generate an entire platform for a one-off task.
8. **Compose thinly.** Reuse phase entry points; keep sequencing separate from prompts and model selection. Pass one run identity, explicit workspace and validated artifact references. Do not duplicate phase internals inside a composite script.
9. **Walk through and test.** First use mocked agents/tools and disposable workspaces; then a human-supervised real task within authority. Exercise the control-plane matrix below. Document exact invocation, prerequisites, artifacts, safe resume and cancellation before unattended use.
10. **Make it discoverable and improve deliberately.** Add an entry recipe/skill and conditional context links. Record effective config, measured cost/time/interventions and outcomes. Extract reusable patterns after repeated evidence; test a second use before claiming generality.

## Single-phase contract

| Boundary | Minimum requirement |
|---|---|
| Input | Schema version, task/run/phase/attempt IDs, original intent, approved scope, predecessor manifest |
| Invocation | One purpose; explicit cwd, context files, model/provider, prompt version, allowed tools and numeric limits |
| Execution | Controlled adapter; argv rather than interpolated shell strings; explicit timeout/cancellation; approved environment only |
| Output | Typed result envelope, concise summary, owned artifacts, changed paths, unresolved findings and proposed next action |
| Gate | Independent schema/domain/artifact/check validation tied to current revision and diff identity |
| Failure | Preserve result, partial effects and attempt accounting; route to correction, repair, human decision, or blocked handoff |

Use [templates/PHASE_RESULT.json](templates/PHASE_RESULT.json) and [templates/GATE_RESULT.json](templates/GATE_RESULT.json) as illustrative records. They are not schemas or validators. Implement consumer-tested types before machine use; reject placeholder records. Keep diagnostics off machine-consumed stdout; never parse the last plausible-looking path out of arbitrary prose.

Execution status (`completed`, `failed`, `blocked`, `cancelled`) is separate from task state, check result (`pass`, `fail`, `skipped`, `blocked`, `error`) and gate decision (`pass`, `blocked`, `human_waived`). An agent completion is not a passing check, human acceptance, or shipping permission.

### Validate handoffs in code

- Match schema version, task/run/phase/attempt, configured model/tools/cwd and expected artifact kinds.
- Resolve paths against authorized roots; reject traversal, symlink escape, wrong ownership, missing/empty content and stale artifacts. Never select the first matching plan from another run.
- Compare all expected checks against actual records. Reject missing, duplicate, unknown, malformed, empty or contradictory results; zero failures alone is not success.
- Retain timestamp, argv/cwd, timeout, exit, scope, measured duration or null, revision/diff identity and non-sensitive evidence references.
- Verify review criteria coverage and severity consistency, not merely `success: true`.
- If a human waives a failure, independently record approver, approval reference/time, exact failure and evidence, allowed scope, consequences and validity limit. Only that human decision can unblock it; original failed results stay failed. Destructive next actions need their own explicit approval.

## Composition examples

Names describe phase order; omitted obligations still need an explicit reason. These scripts are names for generated target-project files, not bundled executables.

| Need | Composition | Conditional additions |
|---|---|---|
| Plan for human decision | `adw_plan.py` | Readiness review; no implementation |
| Small understood change | `adw_plan_build.py` | Still require checks/review before acceptance, whether inline or later |
| Bug | `adw_plan_build_test.py` | Reproduce first; regression check; bounded test repair; separate review |
| Feature/refactor | `adw_plan_build_test_review.py` | Review/revise → affected tests → review again |
| Full delivery | `adw_sdlc.py` = plan/build/test/review/document | Explicit handoff; not automatic shipping |
| Prototype | plan for chosen stack → scaffold/build → checks → review → document | Stack template only when appropriate; installation approved separately |
| Parallel jobs | claim → isolated workspace → selected composition → integrate/check | One active writer per workspace; resource reservations and live worker accounting |
| Tracker-driven work | authenticated trigger → atomic claim → workflow → receipt/update | Tracker update is an adapter, not proof of acceptance |

A targeted repair receives the exact failing command/finding, spec, minimal relevant context and a capped budget. After a change, invalidate affected downstream gates; rerun the reproducer AND affected broader checks. A later review patch cannot reuse earlier test evidence as if the code were unchanged.

## Controller outline

This is pseudocode, not an installed runtime:

```text
validate task + effective config + authority
claim task/workspace if concurrent; record baseline
for phase in approved composition:
    validate prerequisites + current identity + remaining budgets
    run bounded code or agent adapter
    persist sanitized result and artifact manifest
    independently validate envelope, artifacts and required gates
    if blocked: bounded correction/repair or explicit human decision; do not advance
    persist transition with actor, evidence and next state
return handoff awaiting human acceptance
```

Prefer explicit phase calls over shell pipelines. If pipes are supported, reserve stdout for the contract and propagate every child's failure; the final child's zero exit must not hide an earlier failure. A “continue to collect evidence” mode may run independent diagnostics but cannot clear a failed gate or permit dependent mutation.

## Control-plane tests before adoption

| Inject | Required observation |
|---|---|
| Valid result + current artifacts + all expected checks | Advances exactly once; trace reconstructs the transition |
| Malformed JSON, wrong enum/ID, empty/missing result | Blocks; no fallback to empty success |
| Missing/empty/outside-root/stale artifact | Blocks the consuming phase |
| Failed/skipped/zero-test required suite | Blocks unless explicit bounded human waiver; never relabels as pass |
| Review claims approval while listing material findings | Blocks pending repair or explicit waiver |
| Repair changes checked files | Invalidates and reruns affected downstream gates |
| Timeout, process crash, cancellation, partial external write | Preserves evidence; inspects effects before retry; stops owned workers |
| Duplicate trigger or occupied workspace/port | Atomic claim/reservation prevents double execution; reports conflict |
| Denied capability, hook failure, agent attempts to alter gate policy | No unauthorized action; fails closed at the actual enforcement boundary |
| Invalid/expired waiver or unapproved destructive/shipping step | Blocks and asks for exact human authorization |

Test invocation retries, output corrections, test repairs, review revisions and full restarts separately, under a shared total budget. The default two repair attempts is a supervised starting point, not a license for unlimited nested retries. Resume revalidates workspace, partial effects, configuration and artifacts; a session ID is not recovery or isolation.

## Optional integration, not mandatory infrastructure

Add hooks only for an identified event need; use [hooks/HOOK_CONTRACT.md](hooks/HOOK_CONTRACT.md). Add MCP/tools only for required capabilities with checked input/output contracts and least privilege. Add triggers only after the local workflow is proven, with authenticated/authorized inputs, allowed workflow routing, atomic claims, deduplication and cancellation. Add shipping only under separate human authority and current gates; commit, push, merge and deployment are distinct effects.
