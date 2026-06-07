# NeuCoinsWidget

**Source:** Diagnostics Ideal Checkout — Cart (node 8553:43880)
**Status:** New composite component

---

## Overview

A widget section for displaying and redeeming loyalty points (NeuCoins / TCP points). Shows the user's balance, a toggle to enable redemption, the amount being redeemed, and a bottom strip showing points earned on the current order.

---

## Anatomy

```
┌──────────────────────────────────────────────────┐
│  [💙] Redeem my NeuCoins          Your balance:  │
│        Redeem: 200                    ₹170        │
├──────────────────────────────────────────────────┤
│                                                  │
│  Total: 200 NeuCoins = ₹200          [Toggle]   │
│                                                  │
├──────────────────────────────────────────────────┤  ← 1px divider
│  ✓  14 NeuCoins earned on this order             │  ← earned strip
└──────────────────────────────────────────────────┘
```

---

## Sub-components Used

| Component | Role |
|-----------|------|
| `Toggle` | Enable/disable NeuCoin redemption (DS existing) |
| `Checkbox` | Visual indicator in earned strip (read-only, decorative) |

---

## Dimensions

| Property | Value | Token |
|----------|-------|-------|
| Width | 100% | — |
| Height | 153px | — (raw, from Figma) |
| Horizontal padding | 16px | `token.space.16` |
| Vertical padding | 16px | `token.space.16` |
| Divider height | 1px | — |
| Earned strip height | 18px | — (line-height driven) |

---

## Tokens

| Element | Token | Value |
|---------|-------|-------|
| Container background | `token.color.background.primary` | #FFFFFF |
| Inner divider | `token.color.border.subtle` | #DDE2EB |
| Brand logo container size | 24×24px | — (raw) |
| "Redeem" label font-size | `token.font.size.body-14` | 14px |
| "Redeem" label font-weight | `token.font.weight.regular` | 400 |
| "Redeem" label line-height | `token.font.line-height.20` | 20px |
| "Redeem" label color | `token.color.content.primary` | #181A1F |
| Balance label font-size | `token.font.size.body-12` | 12px |
| Balance label font-weight | `token.font.weight.regular` | 400 |
| Balance label line-height | `token.font.line-height.16` | 16px |
| Balance label color | `token.color.content.secondary` | #414752 |
| Balance amount font-size | `token.font.size.body-14` | 14px |
| Balance amount font-weight | `token.font.weight.bold` | 700 |
| Balance amount line-height | `token.font.line-height.20` | 20px |
| Balance amount color | `token.color.content.primary` | #181A1F |
| Earned strip background | `token.color.brand.1mg` | #FF5443 |
| Earned strip text color | `token.color.background.primary` | #FFFFFF |
| Earned strip font-size | `token.font.size.body-12` | 12px |
| Earned strip font-weight | `token.font.weight.regular` | 400 |
| Earned strip line-height | `token.font.line-height.16` | 16px |
| Earned strip horizontal padding | 8px | `token.space.8` |
| Earned strip badge (pill) background | `token.color.background.primary` (translucent) | #FFFFFF |
| Font family | `token.font.family.sans` | 'Figtree', system-ui, sans-serif |

---

## Toggle State

The `Toggle` controls whether NeuCoins are applied to the order. When toggled off, the redemption amount disappears and balance is shown as "available". When toggled on, redemption amount is displayed and deducted from the total in BillSummaryCard.

Toggle tokens are covered by the existing Toggle component spec.

---

## Earned Strip

A full-width coral (`brand.1mg`) strip at the very bottom of the widget. Shows: `[checkmark icon] 14 NeuCoins earned on this order`. This strip has no border-radius on the bottom edges if the widget is flush with page width; applies `radius.8` only if the widget has a card container.

---

## Accessibility

- Widget root: `role="region"`, `aria-label="NeuCoins rewards"`
- Toggle: existing Toggle spec accessibility applies; `aria-label="Redeem NeuCoins"`
- Earned strip: `aria-live="polite"` — updates when Toggle state changes
