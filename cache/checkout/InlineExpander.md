# InlineExpander — Build Cache
**Built:** 2026-05-27
**Figma source:** https://www.figma.com/design/T96zjkCns9zCJ2oHYTPe7I/Diagnostics-Ideal-checkout — Booking Details sheet (node 8730:33462 "Frame 1116608376")

---

## Variant Properties

| Property | Values |
|----------|--------|
| `state` | `collapsed`, `expanded` |

---

## Spec

`../../specs/checkout/InlineExpander.md`

---

## Token Police Audit

**⚠️ 1 pending confirmation — 6/7 token references resolved.**

### ✅ Passing references (6)

| Token ID | Resolved value | Usage |
|----------|---------------|-------|
| `token.color.background.primary` | #FFFFFF | row background |
| `token.color.content.primary` | #181A1F | label text + chevron + focus ring |
| `token.space.16` | 16px | horizontal padding + vertical padding |
| `token.space.4` | 4px | gap: label to chevron |
| `token.font.size.body-16` | 16px | label font-size (confirmed — Figma node 8730:33465) |
| `token.font.weight.medium` | 500 | label + value font-weight (confirmed — Body/Large/Medium style) |
| `token.font.line-height.24` | 24px | label + value line-height (confirmed) |
| `token.font.family.sans` | 'Figtree', system-ui, sans-serif | all text |

*(8 rows — 7 unique token IDs)*

**✅ 0 pending — all confirmed from Figma nodes 8730:33465 and 8730:33467.**

### ✅ Base state check

| State | Required fields | Status |
|-------|----------------|--------|
| `focus` | ring, ring_width, ring_offset | ✅ token.color.content.primary, 2px, 2px |
| `disabled` | n/a | ✅ not applicable |

---

## Notes

- **Both label and value are Body/Large/Medium (Dopamine 2.0 text style).** Figtree 16px/500/24px — confirmed from Figma. This is NOT a bold value display; both sides use the same weight (500 Medium). This component is fully migrated to Dopamine 2.0.
- **Row height 56px confirmed from Figma.** Node 8730:33462 measures 328×56px (328px = full width minus 2×16px container padding → row is 360px full-width with 16px inner padding on each side).
- **Chevron is 24×24.** Larger than SummaryRow's 18×18 chevron.
- **Animation direction.** Chevron points down (▾, -90° rotated) when collapsed, flips to up (△, +90°) when expanded.
- **Used exclusively in StickyBottomBar `to-be-paid` variant.** Only consumer is the Booking Details sticky bar.
