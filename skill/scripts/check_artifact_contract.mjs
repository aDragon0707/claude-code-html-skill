#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const file = process.argv[2];
const allowExternal = process.argv.includes("--allow-external");
const requireContract = process.argv.includes("--require-contract");

if (!file) {
  console.error("Usage: node skill/scripts/check_artifact_contract.mjs <artifact.html> [--allow-external] [--require-contract]");
  process.exit(2);
}

const html = fs.readFileSync(file, "utf8");
const failures = [];
const warnings = [];
const allowedJobs = new Set(["compare", "explore", "review", "explain", "prototype", "report", "plan", "editor", "dispatcher"]);
const allowedFormats = new Set(["markdown", "prompt", "json", "csv", "diff"]);
const allowedScopes = new Set(["single", "selected", "bucket", "changed-only", "whole"]);

function fail(message) {
  failures.push(message);
}

function warn(message) {
  warnings.push(message);
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function hasExternalNetworkUse(html) {
  const patterns = [
    /\b(?:src|href|action|poster|data|srcset)\s*=\s*["'][^"']*https?:\/\//i,
    /@import\s+(?:url\()?["']?https?:\/\//i,
    /url\(\s*["']?https?:\/\//i,
    /\b(?:fetch|importScripts)\s*\(\s*["']https?:\/\//i,
    /\bimport\s*\(\s*["']https?:\/\//i,
    /\bnavigator\.sendBeacon\s*\(\s*["']https?:\/\//i,
    /\bnew\s+(?:WebSocket|EventSource)\s*\(\s*["'](?:wss?:|https?:)\/\//i,
    /\bXMLHttpRequest\b[\s\S]{0,300}\.open\s*\(\s*["'][A-Z]+["']\s*,\s*["']https?:\/\//i
  ];

  return patterns.some((pattern) => pattern.test(html));
}

function findExportControl(label) {
  const escaped = escapeRegExp(label);
  const pattern = new RegExp(
    `<(?:button|a|input|textarea)\\b(?=[^>]+(?:data-export-label|aria-label)=["']${escaped}["'])[^>]*>`,
    "i"
  );
  return html.match(pattern)?.[0] || null;
}

function hasClickBinding(label, controlTag) {
  if (/\bonclick\s*=/.test(controlTag)) return true;

  const escaped = escapeRegExp(label);
  const directSelector = new RegExp(
    `querySelector(?:All)?\\([^)]*(?:data-export-label|aria-label)=["']${escaped}["'][^)]*\\)[\\s\\S]{0,800}addEventListener\\(["']click["']`,
    "i"
  );
  const allMarkedControls = /querySelectorAll\([^)]*(?:data-export-label|aria-label)[^)]*\)[\s\S]{0,800}addEventListener\(["']click["']/i;
  const delegatedClick = /addEventListener\(["']click["'][\s\S]{0,1000}(?:closest|matches)\([^)]*(?:data-export-label|aria-label)[^)]*\)/i;

  return directSelector.test(html) || allMarkedControls.test(html) || delegatedClick.test(html);
}

if (!/<h1[\s>]/i.test(html)) {
  fail("missing h1 for first-viewport orientation");
}

if (!allowExternal && hasExternalNetworkUse(html)) {
  fail("external network use found; expected offline artifact");
}

const contractMatch = html.match(/<script[^>]+id=["']artifact-contract["'][^>]*>([\s\S]*?)<\/script>/i);

let contract = null;

if (!contractMatch) {
  const message = "missing artifact contract; required only for editor, dispatcher, project-memory board, or Markdown/Obsidian round-trip artifacts";
  if (requireContract) fail(message);
  else warn(message);
} else {
  try {
    contract = JSON.parse(contractMatch[1].trim());
  } catch (error) {
    fail(`artifact contract is not valid JSON: ${error.message}`);
  }
}

if (contract) {
  for (const key of ["primary_job", "selected_pattern", "why_html", "sources_used", "exports", "verification"]) {
    if (!(key in contract)) fail(`contract missing ${key}`);
  }

  if (!allowedJobs.has(contract.primary_job)) {
    fail(`invalid primary_job: ${contract.primary_job}`);
  }

  if (!Array.isArray(contract.sources_used)) {
    fail("contract sources_used must be an array");
  }

  if (!Array.isArray(contract.exports)) {
    fail("contract exports must be an array");
  }

  if (!Array.isArray(contract.verification)) {
    fail("contract verification must be an array");
  }

  const exports = Array.isArray(contract.exports) ? contract.exports : [];
  const contractRequired =
    ["editor", "dispatcher"].includes(contract.primary_job) ||
    /project-memory|obsidian|markdown round-trip|markdown\/obsidian/i.test(contract.selected_pattern || "") ||
    exports.some((item) => isObject(item) && /markdown|obsidian|worklog|handoff|AGENTS|CLAUDE/i.test(`${item.format} ${item.target} ${item.label}`));

  if (contractRequired && exports.length === 0) {
    fail(`${contract.primary_job} artifact requires at least one export`);
  }

  for (const item of exports) {
    if (!isObject(item)) {
      fail(`export entry must be an object: ${JSON.stringify(item)}`);
      continue;
    }

    for (const key of ["label", "format", "scope", "target"]) {
      if (!(key in item)) fail(`export missing ${key}: ${JSON.stringify(item)}`);
    }

    if ("label" in item && typeof item.label !== "string") {
      fail(`export label must be a string: ${JSON.stringify(item)}`);
    }

    if ("format" in item && typeof item.format !== "string") {
      fail(`export format must be a string: ${JSON.stringify(item)}`);
    }

    if ("scope" in item && typeof item.scope !== "string") {
      fail(`export scope must be a string: ${JSON.stringify(item)}`);
    }

    if ("target" in item && typeof item.target !== "string") {
      fail(`export target must be a string: ${JSON.stringify(item)}`);
    }

    if ("format" in item && !allowedFormats.has(item.format)) {
      fail(`invalid export format: ${item.format}`);
    }

    if ("scope" in item && !allowedScopes.has(item.scope)) {
      fail(`invalid export scope: ${item.scope}`);
    }

    if (typeof item.label === "string" && item.label.length > 0) {
      const controlTag = findExportControl(item.label);

      if (!controlTag) {
        fail(`export control not found for label: ${item.label}`);
      } else if (!hasClickBinding(item.label, controlTag)) {
        fail(`export control is not wired to a click handler for label: ${item.label}`);
      }
    }
  }

  if (exports.length > 0 && !/navigator\.clipboard\.writeText|select\(\)|execCommand\(["']copy["']\)/.test(html)) {
    fail("exports declared but no clipboard/fallback copy implementation detected");
  }

  const needsMarkdown =
    contract.primary_job === "dispatcher" ||
    exports.some((item) => isObject(item) && /markdown|worklog|obsidian|handoff|AGENTS|CLAUDE/i.test(`${item.format} ${item.target} ${item.label}`));

  if (needsMarkdown && !/\[\[[^\]]+\]\]|#tags?|-\s+\[[ xX]\]|Markdown Write-Back|target markdown/i.test(html)) {
    warn("Markdown round-trip not visibly represented; verify wiki links, tags, task boxes, headings, and target note manually");
  }
}

for (const message of warnings) console.warn(`WARN ${message}`);
for (const message of failures) console.error(`FAIL ${message}`);

if (failures.length) process.exit(1);

console.log(`PASS ${path.basename(file)} contract check`);
