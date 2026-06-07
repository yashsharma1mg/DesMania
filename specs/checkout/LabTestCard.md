# LabTestCard

**Source:** Diagnostics Ideal Checkout — Cart, SKU card (node 8553:44241)
**Status:** New composite component

---

## Overview

A card representing a single lab test SKU in the cart. Shows product image, brand attribution, test name, key attributes (fasting, report time), price with discount, a patient quantity stepper, and an expandable preparations guide section.

---

## Anatomy

```
┌───────────────────────────────────────────────┐
│ Fulfilled by [TATA 1mg logo] ⓘ                │  ← BrandPill
│                                               │
│ [🩸]  Fever Package Extensive           – 1 + │  ← icon + name + StepperButton
│       (includes Dengue, Malaria, T…)  Patients│
│       Fasting required                        │  ← attribute chip
│       Get report within: 12 hrs              │  ← attribute text
│       ₹599  ₹789  18% off                    │  ← PriceBlock
├───────────────────────────────────────────────┤  ← 1px divider (border.subtle)
│ Preparations guide                           │  ← section heading (has-preparation)
│  [🍴] Overnight fasting (8–12 hrs)           │  ← prep row, full text, no chevron
│       Do not eat or drink except water       │  ← wraps to next line if needed
│  [🧪] First morning urine sample required    │  ← second prep row (if applicable)
└───────────────────────────────────────────────┘

OR (no-preparation state):
├───────────────────────────────────────────────┤
│  [✓] No special preparation required         │
└───────────────────────────────────────────────┘
```

---

## Sub-components Used

| Component | Role |
|-----------|------|
| `BrandPill` | Brand attribution header |
| `PriceBlock` | Pricing with MRP + discount |
| `StepperButton` | Patient quantity control (DS existing) |
| `Tooltip` | Info icon on BrandPill ⓘ |

---

## Dimensions

| Property | Value | Token |
|----------|-------|-------|
| Width | 100% | — |
| Horizontal padding | 16px | `token.space.16` |
| Top padding (brand pill section) | 16px | `token.space.16` |
| Gap: BrandPill to content row | 10px | — (raw, ~space.8+2) |
| Test image size | 40×40px | — (raw) |
| Gap: image to text block | 8px | `token.space.8` |
| Gap: test name to attribute 1 | 8px | `token.space.8` |
| Gap: attribute rows | 2px | `token.space.2` |
| Gap: last attribute to PriceBlock | 8px | `token.space.8` |
| Preparations section top padding | 16px | `token.space.16` |
| Preparations section bottom padding | 12px | `token.space.12` |
| Preparations row height | 40px | — (raw: 2×space.11 + line-height.18) |
| Border-radius (card outer) | 0 | — (card sits flush with page edges, no outer border-radius) |
| Preparations section border-radius | 8px (top-left, top-right of the cut-out notch shape) | — |

---

## Tokens

| Element | Token | Value |
|---------|-------|-------|
| Card background | `token.color.background.primary` | #FFFFFF |
| Card bottom border / section divider | `token.color.border.subtle` | #DDE2EB |
| Section heading font-size | `token.font.size.body-14` | 14px |
| Section heading font-weight | `token.font.weight.regular` | 400 |
| Section heading line-height | `token.font.line-height.20` | 20px |
| Section heading color | `token.color.content.primary` | #181A1F |
| Test name font-size | `token.font.size.body-14` | 14px |
| Test name font-weight | `token.font.weight.bold` | 700 |
| Test name line-height | `token.font.line-height.20` | 20px |
| Test name color | `token.color.content.primary` | #181A1F |
| "Fasting required" color | `token.color.brand.1mg` | #FF5443 |
| "Fasting required" font-size | `token.font.size.body-12` | 12px |
| "Fasting required" font-weight | `token.font.weight.regular` | 400 |
| "Fasting required" line-height | `token.font.line-height.16` | 16px |
| Attribute text color | `token.color.content.secondary` | #414752 |
| Attribute text font-size | `token.font.size.body-12` | 12px |
| Attribute text font-weight | `token.font.weight.regular` | 400 |
| Attribute text line-height | `token.font.line-height.16` | 16px |
| Preparations guide background | `token.color.background.subtle` | #EEF1F5 |
| Preparations row icon color | `token.color.content.secondary` | #414752 |
| Preparations row text color | `token.color.content.secondary` | #414752 |
| No-prep checkmark icon color | `token.color.state.success` | #308956 |
| No-prep text color | `token.color.content.secondary` | #414752 |
| Font family | `token.font.family.sans` | 'Figtree', system-ui, sans-serif |

---

## Preparations Guide Section

The "Preparations guide" section has a distinct background (`background.subtle`) and a speech-bubble/tooltip-notch shape cut from the top (a small triangle notch pointing upward at x≈64px). This is a decorative CSS `clip-path` or SVG shape — not a DS token.

**The section is auto-expanded by default.** No user interaction is required to see preparation content. This is a deliberate UX change from the previous design (tappable row → consolidated tab sheet) to ensure preparation instructions are always visible in context.

### `has-preparation` state

Rendered when the test has one or more preparation requirements.

The section contains one or more preparation rows stacked vertically. Each row:
- Leading icon (utensils / clock / flask, 16×16px) in `token.color.content.secondary`
- Full-text preparation instruction — **no truncation**, text wraps to multiple lines
- **No trailing chevron** — rows are not interactive

Row layout: `display: flex`, `align-items: flex-start`, `gap: token.space.8`

Gap between stacked rows: `token.space.12`

### `no-preparation` state

Rendered when the test has no preparation requirements.

The section shows a single row:
- Leading checkmark icon (16×16px) in `token.color.state.success`
- Text: "No special preparation required" in `token.color.content.secondary`, `token.font.size.body-12`, `token.font.weight.regular`

### Removed: tappable consolidated navigation row

The previous single-row design (truncated text + trailing `Navigation/Chevron Right` → opens consolidated bottom sheet with tabs) has been replaced by the inline expanded layout above. The standalone "Preparations guide" tappable row in the Cart page layout has been replaced by `PreparationAlertBanner`.

---

## Accessibility

- Card root: `role="article"` or `role="listitem"`
- Test name: heading level appropriate to context
- "Fasting required" attribute: not an interactive element, plain text
- StepperButton handles its own accessibility per its spec
