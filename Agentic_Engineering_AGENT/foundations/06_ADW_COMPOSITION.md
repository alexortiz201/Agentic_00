# Compose AI Developer Workflows

An **ADW (AI Developer Workflow)** is executable orchestration combining deterministic code with bounded agent judgment to deliver a defined outcome. A prompt is an instruction; a phase is a contracted unit of work; an ADW can contain one or several phases; a composition reuses those phases or proven ADWs. A skill makes the workflow discoverable and operable—it is not the controller.

Select primitives by kind, and name them consistently within a workflow. These are portable design conventions, not installed commands or claims that every workflow needs every component.

## Authoring process

1. **Define the outcome before the technology.** Preserve the original request; specify trigger, input, target, criteria, non-goals, acceptance owner, and side effects. Decide whether one focused prompt is sufficient.
2. **Inspect existing primitives.** Locate relevant instructions, prompt/command templates, scripts, tools, types, checks, state and workspace helpers. Trace implementations, not just descriptions. Reuse before scaffolding.
3. **Draw the sequence and failure routes.** Label every node human judgment, agent judgment, or deterministic code. Known commands, IDs, counters, routing enums, and receipts belong in code. Classification needs an agent only when meaning is ambiguous; validate its output against an allowed set.
4. **Salvage before contracting.** Before contracting the chosen design, enumerate the **mechanisms** in every rejected design and classify each one **promote / defer / drop**, with a reason. Record the classification in the design artifact; "nothing to salvage" is a claim that requires justification, not a default.
5. **Contract each phase.** Define required predecessor artifacts, actor, Core Four (context, model, prompt, tools), cwd, allowed mutations, output schema, limits, checks, and next transitions. Build uses the approved plan; review uses the original criteria AND actual diff/evidence.
6. **Design gates before prompts.** Define the expected check set and real commands/cwd/timeouts. Assign each gate an ID from the `G0`–`G7` namespace below. Specify success, failure, missing-output and interruption cases. Make independent code check artifacts and claims before advancing; agent confidence cannot approve its own transition.
7. **Persist the design.** Record it in a durable design document rather than leaving it in a conversation. Obtain approval for the scoped implementation and side effects. Scaffolding, dependency installation, hooks, tracker updates, and worktree creation are mutations—even if a phase is called “plan.”
8. **Build the smallest vertical slice.** Implement typed contracts, the agent adapter, one useful phase, real quality checks and state/evidence storage. Use focused, bounded prompts, and author any missing primitive deliberately rather than inlining it. Do not generate an entire platform for a one-off task.
9. **Compose thinly.** Reuse phase entry points; keep sequencing separate from prompts and model selection. Pass one run identity, explicit workspace and validated artifact references. Do not duplicate phase internals inside a composite script.
10. **Walk through and test.** First use mocked agents/tools and disposable workspaces; then a human-supervised real task within authority. Exercise the control-plane matrix below. Document exact invocation, prerequisites, artifacts, safe resume and cancellation before unattended use.
11. **Make it discoverable and improve deliberately.** Add an entry recipe/skill and conditional context links. Record effective config, measured cost/time/interventions and outcomes. Extract reusable patterns after repeated evidence; test a second use before claiming generality.

### Salvage before contracting

Selecting a design answers one question — which scope ships now. It does not answer a second — which mechanisms are correct. Those judgments are independent, and rejecting a design silently decides the second by discarding the first.

For each rejected design, list its mechanisms and classify:

| Classification | Meaning | Required with it |
|---|---|---|
| `promote` | Move the mechanism into the chosen design now | A concrete failing scenario it prevents |
| `defer` | Correct but out of scope for this delivery | The condition under which it becomes required |
| `drop` | Wrong, unnecessary, or superseded | Why the chosen design does not need it |

Rules a conformant salvage pass can be checked against:

- **A mechanism that replaces an inferred signal with an explicit one is `promote` by default; `defer` or `drop` requires a stated reason.** Inference is sound in the happy case and wrong in exactly the error case nobody exercised. A busy flag going false infers success; it also goes false on failure. A token advanced only on real success cannot.
- **`drop` may not be justified by the rejected design's scope.** "That lane was too large" is a statement about the lane, not about the mechanism. If the only reason is scope, the classification is `defer`.
- **Read the rejected design's self-criticism section before discarding it.** The losing lane routinely names the real weakness of the winner, and that paragraph is the highest-value output of running divergent designs at all. Discarding it wastes the cost already paid for the divergence.
- A `promote` with no failing scenario is not a salvage decision; it is scope creep, and is rejected on the same terms.

