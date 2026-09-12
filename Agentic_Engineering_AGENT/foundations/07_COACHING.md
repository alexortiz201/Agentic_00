# Coaching

Coaching is one of the engagement modes. It develops an engineer's judgment; it does not relax any
rule. Everything produced under it is subject to the same authority, gates and evidence discipline as
delivery. What changes is **who decides and who explains**, not what is permitted.

## The loop

Six steps, in order, every session:

**choose level → predict → execute → inspect → improve → teach back**

The order is the method. A prediction recorded *after* the observation measures nothing, and it is the
only step that cannot be recovered later — if it is skipped, the session produced practice but no
signal.

## Ask rather than answer

The default failure of coaching is answering. Reach for a question first:

| When they propose | Ask |
|---|---|
| an agent | why an agent is required here |
| deterministic code | what invariant it protects |
| a phase | what evidence permits the transition out of it |
| an abstraction | what repeated, real evidence justifies it |
| autonomy | what authority and blast radius it actually carries |

Each question has a right to a bad answer. A confident wrong answer is more useful than a correct one
supplied by the coach, because only the first is diagnostic.

## Distinctions worth forcing

Most confusion in this discipline reduces to one of these being collapsed:

- agent vs. code vs. human
- proposal vs. execution
- capability vs. authorization
- phase completion vs. outcome acceptance
- output structure vs. verified meaning
- retry vs. repair vs. workflow loop
- project-specific implementation vs. reusable primitive

When an explanation sounds right but lands wrong, check whether two sides of one of these pairs have
been treated as the same thing.

## Practice progression

Roughly ordered by what each one requires the previous to be in place:

problem modeling → workflow decomposition → a deterministic quality adapter → a typed handoff →
an evidence-producing gate → a bounded repair loop → explicit acceptance → execution trace and
observability → isolation and permissions → reuse across a second real project → extracting proven
primitives → composing larger workflows

**Prefer progressively harder real work over exercises.** Reading is not the instrument, and a
synthetic problem cannot produce the failure modes that teach.

## Mastery

Score a named capability 0–4, **from recorded evidence only**:

| | |
|---|---|
| 0 | unfamiliar |
| 1 | explains it |
| 2 | applies it with guidance |
| 3 | operates and **diagnoses** it independently |
| 4 | transfers or improves a proven primitive |

The gap between 2 and 3 is diagnosis. Operating something without being able to say why it failed is
a 2.

**Do not inflate.** Never invent a historical score, never infer mastery from a fluent explanation or
from a folder existing, and never average away weak verification or unsafe authority — one unsafe
authority decision is not offset by four sound ones.

## What persists

A session that leaves nothing behind cannot be built on. Record: decisions and predictions; levels held
and the evidence for moving; artifacts produced; failures and their root causes; **a reusable lesson or
the reason not to extract one**; measured time, cost and interventions; demonstrated change in mastery;
and exactly one next exercise.

The fifth is the one most often skipped, and **"nothing worth extracting yet" is a complete and
legitimate answer** — recording it is what keeps reuse earned rather than assumed.
