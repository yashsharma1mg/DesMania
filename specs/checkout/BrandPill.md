# BrandPill

**Source:** Diagnostics Ideal Checkout — Cart, LabTestCard "Fulfilled by TATA 1mg Labs ⓘ" row
**Status:** New shared primitive — used in LabTestCard; may appear on other product cards

---

## Overview

A single-line inline text element showing the brand/fulfillment attribution with a brand logo mark and an optional information tooltip trigger. Appears below the section heading and above the test name in LabTestCard.

---

## Anatomy

```
Fulfilled by  [TATA 1mg logo]  ⓘ
```

- **Prefix text** — "Fulfilled by" in regular weight
- **Brand logo** — inline SVG/image mark (TATA 1mg Labs logo, ~82×12px)
- **Info icon** — `General/information` DS icon (18×18), triggers a `Tooltip`

---

## Dimensions

| Property | Value | Token |
|----------|-------|-------|
| Height | 18px (line-height driven) | — |
| Gap: prefix to logo | 4px | `token.space.4` |
| Gap: logo to info icon | 4px | `token.space.4` |
| Info icon size | 18×18px | — (raw) |

---

## Tokens

| Element | Token | Value |
|---------|-------|-------|
| Prefix text color | `token.color.content.secondary` | #414752 |
| Prefix font-size | `token.font.size.body-12` | 12px |
| Prefix font-weight | `token.font.weight.regular` | 400 |
| Prefix line-height | `token.font.line-height.16` | 16px |
| Info icon color | `token.color.content.secondary` | #414752 |
| Font family | `token.font.family.sans` | 'Figtree', system-ui, sans-serif |

---

## Info Icon Interaction

The `ⓘ` icon triggers the existing `Tooltip` component on press/hover with a short attribution message (e.g., "Tests are fulfilled by TATA 1mg Laboratories"). Tooltip tokens are covered by the Tooltip component spec.

---

## Focus State

| Property | Token | Value |
|----------|-------|-------|
| Ring color (info icon) | `token.color.content.secondary` | #414752 |
| Ring width | — | 2px |
| Ring offset | — | 2px |

---

## Accessibility

- Prefix + logo: `aria-label="Fulfilled by TATA 1mg Labs"` on the container
- Info icon: `role="button"`, `aria-label="About TATA 1mg Labs fulfillment"`