## Single-phase contract

| Boundary | Minimum requirement |
|---|---|
| Input | Schema version, task/run/phase/attempt IDs, original intent, approved scope, engagement mode, operating level with any `descent_reason` / `return_condition`, predecessor manifest |
| Invocation | One purpose; explicit cwd, context files, model/provider, prompt version, allowed tools and numeric limits |
| Execution | Controlled adapter; argv rather than interpolated shell strings; explicit timeout/cancellation; approved environment only |
| Output | Typed result envelope, concise summary, owned artifacts, changed paths, unresolved findings and proposed next action |
| Gate | Independent schema/domain/artifact/check validation tied to current revision, diff base, non-zero changed-file count and diff identity |
| Failure | Preserve result, partial effects and per-kind attempt accounting; set `return_to`; route to correction, repair, human decision, or blocked handoff |

A phase-result record and a gate-decision record are illustrative shapes, not schemas or validators. Implement consumer-tested types before machine use; reject placeholder records. Keep diagnostics off machine-consumed stdout; never parse the last plausible-looking path out of arbitrary prose.

Four vocabularies, deliberately disjoint:

| Axis | Values |
|---|---|
| Task state | `requested`, `scoped`, `ready`, `building`, `validating`, `reviewing`, `documenting`, `acceptance_pending`, `accepted`, `authorized_handoff` — with `blocked` / `repairing` as orthogonal flags plus `return_to` |
| Execution status | `completed`, `failed`, `blocked`, `cancelled` |
| Check result | `passed`, `failed`, `not_run`, `error` — plus a separate `applicable` (`true` / `false`) with reason, and `source`: `executed` / `inspected` / `documented` / `asserted` |
| Gate decision | `pass`, `blocked`, `human_waived` |

`blocked` appears on three of these axes and means a different thing on each; never move a `blocked` value between them without re-deciding it. There is no `skipped` check result: an authorized exclusion is `applicable: false`, and a check prevented from running is `not_run`. An agent completion is not a passing check, human acceptance, or shipping permission.

### Gate ID namespace

`gate_id` draws from `G0`–`G7` by default, so gate records compare across projects. A project may extend the namespace; it may not renumber it. **The IDs and their names are policy** — a locally-improved name is how two gate records stop comparing, which is the whole point of a shared namespace.

| ID | Gate | Blocks |
|---|---|---|
| `G0` | Scope and authority — bounded outcome, criteria, scope, engagement mode, operating level, approvals present | Starting work on an unbounded or unauthorized task |
| `G1` | Research and readiness — interfaces, data flows, dependencies, baseline failures and required inputs identified; **a bug reproduced, or the blocker stated with what supports the hypothesis**; every acceptance criterion mapped to a change and a named check | Building against an unmapped criterion, or against a defect nobody has reproduced |
| `G2` | Invocation and handoff — Core Four, cwd, allowed mutations and output contract fixed before the call; on return, identity, workspace and artifact containment validated | Consuming a result from an invocation that was not the one issued |
| `G3` | Build and scope integrity — diff bounded to approved scope; unrelated work preserved | Advancing on an out-of-scope or unreviewable diff |
| `G4` | Closed-loop validation — expected check set compared to actual; partial verification reported truthfully | Claiming coverage that was not executed |
| `G5` | Spec review and revision — every finding carries a `disposition`; approval may not contradict an unresolved `blocker` | Readiness with an open blocker |
| `G6` | Documentation and future context — documentation invalidated by the change is updated or explicitly found to need no change | Handing off an interface whose documentation describes behavior that no longer exists |
| `G7` | Acceptance and authorized handoff — acceptance recorded, and any external effect separately authorized | Push, merge, publish, release, or deploy on acceptance alone |

`G2` and `G6` are not ADW-only. A supervised session delegating to a subagent runs `G2` by hand; a supervised session that changed an interface runs `G6` in the `documenting` state. A gate with no phase to run in is a gate that does not exist.

### Validate handoffs in code

