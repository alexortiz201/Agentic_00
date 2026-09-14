# 🖥️ Verifying in a browser

How to check that a change does what it claims **in the running application**, and how to leave nothing behind. The subject here is not a repository — it is a live system, and almost everything that makes this hard follows from that.

The blueprint for what a check must bind to is [`primitives/gate.md`](../foundations/Agentic_Engineering/primitives/gate.md); what the instrument can and cannot do is [`foundations/Software_Engineering/02`](../foundations/Software_Engineering/02_TESTING_AND_EVIDENCE.md), whose probabilistic-instrument section governs every claim made from a screen.

## Two paths, and the default is the automated one

**A headless browser is the default.** It gives an isolated session per run, so checks fan out like anything else, and it contends with nobody's workspace.

**Driving a person's real browser is the exception**, reserved for checks that genuinely need a human-driven session — an identity only that profile holds, or evidence someone wants to watch being produced. Everything in the next section is a property of *that* path, and none of it should be paid for on the automated one.

Keep the two separated by name as well as by rule. A single flow that silently switches between them inherits the strictest constraints of both and nobody can tell which applies.

## The real browser is one resource, and that decides the manual path

**One instance, one storage partition, one logged-in identity.** Tabs and tab groups organise a run's pages; they do not isolate its state. Two runs driving the browser at the same time are driving one session — one run's navigation lands in the other's page, and a login performed by one changes what the other sees.

So: **the manual path serialises, and everything else does not.** Reading code, forming a hypothesis, writing a test, running a suite — all of that fans out freely. Only the phase that touches the live application is a single resource, and a workflow that treats it as anything else produces interference indistinguishable from a product defect.

A step needing two identities — two roles, two tenants, signed-in versus anonymous — **logs out and back in between them**. It does not assume isolation that is not there.

## Before touching the application

**Prove the tree being served is the tree under test.** A development server left running from earlier work answers a port exactly like the real thing, and the result is that a change is verified against code that does not contain it. Ask which tree is being served, not whether something responds.

**The stack is started from where the stack is defined**, which is not necessarily the directory the work is in. A workflow carries both: the workspace it edits, and the working directory that brings services up.

## Capture before and after, as a pair

**A defect that reproduces in the browser is captured twice: once showing the defect, once showing it gone.** The pair is the evidence, and neither half is worth much alone — a picture of a broken screen does not establish that anything fixed it, and a picture of a working screen does not establish that anything was ever wrong.

Both go on the ticket. The reason is that **the people who most need them are not in the conversation where they were produced**: whoever reviews the change, whoever tests it afterwards, and whoever reads the ticket in a year trying to work out what the symptom actually looked like. A description of a visual defect is a poor substitute for the defect, and it is the first thing to go stale.

Capture the *before* while the defect is still reproducible — which in practice means **before the fix exists**, during the investigation, because afterwards it costs a revert to get back to it.

**Two rules about what to capture:**

- **The same view, the same data, the same position.** A pair taken from two different states proves nothing, and the difference a reader is meant to see gets lost among differences nobody meant.
- **A recording rather than a still, only when the defect is in the motion** — something that shifts, flickers, reorders or animates. A still is easier to read and harder to misinterpret, and most defects are visible in one.

**When to skip the pair entirely.** Where the mechanism only manifests under real timing, load or data conditions, a recording either shows nothing or requires artificially widening the window to make it visible — and a widened window is no longer the defect. **Put the weight on a test that forces the condition deterministically**, and say in the ticket why there is no recording. An absent capture with a stated reason is honest; one that quietly shows a faked symptom is worse than none.

## Capture as you go, because the state does not survive

A running application's state is gone the moment the run ends. **A screenshot taken at the moment of the claim is the evidence; a description written afterwards is a recollection.**

Capture on passes as well as failures. A trail kept only for failures cannot establish what a pass looked like when the next one disagrees with it.

**Name the instrument beside the result.** A claim sourced from reading a screen is not interchangeable with one sourced from an exit code, and nothing but the record can say which it was.

## What an empty result means here

**An instrument that cannot look reports the same silence as one that looked and found nothing.** Some values are unreadable by policy rather than absent — a check that reads one and finds it missing will conclude the wrong thing with complete confidence.

So a browser check binds to **what the interface renders**, which is observable, rather than to state it is not permitted to read. Where a check must consult something it cannot see, it reports that it could not look.

## Tear down unconditionally

Everything opened is the run's to close: tabs, the tab group, any server it started, any session it authenticated.

**Capture into the records first, then release — and release whether the run passed or failed.** The only reason to hold a failed run's resources is the evidence inside them; once that is written down the resource holds nothing that is not already recorded, and teardown stops being conditional. That removes the failure mode where cleanup only happens on the happy path.

Release from the run's own action log rather than from what happens to be listening. Guessing in that direction eventually closes something a person deliberately left open, which is indistinguishable from a crash to whoever was using it.
