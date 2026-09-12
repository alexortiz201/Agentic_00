# Language

The vocabulary of Agentic Engineering. Every term here is **canonical**: the value written into a record is the value named here, spelled exactly as shown.

This file exists because the failure it prevents is silent. A record emitted with one spelling and validated against another does not error at the point of the mistake — it errors at the consuming phase, or worse, passes and means the wrong thing. Two documents that disagree about an enum produce a toolkit whose templates emit records its own policy rejects.

**Why fixed values at all.** Because **the consuming phase validates rather than interprets.** A value outside the declared set is a **malformed output, not a judgement call** — and the consumer is right to reject it rather than guess what was meant. The vocabularies are deliberately disjoint: one word must not mean four things across four records.

Where nothing consumes a value mechanically, this file is describing a **distinction**, not a wire format. The distinctions are the durable part; exact spellings matter only where two programs must agree.

**Rule for changing anything here:** a term changes in this file first, then everywhere that writes or reads it, in the same change. Public names, routing enums, CLI help, prompt arguments, types and recipe links move together or not at all.

---

## Actors — who performs a step

| Term | Owns | Must not substitute for |
|---|---|---|
| `human` | Intent, requirements, tradeoffs, risk acceptance, permission and release policy | Repeated mechanical checks code can execute |
| `code` | Sequencing, schema and domain checks, quality commands, gates, state, accounting, retries, permission enforcement | Semantic judgment about ambiguous needs |
| `agent` | Research, synthesis, planning, scoped implementation, diagnosis, semantic review, documentation | Independent verification or authorization of its own proposals |

**Agents propose; code disposes. An agent can ask; it cannot say yes to itself.**

## Controls — what enforces a gate

| Term | Meaning |
|---|---|
| `code-enforced` | A deterministic mechanism prevents or fails the action |
| `human-approved` | Execution waits for explicit authorization |
| `agent-checked` | An instruction requests inspection, but is not a hard boundary |

Actor and control are **different axes**. A step performed by an agent may still sit behind a code-enforced gate. Labelling a step `human-approved` says nothing about who performs it.

Prompts, allowlists, branch names and logging hooks are not isolation unless an external mechanism enforces them.

## Step kinds — how a phase does its work

| Term | Meaning |
|---|---|
| `deterministic` | A command or API call. Code runs it and reads the exit code |
| `agentic` | Code hands a prompt to an agent and validates the response against a schema |
| `deferral` | Code invokes an existing external workflow or tool it does not own |

`deferral` is frequently omitted from this axis and should not be. Wrapping an existing proven workflow is a legitimate step kind, and the one most likely to be mistaken for "describe what it does" — which produces duplication with drift built in. **A deferral names its dependency at the call site**, so a reader can see which part is yours and which is borrowed.

A deferral is usually **transitional**: it costs a typed return, a caller-chosen model, and per-call overhead. Those costs are recovered when the mechanism it wraps is extracted into code the workflow can call directly.

## Task state — one value, always

`requested` → `scoped` → `ready` → `building` → `validating` → `reviewing` → `documenting` → `acceptance_pending` → `accepted` → `authorized_handoff`

- **`accepted` is not shipping authority.** Push, merge, publish, release and deploy require a further explicit transition to `authorized_handoff`, naming the exact action and scope. The state, not the prose, is what records that.
- `blocked` and `repairing` are **orthogonal flags**, not members of this enum. Set either alongside the current state.
- `return_to` names the state **responsible for the failure** — the phase that produced the defect, not the one that detected it. Repair returns there, not unconditionally to verification.

## Engagement mode — declared before work starts

| Term | Meaning |
|---|---|
| `delivery` | Do authorized work |
| `coaching` | The engineer proposes and defends decisions; use questions and hints before doing it for them |
| `audit` | Inspect and report. No mutation, no workflow launch |
| `design` | Propose. No mutation |

`audit` and `design` are distinct: **proposing is not inspecting.** Collapsing them leaves read-only commands with no mode to declare.

## Autonomy rung — a separate axis from engagement mode

How much autonomy a workflow has **earned**. Five rungs, in order:

| Rung | What it means |
|---|---|
| `supervised_task` | A human is present for the run and sees each consequential step |
| `gated_local` | A repeatable local workflow whose gates run in code, still started by a human |
| `bounded_isolated` | Bounded, isolated, recoverable jobs — failure is contained and reversible |
| `authorized_trigger` | External triggers may start it: authenticated, authorized, deduplicated |
| `approved_shipping` | Automatic acceptance or shipping, approved separately from everything above |

