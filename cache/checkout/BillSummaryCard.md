# BillSummaryCard — Build Cache
**Built:** 2026-05-27
**Figma source:** https://www.figma.com/design/T96zjkCns9zCJ2oHYTPe7I/Diagnostics-Ideal-checkout — Cart, Bill summary (node 8553:44201)

---

## Variant Properties

No formal variant properties — content is data-driven (line items, totals).

---

## Spec

`../../specs/checkout/BillSummaryCard.md`

---

## Token Police Audit

**⚠️ 2 pending confirmation — 13/15 token references resolved.**

### ✅ Passing references (13)

| Token ID | Resolved value | Usage |
|----------|---------------|-------|
| `token.color.background.primary` | #FFFFFF | card background |
| `token.color.content.primary` | #181A1F | line item amounts + total label + total amount + section heading |
| `token.color.content.secondary` | #414752 | line item labels |
| `token.color.border.subtle` | #DDE2EB | divider line between standard items and total |
| `token.color.brand.1mg` | #FF5443 | negative line item amounts (discount, coupon) + savings pill background |
| `token.color.background.primary` | #FFFFFF | savings pill text color (white text on coral) |
| `token.space.16` | 16px | horizontal + vertical padding + gap between line items |
| `token.space.8` | 8px | divider margin + total row gap |
| `token.space.12` | 12px | savings pill horizontal padding |
| `token.radius.4` | 4px | savings pill border-radius |
| `token.font.size.body-14` | 14px | line item label + amount font-size |
| `token.font.size.body-12` | 12px | savings pill text font-size |
| `token.font.weight.regular` | 400 | line item label + amount |
| `token.font.line-height.20` | 20px | line item line-height |
| `token.font.size.heading-18` | 18px | section heading font-size |
| `token.font.line-height.24` | 24px | section heading + total row |
| `token.font.family.sans` | 'Figtree', system-ui, sans-serif | all text |

*(16 rows — 13 unique token IDs)*

### ⚠️ Pending confirmation (2)

| Token ID | Likely value | Usage | Status |
|----------|-------------|-------|--------|
| Section heading measurement | 18px | section heading font-size | **Resolved to** `token.font.size.heading-18`. |
| `token.font.size.body-16` OR `token.font.size.title-16` | 16px | total row font-size | **Pending.** Total row appears larger than 14px. |

### ✅ Base state check

| State | Required fields | Status |
|-------|----------------|--------|
| `focus` | n/a | ✅ not applicable — display only |
| `disabled` | n/a | ✅ not applicable |

---

## Notes

- **Savings pill uses `sell` icon.** The Figma instance `sell_FILL0_wght400_GRAD0_opsz48 1` (18×18 icon) is a Material Symbols icon, not a DS icon. Substitute with the closest available DS icon or the `sell` / tag icon asset.
- **`token.radius.4` for savings pill.** Matches the small-radius treatment seen on inner-card badges across the DS. Confirm `radius.4 = 4px` from the token scale.
- **Discount line items are coral.** The sign change (negative amounts) uses `brand.1mg` color to visually reinforce savings — same pattern as the savings pill.
- **InlineExpander usage.** In the Booking Details sheet, BillSummaryCard is the revealed content of the `InlineExpander` ("To be paid ▾"). It is not rendered inline in Booking Details by default.
