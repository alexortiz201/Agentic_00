# ADW Quick Reference

**ADW = AI Developer Workflow:** deterministic orchestration + bounded agent judgment + checked artifacts + evidence. Start with one useful outcome, not a roster of agents. See [composition](06_ADW_COMPOSITION.md) for the authoring process.

## Primitives: what, when, where

Paths below are target-project conventions, not files promised by this package. Adapt existing project conventions; generate only needed pieces.

| Primitive | Purpose / when needed | Usual location |
|---|---|---|
| Universal instructions | Identity, authority, invariant safety; every task | `AGENTS.md`, small `CLAUDE.md` bootstrap |
| Context prime / routing | Load relevant code/docs for this task, not everything | `commands/prime.md`, conditional documentation index |
| Prompt | One bounded reasoning task with inputs, workflow and exact report contract | `prompts/<role>.md` |
| Slash command | Discoverable host-specific invocation of a reusable prompt | `.claude/commands/<verb>.md` when supported |
| Skill / recipe | When/how to choose and operate a capability; load details on demand | `skills/<capability>/SKILL.md` or host-equivalent |
| Role | Purpose + context/model/prompt/tools + schema/limits/authority | Runner configuration; separate from sequencing |
| Plan / spec | Task-specific decisions enabling a fresh builder | `specs/<task>-<run>-<slug>.md` |
| Template / metaprompt | Repeated artifact shape / instructions that generate a prompt in that shape | `templates/`, `commands/create_primitive.md` |
| Agent adapter | Typed CLI/SDK invocation, cwd, timeout, output parsing, redacted trace | `adws/adw_modules/agent.py` |
| Types / handoff | Consumer contract; run/phase identity, outputs and failure cases | `adws/adw_modules/data_types.py` |
| State / trace | Durable transitions, effective config, attempts and resume facts | `adw_modules/state.py`; `agents/<run_id>/` |
| Quality adapter / gate | Run known checks in code and compare expected versus actual evidence | `adw_modules/quality.py`, `adw_modules/gates.py` |
| Phase ADW | Independently callable bounded unit with prerequisites and gate | `adws/adw_plan.py`, `adw_build.py`, `adw_test.py` |
| Composite ADW | Thin sequencing of existing phases; preserve gates/failures | `adws/adw_plan_build.py`, `adw_plan_build_test_review.py` |
| Repair | Exact failure → diagnosis/patch → reproducer + affected checks | `prompts/repair.md`; bounded controller loop |
| Workspace adapter | Non-trivial/parallel work; one writer, explicit cwd and owned resources | `adw_modules/worktree_ops.py`; `trees/<run_id>/` |
| Trigger / tracker adapter | Unattended pickup or external task updates, only when needed | `adws/adw_triggers/`, typed service adapter |
| Hook | Event observation or tested pre-action gate; not workflow orchestration | Host hook directory + explicit registration |
| Domain expert / stack recipe | Repeated domain decisions; relevant plan/build knowledge | Focused skill/reference; reviewed knowledge updates |
| Docs / E2E scenario | Actual behavior, usage, critical journey and future context | `app_docs/`; executable tests or bounded browser recipe |

## Naming and composition

- `adws/` is a directory; `adw_plan.py` and `adw_plan_build.py` are **files**, not folder names.
- `adw_<phase>.py` is a phase entry point; `adw_<phase>_<phase>.py` composes phases in the named order. `adw_sdlc.py` is shorthand—document its actual phases.
- `_iso` describes an implemented workspace variant, not a sandbox guarantee. Worktrees share host resources and Git metadata.
- Use stable run identity across all phases; unique phase/attempt directories prevent overwritten failures. Track model session IDs separately.
- `agents/<run_id>/` holds output/state; `trees/<run_id>/` holds working files; `specs/` holds plans. These are different responsibilities.
- For work performed by this package, use `runs/<run_id>/` as described in [README](README.md). A generated ADW may use the target's artifact convention; record the mapping once.
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
2. Parse errors/empty results must block, never become “zero failures.” Choose fail-fast or collect-all explicitly; record dependent checks as not run.
3. Review is not a replacement for tests. Repair invalidates affected evidence, including approval tied to an older diff.
4. A path-looking string, directory, completed checkbox or populated state object is not proof of correct work.
5. Timeouts must exist in the invoked operation, not just exception handlers. Bound nested retries and track live workers, not cumulative launches.
6. Tracker updates, logging hooks and dashboards observe/report; they do not grant acceptance. Do not log raw tool payloads or transcripts by default.
7. A port probe is not a reservation; detached workers outlive monitors; worktrees do not isolate network, credentials or databases.
8. Scaffolding/installing during planning is mutation. Shipping is opt-in; merge does not establish deployment.
9. Human waivers can greenlight named failures after explicit disclosure; retain failed evidence and separately disclose/authorize destructive effects.
