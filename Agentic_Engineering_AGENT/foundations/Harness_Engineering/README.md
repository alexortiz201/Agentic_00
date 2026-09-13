# 🔌 Harness Engineering -- treating the runtime as a variable

What a harness is, what a workflow may assume of one, and how to keep the two separable.

**A harness is the thing that actually runs an agent** -- it resolves a model, holds a conversation, exposes tools, applies whatever permissions it has, and hands back a result. It is not the agent and it is not the workflow. Confusing the three is what produces work that cannot move.

**This area names no harness.** The rule that keeps `foundations/` portable bars naming a company, repository, tracker, model or harness, and a document about harnesses is exactly where that rule is most likely to be broken and most important to keep. What each product actually does belongs outside `foundations/`, in `harnesses/` at the package root, where it can change as often as those products do.

## What is in here

| File | Answers |
|---|---|
| 📐 [`01_THE_CAPABILITY_SURFACE.md`](01_THE_CAPABILITY_SURFACE.md) | What a workflow may assume of any harness, and what it must not |
| 🔁 [`02_PORTABILITY.md`](02_PORTABILITY.md) | How one workflow comes to run on two harnesses, and what that costs |
| 💉 [`03_INJECTION_POINTS.md`](03_INJECTION_POINTS.md) | Where text can enter a run, what each position costs, and which choices fail silently |

## The argument for taking this seriously

A workflow that assumes its harness is a workflow that dies with it. That sounds like a distant risk and is not: harnesses are young, they change quickly, and the one an organization has standardized on is rarely the one an individual would choose. Portability is what lets those two facts coexist.

The cost of ignoring it is not paid at porting time, which is the intuition that makes it easy to ignore. It is paid continuously, because a workflow built against one harness's conveniences **encodes assumptions nobody wrote down** -- that a hook exists, that a configuration file is read, that a sub-agent can be spawned. Those surface as failures on the second harness, long after the decision that caused them.

## The three seams

Almost all of portability is holding three things apart, and almost all of the difficulty is that a harness will happily let you merge them.

- **The controller is code, and code is portable.** Sequencing, state, gates and failure routing belong in a program that runs anywhere a runtime does. A controller expressed as harness configuration is not a controller, it is a feature request.
- **The prompt is a file, and files are portable.** What an agent is asked to do is text. Text moves. A prompt that only exists inside a harness-specific construct has been made unportable for no gain.
- **The harness sits behind one adapter.** Every call into it goes through a single named boundary -- which is a [module](../Agentic_Engineering/primitives/module.md) in the ordinary sense, wrapping a foreign system. Two harnesses means two implementations of one interface, not two workflows.

**The test for whether the seams are real:** can you name the file you would have to change to run on a different harness? If the answer is "several, and I would have to look", the adapter does not exist yet.

## What conformance means here

A harness is not evaluated on its feature list. It is evaluated against [the capability surface](01_THE_CAPABILITY_SURFACE.md) -- the set of things a workflow is allowed to depend on. A harness either satisfies a capability, satisfies it differently, or does not satisfy it.

**The gaps are the useful output.** A feature comparison produces admiration; a conformance report produces a work list. Where a harness fails to satisfy a capability, that is either something to build on top of it, or a constraint the workflow must be designed around -- and both are decisions worth making deliberately rather than discovering at runtime.
