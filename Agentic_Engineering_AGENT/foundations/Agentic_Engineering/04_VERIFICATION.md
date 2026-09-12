# 🔬 Verification

## Ladder

Run the highest applicable levels:

1. format, lint, typecheck, and config/schema validation;
2. focused unit tests;
3. integration and database/API tests;
4. production build/package;
5. controlled end-to-end tests;
6. security and broader regression checks;
7. human acceptance for outcomes automation cannot establish.

Discover actual commands from project instructions, manifests, scripts, and CI.

### Order by cost within strength

> **Order by cost within strength.** The ladder ranks checks by what they establish, not what they cost. Where a cheap observation can reject a build that an expensive one would also reject, run it first. In particular, a single bounded pass over the actual running product -- one walk, not a matrix -- belongs **before** the full regression suite. It is the cheapest check that can see integration and wiring faults, and those are exactly what levels 1-2 cannot see.
>
> This does not reorder the ladder's authority: a cheap observation never substitutes for a required check. It changes what you spend first.

Concretely: if the change is visible in a running product, walk the affected surface once before starting a full suite, and record the walk as an evidence item with `source: executed`. A unit suite is structurally blind to a prop threaded to the wrong consumer or a control that silently stopped rendering, so a green level 2 alongside an unobserved screen is not coverage of that class. Record the observation whether or not it found anything; "the screen was not opened" and "the screen was opened and looked right" are different evidence, and only one of them is recorded by silence.

## Evidence record

For each check capture:

| Field | Content |
|---|---|
| Criterion | Acceptance criterion or risk addressed |
| Command/directory | Exact command with secrets redacted; working directory |
| Result | `passed`, `failed`, `not_run`, or `error`; exit code |
| Applicability | `applicable: true` or `false` with a reason. A check excluded on purpose is `applicable: false`; a check that was prevented from running is `not_run`. Never encode either as a result |
| Provenance | `source`: `executed` (the command ran here), `inspected` (read the code or diff), `documented` (a document claims it), `asserted` (an agent says so). Matches evidence-hierarchy tiers 2, 3, 5 and 6 |
| Environment | `environment_suspected` (`true` / `false`), set only with the corroborating evidence below; recorded system load for any timeout-shaped failure |
| Duration | Measured value or `NOT MEASURED` |
| Scope | Behavior/components exercised |
| Artifact/caveat | Relevant non-sensitive output, mocks, missing service, or excluded cases |
| Identity/freshness | Run/phase/attempt, timestamp, checked revision, diff base, changed-file count and diff identity |
| Bounds | Timeout and expected check ID |

A check record that is `passed` with `source: asserted` is not a passed check; it is an assertion that a check passed. Gates read `source`: a required mechanical check satisfies its gate only with `source: executed`; a review gate accepts `inspected` for findings; `documented` and `asserted` never satisfy a required check, only inform one.

## Gate rules

- A gate decision is `pass`, `blocked`, or `human_waived` -- three values, and `human_waived` is never counted as `pass` anywhere a decision is aggregated or reported.
- A required failure blocks `acceptance_pending` until repaired or explicitly human-waived; later steps never erase its failed result. Record waiver evidence, approver, time, scope, and accepted consequences in task state and handoff.
- A check that did not run is `not_run`, and `not_run` on a required check blocks. There is no `skipped` status: "authorized exclusion" and "did not run" are different facts, and one status covering both is what lets a suite that never executed be read as a suite that was deliberately left out.
- An exclusion is `applicable: false` plus a reason, and a required check may be marked inapplicable only by the same authority that could waive it.
- "No tests found" is not proof of correctness.
- A gate whose subject is a change must record its diff base and changed-file count and must decide `blocked` when the count is `0` -- an empty diff means the gate did not find its subject. See "A gate must bind to a non-empty diff" in [composition contracts](06_ADW_COMPOSITION.md).
- Review prose does not replace executable checks, and the reciprocal holds: **tests do not replace spec review, and screenshots do not replace executable tests.** Each answers a question the others cannot.

**Reviewer output is advisory until an independent gate accepts it.** An approving review is a finding, not a decision -- reading it as a gate result is how approval quietly becomes authorization.
- Previous artifacts do not prove current correctness.
- Configured tooling does not prove it ran.
- Compare the full expected check set with actual results; missing, malformed, duplicate, empty, stale or contradictory results cannot pass.
- Agent completion, populated state, an existing directory and a path-looking string do not prove correct output. Validate identity, containment, content and freshness.
- Keep required mechanical gates in the controller and outside builder control. In supervised sessions label agent-only checks honestly.

## Verify behaviour, not description

**Trace actual arguments, working directory and exit handling -- not names, not a README.** A document describes intent; only the code describes behaviour. When they disagree, the document is usually the *target* and the code the *current state*, and the gap is the finding.

Where a runtime is missing or an integration was never exercised, **label it unverified and say so**. **Structural checks do not prove adoption** -- that every file parses and every link resolves says nothing about whether the thing runs.

## Claims that look like evidence

Each of these has been mistaken for proof of work and is not:

