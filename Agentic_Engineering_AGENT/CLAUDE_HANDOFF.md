# Claude Handoff — Agentic Engineering Agent

## 1. Repo identity

This folder is a bootable instruction package for a specialized Agentic Engineering agent, not an executable application or orchestrator. The agent guides safe software delivery and helps design, compose and validate AI Developer Workflows (ADWs), including their missing primitives (`AGENTS.md:7–18`, `06_ADW_COMPOSITION.md:1–18`).

**Agentic Engineering = engineer judgment + deterministic orchestration + bounded agent reasoning + evidence.** Humans own intent, authority and acceptance; code handles mechanical execution/gates; agents interpret, plan, implement and review (`01_PRINCIPLES.md:5–12`).

At this snapshot the package has 32 documentation/template files: 29 Markdown and three JSON. Two binary `.DS_Store` metadata files were also observed at the root and under `skills/`; they are not agent inputs and were left untouched. No executable source, dependency manifest, package-local Git metadata, CI configuration or completed `runs/` directory is bundled. This inventory describes package capabilities, not machine-wide installations or historical workflow adoption.

| Directory | Purpose |
|---|---|
| Root | Contract, principles, delivery policies, boot/runbook, ADW composition guide, quick reference and this handoff |
| `commands/` | Five portable commands/recipes: prime, agentic cheat sheet, compose ADW, create primitive, validate ADW |
| `prompts/` | Five focused delivery prompts: plan, build, review, repair, document |
| `skills/adw-authoring/` | Discoverable ADW-authoring recipe and routing |
| `templates/` | Eight reusable task/design/prompt/result records |
| `hooks/` | Hook design and acceptance contract; no executable hook |

Primary formats are Markdown and JSON. No application language/framework, required runtime version or package manager is declared. Host runtime/model/tool versions: UNVERIFIED.

## 2. Architecture

The agentic layer teaches agents how to change a target safely; the target application remains the validation ground. An ADW is executable orchestration of bounded phases, not merely a prompt or skill (`06_ADW_COMPOSITION.md:3–5`).

1. Host spawns an agent and explicitly supplies the package location.
2. Agent boots the contract, principles, workflow, authority, verification, recovery and runbook; loads task-specific recipes on demand.
3. Human supplies outcome, target, scope and authority.
4. For ADW authoring: inspect existing primitives → specify phase contracts and independent gates → approve → build one useful slice → compose thinly → test control-plane failures → supervised walkthrough.
5. For delivery: plan → approved implementation → checks → separate review → bounded repair/revalidation → documentation/handoff → human acceptance.

Evidence: `README.md:5–27,50–60`, `06_ADW_COMPOSITION.md:7–18`, `02_WORKFLOW.md:14–23`.

The package supplies instructions, recipes and illustrative records, not the runtime in this flow. The host/target must supply a real agent adapter, deterministic controller, checks, state persistence and authority enforcement. No database, queue, external API, model endpoint or tracker configuration is bundled. Architecture guidance matches the current file layout; operational adoption is UNVERIFIED.

## 3. Build, run, test

| Action | Package capability |
|---|---|
| Install/build | No installer, dependencies or build implementation |
| Run | Load instructions into an existing authorized host; no bundled launch CLI |
| Structural checks | JSON parsing and internal link existence can be checked locally |
| ADW tests | Failure-case recipe exists; no executable workflow or automated suite bundled |
| Environment | Authorized host/model/tools and target scope; no specific service, credential or seeded data configured here |

Startup instruction (`README.md:54`):

> Read this package's AGENTS.md and complete its README.md boot sequence before acting. Report the loaded files, missing capabilities, and proposed authority envelope; then await the task.

Fresh-agent launch and host registration remain UNVERIFIED. Do not treat file placement as auto-loading.

Read-only inventory and structural validation command, run from the package directory:

