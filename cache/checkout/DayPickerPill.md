# DayPickerPill — Build Cache
**Built:** 2026-05-27
**Figma source:** https://www.figma.com/design/T96zjkCns9zCJ2oHYTPe7I/Diagnostics-Ideal-checkout — Select Slot sheet, horizontal day-picker row

---

## Variant Properties

| Property | Values |
|----------|--------|
| `state` | `unselected`, `selected`, `disabled` |

**Active combinations (3):**

| state | background | border | label color | sublabel color |
|-------|-----------|--------|-------------|---------------|
| unselected | background.primary | border.subtle | content.primary | content.secondary |
| selected | brand.1mg | brand.1mg | background.primary (white) | background.primary (white) |
| disabled | background.subtle | background.subtle | content.tertiary | content.tertiary |

---

## Spec

`../../specs/checkout/DayPickerPill.md`

---

## Token Police Audit

**✅ 0 violations — 18/18 token references resolved correctly.**

### ✅ Passing references (18)

| Token ID | Resolved value | Usage |
|----------|---------------|-------|
| `token.color.background.primary` | #FFFFFF | unselected background; selected text color (white) |
| `token.color.border.subtle` | #DDE2EB | unselected border |
| `token.color.content.primary` | #181A1F | unselected label text |
| `token.color.content.secondary` | #414752 | unselected sublabel text |
| `token.color.brand.1mg` | #FF5443 | selected background + border + focus ring |
| `token.color.background.subtle` | #EEF1F5 | disabled background + border |
| `token.color.content.tertiary` | #868E9E | disabled label + sublabel text |
| `token.radius.8` | 8px | pill border-radius |
| `token.space.12` | 12px | pill horizontal padding |
| `token.space.8` | 8px | pill vertical padding + gap between pills in row |
| `token.space.2` | 2px | gap between label and sublabel |
| `token.font.size.body-14` | 14px | label font-size |
| `token.font.weight.bold` | 700 | label font-weight |
| `token.font.line-height.20` | 20px | label line-height |
| `token.font.size.body-12` | 12px | sublabel font-size |
| `token.font.weight.regular` | 400 | sublabel font-weight |
| `token.font.line-height.16` | 16px | sublabel line-height |
| `token.font.family.sans` | 'Figtree', system-ui, sans-serif | all text |

### ✅ Base state check

| State | Required fields | Status |
|-------|----------------|--------|
| `focus` | ring, ring_width, ring_offset | ✅ token.color.brand.1mg, 2px, 2px |
| `disabled` | pointer_events | ✅ pointer-events: none |

---

## Notes

- **Not the existing Chip component.** Chip is single-line; DayPickerPill has a two-line structure (date label + slot count) that Chip's spec does not accommodate. Flagged in `../_audit_checkout_deltas.md`.
- **Uniform width across all pills.** In the scrollable row, all pills are sized to match the widest one (typically a date like "Fri, 16 Mar") for visual consistency.
- **Touch target extension.** Pill natural height = `2×space.8 (16) + line-height.20 (20) + space.2 (2) + line-height.16 (16) = 54px`. This already exceeds the 44dp minimum — no extension needed.
- **"No slots" vs count.** Disabled pills show "No slots" as the sublabel; enabled pills show "N slots" (singular "1 slot" for one slot).
