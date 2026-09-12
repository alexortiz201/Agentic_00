# Composition

Phases in sequence. It owns exactly three things: **identity, order, and failure policy.** Nothing else -- if it reaches into a phase, the boundary is wrong.

## Must contain

- **Identity minting**, passed down. The run identifier is the only thing a composition hands its phases; everything else travels through state.
- **The sequence**, named so the name *is* the documentation: the phases in execution order.
- **A failure policy per phase**, not one policy for the whole run.

## Failure policy is a per-phase decision

The same phase failing means different things depending on what follows it. A failed verification step may be survivable before a review, and fatal before a merge. **Record the reason beside the policy** -- a bare `continue` reads as an oversight a year later.

**A workflow started by a person may abort. A workflow started by a trigger may not** -- it owes its queue a terminal status on every path, or the work is lost in a claimed state forever.

## Rules

- **Phases are separate processes.** Fresh start, state re-loaded, no shared memory. That is what makes a phase independently runnable and a failure independently resumable.
- **Forward options deliberately.** Passing a flag through unconditionally when the composition means to force it is a silent override.
- **When compositions differ only in sequence and policy, they are data, not files.** Several near-identical variants is the signal to replace them with a table and one runner.