```bash
python3 - <<'PY'
from pathlib import Path
import json, re
root = Path('.').resolve()
files = sorted(p for p in root.rglob('*') if p.is_file() and p.suffix in {'.md', '.json'})
links = 0
for p in files:
    text = p.read_text()
    print(p.relative_to(root), len(text.splitlines()))
    if p.suffix == '.json':
        json.loads(text)
    if p.suffix == '.md':
        for dest in re.findall(r'\[[^\]]*\]\(([^)]+)\)', text):
            target = (p.parent / dest).resolve()
            assert target.is_relative_to(root) and target.exists(), (p.name, dest)
            links += 1
print('PASS:', len(files), 'files; JSON parses;', links, 'internal links resolve')
PY
```

Initial unfiltered text validation failed on binary `.DS_Store` metadata (UTF-8 decoding error, exit 1). The documentation/template-only command above passed after explicitly excluding binary metadata, exit 0; duration NOT MEASURED. Python is inspection tooling, not an ADW runtime requirement. This does not validate schemas, runtime safety, prompt quality or real delivery. Fast/slow workflow durations: UNVERIFIED; measure a real supervised run.

## 4. The agentic setup — what exists

| Item | Evidence / contents | Working status |
|---|---|---|
| `AGENTS.md` | 78 lines: Boot, Identity, Core contract, Required behavior, approval actions, invariants, decision rule, done definition | Readable contract; auto-loading not tested |
| `CLAUDE.md` | 5 lines: bootstrap to contract and README; nearer instructions cannot expand authority silently | Readable; no verified host registration |
| `README.md` | 60 lines: core boot, task routing, purpose, boundaries, minimal use | Explicit startup instruction, not executable launcher |
| ADW skill | `skills/adw-authoring/SKILL.md:1–29`; name/description plus routed recipes | Authored, directly loadable; host discovery UNVERIFIED; no release version declared |
| Commands | `commands/prime.md`, `agentic_cheatsheet.md`, `compose_adw.md`, `create_primitive.md`, `validate_adw.md` | Portable commands/recipes; not registered slash commands |
| Phase prompts | `prompts/plan.md`, `build.md`, `review.md`, `repair.md`, `document.md` | Authored; require task/run inputs and exact consumer contract |
| Templates | `templates/ADW_DESIGN.md`, `PROMPT.md`, `PHASE_RESULT.json`, `GATE_RESULT.json`, plus brief/plan/state/handoff | Files present; JSON parses; records are not schemas/validators |
| Hooks | `hooks/HOOK_CONTRACT.md:1–42` | Design/fixture contract only; no executable/registration |
| Plugins/MCP/indexing | None configured in package inventory | Machine-wide installation/source/version/health UNVERIFIED |

The package deliberately keeps recipes, host registration and enforcement separate (`README.md:17–27`). It does not claim any plugin, tool or gate is installed merely because its design is documented.

## 5. The agentic setup — what actually gets run

**UNVERIFIED: recurring delivery and ADW-authoring usage.** Package files demonstrate authored workflows, not actual completed bug/feature/release histories. No run traces, merged changes, PR records or CI results are included. Structural validation is the only execution demonstrated by this handoff.

### Declared routes, not observed adoption

| Kind | Intended sequence | Intended artifacts |
|---|---|---|
| ADW authoring | Discover primitives → contract phases/gates → approve → vertical slice → compose → failure tests → supervised walkthrough | `ADW_DESIGN.md`, primitives/controller in approved target, evidence and entry recipe |
| Primitive creation | Establish need → inspect consumer → contract → author → fixtures → conditional discovery | Prompt/command/skill/type/tool/hook/adapter with tested consumer interface |
| Bug | Reproduce → plan → approve → fix → regression/relevant suite → review/repair → handoff | Plan, scoped diff, before/after evidence |
| Feature/refactor/chore | Discover → plan → approve → implement → checks → review/repair → document/handoff | Run artifacts, diff, verification and findings |
| Tiny edit/read-only answer | Explicit scope → discovery → proportional edit/check/review or evidence-backed answer | Compact evidence; no unnecessary framework |
| External/release action | Plan → specific human approval → bounded action → verify → pause | Non-sensitive receipt; no implied deployment |

