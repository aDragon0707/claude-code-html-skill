# Markdown And Obsidian Loop

Use this reference when the user wants HTML artifacts for long-term project management, repository memory, Obsidian vaults, MOCs, worklogs, dashboards, decision logs, `AGENTS.md`, `CLAUDE.md`, or AI handoff notes.

## Principle

Markdown is the source of truth. HTML is a generated working surface.

Use Markdown for:

- Durable facts.
- Decisions.
- Worklogs.
- MOCs and backlinks.
- Source-controlled project memory.
- Content future agents should search and edit.

Use HTML for:

- Review and sensemaking.
- Triage and prioritization.
- Visual timelines, dependency maps, and status matrices.
- One-off editing interfaces.
- Shareable reports.
- Exporting cleaned Markdown back into the project.

## Default Loop

1. Read the smallest set of relevant Markdown files.
2. Preserve source-of-truth order: latest user instruction, decision log, dashboard, handoff docs, worklogs, MOCs, historical notes.
3. Generate one HTML artifact focused on a concrete job: compare, review, triage, explain, or edit.
4. Include an export panel.
5. Export Markdown that can be pasted into the source file with minimal cleanup.
6. State exactly where the export belongs.

## Execution Loop

Use this when the HTML artifact is a project board or multi-agent dispatcher:

1. HTML board selects or exports the next task.
2. Codex/agent executes the task in the repo.
3. Agent records evidence: files changed, commands run, tests, unresolved risks.
4. Agent updates the relevant Markdown source of truth, such as a worklog, decision log, `AGENTS.md`, `CLAUDE.md`, dashboard, or MOC.
5. If needed, regenerate the HTML board from the updated Markdown.

The board does not execute. The board selects, explains, and exports. The agent executes. Markdown records.

## Export Formats

For Obsidian, preserve:

- `[[Wiki links]]`
- `#tags`
- `- [ ]` task checkboxes
- Heading hierarchy
- Dataview-friendly fields when the project already uses them
- Relative links if the vault uses them

Useful buttons:

- `Copy as Markdown`
- `Copy Obsidian Note`
- `Copy Worklog Entry`
- `Copy Decision Log Entry`
- `Copy AGENTS.md Patch`
- `Copy Handoff`
- `Copy Single Task Prompt`
- `Copy Selected Tasks`
- `Copy Now Bucket`

## Artifact Shapes

### MOC Review

HTML shows:

- Backlink map or section inventory.
- Stale/missing links.
- Suggested note moves.
- Copyable Markdown patch.

### Worklog Triage

HTML shows:

- Timeline.
- Done/Now/Next/Waiting buckets.
- Evidence links.
- Copyable daily worklog update.

After execution, update Markdown with:

```md
## YYYY-MM-DD Worklog

### Completed
- [x] Task name
  - Evidence: command/test/file path
  - Result: what changed

### Open Loops
- [ ] Remaining issue

### Next
- [ ] Next focused task
```

### Decision Review

HTML shows:

- Options side by side.
- Recommendation.
- Risks and evidence.
- Copyable decision-log entry.

### Handoff Packet

HTML shows:

- Current state.
- What changed.
- Evidence.
- Open loops.
- Next command.
- Stop conditions.
- Copyable handoff note.

### Multi-Agent Dispatcher

HTML shows:

- Work queue.
- Owner/agent column, such as Codex, Claude Code, Gemini, human.
- Blockers and dependencies.
- Evidence required before a task can be marked done.
- Per-task export prompt.
- Markdown target to update after completion.

Export rules:

- One prompt per agent/task by default.
- Batch prompts only for independent tasks with clear stop conditions.
- Include the Markdown file that must be updated after execution.
- Include evidence requirements, not just task prose.

## Anti-Patterns

- Treating generated HTML as the only place where project truth lives.
- Exporting prose that loses Obsidian links and task checkboxes.
- Creating a beautiful dashboard with no Markdown write-back path.
- Exporting one huge execution prompt when the user only wants a single selected task.
- Updating many Markdown files from HTML output without stating authority order.
- Mixing facts, guesses, and recommendations without labels.
