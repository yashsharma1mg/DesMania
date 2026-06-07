# CouponWidget

**Source:** Diagnostics Ideal Checkout — Cart (node 8553:44370)
**Status:** New component

---

## Overview

A compact widget row displaying an applied coupon (or coupon entry prompt) with a coupon icon, value/code text, and a navigation chevron to a coupons list. Height is 64px.

---

## Variant Properties

| Property | Values |
|----------|--------|
| `state` | `empty` (no coupon applied), `applied` (coupon active) |

---

## Anatomy

```
[🏷]  DIAG10 · Save ₹50              ›
```

- **Coupon icon** — 32×32px icon container (coupon/tag shape illustration)
- **Text block** — coupon code + savings description
- **Trailing chevron** — `Navigation/Chevron Right` (18×18)

---

## Dimensions

| Property | Value | Token |
|----------|-------|-------|
| Height | 64px | — (raw) |
| Horizontal padding | 16px | `token.space.16` |
| Vertical padding | 16px | `token.space.16` |
| Gap: icon to text block | 8px | `token.space.8` |
| Icon size | 32×32px | — (raw) |
| Chevron size | 18×18px | — (raw) |

---

## Tokens

| Element | Token | Value |
|---------|-------|-------|
| Background | `token.color.background.primary` | #FFFFFF |
| Coupon code font-size | `token.font.size.body-14` | 14px |
| Coupon code font-weight | `token.font.weight.bold` | 700 |
| Coupon code line-height | `token.font.line-height.20` | 20px |
| Coupon code color | `token.color.content.primary` | #181A1F |
| Savings text font-size | `token.font.size.body-12` | 12px |
| Savings text font-weight | `token.font.weight.regular` | 400 |
| Savings text line-height | `token.font.line-height.16` | 16px |
| Savings text color | `token.color.content.secondary` | #414752 |
| Chevron color | `token.color.content.tertiary` | #868E9E |
| Font family | `token.font.family.sans` | 'Figtree', system-ui, sans-serif |

---

## States

### `empty`
Text block shows: "Apply coupon" (placeholder text, 14px regular, `content.tertiary`) with no sub-text.

### `applied`
Text block shows: coupon code (14px bold, `content.primary`) + savings line (12px regular, `content.secondary`).

---

## "View all coupons" Link

At the bottom of the widget (or as a separate row below), there is a "View all coupons ›" text link in `brand.1mg`. This is a separate row element, not part of the CouponWidget itself — the consuming layout positions it.

---

## Focus State

| Property | Token | Value |
|----------|-------|-------|
| Ring color | `token.color.content.primary` | #181A1F |
| Ring width | — | 2px |
| Ring offset | — | 2px |

---

## Accessibility

- Row: `role="button"`, `aria-label="Apply or view coupons"`
- Touch target: 64px height exceeds 44dp minimum
