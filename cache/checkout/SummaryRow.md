# SummaryRow — Build Cache
**Built:** 2026-05-27
**Figma source:** https://www.figma.com/design/T96zjkCns9zCJ2oHYTPe7I/Diagnostics-Ideal-checkout — Select Slot sheet (node 8730:18157+) + Booking Details sheet

---

## Variant Properties

| Property | Values |
|----------|--------|
| `variant` | `with-change`, `read-only` |
| `icon_type` | `address`, `patient-avatar`, `calendar` |

**Active combinations (3 row instances seen):**

| row | icon_type | variant | notes |
|-----|-----------|---------|-------|
| Sample collection address | address | with-change | 2-line address value |
| Patient | patient-avatar | with-change | Single-name value |
| Sample collection slot | calendar | with-change | "Today, 7:00–8:00 AM" |

---

## Spec

`../../specs/checkout/SummaryRow.md`

---

## Token Police Audit

**✅ 0 violations — 10/10 token references resolved correctly.**

### ✅ Passing references (10)

| Token ID | Resolved value | Usage |
|----------|---------------|-------|
| `token.color.background.primary` | #FFFFFF | row background |
| `token.color.border.subtle` | #DDE2EB | row outer border + grouping card border + divider between rows |
| `token.color.content.secondary` | #414752 | label text ("Sample collection address") |
| `token.color.content.primary` | #181A1F | value text (address, name, slot time) |
| `token.color.brand.1mg` | #FF5443 | "Change" CTA text + chevron icon |
| `token.radius.8` | 8px | row card border-radius |
| `token.space.16` | 16px | horizontal padding |
| `token.space.12` | 12px | vertical padding |
| `token.space.12` | 12px | gap between icon and text block |
| `token.space.2` | 2px | gap between label and value text |
| `token.space.2` | 2px | gap between "Change" text and chevron |
| `token.font.size.body-12` | 12px | label font-size |
| `token.font.size.body-14` | 14px | value + "Change" text font-size |
| `token.font.weight.regular` | 400 | label + "Change" text weight |
| `token.font.weight.bold` | 700 | value text weight |
| `token.font.line-height.16` | 16px | label line-height |
| `token.font.line-height.20` | 20px | value + "Change" line-height |

*(17 rows — 10 unique token IDs; space.12 serves two roles, space.2 serves two roles)*

### ✅ Base state check

| State | Required fields | Status |
|-------|----------------|--------|
| `focus` (Change CTA) | ring, ring_width, ring_offset | ✅ token.color.brand.1mg, 2px, 2px |
| `disabled` | n/a | ✅ not applicable (row is always interactive) |

---

## Notes

- **Leading icon backgrounds are not tokenised.** The address icon sits inside a pink-tinted circle and the calendar icon sits inside a purple-tinted circle. These icon container backgrounds are illustration assets from the Figma, not DS tokens. Use the provided image assets directly.
- **Patient row uses Avatar, not an icon.** The "Patient" row's leading element is an Avatar (40×40, medium) rather than an icon-in-circle. The SummaryRow component should accept either type via an `icon_type` prop.
- **Grouping card.** In the Booking Details sheet, three SummaryRows are grouped inside a single card container (one border wrapping all three rows, with 1px `border.subtle` dividers between rows). This grouping container is the consuming layout's responsibility — not part of the SummaryRow component itself.
- **"Change" CTA touch target.** The `"Change ›"` button is ~60px wide × 20px tall — below the 44dp WCAG minimum. Extend the tap target by padding the button hit area upward/downward to reach 44dp height. The row's visible height of 68px provides enough vertical space.
- **Navigation/Chevron Right.** The Figma uses `Navigation/Chevron Right` instance (18×18) for the "Change ›" arrow — the same component used elsewhere in the DS.
