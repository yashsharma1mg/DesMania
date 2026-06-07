# AddressCard

**Source:** Diagnostics Ideal Checkout — Choose Address screen
**Status:** New component

---

## Overview

A selectable address card used in the Choose Address screen. Displays a radio button, a label (e.g., "Home"), a multi-line address, the recipient's name, phone number, and an "Edit | Remove" action row. Supports selected and unselected states.

---

## Variant Properties

| Property | Values |
|----------|--------|
| `state` | `unselected`, `selected` |

---

## Anatomy

```
┌─────────────────────────────────────────┐
│  (○)  Home                              │
│       C44, Boys PG, Sector 14, near    │
│       Maple bear canadian pre-school   │
│       Gurgaon, Haryana (122001)        │
│                                        │
│       Soumik kar                       │
│       8849147492                       │
│                                        │
│       Edit    Remove                   │
└─────────────────────────────────────────┘
```

- **RadioButton** — leading, top-aligned with the label
- **Label** — short place name (e.g., "Home", "Mom's office"), bold
- **Address lines** — 2–3 lines of formatted address text
- **Name** — recipient's full name
- **Phone** — 10-digit phone number
- **Actions row** — "Edit" and "Remove" text links

---

## Dimensions

| Property | Value | Token |
|----------|-------|-------|
| Padding horizontal | 16px | `token.space.16` |
| Padding top | 16px | `token.space.16` |
| Padding bottom | 16px | `token.space.16` |
| Gap: radio to text block | 12px | `token.space.12` |
| Gap: label to address block | 4px | `token.space.4` |
| Gap: address block to name | 8px | `token.space.8` |
| Gap: name to phone | 2px | `token.space.2` |
| Gap: phone to actions row | 8px | `token.space.8` |
| Gap: "Edit" to "Remove" | 16px | `token.space.16` |
| Border radius | 8px | `token.radius.8` |
| Border width | 1px | — |
| Width | 100% container | — |

Height is dynamic (driven by address line count).

---

## States

### `unselected`

| Element | Token | Value |
|---------|-------|-------|
| Background | `token.color.background.primary` | #FFFFFF |
| Border | `token.color.border.subtle` | #DDE2EB |
| Radio | RadioButton `default` state | — |

### `selected`

| Element | Token | Value |
|---------|-------|-------|
| Background | `token.color.background.primary` | #FFFFFF |
| Border | `token.color.brand.1mg` | #FF5443 |
| Radio | RadioButton `selected` state | — |

No background tint in either state — selection is communicated by border color and radio control.

---

## Typography

| Element | Token | Value |
|---------|-------|-------|
| Label font-size | `token.font.size.body-16` | 16px |
| Label font-weight | `token.font.weight.bold` | 700 |
| Label line-height | `token.font.line-height.24` | 24px |
| Label color | `token.color.content.primary` | #181A1F |
| Address font-size | `token.font.size.body-14` | 14px |
| Address font-weight | `token.font.weight.regular` | 400 |
| Address line-height | `token.font.line-height.20` | 20px |
| Address color | `token.color.content.secondary` | #414752 |
| Name font-size | `token.font.size.body-14` | 14px |
| Name font-weight | `token.font.weight.regular` | 400 |
| Name line-height | `token.font.line-height.20` | 20px |
| Name color | `token.color.content.secondary` | #414752 |
| Phone font-size | `token.font.size.body-14` | 14px |
| Phone font-weight | `token.font.weight.regular` | 400 |
| Phone line-height | `token.font.line-height.20` | 20px |
| Phone color | `token.color.content.secondary` | #414752 |
| Action font-size | `token.font.size.body-14` | 14px |
| Action font-weight | `token.font.weight.regular` | 400 |
| Action line-height | `token.font.line-height.20` | 20px |
| Action color | `token.color.brand.1mg` | #FF5443 |
| Font family | `token.font.family.sans` | 'Figtree', system-ui, sans-serif |

---

## RadioButton Alignment

The RadioButton (20×20) is top-aligned to the first line of the label. It does not stretch to full card height. Vertical alignment: `align-items: flex-start`, with the radio margin-top adjusted to centre it optically with the label's cap-height (~`space.2` offset).

---

## Actions Row

"Edit" and "Remove" are inline text links (`role="button"`) with `brand.1mg` color. They are separated by `space.16` horizontal gap. Both have extended tap targets via `min-height: 44px` and `padding-block: space.12`.

---

## Focus State

| Property | Token | Value |
|----------|-------|-------|
| Ring color | `token.color.brand.1mg` | #FF5443 |
| Ring width | — | 2px |
| Ring offset | — | 2px |

Focus ring applies to the entire card (the card is the interactive element for selection). The Edit and Remove actions have their own independent focus rings.

---

## Section Grouping

On the Choose Address screen, address cards are grouped under "Recent address" and "Other saved address" section labels. The section labels are plain text (`content.secondary`, 12px regular, `space.16` horizontal padding, `space.8` vertical padding). Grouping is the consuming layout's responsibility.

---

## Accessibility

- Card root: `role="radio"` within a `role="radiogroup"` labelled "Choose address"
- `aria-checked="true"` when selected
- "Edit" and "Remove": `role="button"` with accessible names ("Edit address: Home", "Remove address: Home")
- Touch target: card is fully tappable; Edit/Remove actions have 44dp tap targets
