# Toggle — Build Cache
**Built:** 2026-05-25
**Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Dopamine_2.0_Components?node-id=1563-298

---

## Variant Properties

| Property | Values |
|----------|--------|
| `state` | `default`, `selected`, `disabled`, `disabled-selected` |

**Active combinations (4 total):**

| state | thumb position | thumb icon | Notes |
|-------|---------------|------------|-------|
| default | left | none | Gray track, white thumb |
| selected | right | check (brand coral) | Coral track, white thumb with check |
| disabled | left | none | Light gray track, white thumb — not interactive |
| disabled-selected | right | check (muted gray) | Light gray track, white thumb with muted check — locked on |

---

## Spec

`specs/Toggle.md`

---

## Token Police Audit

**✅ 0 violations — 7/7 token references resolved correctly.**

### ✅ Passing references (7)

| Token ID | Resolved value | Usage |
|----------|---------------|-------|
| `token.color.border.high-contrast` | #868E9E | default track background; focus ring |
| `token.color.brand.1mg` | #FF5443 | selected track background; selected check icon |
| `token.color.border.subtle` | #DDE2EB | disabled + disabled-selected track background |
| `token.color.background.primary` | #FFFFFF | thumb background (all 4 states) |
| `token.color.content.tertiary` | #868E9E | disabled-selected check icon (muted signal) |
| `token.radius.12` | 12px | track border-radius + thumb border-radius |
| `token.space.2` | 2px | track inner padding (positions thumb, derives thumb size) |

### ✅ Base state check

| State | Required fields | Status |
|-------|----------------|--------|
| `focus` | ring, ring_width, ring_offset | ✅ all present (`token.color.border.high-contrast`, 2px, 2px) |
| `disabled` | opacity, pointer_events | ✅ all present (`opacity: 1`, `pointer_events: none`) |

---

## Notes

- **No size variants.** Toggle is a single fixed-size control: 40×24px track, 20×20px thumb. No large/small distinction exists in Figma.
- **Thumb size is derived, not a direct token.** Track height (24px) − 2 × `token.space.2` (2px) = 20px thumb. Icon size (16px) = 20px thumb − 2×2px inset. Both are documented as raw values in the spec.
- **`token.color.border.high-contrast` and `token.color.content.tertiary` share the same hex (#868E9E)** but are different semantic tokens. `border.high-contrast` is used for the off-state track and focus ring; `content.tertiary` is used for the disabled-selected icon — each reference is intentionally semantic-correct.
- **Disabled opacity is 1.** Unlike most disabled controls (which apply 40% opacity), Toggle's disabled state relies solely on the lighter `border.subtle` track colour to communicate unavailability. Applying additional opacity would bring the white thumb below WCAG contrast minimum.
- **Check icon colours are inferred.** Figma delivers the check as an image asset (SVG). The token assignments (`brand.1mg` for selected, `content.tertiary` for disabled-selected) are semantic inferences consistent with the system — they must be verified against the SVG fill when implementing.
- **Thumb position via flexbox.** Default state: `justify-content: flex-start`. Selected state: `justify-content: flex-end`. Implement thumb motion with `transform: translateX()` for smooth CSS animation — `justify-content` changes are not animatable.
