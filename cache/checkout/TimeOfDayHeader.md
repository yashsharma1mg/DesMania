# TimeOfDayHeader — Build Cache
**Built:** 2026-05-27
**Figma source:** https://www.figma.com/design/T96zjkCns9zCJ2oHYTPe7I/Diagnostics-Ideal-checkout — Select Slot sheet, time-of-day section headers

---

## Variant Properties

| Property | Values |
|----------|--------|
| `period` | `morning`, `afternoon`, `evening` |
| `show_demand_badge` | `true`, `false` |

**Active combinations (6):**

| period | show_demand_badge | notes |
|--------|------------------|-------|
| morning | false | Standard |
| morning | true | "High demand" badge visible |
| afternoon | false | Standard |
| afternoon | true | "High demand" badge visible |
| evening | false | Standard |
| evening | true | "High demand" badge visible |

---

## Spec

`../../specs/checkout/TimeOfDayHeader.md`

---

## Token Police Audit

**✅ 0 violations — 8/8 token references resolved correctly.**

### ✅ Passing references (8)

| Token ID | Resolved value | Usage |
|----------|---------------|-------|
| `token.color.background.primary` | #FFFFFF | header background |
| `token.color.content.primary` | #181A1F | period label text |
| `token.font.size.body-14` | 14px | period label font-size |
| `token.font.weight.bold` | 700 | period label font-weight |
| `token.font.line-height.20` | 20px | period label line-height |
| `token.space.16` | 16px | horizontal padding |
| `token.space.8` | 8px | vertical padding + gap between icon, label, badge |
| `token.font.family.sans` | 'Figtree', system-ui, sans-serif | label text |

*Demand badge tokens are owned by the Badge component spec.*

### ✅ Base state check

| State | Required fields | Status |
|-------|----------------|--------|
| `focus` | n/a | ✅ not applicable — non-interactive |
| `disabled` | n/a | ✅ not applicable |

---

## Notes

- **Weather icons are illustration assets, not DS icons.** The sunrise/sun/sunset glyphs match the decorative illustration style used across the checkout. They are not drawn from the DS icon set and are not recoloured with content tokens.
- **Demand badge depends on Badge `info.success` variant.** This variant is flagged as a gap in `../_audit_checkout_deltas.md` — the Badge component currently lacks a green `info.success` variant. Use `token.color.primitive.wellness-green.30` (#156437) as a stopgap, matching the treatment from AccordionCard and PackOfMultiples.
- **Header is non-interactive.** No focus ring, no hover, no press state.
- **"High demand" copy.** Shown in the Figma for slots where demand is high; the badge appears inline after the period label.
