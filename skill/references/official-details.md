# Official Details And Boundary Rules

This reference captures official Anthropic/Claude details that sit around the `html-effectiveness` examples. Use it to avoid overfitting to the 20 files alone.

## Artifact Criteria

Claude artifacts are intended for substantial, standalone content that the user may edit, iterate on, reuse, refer back to, or use outside the conversation. Official examples include documents, code, single-page HTML websites, SVG, diagrams/flowcharts, and interactive React components.

For this skill, create HTML when the output is:

- Significant enough to stand on its own.
- Useful outside the chat.
- Worth editing, iterating, sharing, or revisiting.
- Better understood through layout, interaction, or visualization.

Do not create HTML for a short answer, one command, one code snippet, or a disposable three-bullet summary.

Sources:

- Anthropic Help Center: "What are artifacts and how do I use them?"
- Anthropic `html-effectiveness` README

## Official Example Repository Details

The `anthropics/html-effectiveness` repository is a gallery of standalone HTML examples. Each file is self-contained and has no build step or dependencies. The official categories are:

- Exploration: code approaches, visual designs.
- Code review and understanding: PR review, code path, design system, component variants.
- Prototyping: animation, interaction.
- Communication: slide deck, status report, incident report, PR write-up.
- Diagrams and research: flowchart, feature/concept explainers.
- Custom editing UIs: triage board, feature flags, prompt tuner.

Use this as a content-shape reference, not a codebase to copy.

## Simple HTML vs Web Artifacts Builder

Anthropic's `web-artifacts-builder` skill is for elaborate, multi-component Claude.ai HTML artifacts built with React 18, TypeScript, Vite, Tailwind, shadcn/ui, and bundling to a single `bundle.html`.

Use simple single-file HTML for:

- Project management artifacts.
- PR reviews.
- Explain pages.
- Triage boards.
- Small editors.
- Diagrams and reports.

Consider a React/Vite builder only when the artifact genuinely needs:

- Complex state management.
- Multiple screens/routes.
- Many reusable components.
- shadcn/ui/Radix components.
- A product-like app rather than a one-off artifact.

Even then, the final deliverable should bundle into a single HTML file when the artifact needs to be shared as an artifact.

Official builder notes:

- Initialize a frontend project.
- Develop the artifact.
- Bundle all JS/CSS/assets into one HTML file.
- Testing/visualization is optional and can add latency; test when needed or requested.
- Avoid common AI-slop styling such as excessive centered layouts, purple gradients, uniform rounded corners, and default Inter-heavy aesthetics.

## Sharing, Versioning, And Export

Claude artifacts can be viewed, iterated, copied, and downloaded. Claude's artifact UI supports versions, so a user can ask for targeted edits or full rewrites. For this skill in local Codex, mimic that behavior through:

- Stable filenames.
- Clear version names when producing multiple variants.
- Copy/export buttons for user-edited state.
- Optional "Copy patch" or "Copy changed section" instead of rewriting everything.

If the artifact is for an organization or team, be explicit about what can be shared and what should stay local.

## AI-Powered Artifacts Boundaries

Claude.ai can support AI-powered artifacts with a limited text-based completion API in that environment, but local standalone HTML files should not assume Claude access. For local Codex artifacts:

- Do not depend on AI calls from the HTML page.
- Do not require external API calls.
- Do not require persistent storage.
- Use in-memory state or local file export/copy.

If the user explicitly wants an AI-powered Claude.ai artifact, design for that environment separately.

## Multi-Agent Coordination Details

Claude Code supports custom subagents. Official docs distinguish scopes:

- Project subagents live under `.claude/agents/` and are good for codebase-specific workers that can be checked into version control.
- User subagents live under `~/.claude/agents/` and are personal workers available across projects.
- Subagents are Markdown files with YAML frontmatter and a prompt body.
- Keep names unique.
- Subagents are loaded at session start if added directly on disk.
- Focused subagents should have focused descriptions and limited tools.

For this skill, an HTML multi-agent dispatcher should not pretend to run agents itself. It should:

- Show task queue, owner/agent, blocker, evidence requirement, and target Markdown note.
- Export one focused prompt per agent or per selected task.
- Include stop conditions and evidence requirements.
- Require the worker to update Markdown after completion.

This combines official subagent organization with the HTML-as-control-room pattern.

## Skill Design Details

Official skill guidance favors progressive disclosure:

- Keep `SKILL.md` as routing and workflow.
- Put detailed modes in `references/`.
- Load only the relevant reference for the task.
- Use clear descriptions because skill triggering depends heavily on the frontmatter description.

This skill follows that structure: main router first, official pattern references second, special Obsidian/multi-agent rules in their own file.
