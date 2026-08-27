# Claude Code HTML Skill

Chinese version: [README.md](README.md)

A local Codex / Claude Code skill for turning complex project work into **readable, interactive, exportable** single-file HTML artifacts while keeping Markdown / Obsidian as the long-term source of truth.

It is inspired by Anthropic's article [Using Claude Code: The unreasonable effectiveness of HTML](https://claude.com/blog/using-claude-code-the-unreasonable-effectiveness-of-html), the official example gallery [anthropics/html-effectiveness](https://github.com/anthropics/html-effectiveness), and the community `html-artifacts` skill pattern.

## What user pain does it solve?

This skill is for the moments when Markdown starts to feel too flat:

- An AI writes a 200-line Markdown plan and nobody wants to read it.
- Project state is scattered across Obsidian, worklogs, handoffs, and chat history.
- A board helps you see tasks, but cannot export one focused prompt for one AI worker.
- PR reviews, architecture options, incident reports, and explainers need visual structure.
- HTML is easier to review, but durable project memory still belongs in Markdown.

The core model:

```text
Markdown = long-term memory / source of truth / Obsidian graph
HTML = working surface / visual review / editor / dispatcher / exporter
```

## What does it generate?

The skill routes the task to the right artifact shape instead of blindly "making a webpage."

Supported patterns:

- Side-by-side implementation comparisons
- Visual design explorations
- PR and code-review artifacts
- Code-path and system explainers
- Design-system and component matrices
- Animation and interaction prototypes
- SVG diagrams, flowcharts, architecture maps
- Status reports, incident reports, research explainers
- Paper publication pages: convert PDF, DOCX, or Markdown research papers into long-form HTML with a visual chapter index, author metadata, sticky contents, wide evidence figures, and complete captions
- Implementation plans with milestones, data flow, risks, and non-goals
- One-off editors: triage boards, feature flags, prompt tuners
- Markdown / Obsidian write-back loops
- Multi-AI dispatch boards with per-task prompt export
- A complete solo multi-AI operating loop: task assignment, single-task prompt export, execution receipt, Markdown write-back, Obsidian sync, and status tracking

### Architecture diagrams with Archify

For architecture, workflow, sequence, dataflow, and lifecycle diagrams, this skill bundles an Archify renderer that produces validated, self-contained HTML.

```text
Claude Code HTML Skill = task routing and HTML artifact workflow
Archify = specialized diagram renderer and validator
```

Supported diagram types:

| Type | Use for |
|---|---|
| `architecture` | Services, components, infrastructure, and security boundaries |
| `workflow` | Processes, approvals, tool calls, and runbooks |
| `sequence` | API call chains, request/response, and async flows |
| `dataflow` | ETL, data pipelines, lineage, and consumers |
| `lifecycle` | States, retries, waiting, and terminal outcomes |

## Design principles

1. **Start with the user's job**  
   Compare, review, explain, tune, edit, present, hand off, or export.

2. **Do not make generic dashboards**  
   If the artifact has no primary action, do not use HTML.

3. **Editors must export**  
   Use `Copy as Markdown`, `Copy diff`, `Copy prompt`, or `Copy JSON`.

4. **Execution prompts must be scoped**  
   Do not dump every task into one prompt. Support single-task, selected-task, Now-bucket, changed-diff, and full-planning exports separately.

5. **Durable state goes back to Markdown**  
   The HTML board is not the record. After execution, update Obsidian, worklogs, decision logs, `AGENTS.md`, or `CLAUDE.md`.

## Installation

Copy `skill/` into your Codex skills directory:

```powershell
Copy-Item -Recurse .\skill "$env:USERPROFILE\.codex\skills\claude-code-html-skill"
```

The Archify runtime is included in `skill/vendor/archify/`; no separate Archify installation is required. Archify commands require Node.js `>=18`.

Restart Codex or open a new session. Then type `/` and search:

```text
Claude Code HTML Skill
```

## Example prompts

### Option comparison

