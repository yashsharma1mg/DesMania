# AdditionalServicesRow

**Source:** Diagnostics Ideal Checkout — Cart, VAS section (node 8553:43921)
**Status:** New component

---

## Overview

A list row for an optional value-added service (VAS). Shows a service illustration icon, title with tooltip, description, per-person pricing, and a trailing checkbox for selection. Multiple rows are stacked with dividers within the "Add services" section.

---

## Variant Properties

| Property | Values |
|----------|--------|
| `state` | `unselected`, `selected` |
| `show_tooltip` | `true`, `false` |

---

## Anatomy

```
[48px icon]  Consult a doctor for ⓘ       [ ✓ ]
             ₹9,999  ₹7,999  37% off
```

- **Leading icon** — 48×48px service illustration (non-tokenised illustration asset)
- **Title** — service name with optional `ⓘ` tooltip trigger
- **Price block** — uses `PriceBlock` primitive
- **Trailing checkbox** — 18×18px `Checkbox` component

---

## Dimensions

| Property | Value | Token |
|----------|-------|-------|
| Row height | 83px | — (derived: icon 48 + gap + price row) |
| Horizontal padding | 16px | `token.space.16` |
| Vertical padding | ~16px | `token.space.16` |
| Gap: icon to text block | 9px | — (raw ≈ `token.space.8`) |
| Gap: title to price | 8px | `token.space.8` |
| Leading icon size | 48×48px | — (raw) |
| Divider between rows | 1px | — |

---

## Tokens

| Element | Token | Value |
|---------|-------|-------|
| Row background | `token.color.background.primary` | #FFFFFF |
| Divider between rows | `token.color.border.subtle` | #DDE2EB |
| Title font-size | `token.font.size.body-14` | 14px |
| Title font-weight | `token.font.weight.bold` | 700 |
| Title line-height | `token.font.line-height.20` | 20px |
| Title color | `token.color.content.primary` | #181A1F |
| Info icon color | `token.color.content.secondary` | #414752 |
| Description font-size | `token.font.size.body-12` | 12px |
| Description font-weight | `token.font.weight.regular` | 400 |
| Description line-height | `token.font.line-height.16` | 16px |
| Description color | `token.color.content.secondary` | #414752 |
| Font family | `token.font.family.sans` | 'Figtree', system-ui, sans-serif |

*Checkbox tokens covered by the Checkbox component spec. PriceBlock tokens covered by PriceBlock spec.*

---

## Section Container

Multiple `AdditionalServicesRow` instances appear within an "Additional services" / "Add services" card:
- Section heading: 18px Bold `content.primary`, padding-top `space.16`, padding-bottom `space.8`
- Section subtitle: "Add services for a better experience", 14px regular `content.secondary`
- Gap before first row: `space.8`
- Card has no outer border (flush with page edges)

---

## Focus State

| Property | Token | Value |
|----------|-------|-------|
| Ring color | `token.color.content.primary` | #181A1F |
| Ring width | — | 2px |
| Ring offset | — | 2px |

---

## Accessibility

- Row: `role="checkbox"`, `aria-checked` reflects selection state
- Full row is the tappable hit area (83px height exceeds 44dp)
- Info icon: `role="button"`, `aria-label="About [service name]"`
- Checkbox component handles its own aria per its spec
