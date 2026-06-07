# TimeSlotRow — Build Cache
**Built:** 2026-05-27
**Figma source:** https://www.figma.com/design/T96zjkCns9zCJ2oHYTPe7I/Diagnostics-Ideal-checkout — Select Slot sheet, time slot list rows

---

## Variant Properties

| Property | Values |
|----------|--------|
| `state` | `default`, `selected`, `disabled` |
| `show_surcharge` | `true`, `false` |

**Active combinations (6):**

| state | show_surcharge | notes |
|-------|---------------|-------|
| default | false | Free slot |
| default | true | Paid slot (surcharge in content.secondary) |
| selected | false | Free slot selected |
| selected | true | Paid slot selected (surcharge in brand.1mg) |
| disabled | false | Unavailable slot |
| disabled | true | Unavailable paid slot |

---

## Spec

`../../specs/checkout/TimeSlotRow.md`

---

## Token Police Audit

**✅ 0 violations — 12/12 token references resolved correctly.**

### ✅ Passing references (12)

| Token ID | Resolved value | Usage |
|----------|---------------|-------|
| `token.color.background.primary` | #FFFFFF | row background (all states) |
| `token.color.content.primary` | #181A1F | time range text (default + selected) + focus ring |
| `token.color.content.secondary` | #414752 | surcharge text (default state) |
| `token.color.brand.1mg` | #FF5443 | surcharge text (selected state) |
| `token.color.content.tertiary` | #868E9E | time range + surcharge text (disabled) |
| `token.color.border.subtle` | #DDE2EB | 1px divider between rows |
| `token.space.16` | 16px | row horizontal padding |
| `token.space.12` | 12px | row vertical padding + gap between radio and time range |
| `token.font.size.body-14` | 14px | time range + surcharge font-size |
| `token.font.weight.regular` | 400 | time range + surcharge font-weight |
| `token.font.line-height.20` | 20px | time range + surcharge line-height |
| `token.font.family.sans` | 'Figtree', system-ui, sans-serif | all text |

*RadioButton tokens are owned by the RadioButton component spec.*

### ✅ Base state check

| State | Required fields | Status |
|-------|----------------|--------|
| `focus` (row) | ring, ring_width, ring_offset | ✅ token.color.content.primary, 2px, 2px |
| `disabled` | pointer_events | ✅ pointer-events: none |

---

## Notes

- **Surcharge color shift on selection.** The "+₹50" surcharge text changes from `content.secondary` (neutral) to `brand.1mg` (coral) when the row is selected — signals the surcharge will be applied to the total.
- **No background tint on selected row.** Selection is communicated by the RadioButton control only. Row background stays `background.primary` in all states.
- **Last row divider.** The 1px `border.subtle` divider appears between rows but not after the last row in a group. Implementation: `border-bottom` on all rows except `:last-child`.
- **RadioButton alignment.** The RadioButton control is vertically centred with the time range text (single-line rows). The 48px row height provides comfortable alignment: `(48 - 20) / 2 = 14px` auto-centring via `align-items: center`.
- **Grouping with TimeOfDayHeader.** Each TimeSlotRow group is preceded by a `TimeOfDayHeader`. The consuming layout (SelectSlot page spec) defines the card wrapper and spacing between header and rows.
