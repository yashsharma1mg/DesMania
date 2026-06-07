# BrandPill — Build Cache
**Built:** 2026-05-27
**Figma source:** https://www.figma.com/design/T96zjkCns9zCJ2oHYTPe7I/Diagnostics-Ideal-checkout — Cart LabTestCard (node 8553:44245 "Group 13953")

---

## Variant Properties

No formal variant properties — BrandPill is a single-presentation element.

---

## Spec

`../../specs/checkout/BrandPill.md`

---

## Token Police Audit

**✅ 0 violations — 6/6 token references resolved correctly.**

### ✅ Passing references (6)

| Token ID | Resolved value | Usage |
|----------|---------------|-------|
| `token.color.content.secondary` | #414752 | "Fulfilled by" prefix text + info icon tint |
| `token.font.size.body-12` | 12px | prefix font-size |
| `token.font.weight.regular` | 400 | prefix font-weight |
| `token.font.line-height.16` | 16px | prefix line-height |
| `token.space.4` | 4px | gap between prefix/logo/icon |
| `token.font.family.sans` | 'Figtree', system-ui, sans-serif | prefix text |

### ✅ Base state check

| State | Required fields | Status |
|-------|----------------|--------|
| `focus` (info icon) | ring, ring_width, ring_offset | ✅ token.color.content.secondary, 2px, 2px |
| `disabled` | n/a | ✅ not applicable |

---

## Notes

- **Brand logo is an image asset, not tokenised.** The TATA 1mg Labs logo (82×12px) is an inline SVG or PNG asset. It must not be recoloured or sized with DS tokens.
- **Tooltip dependency.** The `ⓘ` info icon opens the existing `Tooltip` component. No new token references are introduced here.
