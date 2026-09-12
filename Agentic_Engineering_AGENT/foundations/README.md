# 🏛️ Foundations -- the discipline

Two bodies of knowledge, in the order they depend on each other.

| | Holds | Read it when |
|---|---|---|
| 🏗️ [`Software_Engineering/`](Software_Engineering/README.md) | Proper engineering -- the practice agentic work is built on top of and does not replace | You need the substrate: what the lifecycle is, what a good interface is, why a seam matters |
| 🤖 [`Agentic_Engineering/`](Agentic_Engineering/README.md) | What changes when agents and deterministic code perform the work | You are designing, running, or verifying agentic work |

**Agentic Engineering is a superset of engineering, not a replacement for it.** Everything in `Agentic_Engineering/` assumes the practice in `Software_Engineering/` still holds, and says so where it leans on it. A workflow gets multiplied hundreds of times once it works, which makes a bad interface or a hidden coupling more expensive than it was when a person ran the step by hand -- so the classical concerns matter more here, not less.

## The rule that keeps this folder portable

Everything here is standalone: it describes how to run a bounded, observable, repairable software-delivery loop with agents, and it does so **without naming a company, a repository, a tracker, a model or a harness.**

That constraint is the point. Anything that touches a specific project, toolkit or filesystem layout lives outside this folder and is expected to change often. What is in here should change slowly, and only for reasons that would hold at any organization.

**This folder links inward, never outward.** A file here may reference another file here, including across the two areas -- that is what lets the agentic side name the engineering practice it rests on. What it may not do is reach outside `foundations/`. The discipline names *concepts* -- a run-state record, a gate-decision record, a design document -- and whatever adopts it decides which file is which. That mapping is the adopter's business, and keeping it out is what makes this folder liftable.

The canonical vocabulary is read before any of this, from the package root. Nothing here points back at it, because by the time these files are read the spelling is already in context.

## Evolving this folder

1. **Standalone or it does not belong.** If a statement can only be justified by one company's tooling, one repository's layout, or one vendor's product, it goes in that project's own docs and not here. A worked example drawn from real work is welcome -- the *rule* it illustrates has to generalize.
2. **Vocabulary changes land everywhere at once.** A term is renamed in the canonical vocabulary and in every place that reads or writes it, in the same change. A half-applied rename is worse than the original name, because it fails silently at the consuming phase.
3. **Put it in `Software_Engineering/` if it would have been true before agents existed.** That is the whole test. If removing agents from the picture leaves the statement standing, it is engineering, not agentic engineering.

When a lesson arrives from real delivery, the question to ask is not "is this true?" but **"is this true anywhere?"** The specifics stay with the project; only what survives that question comes here.
