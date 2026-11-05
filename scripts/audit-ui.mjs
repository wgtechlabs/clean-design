import { lstat, readdir, readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const supportedExtensions = new Set([".css", ".html", ".jsx", ".js", ".tsx", ".ts", ".vue", ".svelte"]);
const ignoredDirectories = new Set([".git", "dist", "build", "coverage", "node_modules"]);

function usage() {
  console.error("Usage: node scripts/audit-ui.mjs <file-or-directory> [...paths] [--context app|page|component] [--format text|json]");
  process.exitCode = 1;
}

function parseArgs(args) {
  const options = { context: "app", format: "text", paths: [] };
  for (let index = 0; index < args.length; index += 1) {
    const value = args[index];
    if (value === "--context" || value === "--format") {
      const option = value.slice(2);
      const next = args[index + 1];
      if (!next) {
        throw new Error(`Missing value for ${value}`);
      }
      options[option] = next;
      index += 1;
    } else if (value.startsWith("--")) {
      throw new Error(`Unknown option: ${value}`);
    } else {
      options.paths.push(value);
    }
  }
  if (options.paths.length === 0 || !new Set(["app", "page", "component"]).has(options.context) || !new Set(["text", "json"]).has(options.format)) {
    throw new Error("Invalid arguments");
  }
  return options;
}

async function collectFiles(target) {
  const details = await lstat(target);
  if (details.isSymbolicLink()) {
    return [];
  }
  if (details.isFile()) {
    return supportedExtensions.has(path.extname(target)) ? [target] : [];
  }
  const entries = await readdir(target, { withFileTypes: true });
  const nested = await Promise.all(entries
    .filter((entry) => !entry.isDirectory() || !ignoredDirectories.has(entry.name))
    .map((entry) => collectFiles(path.join(target, entry.name))));
  return nested.flat();
}

function lineNumber(content, offset) {
  return content.slice(0, offset).split(/\r?\n/).length;
}

function findingsFor(file, content, context) {
  const findings = [];
  const signals = [
    {
      id: "placeholder-copy",
      severity: "revision",
      pattern: /\b(lorem ipsum|your company|acme corp(?:oration)?)\b/gi,
      message: "Placeholder copy is present. Replace it with approved product language or label it as temporary."
    },
    {
      id: "fake-link",
      severity: "revision",
      pattern: /<a\b[^>]*\bhref\s*=\s*["']#["'][^>]*>/gi,
      message: "A link points to '#'. Connect it to a real destination or use a button for an in-place action."
    },
    {
      id: "unsupported-proof",
      severity: "question",
      pattern: /\b(?:trusted by|join)\s+(?:over\s+)?[\d,.]+\+?\s+(?:customers|companies|teams|users)\b/gi,
      message: "Social-proof language needs an approved source. Verify the claim or remove it."
    },
    {
      id: "suppressed-focus",
      severity: "blocker",
      pattern: /outline\s*:\s*(?:none|0)\s*;?/gi,
      message: "Focus outline is suppressed. Confirm a visible keyboard focus treatment exists for the affected controls."
    },
    {
      id: "transition-all",
      severity: "note",
      pattern: /transition\s*:\s*all\b/gi,
      message: "'transition: all' animates unintended properties. Name the intended properties instead."
    }
  ];

  for (const signal of signals) {
    for (const match of content.matchAll(signal.pattern)) {
      findings.push({
        id: signal.id,
        severity: signal.severity,
        file,
        line: lineNumber(content, match.index),
        match: match[0],
        message: signal.message,
        context
      });
    }
  }
  return findings;
}

try {
  const options = parseArgs(process.argv.slice(2));
  const files = (await Promise.all(options.paths.map((target) => collectFiles(path.resolve(target))))).flat();
  const findings = (await Promise.all(files.map(async (file) => findingsFor(file, await readFile(file, "utf8"), options.context)))).flat();
  const report = { context: options.context, filesScanned: files.length, findings };

  if (options.format === "json") {
    console.log(JSON.stringify(report, null, 2));
  } else if (findings.length === 0) {
    console.log(`Clean Design static audit: no review signals in ${files.length} file(s).`);
  } else {
    console.log(`Clean Design static audit: ${findings.length} review signal(s) in ${files.length} file(s).`);
    for (const finding of findings) {
      console.log(`[${finding.severity}] ${finding.file}:${finding.line} ${finding.id} — ${finding.message}`);
    }
    console.log("These are deterministic review signals, not a design-quality score or automatic verdict.");
  }
} catch (error) {
  console.error(`Clean Design static audit failed: ${error.message}`);
  usage();
}
