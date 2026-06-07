# SelectDropdown — Build Cache
**Built:** 2026-05-27
**Figma source:** https://www.figma.com/design/T96zjkCns9zCJ2oHYTPe7I/Diagnostics-Ideal-checkout — Add Patient form, Gender field

---

## Variant Properties

| Property | Values |
|----------|--------|
| `state` | `default`, `active`, `selected`, `error`, `disabled` |

**Active combinations (5 states) — mirrors TextField structure with chevron icon:**

| state | border | chevron | notes |
|-------|--------|---------|-------|
| default | border.subtle | content.tertiary (down) | "Gender" placeholder |
| active | brand.1mg | content.primary (up) | Picker is open |
| selected | border.subtle | content.secondary (down) | Selected value shown |
| error | state.error | state.error (down) | Validation failed |
| disabled | border.subtle | content.disabled (down) | bg.subtle bg |

---

## Spec

`../../specs/checkout/SelectDropdown.md`

---

## Token Police Audit

**✅ 0 violations — extends TextField; 3 additional token references, all resolved.**

### ✅ Additional passing references (3 beyond TextField)

| Token ID | Resolved value | Usage |
|----------|---------------|-------|
| `token.color.content.tertiary` | #868E9E | chevron color (default + disabled) |
| `token.color.content.secondary` | #414752 | chevron color (selected) |
| `token.color.content.primary` | #181A1F | chevron color (active/open state) |

All base InputField/TextField tokens carry forward — see `../../specs/InputField.md` and `TextField.md`.

### ✅ Base state check

| State | Required fields | Status |
|-------|----------------|--------|
| `focus` | ring, ring_width, ring_offset | ✅ token.color.brand.1mg, 2px, 2px (inherited) |
| `disabled` | bg, pointer_events | ✅ inherited |

---

## Notes

- **Layout context: half-row.** Paired with DateInput in the Add Patient form — each `flex: 1`, with `gap: token.space.8` between.
- **Chevron icon rotation.** Rotates 180° from chevron-down (closed) to chevron-up (open). CSS `transform: rotate(180deg)` with `transition: 200ms`. No separate token — rotation is a state-driven CSS property.
- **Picker implementation is out of scope.** The SelectDropdown spec covers only the trigger field. The options list (BottomSheet with RadioButton rows, or native OS picker) is a separate implementation concern.
