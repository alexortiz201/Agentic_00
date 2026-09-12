# Run artifacts -- `runs/<run_id>/`

Where this package writes what a run produces. Four files previously stated a fragment of this each; it lives here now.

## The convention

```
runs/<run_id>/
  TASK_BRIEF.md     the bounded outcome and acceptance criteria
  PLAN.md           for non-trivial work
  TASK_STATE.json   updated after each step and before yielding
  HANDOFF.md        the result, including failures and waivers
  ...               gate and phase records, evidence, as the run produces them
```

Write **only the records the run actually needs**. Workflow-authoring work adds a design document; defect work adds a reproduction record before build; coaching adds a session record. What each must contain is in [`foundations/primitives/`](../foundations/primitives/README.md).

## Rules

- **Writing here is a mutation.** Obtain artifact-write approval first. It is not exempt because the files are "just notes".
- **Never overwrite a template, and never overwrite another run.** A run directory is append-only from the perspective of every other run.
- **Update state after each step and before yielding**, not at the end. A run that dies mid-step should leave enough to resume from.
- **Write-then-rename within the same directory** where practical, so a reader never sees a half-written record.
- **No secrets, ever** -- not in state, not in evidence, not in a handoff.
- **Retain failure evidence.** A failed result stays in the run directory alongside whatever superseded it. Deleting it is how a repair becomes indistinguishable from a pass.

## Generated workflows may differ

A workflow this package *generates* runs in its target project and may use that project's own artifact convention rather than this one. When it does, **record the mapping once** where the workflow is defined -- which of its artifacts corresponds to the brief, the state, the gate record, the handoff. The mapping is what keeps a generated workflow inspectable by someone who only knows this package.
