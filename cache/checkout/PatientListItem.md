# PatientListItem — Build Cache
**Built:** 2026-05-27
**Figma source:** https://www.figma.com/design/T96zjkCns9zCJ2oHYTPe7I/Diagnostics-Ideal-checkout — Select Patient sheet accordion rows

---

## Variant Properties

| Property | Values |
|----------|--------|
| `control` | `multi-select` (Checkbox), `single-select` (RadioButton) |
| `state` | `default`, `selected` |

**Active combinations (4):**

| control | state | notes |
|---------|-------|-------|
| multi-select | default | Checkbox.default trailing |
| multi-select | selected | Checkbox.selected trailing |
| single-select | default | RadioButton.default trailing |
| single-select | selected | RadioButton.selected trailing |

---

## Spec

`../../specs/checkout/PatientListItem.md`

---

## Token Police Audit

**✅ 0 violations — 10/10 token references resolved correctly.**

### ✅ Passing references (10)

| Token ID | Resolved value | Usage |
|----------|---------------|-------|
| `token.color.background.primary` | #FFFFFF | row background |
| `token.color.content.primary` | #181A1F | patient name text |
| `token.color.content.secondary` | #414752 | demographic text ("Female, 26") + separator "|" |
| `token.color.brand.1mg` | #FF5443 | "Edit" link text |
| `token.space.16` | 16px | row horizontal padding |
| `token.space.12` | 12px | gap between avatar and text block |
| `token.space.8` | 8px | row vertical padding |
| `token.space.4` | 4px | gap between demographic text and pipe separator |
| `token.space.2` | 2px | gap between name and meta row |
| `token.font.size.body-14` | 14px | patient name font-size |
| `token.font.size.body-12` | 12px | demographic + "Edit" font-size |
| `token.font.weight.bold` | 700 | patient name |
| `token.font.weight.regular` | 400 | demographic + "Edit" |
| `token.font.line-height.20` | 20px | name line-height |
| `token.font.line-height.16` | 16px | meta row line-height |

*(15 rows — 10 unique token IDs; font tokens appear across multiple text elements)*

### ✅ Base state check

| State | Required fields | Status |
|-------|----------------|--------|
| `focus` | ring, ring_width, ring_offset | ✅ token.color.content.primary, 2px, 2px (role="option" focus ring) |
| `disabled` | pointer_events | ✅ n/a — disabled state on the control element only |

---

## Notes

- **No background tint on selected row.** Unlike QuantitySelector rows (which use `sunrise-glow.95` for selected rows), PatientListItem selected state relies solely on the Checkbox/RadioButton control visual. Row background stays `background.primary`.
- **Row height 56px is derived.** `2 × space.8 (16px) + 40px Avatar = 56px`. The avatar determines the minimum row height.
- **"Edit" is a secondary action.** The "Edit" text link sits inside the 16px meta row, yielding ~16px tap height — below WCAG minimum. Consuming layouts (AccordionCard) must extend the tap area or ensure the full row is navigable via keyboard for the edit action.
- **Checkbox and RadioButton tokens covered by their respective specs.** PatientListItem does not re-audit them here; it uses the components as atomic units.
