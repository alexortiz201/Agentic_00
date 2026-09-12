# 🔬 Verification

Checking work is engineering, and most of it did not change: the check ladder, the order to spend checks in, the evidence record, the gate rules, and how a flaky failure is adjudicated are in [`Software_Engineering/02_TESTING_AND_EVIDENCE.md`](../Software_Engineering/02_TESTING_AND_EVIDENCE.md); what a review inspects and what a finding carries are in [`Software_Engineering/03_CODE_REVIEW.md`](../Software_Engineering/03_CODE_REVIEW.md). What follows is only what changes because the thing making the claim can produce a fluent, well-formed report of work it did not do.

## Provenance -- what actually produced the claim

Every evidence record carries a `source` alongside its result: `executed` (the command ran here), `inspected` (read the code or diff), `documented` (a document claims it), `asserted` (an agent says so). These match evidence-hierarchy tiers 2, 3, 5 and 6.

**A check record that is `passed` with `source: asserted` is not a passed check; it is an assertion that a check passed.** The result field and the provenance field are answering different questions, and reading only the first is how a run that never executed anything reports green.

Gates read `source`: a required mechanical check satisfies its gate only with `source: executed`; a review gate accepts `inspected` for findings; `documented` and `asserted` never satisfy a required check, only inform one.

## A gate must find its subject

A gate whose subject is a change must record its diff base and changed-file count and must decide `blocked` when the count is `0` -- **an empty diff means the gate did not find its subject**, which is not the same as finding nothing wrong with it. See "A gate must bind to a non-empty diff" in [composition contracts](06_ADW_COMPOSITION.md).

## What an agent produces that is not output

**Agent completion, populated state, an existing directory and a path-looking string do not prove correct output.** Each of them is a side effect of the attempt rather than a property of the result, and each is produced just as readily by an attempt that did nothing. Validate identity, containment, content and freshness.

**Keep required mechanical gates in the controller and outside builder control.** A check the builder can run, interpret and report on is a check the builder can satisfy by reporting. In supervised sessions, label agent-only checks honestly -- `agent-checked` is not `code-enforced`, and calling it one does not make it one.

## Verify the permission-shaped claim the same way as the artifact-shaped ones

"This action was permitted" is established by consulting the independent policy, never by the proposer asserting it. That is the claim most often taken on trust, and it is the one where trusting the proposer defeats the entire separation between proposing and authorizing.

## A finding a gate can act on

Findings carry `disposition`, `severity` and `risk_accepted`, defined in [`Software_Engineering/03_CODE_REVIEW.md`](../Software_Engineering/03_CODE_REVIEW.md). Only one of them is machine-consumed: **`disposition` is the field a gate reads.** A gate that has to interpret `severity` is a gate that can be handed a value it cannot act on -- a human-facing vocabulary has no obligation to stay inside the set some gate was written against.

Test for a conformant review record: a gate can decide using `disposition` alone, without reading `severity`, and an approval listing any unresolved `blocker` with `risk_accepted: false` is rejected.

## The reviewer is frequently an agent

**Reviewer output is advisory until an independent gate accepts it** -- the rule is in [`Software_Engineering/03_CODE_REVIEW.md`](../Software_Engineering/03_CODE_REVIEW.md), and agents are what make it a live risk rather than a formality. An agent review returns on every run, returns quickly, and returns something that reads like a decision; at that volume an approval consumed as a gate result is the path of least resistance, and approval quietly becomes authorization. The reviewing agent cannot authorize its own findings any more than the building agent can authorize its own work.

## Test the control plane, not the files

For workflow implementation, also test the [control-plane failure cases](06_ADW_COMPOSITION.md) before unattended adoption. **Static file/link validation is not an end-to-end ADW test** -- it establishes that the workflow is well-formed, not that it runs, and the failures that matter unattended are the ones that only appear when it does.
