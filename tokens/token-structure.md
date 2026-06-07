# Token Structure — Dopamine 2.0

> Describes the 3-tier token hierarchy. Token Police uses this file as supplementary context when auditing specs.

---

## The 3-tier hierarchy

### Tier 1 — Primitives

Raw hues and scale values. Never reference these directly in component specs.

**Naming:** `token.color.primitive.<family>.<step>`
**Examples:** `token.color.primitive.cool-neutral.10`, `token.color.primitive.wellness-green.40`

Primitives exist in `tokens/tokens.json` under `color.primitive.*`. They are lookup-only — used by Token Police to trace a semantic token back to its source, and by the design system team to understand the palette. Components must not reference them.

### Tier 2 — Semantic tokens

The layer components consume. These survive theme changes because they describe intent, not hue.

**Naming:** `token.<category>.<group>.<role>`

| Category | Groups | Example |
|---|---|---|
| `token.color.background.*` | `primary`, `subtle`, `moderate`, `disabled` | `token.color.background.primary` |
| `token.color.content.*` | `primary`, `secondary`, `tertiary`, `inverse`, `disabled` | `token.color.content.primary` |
| `token.color.border.*` | `subtle`, `moderate`, `high-contrast` | `token.color.border.subtle` |
| `token.color.divider.*` | `subtle`, `moderate` | `token.color.divider.subtle` |
| `token.color.state.*` | `success`, `offer`, `error`, `warning` | `token.color.state.error` |
| `token.color.brand.*` | `1mg`, `quick-commerce`, `care-plan`, `corporate` | `token.color.brand.1mg` |
| `token.space.*` | numeric scale | `token.space.16` |
| `token.radius.*` | numeric scale + `full` | `token.radius.8` |
| `token.font.family.*` | `display`, `sans` | `token.font.family.sans` |
| `token.font.size.*` | role-size pairs | `token.font.size.body-14` |
| `token.font.weight.*` | `light`, `regular`, `medium`, `bold`, `extrabold` | `token.font.weight.medium` |
| `token.font.line-height.*` | numeric scale | `token.font.line-height.20` |
| `token.shadow.*` | `1`, `1-iy`, `2`, `2-iy` | `token.shadow.1` |

### Tier 3 — Component tokens (post-MVP)

Component-specific overrides that sit above semantic tokens. Not yet in use. Example (future): `token.component.button.background.primary`. Add this tier when a component needs a value that doesn't fit any semantic token without overloading it.

---

## Naming schema (Dopamine convention)

`Group / Role / Appearance / State / Level`

| Axis | Options |
|---|---|
| **Group** | Content · Background · Border · Surface · Overlay |
| **Role** | Primary · Secondary · Tertiary · Brand · Action · Info · Notice · Negative · Positive |
| **Appearance** | Bold · Subtle · Inverse |
| **State** | Selected · Disabled · Typing |
| **Level** | L0 · L1 · L2 · L3 |

Not every token uses every axis. Use the shortest unambiguous path.

---

## Rules

1. **Start from semantic, not primitive.** A component that needs "primary background" writes `token.color.background.primary`. Not `token.color.primitive.cool-neutral.100`. Not `#FFFFFF`.
2. **If no semantic token fits, flag — never invent.** Write `# TOKEN MISSING: <hex>` in the spec and raise it in the audit. Inventing a token name creates phantom references that break future tooling.
3. **Partial primitive scales are real.** Some colour families skip steps (e.g. Vital Red has no step 30 or 50). Do not fabricate missing steps. The gap is intentional in the source.
