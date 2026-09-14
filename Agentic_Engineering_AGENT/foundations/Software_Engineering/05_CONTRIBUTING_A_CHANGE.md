# 📝 Contributing a change

What a change publishes about itself, and to whom. The commit message, the pull request body, the changelog entry -- surfaces written once, read long afterwards, and **editable by nobody**.

Distinct from [code review](03_CODE_REVIEW.md), which evaluates whether a change is right. This is about what the change says it is.

## The message says what changed

**A short subject naming the change, then bullets -- one per thing that moved.** Someone reading history is scanning to locate a change, not being persuaded it was a good one, and prose defeats scanning in a way bullets do not.

**Over-explaining is the common failure, and it is not a harmless one.** Reasoning put into a message is reasoning put where it cannot be read in context, cannot be corrected, and will not be found by anyone looking for it. Why a change is right belongs in the changed files, in a design document, or in the discussion attached to the change -- all three of which can be revised when the reasoning turns out to be wrong. A message cannot.

So: if a bullet needs a paragraph to justify it, the paragraph belongs somewhere else. The test is whether a line describes **what moved** or **why it should have**.

**Nothing that is not what changed belongs in the message.** This is the general rule that covers generated footers, tooling signatures and authorship markers: none of them describe the change, so none of them are the message's content.

## What must never appear

- **Credentials and secrets.** Already stated at [`DevOps/02`](../DevOps/02_CREDENTIALS_AND_ENVIRONMENTS.md) and not restated here -- except for the part that file is about the files: **the message is a surface of its own.**
- **Anything belonging to an owner other than the repository's owner.** An organization's name, an identifier from its tracker, an internal hostname, a path from its infrastructure, a colleague's name. Where one repository is used to work on subjects belonging to several owners, this is the boundary, and the message is the half of it most easily forgotten.

## The message is not covered by whatever guards the files

Ignore rules, fenced directories and redaction all operate on **content**. A message is none of those things. The predictable failure is a repository whose files are scrupulously general and whose history names the organization, the ticket and the environment in plain text -- because the discipline was applied to what was being written and not to what was being said about it.

**Apply the same rule to the message that applies to the file it describes.** If a directory is fenced because of who owns it, the messages touching it are fenced by the same reasoning.

## History is not editable, whatever the interface suggests

**A later commit does not redact an earlier one.** Correcting a file leaves every prior version intact and reachable, and anyone who cloned already has it. The remedies are rewriting history or accepting the disclosure, and both are decisions for whoever owns the repository rather than for whoever noticed.

Two consequences worth holding while writing rather than afterwards:

- **The cost of a mistake here is paid at the moment it is pushed**, not when it is discovered. Review of a message is worth more than correction of one, because correction is mostly unavailable.
- **On finding something already published, report it and say plainly that it remains in history.** Quietly amending the current state and letting the report imply the exposure has ended is the specific failure -- it converts a known problem into an unknown one.
