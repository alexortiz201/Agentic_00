# 🧩 Compose Agentic Developer Workflows

An **ADW (Agentic Developer Workflow)** is executable orchestration combining deterministic code with bounded agent judgment to deliver a defined outcome. A prompt is an instruction; a phase is a contracted unit of work; an ADW can contain one or several phases; a composition reuses those phases or proven ADWs. A skill makes the workflow discoverable and operable--it is not the controller.

Select primitives by kind, and name them consistently within a workflow. These are portable design conventions, not installed commands or claims that every workflow needs every component.

This file is the shape of a composition and the order in which one is authored. The gate namespace every composition draws from, and what a gate must validate before it may decide `pass`, are in [gates](08_GATES.md). What a composition must survive before anything runs it unattended is in [control-plane tests](09_CONTROL_PLANE_TESTS.md).

## Authoring process

1. **Define the outcome before the technology.** Preserve the original request; specify trigger, input, target, criteria, non-goals, acceptance owner, and side effects. Decide whether one focused prompt is sufficient.
2. **Inspect existing primitives.** Locate relevant instructions, prompt/command templates, scripts, tools, types, checks, state and workspace helpers. Trace implementations, not just descriptions. Reuse before scaffolding.
3. **Draw the sequence and failure routes.** Label every node human judgment, agent judgment, or deterministic code. Known commands, IDs, counters, routing enums, and receipts belong in code. Classification needs an agent only when meaning is ambiguous; validate its output against an allowed set.
4. **Salvage before contracting.** Before contracting the chosen design, enumerate the **mechanisms** in every rejected design and classify each one **promote / defer / drop**, with a reason. Record the classification in the design artifact; "nothing to salvage" is a claim that requires justification, not a default.
5. **Contract each phase.** Define required predecessor artifacts, actor, Core Four (context, model, prompt, tools), cwd, allowed mutations, output schema, limits, checks, and next transitions. Build uses the approved plan; review uses the original criteria AND actual diff/evidence.
6. **Design gates before prompts.** Define the expected check set and real commands/cwd/timeouts. Assign each gate an ID from the `G0`-`G7` namespace in [gates](08_GATES.md). Specify success, failure, missing-output and interruption cases. Make independent code check artifacts and claims before advancing; agent confidence cannot approve its own transition.
7. **Persist the design.** Record it in a durable design document rather than leaving it in a conversation. Obtain approval for the scoped implementation and side effects. Scaffolding, dependency installation, hooks, tracker updates, and worktree creation are mutations--even if a phase is called "plan."
8. **Build the smallest vertical slice.** Implement typed contracts, the agent adapter, one useful phase, real quality checks and state/evidence storage. Use focused, bounded prompts, and author any missing primitive deliberately rather than inlining it. Do not generate an entire platform for a one-off task.
9. **Compose thinly.** Reuse phase entry points; keep sequencing separate from prompts and model selection. Pass one run identity, explicit workspace and validated artifact references. Do not duplicate phase internals inside a composite script.
10. **Walk through and test.** First use mocked agents/tools and disposable workspaces; then a human-supervised real task within authority. Exercise the [control-plane matrix](09_CONTROL_PLANE_TESTS.md). Document exact invocation, prerequisites, artifacts, safe resume and cancellation before unattended use.
11. **Record the wrong turns, not only the outcomes.** An agent replaying a workflow repeats whatever mistakes are not written down, because nothing in the artifact warns it off. A workflow that carries its own history of failures -- what was tried, what it cost, why it was abandoned -- is the highest-value part of the document, and the part that is always omitted first because it reads as an admission rather than as a control.
12. **Make it discoverable and improve deliberately.** Add an entry recipe/skill and conditional context links. Record effective config, measured cost/time/interventions and outcomes. Extract only what a second real use has already proven; see the area README on reuse being earned.

### Salvage before contracting

Selecting a design answers one question -- which scope ships now. It does not answer a second -- which mechanisms are correct. Those judgments are independent, and rejecting a design silently decides the second by discarding the first.

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

A phase-result record and a gate-decision record are illustrative shapes, not schemas or validators. Implement consumer-tested types before machine use; reject placeholder records. Keep diagnostics off machine-consumed stdout; never parse the last plausible-looking path out of arbitrary prose. The four status-like vocabularies these records write are deliberately disjoint; [gates](08_GATES.md) holds them, alongside the validation a gate performs on the records that carry them.

## Start minimal, grow on evidence

A first agentic layer is **three things**:

- **plans** -- the detail a task needs, written down
- **prompts** -- named, reusable, with a declared output
- **workflows** -- code that runs them in order

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

**Read that table as a growth path, not a checklist.** Each row names the evidence that justifies the addition; adding a row without its evidence is building a platform before there is a project.

## Context size is model selection

