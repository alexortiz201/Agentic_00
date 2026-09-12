# 🏛️ Foundations -- what Agentic Engineering is

This folder holds the **discipline**, not its application. Everything here is standalone: it describes how to run a bounded, observable, repairable software-delivery loop with agents, and it does so without naming a company, a repository, a tracker, a model or a harness.

That constraint is the point. Anything that touches a specific project, toolkit or filesystem layout lives outside this folder and is expected to change often. What is in here should change slowly, and only for reasons that would hold at any organization.

**Nothing here links outward.** The discipline names *concepts* -- a run-state record, a gate-decision record, a design document -- and whatever adopts it decides which file is which. That mapping is the adopter's business, not the discipline's, and keeping it out is what makes this folder liftable.

## What is in here

| File | Answers |
|---|---|
| 🔤 [`LANGUAGE.md`](LANGUAGE.md) | What each term *means*, and exactly how it is spelled in a record |
| 🧭 [`01_PRINCIPLES.md`](01_PRINCIPLES.md) | How to decide -- evidence ranking, control labels, repair over performed success |
| 🔄 [`02_WORKFLOW.md`](02_WORKFLOW.md) | The task lifecycle, its states, and which gate guards each transition |
| 🔐 [`03_AUTHORITY_AND_SAFETY.md`](03_AUTHORITY_AND_SAFETY.md) | What may be done without asking, what may not, and what isolation actually isolates |
| 🔬 [`04_VERIFICATION.md`](04_VERIFICATION.md) | What counts as a check, how checks are ordered, and when a failure blocks |
| 🛟 [`05_RECOVERY_AND_HANDOFF.md`](05_RECOVERY_AND_HANDOFF.md) | Bounded repair, rollback ordering, and reporting a result truthfully |
| 🧩 [`06_ADW_COMPOSITION.md`](06_ADW_COMPOSITION.md) | Primitives, how they compose into workflows, and the control-plane failures a composition must survive |
| 🎓 [`07_COACHING.md`](07_COACHING.md) | How the coaching mode is actually run -- the loop, the questions, mastery from evidence |
| 🧱 [`primitives/`](primitives/README.md) | Blueprints -- what each primitive must contain when you create one |

**Read `LANGUAGE.md` first.** The other files assume its vocabulary, and most contradictions between documents turn out to be two spellings of one idea rather than two ideas.

## The ideas the rest of it rests on

- **Agents propose; code disposes.** Keep proposal, authorization and mutation separate. An agent may ask; it cannot approve itself. Autonomy does not increase authority.
- **Evidence has a rank, and provenance is a separate axis from confidence.** Never promote a weaker claim into a stronger one. A summary of a check is weaker than the check.
- **A check that cannot fail is worse than no check**, because it reads as coverage. A gate that did not observe its subject reports `blocked`, never `pass`.
- **Failures become state.** Preserve enough to resume or repair. Never narratively smooth over a failure, and never relabel a waived failure as a pass.
- **Reuse must be earned.** Learn, apply, then extract -- in that order. A pattern extracted before it has been executed encodes a guess.
- **Move down a level when evidence is weak; return on a named condition**, not on a feeling of readiness.

## Evolving this folder

It is meant to be iterated. Two rules keep it useful while it changes:

1. **Standalone or it does not belong.** If a statement can only be justified by one company's tooling, one repository's layout, or one vendor's product, it goes in that project's own docs and not here. A worked example drawn from real work is welcome -- the *rule* it illustrates has to generalize.
2. **Vocabulary changes land everywhere at once.** A term is renamed in `LANGUAGE.md` and in every place that reads or writes it, in the same change. A half-applied rename is worse than the original name, because it fails silently at the consuming phase.

When a lesson arrives from real delivery, the question to ask is not "is this true?" but **"is this true anywhere?"** The specifics stay with the project; only what survives that question comes here.
