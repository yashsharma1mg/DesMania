# CouponWidget — Build Cache
**Built:** 2026-05-27
**Figma source:** https://www.figma.com/design/T96zjkCns9zCJ2oHYTPe7I/Diagnostics-Ideal-checkout — Cart, Coupon frame (node 8553:44370)

---

## Variant Properties

| Property | Values |
|----------|--------|
| `state` | `empty`, `applied` |

---

## Spec

`../../specs/checkout/CouponWidget.md`

---

## Token Police Audit

**✅ 0 violations — 9/9 token references resolved correctly.**

### ✅ Passing references (9)

| Token ID | Resolved value | Usage |
|----------|---------------|-------|
| `token.color.background.primary` | #FFFFFF | row background |
| `token.color.content.primary` | #181A1F | coupon code text (applied state) |
| `token.color.content.secondary` | #414752 | savings sub-text (applied state) |
| `token.color.content.tertiary` | #868E9E | placeholder text (empty state) + chevron |
| `token.space.16` | 16px | horizontal padding |
| `token.space.8` | 8px | gap: icon to text block |
| `token.font.size.body-14` | 14px | coupon code font-size |
| `token.font.size.body-12` | 12px | savings sub-text font-size |
| `token.font.weight.bold` | 700 | coupon code (applied state) |
| `token.font.weight.regular` | 400 | savings text + placeholder |
| `token.font.line-height.20` | 20px | coupon code line-height |
| `token.font.line-height.16` | 16px | savings text line-height |
| `token.font.family.sans` | 'Figtree', system-ui, sans-serif | all text |

*(13 rows — 9 unique token IDs)*

### ✅ Base state check

| State | Required fields | Status |
|-------|----------------|--------|
| `focus` | ring, ring_width, ring_offset | ✅ token.color.content.primary, 2px, 2px |
| `disabled` | n/a | ✅ not applicable |

---

## Notes

- **Coupon icon is an illustration asset.** The 32×32 coupon/tag icon is a custom illustration, not from the DS icon set.
- **"View all coupons ›" link.** Observed as a separate row below the CouponWidget in the Figma. It is styled as 14px regular `brand.1mg` text with Navigation/Chevron Right (18×18). This link is the consuming layout's responsibility, not part of the CouponWidget itself.
- **Chevron is `Navigation/Chevron Right`.** Uses the same DS icon instance seen across SummaryRow, LabTestCard preparations guide, and other disclosure rows.
