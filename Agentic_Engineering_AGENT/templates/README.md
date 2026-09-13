# 🧱 Templates

Starting points, copied into a target and then owned by it. **Nothing here is imported at runtime** — a template is markdown or data you take a copy of, not a dependency you link against. A copy that drifts from its template is the copy being right about its own situation.

Only what the package already states a use case for gets a template. A template for something nobody has needed twice is a guess with a folder.

| Group | Holds | Status |
|---|---|---|
| [`layout/`](layout/) | The three local folders an adopter would otherwise receive empty | present |
| `workflow/` | Phase and composition skeletons | not yet — earned when a second workflow shows what is actually shared |
| `record/` | Record shapes | not yet — the primitives state the fields; a template adds nothing until one is written twice |
| `document/` | Design and spec skeletons | not yet |

## Why `layout/` exists at all

`.profile/`, `.workgroup/` and `.memory/` are **never committed**, which is correct for what they hold and means a fresh clone of this package arrives with all three missing. They are load-bearing: the operating rules read them. So the defaults ship here and are copied in, rather than each adopter inventing three folders from a description.
