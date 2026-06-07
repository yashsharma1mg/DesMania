# AccordionCard — Build Cache
**Built:** 2026-05-27
**Figma source:** https://www.figma.com/design/T96zjkCns9zCJ2oHYTPe7I/Diagnostics-Ideal-checkout — Select Patient sheet, accordion card per test SKU

---

## Variant Properties

| Property | Values |
|----------|--------|
| `state` | `collapsed-unselected`, `collapsed-selected`, `expanded` |

**Active combinations (3):**

| state | chevron | success tick | content | footer |
|-------|---------|-------------|---------|--------|
| collapsed-unselected | down | hidden | hidden | hidden |
| collapsed-selected | down | visible | hidden | hidden |
| expanded | up | optional | visible | visible |

---

## Spec

`../../specs/checkout/AccordionCard.md`

---

## Token Police Audit

**✅ 0 violations — 11/11 token references resolved correctly.**

### ✅ Passing references (11)

| Token ID | Resolved value | Usage |
|----------|---------------|-------|
| `token.color.background.primary` | #FFFFFF | card container background |
| `token.color.border.subtle` | #DDE2EB | card outer border; header↔content divider; footer top border |
| `token.color.content.primary` | #181A1F | test name title + focus ring |
| `token.color.content.secondary` | #414752 | "Select N patient" sublabel |
| `token.color.content.tertiary` | #868E9E | chevron icon color |
| `token.color.brand.1mg` | #FF5443 | "View all" + "+ Add new patient" footer links |
| `token.color.primitive.wellness-green.30` | #156437 | success indicator (green checkmark, collapsed-selected) |
| `token.radius.8` | 8px | card border-radius |
| `token.space.16` | 16px | header + footer horizontal padding |
| `token.space.12` | 12px | header + footer vertical padding |
| `token.space.8` | 8px | gap between text block and icon group in header |
| `token.space.4` | 4px | gap between chevron and success tick |
| `token.space.2` | 2px | gap between title and sublabel |
| `token.font.size.body-14` | 14px | title + footer link text |
| `token.font.size.body-12` | 12px | sublabel text |
| `token.font.weight.bold` | 700 | title |
| `token.font.weight.regular` | 400 | sublabel + footer links |
| `token.font.line-height.20` | 20px | title line-height |
| `token.font.line-height.16` | 16px | sublabel + footer line-height |

*(19 rows — 11 unique token IDs with font tokens shared across roles)*

### ✅ Base state check

| State | Required fields | Status |
|-------|----------------|--------|
| `focus` (header) | ring, ring_width, ring_offset | ✅ token.color.content.primary, 2px, 2px |
| `disabled` | n/a | ✅ not applicable |

---

## Notes

- **`wellness-green.30` for success indicator.** Same primitive used in PackOfMultiples "Recommended" discount badge and rating.green Badge. No semantic `state.success-icon` token yet.
- **chevron icon color: `content.tertiary`.** The chevron uses `#868E9E` matching the treatment across Chip, BottomSheet, and other disclosure patterns.
- **Content slot tokens owned by PatientListItem.** The patient rows inside the expanded accordion follow PatientListItem spec. AccordionCard does not re-define them.
- **Expand animation: `max-height` approach.** `height: 0 → auto` is not CSS-animatable. Use `max-height: 0 → 240px` (4 rows × 56px + footer ~48px) with `transition: max-height 200ms ease-in-out`. This stays within the 300ms functional-motion limit from AccessibilityGuidelines.
- **`"+ Add new patient"` footer.** Always visible in expanded state regardless of how many patients exist. The "View all" link is conditional on saved patients exceeding the visible row limit (typically >3–4 rows).