- Match schema version, task/run/phase/attempt, configured model/tools/cwd and expected artifact kinds.
- Resolve paths against authorized roots; reject traversal, symlink escape, wrong ownership, missing/empty content and stale artifacts. Never select the first matching plan from another run.
- Compare all expected checks against actual records. Reject missing, duplicate, unknown, malformed, empty or contradictory results; zero failures alone is not success.
- Retain timestamp, argv/cwd, timeout, exit, scope, measured duration or null, revision, diff base, changed-file count, diff identity and non-sensitive evidence references.
- **A gate whose subject is a change MUST record its observed workspace, `diff_base` and `changed_file_count`, and MUST decide `blocked` when `changed_file_count == 0`. It may never decide `pass` on an empty diff.** The gate reports what it observed rather than what it expected; a count of zero is evidence the gate never found its subject, not an observation that the subject is clean.
- Verify review criteria coverage and `disposition` consistency, not merely `success: true`. A record whose `severity` and `disposition` disagree with the table in [04_VERIFICATION.md](04_VERIFICATION.md) is malformed.
- If a human waives a failure, independently record approver, approval reference/time, exact failure and evidence, allowed scope, consequences and validity limit. Only that human decision can unblock it; original failed results stay failed. Destructive next actions need their own explicit approval.

#### A gate must bind to a non-empty diff, and prove which one it read

`revision` and `diff_identity` are necessary and **not sufficient**. A gate that resolved its working directory to the wrong checkout records a correct-looking revision *of the wrong tree*, and an empty diff has a perfectly valid identity. Both fields can be fully populated by a gate that never saw the change it certified. On a real run two gates delegated to subagents did exactly this — resolved to the main checkout on the default branch instead of the feature worktree, inspected an empty diff, and returned a confident `pass` — and nothing in either record distinguished them from a genuine pass.

The rule is therefore about what emptiness means. Treat `changed_file_count == 0` as evidence the gate did not find its subject, never as the observation that the subject contains nothing. Required behavior:

- Resolve and record the workspace actually inspected, not the workspace configured.
- Record `diff_base` and the resulting `changed_file_count` on every gate result whose subject is a change.
- Decide `blocked` on zero, and report observed workspace, base and count in the block so the mismatch is diagnosable without re-running.
- A gate that cannot determine its own workspace is `blocked`, not `not_run`, and not `error`.

**Why this outranks every other rule here.** The evidence hierarchy ranks *enforced gate with retained output* first. That ranking is sound only if a gate cannot pass without having observed its subject. Without this rule the strongest evidence class carries a silent null case — a confident pass produced by observing nothing — which makes it the **most** dangerous class rather than the safest, precisely because everything downstream trusts it most and stops looking. Every weaker tier is checked by something; tier 1 is what does the checking. Do not promote the evidence hierarchy anywhere, or rely on it to license reduced scrutiny, until this rule is enforced in code.

The mirror-image failure is the same root error and equally real: a readiness check that read the full history of check runs rather than the latest per context counted five superseded failures as current and returned a confident `fail` on a passing subject. Trusting a payload's shape without checking what it represents fails in both directions, so the gate-side test is "did I observe my subject", not "did I get a plausible payload".

## Start minimal, grow on evidence

A first agentic layer is **three things**:

- **plans** — the detail a task needs, written down
- **prompts** — named, reusable, with a declared output
- **workflows** — code that runs them in order

That is enough to do real work. Everything else is added when something forces it:

| Add | When |
|---|---|
| Types | an output crosses a boundary and is parsed |
| State | a run has more than one phase, or must survive interruption |
| Isolation | two runs could touch the same files, ports or branch |
| Hooks | an event needs observing or guarding |
| Triggers | work should start without a person |
| Tests | a transition has broken once |
| Durable storage | a fact must outlive a single run |

**Read that table as a growth path, not a checklist.** Each row names the evidence that justifies the
addition; adding a row without its evidence is building a platform before there is a project.

## Choose the smallest sufficient set

Build the least that does the job. Each row's right-hand column is what to add **only when the
situation demands it**, not what to add next.

| Situation | Needed | Add only if justified |
|---|---|---|
| One-off supervised task | Scoped prompt, observable criteria, checks, handoff | No workflow framework at all |
| Repeated plan/build | Task contract, phase prompts, a runner, state, a checked plan, gates | A domain template |
| Test and review repair | Exact evidence, a finding schema, separate passes, capped repair and revalidation | Browser scenarios, for interface work |
| Unattended or parallel | The above, plus claims, isolation, cancellation, identity, recovery and independent gates | A scheduler, tracker, or dashboard |
| Repeated expertise | A focused skill with verified reference and an update procedure | Self-updating expertise — and never self-updating authority |

