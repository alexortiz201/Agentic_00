# 🔤 Language

The vocabulary of Agentic Engineering. Every term here is **canonical**: the value written into a record is the value named here, spelled exactly as shown.

This file exists because the failure it prevents is silent. A record emitted with one spelling and validated against another does not error at the point of the mistake -- it errors at the consuming phase, or worse, passes and means the wrong thing. Two documents that disagree about an enum produce a toolkit whose templates emit records its own policy rejects.

**Why fixed values at all.** Because **the consuming phase validates rather than interprets.** A value outside the declared set is a **malformed output, not a judgement call** -- and the consumer is right to reject it rather than guess what was meant. The vocabularies are deliberately disjoint: one word must not mean four things across four records.

Where nothing consumes a value mechanically, this file is describing a **distinction**, not a wire format. The distinctions are the durable part; exact spellings matter only where two programs must agree.

**Rule for changing anything here:** a term changes in this file first, then everywhere that writes or reads it, in the same change. Public names, routing enums, CLI help, prompt arguments, types and recipe links move together or not at all.

**Rule for admitting anything here.** A term arrives as a **candidate**, not as an entry. Most candidates come from outside -- a repository, a talk, an article studied deliberately -- and that reading is not background: it is how the vocabulary grows. A candidate is admitted only after it is reconciled against what is already defined, and **the first job of that reconciliation is checking whether the phrase is already carrying a different meaning.** A collision is the common case rather than the rare one, because the short names are few and the ideas that want them are many.

**When two ideas want one phrase, decide by what the code can still tell you.** A term naming a shape is recoverable without the word -- a reader can see a composed pair by reading the composition. A term naming an *absence*, such as a step nobody has written the procedure for yet, is recoverable from nothing, so it keeps the word and the shape gets the other one. Record the discriminator beside the definition; the next reader arrives with the same collision.

---

## Named things

Terms used throughout and defined nowhere else. They are names, not enums -- nothing validates them -- but a reader who has not met them cannot follow the rest.

| Term | Means |
|---|---|
| `agentic layer` | The layer that wraps an application and gives it a programmatic interface -- prompts, commands, workflows, gates, the code that sequences them. Work gets done *to* the application *through* it |
| `application layer` | The product itself, and the validation ground. Deleting the agentic layer must not take it with it |
| `ADW` | **Agentic Developer Workflow.** A sequence of contracted phases -- each deterministic code, a bounded agent call, or a `deferral` that hands off and waits -- that carries work through the lifecycle without a person performing each step. The three are the step-kind axis below, and a phase names which it is |
| `Core Four` | The four things resolved at every agent invocation: **context, model, prompt, tools.** Chosen per call rather than configured once |
| `primitive` | One of the building blocks an ADW is composed from -- command, spec, phase, composition, module, record, **run history**, gate, state, trigger, hook, pinned reference, design document, **observation**. Each has a blueprint in [`foundations/Agentic_Engineering/primitives/`](foundations/Agentic_Engineering/primitives/README.md) saying what it must contain, and [`handbook/04_ARTIFACT_MAP.md`](handbook/04_ARTIFACT_MAP.md) maps every named concept to the file that defines it |
| `blueprint` | The document stating what a primitive must contain when one is created. It is a requirement list, not a schema: it validates nothing |
| `software factory` | The composed set of workflows, with the code and agents that run them, for one subject. Its purpose is leverage on a prompt. Distinct from the autonomy rung, which says how much of it has earned the right to run unattended |
| `workgroup` | A set of components worked on together and often run together, and the directory that holds them. Members may be repositories, services, external APIs or scripts. Distinct from `workspace`, which is the single checkout one run operates in |
| `workbench tool` | **This package.** The public, portable half of a bench: the vocabulary, the discipline, the handbook, the templates and the answers, with no organization's workflows in it. Named for what it *is* rather than for what it produces -- it was called "the ADW tool" until 2026-09-16, which described one of its outputs and left the thing itself unnamed |
| `workbench home` | **The private half of the same bench**, also called the **workbench folder**, at `$HOME/.workbench` by default. Holds what is *confidential in public and shared internally*: an organization's discipline and tooling, and the operator's live work state. The two halves are one bench; neither is a subset of the other |
| `context asset` | Standing constraints a workflow **loads before working** rather than executing -- code conventions, design-system rules, brand voice, the shape a tracker expects. The distinction from a prompt is that a context asset is never the instruction; it is what the instruction has to respect. Distinct from a `pinned reference`, which freezes *external* documentation so it can be cited deterministically |
| `higher order prompt` | A step that exists **because the procedure is not known yet**: it negotiates setup with the operator *while observing*, so the exchange is recorded rather than lost. Its output is not an answer but a **flow** -- recordings accumulated across several subjects distil into the routine that eventually replaces it. It is therefore **not** an abstraction over existing behaviour, and the usual test for one (*what repeated evidence justifies this?*) returns the wrong answer, because the justification is forward-looking. **Record the election, not the conversation**: which candidates existed, which was chosen, and the discriminator -- free text distils into nothing, a recorded choice with its reason distils into a selection rule |
| `observation` | A bounded recording of work being performed, opened deliberately and closed with a reason, kept so a workflow can be derived from what happened rather than from what anyone remembers. **This is how a process is captured** -- a note written afterwards is about the work, a recording is made during it, and the order, the dead ends and what could not be seen do not survive the gap |
| `scratchpad` | The staging area for material that has been captured and has not yet earned a home, held until it is decomposed into the pieces it actually contains. Provisional by definition, and **never referenced by a workflow** -- a rough note that acquires a caller has stopped being provisional without anyone deciding that it should. It is a holding place, **not the capture mechanism**: a process is captured by an `observation` made while it runs, because a note written afterwards cannot recover what the recording holds |
| `clean_up_hook` | The observing hook that fires at a declared stopping point -- a completion, or a session ending -- reconciling every local store against what is now true. It updates, cleans and deletes; it never authors a new claim |
| `tear_down_hook` | The hook that releases what a run started -- processes, sessions, containers, fixtures, worktrees. It captures evidence into the records first and then releases unconditionally, and it releases only what the run's own action log says it started |

