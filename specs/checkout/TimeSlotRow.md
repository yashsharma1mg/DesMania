# TimeSlotRow

**Source:** Diagnostics Ideal Checkout — Select Slot bottom sheet, time slot selection rows
**Status:** New component

---

## Overview

A single selectable time slot row containing a radio control, a time range label, and an optional trailing surcharge amount. Multiple TimeSlotRows appear beneath each `TimeOfDayHeader` section.

---

## Variant Properties

| Property | Values |
|----------|--------|
| `state` | `default`, `selected`, `disabled` |
| `show_surcharge` | `true`, `false` |

---

## Anatomy

```
( ) 6:00 am – 7:00 am                    +₹50
```

- **RadioButton** — leading, 20×20px, standard DS RadioButton component
- **Time range** — e.g., "6:00 am – 7:00 am"
- **Surcharge** — optional trailing amount, e.g., "+₹50" (only shown for premium/paid slots)

---

## Dimensions

| Property | Value | Token |
|----------|-------|-------|
| Row height | 48px | — (derived: 2×space.14 not available → 2×12 + 24 = 48px raw) |
| Padding horizontal | 16px | `token.space.16` |
| Padding vertical | 12px | `token.space.12` |
| Gap: radio to time range | 12px | `token.space.12` |
| Border radius | 0 | — (rows inside a card; card owns the radius) |
| Bottom divider | 1px `token.color.border.subtle` | — (between rows; last row has no divider) |

---

## States

### `default`

| Element | Token | Value |
|---------|-------|-------|
| Background | `token.color.background.primary` | #FFFFFF |
| Time range text | `token.color.content.primary` | #181A1F |
| Surcharge text | `token.color.content.secondary` | #414752 |
| Radio | RadioButton `default` state | — |

### `selected`

| Element | Token | Value |
|---------|-------|-------|
| Background | `token.color.background.primary` | #FFFFFF |
| Time range text | `token.color.content.primary` | #181A1F |
| Surcharge text | `token.color.brand.1mg` | #FF5443 |
| Radio | RadioButton `selected` state | — |

When selected, the surcharge shifts to `brand.1mg` to communicate it will be added to the total.

### `disabled`

| Element | Token | Value |
|---------|-------|-------|
| Background | `token.color.background.primary` | #FFFFFF |
| Time range text | `token.color.content.tertiary` | #868E9E |
| Surcharge text | `token.color.content.tertiary` | #868E9E |
| Radio | RadioButton `disabled` state | — |
| Pointer events | none | — |

---

## Typography

| Element | Token | Value |
|---------|-------|-------|
| Time range font-size | `token.font.size.body-14` | 14px |
| Time range font-weight | `token.font.weight.regular` | 400 |
| Time range line-height | `token.font.line-height.20` | 20px |
| Surcharge font-size | `token.font.size.body-14` | 14px |
| Surcharge font-weight | `token.font.weight.regular` | 400 |
| Surcharge line-height | `token.font.line-height.20` | 20px |
| Font family | `token.font.family.sans` | 'Figtree', system-ui, sans-serif |

---

## Focus State

| Property | Token | Value |
|----------|-------|-------|
| Ring color | `token.color.content.primary` | #181A1F |
| Ring width | — | 2px |
| Ring offset | — | 2px |

---

## Grouping Container

TimeSlotRows are wrapped in a card container (`border: 1px token.color.border.subtle`, `border-radius: token.radius.8`). The card is the consuming layout's responsibility — TimeSlotRow does not define its own outer border.

A `TimeOfDayHeader` immediately precedes each group of rows for the same period. The header and its rows share the same card or are separated by a `space.8` gap — implementation detail left to consuming layout (SelectSlot page spec).

---

## Accessibility

- Each row is `role="radio"` within a `role="radiogroup"` labelled "Select collection time"
- `aria-checked="true"` when selected
- `aria-disabled="true"` when disabled, removed from tab order
- Touch target: row height 48px meets WCAG 2.2 AA minimum (44dp)
