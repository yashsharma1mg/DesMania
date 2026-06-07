# DayPickerPill

**Source:** Diagnostics Ideal Checkout — Select Slot bottom sheet, horizontal day-picker row
**Status:** New component (not in existing DS catalog; Chip does not support dual-line content)

---

## Overview

A horizontally scrollable pill used to select a sample collection date. Each pill shows a date label on one line and an available-slot count on the second line. It has three states: unselected, selected, and disabled (no slots available).

---

## Variant Properties

| Property | Values |
|----------|--------|
| `state` | `unselected`, `selected`, `disabled` |

---

## Anatomy

```
┌──────────────────┐
│   Today          │  ← label (line 1)
│   5 slots        │  ← sublabel (line 2)
└──────────────────┘
```

- **Label** — day string: "Today", "Tomorrow", "Fri, 16 Mar", etc.
- **Sublabel** — slot count: "N slots" or "No slots" when disabled

---

## Dimensions

| Property | Value | Token |
|----------|-------|-------|
| Min width | 72px | — (raw) |
| Padding horizontal | 12px | `token.space.12` |
| Padding vertical | 8px | `token.space.8` |
| Gap between label and sublabel | 2px | `token.space.2` |
| Border radius | 8px | `token.radius.8` |
| Border width | 1px | — (raw) |

Container width is content-driven (flex: auto); all pills in the row are uniform width (set to the widest pill).

---

## States

### `unselected` (default)

| Element | Token | Value |
|---------|-------|-------|
| Background | `token.color.background.primary` | #FFFFFF |
| Border | `token.color.border.subtle` | #DDE2EB |
| Label text | `token.color.content.primary` | #181A1F |
| Sublabel text | `token.color.content.secondary` | #414752 |

### `selected`

| Element | Token | Value |
|---------|-------|-------|
| Background | `token.color.brand.1mg` | #FF5443 |
| Border | `token.color.brand.1mg` | #FF5443 |
| Label text | `token.color.background.primary` | #FFFFFF |
| Sublabel text | `token.color.background.primary` | #FFFFFF |

### `disabled` (no slots)

| Element | Token | Value |
|---------|-------|-------|
| Background | `token.color.background.subtle` | #EEF1F5 |
| Border | `token.color.background.subtle` | #EEF1F5 |
| Label text | `token.color.content.tertiary` | #868E9E |
| Sublabel text | `token.color.content.tertiary` | #868E9E |
| Pointer events | none | — |

---

## Typography

| Element | Token | Value |
|---------|-------|-------|
| Label font-size | `token.font.size.body-14` | 14px |
| Label font-weight | `token.font.weight.bold` | 700 |
| Label line-height | `token.font.line-height.20` | 20px |
| Sublabel font-size | `token.font.size.body-12` | 12px |
| Sublabel font-weight | `token.font.weight.regular` | 400 |
| Sublabel line-height | `token.font.line-height.16` | 16px |
| Font family | `token.font.family.sans` | 'Figtree', system-ui, sans-serif |

---

## Focus State

| Property | Token | Value |
|----------|-------|-------|
| Ring color | `token.color.brand.1mg` | #FF5443 |
| Ring width | — | 2px |
| Ring offset | — | 2px |

---

## Usage

DayPickerPill instances are laid out in a horizontal scrollable row (`overflow-x: auto`, `white-space: nowrap`) within the Select Slot sheet. The row is flush with the sheet edges and has `16px` horizontal inset padding on the container (not the pill).

```
Container: padding-inline: token.space.16, gap: token.space.8 between pills
```

---

## Accessibility

- Each pill is `role="radio"` within a `role="radiogroup"` labelled "Select collection date"
- Disabled pills: `aria-disabled="true"`, excluded from tab order
- Selected pill: `aria-checked="true"`
- Touch target: pill height of 36px (8+20+2+16 internal) — extend via `min-height: 44px` with centred content to meet WCAG 2.2 AA minimum
