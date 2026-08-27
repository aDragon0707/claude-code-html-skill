# Prompt Tuner Fixture Input

Template:

```text
You are a {{role}}. Given {{input}}, produce {{output_format}}.
Constraints:
- Keep commands and file paths in English.
- Preserve [[Wiki links]] and #tags.
```

Samples:

1. `role=reviewer`, `input=PR #482 diff`, `output_format=blocking findings`
2. `role=dispatcher`, `input=task list`, `output_format=single-task prompt`
3. `role=editor`, `input=config JSON`, `output_format=changed-only diff`

Expected artifact:

- Editable template.
- Live sample previews.
- Changed markers.
- Character or token estimate.
- `Copy Prompt` export with `scope=changed-only`.
