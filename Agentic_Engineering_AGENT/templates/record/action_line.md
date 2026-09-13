# Action line

One line per action, appended as it happens. Not what the run *checked* and not what it *concluded* — what it **did**.

```json
{ "schema_version": 1, "phase": "<phase>", "seq": 0, "at": "<iso8601>", "kind": "<kind>", "...": "kind-specific fields" }
```

| `kind` | Means |
|---|---|
| `command` | Something was executed. Carry the command and its exit code |
| `agent` | An actor was invoked. Carry the prompt path, model, timeout — then a second line with the result and cost |
| `write` | An artifact was produced. Carry its path |
| `acquire` | A resource was created and must be released |
| `release` / `release_failed` | What teardown did, and what it could not do |

## It earns its place twice

**It is the account a failure needs.** A phase result says where a run ended up; this says how it got there, in order. No conclusion-shaped record can answer that.

**It is the inventory of what this run started.** Every `acquire` is already written down, so teardown releases its own resources rather than guessing from what happens to be listening on a port. Guessing in that direction eventually stops something a person deliberately left running, and that is indistinguishable from a crash to whoever was using it.

## The defect to avoid

**Phases of one run append to the same file, so `seq` must be scoped to the phase and stamped on every line.** A second phase that restarts `seq` at zero silently collides with the first phase's ordering key, and nothing afterwards can tell the two apart. Global ordering comes from `at`.
