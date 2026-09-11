# Validate ADW

Portable command recipe. Input: DESIGN_OR_ENTRY, TARGET, approved TEST_SCOPE. Inspection is read-only; execution/fixtures may mutate state and require authorization.

## Workflow

1. Read the design, entry script, runner, types, gates, state, repair path and consequential adapters. Trace actual child arguments, cwd and exit handling, not names or README claims.
2. Check each phase against [composition contracts](../06_ADW_COMPOSITION.md): input ownership, expected checks, actual artifacts, allowed actions, bounded loops, repair invalidation and separate shipping approval.
3. Inspect scripts and environments before execution. Use mocked agents/services and disposable workspaces first. Do not run an unfamiliar workflow even with `--help` or `--dry-run` until their side effects are known.
4. Exercise the composition guide's success/failure matrix. Explicitly test malformed/empty outputs, stale/outside-root artifacts, failed/skipped checks, duplicate pickup, cancellation and denied actions. Add consumer fixtures for every new primitive.
5. If authorized and prerequisites hold, walk through one real task supervised. Verify each node and handoff, then controller success and controlled failure. Measure durations/costs or mark them unknown.
6. Inspect the complete diff, record current revision/diff identity and expected-versus-actual checks. Review any changes to gate policy separately from the builder.
7. Return a truthful handoff: ready only when required checks/findings are repaired or specifically human-waived. Do not convert failed results into passes or treat a process exit as acceptance.

## Report

Use [HANDOFF.md](../templates/HANDOFF.md). Include tested cases, exact commands/cwd/exits/durations, observed boundaries, residual failures, waivers and next decision. Label a missing runtime or untested host integration UNVERIFIED; structural checks alone do not prove adoption.
