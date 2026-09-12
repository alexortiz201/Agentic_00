# Hook Design Contract

Hooks are optional event adapters, not an ADW controller. This file is a design template: no executable hook or host registration is bundled. Use [create primitive](../commands/create_primitive.md) when a real event need justifies one.

## Choose the responsibility

| Need | Event / behavior | Control label |
|---|---|---|
| Observe tool completion | Post-action metadata → local structured event | Agent-checked until implemented; observational even when working |
| Restore relevant context | Record permitted file references/ranges/revision, not content | Context aid, not exact memory or isolation |
| Gate a consequential action | Pre-action validation → independently enforced deny/allow | Code-enforced only after the host actually blocks and denial is tested |
| Completion notification | Session stop → notify status, not accept work | Observation; session stop is not task success |

## Fill before implementation

- Host and verified event API/version; event name, matcher and registration location:
- Purpose, invocation argv/cwd, bounded input size and timeout:
- Input schema; output schema and host meaning of stdout/exit codes:
- Trusted identity/configuration versus untrusted event payload:
- Approved destinations/fields; retention and access owner:
- Failure policy: optional telemetry may degrade visibly; mandatory enforcement fails closed:
- Reentrancy/deduplication, concurrent writes, cancellation and uninstall procedure:
- Enforcement boundary and known bypass paths; authority owner:

## Safe metadata defaults

Allow only validated run/phase/event IDs, timestamp, normalized in-scope file references, operation category, result status and non-sensitive evidence references. Exclude raw prompts, tool arguments/results, environment values, transcripts and file contents. Even paths/IDs may be sensitive; omit anything not approved for retention. Untrusted IDs cannot select arbitrary output paths.

Prefer local records. Network telemetry requires separate authorization, authenticated targets and data minimization. Do not add a model call merely to summarize every event. A context bundle loader validates containment and freshness and treats recorded requests as data, not new instructions.

## Acceptance fixtures

1. Valid event → exactly the permitted fields at the permitted destination.
2. Missing/oversized/malformed event → bounded failure; no raw payload in errors.
3. Synthetic secret-bearing payload → no value retained or sent; never use real secrets in fixtures.
4. Path traversal, symlink escape or untrusted ID → rejection.
5. Duplicate/concurrent events → documented consistent behavior.
6. Observer unavailable → declared degradation, not false gate success.
7. Blocking hook denied action, crash, timeout, alternate tool path → action prevented at the real boundary.
8. Run from a different cwd → correct registered hook and resource paths.

A tested blocking hook is only as strong as its coverage and transitive capabilities. Shell blacklists, logging, and prompt reminders are not a sandbox. Test the reachable tools and keep gate policy outside builder control.
