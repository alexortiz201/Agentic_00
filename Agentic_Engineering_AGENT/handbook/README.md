# 📓 Handbook -- how to actually do a piece of work here

`foundations/` holds what is true. **This holds what to do about it.**

When a task arrives -- a bug ticket, a feature, a chore, a workflow to build -- start here. Each entry below says where to begin, which parts of the discipline apply, what has to exist before you start, and what you produce. The discipline files are referenced rather than repeated: this tells you *which* to read and *why*, and they tell you what the rule is.

## Start from the work

| You have | Start at | The discipline it leans on |
|---|---|---|
| **A bug ticket** | [Working a defect](#working-a-defect) | 🏗️ [SDLC](../foundations/Software_Engineering/01_SDLC_SOFTWARE_DEVELOPMENT_LIFECYCLE.md) for the shape; 🔬 [verification](../foundations/Agentic_Engineering/04_VERIFICATION.md) for what counts as proof it is fixed |
| **A feature or chore** | The same lifecycle, sized down | 🔄 [workflow](../foundations/Agentic_Engineering/02_WORKFLOW.md) -- the flow-sizing table is the first thing to read |
| **A workflow to build** | 🛠️ [`06_BUILDING_AN_ADW.md`](06_BUILDING_AN_ADW.md) | 🧩 [composition](../foundations/Agentic_Engineering/06_ADW_COMPOSITION.md) and 🧱 [the primitive you are creating](../foundations/Agentic_Engineering/primitives/README.md) |
| **A workflow to trust** | 🧪 [`07_VALIDATING_A_WORKFLOW.md`](07_VALIDATING_A_WORKFLOW.md) | 🔬 [verification](../foundations/Agentic_Engineering/04_VERIFICATION.md), and ⚖️ [testing and evidence](../foundations/Software_Engineering/02_TESTING_AND_EVIDENCE.md) |
| **Something that failed** | 🛟 [recovery and handoff](../foundations/Agentic_Engineering/05_RECOVERY_AND_HANDOFF.md) | Repair returns to the phase that *caused* the defect, not the one that found it |
| **Somewhere to put a file** | 🏗️ [`05_AGENTIC_LAYER_LAYOUT.md`](05_AGENTIC_LAYER_LAYOUT.md) | -- |
| **A concept and no idea where it is defined** | 🗺️ [`04_ARTIFACT_MAP.md`](04_ARTIFACT_MAP.md) | -- |

## Working a defect

The worked example, because it is the most common arrival and every other kind of work is a variation on it.

1. **Reproduce it before proposing a cause.** A defect whose reproduction is unknown is not scoped yet, and a fix aimed at an unreproduced failure is a guess with a diff attached. If it cannot be reproduced, say so and name the evidence that would settle it.
2. **Declare the engagement mode and the entry operating level**, and open a run state record. See 🔄 [workflow](../foundations/Agentic_Engineering/02_WORKFLOW.md) for the states and 💾 [state](../foundations/Agentic_Engineering/primitives/state.md) for what the record holds.
3. **Discover within scope.** Read only from the approved root; 🔐 [authority and safety](../foundations/Agentic_Engineering/03_AUTHORITY_AND_SAFETY.md) has the bounded-discovery rule and the commands.
4. **Write the failing check first**, so the fix has something to satisfy that is not your own opinion of it.
5. **Make the smallest coherent change.** If it grows past the scope that was approved, stop and ask rather than widening -- a plan that quietly grew is a plan nobody approved.
6. **Verify, and record the evidence with its provenance.** ⚖️ [testing and evidence](../foundations/Software_Engineering/02_TESTING_AND_EVIDENCE.md) covers the check ladder and the evidence record; 🔬 [verification](../foundations/Agentic_Engineering/04_VERIFICATION.md) has the rule that a required check is satisfied only by having actually run.
7. **Review separately from building**, then hand off. Acceptance is not permission to ship; that is a further explicit decision.

**Where an agent collaborates rather than executes:** steps 1 and 4 are where judgment is genuinely needed and a conversation is worth having -- what actually reproduces this, and what would prove it fixed. Steps 3, 6 and 7 have deterministic parts that should be code rather than judgement. Ask of each step: *would two people given this step produce the same result?* If yes, it is code.

## What is in here

| File | Covers |
|---|---|
| 🗒️ [`01_LOCAL_MEMORY.md`](01_LOCAL_MEMORY.md) | The three local folders -- what goes in each, and what is never committed |
| 🗂️ [`02_RUN_ARTIFACTS.md`](02_RUN_ARTIFACTS.md) | `runs/<run_id>/` -- what a run writes, and the rules for writing it |
| 🩺 [`03_STRUCTURAL_CHECK.md`](03_STRUCTURAL_CHECK.md) | The one executable check: internal links resolve |
| 🗺️ [`04_ARTIFACT_MAP.md`](04_ARTIFACT_MAP.md) | Which file here plays each role the discipline names |
| 🏗️ [`05_AGENTIC_LAYER_LAYOUT.md`](05_AGENTIC_LAYER_LAYOUT.md) | Where things go in a target project, and our naming |
| 🛠️ [`06_BUILDING_AN_ADW.md`](06_BUILDING_AN_ADW.md) | Building a workflow, start to finish |
| 🧪 [`07_VALIDATING_A_WORKFLOW.md`](07_VALIDATING_A_WORKFLOW.md) | Checking a workflow does what it claims, before trusting it |

## The split with `foundations/`

| | Answers | Shape |
|---|---|---|
| 🏛️ [`foundations/`](../foundations/README.md) | What is **true** -- what engineering is, and what agentic engineering adds | Rules, each standing on its own |
| `handbook/` | What to **do** about it | Procedures, in order, that reference those rules |

**The split is rules against procedures, not portable against local.** A procedure here may well hold for any agentic-engineering effort -- building a workflow is not specific to this package -- and that is fine. What decides placement is the form: a statement of what is true belongs in `foundations/`, and an ordered sequence of what to do belongs here.

That keeps `foundations/` standalone, because a rule is liftable in a way a procedure is not: the procedure names files, tools and an order, and every one of those is an adopter's choice.

**When a file here explains a rule rather than pointing at one, that is a leak.** The rule moves to `foundations/` and this file keeps the pointer.
