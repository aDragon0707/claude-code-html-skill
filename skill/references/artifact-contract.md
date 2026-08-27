# Artifact Contract

Use this reference when an HTML artifact has state, export, dispatch, project-memory, or Markdown/Obsidian round-trip behavior.

## When This Contract Is Required

Required for:

- `editor`
- `dispatcher`
- project-memory board
- Markdown / Obsidian round-trip artifact

Optional for:

- static report
- code explainer
- PR review
- implementation plan

Do not make every static HTML artifact carry a manifest. Use the contract when the artifact needs auditability, export scope, state round-trip, or Markdown write-back.

## Minimal Contract

Embed a short JSON contract in the HTML:

```html
<script id="artifact-contract" type="application/json">
{
  "primary_job": "compare | explore | review | explain | prototype | report | plan | editor | dispatcher",
  "selected_pattern": "string",
  "why_html": "string",
  "sources_used": ["path or url"],
  "exports": [
    {
      "label": "string",
      "format": "markdown | prompt | json | csv | diff",
      "scope": "single | selected | bucket | changed-only | whole",
      "target": "markdown path, note, PR comment, config, or next prompt"
    }
  ],
  "verification": ["opens_offline", "export_works", "first_viewport_passes"]
}
</script>
```

## Export Controls

Every declared export must have a visible control with a stable machine-checkable label:

```html
<button data-export-label="Copy Task Prompt">Copy Task Prompt</button>
```

`aria-label` is also acceptable when the visible text differs:

```html
<button aria-label="Copy Task Prompt">Copy</button>
```

The control must also be wired to copy/export behavior. The checker accepts an inline `onclick` handler, a direct `addEventListener("click", ...)` binding for the marked control, or delegated click handling for marked export controls.

## Export Scope

| scope | Use for | Avoid |
|---|---|---|
| `single` | one task, one card, one prompt, one selected item | bulk execution |
| `selected` | explicit multi-selection | accidental whole-board prompts |
| `bucket` | `Now`, `Review`, or another visible bucket | mixed-dependent tasks |
| `changed-only` | config diffs, prompt edits, flag changes | full snapshots |
| `whole` | planning Markdown, archive, board summary | default execution prompt |

## Verification

Minimum checks:

- `opens_offline`: no external scripts, fonts, styles, images, APIs, or CDNs unless requested.
- `first_viewport_passes`: first screen states job, source data, primary action, and export path.
- `export_works`: each required export has a marked control, uses clipboard plus fallback, and produces the promised scope.
- `markdown_roundtrip`: when applicable, exported Markdown preserves `[[Wiki links]]`, `#tags`, headings, and task boxes.
- `done_gate`: dispatcher/project boards cannot mark Done without evidence and Markdown write-back.