**The middle rungs carry the safety progression**, which is why the ladder is five and not three. Gates moving into code, then blast radius being bounded, then triggers being authenticated are three distinct things earned separately.

Advance only through repeated verified outcomes and demonstrated safe failures. **Being away from the keyboard, a dashboard, model confidence, low human presence and a successful demo do not establish trust** — none of them is evidence about failure behaviour. Automatic shipping is off by default and is its own approval; merge is not deployment.

## Check status — what a check reported

`passed` · `failed` · `not_run` · `error`

- There is no `skipped`. A check that does not apply is recorded `applicable: false` with a reason. **Inapplicability is a separate field, never a status** — conflating authorized exclusion with did-not-run is how a missing check becomes a pass.
- If prerequisites fail, dependent checks are `not_run`, not `passed`.
- `environment_suspected` is a flag on a `failed` check, never a status, and never set without corroborating evidence.

## Gate decision — what a gate concluded

`pass` · `blocked` · `human_waived`

**`human_waived` is not a pass** and must never be reported, aggregated or counted as one. A waiver changes what delivery requires; it never changes a failed result into a passed one. The failing evidence is retained alongside it.

A gate that did not observe its subject is `blocked`. A gate whose subject is a change and whose observed changed-file count is `0` is `blocked`, never `pass`.

## Gate IDs

`G0` scope and authority · `G1` research and readiness · `G2` invocation and handoff · `G3` build and scope integrity · `G4` closed-loop validation · `G5` spec review and revision · `G6` documentation and future context · `G7` acceptance and authorized handoff

A project may extend the namespace. It may not renumber it — the IDs are what make gate records comparable across projects.

## Review findings — two orthogonal fields

| Field | Values | Read by |
|---|---|---|
| `disposition` | `blocker` · `tech_debt` · `skippable` | The gate. This is the only one a gate acts on |
| `severity` | `Blocker` · `High` · `Medium` · `Low` · `Note` | Humans |

Plus `risk_accepted` (boolean). A finding that needs repair *or explicit risk acceptance* is `disposition: blocker` with `risk_accepted` — not a severity that no conformant gate can act on.

Approval must not contradict an unresolved `blocker`.

## Evidence — rank and provenance

**Rank** — what a returned claim is worth:

1. Enforced gate with retained output — *only if it observed a non-empty subject*
2. Independently reproduced command result
3. Inspected code or diff tied to an acceptance criterion
4. Prior artifact or commit — stale if the revision moved
5. Documentation claim
6. Agent assertion, including a subagent's

**Never promote a weaker claim into a stronger one.** A summary of a check is rank 6 regardless of what it summarizes. Two agents agreeing remains rank 6.

**Provenance** is a separate axis from confidence: `source`: `executed` · `inspected` · `documented` · `asserted`. "The README says X" and "I ran it and got X" are both *verified* in the confidence sense while ranking fifth and second here. A required mechanical check is satisfied only by `source: executed`.

## Operating level — where attention is spent

| Level | Attention |
|---|---|
| `L1` | Code primitives — lines, functions, types |
| `L2` | Code structure — files, modules, architecture |
| `L3` | Data and execution — schemas, databases, scripts, CLIs |
| `L4` | Delivery and intent — product, repository, plans, docs |
| `L5` | Agentic systems — agents, workflows, compositions |

Describes where *attention* sits, not who types. **Move down** when unfamiliarity, consequential risk, weak or contradictory evidence, or hidden details require control — and record `descent_reason`. **Move up** when understanding, stable contracts and credible acceptance checks justify it. Every descent names a `return_condition` met by a concrete check, not by feeling ready.

## Retry accounting — separate budgets

`invocation_retry` · `output_correction` · `gate_repair` · `test_fix` · `review_revision` · `restart`

Each kind carries its own cap, alongside a shared total. **Caps bind the task, not the session** — do not evade them by starting a new session, subagent, worktree or run ID.

## Handoff outcome

`accepted` · `acceptance_pending` · `partially_verified` · `blocked` · `failed`

`partially_verified` exists because real but incomplete verification is the most common honest result. Without it, a run must overclaim or underclaim.

---

## Terms deliberately not defined here

**Anything project-specific.** Repository names, tracker IDs, command names, directory conventions and tool choices belong to the project that adopts this vocabulary, not to the vocabulary. A generated workflow may use its own artifact convention; record the mapping where it is generated.

If a term here can only be explained by referring to one company's tooling, it does not belong in this file.
