# 🚀 DevOps -- the environment the code runs in, and the path it takes to get there

Isolation, environments, credentials, release and rollback, and the infrastructure agents are given to work inside.

**Sandboxing an agent lives here**, and it is the reason this area exists. An agent that can reach a real environment with real credentials is a production concern before it is an agentic one, and the practices that contain it -- ephemeral workspaces, scoped short-lived credentials, declared and tested boundaries -- are operations practices that existed long before anything was delegated to a model.

## What belongs here

The test in [`foundations/README.md`](../README.md) asks whether a statement survives removing agents. That question sorts engineering from agentic work, but it cannot sort this area, because everything here survives it. So a second question runs after it:

**Does this concern the code itself, or the environment it runs in and the path it takes to get there?**

The environment and the path are here. The code is [`Software_Engineering/`](../Software_Engineering/README.md).

Concretely: isolation and sandboxes, environments and the movement of data between them, credential lifecycle, release, deploy, rollback, CI pipelines, and the observability of running systems. A rule about *what a test asserts* is engineering; a rule about *what the machine running it is allowed to reach* is here.

## Topics in scope but not yet written

Named so a reader can tell missing from hidden. If you want one of these, it is not here yet: isolation and sandboxing, credential lifecycle, environments and data movement, release and rollback, CI gating, observability.

Material for all of these currently sits in [`Agentic_Engineering/03_AUTHORITY_AND_SAFETY.md`](../Agentic_Engineering/03_AUTHORITY_AND_SAFETY.md) and [`05_RECOVERY_AND_HANDOFF.md`](../Agentic_Engineering/05_RECOVERY_AND_HANDOFF.md), and moves here as each topic is worked in depth rather than all at once. A topic earns a file when it is being dug into, not when it is mentioned.
