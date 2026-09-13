# 🧱 Templates

Starting points, copied into a target and then owned by it. **Nothing here is imported at runtime** — a template is markdown or data you take a copy of, not a dependency you link against. A copy that drifts from its template is the copy being right about its own situation.

Only what the package already states a use case for gets a template. A template for something nobody has needed twice is a guess with a folder.

| Group | Holds | Status |
|---|---|---|
| [`layout/`](layout/) | The three local folders an adopter would otherwise receive empty | present |
| [`workflow/`](workflow/) | A phase, and the prompt payload it hands an agent | present — earned by writing both twice, on a deterministic phase and an agentic one |
| [`record/`](record/) | The phase result, the history entry, the action line | present — same reason |
| `document/` | Design and spec skeletons | **not yet.** A design document has been written once and a spec not at all. Earned by the second of either |

## Why `layout/` exists at all

`.profile/`, `.workgroup/` and `.memory/` are **never committed**, which is correct for what they hold and means a fresh clone of this package arrives with all three missing. They are load-bearing: the operating rules read them. So the defaults ship here and are copied in, rather than each adopter inventing three folders from a description.
