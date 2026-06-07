# PriceBlock — Build Cache
**Built:** 2026-05-27
**Figma source:** https://www.figma.com/design/T96zjkCns9zCJ2oHYTPe7I/Diagnostics-Ideal-checkout — Cart LabTestCard (node 8553:44275), carousel card price rows

---

## Variant Properties

| Property | Values |
|----------|--------|
| `show_mrp` | `true`, `false` |
| `show_discount` | `true`, `false` |

---

## Spec

`../../specs/checkout/PriceBlock.md`

---

## Token Police Audit

**⚠️ 1 pending confirmation — 10/11 token references resolved.**

### ✅ Passing references (9)

| Token ID | Resolved value | Usage |
|----------|---------------|-------|
| `token.color.content.primary` | #181A1F | current price text |
| `token.color.content.tertiary` | #868E9E | MRP strikethrough text |
| `token.color.brand.1mg` | #FF5443 | discount badge text |
| `token.space.8` | 8px | gap between current price and MRP |
| `token.space.4` | 4px | gap between MRP and discount badge |
| `token.font.size.body-14` | 14px | current price in LabTestCard context + MRP + discount font-size |
| `token.font.weight.medium` | 500 | current price font-weight in LabTestCard context |
| `token.font.weight.regular` | 400 | MRP + discount font-weight |
| `token.font.line-height.20` | 20px | current price in LabTestCard context + MRP + discount line-height |
| `token.font.family.sans` | 'Figtree', system-ui, sans-serif | all text |

### ⚠️ Pending confirmation (1)

| Token ID | Likely value | Usage | Status |
|----------|-------------|-------|--------|
| `token.font.size.heading-18` + raw `27px` line-height | 18px / 27px | carousel-card standalone price | **Pending.** The carousel standalone variant keeps the measured 18px size and 27px raw line-height. |

### ✅ Base state check

| State | Required fields | Status |
|-------|----------------|--------|
| `focus` | n/a | ✅ not applicable — display only |
| `disabled` | n/a | ✅ not applicable |

---

## Notes

- **Shared primitive.** PriceBlock is reused across LabTestCard, carousel cards (related tests), and BillSummaryCard. Token audit applies uniformly across all three usages.
- **Discount badge is plain text, not a DS Badge.** The "18% off" text uses `brand.1mg` color with no border or background — it is not the `Badge` component.
- **MRP line-height alignment.** MRP (14px, 20px line-height) baseline-aligns with the current price. Use `align-items: baseline` on the flex container.
