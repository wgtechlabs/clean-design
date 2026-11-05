import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";
import path from "node:path";
import test from "node:test";

const execFileAsync = promisify(execFile);
const root = path.resolve(fileURLToPath(new URL("..", import.meta.url)));

async function audit(fixture) {
  const { stdout } = await execFileAsync(process.execPath, ["scripts/audit-ui.mjs", fixture, "--context", "page", "--format", "json"], { cwd: root });
  return JSON.parse(stdout);
}

test("reports reviewable static signals without failing on their presence", async () => {
  const report = await audit("tests/fixtures/signals.html");
  assert.equal(report.context, "page");
  assert.equal(report.filesScanned, 1);
  assert.deepEqual(report.findings.map((finding) => finding.id).sort(), [
    "fake-link",
    "placeholder-copy",
    "suppressed-focus",
    "transition-all",
    "unsupported-proof"
  ]);
});

test("keeps a clean fixture free of signals", async () => {
  const report = await audit("tests/fixtures/clean.html");
  assert.equal(report.findings.length, 0);
});
