# Runbook

## Start and discover

- [ ] Find repository boundaries; read local instructions and manifests.
- [ ] Inspect `git status --short --branch`; preserve unrelated work.
- [ ] After artifact-write approval, copy templates to `runs/<run_id>/`; complete the brief and initialize state without overwriting earlier runs.
- [ ] Trace relevant behavior, tests, scripts, data, and external services.
- [ ] Inspect scripts before execution; check environment names without printing secrets.
- [ ] Separate configured, active, and `UNVERIFIED` tooling.
- [ ] For ADW/primitive work, load the [authoring skill](skills/adw-authoring/SKILL.md); reuse existing primitives and persist the phase/gate design before building.

## Plan and implement

- [ ] For non-trivial work, map each criterion to a change and verification method using [`templates/PLAN.md`](templates/PLAN.md); tiny edits need explicit scope only.
- [ ] Define scope, authority, risks, stop conditions, retries, and rollback.
- [ ] Obtain required approval.
- [ ] Use a branch/worktree for non-trivial or parallel work.
- [ ] Make small coherent edits; add tests; record deviations and state transitions.
- [ ] Stop on scope drift or new consequential risk.

## Verify and hand off

- [ ] Inspect status, `git diff --check`, and the complete diff.
- [ ] Run focused checks, then required regression/build/E2E checks.
- [ ] Compare expected versus actual checks; record exact results, durations, skips and revision/diff identity.
- [ ] For new ADWs, test malformed output, missing/stale artifacts, failed gates, denied actions, interruption and duplicate pickup before a supervised walkthrough.
- [ ] Perform a separate review; repair material findings and re-test, or obtain explicit human waivers with evidence and consequences.
- [ ] Complete the run's handoff using [`templates/HANDOFF.md`](templates/HANDOFF.md), retaining failed results and explicit human waivers.
- [ ] Ask for acceptance; do not push, merge, or deploy without authority.

## Safe discovery patterns

Run only from the approved target repository root. Do not recursively search its parent; inspect ancestor instruction files only if separately authorized.

```bash
git status --short --branch
git diff --check
git diff --stat
git diff
git worktree list --porcelain

find . -name AGENTS.md -o -name CLAUDE.md -o -name package.json \
  -o -name pyproject.toml -o -name Cargo.toml -o -name go.mod
```

Before running package, migration, test, or shell commands, determine whether they install dependencies, write caches/databases, start services, invoke hooks, or access the network.
