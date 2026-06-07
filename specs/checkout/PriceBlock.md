# PriceBlock

**Source:** Diagnostics Ideal Checkout — Cart (LabTestCard, related-test carousel cards)
**Status:** New shared primitive — used in LabTestCard + carousel cards + BillSummaryCard

---

## Overview

A compact inline price display showing the current price, an optional strikethrough MRP, and an optional percentage discount badge. Used wherever a product or service has a discounted price.

---

## Variant Properties

| Property | Values |
|----------|--------|
| `show_mrp` | `true`, `false` |
| `show_discount` | `true`, `false` |

---

## Anatomy

```
₹599  ₹789  18% off
```

- **Current price** — formatted amount (e.g., "₹599"), always shown
- **MRP** — optional strikethrough original price (e.g., "₹789")
- **Discount badge** — optional percentage text (e.g., "18% off"), styled as a plain text label in `brand.1mg`

All three elements sit on a single horizontal baseline.

---

## Dimensions

| Property | Value | Token |
|----------|-------|-------|
| Gap: current price to MRP | 8px | `token.space.8` |
| Gap: MRP to discount badge | 4px | `token.space.4` |
| Height | auto (line-height driven) | — |

---

## Typography

| Element | Token | Value |
|---------|-------|-------|
| Current price font-size | `token.font.size.body-14` | 14px (cart line-item context) |
| Current price font-weight | `token.font.weight.medium` | 500 |
| Current price line-height | `token.font.line-height.20` | 20px |
| Current price color | `token.color.content.primary` | #181A1F |
| MRP font-size | `token.font.size.body-14` | 14px |
| MRP font-weight | `token.font.weight.regular` | 400 |
| MRP line-height | `token.font.line-height.20` | 20px |
| MRP color | `token.color.content.tertiary` | #868E9E |
| MRP text-decoration | `line-through` | — |
| Discount font-size | `token.font.size.body-14` | 14px |
| Discount font-weight | `token.font.weight.regular` | 400 |
| Discount line-height | `token.font.line-height.20` | 20px |
| Discount color | `token.color.brand.1mg` | #FF5443 |
| Font family | `token.font.family.sans` | 'Figtree', system-ui, sans-serif |

**Figtree migration note:** Preserve the measured price typography while switching the family to `token.font.family.sans`: LabTestCard current price remains 14px / 500 / 20px, and carousel-card standalone price remains 18px with the measured 27px raw line-height.

---

## Accessibility

- Whole price block: `aria-label="Price: ₹599, was ₹789, 18% off"` (or similar combined label)
- MRP strikethrough: `aria-label="Original price ₹789"` on the element, `aria-hidden="true"` on the visual strikethrough
