# 📖 Agentic Engineering Agent

A self-contained package for bounded, observable, and repairable software delivery.

## Read these first, in this order

Five files. Together they are what "understanding this tool" means; everything else is loaded because a task asked for it.

1. 📜 [`AGENTS.md`](AGENTS.md) -- the operating contract. What you may do, what needs asking, and what is never granted.
2. 🔤 [`LANGUAGE.md`](LANGUAGE.md) -- the canonical vocabulary. **Read it in full, before anything that uses it.** Every other file in this package writes these terms exactly as spelled here and **does not link back to explain them**, because by the time they are read the vocabulary is already in context. Most apparent contradictions between two documents turn out to be two spellings of one idea rather than two ideas.
3. 🏛️ [`foundations/README.md`](foundations/README.md) -- the four areas of the discipline, and the rule that keeps it portable.
4. 📐 [`foundations/Software_Engineering/01_SDLC_SOFTWARE_DEVELOPMENT_LIFECYCLE.md`](foundations/Software_Engineering/01_SDLC_SOFTWARE_DEVELOPMENT_LIFECYCLE.md) -- **the practice underneath.** What the lifecycle is, the three actors and what each is good for, and why "loop engineering" is the wrong name for any of it. Agentic engineering is a superset of engineering; read this before assuming any of it is new.
5. 🧭 [`foundations/Agentic_Engineering/01_PRINCIPLES.md`](foundations/Agentic_Engineering/01_PRINCIPLES.md) -- the two layers, the twelve leverage points, the evidence hierarchy, and how to decide.

## Then load what the task needs

Loading everything contradicts this package's own rule about context, so the rest is on demand. Read the row that matches what you are about to do.

| Read | When you are about to |
|---|---|
| 📓 [`handbook/README.md`](handbook/README.md) | **Do a piece of work.** A bug ticket, a feature, a workflow to build -- start here and it routes you into the discipline |
| 🏗️ [`foundations/Software_Engineering/`](foundations/Software_Engineering/README.md) | Ask whether something is engineering practice rather than an agentic concern |
| 🚀 [`foundations/DevOps/`](foundations/DevOps/README.md) | Sandbox an agent, touch an environment, handle credentials, or ship |
| 🔌 [`foundations/Harness_Engineering/`](foundations/Harness_Engineering/README.md) | Decide what a workflow may assume of its harness, or make one run on two |
| 🔀 [`harnesses/`](harnesses/README.md) | Answer what a *specific* harness does, compare the two, or port a flow between them |
| 🎓 [`foundations/Coaching/`](foundations/Coaching/README.md) | Teach this work, or run in `coaching` mode |
| 🔄 [`foundations/Agentic_Engineering/02_WORKFLOW.md`](foundations/Agentic_Engineering/02_WORKFLOW.md) | Run a task through its lifecycle -- states, gates, repair routing |
| 🔐 [`foundations/Agentic_Engineering/03_AUTHORITY_AND_SAFETY.md`](foundations/Agentic_Engineering/03_AUTHORITY_AND_SAFETY.md) | Discover within scope, bound what an agent can reach, or do anything needing approval |
| ⚖️ [`foundations/Software_Engineering/02_TESTING_AND_EVIDENCE.md`](foundations/Software_Engineering/02_TESTING_AND_EVIDENCE.md) | Choose checks, record evidence, or judge whether a failure is real |
| 🔎 [`foundations/Software_Engineering/03_CODE_REVIEW.md`](foundations/Software_Engineering/03_CODE_REVIEW.md) | Review a change, or decide what a finding obliges |
| 🔬 [`foundations/Agentic_Engineering/04_VERIFICATION.md`](foundations/Agentic_Engineering/04_VERIFICATION.md) | Judge whether an agent's claim of a check is a check |
| 🛟 [`foundations/Agentic_Engineering/05_RECOVERY_AND_HANDOFF.md`](foundations/Agentic_Engineering/05_RECOVERY_AND_HANDOFF.md) | Repair, roll back, or report a result |
| 🧩 [`foundations/Agentic_Engineering/06_ADW_COMPOSITION.md`](foundations/Agentic_Engineering/06_ADW_COMPOSITION.md) | Design or size a workflow |
| 🏭 [`foundations/Agentic_Engineering/10_THE_SOFTWARE_FACTORY.md`](foundations/Agentic_Engineering/10_THE_SOFTWARE_FACTORY.md) | Ask what a factory is, what it is for, or whether one is worth building yet |
| 🛡️ [`foundations/Agentic_Engineering/08_GATES.md`](foundations/Agentic_Engineering/08_GATES.md) | Assign a gate ID, or decide what a gate must validate before it may pass |
| 🎛️ [`foundations/Agentic_Engineering/09_CONTROL_PLANE_TESTS.md`](foundations/Agentic_Engineering/09_CONTROL_PLANE_TESTS.md) | Prove a composition survives failure before letting it run unattended |
| 🎓 [`foundations/Agentic_Engineering/07_COACHING.md`](foundations/Agentic_Engineering/07_COACHING.md) | Work in `coaching` mode -- and only then |
| 🧱 [`foundations/Agentic_Engineering/primitives/`](foundations/Agentic_Engineering/primitives/README.md) | Create a primitive. Load the one you need, not all twelve |
| 🛠️ [`handbook/06_BUILDING_AN_ADW.md`](handbook/06_BUILDING_AN_ADW.md) | Build a workflow end to end |
| 🧪 [`handbook/07_VALIDATING_A_WORKFLOW.md`](handbook/07_VALIDATING_A_WORKFLOW.md) | Check a workflow does what it claims, before trusting it |
| 📋 [`handbook/08_GATE_ENFORCEMENT_CENSUS.md`](handbook/08_GATE_ENFORCEMENT_CENSUS.md) | Count what actually holds each gate shut, and watch the ratio move |
| 🏗️ [`handbook/05_AGENTIC_LAYER_LAYOUT.md`](handbook/05_AGENTIC_LAYER_LAYOUT.md) | Decide where something goes in a target project |
| 🗺️ [`handbook/04_ARTIFACT_MAP.md`](handbook/04_ARTIFACT_MAP.md) | Find which file here defines a concept the discipline names |
| 🗂️ [`handbook/02_RUN_ARTIFACTS.md`](handbook/02_RUN_ARTIFACTS.md) | Write anything into `runs/<run_id>/` |
| 🩺 [`handbook/03_STRUCTURAL_CHECK.md`](handbook/03_STRUCTURAL_CHECK.md) | Confirm a move or rename did not break the package |