## Invocation

Every agent call is four choices: **context, model, prompt, tools.** Select a model by measured
capability, cost, privacy and latency; do not hard-code a ranking that was true once.

**Prompt shape:** purpose → named variables → constraints → relevant files → ordered workflow → exact
report. Add examples, delegation or loops only where they earn their place.

**Reduce and delegate.** Prime for the task at hand, give each actor one purpose, and return compact
manifests. Reload authoritative state and the relevant files rather than copying a whole transcript
forward.

**A context bundle is an index, not memory and not instructions.** Validate containment and freshness.
Never capture secret values by default.

A higher-order prompt consumes a prompt or plan; a metaprompt produces one. **Neither authorizes
running arbitrary supplied instructions.**

## Composition examples

Names describe phase order; omitted obligations still need an explicit reason. A composition is a sequence of phases, not a file — the implementation language and file layout belong to whatever adopts it.

| Need | Composition | Conditional additions |
|---|---|---|
| Plan for human decision | **plan** | Readiness review; no implementation |
| Small understood change | **plan → build** | Still require checks/review before acceptance, whether inline or later |
| Bug | **plan → build → test** | Reproduce first; regression check; bounded test repair; separate review |
| Feature/refactor | **plan → build → test → review** | Review/revise → affected tests → review again |
| Full delivery | **plan → build → test → review → document** | The full software development life cycle. The document phase holds task state `documenting` and passes `G6`; explicit handoff, not automatic shipping |
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
    for each gate whose subject is a change:
        assert observed workspace == delegated workspace
        assert changed_file_count > 0 else decision = blocked
    if blocked: bounded correction/repair per retry kind, or explicit human decision; do not advance
                route repair to return_to, not unconditionally to verification
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
| Failed, `not_run`, or zero-test required suite | Blocks unless explicit bounded human waiver; never relabels as pass, and never as `applicable: false` |
| Gate run from a workspace other than the one under test, or against an empty diff | Blocks; reports observed workspace, `diff_base` and `changed_file_count`. Never reports pass |
| Corrupted state record — truncated write, wrong run ID, state moved backwards, orthogonal `blocked` lost on update | Blocks; refuses to infer the missing state; preserves the corrupt record alongside the last known-good one |
| Cleanup omitted or resource leaked — orphaned worker, held lock, retained worktree, open port, temp workspace after cancellation | Detects and reports the leak, names the owner, and blocks unattended reuse of the resource; never silently reclaims another run's workspace |
| Review claims approval while listing an unresolved `blocker` disposition | Blocks pending repair or explicit waiver; `risk_accepted` must name a human |
| Repair changes checked files | Invalidates and reruns affected downstream gates |
| Timeout, process crash, cancellation, partial external write | Preserves evidence; inspects effects before retry; stops owned workers |
| Duplicate trigger or occupied workspace/port | Atomic claim/reservation prevents double execution; reports conflict |
| Denied capability, hook failure, agent attempts to alter gate policy | No unauthorized action; fails closed at the actual enforcement boundary |
| Invalid/expired waiver or unapproved destructive/shipping step | Blocks and asks for exact human authorization |

Count and test each retry kind separately — `invocation_retry`, `output_correction`, `gate_repair`, `test_fix`, `review_revision`, `restart` — each with its own cap, under a shared `total_budget`. Persist them as the `attempts` object in task state; a single scalar cannot represent this, and a run that burns two output corrections and two test fixes is then simultaneously at 4 of 2 and at 2 of 2 twice. The default two repair attempts is a supervised starting point, not a license for unlimited nested retries.

**Caps must not be evaded by starting new sessions or subagents.** Attempt accounting belongs to the task, not to the process counting it. A retry performed by a fresh session, a new subagent, a second worktree, or a re-issued run ID for the same task increments the same counter. A controller must carry `attempts` across resume and delegation, and must reject a resumed run whose counters are lower than the last persisted values.

Resume revalidates workspace, partial effects, configuration and artifacts; a session ID is not recovery or isolation.

## Optional integration, not mandatory infrastructure

Add hooks only for an identified event need, and against a written contract. Add MCP/tools only for required capabilities with checked input/output contracts and least privilege. Add triggers only after the local workflow is proven, with authenticated/authorized inputs, allowed workflow routing, atomic claims, deduplication and cancellation. Add shipping only under separate human authority and current gates; commit, push, merge and deployment are distinct effects.
