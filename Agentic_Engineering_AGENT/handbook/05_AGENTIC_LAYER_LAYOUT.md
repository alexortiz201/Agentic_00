# 🏗️ Agentic layer layout

Where the primitives go in a target project. [`foundations/Agentic_Engineering/primitives/`](../foundations/Agentic_Engineering/primitives/README.md) says what each must contain; this says where we put them. A project that already has a convention keeps it -- **record the mapping instead of imposing this one.**

## Start here

The first three directories. Do not generate more than this until something forces it -- [`foundations/Agentic_Engineering/06`](../foundations/Agentic_Engineering/06_ADW_COMPOSITION.md) has the table of what forces what.

```
.claude/commands/    named, reusable prompts
specs/               the detail a task needs
adws/                code that runs them in order
```

## The full layout, once grown into

```
.claude/
  commands/          one command per file, named for what it does
  hooks/             one file per lifecycle event, named for the event
  settings.json      which hooks are registered
adws/
  adw_<phases>.ts    a composition; the filename IS the sequence
  adw_<phase>.ts     a single phase
  adw_modules/       shared code -- adapters to foreign boundaries
  adw_triggers/      how runs start without a person
  adw_data/          durable storage for facts that outlive one run
specs/               machine-generated, one per task, short-lived
ai_docs/             pinned external references + their manifest
design/              durable design documents
runs/<run_id>/     per-run artifacts: state record, logs, prompts, raw agent output
trees/<run_id>/      isolated workspaces, one per run
```

The last two are **generated, not authored** -- and both belong in the ignore file. A run's artifacts are evidence; a workspace is disposable.

**The application lives elsewhere.** Whatever directory holds the product is the application layer and is not part of this. An agentic layer that cannot be deleted without taking the product with it has been built in the wrong place.

## This is one way, not the way

A target project may organise differently and still be correct. The criterion is not the directory names -- it is whether the layout produces an environment where:

- engineering patterns are **templated and reusable**
- agents have **clear instructions** for operating the codebase
- workflows are **composable**
- output is **observable and debuggable**

A layout that delivers those four is a good layout. Record whichever one the target uses.

## Naming

- **A composition's filename is its phase sequence**, in execution order: `adw_plan_build_test.ts`. Reading the directory tells you what workflows exist without opening anything.
- **A spec is `<task-type>-<run_id>-<description>.md`.** All three parts, because specs are found by pattern as often as by path.
- **A command is named for its single responsibility.** If the name needs "and", split it.

## What is ours

| | |
|---|---|
| Language | **TypeScript, run with `bun`** |
| Isolation | a worktree per run |
| Reserved resources | derived from the run id, written into the workspace as a file the agent reads |
| State | outside the worktree, so it survives the workspace being deleted |

The port-contract-in-a-file detail is worth keeping deliberately: the contract lives where the work happens, so anything operating in that workspace picks it up without being told.

## Where ADWs live for a given project

**This package generates ADWs; it does not hold them.** The output goes to the target project's own agentic layer. Record the target and its layout in `.memory/` when it differs from the above.