Evidence: `commands/compose_adw.md:5–12`, `commands/create_primitive.md:5–19`, `02_WORKFLOW.md:5–23`, `prompts/plan.md:7–13`.

### Responsibility by step

| Step | Deterministic or judgment | Human intervention / output |
|---|---|---|
| Intake and routing | Judgment: faithful intent, risk, appropriate workflow | Human supplies scope and criteria; brief/design |
| Discovery | Commands are mechanical; choosing relevant context and interpreting behavior is judgment | Resolve consequential ambiguity; discovery evidence |
| Planning/composition | Judgment: dependencies, actors, contracts, checks and repair paths | Approve non-trivial plan/design; scoped spec |
| Implementation | Judgment: changes; deterministic edits/adapter execution | Stop for authority/scope drift; diff/state |
| Verification | Judgment selects real checks; controller executes exact commands and validates evidence | Human may waive named failures after consequences; gate records |
| Review | Judgment: criteria coverage and defects | Separate pass; findings; human risk acceptance if needed |
| Repair | Judgment diagnoses; deterministic reproducer and affected checks run again | Budget increases require approval; retained failures and new evidence |
| Handoff | Judgment summarizes current evidence | Human accepts; acceptance is not shipping permission |
| Merge/deploy/tracker update | Exact target adapter must be defined and authorized | Specific action approval; receipt and effect verification |

Exact recurring commands and triggers are UNVERIFIED. The runbook suggests these Git inspections from the approved target root; they are not an observed recurring workflow:

```bash
git status --short --branch
git diff --check
git diff --stat
git diff
git worktree list --porcelain
```

For generated ADWs, known commands, counters, IDs, routing and receipts belong in code; do not spend agent calls mechanically acknowledging them (`06_ADW_COMPOSITION.md:9–16`). Agents provide bounded judgment, not their own authorization. A tracker checkbox, completed session or zero exit does not establish accepted work.

## 6. Gates and verification

| Control | Required behavior | Enforcement in this package |
|---|---|---|
| Quality | Actual applicable checks, complete expected set and current evidence | Agent-checked guidance; no CI/runtime gate bundled |
| Typed handoff | Validate identity/schema/artifact containment/content/freshness | Requirement for generated controller, not supplied validator |
| Review | Criteria coverage, severity-consistent findings, repair/revalidation | Separate agent-checked pass |
| Human waiver | Exact failed check/finding, evidence, scope, consequences, approval and validity limit | Human-approved; failed result stays failed |
| Consequential action | Explicit authority; destructive targets/loss/reversibility/recovery stated | Human-approved policy |
| Runtime permissions | Actual tested enforcement outside builder control | Host-provided; UNVERIFIED |

Evidence: `04_VERIFICATION.md:17–58`, `06_ADW_COMPOSITION.md:20–42,80–99`, `AGENTS.md:49–78`.

**Code-enforced** means an actual mechanism prevents/gates; **human-approved** requires explicit authorization; **agent-checked** is instructed inspection without a hard boundary (`README.md:42–48`). No coverage threshold, CI jobs, required reviewers, branch protection or tracker gates are bundled. A human may greenlight disclosed failures, but cannot turn them into passes; destructive or shipping actions need their own approval.

## 7. Tracker and conventions

Actual tracker, branch/commit/PR naming and recent examples: UNVERIFIED; none are fabricated.

Declared ADW conventions (`ADW_QUICK_REF.md:32–40`):

- `adws/` is a directory; `adw_plan.py` is a phase script; `adw_plan_build.py` composes phases. These are generated-target conventions, not bundled executables.
- `adw_sdlc.py` abbreviates a documented composition; `_iso` requires implemented workspace handling and is not a sandbox claim.
- `specs/` stores task-specific plans, `agents/<run_id>/` stores target workflow state/evidence, `trees/<run_id>/` stores working files. One stable run ID; distinct phase/attempt IDs.
- This package's own task artifacts use `runs/<run_id>/`; explicitly map generated ADW conventions rather than mixing storage roots.
- Keep CLI/routing names, argument order, prompt report formats, types and documentation synchronized.

