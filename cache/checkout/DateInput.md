# DateInput — Build Cache
**Built:** 2026-05-27
**Figma source:** https://www.figma.com/design/T96zjkCns9zCJ2oHYTPe7I/Diagnostics-Ideal-checkout?node-id=8700-25638

---

## Variant Properties

| Property | Values |
|----------|--------|
| `state` | `default`, `active`, `filled`, `error`, `disabled` |

**Active combinations (5 states) — inherits all from TextField:**

| state | border | icon color | notes |
|-------|--------|-----------|-------|
| default | border.subtle | content.tertiary | "Date of birth" placeholder |
| active | brand.1mg | content.secondary | Calendar icon persists |
| filled | border.subtle | content.secondary | Shows formatted date value |
| error | state.error | state.error | Error message below |
| disabled | border.subtle | content.disabled | bg.subtle background |

---

## Spec

`../../specs/checkout/DateInput.md`

---

## Token Police Audit

**✅ 0 violations — extends TextField; 3 additional token references, all resolved.**

### ✅ Additional passing references (3 beyond TextField)

| Token ID | Resolved value | Usage |
|----------|---------------|-------|
| `token.color.content.tertiary` | #868E9E | calendar icon color (default + disabled) |
| `token.color.content.secondary` | #414752 | calendar icon color (active + filled) |
| `token.space.12` | 12px | right margin for trailing icon (same token already in TextField) |

All base InputField/TextField tokens carry forward — see `../../specs/InputField.md` and `TextField.md`.

### ✅ Base state check

| State | Required fields | Status |
|-------|----------------|--------|
| `focus` | ring, ring_width, ring_offset | ✅ token.color.brand.1mg, 2px, 2px (inherited from TextField) |
| `disabled` | bg, pointer_events | ✅ inherited |

---

## Notes

- **Layout context: half-row.** DateInput and SelectDropdown share a horizontal row in the Add Patient form with `gap: token.space.8` between them. Each is `flex: 1` (≈50% width on 360px canvas = ~168px minus the 8px gap).
- **Icon is decorative until tapped.** The calendar icon provides a date-picker affordance. In the initial implementation, tapping anywhere on the input may open the native OS date picker. The icon itself does not require a separate touch target if the whole input field is tappable.
- **No dedicated calendar icon token.** The calendar icon uses `content.tertiary` / `content.secondary` based on state, matching the general icon colour treatment across the DS.