```text
Use Claude Code HTML Skill to compare three implementation approaches for this sync queue. I want side-by-side complexity, risk, test cost, and a recommendation.
```

### PR review

```text
Use Claude Code HTML Skill to create an HTML review artifact for this PR. Lead with blocking findings, then show a module map, key diff snippets, and test gaps.
```

### Obsidian project management

```text
Use Claude Code HTML Skill to read my Obsidian project MOC and worklog, then generate an HTML triage board. It must export one focused Codex prompt and a Markdown worklog section to write back.
```

### Multi-AI dispatch

```text
Use Claude Code HTML Skill to split the current project into a multi-AI dispatch board. Each task needs owner, blocker, evidence required, target markdown note, and a copyable single-task prompt.
```

This mode is not "put every task into one giant prompt." The default export is one focused task prompt. After execution, the worker returns an execution receipt and updates the Markdown/Obsidian record.

### Paper publication page

```text
Use Claude Code HTML Skill to turn this paper into a self-contained offline HTML publication. Preserve authors, numbered sections, equations, figures, captions, citations, and limitations; use a visual chapter index, sticky contents, and wide evidence figures for long-form reading.
```

This pattern borrows publication grammar from Anthropic Transformer Circuits research pages while explicitly forbidding reuse of their logo, mascot, paper text, or article-specific illustrations.

### Chinese architecture workflow

```text
Use Claude Code HTML Skill to turn this project's request path into a Chinese workflow diagram.
Requirements:
- use the Archify workflow renderer;
- preserve real API names and code identifiers;
- run validate before deliver;
- output one self-contained offline HTML file.
```

See [`skill/references/archify-integration.md`](skill/references/archify-integration.md) for the detailed routing and validation workflow.

Diagram artifacts are validated before delivery. A showcase pass requires 9/9 artifact checks, zero composition errors, zero warnings, and a self-contained HTML output.

## Structure

```text
skill/
  SKILL.md
  agents/
    openai.yaml
  references/
    paper-publication.md
    official-20-patterns.md
    official-details.md
    markdown-obsidian-loop.md
    solo-multi-ai-workflow.md
    ecosystem-comparison.md
    custom-editors.md
    exploration-and-planning.md
    code-review-and-pr.md
    design-and-prototypes.md
    diagrams-and-illustrations.md
    reports-and-research.md
    decks.md
    matching-your-style.md
  assets/
    paper-publication-template.html
  vendor/
    archify/
      bin/
      renderers/
      schemas/
      examples/
      LICENSE
```

## Relationship to official and community work

This is not an official Anthropic project.

It references:

- Anthropic article: [Using Claude Code: The unreasonable effectiveness of HTML](https://claude.com/blog/using-claude-code-the-unreasonable-effectiveness-of-html)
- Anthropic examples: [anthropics/html-effectiveness](https://github.com/anthropics/html-effectiveness)
- Anthropic Transformer Circuits research page: [Verbalizable Representations Form a Global Workspace in Language Models](https://transformer-circuits.pub/2026/workspace/index.html)
- Anthropic skills / artifact builder ideas: [anthropics/skills](https://github.com/anthropics/skills)
- Community skill: [dogum/html-artifacts](https://github.com/dogum/html-artifacts)

This repo adds:

- A routable playbook distilled from the official 20 HTML examples
- Markdown / Obsidian source-of-truth loops
- Multi-AI dispatch and per-task prompt export rules
- User-experience-first constraints: less wall-of-text, less lost context, fewer giant omnibus prompts

Archify validation proves diagram structure and layout checks, not the truth of a real repository's topology. When diagrams represent real code, inspect and cite repository evidence. Mermaid input is converted into fresh Archify JSON; Mermaid styling is not copied mechanically.

## License

Apache-2.0. See [LICENSE](LICENSE).

The bundled Archify runtime is MIT-licensed. See [`skill/vendor/archify/LICENSE`](skill/vendor/archify/LICENSE).
