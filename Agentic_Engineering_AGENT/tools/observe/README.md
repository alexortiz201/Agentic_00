# observe

Records work as it happens, so a workflow can be derived from what occurred rather than from what anyone recalls occurring.

**This is a reference implementation, not the standard.** The portable statement is [`primitives/observation.md`](../../foundations/Agentic_Engineering/primitives/observation.md); this is one adopter's answer in one language. Where the two disagree, the primitive is right and this is behind. How to actually run a recording is [`handbook/10_OBSERVING_A_PROCESS.md`](../../handbook/10_OBSERVING_A_PROCESS.md).

It is the first executable code in this package. Everything else here states what a thing must contain; this one does it, which is why it is fenced into `tools/` rather than sitting beside the discipline it implements.

## Use

```
bun tools/observe/observe.ts open   --subject <s> [--model <m>] [--harness <h>] [--workspace <p>]
bun tools/observe/observe.ts add    --kind <kind> --what <text> [--effect read|write] [--step <s>] [--out-of-band] [--<field> <v> ...]
bun tools/observe/observe.ts label  --seq <n> --step <s>
bun tools/observe/observe.ts close  [--why completed|abandoned|interrupted]
bun tools/observe/observe.ts status
```

`OBSERVE_DIR` sets where recordings land -- point it at the subject's own workgroup folder, since the subject owns its recordings. Default is `./observations`.

Unrecognised flags ride along as kind-specific fields, so `--cmd`, `--exit`, `--surface`, `--asked`, `--outcome`, `--to` and `--reconciled_by` need no special casing. `exit` and `reconciled_by` are coerced to numbers; nothing else is, because blanket coercion turns a version like `1.20` into `1.2`.

## Two behaviours worth knowing

**One recording at a time.** A second `open` refuses rather than silently starting a parallel record, and `add` refuses when nothing is open. The single open pointer is the cost control -- recording is meant to be a deliberate act, not the default state.

**A label is appended, never patched in.** `label` writes a new line assigning a step to an earlier entry, because the record is append-only and a step assignment is a later opinion about an earlier fact. Both belong in the file, in that order.

## Exercised at the consuming interface

Per [`primitives/README.md`](../../foundations/Agentic_Engineering/primitives/README.md): valid; missing input refuses and names what was missing; malformed `--kind` refuses without appending; labelling a non-existent entry refuses; a second open refuses; adding after close refuses; and **a pointer naming a record that is not on disk refuses rather than starting a new recording** -- the wrong-workspace case, which is the one worth having.

Not exercised, because the surface does not exist: authorization and timeout. There is nothing to authorize and nothing long-running to time out. Recorded here rather than left as an apparent omission.
