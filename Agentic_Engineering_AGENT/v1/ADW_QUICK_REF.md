# ADW Quick Reference

**ADW = AI Developer Workflow:** deterministic orchestration + bounded agent judgment + checked artifacts + evidence. Start with one useful outcome, not a roster of agents. See [composition](foundations/06_ADW_COMPOSITION.md) for the authoring process.

## Engagement and autonomy rung

Two independent axes. Declare both at intake; neither expands authority.

**Engagement mode** (`engagement_mode`) — what this session is permitted to change:

| Engagement mode | Permitted | Entry points that default to it |
|---|---|---|
| `delivery` | Authorized mutation of the target within approved scope | [compose ADW](commands/compose_adw.md) after implementation approval; [build](prompts/build.md), [repair](prompts/repair.md) |
| `coaching` | The same flow, but the engineer explains and defends actor allocation, handoffs, gate evidence and failure routes before anything is built | [ADW authoring skill](skills/adw-authoring/SKILL.md) |
| `audit` | Inspect and report only. No creation, installation or execution | [agentic cheat sheet](commands/agentic_cheatsheet.md), [validate ADW](commands/validate_adw.md) |
| `design` | Propose and stop at the proposal. Write artifacts that *describe* a change, never the change | [compose ADW](commands/compose_adw.md) through the design step |

`audit` and `design` are genuinely different: **proposing is not inspecting.** An audit that starts writing a proposal has changed engagement and must say so. A design that starts editing target code has changed engagement and needs the authority that goes with it.

**Adoption stage** — how far a workflow has been proven, recorded in [ADW_DESIGN.md](templates/ADW_DESIGN.md):

`supervised_task` → `gated_local` → `bounded_isolated` → `authorized_trigger` → `approved_shipping`. A rung is claimed from evidence, not intent, and each is earned separately rather than skipped: `gated_local` needs gates running in code, `bounded_isolated` needs contained and recoverable failure, `authorized_trigger` needs authenticated and deduplicated external starts. Engagement can be `delivery` at any rung; the rung bounds how much of the flow runs without a human in it.

## Primitives: what, when, where

This table is the **canonical primitive taxonomy**. [`commands/create_primitive.md`](commands/create_primitive.md) takes its `KIND` from these ids; do not introduce a second list. It authors every kind except `composition`, which is assembled from existing phases through [`commands/compose_adw.md`](commands/compose_adw.md).

Paths below are target-project conventions, not files promised by this package. Adapt existing project conventions; generate only needed pieces. The Markdown/Python split in the location column is deliberate rather than accidental: it describes a concrete reference architecture in which **Markdown commands and prompts are the prompt layer and Python is the controller** that invokes them, enforces gates and persists state. Substitute your own controller language — the division of responsibility is the portable part, not the file extension.

| Kind | Purpose / when needed | Usual location |
|---|---|---|
| `instructions` | Identity, authority, invariant safety; every task | `AGENTS.md`, small `CLAUDE.md` bootstrap |
| `context_recipe` | Load the code/docs relevant to *this* task, not everything; also the reviewed domain/stack reference a repeated decision needs | `commands/prime.md`, conditional documentation index, focused domain reference |
| `prompt` | One bounded reasoning task with inputs, workflow and exact report contract | `prompts/<role>.md` |
| `command` | The invocation surface for a reusable prompt or recipe — portable Markdown, or a host slash command where registration is verified | `commands/<verb>.md`; `.claude/commands/<verb>.md` when supported |
| `skill` | When/how to choose and operate a capability; load details on demand | `skills/<capability>/SKILL.md` or host-equivalent |
| `role` | Purpose + context/model/prompt/tools + schema/limits/authority | Runner configuration; separate from sequencing |
| `template` | Repeated artifact shape, the metaprompt that generates one, and the plan/spec shape a fresh builder reads without hidden chat context | `templates/`, `commands/create_primitive.md`; instances in `specs/<task>-<run>-<slug>.md` |
| `type` | Consumer contract; run/phase identity, outputs and failure cases | `adws/adw_modules/data_types.py` |
| `state` | Durable transitions, effective config, attempts and resume facts | `adw_modules/state.py`; `agents/<run_id>/` |
| `gate` | Run known checks in code and compare expected versus actual evidence | `adw_modules/quality.py`, `adw_modules/gates.py` |
| `tool_adapter` | Typed CLI/SDK/service invocation with explicit cwd, timeout, output parsing and redacted trace — agent adapters and tracker/service adapters alike | `adws/adw_modules/agent.py`, typed service adapter |
| `workspace_adapter` | Non-trivial/parallel work; one writer, explicit cwd and owned resources | `adw_modules/worktree_ops.py`; `trees/<run_id>/` |
| `phase` | Independently callable bounded unit with prerequisites and its own gate | `adws/adw_plan.py`, `adw_build.py`, `adw_test.py` |
| `composition` | Thin sequencing of existing phases; preserve their gates and failure routes | `adws/adw_plan_build.py`, `adw_plan_build_test_review.py` |
| `trigger` | Unattended pickup or external task updates, only when needed | `adws/adw_triggers/` |
| `hook` | Event observation or tested pre-action gate; not workflow orchestration | Host hook directory + explicit registration |
| `docs_scenario` | Actual delivered behavior, usage, critical journey and future context | `app_docs/`; executable tests or bounded browser recipe |

