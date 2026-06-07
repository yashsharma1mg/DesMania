# LabTestCard — Build Cache
**Built:** 2026-05-27
**Figma source:** https://www.figma.com/design/T96zjkCns9zCJ2oHYTPe7I/Diagnostics-Ideal-checkout — Cart, SKU Card (node 8553:44241)

---

## Variant Properties

No formal variant properties — content is data-driven (test name, attributes, price, etc.).

---

## Spec

`../../specs/checkout/LabTestCard.md`

---

## Token Police Audit

**Updated 2026-05-28 — preparation section redesign (inline expanded, no chevron).**

**✅ 0 violations — 15/15 token references resolved correctly.**

*One token removed (`token.color.content.tertiary` — chevron, no longer applicable). One token added (`token.color.state.success` — no-preparation checkmark).*

### ✅ Passing references (14)

| Token ID | Resolved value | Usage |
|----------|---------------|-------|
| `token.color.background.primary` | #FFFFFF | card background |
| `token.color.background.subtle` | #EEF1F5 | preparations guide section background |
| `token.color.border.subtle` | #DDE2EB | section divider line |
| `token.color.content.primary` | #181A1F | test name + section heading + preparations row text |
| `token.color.content.secondary` | #414752 | attribute text ("Get report within: 12 hrs") + icon tint |
| `token.color.brand.1mg` | #FF5443 | "Fasting required" attribute |
| `token.color.state.success` | #308956 | no-prep state checkmark icon |
| `token.space.16` | 16px | card horizontal padding + preparations section padding |
| `token.space.12` | 12px | preparations section bottom padding |
| `token.space.8` | 8px | gap: image→text block; gap: attributes→PriceBlock |
| `token.space.2` | 2px | gap between attribute rows |
| `token.font.size.body-14` | 14px | test name + section heading + preparations row text |
| `token.font.size.body-12` | 12px | attribute text ("Fasting required", "Get report within") |
| `token.font.weight.bold` | 700 | test name |
| `token.font.weight.regular` | 400 | attributes + section heading + preparations row |
| `token.font.line-height.20` | 20px | test name + section heading |
| `token.font.line-height.16` | 16px | attribute text |
| `token.font.family.sans` | 'Figtree', system-ui, sans-serif | all text |

*PriceBlock tokens covered by PriceBlock spec. BrandPill tokens covered by BrandPill spec. StepperButton tokens covered by StepperButton spec.*

*(18 rows — 14 unique token IDs)*

### ✅ Base state check

| State | Required fields | Status |
|-------|----------------|--------|
| `focus` | ring, ring_width, ring_offset | ✅ token.color.content.primary, 2px, 2px (card focus ring) |
| `disabled` | n/a | ✅ not applicable — card is always visible |

---

## Notes

- **Preparations guide notch shape.** The speech-bubble cut-out at the top of the preparations section is a CSS custom shape (or SVG clip-path). It is a visual decoration only — no DS token covers this shape.
- **Test image is a circular illustration asset.** The 40×40 blood-drop / organ illustration is a predefined set of lab test category icons, not from the DS icon set.
- **Multi-SKU variant.** When multiple test SKUs are in the cart (Multi cart scenario), each test has its own `LabTestCard`. The patient stepper per card counts patients for that specific test only.
- **"Test added" heading is outside the card.** The bold heading and section subtitle ("Fulfilled by TATA 1mg") appear above the card boundary in the cart layout — they are not part of the LabTestCard component itself.
