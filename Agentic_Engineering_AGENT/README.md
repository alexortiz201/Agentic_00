# 📖 Agentic Engineering Agent

A self-contained package for bounded, observable, and repairable software delivery.

## Read these first, in this order

Five files. Together they are what "understanding this tool" means; everything else is loaded because a task asked for it.

1. 📜 [`AGENTS.md`](AGENTS.md) -- the operating contract. What you may do, what needs asking, and what is never granted.
2. 🔤 [`LANGUAGE.md`](LANGUAGE.md) -- the canonical vocabulary. **Read it in full, before anything that uses it.** Every other file in this package writes these terms exactly as spelled here and **does not link back to explain them**, because by the time they are read the vocabulary is already in context. Most apparent contradictions between two documents turn out to be two spellings of one idea rather than two ideas.
3. 🏛️ [`foundations/README.md`](foundations/README.md) -- the two areas of the discipline, and the rule that keeps it portable.
4. 📐 [`foundations/Software_Engineering/01_SDLC_SOFTWARE_DEVELOPMENT_LIFECYCLE.md`](foundations/Software_Engineering/01_SDLC_SOFTWARE_DEVELOPMENT_LIFECYCLE.md) -- **the practice underneath.** What the lifecycle is, the three actors and what each is good for, and why "loop engineering" is the wrong name for any of it. Agentic engineering is a superset of engineering; read this before assuming any of it is new.
5. 🧭 [`foundations/Agentic_Engineering/01_PRINCIPLES.md`](foundations/Agentic_Engineering/01_PRINCIPLES.md) -- the two layers, the twelve leverage points, the evidence hierarchy, and how to decide.

## Then load what the task needs

Loading everything contradicts this package's own rule about context, so the rest is on demand. Read the row that matches what you are about to do.

| Read | When you are about to |
|---|---|
| 🏗️ [`foundations/Software_Engineering/`](foundations/Software_Engineering/README.md) | Ask whether something is engineering practice rather than an agentic concern |
| 🚀 [`foundations/DevOps/`](foundations/DevOps/README.md) | Sandbox an agent, touch an environment, handle credentials, or ship |
| 🎓 [`foundations/Coaching/`](foundations/Coaching/README.md) | Teach this work, or run in `coaching` mode |
| 🔄 [`foundations/Agentic_Engineering/02_WORKFLOW.md`](foundations/Agentic_Engineering/02_WORKFLOW.md) | Run a task through its lifecycle -- states, gates, repair routing |
| 🔐 [`foundations/Agentic_Engineering/03_AUTHORITY_AND_SAFETY.md`](foundations/Agentic_Engineering/03_AUTHORITY_AND_SAFETY.md) | Discover, touch credentials, isolate work, or do anything needing approval |
| 🔬 [`foundations/Agentic_Engineering/04_VERIFICATION.md`](foundations/Agentic_Engineering/04_VERIFICATION.md) | Check something, record evidence, or judge whether a failure is real |
| 🛟 [`foundations/Agentic_Engineering/05_RECOVERY_AND_HANDOFF.md`](foundations/Agentic_Engineering/05_RECOVERY_AND_HANDOFF.md) | Repair, roll back, or report a result |
| 🧩 [`foundations/Agentic_Engineering/06_ADW_COMPOSITION.md`](foundations/Agentic_Engineering/06_ADW_COMPOSITION.md) | Design or size a workflow |
| 🎓 [`foundations/Agentic_Engineering/07_COACHING.md`](foundations/Agentic_Engineering/07_COACHING.md) | Work in `coaching` mode -- and only then |
| 🧱 [`foundations/Agentic_Engineering/primitives/`](foundations/Agentic_Engineering/primitives/README.md) | Create a primitive. Load the one you need, not all twelve |
| 🛠️ [`handbook/06_BUILDING_AN_ADW.md`](handbook/06_BUILDING_AN_ADW.md) | Build a workflow end to end |
| 🧪 [`handbook/07_VALIDATING_A_WORKFLOW.md`](handbook/07_VALIDATING_A_WORKFLOW.md) | Check a workflow does what it claims, before trusting it |
| 🏗️ [`handbook/05_AGENTIC_LAYER_LAYOUT.md`](handbook/05_AGENTIC_LAYER_LAYOUT.md) | Decide where something goes in a target project |
| 🗺️ [`handbook/04_ARTIFACT_MAP.md`](handbook/04_ARTIFACT_MAP.md) | Find which file here defines a concept the discipline names |
| 🗂️ [`handbook/02_RUN_ARTIFACTS.md`](handbook/02_RUN_ARTIFACTS.md) | Write anything into `runs/<run_id>/` |
| 🩺 [`handbook/03_STRUCTURAL_CHECK.md`](handbook/03_STRUCTURAL_CHECK.md) | Confirm a move or rename did not break the package |

