---
name: clean-design
description: Prevent generic AI-generated interface patterns through context-aware design guardrails before, during, and after UI work, without prescribing an aesthetic, framework, or creative direction.
---

# Clean Design

Design with intention, not imitation.

Clean Design is a portable agent skill for creating and reviewing user interfaces. It prevents generic, unsupported, and low-intent design decisions while leaving product strategy, visual language, technology, and creative direction to the agent and the user.

Use this skill when building, substantially changing, or auditing a UI: a page, product screen, component family, application flow, or design system. It is not a component library, a theme catalog, or an instruction to redesign an existing product.

## Non-negotiable principles

- **Context leads.** Start from the audience, task, product evidence, existing system, and constraints. Do not substitute a familiar AI-made visual recipe for that understanding.
- **Creativity remains free.** Never require a palette, font, layout, radius, animation style, framework, or particular aesthetic. A deliberate use of a familiar pattern is valid.
- **Truth over decoration.** Do not invent metrics, testimonials, customer logos, prices, integrations, product screens, availability, or outcomes. Mark unknown content as a placeholder or remove it.
- **Function is design.** Preserve semantics, keyboard access, focus visibility, readable contrast, responsive behavior, real interaction states, and honest loading/error/empty states.
- **Evidence over vibes.** A rule violation needs a location and reason. A subjective concern is a question for review, not an automatic defect.

## Before implementation

Create a brief design context before writing UI code. Inspect the relevant route, components, styles, tokens, assets, content, and product behavior first. Record only what is useful:

```text
Scope: [page, screen, flow, or component]
User and job: [who needs to do what]
Evidence: [brand assets, product UI, approved copy, data, screenshots]
System to preserve: [tokens, components, conventions, accessibility patterns]
Constraints: [framework, deadline, responsive targets, content gaps]
Intent: [the hierarchy, one memorable product-specific detail, and the action]
```

If evidence is missing, make a clearly labeled assumption that is reversible. Do not manufacture product facts to fill the gap. For a narrow component task, proportion the brief to the component; do not demand a page-level concept for a button fix.

## During implementation

Build the interface around the user’s job and the available evidence. Establish hierarchy, layout, type, states, and responsiveness before cosmetic polish. Reuse the project’s design system where one exists; introduce a small, coherent extension only when the task needs it.

Watch for these **contextual anti-patterns**. They are prompts to investigate, not an aesthetic blacklist:

| Signal | Ask | Usually revise when | Valid exception |
| --- | --- | --- | --- |
| Familiar visual recipe | Does the design only resemble a category template? | It could be swapped into an unrelated product with no loss of meaning. | A familiar convention is the clearest or user-requested solution. |
| Decorative UI density | Does every idea become a badge, card, pill, glow, or gradient? | Decoration competes with task hierarchy or adds no information. | The element communicates status, grouping, interaction, or a deliberate brand material. |
| Generic copy or imagery | Does the screen explain the actual product? | Placeholder prose, stock-like abstraction, or vague claims replaces product evidence. | A labeled placeholder is needed while approved material is pending. |
| Unsupported proof | Can each metric, logo, quote, price, or claim be verified? | It is presented as fact without a source. | The user supplied or approved the evidence. |
| System drift | Does this create a second, accidental design system? | New spacing, type, color, or control rules conflict without reason. | A documented new product area or intentional migration needs a new rule. |
| Motion without purpose | What feedback or relationship does the motion explain? | Motion delays tasks, distracts, or ignores reduced-motion preferences. | Motion communicates change, location, causality, or user control. |
| Incomplete states | What happens on focus, hover, error, loading, empty data, narrow screens, and keyboard input? | A real user path is unavailable or misleading. | The state is truly impossible and the code makes that invariant clear. |

Do not turn one signal into a blanket ban. For example, gradients, rounded controls, cards, dark themes, sparse pages, dense pages, dashboards, and landing pages are all acceptable when they serve the product and are executed intentionally.

## Exception record

When retaining an intentional pattern that could look generic, add a short record in the change description, PR, audit, or adjacent design note:

```text
Pattern: [what triggered review]
Decision: keep | revise | defer
Reason: [product, user, system, or task-specific justification]
Evidence: [asset, requirement, existing convention, or owner approval]
Follow-up: [none or a concrete next step]
```

Exceptions cannot waive factual honesty, accessible interaction, or a broken user path. Do not create exception records for ordinary, uncontroversial implementation choices.

## After implementation: audit and report

Inspect the rendered result when possible at representative sizes and interaction states. Compare it with the pre-implementation context and audit the actual changed surface, not an imagined ideal.

Classify each finding as:

- **Blocker** — deceptive content, inaccessible or broken core interaction, or a material loss of a required user path. Fix before delivery.
- **Revision** — a context-supported improvement that materially strengthens hierarchy, specificity, consistency, or state coverage. Fix when in scope or record why it is deferred.
- **Question** — insufficient evidence to judge an intentional choice. Ask, verify, or leave it as an explicit assumption; do not present it as a failure.
- **Note** — a small optional refinement that does not block delivery.

Use this concise report format:

```markdown
## Clean Design audit

Scope: [surface and sizes/states inspected]
Context checked: [system, evidence, and constraints]

### Findings
- [Blocker|Revision|Question|Note] `path:line or visible area` — [observation]. [Why it matters]. [Fix, question, or recorded exception].

### Decision record
- [pattern] — [keep/revise/defer] because [reason and evidence].

Outcome: [ready, ready with noted follow-up, or needs revision]
Validation: [rendered views, keyboard/state checks, and deterministic checks actually run]
```

Never claim a subjective audit is fully automated or give a false precision score. The optional deterministic helper identifies limited, reviewable signals; it does not certify design quality.

## Optional coordination

Clean Design works alone and does not require Hallmark or Unslop.

- When **Hallmark** is available and the task is a new page or an explicitly requested Hallmark audit/redesign, let Hallmark provide its build direction and hard checks. Keep Clean Design’s context brief, evidence checks, exceptions, and final report; do not duplicate Hallmark’s theme or lint workflow.
- When **Unslop** is available and an existing interface needs a substantial visual refinement, use its audit and pass-based improvement flow if appropriate. Preserve the product’s behavior and re-run this skill’s contextual audit afterward.
- If neither is present, make the necessary design decisions directly. Never block work, install a dependency, or claim integration because either tool is absent.

## Deterministic helper

When Node.js is available, run the repository helper after a UI change:

```text
node scripts/audit-ui.mjs <file-or-directory> --context app
node scripts/check-skill.mjs
```

`audit-ui.mjs` reports only narrow static signals such as placeholder copy, fake links, unverified social-proof language, suppressed focus, and `transition: all`. Treat every result as evidence for review in the surrounding context. `check-skill.mjs` validates this skill package’s portable contract. If the commands are unavailable or not relevant to the changed project, say so in the audit report and perform the equivalent manual checks.