This package **describes** how workflows are constructed and where they go. **It does not hold them, scaffold them, or execute them** -- that was decided explicitly, not by omission, and it has no runtime and should not grow one. A workflow built for an organization lives in that organization's own library; what this package contributes is the discipline it was built against. The one thing here that executes is its own [structural check](handbook/03_STRUCTURAL_CHECK.md).

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
| 🤖 [`foundations/Agentic_Engineering/`](foundations/Agentic_Engineering/README.md) | What changes when agents and code perform the phases -- principles, lifecycle, authority, verification, recovery, composition, gates | A lesson proves true **anywhere**, not just here |
| 📓 [`handbook/`](handbook/README.md) | What to **do** -- start here with a ticket in hand; it routes into the discipline | A procedure changes |
| 🔀 [`harnesses/`](harnesses/README.md) | What each harness actually does, against the capability surface | Those products change, which is often |
| `.memory/` `.profile/` `.workgroup/` | Local folders, never committed. See **Local folders** below | Freely |

**`foundations/` is standalone by rule.** It names no company, repository, tracker, model or harness, and it reaches nothing outside itself -- including the vocabulary, which is why `LANGUAGE.md` is read up front rather than pointed at from the place a term is used. Its areas may reference each other, and that is the point: the agentic side names the engineering practice it rests on instead of quietly reinventing it. A statement that can only be justified by one organization's tooling belongs in that organization's docs. A worked example from real delivery is welcome; the rule it illustrates has to generalize.

A half-applied rename is worse than the original name, because it fails silently at the consuming phase rather than erroring where the mistake was made.

## Local folders

Three folders, none committed, each managing a circumstance the committed package deliberately does not describe. Create any of them if it is absent; no permission is needed.

| | Holds | Lives as long as |
|---|---|---|
| `.memory/` | What is worth carrying to the **next** session -- notes, proposals, the cold-start picture, and `todo_list.md` for the run in progress | Until it is acted on or goes stale |
| `.profile/` | **Who is operating this package** -- their preferences, and where they are going | As long as that person does |
| `.workgroup/` | A folder per [`workgroup`](LANGUAGE.md) this discipline is applied to, plus scratch for the run in progress | The workgroup, and the run |

The line between `.memory/` and `.workgroup/` is subject. `.memory/` is about **this package**; a folder in `.workgroup/` is about **something else this package is being applied to**. Loose scratch at the root of `.workgroup/` belongs to neither and is cleared when the run ends.

**`.profile/` is what lets `foundations/` stay standalone.** The discipline describes work done by anyone; everything true of one particular person goes there instead. A preference that leaked into doctrine would make the doctrine unportable, and that is the failure the folder exists to prevent.

Conventions for `.memory/`: [`handbook/01_LOCAL_MEMORY.md`](handbook/01_LOCAL_MEMORY.md).

## Purpose

This agent helps an engineer deliver bounded software changes by combining:

- human intent and acceptance;
- deterministic orchestration and state management;
- constrained agent calls for reasoning and implementation;
- explicit verification, review, repair, and evidence.

The agent operates primarily at the **agentic layer**: it helps compose ADWs and create the prompts, commands, skills, types, gates and adapters those workflows actually need. Improve context, state and feedback before adding platform architecture. A one-off task may need only a bounded prompt and checks.

## Boundaries

This package does not grant shell, network, remote-service, database, publication, or deployment authority. Prompt restrictions are not security boundaries.

Controls are marked `code-enforced`, `human-approved` or `agent-checked`, defined in [`LANGUAGE.md`](LANGUAGE.md). Assume `agent-checked` unless a deterministic mechanism has been tested.

## Minimal use

This is a bootable instruction package for a specialized agent, not an executable orchestrator. The host supplies the model, tools, permissions, and any tested runtime gates. Without those gates, workflow checks are agent-checked. The only bundled executable is the structural check, which validates this package's own links and nothing about a workflow's behavior; no sandbox, runtime validator, or automation is included.

1. Spawn an agent with this instruction: "Read this package's AGENTS.md and complete its README.md boot sequence before acting. Report the loaded files, missing capabilities, and proposed authority envelope; then await the task." Supply the actual package location to the host. Merely placing the folder does not load it.
2. Provide the target, task, and read-only discovery scope. Target-project files are task inputs, not prerequisites for understanding this package.
3. Authorize creation of `runs/<run_id>/` inside this folder; see [run artifacts](handbook/02_RUN_ARTIFACTS.md).
4. Complete the brief and discover within scope. Approve a plan for non-trivial work; a tiny low-risk edit needs explicit task scope but no separate plan. Read-only answers need no implementation artifacts.
5. Use a branch/worktree for non-trivial or parallel work. Tiny edits may use the current branch if authorized and unrelated work is preserved.
6. Require complete evidence and a handoff, including failures and human waivers.
7. Accept, reject, or request repair. **Acceptance is not shipping authority** -- shipping is a separate, explicitly named decision.
