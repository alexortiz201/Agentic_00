# 🅰️ Claude Code

Anthropic's coding agent. Closed source, available as a terminal CLI, desktop and web app, and IDE extensions.

> **Verified 2026-09-13.** Closed source, so every claim here rests on documentation and observed behaviour rather than on reading the implementation -- which is a weaker basis than the Pi report and should be treated as such.

The design is the inverse of Pi's: capabilities ship in the product and are configured rather than composed. That means most of the surface below is satisfied out of the box, and the cost is that the ones it does not satisfy are harder to add.

## Against the capability surface

| Capability | Provided | How |
|---|---|---|
| Bounded invocation | Yes | `claude -p "prompt"` headless; `--output-format stream-json` for an event stream |
| Model selection per call | Yes | `--model` flag, or `model:` frontmatter on a skill or subagent definition |
| Tool constraint per call | Yes | `--allowedTools` / `--disallowedTools`, `permissions` in `settings.json`, and a `tools:` list in a subagent definition |
| Structured return | Partly | No provider-level constrained decoding exposed. A tool with a schema is the practical route, and `--output-format json` returns a single result object |
| Distinguishable failure | Yes | Non-zero exit on failure; the stream-json result object carries an error flag |
| Retained transcript | Yes | Session transcripts on disk; the stream-json event log |

## Gating -- configured, and enforced by the harness

Gating has two mechanisms, and they sit at different levels.

**Permissions** are declarative, in `settings.json` -- allow and deny rules matched against tool invocations, with a permission mode governing how unmatched calls are treated. This is the mechanism most work uses, and it requires no code.

**Hooks** are configured commands that fire at lifecycle events. A `PreToolUse` hook runs before a tool executes and **can deny the call** by its exit status and output, which is the direct counterpart to Pi's blocking `tool_call` event. Other events cover session start, user prompt submission, post-tool, and stop.

The important structural difference from Pi: **a Claude Code hook is a configured external command, not a typed function in the same process.** It receives JSON on stdin and answers by exit code and stdout. That makes it language-agnostic and easy to wire, and it means the decision is not a typed object your controller shares a type system with.

**A hook can tighten but never loosen.** `PreToolUse` fires *before* the permission-mode check; a hook denial holds even under the most permissive mode, and a hook approval does not override a deny rule. That asymmetry is deliberate and is the property worth relying on.

**Interactive affordances exist and unattended runs do not get them.** Permission prompts assume a human. In headless runs the permission mode decides, and there is a flag that bypasses prompts entirely -- which is a real gate removed, not a formality, and belongs nowhere near an unattended run that can write.

## Configuration

- **`CLAUDE.md`** is the project instruction file, discovered in the working directory and ancestors, plus `~/.claude/CLAUDE.md` for personal global instructions and a managed policy location for organisation-wide ones. **It enters as a message in the conversation, not as part of the system prompt** -- which is why it is re-read from disk and re-injected after compaction rather than simply persisting.
- **`.claude/settings.json`** holds permissions, hooks, environment and model configuration, with a `settings.local.json` for personal overrides.
- **`.claude/commands/*.md`** are slash commands -- named prompt files invoked as `/name`.
- **`.claude/agents/*.md`** are subagent definitions, frontmatter carrying `name`, `description`, `tools`, `model`.
- **`.claude/skills/`** and `~/.agents/skills/` hold skills as `SKILL.md` directories following the Agent Skills standard. Only the **description** is present at startup; the body enters as a message when the skill is invoked, and then persists. **Skill descriptions do not reload after compaction** -- only the skills actually invoked survive it.
- **Output styles** modify the system prompt itself, unlike everything above.
- **`--system-prompt`** replaces the default system prompt; **`--append-system-prompt`** adds to it.

Where each of these lands, and what that costs, is tabulated against Pi in [`equivalents.md`](equivalents.md).

## Built in, and worth knowing are not portable

These are genuine advantages of the harness and each is a portability liability. Using them is fine; **depending on them silently is not.**

- **Sub-agents** are first class. A definition file is enough; the harness handles spawning, isolation of context, and returning a result.
- **A tool protocol** is built in, with configured servers exposing tools directly to the agent.
- **Hooks** are configured rather than written, so a gate is a settings entry rather than a program.
- **Plugins** bundle commands, agents, skills and hooks as an installable unit.

## Sources

[Claude Code documentation](https://docs.anthropic.com/en/docs/claude-code) · [Agent Skills specification](https://agentskills.io/specification)
