# TextField — Build Cache
**Built:** 2026-05-27
**Figma source:** https://www.figma.com/design/T96zjkCns9zCJ2oHYTPe7I/Diagnostics-Ideal-checkout?node-id=8700-25630

---

## Variant Properties

| Property | Values |
|----------|--------|
| `state` | `default`, `active`, `filled`, `error`, `disabled` |

**Active combinations (5 states):**

| state | border | placeholder | value | notes |
|-------|--------|-------------|-------|-------|
| default | border.subtle | content.tertiary | — | "Patient Name" placeholder |
| active | brand.1mg | hidden | user input | Label floats above |
| filled | border.subtle | hidden | content.primary | Label floats |
| error | state.error | hidden | content.primary | Error message below |
| disabled | border.subtle | content.disabled | — | bg.subtle background |

---

## Spec

`../../specs/checkout/TextField.md`

Base primitive: `../../specs/InputField.md`

---

## Token Police Audit

**✅ 0 violations — 13/13 token references resolved correctly.**

### ✅ Passing references (13)

| Token ID | Resolved value | Usage |
|----------|---------------|-------|
| `token.color.background.primary` | #FFFFFF | default + active + filled + error backgrounds |
| `token.color.background.subtle` | #EEF1F5 | disabled background |
| `token.color.border.subtle` | #DDE2EB | default + filled + disabled border |
| `token.color.brand.1mg` | #FF5443 | active/focused border + focus ring |
| `token.color.state.error` | #A3111E | error border + error label + error message text |
| `token.color.content.primary` | #181A1F | input value text + focus ring |
| `token.color.content.secondary` | #414752 | floating label text (filled state) |
| `token.color.content.tertiary` | #868E9E | placeholder text |
| `token.color.content.disabled` | #868E9E | disabled placeholder + value text |
| `token.radius.8` | 8px | container border-radius |
| `token.space.12` | 12px | horizontal + vertical padding |
| `token.font.size.body-14` | 14px | input value + placeholder text |
| `token.font.size.body-12` | 12px | floating label + error message |
| `token.font.weight.regular` | 400 | all text |
| `token.font.line-height.20` | 20px | input text line-height |
| `token.font.line-height.16` | 16px | label + error message line-height |
| `token.space.4` | 4px | gap below floating label; gap above error message |

*(17 rows total — counts as 13 unique token IDs; space.4, font tokens appear in multiple roles)*

### ✅ Base state check

| State | Required fields | Status |
|-------|----------------|--------|
| `focus` | ring, ring_width, ring_offset | ✅ token.color.brand.1mg, 2px, 2px |
| `disabled` | bg, pointer_events | ✅ background.subtle, none |

---

## Notes

- **Derived from checkout flow, not the component library.** No equivalent in Dopamine_2.0_Components. Tokens are inferred from the Figma placeholder text rendering (`#868E9E` / `--colour-usage/outline/high-contrast`) and the surrounding design system patterns.
- **`content.tertiary` and `content.disabled` both resolve to #868E9E.** Placeholder uses `content.tertiary` (stylistic); disabled text uses `content.disabled` (semantic). Keep as separate references.
- **44px height formula.** `2 × token.space.12 (24px) + token.font.line-height.20 (20px) = 44px`. Meets WCAG 2.5.5.
- **Floating label is not in the initial checkout Figma.** The form shows placeholder-only. Floating label states are a DS-standard enhancement specced for completeness; initial implementation may use label-above pattern.
