# AddressCard — Build Cache
**Built:** 2026-05-27
**Figma source:** https://www.figma.com/design/T96zjkCns9zCJ2oHYTPe7I/Diagnostics-Ideal-checkout — Choose Address screen (node 8553:46687)

---

## Variant Properties

| Property | Values |
|----------|--------|
| `state` | `unselected`, `selected` |

**Active combinations (2):**

| state | border | radio |
|-------|--------|-------|
| unselected | border.subtle | RadioButton.default |
| selected | brand.1mg | RadioButton.selected |

Three instances seen on Choose Address screen: "Home" (selected), "Mom's office" (unselected), "Home 2" (unselected).

---

## Spec

`../../specs/checkout/AddressCard.md`

---

## Token Police Audit

**⚠️ 1 pending confirmation — 17/18 token references resolved, 1 awaiting Figma measurement.**

### ✅ Passing references (17)

| Token ID | Resolved value | Usage |
|----------|---------------|-------|
| `token.color.background.primary` | #FFFFFF | card background (both states) |
| `token.color.border.subtle` | #DDE2EB | unselected card border |
| `token.color.brand.1mg` | #FF5443 | selected card border + action link text + focus ring |
| `token.color.content.primary` | #181A1F | label text (Home, Mom's office) |
| `token.color.content.secondary` | #414752 | address lines + name + phone text |
| `token.radius.8` | 8px | card border-radius |
| `token.space.16` | 16px | card horizontal padding + gap between Edit and Remove |
| `token.space.12` | 12px | card vertical padding |
| `token.space.8` | 8px | gap between address block and name; gap between phone and actions row |
| `token.space.4` | 4px | gap between label and address block |
| `token.space.2` | 2px | gap between name and phone |
| `token.font.size.body-14` | 14px | address + name + phone + action link font-size |
| `token.font.weight.bold` | 700 | label font-weight |
| `token.font.weight.regular` | 400 | all other text font-weight |
| `token.font.line-height.20` | 20px | address + name + phone + action line-height |
| `token.font.family.sans` | 'Figtree', system-ui, sans-serif | all text |

### ⚠️ Pending confirmation (1)

| Token ID | Likely value | Usage | Status |
|----------|-------------|-------|--------|
| `token.font.size.body-16` OR `token.font.size.title-16` | 16px | label ("Home", "Mom's office") font-size | **Pending Figma node measurement.** The label appears visually larger than 14px. Token `title-16` (16px) already exists in the DS; `body-16` may not. Use `title-16` as fallback until confirmed. |

| `token.font.line-height.24` | 24px | label line-height | Paired with the 16px label — assumed from the `title-16` scale. |

### ✅ Base state check

| State | Required fields | Status |
|-------|----------------|--------|
| `focus` (card) | ring, ring_width, ring_offset | ✅ token.color.brand.1mg, 2px, 2px |
| `focus` (Edit) | ring, ring_width, ring_offset | ✅ token.color.brand.1mg, 2px, 2px |
| `focus` (Remove) | ring, ring_width, ring_offset | ✅ token.color.brand.1mg, 2px, 2px |
| `disabled` | n/a | ✅ not applicable — cards are always selectable |

---

## Notes

- **Selected state: border not background.** Unlike some selection patterns, AddressCard communicates selection via the `brand.1mg` border (not a fill tint). Background remains `background.primary` in both states.
- **Edit and Remove tap targets.** Natural height of action text is 20px — below WCAG minimum. Extend via `padding-block: space.12` to reach 44px total tap height. The extra padding is absorbed upward into the space between phone and actions row.
- **Address line count varies.** Address lines can be 2–4 lines depending on address length. Card height is dynamic; no fixed height. Min height (shortest valid address, 2-line) ≈ 140px.
- **RadioButton alignment: top-aligned to label.** The radio sits flush with the top of the label text (not centred to the full card height). Use `align-items: flex-start` on the row flex container; radio `margin-top: 2px` for optical alignment with the cap-height.
- **Choose Address is a standalone page, not a bottom sheet.** The confirmed screenshot (360×720) shows no sheet chrome. This implies a full-screen route transition, not a `BottomSheet` wrapper. This resolves the open question from the plan: AddressCard is used in a full-page layout.
