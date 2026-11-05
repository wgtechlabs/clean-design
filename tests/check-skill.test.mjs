import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";
import path from "node:path";
import test from "node:test";

const execFileAsync = promisify(execFile);
const root = path.resolve(fileURLToPath(new URL("..", import.meta.url)));

test("validates the portable skill contract", async () => {
  const { stdout } = await execFileAsync(process.execPath, ["scripts/check-skill.mjs"], { cwd: root });
  assert.match(stdout, /package check passed/i);
});
