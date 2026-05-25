---
name: claude-code-html-skill
description: Create official-style self-contained HTML artifacts inspired by Anthropic's html-effectiveness examples and Claude Code HTML workflow. Use aggressively for substantial docs, plans, specs, reports, explainers, comparisons, PR reviews, code understanding, design explorations, component matrices, prototypes, diagrams, slide decks, status or incident reports, implementation plans, PR writeups, and one-off editors for triage, feature flags, prompts, configs, datasets, tickets, or priorities. This skill should choose the right artifact pattern from the official 20-example playbook, build a single offline .html file, and include interactive controls or copy/export affordances whenever the user needs to manipulate or round-trip state. Stay in chat/markdown only for short answers, code-only snippets, terminal output, or content that is only a few sentences.
---

# Claude Code HTML Skill

Use this skill to turn dense agent work into a readable, visual, shareable, and sometimes editable HTML artifact. The model is Anthropic's `html-effectiveness` examples: HTML is valuable when it reveals shape, comparison, flow, state, risk, or interaction that markdown flattens.

This is not "always make a webpage." It is a routing skill: pick the official-style artifact pattern that matches the user's job.

## First Decide The Job

Before writing HTML, name the primary job in one sentence:

- Compare options.
- Explore visual directions.
- Review code or a PR.
- Explain a code path, system, incident, or concept.
- Prototype an interaction, animation, or UI component.
- Generate a status report, incident report, slide deck, or leadership brief.
- Create an implementation plan.
- Build a one-off editor that lets the user manipulate state and copy/export the result.

If there is no concrete job, use markdown or ask what decision/action the artifact should support.

## Official Pattern Router

Use `references/official-20-patterns.md` as the main playbook. It maps the 20 official examples into reusable artifact shapes. Use `references/official-details.md` when you need official boundary rules: artifact criteria, simple HTML vs React builder, testing tradeoffs, sharing/export, and subagent coordination.
Use `references/ecosystem-comparison.md` when the user asks how this skill compares to GitHub repos, Obsidian plugins, markdown-viewer tools, or market alternatives.

Quick routing:

| User request | Pattern | Load |
|---|---|---|
| "compare approaches", "explore options", "which design direction" | Side-by-side comparison or visual exploration | `references/official-20-patterns.md`, `references/exploration-and-planning.md` |
| "review this PR", "write PR explainer", "explain this code path" | Code review / code understanding | `references/official-20-patterns.md`, `references/code-review-and-pr.md` |
| "make a design system reference", "component variants", "prototype interaction/animation" | Design/prototype artifact | `references/official-20-patterns.md`, `references/design-and-prototypes.md` |
| "draw diagram", "flowchart", "architecture map", "SVG illustration" | Diagram / illustration | `references/official-20-patterns.md`, `references/diagrams-and-illustrations.md` |
| "status report", "incident report", "research explainer", "teach me" | Report / research / explainer | `references/official-20-patterns.md`, `references/reports-and-research.md` |
| "implementation plan" | Plan with timeline, data flow, risk table, not-doing section | `references/official-20-patterns.md`, `references/exploration-and-planning.md` |
| "deck", "slides" | Arrow-key deck | `references/official-20-patterns.md`, `references/decks.md` |
| "triage/reorder/tune/edit/config/flags/prompt/dataset" | Custom editor with export | `references/official-20-patterns.md`, `references/custom-editors.md` |
| "Obsidian", "MOC", "worklog", "AGENTS.md", "CLAUDE.md", durable project docs, long-term project memory | Markdown source of truth with HTML review/editor companion | `references/markdown-obsidian-loop.md` |
| "complex app", "routing", "state management", "shadcn", "React artifact", "multi-component artifact" | Consider complex web artifact builder instead of simple HTML | `references/official-details.md` |
| "multiple AI", "subagents", "agent team", "dispatcher", "coordinate workers", "one person managing multiple AIs" | Solo multi-AI operating loop: HTML dispatcher + focused prompts + Markdown ledger | `references/solo-multi-ai-workflow.md`, `references/markdown-obsidian-loop.md`, `references/official-details.md` |
| "compare this with GitHub/community tools", "market alternatives", "what is different" | Ecosystem comparison | `references/ecosystem-comparison.md` |
| "Obsidian vs HTML", "markdown vault", "long-term memory vs artifact" | Markdown/HTML hybrid workflow | `references/markdown-obsidian-loop.md`, `references/ecosystem-comparison.md` |

For mixed requests, combine two patterns only when both serve the same job. Do not create a generic dashboard with every section.

## Universal Artifact Rules

