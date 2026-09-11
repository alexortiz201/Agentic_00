# Create Primitive

Portable metaprompt/command recipe. Input: KIND, PURPOSE, CALLER, INPUTS, OUTPUT_CONSUMER, TARGET, SCOPE. KIND may be prompt, command, skill, phase, type, gate, tool/adapter, trigger, hook, context recipe or domain reference. Not host-registered.

## Workflow

1. Establish the repeated need and smallest artifact. Inspect existing examples and consumer code; prefer reuse over another abstraction.
2. Define one purpose, exact inputs/outputs, side effects, permissions, context, limits and invalid-input behavior. Separate content from host registration.
3. Select a pattern:
   - Prompt/command: specialize [PROMPT.md](../templates/PROMPT.md); bind variables explicitly and match the consumer report. A command is the invocation surface, not another controller.
   - Skill: follow the routing shape in [adw-authoring](../skills/adw-authoring/SKILL.md); make purpose/prerequisites/recipes discoverable without loading every reference.
   - Phase/adapter/type/gate: use [composition contracts](../06_ADW_COMPOSITION.md); executable checks and state transitions belong in code, not prompt assertions.
   - Hook: fill [HOOK_CONTRACT.md](../hooks/HOOK_CONTRACT.md) before writing implementation or registration.
   - Trigger: require authentication, allowed routing, atomic claims, idempotency, live-worker limits and cancellation before unattended pickup.
   - Context/domain reference: record verified relevant facts and conditions for loading; review knowledge updates separately from authority/workflow changes.
4. Choose only useful prompt features: simple workflow first; bounded conditions/loops, scoped delegation, a referenced prompt/plan, or a template section when needed. Do not add sophistication for its own sake.
5. Write only the approved files. Never overwrite existing settings or claim unsupported metadata/tool names. Inspect installed host capabilities before adding registration; direct file loading remains the portable fallback.
6. Test valid, missing, malformed, unauthorized and timeout cases at the consuming interface. Check argument order, output shape, path containment and actual side effects. Verify a generated prompt as an artifact before executing it.
7. Add conditional discovery links and examples; label authored, configured, tested and actually used separately.

## Report

Concise Markdown: purpose/when used; file and invocation; typed contract and permissions; fixture/check evidence; registration status; limitations. No secret values or claims of untested enforcement.
