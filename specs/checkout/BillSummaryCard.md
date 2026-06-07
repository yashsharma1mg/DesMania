# BillSummaryCard

**Source:** Diagnostics Ideal Checkout — Cart, bill summary section (node 8553:44201)
**Status:** New component

---

## Overview

A card showing a detailed breakdown of the order total. Contains labelled line items (tests, discount, coupon, delivery, taxes, etc.), a subtotal divider, a total row, and a savings pill at the bottom. Used in the Cart page; a collapsed version ("To be paid ▾") appears in the Booking Details sheet via `InlineExpander`.

---

## Anatomy

```
Bill summary
──────────────────────────────────
Tests (2)                   ₹1,198
Sample collection charges       ₹0
Discount on MRP            –₹190
Coupon (DIAG10)             –₹50
──────────────────────────────────  (divider)
Total                          ₹958
──────────────────────────────────
[ 🏷 You have saved ₹190 on this order ]  ← savings pill
```

---

## Dimensions

| Property | Value | Token |
|----------|-------|-------|
| Horizontal padding | 16px | `token.space.16` |
| Vertical padding | 16px | `token.space.16` |
| Gap between line items | 16px | `token.space.16` |
| Divider height | 1px | — |
| Divider margin vertical | 8px | `token.space.8` |
| Total row top gap | 8px | `token.space.8` |
| Savings pill height | 34px | — (raw) |
| Savings pill horizontal padding | 12px | `token.space.12` |
| Savings pill vertical padding | 8px | `token.space.8` |
| Savings pill border-radius | 4px | `token.radius.4` |

---

## Tokens

| Element | Token | Value |
|---------|-------|-------|
| Card background | `token.color.background.primary` | #FFFFFF |
| Section heading font-size | `token.font.size.heading-18` | 18px |
| Section heading font-weight | `token.font.weight.bold` | 700 |
| Section heading line-height | `token.font.line-height.24` | 24px |
| Section heading color | `token.color.content.primary` | #181A1F |
| Line item label font-size | `token.font.size.body-14` | 14px |
| Line item label font-weight | `token.font.weight.regular` | 400 |
| Line item label line-height | `token.font.line-height.20` | 20px |
| Line item label color | `token.color.content.secondary` | #414752 |
| Line item amount font-size | `token.font.size.body-14` | 14px |
| Line item amount font-weight | `token.font.weight.regular` | 400 |
| Line item amount line-height | `token.font.line-height.20` | 20px |
| Line item amount color | `token.color.content.primary` | #181A1F |
| Divider color | `token.color.border.subtle` | #DDE2EB |
| Total label font-size | `token.font.size.body-16` | 16px (confirmed) |
| Total label font-weight | `token.font.weight.bold` | 700 |
| Total label line-height | `token.font.line-height.24` | 24px (confirmed) |
| Total label color | `token.color.content.primary` | #181A1F |
| Total amount font-size | `token.font.size.body-16` | 16px (confirmed) |
| Total amount font-weight | `token.font.weight.bold` | 700 |
| Total amount color | `token.color.content.primary` | #181A1F |
| Savings pill background | `token.color.brand.1mg` | #FF5443 |
| Savings pill text color | `token.color.background.primary` | #FFFFFF |
| Savings pill text font-size | `token.font.size.body-12` | 12px |
| Savings pill text font-weight | `token.font.weight.regular` | 400 |
| Savings pill icon color | `token.color.background.primary` | #FFFFFF |
| Font family | `token.font.family.sans` | 'Figtree', system-ui, sans-serif |

---

## Line Item Types

| Type | Label style | Amount style |
|------|------------|--------------|
| Standard | 14px regular `content.secondary` | 14px regular `content.primary` |
| Negative (discount/coupon) | 14px regular `content.secondary` | 14px regular `brand.1mg` |
| Total | 16px bold `content.primary` | 16px bold `content.primary` |

---

## Accessibility

- Root: `role="region"`, `aria-label="Bill summary"`
- Line items: tabular content — consider `role="table"` with `role="row"` and `role="cell"` for screen-reader linearisation
- Savings pill: `aria-live="polite"` — updates as coupons/discounts change
