#!/bin/bash
# boot_memory.sh -- SessionStart hook.
#
# Runs the `boot memory` shortcut as the session opens, so the read order does not
# depend on an assistant remembering it. The stores live in one repo while sessions
# start in many, so nothing auto-loads them by proximity -- that is why this exists
# as a hook rather than as an instruction in a CLAUDE.md.
#
# Contract: plain text on stdout (the runtime injects it), ALWAYS exits 0.

set -u

ROOT="$HOME/Projects/Agentic_00/Agentic_Engineering_AGENT"

echo "RUNTIME TRIGGER -- boot memory. Do this before anything else, including before answering the first prompt."
echo
echo "Read in this order and stop there. Each file links whatever else matters, so do not traverse further unless a link says to."
echo
echo "  1. $ROOT/.memory/running_context.md"
echo "     Where things stand, which rules are in force, and a link to any handoff note the last session left."
echo "  2. $ROOT/.memory/todo_list.md"
echo "     The single master list of open work, grouped by what owns it. There is no second todo list anywhere."
echo "  3. $ROOT/.workgroup/<repo>/README.md"
echo "     For the repo this session is working in -- runtime, ports, service and tooling dependencies, branch, tracker."
echo "     PLUS each repo named in its SERVICE_DEPS. Do NOT read every member's file."
echo "     For topology questions rather than repo questions, read .workgroup/__SOLUTION__/MAP.md instead."

if [ ! -d "$ROOT/.memory" ]; then
  echo
  echo "!!! $ROOT/.memory does not exist. These stores are gitignored, so this is what a fresh clone looks like. Say so rather than proceeding as if there were no carried-forward state."
fi

cat <<'TXT'

Then report in three buckets, and wait:

  IN FLIGHT / BLOCKED / NEXT

  - Every item carries a concrete identifier -- ticket id, PR number, commit SHA, file path, SLA date. "The approval is stale" is weak; "neilzo approved 560c5ce, head is now c03bb619e9" is useful.
  - Name the owner or blocker, so what is his to move is obvious.
  - Re-verify anything volatile before reporting it as current -- a PR state, a branch head, whether the stack is up. These files are read as current by default, which is exactly what makes a stale line expensive.
  - Name what looks stale rather than relaying it.
  - State confidence honestly: "hazard, unreproduced" rather than dressing it up as confirmed.

The test of success: state the current urgent ticket, the branch it is cut from, and the environment hazards a cold session would trip over -- without being prompted for any of the three. If one cannot be answered from the files, say WHICH, rather than filling the gap with something plausible.

This is a gather, not a start-work instruction. Report and wait for the go-ahead.
TXT
exit 0
