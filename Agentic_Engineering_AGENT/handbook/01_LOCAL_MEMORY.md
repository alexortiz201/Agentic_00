# 🗒️ Local folders

Three folders at the package root, none of them committed. **Create any of them if it is absent** -- no permission is needed: they are local, ignored and additive.

| | Holds | Lives as long as |
|---|---|---|
| `.memory/` | What is worth carrying to the next session | Until acted on or stale |
| `.profile/` | Who is operating this package -- preferences, growth direction | As long as that person does |
| `.workgroup/` | A folder per workgroup this discipline is applied to, plus run scratch | The workgroup, and the run |

`.profile/` is what keeps `foundations/` standalone: anything true of one person goes there rather than into doctrine. `.workgroup/` is distinguished from `.memory/` by subject -- `.memory/` is about this package, a folder in `.workgroup/` is about something this package is applied to, and loose scratch at its root belongs to neither and is cleared when the run ends. The rest of this file is about `.memory/`, which has the most structure.

## `.memory/`

It is **the agent's scratchpad**. It is never committed: the root `.gitignore` covers `.memory/`, `memory/` and `*.memory.md`.

Because it is never shared, the *conventions* for it live here, in a committed file, rather than inside it.

## How it is organised

`.memory/` holds whatever is worth keeping track of and later clearing out. Two things it is specifically for:

- **Carrying a thread across a deliberately restarted session.** When context grows unwieldy the right move is to start a clean session, and this folder is what survives that boundary. A cold-start note here is load-bearing, not a courtesy.
- **Making proposals and half-formed ideas visible.** Something does not have to be finished to be written down here.

It is a staging area, not an archive.

**Folders are topics.** A folder name says what the thinking inside it is about, so someone can follow a line of thought, or come back to something discovered earlier and decide it has earned a permanent home. Promotion out of `.memory/` into the package is the expected end state for anything that proves important; most items will never get there, and that is fine.

```
.memory/
  <topic>.md              a single note -- a topic that has not needed more than one file yet
  <topic>/                a topic with more than one file
    <kind>_<short_description>.md
```

- **A topic gets a folder once it has a second file.** One file does not need one; a folder per file is noise, and noise is what makes a staging area stop being read.
- **Filenames carry a kind prefix** -- `proposal_`, `adw_` -- even inside a folder that already implies it. The redundancy is deliberate: these files are meant to be **promoted out**, and a name that survives the move is worth a repeated word.
- **Everything here is plain `.md`.** The folder is already ignored as a whole, so the `*.memory.md` suffix adds nothing inside it.

## Current topics

This table drifts the moment a file is added without updating it. If it disagrees with the folder listing, the listing wins.

| Path | Thinking about |
|---|---|
| `tool_purpose.md` | What this package is for, and the boundary it must not cross |
| `sdlc_plugin.md` | The de-facto delivery workflow that generated workflows compose around |
| `adws/` | Where ADWs are today versus where they are going |
| `proposals/` | Proposed changes to this package, each promotable to a spec |
| `package_cleanup.md` | The in-progress cleanup -- what is settled, what is still open |
| `running_context.md` | What is true about this package right now -- shape, standing rules, gates. Outlives a run |
| `todo_list.md` | The run in progress. Wiped at the end of every run |
| `engineer_growth.md`, `engineer_preferences.md` | Who this package is being operated by, and what they have asked for |
| `foundations_audit.md` | `foundations/` measured against the external manual it answers to |
| `reference_apps/` | Implementations studied for prior art |

## Writing notes

One topic per file. Keep them short and current -- **correct a stale fact in place** rather than appending a correction beneath it, and delete a file whose topic is resolved. These are notes to act on, not a log.

What belongs: facts about the target environment that would otherwise be rediscovered -- its de-facto tooling, known limits of the current approach, gaps between where things are and where they are going -- plus the working state of the run in progress. What does not: anything that belongs in this package's tracked documentation, because a decision recorded only here is a decision nobody else can review.

**`running_context.md` carries what a fresh session needs and `todo_list.md` carries the run.** The first holds durable state -- the package's shape, the rules in force, where the gates stand -- and is corrected in place rather than appended to. Keep it to a screen; longer than that and it has become a log.

**`todo_list.md` is the run's working plan**, as bulleted actionable steps. It is written before the work starts, worked top to bottom, rewritten as the work reveals things, and **wiped clean at the end of every run**. The wipe is the part that matters: a list left behind is read by the next session as outstanding work, and a stale list is worse than no list because it looks authoritative. Finishing the work and clearing the list are one step.

A generated workflow running out of a target project keeps its own run state under its own run artifacts, not here.

## Artifacts

Anything longer than a note -- a proposal, a design, an investigation -- goes in a topic folder under the same rules, so nothing is lost and each piece stays promotable on its own:

1. **One item per file.** If it could become a spec by itself, it is its own file.
2. **Name it for what it is: `<kind>_<short_description>.md`.** The filename is the summary -- a listing of the folder should tell you what is in it without opening anything.
3. **When several items address the same subject**, number them in the order they should be read: `<kind>_<NN>_<short_description>.md`, `01` upward.
4. **Folder name plural where it holds many of one kind** (`proposals/`), singular-topic where it holds facets of one subject (`adws/`).
5. **First line is `# Title`**, followed by an italic line giving origin and status.
6. **No index file.** The folder listing is the index, which is why rule 2 is not optional -- an index maintained beside the files is one more thing that can drift from them.
7. **Record a cross-item constraint in every file it binds**, not in one of them. There is no index to carry it, and the person who opens the second file must not have to have read the first.

## Authority

Everything under `.memory/` is a **prior snapshot to verify against current sources**, never authority. A note that contradicts the repository loses.
