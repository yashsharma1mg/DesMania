# Toast — Build Cache
**Built:** 2026-05-27
**Figma source:** https://www.figma.com/design/T96zjkCns9zCJ2oHYTPe7I/Diagnostics-Ideal-checkout — "Toast" 360×800 overlay frame

---

## Variant Properties

| Property | Values |
|----------|--------|
| `variant` | `success`, `error`, `info` |
| `dismissible` | `true`, `false` |

---

## Spec

`../../specs/checkout/Toast.md`

---

## Token Police Audit

**⚠️ 1 pending confirmation — 7/8 token references resolved.**

### ✅ Passing references (7)

| Token ID | Resolved value | Usage |
|----------|---------------|-------|
| `token.color.background.primary` | #FFFFFF | text + icon color (on dark/coloured backgrounds) |
| `token.color.content.primary` | #181A1F | `info` variant background |
| `token.color.primitive.wellness-green.30` | #156437 | `success` variant background |
| `token.space.16` | 16px | horizontal padding |
| `token.font.size.body-14` | 14px | message font-size |
| `token.font.weight.regular` | 400 | message font-weight |
| `token.font.line-height.20` | 20px | message line-height |
| `token.font.family.sans` | 'Figtree', system-ui, sans-serif | message text |
| `token.space.8` | 8px | gaps between icon, text, dismiss |

*(9 rows — 7 unique token IDs)*

### ⚠️ Pending confirmation (1)

| Token ID | Likely value | Usage | Status |
|----------|-------------|-------|--------|
| `token.color.state.error` | — | `error` variant background | **Pending.** No `state.error` token has appeared in the checkout screens so far. Likely exists in DS for form validation — confirm from token registry. |

### ✅ Base state check

| State | Required fields | Status |
|-------|----------------|--------|
| `focus` (dismiss button) | ring, ring_width, ring_offset | ✅ token.color.background.primary (white ring on coloured bg), 2px, 2px |
| `disabled` | n/a | ✅ not applicable |

---

## Notes

- **Toast is an overlay, not a page element.** The Figma represents it as a full 360×800 frame to show context — the Toast itself is the top strip only (~48px).
- **`wellness-green.30` for success background.** Same primitive used for AccordionCard success tick and TimeOfDayHeader demand badge. Consistent across all "success" contexts until a semantic `state.success` token is added.
- **Auto-dismiss and animation are implementation concerns** not represented in the Figma but required for production. Spec values (4s timeout, 200ms slide) are derived from AccessibilityGuidelines.md functional-motion constraints.
