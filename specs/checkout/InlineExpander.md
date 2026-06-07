# InlineExpander

**Source:** Diagnostics Ideal Checkout — Booking Details sheet, "To be paid ▾ ₹751" row (node 8730:33462)
**Status:** New component

---

## Overview

A single-row interactive element that shows a label, a chevron toggle, and a trailing value. Tapping it expands or collapses a hidden content area inline. Used for "To be paid ▾" in the Booking Details sheet where tapping reveals the BillSummaryCard.

---

## Variant Properties

| Property | Values |
|----------|--------|
| `state` | `collapsed`, `expanded` |

---

## Anatomy

```
To be paid  ▾                              ₹751
```

- **Label** — left-aligned text ("To be paid")
- **Chevron** — `Navigation/Chevron Right` rotated -90° (collapsed) or +90° (expanded)
- **Trailing value** — right-aligned amount (₹751)

---

## Dimensions

| Property | Value | Token |
|----------|-------|-------|
| Row height | 56px | — (raw, from Figma node 8730:33462 width 328 height 56) |
| Horizontal padding | 16px | `token.space.16` |
| Vertical padding | 16px | `token.space.16` |
| Gap: label to chevron | 4px | `token.space.4` |
| Chevron size | 24×24px | — (raw) |

---

## Tokens

| Element | Token | Value |
|---------|-------|-------|
| Background | `token.color.background.primary` | #FFFFFF |
| Label font-size | `token.font.size.body-16` | 16px |
| Label font-weight | `token.font.weight.medium` | 500 |
| Label line-height | `token.font.line-height.24` | 24px |
| Label color | `token.color.content.primary` | #181A1F |
| Chevron color | `token.color.content.primary` | #181A1F |
| Trailing value font-size | `token.font.size.body-16` | 16px |
| Trailing value font-weight | `token.font.weight.medium` | 500 |
| Trailing value line-height | `token.font.line-height.24` | 24px |
| Trailing value color | `token.color.content.primary` | #181A1F |
| Font family | `token.font.family.sans` | 'Figtree', system-ui, sans-serif |

---

## Chevron Animation

Chevron rotates 180° between collapsed (pointing down, ▾) and expanded (pointing up, △) states. Transition: `transform 200ms ease-in-out`.

---

## Expanded Content

The content that appears when expanded is passed as a slot/children prop (in practice, `BillSummaryCard`). The content expands downward via `max-height` animation:
- Collapsed: `max-height: 0; overflow: hidden`
- Expanded: `max-height: 400px` (sized to accommodate BillSummaryCard)
- Transition: `max-height 300ms ease-in-out`

---

## Focus State

| Property | Token | Value |
|----------|-------|-------|
| Ring color | `token.color.content.primary` | #181A1F |
| Ring width | — | 2px |
| Ring offset | — | 2px |

---

## Accessibility

- Root: `role="button"`, `aria-expanded="false|true"`, `aria-controls="bill-detail-id"`
- Touch target: 56px height exceeds 44dp minimum
- When expanded: the revealed content region has `role="region"` with matching `id`