Three things that look like separate kinds and are not. **Repair** is a `prompt` (`prompts/repair.md`) plus a bounded controller loop, not its own primitive. **Plan / spec** is an instance of a `template`, produced by a run rather than authored once. **Domain expert / stack recipe** is a `context_recipe` with a review procedure attached. Naming them as kinds invites a fourth copy of the same artifact.

## Naming and composition

- `adws/` is a directory; `adw_plan.py` and `adw_plan_build.py` are **files**, not folder names.
- `adw_<phase>.py` is a phase entry point; `adw_<phase>_<phase>.py` composes phases in the named order. `adw_sdlc.py` is shorthand—document its actual phases.
- `_iso` describes an implemented workspace variant, not a sandbox guarantee. Worktrees share host resources and Git metadata.
- Use stable run identity across all phases; unique phase/attempt directories prevent overwritten failures. Track model session IDs separately.
- `agents/<run_id>/` holds output/state; `trees/<run_id>/` holds working files; `specs/` holds plans. These are different responsibilities.
- For work performed by this package, use `runs/<run_id>/` as described in [run artifacts](handbook/02_RUN_ARTIFACTS.md). A generated ADW may use the target's artifact convention; record the mapping once.
- Public names, routing enums, CLI help, prompt arguments, types and recipe links must change together.

## Choose the smallest sufficient set

| Situation | Needed | Add only if justified |
|---|---|---|
| One-off supervised task | Scoped prompt, observable criteria, checks, handoff | No ADW framework |
| Repeated plan/build | Task contract, planner/builder prompts, runner, state, checked plan, gates | Domain template |
| Test/review repair | Exact evidence, finding schema, separate passes, capped repair + revalidation | Browser scenarios for UI |
| Unattended or parallel | Above + claims, isolation, cancellation, identity, recovery and independent gates | Scheduler, tracker, dashboard |
| Repeated expertise | Focused skill + verified reference and update procedure | Self-updating expertise; never self-updating authority |

## Prompt and context rules

- Core Four: **context, model, prompt, tools**. Select actual supported models by measured capability/cost/privacy/latency; do not hard-code a historical ranking.
- Prompt shape: purpose → named variables → constraints → relevant files → ordered workflow → exact report. Add examples, delegation, loops, or template sections only when useful.
- Higher-order prompt consumes a prompt/plan; metaprompt produces a prompt. Neither authorizes running arbitrary supplied instructions.
- Reduce and delegate: prime by task, give each actor one purpose, return compact manifests. Reload authoritative state and relevant files rather than copying whole transcripts.
- Context bundles are indexes, not exact memory or trusted instructions. Validate path containment and freshness; merge overlapping read ranges without dropping disjoint relevant ranges. Never capture secret values or raw prompts by default.

## Failure lessons to encode in new ADWs

1. A zero child exit or `success: true` is not verified delivery; check current artifacts and the full expected check set.
2. Parse errors/empty results must block, never become “zero failures.” Choose fail-fast or collect-all explicitly; record dependent checks as `not_run`.
3. Review is not a replacement for tests. Repair invalidates affected evidence, including approval tied to an older diff.
4. A path-looking string, directory, completed checkbox or populated state object is not proof of correct work.
5. Timeouts must exist in the invoked operation, not just exception handlers. Bound nested retries and track live workers, not cumulative launches.
6. Tracker updates, logging hooks and dashboards observe/report; they do not grant acceptance. Do not log raw tool payloads or transcripts by default.
7. A port probe is not a reservation; detached workers outlive monitors; worktrees do not isolate network, credentials or databases.
8. Scaffolding/installing during planning is mutation. Shipping is opt-in; merge does not establish deployment.
9. Human waivers can greenlight named failures after explicit disclosure; retain failed evidence and separately disclose/authorize destructive effects.
10. A gate that resolved the wrong workspace reports a valid-looking revision of the wrong tree. Bind every gate to a non-empty diff: record the base and the changed-file count, and treat zero changed files as evidence the gate never found its subject, never as a pass.
11. Rejecting a design's *scope* is not rejecting its *mechanisms*. Salvage the mechanisms out of a rejected alternative before contracting the chosen one.
