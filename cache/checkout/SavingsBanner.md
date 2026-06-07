# SavingsBanner — Build Cache
**Built:** 2026-05-27
**Figma source:** https://www.figma.com/design/T96zjkCns9zCJ2oHYTPe7I/Diagnostics-Ideal-checkout — Cart, Savings frame (node 8553:44307)

---

## Variant Properties

No formal variant properties — content is data-driven (₹X amount).

---

## Spec

`../../specs/checkout/SavingsBanner.md`

---

## Token Police Audit

**⚠️ 2 pending confirmation — 4/6 token references resolved.**

### ✅ Passing references (4)

| Token ID | Resolved value | Usage |
|----------|---------------|-------|
| `token.font.weight.bold` | 700 | savings text font-weight |
| `token.font.line-height.24` | 24px | savings text line-height |
| `token.space.16` | 16px | horizontal padding |
| `token.font.family.sans` | 'Figtree', system-ui, sans-serif | text |

### ⚠️ Pending confirmation (2)

| Token ID | Likely value | Usage | Status |
|----------|-------------|-------|--------|
| `token.font.size.body-16` OR `token.font.size.title-16` | 16px | savings text font-size | **Pending.** Text appears ~16px based on screenshot. |
| Background gradient | wellness-green.97 / wellness-green.95 tint | banner + inner container backgrounds | **Pending.** Green tint observed; no semantic `background.savings` token exists yet. Primitive approximations used. Confirm exact colour stops from Figma fill inspector. |

### ✅ Base state check

| State | Required fields | Status |
|-------|----------------|--------|
| `focus` | n/a | ✅ not applicable — non-interactive |
| `disabled` | n/a | ✅ not applicable |

---

## Notes

- **Coin icon is an illustration asset.** The circular coin/medal illustration (≈28×28px) seen at the right of the banner is not from the DS icon set. Use the provided image asset.
- **Inner container shape.** The savings amount appears inside a rounded inner container (radius.8) within the outer 72px banner. This inner container has a slightly deeper green tint than the outer background.
- **No interactive behaviour.** Banner is purely informational. No tap target, no hover state.
