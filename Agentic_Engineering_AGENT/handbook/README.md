# 📓 Handbook -- how to operate this package

Conventions for *using* this package: where things go, how they are named, what may be created without asking. Numbered so the order is ours to choose rather than alphabetical.

This is the counterpart to [`foundations/`](../foundations/README.md), and the split is worth keeping straight:

| | Answers | Portable? |
|---|---|---|
| 🏛️ [`foundations/`](../foundations/README.md) | What engineering **is**, and what agentic engineering adds | Yes -- standalone by rule |
| `handbook/` | How **this package** is operated | No -- specific to this package's layout |

A convention that would hold for any agentic-engineering effort belongs in `foundations/`, in the area it fits -- `Software_Engineering/` if it would have been true before agents existed, `Agentic_Engineering/` otherwise. A convention about this folder structure belongs here.

| File | Covers |
|---|---|
| 🗒️ [`01_LOCAL_MEMORY.md`](01_LOCAL_MEMORY.md) | The `.memory/` staging area -- notes, artifact folders, naming, promotion |
| 🗂️ [`02_RUN_ARTIFACTS.md`](02_RUN_ARTIFACTS.md) | `runs/<run_id>/` -- what a run writes, and the rules for writing it |
| 🩺 [`03_STRUCTURAL_CHECK.md`](03_STRUCTURAL_CHECK.md) | The one executable check: JSON parses, internal links resolve |
| 🗺️ [`04_ARTIFACT_MAP.md`](04_ARTIFACT_MAP.md) | Which file here plays each role the discipline names |
| 🏗️ [`05_AGENTIC_LAYER_LAYOUT.md`](05_AGENTIC_LAYER_LAYOUT.md) | Where the primitives go in a target project, and our naming |
| 🛠️ [`06_BUILDING_AN_ADW.md`](06_BUILDING_AN_ADW.md) | The construction process, start to finish |
| 🧪 [`07_VALIDATING_A_WORKFLOW.md`](07_VALIDATING_A_WORKFLOW.md) | Checking a workflow does what it claims, before trusting it |
