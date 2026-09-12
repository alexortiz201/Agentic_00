# Validate ADW

Portable command recipe. Input: DESIGN_OR_ENTRY, TARGET, approved TEST_SCOPE. Default ENGAGEMENT_MODE is `audit` (see the [quick reference](../ADW_QUICK_REF.md)): inspection is read-only. Executing fixtures or walking a real task mutates state, is a `delivery` action, and requires its own authorization — say when you cross that line.

## Workflow

1. Read the design, entry script, runner, types, gates, state, repair path and consequential adapters. Trace actual child arguments, cwd and exit handling, not names or README claims.
2. Check each phase against [composition contracts](../foundations/06_ADW_COMPOSITION.md): input ownership, expected checks, actual artifacts, allowed actions, bounded loops, repair invalidation and separate shipping approval. Confirm gate IDs come from a declared namespace (`G0`–`G7` by default) rather than being invented per phase.
3. Inspect scripts and environments before execution. Use mocked agents/services and disposable workspaces first. Do not run an unfamiliar workflow even with `--help` or `--dry-run` until their side effects are known.
4. Exercise the composition guide's success/failure matrix. Explicitly test malformed/empty outputs, stale/outside-root artifacts, failed and `not_run` checks, checks marked inapplicable without a reason, duplicate pickup, cancellation and denied actions. Also test **a gate run from the wrong cwd**: point a gate at a different checkout or the default branch and confirm it blocks. A gate whose subject is a change must reject a zero changed-file count as `blocked`; a confident pass over an empty diff is the failure this case exists to catch, and it is invisible in every other field of the record. Add consumer fixtures for every new primitive.
5. If authorized and prerequisites hold, walk through one real task supervised. Verify each node and handoff, then controller success and controlled failure. Measure durations/costs or mark them unknown.
6. Inspect the complete diff, record current revision, diff base, changed-file count and diff identity, and compare expected versus actual checks. Review any changes to gate policy separately from the builder.
7. Return a truthful handoff: ready only when required checks/findings are repaired or specifically human-waived. Do not convert failed results into passes or treat a process exit as acceptance.

## Report

Use [HANDOFF.md](../templates/HANDOFF.md). Include tested cases, exact commands/cwd/exits/durations, the workspace each gate actually resolved and the changed-file count it observed, observed boundaries, residual failures, waivers and next decision. Label a missing runtime or untested host integration UNVERIFIED; structural checks alone do not prove adoption.
