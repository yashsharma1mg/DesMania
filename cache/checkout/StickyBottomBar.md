# StickyBottomBar — Build Cache
**Built:** 2026-05-27
**Figma source:** https://www.figma.com/design/T96zjkCns9zCJ2oHYTPe7I/Diagnostics-Ideal-checkout — Cart (node 8553:44390), Booking Details (node 8730:33468)

---

## Variant Properties

| Property | Values |
|----------|--------|
| `left_variant` | `price-summary`, `to-be-paid`, `empty` |
| `cta_label` | varies per screen |

**Active combinations (5 screens):**

| Screen | left_variant | cta_label |
|--------|-------------|-----------|
| Cart | price-summary | Continue |
| Select Patient | empty | Proceed to slot selection |
| Select Slot | empty | Confirm slot |
| Booking Details | to-be-paid (InlineExpander) | Proceed to pay |
| Add Patient | empty | Save |
| Choose Address | empty | Continue |

---

## Spec

`../../specs/checkout/StickyBottomBar.md`

---

## Token Police Audit

**⚠️ 1 pending confirmation — 10/11 token references resolved.**

### ✅ Passing references (10)

| Token ID | Resolved value | Usage |
|----------|---------------|-------|
| `token.color.background.primary` | #FFFFFF | bar background |
| `token.color.border.subtle` | #DDE2EB | 1px top border |
| `token.color.content.primary` | #181A1F | price amount + focus ring |
| `token.color.content.secondary` | #414752 | sub-label text |
| `token.space.16` | 16px | horizontal padding + gap between left/CTA |
| `token.space.12` | 12px | vertical padding |
| `token.font.weight.medium` | 500 | price amount |
| `token.font.weight.regular` | 400 | sub-label |
| `token.font.line-height.16` | 16px | sub-label line-height |
| raw `27px` line-height | 27px | price amount line-height |
| `token.font.family.sans` | 'Figtree', system-ui, sans-serif | all text |

*Button tokens covered by Button spec. InlineExpander tokens covered by InlineExpander spec.*

### ⚠️ Pending confirmation (1)

| Token ID | Likely value | Usage | Status |
|----------|-------------|-------|--------|
| `token.font.size.heading-18` | 18px | price amount font-size | **Pending.** Amount text (₹958) uses the measured 18px size. |

### ✅ Base state check

| State | Required fields | Status |
|-------|----------------|--------|
| `focus` | ring, ring_width, ring_offset | ✅ token.color.content.primary, 2px, 2px (price-summary area) |
| `disabled` | n/a | ✅ not applicable — bar always visible |

---

## Notes

- **Bar height 68px is raw.** The price amount keeps its measured 27px line-height, so the bar should be treated as a fixed measured container rather than derived purely from token line-heights.
- **CTA button width.** When `left_variant` is `empty`, the Button stretches to `328px` (full width minus 2×16px padding). When a left summary is present, the button is ~160px with the left content taking the remaining space.
- **Safe area inset.** The bar must account for `env(safe-area-inset-bottom)` on iOS devices with a home indicator. Add as additional padding-bottom to the outer container.
- **Cart "Address" row.** The Figma shows an address row (68px) above the price/CTA bar on the Cart. This is the address + "Change" row (a specialised layout element), separate from StickyBottomBar.
