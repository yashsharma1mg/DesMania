# AdditionalServicesRow — Build Cache
**Built:** 2026-05-27
**Figma source:** https://www.figma.com/design/T96zjkCns9zCJ2oHYTPe7I/Diagnostics-Ideal-checkout — Cart, VAS section (node 8553:43921)

---

## Variant Properties

| Property | Values |
|----------|--------|
| `state` | `unselected`, `selected` |
| `show_tooltip` | `true`, `false` |

---

## Spec

`../../specs/checkout/AdditionalServicesRow.md`

---

## Token Police Audit

**✅ 0 violations — 9/9 token references resolved correctly.**

### ✅ Passing references (9)

| Token ID | Resolved value | Usage |
|----------|---------------|-------|
| `token.color.background.primary` | #FFFFFF | row background |
| `token.color.border.subtle` | #DDE2EB | divider between rows |
| `token.color.content.primary` | #181A1F | service title text + focus ring |
| `token.color.content.secondary` | #414752 | description text + info icon |
| `token.space.16` | 16px | row horizontal padding + vertical padding |
| `token.space.8` | 8px | gap: icon→text block + gap: title→price |
| `token.font.size.body-14` | 14px | service title font-size |
| `token.font.size.body-12` | 12px | description text font-size |
| `token.font.weight.bold` | 700 | service title |
| `token.font.weight.regular` | 400 | description text |
| `token.font.line-height.20` | 20px | service title line-height |
| `token.font.line-height.16` | 16px | description line-height |
| `token.font.family.sans` | 'Figtree', system-ui, sans-serif | all text |

*(13 rows — 9 unique token IDs)*

*Checkbox tokens covered by Checkbox spec. PriceBlock tokens covered by PriceBlock spec.*

### ✅ Base state check

| State | Required fields | Status |
|-------|----------------|--------|
| `focus` | ring, ring_width, ring_offset | ✅ token.color.content.primary, 2px, 2px |
| `disabled` | n/a | ✅ not applicable — rows always selectable |

---

## Notes

- **Service illustration icons are assets.** The 48×48 service icons (printer, doctor/call icon) are custom illustration assets from the Figma, not from the DS icon set. Two services seen: "Hard copy" (printer) and "Premium collection" (call/phone icon).
- **Row height 83px is raw.** Derived from Figma node dimensions (Group 48096593 + 48096594 both 328×83). No space token covers this height.
- **Section container.** The two VAS rows are enclosed in a section with heading "Add services for a better experience" and a subtitle. The section uses no outer border (flush page edges). This is the consuming page layout's responsibility.
