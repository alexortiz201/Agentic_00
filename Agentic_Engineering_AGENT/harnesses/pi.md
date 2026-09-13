# 🅿️ Pi

Open source, MIT, `earendil-works/pi`, by Mario Zechner.

> **Verified 2026-09-13** against **v0.85.1**, commit `71dca87`. Read from source and in-repo docs, not from the marketing site. Re-verify before relying on any specific claim -- this product changes weekly.

The design thesis: a coding agent needs four tools -- read, write, edit, bash -- and a system prompt under a thousand tokens. Everything else is opt-in, composed as typed TypeScript extensions. That makes almost every capability below a thing you build rather than a thing you configure, which is the trade the product is making on purpose.

## Against the capability surface

| Capability | Provided | How |
|---|---|---|
| Bounded invocation | Yes | `pi -p "prompt"` for text, `pi --mode json` for an event stream, `--mode rpc` for bidirectional JSONL, or the SDK in-process |
| Model selection per call | Yes | `--model`, `--provider`, `--thinking` flags. `--model` takes a fuzzy pattern, not just an exact id. **No `PI_MODEL` input env var** -- those names exist only as *outputs*, injected into the environment of commands the bash tool runs |
| Tool constraint per call | Yes, strongly | `--tools` is a strict allowlist, `--exclude-tools` a denylist, `--no-tools` disables everything. At runtime an extension calls `setActiveTools(names)` |
| Structured return | Yes, two ways | `constrainedSampling: { type: "json_schema", strict: "require" }` on a tool definition, or a tool that returns `terminate: true` with a typed `details` payload, ending the run on that call |
| Distinguishable failure | Partly -- **see the trap below** | `-p` exits `1` on an errored or aborted turn. `--mode json` does not |
| Retained transcript | Yes | Session files, or the `--mode json` event stream |

### The exit-code trap

**`--mode json` exits `0` even when the turn ended in `stopReason: "error"`.** The non-zero exit is only set in the text branch, so a controller that checks the exit code of a JSON-mode run will read failure as success. Inspect the event stream instead. This is source-derived behaviour at the pinned commit and is not documented, so re-check it rather than trusting it forever.

## Gating -- programmatic, and a real block

This is Pi's strongest capability for workflow work and it is worth understanding precisely.

An extension is a TypeScript module with a default-exported factory. It subscribes to events, and the `tool_call` event fires **before the tool executes**:

```ts
export default function (pi: ExtensionAPI) {
  pi.on("tool_call", async (event, ctx) => {
    if (event.toolName !== "bash") return undefined;        // no opinion, other extensions still decide
    if (isDangerous(event.input.command as string)) {
      return { block: true, reason: "..." };                 // typed decision -- the tool never runs
    }
  });
}
```

The return is a typed decision object -- **not an exception, not a `false`**. When `block` is true the agent loop returns immediately and the tool's `execute()` is never reached; the model receives an error result carrying the `reason` string. **Throwing also blocks**, deliberately: the dispatcher has no `try`/`catch` around this event, so a failing gate fails closed.

Dispatch is ordered and short-circuits on the first block. Project-local `.pi/extensions/` loads *before* global `~/.pi/agent/extensions/`, so a project extension runs first -- it cannot fabricate a permissive decision, since a non-blocking result does not stop iteration, but it can mutate `event.input` before a later gate inspects it.

**Other events that can block or rewrite:** `tool_result` (rewrite the result, cannot un-run the tool), `input` (continue, transform or handle), `context` (filter message history before every model call), `before_agent_start`, `before_provider_request`, `project_trust`, and the `session_before_*` family which can cancel. A lower harness layer exposes `before_tool` with the same blocking shape, and `before_drive`, which rethrows and aborts the run outright.

**Gate unattended runs on `agent_settled`, not `agent_end`.** `agent_end` closes one low-level run, and auto-retry, auto-compaction or a queued follow-up may still continue after it.

**`ctx.hasUI` is `false` in `json` and `print` modes.** Never make a block conditional on a confirmation dialog succeeding, or the gate silently disappears exactly where nothing is watching. The in-repo `protected-paths.ts` example is the better template than `permission-gate.ts`: it blocks unconditionally and treats the dialog as decoration.

**This is a policy layer, not a security boundary.** Pi ships no sandbox and says so; extensions run with the same permissions as the process. For an actual boundary, containerize.

## Configuration -- and the CLAUDE.md question

**Pi reads `CLAUDE.md` natively.** The candidate list, in order, is `AGENTS.override.md`, `AGENTS.md`, `AGENTS.MD`, `CLAUDE.md`, `CLAUDE.MD`. There is no flag and no compatibility mode; it is simply one of the accepted filenames.

Four caveats decide whether that is useful:

1. **One file per directory.** The first candidate that exists wins. A `CLAUDE.md` sitting beside an `AGENTS.md` is **never read**.
2. **`~/.claude/CLAUDE.md` is not on the search path.** The global slot is `~/.pi/agent/`. A personal Claude Code config is invisible to Pi.
3. **Ancestors are walked**, cwd upward to the filesystem root, so a solution-root `CLAUDE.md` is picked up for every repository beneath it.
4. **It is the filename only.** Every matching file is concatenated into a `<project_context>` block. Nothing else in the Claude Code configuration surface is understood -- not `.claude/settings.json`, not `.claude/commands/`, not `.claude/agents/`, not hooks.

So a `CLAUDE.md` written for Claude Code loads verbatim into Pi's prompt **including instructions that reference slash commands, `.claude/` paths and hooks Pi has no implementation for.** The file is portable; what it tells the agent to do frequently is not.

`SYSTEM.md` (in `.pi/` or `~/.pi/agent/`) *replaces* the built-in system prompt rather than appending, and does not suppress context files. `APPEND_SYSTEM.md` appends. `--no-context-files` disables discovery entirely.

## Skills -- the one genuinely portable asset

Pi implements the **Agent Skills standard**: a directory with a `SKILL.md` carrying `name` and `description` frontmatter. Claude Code skills follow the same standard, and Pi is deliberately *more* permissive -- it does not require `name` to match the directory, explicitly because that requirement is awkward for skill directories shared across harnesses.

Claude Code skills load into Pi with one settings line:

```json
{ "skills": ["~/.claude/skills"] }
```

Native locations include `~/.pi/agent/skills/`, `.pi/skills/`, and `~/.agents/skills/` -- the last being the same installer-managed store Claude Code uses. Skills also register as `/skill:<name>` commands.

## Not built in

- **Sub-agents.** The reference implementation is an example extension that spawns a child `pi --mode json -p --no-session` process per delegation, passing `--model`, `--tools` and `--append-system-prompt`, then parses the child's event stream. Agent definitions are markdown with `name` / `description` / `tools` / `model` frontmatter -- the same shape Claude Code uses.
- **A tool protocol.** Not implemented, by stated preference; the documented alternative is command-line tools with READMEs, surfaced as skills. Third-party extensions exist. An upstream issue proposing a built-in example was closed without landing.
- **A permission system.** There is no permission mode, no allowlist prompt, and correspondingly nothing to bypass. Constraint is `--tools` or containerization.

## Sources

[earendil-works/pi](https://github.com/earendil-works/pi) · [extensions](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/extensions.md) · [sdk](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/sdk.md) · [rpc](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/rpc.md) · [skills](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/skills.md) · [security](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/security.md) · [Agent Skills specification](https://agentskills.io/specification)
