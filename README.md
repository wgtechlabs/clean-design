![Clean Design banner — Design with intention, not imitation.](<https://ghrb.waren.build/render/banner?header=Clean+Design&subheader=Design+with+intention%2C+not+imitation.&bg=0f172a-14532d&color=f8fafc&subheadercolor=cbd5e1&headerfont=Manrope&subheaderfont=Inter&stats=false>)

# Clean Design

> Design with intention, not imitation.

Clean Design is a portable Agent Skill that helps agents prevent generic AI-generated interface patterns before, during, and after UI work. It is a design-quality guardrail, not a visual style, component library, or replacement for product judgment.

## What it does

- Establishes a compact context brief before UI work.
- Flags recurring AI-generated patterns only when they conflict with product evidence, hierarchy, accessibility, or an existing system.
- Preserves creative and framework choices for the agent and user.
- Records intentional exceptions instead of treating familiar patterns as universally wrong.
- Produces a bounded audit report with actionable, evidence-based findings.
- Includes dependency-free Node helpers for limited static signals and package validation.

## Install

Copy this repository’s `SKILL.md` and `scripts/` directory into an Agent Skills-compatible location, such as a global or project-level skills directory supported by your agent. The skill has no runtime dependencies and works without the scripts; Node.js is only needed for the optional deterministic checks.

For Codex, install the repository as a skill when your environment supports repository installation, or copy it to the relevant `.agents/skills/clean-design/` directory.

## Use

Ask your agent to use Clean Design while it builds or audits a UI, for example:

```text
Use Clean Design to build the billing settings screen.
Use Clean Design to audit the dashboard changes in src/features/analytics.
```

The agent should inspect the affected product and create only the brief, exception records, and audit detail that suit the task’s scope.

## Deterministic checks

```text
node scripts/check-skill.mjs
node --test tests
node scripts/audit-ui.mjs tests/fixtures/signals.html --context app
```

`audit-ui.mjs` emits findings in text by default or JSON with `--format json`. It is intentionally conservative: it cannot determine whether a design is good, whether a claim is true, or whether a familiar visual motif is appropriate. Use it as a repeatable signal source for the audit in `SKILL.md`, not as a gate or score.

## Optional companions

Clean Design has no dependency on other design skills.

- [Hallmark](https://github.com/nutlope/hallmark) can supply new-page direction and static/browser checks when it is available and appropriate.
- [Unslop](https://github.com/heydamir/unslop) can help refine an existing interface through its audit and design passes.

Clean Design keeps the cross-tool layer small: context, evidence, exceptions, and outcome reporting. It neither installs nor invokes these projects automatically.

## Development

```text
node scripts/check-skill.mjs
node --test tests
```

The test suite covers the portable skill contract and each deterministic UI signal. It has no package install step.

## License

MIT
