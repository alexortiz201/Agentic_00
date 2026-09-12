# Local memory

A `.memory/` folder at the package root holds working notes about **the environment this package is being used in**. It is never committed -- the root `.gitignore` covers `.memory/`, `memory/` and `*.memory.md`, and `.memory/.gitignore` ignores everything including itself.

**Create it if it is absent.** No permission is needed: it is local, ignored and additive. Because it is never shared, the *conventions* for it live here, in a committed file, rather than inside it.

## How it is organised

`.memory/` holds things worth keeping track of that **have not yet been decided on** -- where they belong, or whether they matter enough to become part of the package. It is a staging area, not an archive.

**Folders are topics.** A folder name says what the thinking inside it is about, so someone can follow a line of thought, or come back to something discovered earlier and decide it has earned a permanent home. Promotion out of `.memory/` into the package is the expected end state for anything that proves important; most items will never get there, and that is fine.

```
.memory/
  <topic>.md              a single note -- a topic that has not needed more than one file yet
  <topic>/                a topic with more than one file
    <kind>_<short_description>.md
```

- **A topic gets a folder once it has a second file.** One file does not need one; a folder per file is noise, and noise is what makes a staging area stop being read.
- **Filenames carry a kind prefix** -- `proposal_`, `adw_` -- even inside a folder that already implies it. The redundancy is deliberate: these files are meant to be **promoted out**, and a name that survives the move is worth a repeated word.
- **Everything here is plain `.md`.** The folder is ignored twice over -- by the root `.gitignore` and by `.memory/.gitignore` -- so the `*.memory.md` suffix adds nothing inside it.

## Current topics

| Path | Thinking about |
|---|---|
| `tool_purpose.md` | What this package is for, and the boundary it must not cross |
| `sdlc_plugin.md` | The de-facto delivery workflow that generated workflows compose around |
| `adws/` | Where ADWs are today versus where they are going |
| `proposals/` | Proposed changes to this package, each promotable to a spec |
| `package_cleanup.md` | The in-progress cleanup -- what is settled, what is still open |

## Writing notes

One topic per file. Keep them short and current -- **correct a stale fact in place** rather than appending a correction beneath it, and delete a file whose topic is resolved. These are notes to act on, not a log.

What belongs: facts about the target environment that would otherwise be rediscovered -- its de-facto tooling, known limits of the current approach, gaps between where things are and where they are going. What does not: task status, run state, or anything that belongs in this package's tracked documentation.

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
