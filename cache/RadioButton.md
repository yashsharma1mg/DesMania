# RadioButton — Build Cache
**Built:** 2026-05-25
**Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Dopamine_2.0_Components?node-id=1822-1266

---

## Variant Properties

| Property | Values |
|----------|--------|
| `size` | `large`, `small` |
| `state` | `default`, `selected`, `selected-icon`, `disable`, `disable-selected`, `disable-selected-icon` |

**Active combinations (10 total):**

| size | state | Notes |
|------|-------|-------|
| large | default | High-contrast ring, white inner fill |
| large | selected | Brand coral fill, white dot |
| large | selected-icon | Brand coral fill, 20px white icon |
| large | disable | Subtle ring, white inner fill |
| large | disable-selected | Moderate bg, white dot |
| large | disable-selected-icon | Moderate bg, 20px white icon |
| small | default | Same tokens as large.default, 20×20 |
| small | selected | Same tokens as large.selected, 20×20 |
| small | disable | Same tokens as large.disable, 20×20 |
| small | disable-selected | Same tokens as large.disable-selected, 20×20 |

No icon variants defined for Small size.

---

## Spec

`specs/RadioButton.md`

---

## Token Police Audit

**✅ 0 violations — 8/8 token references resolved correctly.**

### ✅ Passing references (8)

| Token ID | Resolved value | Usage |
|----------|---------------|-------|
| `token.color.border.high-contrast` | #868E9E | default ring color; focus ring |
| `token.color.border.subtle` | #DDE2EB | disable ring color |
| `token.color.brand.1mg` | #FF5443 | selected + selected-icon background |
| `token.color.background.moderate` | #DDE2EB | disable-selected + disable-selected-icon background |
| `token.color.background.primary` | #FFFFFF | default inner fill; inner dot/fill on selected states |
| `token.color.content.inverse` | #FFFFFF | icon color in selected-icon and disable-selected-icon |
| `token.radius.full` | 9999px | outer circle shape (both sizes) |
| `token.radius.8` | 8px | inner selection dot (large.selected; large.disable-selected) |

### ✅ Base state check

| State | Required fields | Status |
|-------|----------------|--------|
| `focus` | ring, ring_width, ring_offset | ✅ all present |
| `disabled` | opacity, pointer_events | ✅ all present |

---

## Notes

- **Layered-circle technique, not CSS border.** The ring in default/disable states is achieved by stacking a 24px coloured circle behind a 22×22 white circle — not a `border` property. This differs from Checkbox which uses CSS `border`. Do not substitute with a border.
- **`token.radius.8` on 12px dot.** The inner dot is 12×12px with `border-radius: 8px`. Since 8px > 6px (half the width), this renders as a circle. The Figma explicitly uses `cr-m-8`, not `cr-full`.
- **`token.radius.full` for outer circle.** Figma specifies `cr-l-12` (12px) on 24×24 = exactly circle. Semantically, `token.radius.full` is more correct as the intent is always circular regardless of size.
- **Small size has 4 states only** — no icon variants (selected-icon, disable-selected-icon) are defined for Small in Figma. Do not create them speculatively.
- **No typography tokens** — RadioButton is a purely visual control with no text content.
- **Touch targets below WCAG minimum.** Both Large (24×24) and Small (20×20) are below 44px. Consuming layouts must provide 44×44px tap areas.