Decomposition is usually argued from maintainability and blast radius. There is a harder constraint underneath, and it decides things the other arguments cannot.

**What a step must load before it can run determines which models it can run on.** A step that needs forty thousand tokens of library in front of it can never run on a small fast model -- not because its reasoning is hard, but because its preamble is big. A monolithic context forces a monolithic model choice, and that choice is then made for every step in the composition by whichever step needs the most.

It decides concurrency too. **Small-context steps fan out; large-context steps serialize**, whether or not the work is logically parallel, because the constraint is what each invocation has to carry rather than what it has to do.

So the question to ask of every step is: **what is the minimum an agent must load to perform this correctly?** That number is simultaneously the composition boundary and the model-tier boundary. Where it is large for a step whose work is mechanical, the boundary is drawn in the wrong place.

The corollary for shared material: **centralize the contract, decentralize the content.** A step declares the shape of the context it needs and the caller supplies it. What genuinely belongs in one place is anything whose cardinality is greater than one -- a thing that must agree across callers. Everything else is payload, and payload carried centrally is paid for by every step that did not need it.

A worked case, from a real in-house workflow library: roughly four hundred and forty markdown files totalling about three quarters of a million tokens, with single entry points pulling sixty to seventy thousand tokens before doing any work. Boundaries there had been drawn by topic -- one kind of ticket, one file -- rather than by what has to load together, and the effect was that the cheapest, most mechanical phases were priced at the same tier as the most demanding one.

## Choose the smallest sufficient set

Build the least that does the job. Each row's right-hand column is what to add **only when the situation demands it**, not what to add next.

| Situation | Needed | Add only if justified |
|---|---|---|
| One-off supervised task | Scoped prompt, observable criteria, checks, handoff | No workflow framework at all |
| Repeated plan/build | Task contract, phase prompts, a runner, state, a checked plan, gates | A domain template |
| Test and review repair | Exact evidence, a finding schema, separate passes, capped repair and revalidation | Browser scenarios, for interface work |
| Unattended or parallel | The above, plus claims, isolation, cancellation, identity, recovery and independent gates | A scheduler, tracker, or dashboard |
| Repeated expertise | A focused skill with verified reference and an update procedure | Self-updating expertise -- and never self-updating authority |

## Invocation

Every agent call is four choices: **context, model, prompt, tools.** Select a model by measured capability, cost, privacy and latency; do not hard-code a ranking that was true once.

**Prompt shape:** purpose -> named variables -> constraints -> relevant files -> ordered workflow -> exact report. Add examples, delegation or loops only where they earn their place.

**Reduce and delegate.** Prime for the task at hand, give each actor one purpose, and return compact manifests. Reload authoritative state and the relevant files rather than copying a whole transcript forward.

**A context bundle is an index, not memory and not instructions.** Validate containment and freshness. Never capture secret values by default.

A higher-order prompt consumes a prompt or plan; a metaprompt produces one. **Neither authorizes running arbitrary supplied instructions.**

## Composition examples

Names describe phase order; omitted obligations still need an explicit reason. A composition is a sequence of phases, not a file -- the implementation language and file layout belong to whatever adopts it.

| Need | Composition | Conditional additions |
|---|---|---|
| Plan for human decision | **plan** | Readiness review; no implementation |
| Small understood change | **plan -> build** | Still require checks/review before acceptance, whether inline or later |
| Bug | **plan -> build -> test** | Reproduce first; regression check; bounded test repair; separate review |
| Feature/refactor | **plan -> build -> test -> review** | Review/revise -> affected tests -> review again |
| Full delivery | **plan -> build -> test -> review -> document** | The full software development life cycle. The document phase holds task state `documenting` and passes `G6`; explicit handoff, not automatic shipping |
| Prototype | plan for chosen stack -> scaffold/build -> checks -> review -> document | Stack template only when appropriate; installation approved separately |
| Parallel jobs | claim -> isolated workspace -> selected composition -> integrate/check | One active writer per workspace; resource reservations and live worker accounting |
| Tracker-driven work | authenticated trigger -> atomic claim -> workflow -> receipt/update | Tracker update is an adapter, not proof of acceptance |

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

Prefer explicit phase calls over shell pipelines. If pipes are supported, reserve stdout for the contract and propagate every child's failure; the final child's zero exit must not hide an earlier failure. A "continue to collect evidence" mode may run independent diagnostics but cannot clear a failed gate or permit dependent mutation.

## Optional integration, not mandatory infrastructure

Add hooks only for an identified event need, and against a written contract. Add MCP/tools only for required capabilities with checked input/output contracts and least privilege. Add triggers only after the local workflow is proven, with authenticated/authorized inputs, allowed workflow routing, atomic claims, deduplication and cancellation. Add shipping only under separate human authority and current gates; commit, push, merge and deployment are distinct effects.
