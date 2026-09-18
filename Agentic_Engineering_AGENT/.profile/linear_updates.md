# 🧾 How he wants a tracker update written

**Specified 2026-09-15, REVISED 2026-09-17.** A ticket update is read by several audiences with different jobs, and the format exists so none of them has to read another's half to find their own. **The 2026-09-17 revision added a summary at the top, promoted Suggested Tickets to sit directly under Product, and replaced the standalone test plan with a QA section that contains it.**

## The order, and why it is that order

**Product first, engineering underneath.** The product reader owns scope, priority and sequencing; they need the decision and nothing else, and they should not have to scroll past a call stack to reach it. The engineering reader wants the mechanism and will scroll for it. **Putting product second would make the people with the least context do the most filtering.**

## The sections

| Section | Holds | Included |
|---|---|---|
| **Summary** | A few lines at the very top, **before any heading.** Most readers need only this; the rest now know which section to jump to | Always |
| **Product** | Can we do it, how long, what it does not cover, what is blocking and who owns that. Decisions, not mechanisms | Always |
| **New Suggested Tickets** | **Directly under Product** -- it is a scoping and planning decision, not an engineering detail. Work that surfaced and does not belong in this one, each with a concise why | Only if any |
| **Engineering** | The mechanism, the corrections to the ticket, file and line references, constraints | Always |
| **QA** | Risk surface, what was verified and how, and a **How to Test** subsection carrying the user-visible flow as short steps | Always |
| **Constraints** | Limits, caps, thresholds -- **as a table.** A number buried in prose is a number nobody finds twice | Where any exist |
| **Test Plan (product view)** | The user-visible flow being verified, **as concise step bullets.** Not the engineering method | Where there is something to verify |
| **Suggested Tickets** | Work that surfaced and does not belong in this one. **Each with a concise why** | Only if any |
| **Follow Up** | Things needing a person, an answer or an action that are **not** suggested tickets | Only if any |

## The product-view test plan, and why it sits where it does

**It goes directly above Suggested Tickets**, after the engineering detail and before the spill-over sections. It is the **user flow** being verified, written as short bullets -- not the profiling method, not the instrumentation.

It serves three readers at once, which is why it earns space in a ticket rather than living only in a test document: **product and quality assurance learn what will be exercised**, and **another engineer or an operations reader can see a gap and say so.** That last one is the real value -- a test plan nobody outside the author reads is a plan whose blind spots survive to production.

**Keep it very concise.** The moment it becomes a full procedure it stops being glanceable and the three readers it was written for stop reading it.

## Rules that are easy to get wrong

- **A suggested ticket is never repeated in Follow Up.** They are one list split by whether the item becomes tracked work or an action. Repeating an item across both makes the reader check whether they are the same thing.
- **Omit an empty section entirely.** A heading with nothing under it reads as an oversight rather than an absence.
- **Glanceable where it makes sense, prose where it does not.** Tables for constraints, comparisons and anything enumerable. Do not table a piece of reasoning -- an argument broken into cells stops being an argument.
- **Every cross-referenced ticket is cited by identifier**, so the reader can follow the chain without asking what it was about.
- **Corrections to the ticket's own stated facts belong in Engineering**, stated plainly and without ceremony. The ticket is a working document, not someone's position to be protected.

## The standing principle underneath it

This is the written form of his rule that **a report is shaped by what its audience can act on.** The detail still gets recorded -- it belongs on the ticket where an engineer will read it -- but the top of the update carries only what the reader has to decide. **A report that does not change what its reader does is a transcript.**


## Revised 2026-09-17 -- what changed and why

**A short summary now leads, before any heading.** It is the only part many readers will read, and putting it first means the others know immediately which section answers their question instead of scanning for it.

**Suggested Tickets moved up, directly under Product.** Filing new work is a scoping and sequencing decision, which is the product reader's job -- burying it under the engineering detail put a planning input behind a mechanism nobody planning needs.

**The standalone Test Plan became a QA section that contains it.** QA owns more than the steps: the risk surface, what was verified, and what the verification does *not* cover. The **How to Test** subsection keeps the original rule -- the user-visible flow as short bullets, never the engineering method.

**Keep it short, and use a table wherever layout carries more than prose would** -- before/after measurements, constraints, caps, claim-versus-reality comparisons. **But never table a piece of reasoning**: an argument broken into cells stops being an argument.

**Preview before posting.** A tracker comment is outward-facing and read by people who were not in the conversation.
