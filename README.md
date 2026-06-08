# Claude Code HTML Skill

> Build readable, interactive HTML artifacts for plans, audits, reviews, dashboards, and project operating surfaces.

This skill helps Codex / Claude Code turn complex project work into self-contained HTML artifacts while keeping Markdown or Obsidian as the long-term source of truth.

Core judgment:

```text
Markdown = durable memory / source of truth / Obsidian backlinks
HTML = temporary operating surface / visualization / editor / exporter
```

## Who This Is For

Use this when plain Markdown is too hard to scan, compare, or operate:

- implementation plans;
- architecture explanations;
- PR or code-review reports;
- product/design explorations;
- component matrices;
- incident reviews;
- research syntheses;
- one-off triage boards;
- project dashboards.

## 30-Second Quick Start

Ask Codex or Claude Code:

```text
Use claude-code-html-skill to turn this material into a single-file HTML artifact.
Keep Markdown as the source of truth and make the HTML easy to scan, compare, and export.

[paste plan, review, project notes, or research]
```

## What It Produces

The skill should select the artifact form based on the task:

| Need | Artifact Pattern |
|---|---|
| Compare options | Side-by-side decision matrix |
| Review code | Risk-first review surface |
| Explain system | Diagram plus code-path map |
| Track project state | Dashboard with filters and status lanes |
| Plan work | Milestones, tasks, risks, and acceptance checks |
| Explore design | Visual variants and interaction notes |

## When Not To Use This

Do not generate HTML when:

- the user only needs a short answer;
- the artifact will not be inspected visually;
- a normal Markdown checklist is clearer;
- the task requires a production web app rather than a local review artifact.

## Relationship To SACP

SACP makes agent work auditable. HTML artifacts can make the audit easier to inspect.

```text
Work receipt -> review artifact -> human decision -> durable Markdown memory
```

Related projects:

- [SACP](https://github.com/aDragon0707/sacp): auditable agent work receipts
- [Solo-AI-Company-OS](https://github.com/aDragon0707/Solo-AI-Company-OS): operating memory and source of truth
- [Audit Evolution](https://github.com/aDragon0707/audit-evolution-agent-flight-recorder): evidence and improvement loop

## Status

This is a reusable local skill for agent-assisted project work. It is best treated as an artifact generator and thinking surface, not as a replacement for source documents, tests, or review evidence.

## Metadata Recommendations

Suggested topics:

- `codex-skill`
- `claude-code`
- `html-artifacts`
- `agent-workflows`
- `human-ai-collaboration`
- `markdown`
- `project-management`

Clarify the license if this repository is intended for installation, forking, or reuse.

## License

Clarify license metadata in the repository.
