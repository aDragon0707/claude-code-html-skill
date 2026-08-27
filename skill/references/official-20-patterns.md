# Official 20 HTML Effectiveness Patterns

This playbook distills Anthropic's `html-effectiveness` repository into reusable patterns. Do not copy the examples verbatim. Use their structure: each HTML file is a purpose-built artifact for one job.

## Pattern Matrix

| Official example | Job | Reusable shape |
|---|---|---|
| `01-exploration-code-approaches.html` | Compare implementation approaches | Equal-width columns, same internal sections, code snippet, pros/cons, metrics, recommendation |
| `02-exploration-visual-designs.html` | Compare UI directions | Grid of distinct rendered mockups, tradeoff caption, optional interaction/copy |
| `03-code-review-pr.html` | Review a PR | Findings first, severity lanes, annotated code/diff, test/risk matrix |
| `04-code-understanding.html` | Explain a code path | System map, flow steps, relevant files, annotated snippets |
| `05-design-system.html` | Portable design-system reference | Tokens, components, states, examples, usage rules |
| `06-component-variants.html` | Compare component variants | Variant matrix with controls for density/state/emphasis |
| `07-prototype-animation.html` | Feel an animation | Play/reset control, visible motion, copyable parameters |
| `08-prototype-interaction.html` | Test interaction feel | Native interaction such as drag/reorder, small focused prototype |
| `09-slide-deck.html` | Present a weekly/status story | Fullscreen slides, keyboard navigation, one point per slide |
| `10-svg-illustrations.html` | Generate visual assets | Multiple SVG variants, export buttons, locked palette/style |
| `11-status-report.html` | Brief project status | Status grid, shipped/moving/blocked, asks, ownership |
| `12-incident-report.html` | Explain incident | Impact, timeline, root cause, remediation, owners |
| `13-flowchart-diagram.html` | Explain pipeline/process | Clickable or annotated flowchart, steps and failure paths |
| `14-research-feature-explainer.html` | Explain feature internals | Expandable steps, code references, gotchas |
| `15-research-concept-explainer.html` | Teach concept interactively | Diagram plus sliders/controls showing how state changes |
| `16-implementation-plan.html` | Hand off implementation | Milestone strip, data-flow diagram, risky snippets, risk table, not-doing |
| `17-pr-writeup.html` | PR narrative for reviewers | Before/after, changed architecture, review guide, risks |
| `18-editor-triage-board.html` | Triage items | Drag Now/Next/Later/Cut, filter tags, counts, copy markdown |
| `19-editor-feature-flags.html` | Edit constrained config | Grouped toggles, dependency warnings, live diff, copy diff/full JSON |
| `20-editor-prompt-tuner.html` | Tune a prompt | Editable template, highlighted slots, live samples, char/token count, copy prompt |

## Pattern 1: Side-By-Side Comparison

Use for implementation approaches, architecture options, vendor choices, UX directions.

Required:

- Same structure in every option.
- Concrete artifact inside each option: code, mini mockup, diagram, or data.
- Pros/cons table, not only bullets.
- Metrics row.
- Final recommendation.

Do not provide three near-identical variations.

## Pattern 2: Visual Exploration Grid

Use when taste, layout, tone, density, or UI direction is undecided.

Required:

- Four to six meaningfully different rendered directions.
- Captions that name the tradeoff.
- Variation in layout and information hierarchy before color changes.
- Optional click-to-expand or copy-chosen-direction.

## Pattern 3: Code Review / PR Review

Use for review, PR description, risky logic, unfamiliar code.

Required:

- Findings first, ordered by severity.
- File/module map.
- Annotated snippets or diff fragments.
- Test evidence and missing tests.
- Reviewer guide: what to inspect first.

Do not dump a full diff.

## Pattern 4: Code/System Understanding

Use for "how does X work?"

Required:

- Diagram of the path or topology.
- Step list with file references.
- Annotated snippets for key boundaries.
- Gotchas and mental model.

## Pattern 5: Design System / Component Matrix

Use for design tokens, component references, variants, states.

Required:

- Tokens visible as swatches/specimens.
- Component states shown side by side.
- Controls for density/state/theme if useful.
- Usage rules and anti-patterns.

## Pattern 6: Prototype / Parameter Tuning

Use when the user needs to feel behavior.

Required:

- Live demo area.
- Controls that affect the demo.
- Play/reset when motion matters.
- Copy parameters when the user finds a good setting.

## Pattern 7: Diagram / Flowchart / Illustration

Use for workflows, pipelines, architecture, SVG assets.

Required:

- Inline SVG or HTML diagram.
- Labels for happy path and failure paths.
- Detail panel or annotation if the diagram has many steps.
- Export/copy if the output is an asset.

## Pattern 8: Report / Research / Incident

Use for status reports, incident reports, research synthesis, leadership updates.

Required:

- First viewport: status/conclusion and why it matters.
- Timeline for chronology.
- Impact, evidence, ownership, next actions.
- Risks or asks separated from narrative.

## Pattern 9: Implementation Plan

Use when the user wants a plan an implementer can execute.

Required:

- Milestones strip.
- Data-flow diagram.
- Risk table.
- Load-bearing code snippets.
- Acceptance criteria and verification.
- "Not doing" section.

## Pattern 10: Custom Editor

Use when a text box is the wrong interface.

Required:

- Pre-filled data.
- Direct manipulation controls.
- Live state, preview, diff, or counts.
- Copy/export button.
- Reset button for multi-step edits.
- Clipboard fallback for `file://`.

Example exports:

- Triage: markdown grouped by bucket.
- Config: diff and full JSON.
- Prompt: final prompt/template.
- Dataset: JSON/CSV of selected labels.

For project boards, separate planning export from execution export:

- Planning export can include the whole board.
- Execution export should default to one selected task, selected cards, or the current bucket.
- Changed-state export should include only what moved, changed, or was selected.

## Official Quality Test

A good artifact lets the user say:

"I can see the shape of the problem, change the important thing, and take the result back to my agent/team."

If the user only says "this is a prettier document," the artifact is not using HTML effectively.
