# StepperButton — Build Cache
**Built:** 2026-05-25
**Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Dopamine_2.0_Components?node-id=4023-2529

---

## Variant Properties

| Property | Values |
|----------|--------|
| `type` | `filled`, `outline` |
| `state` | `add`, `added-number`, `added-text` |
| `size` | `large`, `medium` |
| `out_of_stock` | `true`, `false` (Filled only — Outline has no out-of-stock state) |
| `icon` | `true`, `false` (controls trailing icon visibility in `add` and `added-text` states) |

**Effective combinations:** 9 active variants (6 Filled × outOfStock + 3 Outline). Not all type × state × outOfStock permutations exist — Outline never goes out-of-stock.

---

## Spec

`specs/StepperButton.md`

---

## Token Police Audit

**✅ 0 violations — all 21 token references correctly resolved.**

### Resolved references (21)

| Token ID | Resolved value | Usage |
|----------|---------------|-------|
| `token.color.brand.1mg` | #FF5443 | Filled active bg; Outline foreground + icon |
| `token.color.background.primary` | #FFFFFF | Outline background |
| `token.color.background.moderate` | #DDE2EB | Filled out-of-stock background |
| `token.color.content.inverse` | #FFFFFF | Filled active foreground + icons |
| `token.color.content.disabled` | #868E9E | Filled out-of-stock foreground + icons |
| `token.color.content.tertiary` | #868E9E | "Customise" sub-label |
| `token.color.border.subtle` | #DDE2EB | Outline border |
| `token.color.border.high-contrast` | #868E9E | Focus ring |
| `token.space.2` | 2px | Gap between control row and sub-label |
| `token.space.4` | 4px | Gap between stepper elements (add / added-number states) |
| `token.space.8` | 8px | Gap in added-text state; part of medium padding_y composite |
| `token.space.12` | 12px | Large padding_y |
| `token.space.16` | 16px | Horizontal padding |
| `token.space.20` | 20px | Icon size |
| `token.radius.8` | 8px | Border radius |
| `token.font.family.sans` | 'Figtree', system-ui, sans-serif | Both label and sub-label |
| `token.font.size.body-14` | 14px | Control label + quantity display |
| `token.font.size.tag-11` | 11px | "Customise" sub-label |
| `token.font.weight.bold` | 700 | Control label + quantity display |
| `token.font.weight.regular` | 400 | "Customise" sub-label |
| `token.font.line-height.16` | 16px | Sub-label line height |
| `token.font.line-height.20` | 20px | Control label line height |

*(22 rows above — token.space.8 appears in two roles: gap for added-text AND part of medium padding_y composite)*

### ✅ Base state check

| State | Required fields | Status |
|-------|----------------|--------|
| `focus` | ring, ring_width, ring_offset | ✅ all present |
| `disabled` | opacity, pointer_events | ✅ all present |

---

## Notes

- **`content.tertiary` vs `content.disabled` both resolve to #868E9E.** The sub-label ("Customise") uses `token.color.content.tertiary` — it is always present and readable, not a disabled element. Out-of-stock foreground uses `token.color.content.disabled` — semantically different intent, same hex. Keep them as separate references; if the token values ever diverge in a theme, the distinction matters.
- **Medium `padding_y` composite** (`token.space.8 + token.space.2` = 10px) — established precedent from Button. Consistent across both components.
- **No min-width enforced** — same decision as Button; 104px and 110px Figma constraints dropped.
- **Quantity display widths (40px / 32px) are raw values** — no layout token covers these. Implement as hardcoded CSS until a layout scale is introduced.
- **`added-number` state is a compound widget**, not a single `<button>`. HTML element for this state is `<div role="group">` with two child `<button>` elements. Spec implementation notes cover this.
- **Outline has no out-of-stock state** — do not infer or add one speculatively; not present in Figma.
- **`icon` prop** controls visibility of the trailing icon on `add` and `added-text` states. In `added-number` the decrement/increment icons are always present and not togglable.
- **Carries forward Button conventions** — focus ring via `token.color.border.high-contrast`, medium padding_y composite, no hover treatment, no min-width. Future token additions for these should update both specs simultaneously.
