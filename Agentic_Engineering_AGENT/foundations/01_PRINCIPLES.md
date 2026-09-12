# Principles

## Operating model

**Agentic Engineering = engineer judgment + deterministic orchestration + bounded agent reasoning + evidence.**

The goal is not maximum autonomy. Make work explicit, observable, composable, and repairable.

- **Engineer:** owns intent, authority, trade-offs, and acceptance.
- **Code:** owns schemas, state, transitions, gates, timeouts, retries, and artifacts.
- **Agent:** explores, plans, implements, reviews, and repairs within declared bounds.
- **Evidence:** determines confidence.

## The two layers

**The agentic layer wraps the application layer and gives it a programmatic interface.** The
application is the product and the validation ground. The agentic layer is how work gets done to it.

The move this discipline asks for: **template your engineering and teach agents to operate the
codebase, rather than operating it yourself each time.** A fix applied by hand solves one instance. The
same fix encoded as a workflow solves the class — and can then be inspected, gated and improved.

That is also the test of where something belongs. **If deleting the agentic layer would take the
product with it, it was built in the wrong place.**

## The twelve leverage points

A diagnostic checklist, not twelve services to build.

**In the agent — the Core Four**, chosen per invocation: context · model · prompt · tools.

**Through the agent**, built around it and reused across runs: standard output · types · docs · tests ·
architecture · plans · templates · workflows.

When a run disappoints, walk the list before reaching for a stronger model. Most failures are a
context, contract or check problem, and **a stronger model cannot supply a check that does not exist.**

## Improve the agentic layer first

Before adding infrastructure, improve context, task specificity, tool interfaces, state, feedback, and observability. Progress from focused prompt/skill → bounded role → ADW → composition only when the work warrants it. A repeated correction is a reuse signal, not a mandate for a platform. Prove a second use before claiming generality.

Move down into code/data/product details when understanding or evidence is weak; return to delegation when concrete checks support it. More autonomy never expands authority.

## Priming is selection, not ingestion

Loading everything contradicts loading only what is relevant, and stops working at the first repository
too large to hold.

**Stop when you can name the task's entry points, its conventions and its unknowns** — not when you
have read everything. Then **say what you did not read**, so the next actor knows where the gaps are
rather than inheriting false coverage.

## Context by role

Give each role only what it needs:

| Role | Context |
|---|---|
| Explorer | Task, repository instructions, read-only tools |
| Planner | Constraints, relevant code/tests, acceptance criteria |
| Implementer | Approved plan, scope, conventions, allowed tools |
| Verifier | Criteria, diff, check commands—not confidence claims |
| Reviewer | Task, plan, diff, evidence, risk checklist |
| Repairer | Concrete failures/findings and bounded scope |

Store stable knowledge in versioned files and run-specific facts in task state. Prime context by task; give each agent one purpose and compact artifact handoffs rather than whole transcripts. Load tools/MCP only when needed. Context bundles are validated indexes, not exact memory.

Each invocation resolves context, model/provider, prompt and tools (Core Four), plus workspace, output contract, permissions and limits. Record effective configuration. Select models by observed capability, privacy, cost and latency—not fixed rankings. Diagnose intent/context/tools/contracts/gates/state before upgrading a model.

## Deterministic shell, probabilistic core

Use code to validate inputs, track state, invoke tools, capture results, enforce gates, and bound retries. Use agents where interpretation and judgment are needed. Do not rely on conversational memory for workflow state.

## Bounded autonomy

Bound work by paths, tools, network targets, time, cost, retries, branch/worktree, stop conditions, and approvals. Parallelize only independent tasks with explicit ownership and isolation.

## Evidence hierarchy

1. Enforced gate with retained output.
2. Independently reproduced command result.
3. Inspected code/diff tied to an acceptance criterion.
4. Previous artifact or commit.
5. Documentation claim.
6. Agent assertion.

Never promote a weaker claim into a stronger one.

## Control labels

- **code-enforced:** a deterministic mechanism prevents or fails an action.
- **human-approved:** execution waits for explicit authorization.
- **agent-checked:** an instruction requests inspection but is not a hard boundary.

Prompts, allowlists, branch names, and logging hooks are not isolation unless an external mechanism enforces them.

## Repair, do not perform success

Use `plan → implement → verify → review → repair → re-verify → human accept`. Human waivers may unblock delivery but never change a failed result into a pass. Measure accepted outcomes, total attempts/cost/time, human interventions and escaped defects; unknown measurements remain unknown.
