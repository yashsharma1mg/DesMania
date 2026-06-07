# TimeOfDayHeader

**Source:** Diagnostics Ideal Checkout — Select Slot bottom sheet, time-of-day section header
**Status:** New component

---

## Overview

A non-interactive section header that divides time slot rows into morning, afternoon, and evening groups. It displays a weather icon, a period label, and an optional "High demand" badge.

---

## Variant Properties

| Property | Values |
|----------|--------|
| `period` | `morning`, `afternoon`, `evening` |
| `show_demand_badge` | `true`, `false` |

---

## Anatomy

```
[☀ icon]  Morning               [High demand]
```

- **Leading icon** — weather illustration (sunrise / sun / sunset), 20×20px
- **Period label** — "Morning", "Afternoon", or "Evening"
- **Demand badge** — optional `Badge` component, `info.success` green variant, label "High demand"

---

## Dimensions

| Property | Value | Token |
|----------|-------|-------|
| Height | 36px | — (derived: 2×space.8 + line-height.20) |
| Padding horizontal | 16px | `token.space.16` |
| Padding vertical | 8px | `token.space.8` |
| Gap: icon to label | 8px | `token.space.8` |
| Gap: label to badge | 8px | `token.space.8` |

Full-width element; stretches to container width. Period label and demand badge sit on the same row: label is flex-grow, badge is trailing.

---

## Tokens

| Element | Token | Value |
|---------|-------|-------|
| Background | `token.color.background.primary` | #FFFFFF |
| Period label color | `token.color.content.primary` | #181A1F |
| Period label font-size | `token.font.size.body-14` | 14px |
| Period label font-weight | `token.font.weight.bold` | 700 |
| Period label line-height | `token.font.line-height.20` | 20px |
| Font family | `token.font.family.sans` | 'Figtree', system-ui, sans-serif |

---

## Icons

| Period | Icon | Description |
|--------|------|-------------|
| `morning` | sunrise icon | Sun partially above horizon |
| `afternoon` | sun icon | Full sun |
| `evening` | sunset icon | Sun at horizon |

Icon size: 20×20px. Icons are illustration assets, not tokenised. Color follows the illustration — do not tint with content tokens.

---

## Demand Badge

Uses `Badge` component with `info.success` variant (green, derived from `token.color.primitive.wellness-green.30` — see `../../cache/_audit_checkout_deltas.md` for the delta note). Badge label: "High demand".

Visibility controlled by `show_demand_badge` prop. Hidden when `false` — do not reserve space.

---

## Accessibility

- Role: `none` (presentational grouping header)
- Screen readers: the following time slot rows are within a `role="group"` labelled with the period name (e.g., `aria-label="Morning slots"`)
- Not focusable
