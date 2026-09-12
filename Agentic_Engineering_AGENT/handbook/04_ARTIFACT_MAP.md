# 🗺️ Artifact map -- concept -> where it is defined

`foundations/` names concepts and reaches nothing outside itself. This is the mapping it leaves out.

Until `v2/` exists, the **blueprint is the definition** -- it says what each artifact must contain. Concrete starting files land in `v2/` and this table gains a second column when they do.

| Concept in `foundations/` | Defined by |
|---|---|
| Command | ⌨️ [`foundations/primitives/command.md`](../foundations/Agentic_Engineering/primitives/command.md) |
| Spec | 📋 [`foundations/primitives/spec.md`](../foundations/Agentic_Engineering/primitives/spec.md) |
| Phase | 🪜 [`foundations/primitives/phase.md`](../foundations/Agentic_Engineering/primitives/phase.md) |
| Composition | 🔗 [`foundations/primitives/composition.md`](../foundations/Agentic_Engineering/primitives/composition.md) |
| Shared module | 📦 [`foundations/primitives/module.md`](../foundations/Agentic_Engineering/primitives/module.md) |
| Run state | 💾 [`foundations/primitives/state.md`](../foundations/Agentic_Engineering/primitives/state.md) |
| Trigger | ⚡ [`foundations/primitives/trigger.md`](../foundations/Agentic_Engineering/primitives/trigger.md) |
| Hook | 🪝 [`foundations/primitives/hook.md`](../foundations/Agentic_Engineering/primitives/hook.md) |
| Pinned reference | 📌 [`foundations/primitives/pinned_reference.md`](../foundations/Agentic_Engineering/primitives/pinned_reference.md) |
| Design document | 📐 [`foundations/primitives/design_document.md`](../foundations/Agentic_Engineering/primitives/design_document.md) |
| Where a run writes | 🗂️ [`02_RUN_ARTIFACTS.md`](02_RUN_ARTIFACTS.md) |
| Where each lives in a project | 🏗️ [`05_AGENTIC_LAYER_LAYOUT.md`](05_AGENTIC_LAYER_LAYOUT.md) |
| How to build one | 🛠️ [`06_BUILDING_AN_ADW.md`](06_BUILDING_AN_ADW.md) |

## Rules

- **A new concept in `foundations/` earns a row here**, not a link there. A link in the discipline is the leak returning.
- **A blueprint is not a schema.** It states what must be present and why; it validates nothing.
- **A target project may use its own convention.** Record that mapping where its workflow is defined.

## `v1/`

The previous toolkit -- templates, prompts, commands, skills, hooks. Kept isolated and unreferenced. Read it for prior art; do not wire anything to it.
