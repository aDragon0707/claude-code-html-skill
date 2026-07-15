# Paper Publication Pages

Use this pattern when converting a complete research paper, technical report, thesis chapter, PDF, DOCX, or long-form Markdown source into a self-contained HTML publication. The primary job is `report`; the selected pattern is `paper publication / long-form research narrative`.

This reference distills reusable publication grammar observed in Anthropic's Transformer Circuits research pages, including *Verbalizable Representations Form a Global Workspace in Language Models*. It does not authorize copying their logo, mascot, prose, illustrations, diagrams, or article-specific visual assets.

## Contents

1. Decide whether this is the right pattern
2. Inventory the source before designing
3. Build the publication anatomy
4. Make figures carry the argument
5. Preserve evidence and uncertainty
6. Add only load-bearing interaction
7. Handle responsive, print, and offline output
8. Follow the conversion workflow
9. Verify the result
10. Avoid imitation traps

## 1. Decide whether this is the right pattern

Use a paper publication page when the reader needs to:

- read a complete argument, not only a summary;
- navigate a long numbered section hierarchy;
- connect claims to figures, equations, tables, captions, and citations;
- inspect methods, results, limitations, and appendices in context;
- share one polished offline HTML artifact.

Use a concept explainer instead when the user wants a short tutorial or synthesis rather than a faithful publication. Use a slide deck when the artifact is for presenting rather than sustained reading.

## 2. Inventory the source before designing

Read the full source, not only the abstract or first pages. Build a source inventory before writing HTML:

| Inventory | Capture |
|---|---|
| Identity | title, subtitle/deck, authors, affiliations, publication date, correspondence, license |
| Structure | numbered sections, subsections, appendices, acknowledgements, references |
| Argument | thesis, research questions, main claims, evidence for each claim, limitations |
| Visuals | every figure/table number, caption, source, referenced section, required legend |
| Technical content | equations, symbols, code, algorithms, units, datasets, model or hardware settings |
| Citations | numbering/key scheme, bibliography entries, DOI/URL when present |
| Extraction risk | OCR uncertainty, broken equations, missing images, ambiguous table cells |

Create a coverage map from source sections to HTML sections. Condensation is allowed only when the user asked for it; never silently omit methods, caveats, or contradictory results to make the story cleaner.

## 3. Build the publication anatomy

### Publication bar

Use a thin, quiet top bar for the publication or series name. Keep it subordinate to the paper. Do not invent a logo placeholder.

### Title field

Use a large, high-contrast title with generous white space. A typical desktop scale is `clamp(3rem, 6vw, 5.75rem)` with tight line height. Add a one- or two-sentence deck only when it clarifies the thesis; do not replace the abstract with marketing copy.

### Visual chapter index

Turn six to eight major sections into a two- to four-column grid near the top:

- use a real figure fragment, experiment sketch, data trace, or faithful mini-diagram from that section;
- label every card with the actual section title;
- keep all cards structurally identical so the reader can scan them horizontally;
- make each card link to its section;
- use a text-only card for discussion/limitations when no honest visual exists.

The chapter image must preview the argument. Decorative icons, stock photography, and generated science imagery weaken trust.

### Author and publication metadata

Place authorship, affiliations, date, correspondence, and source/license in a restrained metadata band after the visual index. Preserve author order and contribution symbols exactly.

### Reading frame

On desktop, use a two-column reading frame:

```css
.reading-frame {
  display: grid;
  grid-template-columns: minmax(15rem, 19rem) minmax(0, 52rem);
  gap: clamp(2rem, 5vw, 5rem);
}
.contents { position: sticky; top: 1.5rem; align-self: start; }
.article { font-size: clamp(1.06rem, 1.3vw, 1.28rem); line-height: 1.65; }
```

Use a fine vertical rule or space to separate the contents from the article. Keep the main reading line around 65–78 characters. On narrow screens, replace the sticky contents with a compact `<details>` navigation before the article.

### Section hierarchy

Render section numbers as a separate muted element rather than burying them in the title. Keep `h1`–`h4` semantic and linkable. A long paper needs stable fragment IDs, active-section highlighting, and a visible focus state for keyboard navigation.

### Typography and palette

- Use a restrained sans-serif publication face when the source calls for a technical, diagram-led tone; use serif body text only when it materially improves the source's reading identity.
- Use one neutral ink, one muted gray, one rule color, and at most two semantic accents.
- Use monospace for code, layer numbers, experiment traces, model outputs, and compact numeric annotations.
- Reserve color for concept identity, intervention/result distinction, or status. Keep the mapping stable across the whole page.
- Avoid gradients, glass effects, generic dashboard shadows, and excessive rounded cards.

## 4. Make figures carry the argument

Figures are evidence, not decoration.

### Figure planes

Allow important figures to break wider than the prose column. Use a consistent figure plane with a light rule, generous padding, and a caption directly below it. Avoid wrapping a figure in a heavy card when the page itself already provides structure.

### Figure composition

Choose the smallest visual grammar that matches the claim:

