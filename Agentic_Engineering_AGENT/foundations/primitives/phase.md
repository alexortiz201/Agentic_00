# Phase

One step of a workflow, **as code**. It owns sequencing, state and gates; the agents it invokes own judgment. A phase that only forwards a prompt is a command with extra steps.

## Must handle

1. **Identity.** An *entry* phase mints the run identifier; a *dependent* phase **requires** one and refuses to run without it. Say which it is in the file, with the reason.
2. **Preconditions.** Load state, verify the workspace, confirm the environment. Exit with a remediation message naming what to run, not just what failed.
3. **Invocation.** Build a typed request. Never assemble a raw prompt string inline.
4. **Deadline.** Every invocation carries one. A timeout handler with no timeout set is dead code.
5. **Result handling.** Parse against a schema. **Degrade to a typed failure value rather than raising** — a phase that throws loses the state write it owed.
6. **State writes after every material fact**, immediately, not at the end.
7. **Report on every path.** A failure exits only *after* recording why, somewhere durable enough to read later. This is what makes an unattended run debuggable.
8. **Verify the agent's claim.** If it says it wrote a file, confirm the file exists where it said.

## The result record

What a phase emits for the next one, beyond the common [record](record.md) fields:

| Field | Holds |
|---|---|
| `phase` | Which phase produced this |
| `status` | `completed` · `failed` · `blocked` · `cancelled` — execution, **kept separate from any gate outcome** |
| `summary` | Compact, for a human scanning a run |
| `artifacts` | What it produced, by path |
| `changed_files` | What it touched |
| `findings` | Anything the next actor must weigh |
| `attempt_kind` | Which retry budget this consumed |
| `next_action` | Proposed, not authorized |

**Execution status is not acceptance.** A phase that completed says nothing about whether its output was any good — that is a gate's decision, in a different record.

## Exit codes

`0` success · `1` the work failed · `2` the harness failed. Distinguishing the last two is what tells you whether to retry.

## Rules

- **Phase-local constants stay local** — agent names, retry ceilings. They are not shared vocabulary.
- **Retries are not free.** An agent run is rarely idempotent; re-running an implementation can apply an edit twice. Retry transport failures, not semantic ones.
- The tail is usually identical across phases. When it is, that tail is a module.
