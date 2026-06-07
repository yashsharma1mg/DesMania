# SavingsBanner

**Source:** Diagnostics Ideal Checkout — Cart, below the AppHeader
**Status:** New component

---

## Overview

A full-width banner strip displayed at the top of the Cart page showing the total savings amount on the current order. Uses a light green tint background to communicate positive/savings sentiment.

---

## Anatomy

```
[────────────────────────────────────────]
│  ₹124 saved on this order           🪙 │
[────────────────────────────────────────]
```

- **Savings text** — "₹X saved on this order", left-aligned
- **Coin/reward icon** — decorative illustration (coin with leaf motif), right-aligned, ~28×28px

---

## Dimensions

| Property | Value | Token |
|----------|-------|-------|
| Width | 100% viewport | — |
| Height | 72px | — (derived: 2×space.16 + line-height.24 + inner container vertical padding) |
| Horizontal padding | 16px | `token.space.16` |
| Inner container padding horizontal | 8px | `token.space.8` |
| Inner container padding vertical | 8px | `token.space.8` |
| Inner container border-radius | 8px | `token.radius.8` |

---

## Tokens

| Element | Token | Value |
|---------|-------|-------|
| Outer container background | `token.color.primitive.wellness-green.97` | ~#F0FAF3 (lightest green tint) |
| Inner container background | `token.color.primitive.wellness-green.95` | slightly deeper green tint |
| Amount color (₹X) | — | `#208376` (teal-green raw value — no DS token) |
| Amount font-size | `token.font.size.body-16` | 16px (confirmed) |
| Amount font-weight | `token.font.weight.bold` | 700 |
| Amount line-height | `token.font.line-height.24` | 24px |
| "saved on this order" color | — | `#3b3b3b` (raw value) |
| "saved on this order" font-size | `token.font.size.body-14` | 14px (confirmed) |
| "saved on this order" font-weight | `token.font.weight.medium` | 500 (confirmed) |
| "saved on this order" line-height | `token.font.line-height.20` | 20px |
| Font family | `token.font.family.sans` | 'Figtree', system-ui, sans-serif |

**Note on background tokens:** The banner background is a green gradient/tint. `wellness-green.97` and `wellness-green.95` are primitive approximations — confirm exact gradient stops from Figma. If no token covers this, use the raw hex values as raw values until DS adds a `background.savings` semantic token.

**Figtree migration note:** Use Figtree while retaining the measured typography: amount at 16px / 700 / 24px and supporting text at 14px / 500 / 20px. Raw color values remain until the DS adds matching semantic savings tokens.

---

## Accessibility

- Role: `region`, `aria-label="Savings summary"`
- The savings text is the only meaningful content; icon is `aria-hidden="true"`