- small multiples for repeated experiments or cases;
- a left-to-right pipeline for method stages;
- a layered vertical diagram for depth, chronology, or hierarchy;
- a matrix for variants or ablations;
- annotated traces for intermediate values;
- a side-by-side intervention/result view for causal claims.

Prefer inline SVG, HTML/CSS diagrams, or user-provided figures embedded as data URLs. Recreate a figure only when its semantics and numbers can be preserved. Never invent missing data to complete a diagram.

### Captions

Keep figure/table numbers and full captions. A good caption states what is shown, the comparison or intervention, the population/sample/model, and the takeaway needed to interpret it. Do not turn captions into generic labels such as "Architecture overview."

### Accessibility

Give each figure a useful `aria-labelledby` or `alt`. For dense charts, include a short prose description adjacent to the caption. Do not encode the only distinction in color.

## 5. Preserve evidence and uncertainty

Visually distinguish:

- source facts and measured results;
- author interpretations;
- your derived calculations or synthesis;
- recommendations;
- limitations and unresolved questions.

Use citations near the claim they support. Preserve equation symbols, subscripts, superscripts, units, table footnotes, and qualifiers such as "approximately" or "under this assumption."

If extraction is uncertain, say so next to the affected content. Examples: `Equation transcription needs verification`, `Figure unavailable in source`, or `OCR confidence is low for this table row`.

Do not present proxy metrics as measured power, latency, accuracy, or statistical significance. When recomputing a value, show the source coefficients and note any discrepancy rather than silently replacing the paper's number.

## 6. Add only load-bearing interaction

Static reading is a valid primary action. Do not add controls merely to make the page feel interactive.

Good interactions include:

- visual chapter cards that jump to sections;
- active-section highlighting in the contents;
- a slider that recomputes a real model from source coefficients;
- toggles for comparable experimental conditions;
- hover/focus annotations that expose exact values;
- step-through controls for a multi-stage method;
- copy citation or print/save PDF utilities.

Bad interactions include dead tabs, decorative counters, carousels for linear prose, and filters that hide evidence without an explicit reset.

If the page lets the reader change state, provide a reset and an export/copy path for the changed state when it has value outside the page.

## 7. Handle responsive, print, and offline output

- Keep the artifact as one self-contained HTML file. Inline CSS and JavaScript.
- Embed required images as data URLs and use `loading="lazy"` for large papers. Compress copies without altering scientific meaning; retain the original source separately.
- Do not use external fonts, CDNs, analytics, or runtime API calls.
- Collapse the visual chapter index from four columns to two and then one.
- Move the desktop contents into a mobile `<details>` navigation.
- Ensure wide figures scroll inside their own plane instead of creating page-level horizontal overflow.
- Add print styles that hide sticky navigation and controls, expand collapsed sections, avoid figure/caption separation, and preserve URLs where useful.

## 8. Follow the conversion workflow

1. Extract and read the complete source.
2. Build the source inventory and section coverage map.
3. State the paper's thesis in one sentence without strengthening it.
4. Select six to eight visual-index chapters from the paper's real structure.
5. Choose or construct one honest visual preview per selected chapter.
6. Render the title field, visual index, metadata band, contents, and reading frame.
7. Place figures beside the prose that interprets them; keep captions and citations.
8. Add interaction only where it answers a real reader question.
9. Add limitations, source notes, and extraction uncertainty before polishing.
10. Verify content coverage, calculations, offline behavior, responsiveness, and print output.

Use `../assets/paper-publication-template.html` as a structural starting point. Replace its sample content and diagrams; do not ship placeholders.

## 9. Verify the result

Minimum evidence before claiming completion:

- the source inventory covers every top-level section and appendix;
- author names, order, affiliations, date, title, and citation data match the source;
- every included figure/table has the correct number, caption, units, and source;
- all derived numbers are independently recomputed;
- equations and non-ASCII symbols render correctly;
- section links and active contents work;
- keyboard focus and figure descriptions are present;
- the page has no external network dependencies;
- desktop and mobile layouts have no page-level horizontal overflow;
- print preview keeps headings, figures, and captions together where possible;
- any unverified visual or browser check is reported as `uncertain` or `blocked`.

For this pattern, the first viewport passes when a reader can identify within five seconds:

- the paper title and thesis/deck;
- the major chapters and how to navigate them;
- who produced the work and when, either in view or immediately below the visual index;
- which visuals are real evidence previews rather than decoration.

An artifact contract is optional for a static publication page. Require one when the page becomes an editor, dataset explorer, or stateful experiment viewer.

## 10. Avoid imitation traps

Do not copy a reference publication's:

- logo, wordmark, mascot, or favicon;
- article text, title, author layout verbatim, or named series identity;
- custom illustrations or diagram compositions;
- exact palette, typography files, or distinctive decorative motifs;
- source code unless its license and attribution allow reuse.

Reuse the deeper grammar instead: visual chapter navigation, disciplined metadata, sticky contents, numbered reading hierarchy, evidence-led figures, captions, restrained color, and generous white space.
