# Tooltip — Build Cache
**Built:** 2026-05-26
**Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Dopamine_2.0_Components?node-id=2015-3506

---

## Variant Properties

| Property | Values |
|----------|--------|
| `variant` | `top-left`, `top-right`, `bottom-left`, `bottom-right` |
| `closeIcon` | `true`, `false` |

**Active combinations (4 structural variants):**

| variant | caret position | body alignment |
|---------|----------------|----------------|
| top-left | above body, right-aligned caret | left |
| top-right | above body, left-aligned caret | right |
| bottom-left | below body, right-aligned caret | left |
| bottom-right | below body, left-aligned caret | right |

---

## Spec

`specs/Tooltip.md`

---

## Token Police Audit

**✅ 0 violations — 6/6 token references resolved correctly.**

### ✅ Passing references (6)

| Token ID | Resolved value | Usage |
|----------|---------------|-------|
| `token.color.content.primary` | #181A1F | pill background + caret background |
| `token.color.content.inverse` | #FFFFFF | text color + close icon fill |
| `token.space.8` | 8px | pill padding (all sides) |
| `token.space.12` | 12px | caret/body overlap (negative margin) |
| `token.radius.8` | 8px | pill border-radius |
| `token.radius.4` | 4px | caret two-corner radius (top-right + bottom-left) |

### ✅ Base state check

| State | Required fields | Status |
|-------|----------------|--------|
| `focus` | n/a | ✅ not applicable — non-interactive display element |
| `disabled` | n/a | ✅ not applicable |

---

## Notes

- **Caret is a rotated div, not SVG.** `transform: rotate(45deg)` + `-scale-y-100` (top variants only) turns a square into a ▲ tip. Two-corner radius (`border-top-right-radius: 4px; border-bottom-left-radius: 4px`) creates the angular arrowhead from the diamond.
- **Negative margin of `-12px` is `token.space.12`.** Applied as `margin-bottom` on the caret container (top variants) or on the body (bottom variants) to fuse the two shapes visually.
- **Max-width 240px is a raw value.** No token maps to 240px. Hard-code on the body pill element only.
- **Close icon at 12×12px.** Raw size — no icon-size token in the system. The icon slot renders within `overflow: clip` to contain any bleed.
- **Caret container is 41×20px.** These are raw Figma values. The 41px width provides horizontal room for the 15px caret to be positioned left or right within the container without cropping.
