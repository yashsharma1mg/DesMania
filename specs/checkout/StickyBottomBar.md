# StickyBottomBar

**Source:** Diagnostics Ideal Checkout — Cart, Select Slot, Booking Details, Add Patient, Choose Address (node 8553:44390 region)
**Status:** New component

---

## Overview

A fixed/sticky bar anchored to the bottom of the screen, containing a left summary area and a right primary CTA button. Used on nearly every step in the checkout flow with different left-side content and different button labels.

---

## Variant Properties

| Property | Values |
|----------|--------|
| `left_variant` | `price-summary`, `to-be-paid`, `empty` |
| `cta_label` | `Continue`, `Confirm slot`, `Proceed to slot selection`, `Proceed to pay`, `Save` |

---

## Anatomy

```
┌─────────────────────────────────────────────────┐
│  ₹958  /  See bill summary  ›    [ Continue ]  │
└─────────────────────────────────────────────────┘
```

- **Left summary area** — context-dependent content (price + bill link, "To be paid" expandable, or empty)
- **Right CTA** — primary coral `Button` (full-height, 160px wide at minimum)

---

## Dimensions

| Property | Value | Token |
|----------|-------|-------|
| Bar height | 68px | — (raw) |
| Horizontal padding | 16px | `token.space.16` |
| Vertical padding | 12px | `token.space.12` |
| Gap: left area to CTA | 16px | `token.space.16` |
| CTA width (min) | 160px | — (raw) |
| CTA height | 44px | — (raw) |
| Safe area bottom padding | env(safe-area-inset-bottom) | — (CSS env variable) |
| Background | `token.color.background.primary` | #FFFFFF |
| Top border | 1px `token.color.border.subtle` | — |

---

## Left Variant: `price-summary`

Used on Cart and steps with a price amount.

```
₹958
Total for 2 items
```

| Element | Token | Value |
|---------|-------|-------|
| Amount font-size | `token.font.size.heading-18` | 18px (confirmed) |
| Amount font-weight | `token.font.weight.medium` | 500 |
| Amount line-height | — | 27px (raw — no DS `line-height.27` token) |
| Amount color | `token.color.content.primary` | #181A1F |
| Sub-label font-size | `token.font.size.body-12` | 12px |
| Sub-label font-weight | `token.font.weight.regular` | 400 |
| Sub-label line-height | `token.font.line-height.16` | 16px |
| Sub-label color | `token.color.content.secondary` | #414752 |
| Font family | `token.font.family.sans` | 'Figtree', system-ui, sans-serif |

## Left Variant: `to-be-paid`

Used on Booking Details sheet. Uses `InlineExpander` component.

```
To be paid ▾                    ₹751
```

See `InlineExpander` spec.

## Left Variant: `empty`

Used when no summary is needed (e.g., Add Patient "Save" bar, Choose Address "Continue" bar). Left area is empty; CTA is full-width minus horizontal padding.

---

## CTA Button

Uses the existing `Button` component in `filled` / coral variant. Button stretches to fill available space to the right of the left summary (or full-width when `left_variant: empty`).

---

## Position

`position: sticky; bottom: 0` by default. Pages with scroll should ensure the bar is not inside the scroll container. Stacking context: `z-index: 10` (above page content, below modals/sheets).

---

## Accessibility

- Root: `role="toolbar"` or plain `role="complementary"`
- "See bill summary ›" link: `role="button"`, `aria-label="See full bill summary"`
- CTA: existing Button accessibility applies
