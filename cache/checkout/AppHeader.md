# AppHeader — Build Cache
**Built:** 2026-05-27
**Figma source:** https://www.figma.com/design/T96zjkCns9zCJ2oHYTPe7I/Diagnostics-Ideal-checkout?node-id=8553-43638

---

## Variant Properties

| Property | Values |
|----------|--------|
| `variant` | `back-title-action`, `back-title`, `title-only` |

**Active combinations (3):**

| variant | back | title | trailing_action |
|---------|------|-------|----------------|
| back-title-action | ✓ | ✓ | ✓ (search/filter icon) |
| back-title | ✓ | ✓ | — |
| title-only | — | ✓ | — |

The checkout Cart screen uses `back-title-action` (← Cart 🔍).

---

## Spec

`../../specs/checkout/AppHeader.md`

---

## Token Police Audit

**✅ 0 violations — 7/7 token references resolved correctly.**

### ✅ Passing references (7)

| Token ID | Resolved value | Usage |
|----------|---------------|-------|
| `token.color.background.primary` | #FFFFFF | header container background |
| `token.color.border.subtle` | #DDE2EB | 1px bottom divider |
| `token.color.content.primary` | #181A1F | back icon + trailing icon + title text + focus ring |
| `token.font.family.sans` | 'Figtree', system-ui, sans-serif | title text |
| `token.font.size.title-16` | 16px | title font-size (pending Figma confirmation — may be 18px) |
| `token.font.weight.extrabold` | 800 | title font-weight |
| `token.font.line-height.24` | 24px | title line-height |

### ✅ Base state check

| State | Required fields | Status |
|-------|----------------|--------|
| `focus` (back button) | ring, ring_width, ring_offset | ✅ token.color.content.primary, 2px, 2px |
| `focus` (trailing action) | ring, ring_width, ring_offset | ✅ token.color.content.primary, 2px, 2px |
| `disabled` | n/a | ✅ not applicable — AppHeader is always visible |

---

## Notes

- **IconButton.nav dependency.** Back arrow and trailing action use the `nav` ghost variant of IconButton identified in `../_audit_checkout_deltas.md` as a gap. Until IconButton.nav is specced, these are implemented inline as 44×44dp transparent tap targets.
- **Title font size pending confirmation.** Figma screenshot shows "Cart" title — approximate render is 16–18px. Using `token.font.size.title-16` until a Figma node measurement is confirmed.
- **Container height: 48px raw.** `2 × space.12 (24px) + line-height.24 (24px) = 48px`. But the Figma measures exactly 48px for the header (with an additional 1px divider below at y=48 → total 49px visual footprint). This is a raw value — no space token covers 48.
- **Scroll behaviour (TBD).** Whether AppHeader becomes `position: sticky` or `position: fixed` on scroll is an implementation decision not specified in the Figma. Default to sticky for performance.
- **Not the BottomSheet header.** The "Select patient", "Select slot", "Booking details" headings are BottomSheet headers — they use BottomSheet's built-in variant chrome. AppHeader is only for full-page screens.
