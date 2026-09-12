# Create Primitive

Portable metaprompt/command recipe. Input: KIND, PURPOSE, CALLER, INPUTS, OUTPUT_CONSUMER, TARGET, SCOPE, ENGAGEMENT_MODE. Not host-registered.

KIND is one of the canonical primitive kinds in the [quick reference](../ADW_QUICK_REF.md) taxonomy — `instructions`, `context_recipe`, `prompt`, `command`, `skill`, `role`, `template`, `type`, `state`, `gate`, `tool_adapter`, `workspace_adapter`, `phase`, `trigger`, `hook`, `docs_scenario`. That table is the single list; do not invent a kind beside it. `composition` is the one canonical kind this recipe does not author — sequencing existing phases belongs to [compose ADW](compose_adw.md).

ENGAGEMENT_MODE is `delivery`, `coaching`, `audit` or `design` (quick reference). Authoring files is `delivery`; in `design` stop at the proposed contract and file list, in `audit` report what already exists and create nothing.

## Workflow

1. Establish the repeated need and smallest artifact. Inspect existing examples and consumer code; prefer reuse over another abstraction. If an existing kind already covers the need — repair is a `prompt`, a plan is a `template` instance, a stack recipe is a `context_recipe` — extend it instead of adding a kind.
2. Define one purpose, exact inputs/outputs, side effects, permissions, context, limits and invalid-input behavior. Separate content from host registration.
3. Select a pattern:
   - `prompt` / `command`: specialize [PROMPT.md](../templates/PROMPT.md); bind variables explicitly and match the consumer report. A command is the invocation surface, not another controller.
   - `skill`: follow the routing shape in [adw-authoring](../skills/adw-authoring/SKILL.md); make purpose/prerequisites/recipes discoverable without loading every reference.
   - `instructions` / `template` / `role`: state authority and limits explicitly; a template is a shape plus its required fields, and a role is purpose + Core Four + schema/limits/authority, kept separate from sequencing.
   - `phase` / `type` / `gate` / `tool_adapter` / `state` / `workspace_adapter`: use [composition contracts](../foundations/06_ADW_COMPOSITION.md); executable checks and state transitions belong in code, not prompt assertions.
   - `hook`: fill [HOOK_CONTRACT.md](../hooks/HOOK_CONTRACT.md) before writing implementation or registration.
   - `trigger`: require authentication, allowed routing, atomic claims, idempotency, live-worker limits and cancellation before unattended pickup.
   - `context_recipe` / `docs_scenario`: record verified relevant facts and their loading conditions, and document observed behavior rather than intent; review knowledge updates separately from authority/workflow changes.
4. Choose only useful prompt features: simple workflow first; bounded conditions/loops, scoped delegation, a referenced prompt/plan, or a template section when needed. Do not add sophistication for its own sake.
5. Write only the approved files. Never overwrite existing settings or claim unsupported metadata/tool names. Inspect installed host capabilities before adding registration; direct file loading remains the portable fallback.
6. Test valid, missing, malformed, unauthorized, timeout and **wrong workspace** cases at the consuming interface. Check argument order, output shape, path containment and actual side effects. Verify a generated prompt as an artifact before executing it.
   - **Wrong workspace** means: invoke the primitive from a different cwd, and against a workspace that is not the one under test. It must detect and report the mismatch rather than operating on whatever it found. This recipe already requires resolving paths relative to the command rather than the current working directory; this case is what proves it. A primitive that silently succeeds here is the primitive-altitude form of a gate certifying an empty diff — report the observed workspace and the expected one, and fail.
7. Add conditional discovery links and examples; label authored, configured, tested and actually used separately.

## Report

Concise Markdown: purpose/when used; canonical KIND; file and invocation; typed contract and permissions; fixture/check evidence for all six mandatory cases; registration status; limitations. No secret values or claims of untested enforcement.
