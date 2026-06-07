# NeuCoinsWidget — Build Cache
**Built:** 2026-05-27
**Figma source:** https://www.figma.com/design/T96zjkCns9zCJ2oHYTPe7I/Diagnostics-Ideal-checkout — Cart, NeuCoins frame (node 8553:43880)

---

## Variant Properties

No formal variant properties — widget state is driven by Toggle component.

---

## Spec

`../../specs/checkout/NeuCoinsWidget.md`

---

## Token Police Audit

**✅ 0 violations — 13/13 token references resolved correctly.**

### ✅ Passing references (13)

| Token ID | Resolved value | Usage |
|----------|---------------|-------|
| `token.color.background.primary` | #FFFFFF | widget container background + earned strip text color |
| `token.color.border.subtle` | #DDE2EB | inner section divider |
| `token.color.content.primary` | #181A1F | "Redeem" label + balance amount text |
| `token.color.content.secondary` | #414752 | balance label ("Your wallet balance") |
| `token.color.brand.1mg` | #FF5443 | earned strip background |
| `token.space.16` | 16px | horizontal + vertical padding |
| `token.space.8` | 8px | earned strip horizontal padding |
| `token.font.size.body-14` | 14px | "Redeem" label + balance amount |
| `token.font.size.body-12` | 12px | balance label + earned strip text |
| `token.font.weight.regular` | 400 | "Redeem" label + balance label |
| `token.font.weight.bold` | 700 | balance amount |
| `token.font.line-height.20` | 20px | "Redeem" + balance amount |
| `token.font.line-height.16` | 16px | balance label + earned strip |
| `token.font.family.sans` | 'Figtree', system-ui, sans-serif | all text |

*(14 rows — 13 unique token IDs)*

*Toggle tokens covered by Toggle component spec.*

### ✅ Base state check

| State | Required fields | Status |
|-------|----------------|--------|
| `focus` | n/a (Toggle handles focus) | ✅ Toggle spec covers this |
| `disabled` | n/a | ✅ widget always visible |

---

## Notes

- **TCP vs NeuCoins naming.** The Figma XML uses "TCP" (TATA Consumer Points) terminology in node names and placeholder text. The plan uses "NeuCoins" per the loyalty program branding. The component should be named `NeuCoinsWidget` (user-confirmed name) with the understanding that the data may reference either loyalty scheme depending on the user's app context.
- **Brand logo is an asset.** The 24×24 TCP/NeuCoin logo is an image asset, not a DS icon.
- **Widget height is 153px raw.** Confirmed from Figma node dimensions.
- **Earned strip radius.** If the NeuCoinsWidget sits flush with page edges, the earned strip (bottom) has no border-radius. If inside a card container, apply `radius.8` on the bottom edges only.
