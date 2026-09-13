# 📋 Gate enforcement census

A workflow's gate vocabulary says what each gate *decides*. It never says what **holds that gate shut**, and those are different questions. A gate enforced by the controller and a gate enforced by asking an agent nicely produce identical records, and a reader cannot tell them apart from the decision alone.

The census is the count that makes the difference visible. Run it against a workflow, and it answers three things the package otherwise asks for and cannot measure: **how enforced is this workflow, is that getting better or worse, and what should be built next.**

## The procedure

### 1. List the gates that actually ran

From the run's records, not from the design document. A gate that exists in a diagram and never executes is `absent`, and counting it is how a workflow scores well on paper.

Draw the identifiers from the declared namespace so two workflows' censuses compare. A locally-invented identifier is a row nobody else can line up against theirs.

### 2. Label what holds each one shut

One value per gate, and take the **weakest** thing that is genuinely doing the work:

| Enforcement | Means |
|---|---|
| `code_enforced` | The controller refuses to proceed. No actor can decline it |
| `harness_enforced` | The runtime denies it -- a pre-tool gate, a permission rule, an isolation boundary |
| `agent_checked` | An actor was asked to check and reported back. Nothing refuses if it reports wrongly |
| `documented` | Written down. Nothing observes whether it happened |
| `absent` | Declared somewhere, never runs |

**The common inflation is labelling `agent_checked` as `code_enforced`** because the controller calls the agent. Calling an actor is not enforcement; refusing its answer is. The test: if the actor returned a confident, well-formed lie, would anything stop the transition? If not, the gate is `agent_checked`.

### 3. Label what each one bound to

Independently of enforcement, because a perfectly enforced gate that observed nothing is still worth nothing:

`executed` (a check ran here) · `inspected` (a diff or file was read) · `documented` (a document claims it) · `asserted` (an actor says so) · `nothing` (the subject was never found -- an empty diff, a missing artifact, a skipped step).

### 4. Count

**The enforcement ratio is `(code_enforced + harness_enforced) / gates that ran.`** One number, comparable across workflows and across time.

Report two more alongside it, because the ratio alone flatters a workflow that gates cheap things well:

- **How many gates bound to `nothing`.** Each is a gate that passed without observing its subject.
- **How many `human_waived` decisions.** A waiver is never a pass, and a rising waiver count is a gate people have decided to route around rather than fix.

### 5. Write it where it accumulates

A census taken once is an opinion about a workflow on a Tuesday. Put the numbers in the run history so the ratio can be watched, since **watching it move is the whole point** -- a workflow whose enforcement ratio is falling while its run count climbs is being trusted more and verifying less.

## What the census decides

It produces a priority order that is not a matter of taste. **Promote the weakest enforcement guarding the largest blast radius, and do that first.**

An `agent_checked` gate in front of a push is a more urgent build than three `documented` gates in front of a local edit, and without the census that comparison is made by whoever feels strongest about it. Two gates at the same enforcement level are ranked by what they let through when they fail.

The corollary is a stopping rule, which matters as much: **a `documented` gate in front of something reversible and cheap may be correct and finished.** Not every gate needs to be code, and a census that drives everything toward `code_enforced` has stopped measuring and started moralising.

## Failure modes

- **Censusing the design rather than the run.** The declared set is always more enforced than the executed one.
- **Counting a gate once when it ran many times.** A gate that passed a hundred times and was waived twice is not two rows; it is one row with a waiver rate.
- **Treating the ratio as a score to raise.** It is an instrument for choosing what to build next. A ratio improved by deleting weak gates rather than strengthening them has moved the number in the right direction and the workflow in the wrong one.
- **Taking the census by hand.** It is derived from records the run already writes. Hand-authoring it makes it a claim about a workflow rather than a measurement of one.

## Relation to validation

[`07_VALIDATING_A_WORKFLOW.md`](07_VALIDATING_A_WORKFLOW.md) asks whether a workflow is sound enough to trust **once**, before adoption. The census asks how much of that soundness is **structural** rather than depending on an actor behaving, and it is worth re-running as the workflow changes rather than only at adoption.

A workflow can pass validation and have an enforcement ratio near zero. That is not a contradiction: it means it worked when it was watched, and nothing about it prevents it from failing quietly when it is not.
