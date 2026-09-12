# Runbook

## Start and discover

- [ ] Declare and record the engagement mode (`delivery` / `coaching` / `audit` / `design`) and the entry operating level `L1`-`L5`.
- [ ] Find repository boundaries; read local instructions and manifests.
- [ ] Inspect `git status --short --branch`; preserve unrelated work.
- [ ] After artifact-write approval, set up `runs/<run_id>/` per [run artifacts](handbook/02_RUN_ARTIFACTS.md); complete the brief and initialize state.
- [ ] Trace relevant behavior, tests, scripts, data, and external services.
- [ ] Inspect scripts before execution; check environment names without printing secrets.
- [ ] Separate configured, active, and `UNVERIFIED` tooling.
- [ ] For ADW/primitive work, load the [the construction process](handbook/06_BUILDING_AN_ADW.md); reuse existing primitives and persist the phase/gate design before building.

## Plan and implement

- [ ] For non-trivial work, map each criterion to a change and verification method using a plan that maps each criterion to a change and a check; tiny edits need explicit scope only.
- [ ] Define scope, authority, risks, stop conditions, rollback, and a per-kind retry budget (`invocation_retry`, `output_correction`, `gate_repair`, `test_fix`, `review_revision`, `restart`) under one `total_budget`.
- [ ] When choosing among design alternatives, run the salvage pass: classify each rejected design's mechanisms `promote` / `defer` / `drop` with a reason before contracting the chosen one.
- [ ] Obtain required approval.
- [ ] Use a branch/worktree for non-trivial or parallel work.
- [ ] Make small coherent edits; add tests; record deviations and state transitions.
- [ ] Stop on scope drift or new consequential risk.

## Verify and hand off

- [ ] Inspect status, `git diff --check`, and the complete diff. Confirm the working directory is the one under test and the changed-file count is non-zero before running any gate over it.
- [ ] Run focused checks. If the change is visible in a running product, take one bounded walk through the affected surface before starting the full suite; record it as evidence with `source: executed` whether or not it found anything.
- [ ] Run required regression/build/E2E checks.
- [ ] Do not run a full suite concurrently with browser automation, a build, or another suite. Contention produces timeout-shaped failures that are indistinguishable from real ones in the record.
- [ ] Record system load alongside any timeout-shaped failure, at the time of the failure. A load measurement taken after the machine is quiet is not evidence about the run that failed.
- [ ] Re-evaluate a suspected environment failure only by re-running the named failing scope in isolation on a quiescent machine, retaining both runs. Set `environment_suspected` only with a corroborating indicator; never re-run the same scope until it passes.
- [ ] Compare expected versus actual checks; record exact results (`passed` / `failed` / `not_run` / `error`), applicability, `source`, durations, revision, diff base, changed-file count and diff identity.
- [ ] For new ADWs, test malformed output, missing/stale artifacts, failed gates, gates run from the wrong workspace, state corruption, leaked resources, denied actions, interruption and duplicate pickup before a supervised walkthrough.
- [ ] Perform a separate review; record each finding's `disposition` and `severity`; repair every `blocker` and re-test, or obtain explicit human waivers with evidence and consequences.
- [ ] Route each repair to the state named in `return_to` -- the state responsible for the failure -- not unconditionally back to verification.
- [ ] Update documentation invalidated by the change, or state explicitly that there is none.
- [ ] Complete the run's handoff, retaining failed results and explicit human waivers, and reporting operating-level movement and safe work remaining if blocked.
- [ ] Ask for acceptance; do not push, merge, or deploy without a separate authorization to `authorized_handoff`.

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
