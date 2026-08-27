# Archify integration

Use this reference only when the artifact's primary job is a system diagram: architecture, workflow, sequence, data flow, or lifecycle/state transitions.

## Routing

Choose one renderer type:

| User intent | Type |
| --- | --- |
| Services, components, infrastructure, boundaries | `architecture` |
| Process steps, approvals, tool calls, runbooks | `workflow` |
| API calls, request/response lifecycles, async traces | `sequence` |
| Pipelines, ETL/ELT, lineage, consumers | `dataflow` |
| States, retries, waiting, terminal outcomes | `lifecycle` |

The bundled implementation lives at `vendor/archify/`. It is a vendored MIT-licensed runtime; preserve `vendor/archify/LICENSE` when redistributing this skill.

## Bounded authoring loop

1. Read `vendor/archify/schemas/<type>.schema.json` and one matching JSON file in `vendor/archify/examples/`.
2. Author a fresh candidate JSON with stable IDs and facts grounded in the request or inspected repository evidence.
3. Validate before delivery:

   ```powershell
   node vendor/archify/bin/archify.mjs validate <type> <candidate.json> --quality showcase --json
   ```

4. If validation passes, deliver the single-file HTML:

   ```powershell
   node vendor/archify/bin/archify.mjs deliver <type> <candidate.json> <output.html> --quality showcase --json
   ```

5. Treat the validation receipt as evidence. A non-zero exit or warnings means the artifact is not ready to claim as complete.

## Boundary with the parent HTML skill

Archify owns typed diagram JSON, diagram geometry, validation, and self-contained diagram HTML. The parent skill still owns the HTML gate, primary-job decision, offline/output-path contract, first-viewport review, and Markdown/Obsidian write-back when those apply.

Do not turn an architecture diagram into a generic dashboard. Keep one obvious main path, use only facts supported by the source, and make any export or follow-up action visible near the diagram.
