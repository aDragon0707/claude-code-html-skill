# Ecosystem Comparison

Use this reference when the user asks how the skill compares to official Anthropic materials, GitHub repos, Obsidian plugins, or adjacent market tools.

## What to Compare

### 1. Official Anthropic `html-effectiveness`

Strengths:

- Best source for artifact shapes.
- Demonstrates the 20 core patterns directly.
- Shows what "official style" looks like in practice.

Gap:

- It is a gallery, not a routing skill.
- It does not tell the model how to pick a pattern from a real user request.
- It does not define Markdown/Obsidian round-trip behavior.

### 2. Official Anthropic `web-artifacts-builder`

Strengths:

- Strong for complex, multi-component, React-style artifacts.
- Clear line between simple HTML and richer app artifacts.
- Official guidance on bundling to a single HTML file.

Gap:

- It is optimized for larger app-like artifacts, not quick project triage.
- It is heavier than needed for most project-memory and documentation tasks.

### 3. Community `html-artifacts` / `Claude Code HTML Skill`

Strengths:

- Good general-purpose HTML artifact routing.
- Good official-pattern imitation.
- Works as a local skill.

Gap:

- Needs stronger export scoping for single-task execution.
- Needs clearer Markdown/Obsidian source-of-truth loop.
- Needs multi-agent dispatcher rules for one person managing several AI workers.

### 4. Obsidian Dashboard / Viewer / Export Plugins

Examples from the ecosystem:

- Dashboard / navigator plugins.
- Markdown viewing and richer rendering plugins.
- Table and timeline plugins.
- Export plugins that turn Markdown into other formats.

Strengths:

- Excellent for durable Markdown-first knowledge bases.
- Great at search, backlinking, stats, tables, and local-first memory.
- Better than HTML for long-term editable notes.

Gap:

- Usually not designed as AI task dispatchers.
- Often focus on viewing/rendering instead of round-tripping decisions back to an agent.
- Rarely integrate prompt export for one-task execution.

### 5. Market Adjacent Tools

Examples:

- Notion-style databases.
- Trello/Linear-style boards.
- Markdown viewers and document exporters.
- AI artifact builders and dashboard tools.

Strengths:

- Good for human team workflows.
- Good for dashboards, tables, and planning.

Gap:

- Usually not local-first Markdown source-of-truth systems.
- Usually not optimized for agent round-trip workflows.
- Often separate planning from execution instead of closing the loop.

## The Best Hybrid

For this skill, the most useful hybrid is:

- Official HTML-effectiveness shapes for the UI.
- `web-artifacts-builder` only when complexity requires it.
- Obsidian/Markdown plugins for durable memory.
- A local skill router that knows when to use each surface.

## Obsidian-Specific Comparison

Obsidian is strongest when the problem is durable personal or team knowledge.

Official Obsidian patterns worth preserving:

- Vault data lives on disk and is easy to version.
- Internal links and backlinks are first-class.
- Graph and search help navigate long-lived memory.
- Markdown remains the native storage format.

That makes Obsidian the better home for:

- Long-term project notes.
- Decision logs.
- Worklogs.
- MOCs and backlink hubs.
- Searchable knowledge networks.

Obsidian is weaker for:

- Ephemeral triage surfaces.
- One-off visual comparisons.
- Drag/drop or live-preview editing.
- AI dispatch panels that need task-level export prompts.

Use HTML as the operational layer on top of Obsidian, not a replacement for it.

## GitHub / Community Comparison

Compared with community `html-artifacts` style skills:

- This skill routes by task shape instead of just by "make HTML".
- It separates official patterns from official boundary rules.
- It adds Markdown/Obsidian write-back logic.
- It treats multi-agent coordination as a first-class use case.

Compared with `web-artifacts-builder`:

- This skill defaults to simple single-file HTML.
- `web-artifacts-builder` is for more complex React-style artifacts.
- Both aim to produce a shareable artifact, but they sit at different complexity levels.

## Market Tool Comparison

Versus Notion / Trello / Linear:

- Those are better at live team workflows and shared databases.
- This skill is better at generating a task-specific artifact from an agent.
- Those tools manage ongoing collaboration.
- This skill closes the loop back into Markdown and the agent.

Versus pure Markdown workflows:

- Markdown is better for durability, search, diff, and Obsidian backlinks.
- HTML is better for decision-time interaction and visualization.
- The combined system is stronger than either alone.

## What To Upgrade Next

Keep strengthening the skill in three directions:

1. Better export scoping.
2. Better Markdown/Obsidian write-back templates.
3. Better routing between simple HTML and complex artifact builders.

## Design Decisions To Keep

- HTML is the working surface, not the record.
- Markdown is the record, not the prettifier.
- Export scope must match the next action.
- Multi-agent coordination must export focused prompts, not a giant omnibus prompt.
- The artifact should point back to the Markdown file that must be updated after execution.