### `workbench` alone is ambiguous -- always say which half

**Never write "the workbench" unqualified.** It resolves to two different places with opposite visibility, and a sentence that means the private one read as the public one is how organization-specific material gets authored into a public repository. Write `workbench tool` or `workbench home`; the adjective is the whole safeguard.

**The scaffolding rule binds the two halves.** Organization-specific knowledge and tooling **follows the same scaffolding as the workbench tool, but inside the workbench home** -- same shape, same authoring standard, located where a public repository cannot reach it. One organization's slice is `<workbench home>/<org>/`, mirroring the tool's own top-level areas beneath it, so the slice can be lifted whole into that organization's fork of the tool without being rearranged.

**Organization first, then the scaffolding** -- not area first. The tool is a multi-owner bench, and area-first (`foundations/<org>/`) assumes one organization, interleaves owners inside every area, and stops one organization's material being addressable as a unit the moment the slice grows a second area. Decided 2026-09-16.

The path `$HOME/.workbench` is a **default, not a constant**: it is `__WORKBENCH__` in [`defaults/defaults.json`](defaults/defaults.json), and the private host and repository that back it are `unanswerable` there because they are a decision about the organization rather than about this package.

### `higher order prompt` is not a prompt that takes a prompt

**Two ideas reach for the same phrase and only one of them is the term defined above.** A `command` may be parameterized over another command's output -- one writes a spec, the next is handed its path -- which is a `composition`, and it is fully specified at both ends. A `higher order prompt` is the opposite case: the step is a **hole**, because nobody has written the procedure yet. The first is a shape; the second is an admission.

**The discriminator is where the uncertainty sits.** A composition has none: both commands are specified, and the sequence is code. In a higher order prompt the uncertainty is the entire reason the step exists, and the run's job is to record the election that resolves it. Using the phrase for a composed pair costs the vocabulary the only word it has for the unspecified case, which is the one that cannot be recovered by reading the code.

## Actors -- who performs a step

| Term | Owns | Must not substitute for |
|---|---|---|
| `human` | Intent, requirements, tradeoffs, risk acceptance, permission and release policy | Repeated mechanical checks code can execute |
| `code` | Sequencing, schema and domain checks, quality commands, gates, state, accounting, retries, permission enforcement | Semantic judgment about ambiguous needs |
| `agent` | Research, synthesis, planning, scoped implementation, diagnosis, semantic review, documentation | Independent verification or authorization of its own proposals |

