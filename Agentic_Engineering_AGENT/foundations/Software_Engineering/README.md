# 🏗️ Software Engineering -- the practice underneath

Proper engineering. The part that was true before agents existed and is still true now.

This area exists because the agentic side kept asserting things it had not grounded. It described a lifecycle without naming it, it required interfaces to be checkable without saying what makes an interface checkable, and it treated separation of concerns as obvious rather than as a practice with a reason. Those are engineering questions with engineering answers, and stating them here is what lets the agentic side *rest* on them rather than quietly reinvent them.

## What is in here

| File | Answers |
|---|---|
| 📐 [`01_SDLC_SOFTWARE_DEVELOPMENT_LIFECYCLE.md`](01_SDLC_SOFTWARE_DEVELOPMENT_LIFECYCLE.md) | What the software development life cycle is, what each phase is *for*, and why naming it correctly matters |

## What belongs here

The test is a single question: **would this still be true if you removed agents from the picture?**

If yes, it is engineering and it belongs here -- the lifecycle, interface design, separation of concerns, coupling and cohesion, testing strategy, review, release and rollback practice, observability. If no, it belongs in [`Agentic_Engineering/`](../Agentic_Engineering/README.md).

Two things follow from that test, and both are easy to get wrong:

- **A practice does not move here just because agents happen to use it.** Agents run linters; linting is engineering. Agents are handed a bounded scope; *bounding an agent's scope* is agentic. The question is about the statement, not about who executes it.
- **A practice does not stay out just because agents made it more important.** Several classical concerns got *sharper* under agents rather than being replaced. They still belong here, with the amplification noted rather than used as a reason to relocate them.

## Why this matters more under agents, not less

A practice a person performs runs once per occasion, and a human absorbs the cost of a rough edge each time. A practice encoded into a workflow runs every time that workflow runs, which is the point of encoding it -- and the same multiplication applies to its defects. A leaky interface that cost one engineer ten minutes now costs that ten minutes on every execution, silently, with nobody watching the step closely enough to notice.

So the classical qualities -- isolatable, decoupled, single clear interface -- are not legacy concerns to be carried along out of habit. They are the properties that decide whether a workflow can be tested at all. A phase you cannot invoke on its own cannot be verified on its own, and a workflow made of phases that cannot be verified on their own can only be verified end to end, which is the most expensive and least informative way to find out something is wrong.
