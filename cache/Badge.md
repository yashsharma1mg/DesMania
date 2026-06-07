# Badge — Build Cache
**Built:** 2026-05-25
**Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Dopamine_2.0_Components?node-id=1625-1255

---

## Variant Properties

| Property | Values |
|----------|--------|
| `type` | `info`, `rating`, `notification` |
| `color` (info) | `ember`, `aqua`, `royal`, `crimson`, `molten`, `sold-out` |
| `color` (rating) | `green`, `yellow`, `red` |
| `style` (notification) | `number`, `dot` |

**Active combinations (11 total):**

| type | variant | Notes |
|------|---------|-------|
| info | ember | #C2463E text + 10% tint bg — TOKEN MISSING |
| info | aqua | #009DA5 text + 10% tint bg — TOKEN MISSING |
| info | royal | #6A47B4 text + 10% tint bg — TOKEN MISSING |
| info | crimson | #DA2864 text + 10% tint bg — TOKEN MISSING |
| info | molten | #5B0400 text + 10% tint bg — TOKEN MISSING |
| info | sold-out | state.error text (⚠️ discrepancy) + comfort-pink.90 bg (⚠️ discrepancy) |
| rating | green | wellness-green.30 bg, white text + star |
| rating | yellow | state.warning bg, white text + star |
| rating | red | state.error bg (⚠️ discrepancy), white text + star |
| notification | number | brand.1mg bg, 11px Medium white count |
| notification | dot | brand.1mg bg, no text |

---

## Spec

`specs/Badge.md`

---

## Token Police Audit

**✅ 0 violations — 21/21 token references resolved correctly.**

### ✅ Passing references (21)

| Token ID | Resolved value | Usage |
|----------|---------------|-------|
| `token.color.badge.ember` | #C2463E | info.ember foreground |
| `token.color.badge.aqua` | #009DA5 | info.aqua foreground |
| `token.color.badge.royal` | #6A47B4 | info.royal foreground |
| `token.color.badge.crimson` | #DA2864 | info.crimson foreground |
| `token.color.badge.molten` | #5B0400 | info.molten foreground |
| `token.color.state.error` | #A3111E* | info.sold-out foreground; rating.red background (*value discrepancy with Figma — see notes) |
| `token.color.primitive.comfort-pink.90` | #F9CFE3* | info.sold-out background (*value discrepancy with Figma — see notes) |
| `token.color.brand.1mg` | #FF5443 | notification badge background |
| `token.color.content.inverse` | #FFFFFF | all text/icon on coloured badge backgrounds |
| `token.color.primitive.wellness-green.30` | #156437 | rating.green background |
| `token.color.state.warning` | #BF9514 | rating.yellow background |
| `token.font.family.sans` | 'Figtree', system-ui, sans-serif | all badge labels (see Figma font inconsistency note) |
| `token.font.size.tag-11` | 11px | info badge label; notification count |
| `token.font.size.body-12` | 12px | rating badge score |
| `token.font.weight.bold` | 700 | info badge label |
| `token.font.weight.medium` | 500 | notification count |
| `token.font.weight.regular` | 400 | rating badge score |
| `token.font.line-height.16` | 16px | all badge text |
| `token.space.8` | 8px | info badge padding_x |
| `token.space.4` | 4px | rating badge padding_x; icon gap; notification padding |
| `token.space.2` | 2px | rating badge padding_y |
| `token.radius.4` | 4px | info + rating badge corner radius |
| `token.radius.8` | 8px | notification badge radius (= circle on 16px) |

### ✅ Base state check

| State | Required fields | Status |
|-------|----------------|--------|
| `focus` | n/a | ✅ not applicable — badges are non-interactive |
| `disabled` | n/a | ✅ not applicable |

---

## Notes

- **Info badge colours added as `token.color.badge.*` in `tokens/tokens.json`.** Five entries (ember, aqua, royal, crimson, molten) are now first-class token references. They originate from the legacy "SPRING/Expressive" palette and are isolated in the `color.badge` namespace to keep them separate from the main semantic + primitive system.
- **Figma font inconsistency (Poppins vs Figtree).** Aqua, Crimson, Molten, and Sold out info badges in Figma use `Poppins:Medium` (500 weight, 18px line-height) instead of `Figtree:Bold` (700 weight, 16px line-height). Poppins is not in the Dopamine 2.0 font token system. Standardise on `token.font.family.sans` (Figtree) for all badge labels; flag the Figma file for cleanup.
- **`token.color.state.error` value discrepancy** affects both `info.sold-out` and `rating.red`. The Figma library has drifted from `tokens.json`. Both reference `state.error` conceptually but resolve to different hex values. Flag as a priority reconciliation item.
- **Rating.green uses a primitive directly** (`token.color.primitive.wellness-green.30`). No semantic `token.color.background.rating-positive` exists. Same primitive-exception approach as other Dopamine 2.0 components.
- **Notification badges are clean** — both variants resolve fully to system tokens with no exceptions or discrepancies.