**Agents propose; code disposes. An agent can ask; it cannot say yes to itself.**

## Controls -- what enforces a gate

| Term | Meaning |
|---|---|
| `code-enforced` | A deterministic mechanism prevents or fails the action |
| `human-approved` | Execution waits for explicit authorization |
| `agent-checked` | An instruction requests inspection, but is not a hard boundary |

Actor and control are **different axes**. A step performed by an agent may still sit behind a code-enforced gate. Labelling a step `human-approved` says nothing about who performs it.

Prompts, allowlists, branch names and logging hooks are not isolation unless an external mechanism enforces them.

## Step kinds -- how a phase does its work

| Term | Meaning |
|---|---|
| `deterministic` | A command or API call. Code runs it and reads the exit code |
| `agentic` | Code hands a prompt to an agent and validates the response against a schema |
| `deferral` | The controller hands off to an existing external workflow or tool it does not own, and waits for it |

**A deferral is a third kind, not a variety of the second.** A deterministic step executes and reads an exit code; an agentic step calls and reads a response validated against a schema. A deferral does neither -- the controller **yields and resumes**, which makes **the run's continuation the thing that has to be specified**: what resumes the run, on what evidence, and what the run does if control never comes back. Calling a deferral "a bounded agent call" hides exactly that, and the resumption problem is the reason the kind was written down at all.

`deferral` is frequently omitted from this axis and should not be. Wrapping an existing proven workflow is a legitimate step kind, and the one most likely to be mistaken for "describe what it does" -- which produces duplication with drift built in. **A deferral names its dependency at the call site**, so a reader can see which part is yours and which is borrowed.

A deferral is usually **transitional**: it costs a typed return, a caller-chosen model, per-call overhead, and -- the cost that compounds -- **the capability to build the thing yourself**. What is deferred is not learned, and what is not learned cannot later be extracted, so a deferral left alone quietly removes the condition for its own removal. Those costs are recovered when the mechanism it wraps is extracted into code the workflow calls directly, and the first step of extracting it is reading it.

## Task state -- one value, always

`requested` -> `scoped` -> `ready` -> `building` -> `validating` -> `reviewing` -> `documenting` -> `acceptance_pending` -> `accepted` -> `authorized_handoff`

- **`accepted` is not shipping authority.** Push, merge, publish, release and deploy require a further explicit transition to `authorized_handoff`, naming the exact action and scope. The state, not the prose, is what records that.
- `blocked` and `repairing` are **orthogonal flags**, not members of this enum. Set either alongside the current state.
- `return_to` names the state **responsible for the failure** -- the phase that produced the defect, not the one that detected it. Repair returns there, not unconditionally to verification.

## Engagement mode -- declared before work starts

| Term | Meaning |
|---|---|
| `delivery` | Do authorized work |
| `coaching` | The engineer proposes and defends decisions; use questions and hints before doing it for them |
| `audit` | Inspect and report. No mutation, no workflow launch |
| `design` | Propose. No mutation |

`audit` and `design` are distinct: **proposing is not inspecting.** Collapsing them leaves read-only commands with no mode to declare.

## Autonomy rung -- a separate axis from engagement mode

How much autonomy a workflow has **earned**. Five rungs, in order:

| Rung | What it means |
|---|---|
| `supervised_task` | A human is present for the run and sees each consequential step |
| `gated_local` | A repeatable local workflow whose gates run in code, still started by a human |
| `bounded_isolated` | Bounded, isolated, recoverable jobs -- failure is contained and reversible |
| `authorized_trigger` | External triggers may start it: authenticated, authorized, deduplicated |
| `approved_shipping` | Automatic acceptance or shipping, approved separately from everything above |

**The middle rungs carry the safety progression**, which is why the ladder is five and not three. Gates moving into code, then blast radius being bounded, then triggers being authenticated are three distinct things earned separately.

