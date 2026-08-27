# Markdown Roundtrip Fixture Input

Target note: `Project/Worklogs/2026-05-30.md`

## [[Project MOC]] Status #launch

### Completed

- [x] T-000 Establish source-of-truth loop
  - Evidence: `Project/Dashboard.md`

### Now

- [ ] T-001 Preserve [[API Plan]] links in exported Markdown
- [ ] T-002 Keep #handoff tag when copying worklog updates

### Decision

Use HTML as the temporary review surface. Markdown remains the durable record.

Expected export:

- Preserve `[[Project MOC]]` and `[[API Plan]]`.
- Preserve `#launch` and `#handoff`.
- Preserve `- [ ]` and `- [x]`.
- Preserve heading hierarchy.
- Name the target note in the export panel.
