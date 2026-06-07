# Checkbox — Build Cache
**Built:** 2026-05-25
**Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Dopamine_2.0_Components?node-id=1884-2966

---

## Variant Properties

| Property | Values |
|----------|--------|
| `size` | `large`, `small` |
| `state` | `default`, `selected`, `disable`, `disabled-selected` |

**Active combinations (8 total):**

| size | state | Notes |
|------|-------|-------|
| large | default | White bg, high-contrast border (1px CSS border) |
| large | selected | Brand coral fill, p-2, 20px white checkmark |
| large | disable | White bg, subtle border (1px CSS border) |
| large | disabled-selected | Moderate bg, p-2, 20px white checkmark (muted) |
| small | default | Same tokens, 20×20, 1px border |
| small | selected | Same tokens, 20×20, 16px white checkmark |
| small | disable | Same tokens, 20×20 |
| small | disabled-selected | Same tokens, 20×20, 16px white checkmark |

---

## Spec

`specs/Checkbox.md`

---

## Token Police Audit

**✅ 0 violations — 8/8 token references resolved correctly.**

### ✅ Passing references (8)

| Token ID | Resolved value | Usage |
|----------|---------------|-------|
| `token.color.background.primary` | #FFFFFF | default + disable background |
| `token.color.border.high-contrast` | #868E9E | default border (1px); focus ring |
| `token.color.border.subtle` | #DDE2EB | disable border (1px) |
| `token.color.brand.1mg` | #FF5443 | selected background |
| `token.color.background.moderate` | #DDE2EB | disabled-selected background |
| `token.color.content.inverse` | #FFFFFF | checkmark icon color |
| `token.radius.4` | 4px | corner radius (both sizes) |
| `token.space.2` | 2px | inner padding on selected states |

### ✅ Base state check

| State | Required fields | Status |
|-------|----------------|--------|
| `focus` | ring, ring_width, ring_offset | ✅ all present |
| `disabled` | opacity, pointer_events | ✅ all present |

---

## Notes

- **CSS `border` (unlike RadioButton).** Checkbox default and disable states use a CSS `border` property. RadioButton uses layered circles for the same visual effect. This is the correct distinction from the Figma source — do not apply the layered-circle technique to Checkbox.
- **Inner padding `token.space.2` (2px).** On selected states, 2px padding inside the checkbox constrains the icon: Large = 24 - 4 = 20px icon ✅; Small = 20 - 4 = 16px icon ✅.
- **No indeterminate state.** Figma does not define an indeterminate (partial-check) state. Do not implement one speculatively. If needed, use `aria-checked="mixed"` with a custom visual.
- **`token.radius.4` consistent across both sizes.** Same 4px radius applies to Large and Small — Figma specifies `cr-s-4` for both.
- **Touch targets below WCAG minimum.** Both Large (24×24) and Small (20×20) are below 44px. Consuming layouts must provide 44×44px tap areas.
- **No typography tokens** — Checkbox is a purely visual control with no text content.
