# Best Practices — Dopamine 2.0 Component Conventions

> This file is intentionally minimal. Fill in team-specific conventions as they are established through real component builds. Agents load this as supplementary context — it is non-blocking if empty sections remain unfilled.

---

## HTML semantics

| Use case | Element |
|---|---|
| Clickable action (no navigation) | `<button>` |
| Navigation / link | `<a href="...">` |
| Single-line text input | `<input type="text">` |
| Multi-line text input | `<textarea>` |
| Display container (no interaction) | `<div>` or `<section>` |
| Landmark regions | `<header>`, `<main>`, `<nav>`, `<aside>`, `<footer>` |

Never use `<div>` for an interactive element that should be a `<button>` or `<a>`. Semantics are not optional.

---

## Accessibility minimums

Every interactive component spec must include:

**Focus state:**
- `ring: token.color.border.*`
- `ring_width: 2px`
- `ring_offset: 2px`
- Never remove focus indicators. Never use `outline: none` without an alternative.

**Disabled state:**
- `opacity: 0.5`
- `pointer_events: none`
- Set `aria-disabled="true"` — not just the `disabled` attribute — to preserve keyboard discoverability.

**Touch targets:**
- Minimum 44×44px hit area (WCAG 2.5.5)
- Minimum 8px gap between adjacent interactive elements

---

## Spec conventions

- All token references use dot-path notation: `token.color.background.primary`, `token.space.16`, `token.radius.8`
- No literal hex values in component specs. If a Figma value doesn't resolve to a token ID, write `# TOKEN MISSING: <hex>` and let Token Police flag it
- No CSS custom property syntax (`var(--)`) in specs. CSS vars are an implementation detail; specs describe intent
- `applies_to: [all]` means the state applies to every variant. Name specific variants when a state only applies to some

---

## Spacing rules (Dopamine 8-point grid)

All spacing values must land on the Dopamine scale: 0, 2, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40px.
If a Figma value is off-grid (e.g. 13px, 17px), round to the nearest token and note it.

---

## Typography pairing

- **Cabinet Grotesk** → Display sizes only (24px and above). Never below 24px.
- **Figtree** → All UI text at every other size.
- Never mix display and body weights on the same text element without intentional hierarchy.

---

## Shadow usage

- `token.shadow.1` → resting cards, elevated tiles (use sparingly — only if the element is truly elevated)
- `token.shadow.2` → hover state, floating buttons, popovers
- Never stack two shadows. Never invent custom shadow values.

---

## [Placeholder — add as established]

Additional conventions from real component builds go here. Common sections to add:
- Icon sizing standards
- Animation / transition conventions (when motion tokens are added)
- Dark mode considerations
- Component naming conventions
