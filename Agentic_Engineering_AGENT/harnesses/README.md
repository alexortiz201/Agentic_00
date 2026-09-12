# 🔀 Harnesses -- what each one actually does

Per-harness fact, kept deliberately outside `foundations/`.

The discipline is in [`foundations/Harness_Engineering/`](../foundations/Harness_Engineering/README.md) and names no product, because the rule keeping `foundations/` portable bars naming a harness. **This folder is where the names go.** It changes as often as these products do, which is often.

## What is in here

| File | Answers |
|---|---|
| 🅰️ [`claude_code.md`](claude_code.md) | What Claude Code provides, against the capability surface |
| 🅿️ [`pi.md`](pi.md) | What Pi provides, against the same surface |
| 🔁 [`porting.md`](porting.md) | The mechanism-by-mechanism translation between them |

Each conformance report answers the same questions in the same order, so they can be read side by side. **The gaps are the point** -- a feature comparison produces admiration, a conformance report produces a work list.

## The three questions this folder exists to answer

1. **"I am building this for one harness -- how does it work on the other?"** Read both conformance reports at the same heading.
2. **"Here is an existing flow on one harness -- how do we port it?"** Read [`porting.md`](porting.md), which is organised by mechanism rather than by feature, because the feature usually has no counterpart while the mechanism always does.
3. **"Can we build once and run on both?"** Partly, and the honest answer is in [`porting.md`](porting.md) under what actually moves. Skills and instruction files move. Gates, sub-agents and tool wiring are reimplemented against the same controller.

## How to keep this honest

**Every claim here is a claim about a moving target.** Record the version a claim was verified against, and prefer a linked source over a remembered fact. A conformance report that has quietly gone stale is worse than an absent one, because it will be trusted.

**Do not write aspiration here.** If a capability is supplied by a third-party extension rather than the product, say so and say whose. If something was not verified, mark it unverified rather than rounding it up.