- **A zero exit code, or a success flag** -- check the artifacts and the full expected check set.
- **A path-shaped string, a directory, a ticked checkbox, or a populated state object.**
- **A parse error or empty result treated as "zero failures."** Choose fail-fast or collect-all explicitly, and record dependent checks as not-run.
- **A port probe** -- it is not a reservation; something else can bind between the check and the use.
- **A tracker update, a logging hook, or a dashboard** -- they observe and report. They do not grant acceptance.

## Never manufacture a pass

Re-running until green is one way. **Weakening the assertion is the commoner one**, and it leaves no trace in the result -- the suite is green and the record says so.

Add or update tests without weakening what they assert to obtain green. Do not delete or skip assertions, do not widen a tolerance to swallow the failure, and do not redefine acceptance so the current behaviour qualifies. A check that was changed to pass is evidence about the check, not about the code.

**Verify the permission-shaped claim the same way as the artifact-shaped ones.** "This action was permitted" is established by consulting the independent policy, never by the proposer asserting it. That is the claim most often taken on trust, and it is the one where trusting the proposer defeats the entire separation between proposing and authorizing.

## Flake adjudication

### Do not create the contention you will then have to adjudicate

**Do not run a full suite concurrently with browser automation, a build, or another suite.** Contention produces timeout-shaped failures that are indistinguishable from real ones in the record, and the cheapest flake to adjudicate is the one that was never created.

Record system load alongside any timeout-shaped failure **at the time of the failure**. A load measurement taken afterwards, once the machine is quiet, describes a different machine than the one the run failed on, and is not evidence about that run.

### Re-evaluating a failure that may not be about the code

A required failure blocks. That does not weaken. But an environment-induced failure blocks forever unless the package says what the safe re-evaluation looks like, and the only other documented escape -- a human waiver -- is the wrong instrument, because nothing is being waived: the claim is that the check never measured the code.

> **Environment-induced failure.** A failed required check may be re-evaluated **only** by re-running the named failing scope **in isolation**, on a quiescent machine, recording both runs. The re-run does not replace the original; both are retained. A failure may be classified `environment_suspected` only with positive evidence -- the isolated run passes **and** an independent indicator corroborates it (a differing failure set between runs, a load measurement, a timeout-shaped failure mode). One isolated pass is not evidence; it is a second sample.
>
> Re-running the **same** scope until it passes is manufacturing a pass. The distinguishing feature of a legitimate re-run is that it changes the *conditions*, not the *attempt*.

`environment_suspected: true` is a claim about the measurement, not a result: the original `failed` record stays `failed`, both runs stay attached to it, and the classification is reported to the human rather than resolving the gate silently. A re-run that changes nothing observable about the conditions is an `invocation_retry` against the retry budget, not adjudication.

The corroborating-indicator requirement is what separates this from retry-until-green. Two full-suite runs on an unchanged tree that fail *non-overlapping* sets of suites are corroboration: no single code defect explains disjoint failure sets. A second run that fails the same suite again is the opposite -- it is confirmation of a real failure.

## What a review inspects

Correctness / regressions / authorization / input handling / data and migration safety / cleanup / concurrency / compatibility / maintainability / **changes unrelated to the task**.

Map each acceptance criterion to code, behaviour and check evidence. **Missing required evidence is a finding, not implied success**, and the builder's claims are not evidence.

After a repair, the affected checks run again **and the review runs again against the current diff**.

## Review checklist

Inspect the final diff for criteria coverage, invalid inputs, error cleanup, injection and authorization, secret handling, transaction/migration safety, concurrency, compatibility, UI states, performance, sensitive logging, meaningful tests, documentation impact, and unrelated files.

Every finding carries **two orthogonal fields**, plus a flag:

- `disposition`: `blocker` | `tech_debt` | `skippable` -- machine-consumed, and the only field a gate reads.
- `severity`: `Blocker` | `High` | `Medium` | `Low` | `Note` -- human-facing, for triage and communication.
- `risk_accepted`: `true` | `false` -- set only by a human, naming who accepted what.

A gate that has to interpret severity is a gate that can be handed a value it cannot act on. A finding that means "repair this, or have someone accept the risk in writing" is not tech debt -- tech debt carries no acceptance requirement -- and it is not a plain blocker either. It is `disposition: blocker` with `risk_accepted` available.

| Severity | Disposition | Required handling |
|---|---|---|
| Blocker | `blocker` | Repair, or obtain an explicit human waiver before `acceptance_pending`; blocked handoff is allowed |
| High | `blocker` | Repair, or a human sets `risk_accepted: true` with named consequences. Until then it blocks |
| Medium | `tech_debt` | Repair in scope or record a follow-up item; does not block |
| Low | `tech_debt` | Optional documented improvement |
| Note | `skippable` | No action required |

Test for a conformant review record: a gate can decide using `disposition` alone, without reading `severity`, and an approval listing any unresolved `blocker` with `risk_accepted: false` is rejected.

After any repair or review revision, invalidate affected downstream evidence, re-run the reproducing check and affected required gates, then review the current diff. A later successful phase cannot clear an earlier failure.

For workflow implementation, also test the [control-plane failure cases](06_ADW_COMPOSITION.md) before unattended adoption. Static file/link validation is not an end-to-end ADW test.
