import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { mkdtemp, rm, symlink, writeFile } from "node:fs/promises";
import os from "node:os";
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

test("does not follow directory symlinks while collecting files", async (t) => {
  const fixtureDirectory = await mkdtemp(path.join(os.tmpdir(), "clean-design-audit-"));
  const symlinkPath = path.join(fixtureDirectory, "loop");

  try {
    await writeFile(path.join(fixtureDirectory, "screen.html"), "<main>Ready</main>");
    try {
      await symlink(fixtureDirectory, symlinkPath, process.platform === "win32" ? "junction" : "dir");
    } catch (error) {
      t.skip(`symbolic links are unavailable: ${error.code}`);
      return;
    }

    const report = await audit(fixtureDirectory);
    assert.equal(report.filesScanned, 1);
    assert.equal(report.findings.length, 0);
  } finally {
    await rm(fixtureDirectory, { force: true, recursive: true });
  }
});