Template shapes are supplied in `templates/ADW_DESIGN.md`, `PLAN.md`, `TASK_BRIEF.md` and `HANDOFF.md`. Real recent examples require authorized historical records.

## 8. Parallelism and cost

No worker launcher, live concurrency trace, background job, shard configuration or measured token/cost record is bundled. Actual parallel execution and model routing: UNVERIFIED.

Design requirements: one active writer per workspace, atomic claims, idempotency, live-worker accounting, safe resource reservations, combined verification and cancellation of owned workers (`02_WORKFLOW.md:56–58`, `06_ADW_COMPOSITION.md:55–59,80–95`).

Context is role-specific: explorer gets task/instructions; planner gets relevant code/tests/criteria; builder gets approved plan/context; reviewer gets criteria/diff/evidence; repairer gets concrete failure/minimal affected context (`01_PRINCIPLES.md:22–37`). Load conditional references, not all templates/transcripts. Largest target input, token requirements and costs: UNVERIFIED; measure against a real task and tokenizer. No specific model is prescribed.

## 9. Friction

Structural limitations and risks to test—not invented incident history:

| Friction | Evidence | Smallest next action |
|---|---|---|
| Manual boot/registration | `README.md:27,52–54` | Test a fresh host load and actual recipe discovery |
| No controller or validators | `06_ADW_COMPOSITION.md:31–33,61–76` | Implement one useful target-specific slice with consumer-tested contracts |
| Generic templates need real checks | `templates/ADW_DESIGN.md:23–30` | Inspect target scripts; replace placeholders with actual acceptance logic |
| Authoring recipes are not usage evidence | No completed runs in package inventory | Capture one supervised run, failures and human interventions |
| Hook implementation is intentionally absent | `hooks/HOOK_CONTRACT.md:3,16–42` | Pick an event need/host; implement and test bounded metadata or denial behavior |
| Raw result/approval mistakes remain possible without gates | `ADW_QUICK_REF.md:60–70` | Test parse errors, stale evidence, contradictory review and invalid waivers |
| Repeated policy across several entry points can drift | Contract/workflow/verification/runbook | Keep one policy meaning and recheck consumers when interfaces change |

Primitives already have templates; avoid rewriting plans, prompt layouts, result envelopes and hook contracts from scratch. Do not add dashboards, external triggers or model diversity before a useful gated local flow. Intermittent failures, slow checks, repeated manual work and real operational bottlenecks remain UNVERIFIED without run traces and measurements.

## 10. The honest gaps

- **UNVERIFIED:** fresh specialized-agent boot, slash-command registration, skill discovery and host permissions; need an authorized host smoke test.
- **UNVERIFIED:** executable ADW behavior; this package teaches creation but ships no controller, runner, schema validator or gate enforcement.
- **UNVERIFIED:** machine-wide plugins, skills, MCP servers, hooks, models and indexing; need scoped configuration/installation checks without sensitive values.
- **UNVERIFIED:** target architecture, tracker, CI/merge rules and recent workflows; need the target and representative authorized records.
- **UNVERIFIED:** performance, context/cost budgets and recurring friction; need measured supervised runs including failed attempts.
- JSON templates intentionally start incomplete/blocked. They are not valid completed-run evidence and must not establish readiness.
- No integration was shown to be broken or working merely from its documentation. Structural validation proves only parsing and link existence.

All policy/recipe/template links resolve within this folder. No outside documentation is needed to understand its operating model. Target files and verified host capabilities are needed to implement a real ADW. Never include sensitive values, raw transcripts or confidential payloads in artifacts (`AGENTS.md:60–65`, `hooks/HOOK_CONTRACT.md:25–27`).
