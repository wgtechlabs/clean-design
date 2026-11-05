import { access, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import process from "node:process";

const root = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const requiredFiles = ["SKILL.md", "README.md", "LICENSE", "scripts/audit-ui.mjs"];
const requiredSections = [
  "## Non-negotiable principles",
  "## Before implementation",
  "## During implementation",
  "## Exception record",
  "## After implementation: audit and report",
  "## Optional coordination",
  "## Deterministic helper"
];

const errors = [];

for (const file of requiredFiles) {
  try {
    await access(path.join(root, file));
  } catch {
    errors.push(`Missing required file: ${file}`);
  }
}

const skill = await readFile(path.join(root, "SKILL.md"), "utf8");

if (!/^---\r?\nname: clean-design\r?\ndescription: .+\r?\n---/m.test(skill)) {
  errors.push("SKILL.md must start with clean-design Agent Skills frontmatter.");
}

for (const section of requiredSections) {
  if (!skill.includes(section)) {
    errors.push(`SKILL.md is missing required section: ${section}`);
  }
}

for (const statement of [
  "does not require Hallmark or Unslop",
  "Creativity remains free.",
  "Do not invent metrics, testimonials, customer logos, prices, integrations, product screens, availability, or outcomes."
]) {
  if (!skill.includes(statement)) {
    errors.push(`SKILL.md is missing its required portability or truthfulness commitment: ${statement}`);
  }
}

if (errors.length > 0) {
  console.error("Clean Design package check failed:\n- " + errors.join("\n- "));
  process.exitCode = 1;
} else {
  console.log("Clean Design package check passed.");
}