Advance only through repeated verified outcomes and demonstrated safe failures. **Being away from the keyboard, a dashboard, model confidence, low human presence and a successful demo do not establish trust** -- none of them is evidence about failure behaviour. Automatic shipping is off by default and is its own approval; merge is not deployment.

## Check status -- what a check reported

`passed` / `failed` / `not_run` / `error`

- There is no `skipped`. A check that does not apply is recorded `applicable: false` with a reason. **Inapplicability is a separate field, never a status** -- conflating authorized exclusion with did-not-run is how a missing check becomes a pass.
- If prerequisites fail, dependent checks are `not_run`, not `passed`.
- `environment_suspected` is a flag on a `failed` check, never a status, and never set without corroborating evidence.

## Gate decision -- what a gate concluded

`pass` / `blocked` / `human_waived`

**`human_waived` is not a pass** and must never be reported, aggregated or counted as one. A waiver changes what delivery requires; it never changes a failed result into a passed one. The failing evidence is retained alongside it.

A gate that did not observe its subject is `blocked`. A gate whose subject is a change and whose observed changed-file count is `0` is `blocked`, never `pass`.

## Gate IDs

`G0` scope and authority / `G1` research and readiness / `G2` invocation and handoff / `G3` build and scope integrity / `G4` closed-loop validation / `G5` spec review and revision / `G6` documentation and future context / `G7` acceptance and authorized handoff

A project may extend the namespace. It may not renumber it -- the IDs are what make gate records comparable across projects.

## Review findings -- two orthogonal fields

| Field | Values | Read by |
|---|---|---|
| `disposition` | `blocker` / `tech_debt` / `skippable` | The gate. This is the only one a gate acts on |
| `severity` | `Blocker` / `High` / `Medium` / `Low` / `Note` | Humans |

Plus `risk_accepted` (boolean). A finding that needs repair *or explicit risk acceptance* is `disposition: blocker` with `risk_accepted` -- not a severity that no conformant gate can act on.

Approval must not contradict an unresolved `blocker`.

## Evidence -- rank and provenance

**Rank** -- what a returned claim is worth:

1. Enforced gate with retained output -- *only if it observed a non-empty subject*
2. Independently reproduced command result
3. Inspected code or diff tied to an acceptance criterion
4. Prior artifact or commit -- stale if the revision moved
5. Documentation claim
6. Agent assertion, including a subagent's

**Never promote a weaker claim into a stronger one.** A summary of a check is rank 6 regardless of what it summarizes. Two agents agreeing remains rank 6.

**Provenance** is a separate axis from confidence: `source`: `executed` / `inspected` / `documented` / `asserted`. "The README says X" and "I ran it and got X" are both *verified* in the confidence sense while ranking fifth and second here. A required mechanical check is satisfied only by `source: executed`.

## Operating level -- where attention is spent

| Level | Attention |
|---|---|
| `L1` | Code primitives -- lines, functions, types |
| `L2` | Code structure -- files, modules, architecture |
| `L3` | Data and execution -- schemas, databases, scripts, CLIs |
| `L4` | Delivery and intent -- product, repository, plans, docs |
| `L5` | Agentic systems -- agents, workflows, compositions |

Describes where *attention* sits, not who types. **Move down** when unfamiliarity, consequential risk, weak or contradictory evidence, or hidden details require control -- and record `descent_reason`. **Move up** when understanding, stable contracts and credible acceptance checks justify it. Every descent names a `return_condition` met by a concrete check, not by feeling ready.

## Retry accounting -- separate budgets

`invocation_retry` / `output_correction` / `gate_repair` / `test_fix` / `review_revision` / `restart`

Each kind carries its own cap, alongside a shared total. **Caps bind the task, not the session** -- do not evade them by starting a new session, subagent, worktree or run ID.

## Handoff outcome

`accepted` / `acceptance_pending` / `partially_verified` / `blocked` / `failed`

`partially_verified` exists because real but incomplete verification is the most common honest result. Without it, a run must overclaim or underclaim.

---

## Terms deliberately not defined here

**Anything project-specific.** Repository names, tracker IDs, command names, directory conventions and tool choices belong to the project that adopts this vocabulary, not to the vocabulary. A generated workflow may use its own artifact convention; record the mapping where it is generated.

If a term here can only be explained by referring to one company's tooling, it does not belong in this file.
