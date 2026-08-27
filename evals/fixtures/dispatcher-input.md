# Dispatcher Fixture Input

Source files:

- `Project/Dashboard.md`
- `Project/Worklogs/2026-05-30.md`
- `Project/Handoffs/current.md`

## Work Queue

| id | title | owner | status | bucket | blocker | evidence required | markdown target |
|---|---|---|---|---|---|---|---|
| T-001 | Tighten export controls | Codex | Ready | Now | none | files changed, checker output | `Project/Worklogs/2026-05-30.md` |
| T-002 | Review stale [[API Plan]] links | Claude Code | Backlog | Next | T-001 | list of stale links | `Project/Dashboard.md` |
| T-003 | Add #handoff receipt format | Gemini | Ready | Now | none | updated receipt example | `Project/AI/receipts.md` |
| T-004 | Verify mobile triage board | Human | Blocked | Later | needs screenshot | screenshot notes | `Project/Handoffs/current.md` |

Expected artifact:

- Per-card `Copy Task Prompt`.
- Per-card `Copy Markdown Update`.
- Visible `needs Markdown sync` indicator.
- `Done` requires evidence and Markdown write-back.
- Batch prompt is explicit and not the default.
