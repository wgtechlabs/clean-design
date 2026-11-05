# Clean Design

![Clean Design banner — Design with intention, not imitation.](<https://ghrb.waren.build/render/banner?header=Clean+Design&subheader=Design+with+intention%2C+not+imitation.&bg=102B27-187864&color=FFFFFF&subheadercolor=D6F1E5&headerfont=Inter&subheaderfont=Inter&stats=false&support=true&watermarkpos=bottom-right>)
<!-- Created with GitHub Repo Banner by Waren Gonzaga: https://ghrb.waren.build -->

[![License: MIT](https://img.shields.io/badge/license-MIT-187864)](LICENSE)

**Clean Design** is a portable Agent Skill for agents that build or audit user interfaces. It helps prevent generic AI-generated patterns through product context, honest evidence, intentional exceptions, and a concise final audit—without prescribing a visual style, framework, or creative direction.

## ✨ Features

- **Context before convention:** creates a proportional brief from the user’s job, available evidence, existing system, and constraints.
- **Contextual anti-patterns:** reviews familiar visual recipes, decorative density, generic copy, unsupported proof, system drift, motion, and incomplete states without turning any style into a blanket ban.
- **Honest exception records:** documents deliberate choices with their reason and evidence rather than treating them as automatic failures.
- **Actionable audits:** classifies findings as Blocker, Revision, Question, or Note and records the validation performed.
- **Optional companions:** coordinates with Hallmark or Unslop when they are available, but never requires either tool.
- **Dependency-free helpers:** includes a portable package check and a limited static UI-signal audit for Node.js environments.

## 🚀 Getting Started

Clean Design works with any Agent Skills-compatible assistant. Copy this repository’s `SKILL.md` and `scripts/` directory into the skill location supported by your agent. For a Codex project, a project-local location is `.agents/skills/clean-design/`.

Then ask the agent to apply the skill to a UI task:

```text
Use Clean Design to build the billing settings screen.
```

The agent should inspect the affected product surface, form a compact context brief, and implement the screen with evidence-based decisions. Node.js 18 or newer is optional and only needed for the deterministic helpers.

## 📖 Usage

Use Clean Design during a build or as a bounded audit of an existing change:

```text
Use Clean Design to audit the dashboard changes in src/features/analytics.
```

After a relevant UI change, run the included helpers when Node.js is available:

```sh
node scripts/audit-ui.mjs src/features/analytics --context app
node scripts/check-skill.mjs
```

`audit-ui.mjs` reports narrow, reviewable signals such as placeholder copy, fake links, unverified social-proof language, suppressed focus, and `transition: all`. It is evidence for a human or agent review—not a design-quality score or an automatic verdict.

## 📚 Documentation

- [SKILL.md](SKILL.md): the complete before, during, and after workflow, exception format, audit template, and optional-tool guidance.
- [GitHub Repo Banner](https://github.com/warengonzaga/github-repo-banner): the header generator used by this README.
- [Hallmark](https://github.com/nutlope/hallmark) and [Unslop](https://github.com/heydamir/unslop): optional complementary design workflows; neither is required.

## 🛠️ Development

The repository has no third-party dependencies. Use Node.js 18 or newer to validate the portable skill package and its static-audit fixtures:

```sh
npm run check
npm test
```

The test suite verifies the skill contract and the deterministic audit signals. It does not claim to establish subjective design quality.

## 🤝 Contributing

Contributions and corrections are welcome. Create a short-lived branch from `dev`, use a [Clean Commit](https://github.com/wgtechlabs/clean-commit) message, run the documented validation commands, and open a pull request targeting `dev`.

Keep proposals focused on portable, context-aware guidance. Do not add a required visual style, framework dependency, or integration with Hallmark or Unslop.

## 🐛 Issues & Support

Use [GitHub Issues](https://github.com/wgtechlabs/clean-design/issues) for defects, documentation gaps, and questions about applying the skill. Include the affected section or helper output when relevant, but never include credentials, private product material, or other sensitive data.

## 📄 License

Clean Design is licensed under the [MIT License](LICENSE).

## 👥 Authors & Contributors

Created by **[Waren Gonzaga](https://github.com/warengonzaga)** under **[WG Technology Labs](https://github.com/wgtechlabs)**, with contributions from the [community](https://github.com/wgtechlabs/clean-design/graphs/contributors).