This package **describes** how workflows are constructed and where they go, and it generates them into a target project -- it does not hold them. It ships no workflows of its own and no application code. The one thing it does execute is its own [structural check](handbook/03_STRUCTURAL_CHECK.md). Generated output belongs to the target project.

## Starting a session cold

If [`.memory/`](handbook/01_LOCAL_MEMORY.md) exists, **read `.memory/package_cleanup.md` first.** It records what is settled, what is still open, and what was deliberately deferred -- which is the fastest way to avoid re-deciding something already decided.

Then the rest of `.memory/`: the `.md` files at its root, then its topic folders. It is never committed, so a clone will not have it. Treat everything there as a **prior snapshot to verify against current sources**, never as authority.

## Layout

The package separates the vocabulary, the discipline, and the conventions for operating it, because the three change at different rates and for different reasons.

| | Holds | Changes when |
|---|---|---|
| 🔤 [`LANGUAGE.md`](LANGUAGE.md) | The canonical vocabulary every other file writes to | A term is renamed -- here **and** everywhere that reads or writes it, in the same change |
| 🏗️ [`foundations/Software_Engineering/`](foundations/Software_Engineering/README.md) | Proper engineering -- the practice agentic work rests on and does not replace | A statement would have been true before agents existed |
| 🚀 [`foundations/DevOps/`](foundations/DevOps/README.md) | The environment the code runs in and the path it takes to get there | Isolation, credentials, release or rollback practice changes |
| 🤖 [`foundations/Agentic_Engineering/`](foundations/Agentic_Engineering/README.md) | What changes when agents and code perform the phases -- principles, lifecycle, authority, verification, recovery, composition | A lesson proves true **anywhere**, not just here |
| 📓 [`handbook/`](handbook/README.md) | How this package is operated -- conventions, naming, what may be created | A convention changes |
| `.memory/` | Local notes and staged artifacts. Never committed | Freely; see [`handbook/01_LOCAL_MEMORY.md`](handbook/01_LOCAL_MEMORY.md) |

**`foundations/` is standalone by rule.** It names no company, repository, tracker, model or harness, and it reaches nothing outside itself -- including the vocabulary, which is why `LANGUAGE.md` is read up front rather than pointed at from the place a term is used. Its areas may reference each other, and that is the point: the agentic side names the engineering practice it rests on instead of quietly reinventing it. A statement that can only be justified by one organization's tooling belongs in that organization's docs. A worked example from real delivery is welcome; the rule it illustrates has to generalize.

A half-applied rename is worse than the original name, because it fails silently at the consuming phase rather than erroring where the mistake was made.

## Local memory

Working notes and staged artifacts live in a never-committed `.memory/` folder. Conventions: [`handbook/01_LOCAL_MEMORY.md`](handbook/01_LOCAL_MEMORY.md).

## Purpose

This agent helps an engineer deliver bounded software changes by combining:

- human intent and acceptance;
- deterministic orchestration and state management;
- constrained agent calls for reasoning and implementation;
- explicit verification, review, repair, and evidence.

The agent operates primarily at the **agentic layer**: it helps compose ADWs and create the prompts, commands, skills, types, gates and adapters those workflows actually need. Improve context, state and feedback before adding platform architecture. A one-off task may need only a bounded prompt and checks.

## Boundaries

This package does not grant shell, network, remote-service, database, publication, or deployment authority. Prompt restrictions are not security boundaries.

Controls are marked as:

- **code-enforced** -- a deterministic mechanism actually prevents or gates an action;
- **human-approved** -- a human must authorize the action;
- **agent-checked** -- the agent is instructed to inspect or reason, but no hard boundary exists.

## Minimal use

This is a bootable instruction package for a specialized agent, not an executable orchestrator. The host supplies the model, tools, permissions, and any tested runtime gates. Without those gates, workflow checks are agent-checked. The only bundled executable is the structural check, which validates this package's own links and nothing about a workflow's behavior; no sandbox, runtime validator, or automation is included.

1. Spawn an agent with this instruction: "Read this package's AGENTS.md and complete its README.md boot sequence before acting. Report the loaded files, missing capabilities, and proposed authority envelope; then await the task." Supply the actual package location to the host. Merely placing the folder does not load it.
2. Provide the target, task, and read-only discovery scope. Target-project files are task inputs, not prerequisites for understanding this package.
3. Authorize creation of `runs/<run_id>/` inside this folder; see [run artifacts](handbook/02_RUN_ARTIFACTS.md).
4. Complete the brief and discover within scope. Approve a plan for non-trivial work; a tiny low-risk edit needs explicit task scope but no separate plan. Read-only answers need no implementation artifacts.
5. Use a branch/worktree for non-trivial or parallel work. Tiny edits may use the current branch if authorized and unrelated work is preserved.
6. Require complete evidence and a handoff, including failures and human waivers.
7. Accept, reject, or request repair. Approval of delivery does not independently authorize push, merge, deployment, or destructive operations.
