# ⚖️ Testing and evidence

What a check establishes, what order to spend checks in, what a record of a check has to contain for anyone to act on it later, and how to tell a real failure from a failure of the machine it ran on. None of this arrived with agents. What changes when an agent rather than a person produces the claim is in [`Agentic_Engineering/04_VERIFICATION.md`](../Agentic_Engineering/04_VERIFICATION.md).

## The check ladder

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

Concretely: if the change is visible in a running product, walk the affected surface once before starting a full suite, and record the walk as an evidence item that actually ran -- `source: executed`, in the [provenance axis](../Agentic_Engineering/04_VERIFICATION.md). A unit suite is structurally blind to a prop threaded to the wrong consumer or a control that silently stopped rendering, so a green level 2 alongside an unobserved screen is not coverage of that class. Record the observation whether or not it found anything; "the screen was not opened" and "the screen was opened and looked right" are different evidence, and only one of them is recorded by silence.

## Evidence record

For each check capture:

| Field | Content |
|---|---|
| Criterion | Acceptance criterion or risk addressed |
| Command/directory | Exact command with secrets redacted; working directory |
| Result | `passed`, `failed`, `not_run`, or `error`; exit code |
| Applicability | `applicable: true` or `false` with a reason. A check excluded on purpose is `applicable: false`; a check that was prevented from running is `not_run`. Never encode either as a result |
| Environment | `environment_suspected` (`true` / `false`), set only with the corroborating evidence below; recorded system load for any timeout-shaped failure |
| Duration | Measured value or `NOT MEASURED` |
| Scope | Behavior/components exercised |
| Artifact/caveat | Relevant non-sensitive output, mocks, missing service, or excluded cases |
| Identity/freshness | Run/phase/attempt, timestamp, checked revision, diff base, changed-file count and diff identity |
| Bounds | Timeout and expected check ID |

One further field belongs on every record and is not listed here: the **provenance** of the claim -- whether the command ran, or something merely says it did -- which is what decides whether a record satisfies a required check at all. It is in [`Agentic_Engineering/04_VERIFICATION.md`](../Agentic_Engineering/04_VERIFICATION.md), because who or what produced a claim is the axis agents changed.

## Gate rules

- A gate decision is `pass`, `blocked`, or `human_waived` -- three values, and `human_waived` is never counted as `pass` anywhere a decision is aggregated or reported.
- A required failure blocks `acceptance_pending` until repaired or explicitly human-waived; later steps never erase its failed result. Record waiver evidence, approver, time, scope, and accepted consequences wherever the run's state and handoff are read -- for the state this blocks on, see the [task lifecycle](../Agentic_Engineering/02_WORKFLOW.md).
- A check that did not run is `not_run`, and `not_run` on a required check blocks. There is no `skipped` status: "authorized exclusion" and "did not run" are different facts, and one status covering both is what lets a suite that never executed be read as a suite that was deliberately left out.
- An exclusion is `applicable: false` plus a reason, and a required check may be marked inapplicable only by the same authority that could waive it.
- "No tests found" is not proof of correctness.
- Previous artifacts do not prove current correctness.
- Configured tooling does not prove it ran.
- Compare the full expected check set with actual results; missing, malformed, duplicate, empty, stale or contradictory results cannot pass.
- Review prose does not replace executable checks, and the reciprocal holds: **tests do not replace spec review, and screenshots do not replace executable tests.** Each answers a question the others cannot.

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

## Never manufacture a red either

The mirror of the section above, and the one nothing checks. A reproduction is supposed to fail **because the defect is present**. A test that errors because a module does not exist yet, an import is wrong, a fixture is missing or a path is stale is not a reproduction -- it proves nothing about the defect, and it will go green the moment the unrelated mistake is fixed, which reads exactly like a fix.

This passes every check that only asks whether the test failed, which is most of them. **Read the failure, not the status.** A red whose message is not the defect's message is a red for the wrong reason.

The same question closes the other half of it: **if the defect were present, would this assertion produce a different result?** A check that cannot fail is worse than no check, and the concrete tell is an assertion whose expected and actual values are equal by construction -- it will hold whatever the code does.

## What a test cannot do

Everything above assumes the thing under test returns the same answer twice. Where it does not -- a step whose output is generated rather than computed -- an assertion is the wrong instrument, and forcing one produces either a test so loose it cannot fail or one so tight it fails on acceptable output.

**A test asserts; an evaluation measures.** The deterministic parts of a system are tested and the probabilistic parts are evaluated, and a system with both needs both. See [`Agentic_Engineering/12_EVALUATIONS.md`](../Agentic_Engineering/12_EVALUATIONS.md).

The boundary is worth policing in both directions. A deterministic step measured statistically is a test someone declined to write. A probabilistic step asserted against is a flaky test that will be re-run until it passes.

### The instrument can be the probabilistic half

Everything above puts the non-determinism in the **subject**. It sits just as often in the **instrument**, and that case is easier to miss precisely because the subject looks perfectly testable. An agent that drives an interface, reads what is on the screen and judges whether it matches a described outcome is producing a *generated observation of a computed thing*: the application may return the same answer every time while the route taken to reach it, and the judgement passed on it, do not.

**A green from a probabilistic instrument is a measurement, not an assertion.** Read as a passing test, it becomes a gate that nothing can reproduce -- and the usual consequences of measurement apply from the other side too, since one run is not a sample and any threshold set on it needs margin over its own spread.

Two obligations follow for the record. **Capture the evidence at each step, and keep it on passes as well as on failures**: a walk that cannot be reproduced leaves the captured artifact as the only account of what actually happened, and a trail kept only for failures cannot establish what a pass looked like when the next one disagrees with it. And **name the instrument beside the result**, because a result whose provenance is a generated observation is not interchangeable with one whose provenance is an exit code, and nothing but the record can say which was which.

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

---

What a reviewer does with all of this -- and why an approving review is not a decision -- is in [`03_CODE_REVIEW.md`](03_CODE_REVIEW.md).
