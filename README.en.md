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
- Implementation plans with milestones, data flow, risks, and non-goals
- One-off editors: triage boards, feature flags, prompt tuners
- Markdown / Obsidian write-back loops
- Multi-AI dispatch boards with per-task prompt export

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

## Structure

```text
skill/
  SKILL.md
  agents/
    openai.yaml
  references/
    official-20-patterns.md
    official-details.md
    markdown-obsidian-loop.md
    ecosystem-comparison.md
    custom-editors.md
    exploration-and-planning.md
    code-review-and-pr.md
    design-and-prototypes.md
    diagrams-and-illustrations.md
    reports-and-research.md
    decks.md
    matching-your-style.md
```

## Relationship to official and community work

This is not an official Anthropic project.

It references:

- Anthropic article: [Using Claude Code: The unreasonable effectiveness of HTML](https://claude.com/blog/using-claude-code-the-unreasonable-effectiveness-of-html)
- Anthropic examples: [anthropics/html-effectiveness](https://github.com/anthropics/html-effectiveness)
- Anthropic skills / artifact builder ideas: [anthropics/skills](https://github.com/anthropics/skills)
- Community skill: [dogum/html-artifacts](https://github.com/dogum/html-artifacts)

This repo adds:

- A routable playbook distilled from the official 20 HTML examples
- Markdown / Obsidian source-of-truth loops
- Multi-AI dispatch and per-task prompt export rules
- User-experience-first constraints: less wall-of-text, less lost context, fewer giant omnibus prompts

## License

Apache-2.0. See [LICENSE](LICENSE).
