# Solo Multi-AI Operating Loop

Use this reference when one person wants to coordinate multiple AI agents or sessions using HTML artifacts plus Markdown/Obsidian as the long-term record.

## Core Model

One human can act as a project lead for several AI workers.

- HTML is the dispatcher and control room.
- Each AI gets one focused task prompt.
- The agent executes in its own tool/session.
- The agent returns an execution receipt.
- Markdown/Obsidian records the durable state.
- The HTML board can be regenerated from Markdown after state changes.

Do not treat the HTML board as the source of truth. It is a generated operating surface.

## The Five-Part Loop

### 1. Task Assignment

The HTML dispatcher should show:

- Task id.
- Task title.
- Owner/agent: Codex, Claude Code, Gemini, human, or unassigned.
- Status: Backlog, Ready, Assigned, Running, Review, Done, Blocked, Dropped.
- Priority or bucket: Now, Next, Later, Cut.
- Dependencies/blockers.
- Evidence required.
- Target Markdown note to update after completion.
- Stop condition.

The board may support drag/drop and filters, but the meaning of each move must be explicit.

### 2. Single-Task Prompt Export

Default export should be one task, not the entire board.

Every task card should be able to export a focused prompt:

```md
# Task: <task id> - <task title>

## Goal
<one concrete outcome>

## Context
- Repo/path:
- Relevant files:
- Current decision:
- Constraints:

## Scope
Do:
- ...

Do not:
- ...

## Evidence Required
- Files changed:
- Commands/tests to run:
- Output or screenshot if relevant:

## Markdown Write-Back
After execution, update:
- <target markdown file or Obsidian note>

Use this format:

### Completed
- [x] <task id> <task title>
  - Result:
  - Evidence:
  - Files changed:
  - Tests:
  - Remaining risk:

## Stop Conditions
- Stop and ask before:
- Do not modify:
```

Batch export is allowed only for independent tasks with clear stop conditions. Label it as a batch prompt, not the default.

### 3. Execution Receipt

Every AI worker should return a compact receipt:

```md
# Execution Receipt

Task: <task id>
Agent/session:
Status: done | blocked | partial

## Changed
- file/path

## Evidence
- command/test/result

## Decisions
- ...

## Open Loops
- ...

## Markdown Updated
- yes/no
- target file:
```

This receipt is what the human or dispatcher uses to update project state.

### 4. Markdown / Obsidian Write-Back

After execution, update the durable Markdown layer.

Common targets:

- Daily worklog.
- Project dashboard.
- MOC.
- Decision log.
- Handoff note.
- `AGENTS.md` or `CLAUDE.md` when operating instructions changed.

Use minimal targeted edits. Do not rewrite whole notes unless the user asks.

Preserve Obsidian syntax:

- `[[Wiki links]]`
- `#tags`
- `- [ ]` and `- [x]` tasks
- Headings
- Dataview fields if already used

### 5. Status Tracking

The board state should be derived from Markdown or explicitly exported back to Markdown.

Recommended state machine:

- Backlog: known but not selected.
- Ready: clear enough to assign.
- Assigned: exported to an agent.
- Running: agent is working.
- Review: receipt returned, needs human review.
- Done: Markdown updated and evidence recorded.
- Blocked: waiting for input or dependency.
- Dropped: intentionally not doing.

Do not mark Done from the board alone. Done requires evidence and Markdown write-back.

## HTML Dispatcher Requirements

A good dispatcher artifact includes:

- Filters by status, owner, priority, blocker, and Markdown target.
- Per-task `Copy Prompt`.
- Per-task `Copy Markdown Update`.
- `Copy Selected Prompts` for carefully selected independent tasks.
- `Copy Daily Worklog Update`.
- `Copy Decision Log Entry` when a decision changed.
- A visible "needs Markdown sync" indicator.

Avoid one giant "next Codex prompt" that contains every task.

## Obsidian Layout Recommendation

Use a stable Markdown structure:

```text
Project/
  MOC.md
  Dashboard.md
  Decisions/
    YYYY-MM-DD-decision.md
  Worklogs/
    YYYY-MM-DD.md
  Handoffs/
    current.md
  AI/
    receipts.md
```

The HTML dispatcher should point each task to one of these Markdown targets.

## When To Regenerate HTML

Regenerate the dispatcher when:

- A batch of tasks completes.
- Markdown source-of-truth changed materially.
- New blockers appear.
- Ownership changes.
- The human wants a planning/review session.

Do not keep hand-editing an old HTML board forever. The board is a rendered working view.

## Anti-Patterns

- A board that looks useful but has no per-task export.
- One prompt that asks one AI to do every task.
- Marking Done without evidence.
- Updating HTML but not Markdown.
- Letting different AI sessions invent conflicting project truth.
- Losing Obsidian links in exported updates.
