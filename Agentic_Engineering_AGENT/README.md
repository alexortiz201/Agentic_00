# Agentic Engineering Agent

A self-contained package for bounded, observable, and repairable software delivery.

## Boot order

1. [`AGENTS.md`](AGENTS.md) — the operating contract. What you may do, and what needs asking.
2. [`foundations/README.md`](foundations/README.md) — what Agentic Engineering is, and the rule that
   keeps this folder portable.
3. [`foundations/LANGUAGE.md`](foundations/LANGUAGE.md) — canonical vocabulary. **Read before the
   rest**; most apparent contradictions turn out to be two spellings of one idea.
4. [`foundations/01_PRINCIPLES.md`](foundations/01_PRINCIPLES.md) — the two layers, the leverage
   points, evidence, and how to decide.
5. [`foundations/02_WORKFLOW.md`](foundations/02_WORKFLOW.md) — lifecycle, states, gates.
6. [`foundations/03_AUTHORITY_AND_SAFETY.md`](foundations/03_AUTHORITY_AND_SAFETY.md) — capability,
   credentials, isolation, what is never granted.
7. [`foundations/04_VERIFICATION.md`](foundations/04_VERIFICATION.md) — what counts as evidence.
8. [`foundations/05_RECOVERY_AND_HANDOFF.md`](foundations/05_RECOVERY_AND_HANDOFF.md) — repair,
   rollback, reporting truthfully.
9. [`foundations/06_ADW_COMPOSITION.md`](foundations/06_ADW_COMPOSITION.md) — how workflows are built
   and sized.
10. [`foundations/07_COACHING.md`](foundations/07_COACHING.md) — only in coaching mode.
11. [`foundations/primitives/`](foundations/primitives/README.md) — **what each primitive must contain
    when you create one.** Load the one you need, not all of them.
12. [`RUNBOOK.md`](RUNBOOK.md) — the execution checklist for a task.

Load 1–4 always. Beyond that, load what the task needs — loading everything contradicts this
package's own rule about context.

## Starting a session cold

If [`.memory/`](handbook/01_LOCAL_MEMORY.md) exists, **read `.memory/package_cleanup.md` first.** It
records what is settled, what is still open, and what was deliberately deferred — which is the fastest
way to avoid re-deciding something already decided.

Then the rest of `.memory/`: the `.md` files at its root, then its topic folders. It is never
committed, so a clone will not have it. Treat everything there as a **prior snapshot to verify against
current sources**, never as authority.

Run artifacts are described in [`handbook/02_RUN_ARTIFACTS.md`](handbook/02_RUN_ARTIFACTS.md).

## Task routing

| Need | Load next |
|---|---|
| Understand what a primitive is / what one must contain | [`foundations/primitives/`](foundations/primitives/README.md) |
| Build a workflow end to end | [`handbook/06_BUILDING_AN_ADW.md`](handbook/06_BUILDING_AN_ADW.md) |
| Know where things go in a target project | [`handbook/05_AGENTIC_LAYER_LAYOUT.md`](handbook/05_AGENTIC_LAYER_LAYOUT.md) |
| Settle a term | [`foundations/LANGUAGE.md`](foundations/LANGUAGE.md) |
| Check the package is not structurally broken | [`handbook/03_STRUCTURAL_CHECK.md`](handbook/03_STRUCTURAL_CHECK.md) |

This package **describes** how workflows are constructed and where they go. It does not ship
workflows, generate code, or execute anything. Generated output belongs to the target project.

## Layout

The package separates the **discipline** from the **toolkit** that applies it, because the two change
at different rates and for different reasons.

| | Holds | Changes when |
|---|---|---|
| [`foundations/`](foundations/README.md) | What Agentic Engineering *is* — vocabulary, principles, lifecycle, authority, verification, recovery, composition | A lesson proves true **anywhere**, not just here |
| `commands/`, `prompts/`, `skills/`, `templates/`, `hooks/` | The toolkit — recipes, prompt bodies, record shapes, contracts | A practice or artifact shape improves |
| [`handbook/`](handbook/README.md) | How this package is operated — conventions, naming, what may be created | A convention changes |
| `.memory/` | Local notes and staged artifacts. Never committed | Freely; see [`handbook/01_LOCAL_MEMORY.md`](handbook/01_LOCAL_MEMORY.md) |

**`foundations/` is standalone by rule.** It names no company, repository, tracker, model or harness.
A statement that can only be justified by one organization's tooling belongs in that organization's
docs. A worked example from real delivery is welcome; the rule it illustrates has to generalize.

Changes to vocabulary land in [`foundations/LANGUAGE.md`](foundations/LANGUAGE.md) **and** everywhere
that reads or writes the term, in the same change. A half-applied rename fails silently at the
consuming phase, which is worse than the original name.

## Local memory

Working notes and staged artifacts live in a never-committed `.memory/` folder. Conventions:
[`handbook/01_LOCAL_MEMORY.md`](handbook/01_LOCAL_MEMORY.md).

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

- **code-enforced** — a deterministic mechanism actually prevents or gates an action;
- **human-approved** — a human must authorize the action;
- **agent-checked** — the agent is instructed to inspect or reason, but no hard boundary exists.

## Minimal use

This is a bootable instruction package for a specialized agent, not an executable orchestrator. The host supplies the model, tools, permissions, and any tested runtime gates. Without those gates, workflow checks are agent-checked; no validator, sandbox, or automation is bundled.

1. Spawn an agent with this instruction: “Read this package's AGENTS.md and complete its README.md boot sequence before acting. Report the loaded files, missing capabilities, and proposed authority envelope; then await the task.” Supply the actual package location to the host. Merely placing the folder does not load it.
2. Provide the target, task, and read-only discovery scope. Target-project files are task inputs, not prerequisites for understanding this package.
3. Authorize creation of `runs/<run_id>/` inside this folder; see [run artifacts](handbook/02_RUN_ARTIFACTS.md).
4. Complete the brief and discover within scope. Approve a plan for non-trivial work; a tiny low-risk edit needs explicit task scope but no separate plan. Read-only answers need no implementation artifacts.
5. Use a branch/worktree for non-trivial or parallel work. Tiny edits may use the current branch if authorized and unrelated work is preserved.
6. Require complete evidence and a handoff, including failures and human waivers.
7. Accept, reject, or request repair. Approval of delivery does not independently authorize push, merge, deployment, or destructive operations.