Every artifact must satisfy:

1. Single self-contained `.html` file. Inline CSS and JS. No build step.
2. Works offline. Avoid external CDNs unless the user explicitly wants them.
3. Mobile responsive enough to not break.
4. First viewport explains the job and the interaction.
5. Use the format, not markdown wrapped in tags: columns for comparisons, timelines for time, diagrams for flow, matrices for variants, editors for state.
6. Concrete content from the task. Avoid placeholder SaaS boilerplate.
7. If the user manipulates state, include copy/export. This is non-negotiable.
8. If the user is managing long-term project memory, keep Markdown as the source of truth and use HTML as a generated review/editor/export surface.

Prefer simple single-file HTML for most Claude Code project artifacts. Escalate to a React/Vite-style artifact only when the artifact genuinely needs multi-component state, routing, or a component library. See `references/official-details.md`.

## First-Viewport Test

The top of the page should answer within five seconds:

- What is this artifact for?
- What should I do with it?
- What is already pre-filled?
- What can I inspect/change?
- What can I copy/export?

If this is unclear, simplify before adding more sections.

## Output Mechanics

Save the file in the working directory using a descriptive kebab-case `.html` filename, for example:

- `cycle-14-triage.html`
- `streaming-pr-review.html`
- `comment-threads-implementation-plan.html`
- `feature-flags-editor.html`
- `prompt-tuner.html`

After saving, tell the user the absolute path. If the page is already open in a browser, tell the user to refresh.

## Custom Editor Rules

For any editor, build the export first:

- Copy as markdown for planning/order/triage.
- Copy diff for config/flags.
- Copy prompt for prompt/template tuning.
- Copy JSON/CSV for structured data.

Use `navigator.clipboard.writeText` plus a textarea fallback because local `file://` pages may not have clipboard permission.

Do not make one giant prompt the only export. Match export scope to the user's next action:

- **Single selected item**: copy a focused Codex prompt for exactly that task.
- **Current bucket**: copy a batch prompt for only `Now` or only selected items.
- **Changed items only**: copy a diff or patch.
- **Whole board**: copy planning markdown for docs, not an execution prompt.
- **Obsidian sync**: copy the Markdown section that should be written back after execution.

For task boards, provide selection controls or per-card copy buttons when the user may execute one task at a time.

## Markdown And Obsidian Loop

When the user mentions long-term project docs, Obsidian, MOCs, worklogs, `AGENTS.md`, `CLAUDE.md`, dashboards, decision logs, or handoff notes, do not treat HTML as the durable source of truth. Use this loop:

1. Read Markdown source files.
2. Generate an HTML artifact for review, comparison, triage, visualization, or editing.
3. Include `Copy as Markdown`, `Copy Obsidian note`, or `Copy patch` output.
4. Clearly label which exported content should be written back to which Markdown file.
5. Preserve Obsidian-style links such as `[[Project MOC]]`, tags, headings, and task checkboxes when exporting.

The mental model: Markdown is the database and long-term memory; HTML is the dashboard, editor, explainer, or meeting room.

After executing a task, update Markdown. A project-management HTML artifact should not be the final record. The agent should write the completed result, evidence, changed files, next actions, and open loops back to the relevant Markdown note or ask the user before doing so when the target is unclear.

For one person coordinating multiple AI agents, use HTML as the dispatcher:

- Show work items, owners, blockers, and evidence.
- Export one focused prompt per worker/agent.
- Track which Markdown note each result must update.
- Keep decision logs and worklogs in Markdown so every agent can reload context without needing the HTML UI.

For a unified solo multi-AI workflow, read `references/solo-multi-ai-workflow.md`. It defines the full loop: task assignment, single-task prompt export, execution receipt, Markdown write-back, Obsidian sync, and status tracking.

## Quality Bar

Before finalizing, check:

- Is there one primary job?
- Does the layout match the job?
- Is the first screen self-explanatory?
- Are comparisons side by side?
- Are diagrams near the text they explain?
- Are interactions load-bearing rather than decorative?
- Does edited state export correctly?
- For project memory tasks, does the artifact preserve a clean path back into Markdown/Obsidian?
- Are facts, inference, risks, and recommendations visually distinct?
- Does the HTML open without external dependencies?

## Anti-Patterns

Avoid:

- A generic dashboard with metrics and cards but no task.
- Long markdown translated into HTML.
- A task board with no clear meaning or export.
- Pretty but non-functional controls.
- Requiring the user to paste data that the prompt already provided.
- Hiding warnings until after export.
- Refusing to recommend when the user asked for comparison.
