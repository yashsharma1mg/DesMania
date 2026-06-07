# Bottom Sheet — Build Cache
**Built:** 2026-05-26
**Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Dopamine_2.0_Components?node-id=1974-2940

---

## Variant Properties

| Property | Values |
|----------|--------|
| `variant` | `default`, `with-heading-header`, `with-heading-header-and-back`, `with-secondary-line` |

**Active combinations (4 structural variants):**

| variant | header | subtitle | close btn | back btn |
|---------|--------|---------|-----------|---------|
| default | none | — | ✓ | — |
| with-heading-header | title + divider | — | ✓ | — |
| with-heading-header-and-back | title + divider | — | ✓ | ✓ |
| with-secondary-line | title + subtitle + divider | ✓ | ✓ | ✓ |

---

## Spec

`specs/BottomSheet.md`

---

## Token Police Audit

**⚠️ 1 violation — 8/9 token references resolved. 1 uses a primitive with no semantic token.**

### ✅ Passing references (8)

| Token ID | Resolved value | Usage |
|----------|---------------|-------|
| `token.color.background.primary` | #FFFFFF | panel background + header background |
| `token.color.content.primary` | #181A1F | title text |
| `token.color.border.subtle` | #DDE2EB | header divider (1px horizontal rule) |
| `token.shadow.1` | 0 2px 4px 0 rgba(39,43,51,0.06) | close button + back button drop shadow |
| `token.radius.16` | 16px | panel top-left + top-right border-radius |
| `token.radius.full` | 9999px | close button + back button (40×40 full circle) |
| `token.space.16` | 16px | header padding (pt-16, px-16) + gap between header sections |
| `token.space.4` | 4px | gap between title and subtitle (with-secondary-line) |

### ⚠️ Primitive-only references (1)

| Token ID | Resolved value | Usage | Issue |
|----------|---------------|-------|-------|
| `token.color.primitive.cool-neutral.50` | #626A7A | subtitle text (with-secondary-line variant) | No semantic token maps to cool-neutral.50. Figma uses `--color/content/tertiary` (#626A7A) which conflicts with `token.color.content.tertiary` (#868E9E = cool-neutral.60) in tokens.json. Using primitive directly. |

### ✅ Base state check

| State | Required fields | Status |
|-------|----------------|--------|
| `focus` (close button) | ring, ring_width, ring_offset | ✅ token.color.content.primary, 2px, 2px |
| `focus` (back button) | ring, ring_width, ring_offset | ✅ token.color.content.primary, 2px, 2px |
| `disabled` | n/a | ✅ not applicable — always shown when sheet is open |

---

## Notes

- **`content.tertiary` conflict in the subtitle.** Figma's `--color/content/tertiary` = `#626A7A` (cool-neutral.50), but `tokens.json` defines `token.color.content.tertiary` = `#868E9E` (cool-neutral.60). These are two different Figma variable namespaces pointing to different values. Pending DS team resolution. In the meantime, reference `token.color.primitive.cool-neutral.50` directly.
- **Close button shadow is a CSS filter.** Figma shows `filter: drop-shadow(0px 4px 2px rgba(0,0,0,0.08))`. The value doesn't precisely match `token.shadow.1`; `shadow.1` is the semantically closest token. Use the exact Figma filter value for pixel accuracy.
- **Both close and back buttons are 40×40px circles.** `border-radius: 20px` in Figma (= half dimension = full circle). Maps semantically to `token.radius.full` (9999px). No `radius.20` token exists.
- **Button positions are raw px values.** `left: 304px` (close) and `left: 16px` (back) are absolute values measured from the panel's outer container. In implementation, use `right: 16px` for the close button to be responsive to different container widths.
- **Panel height 568px is fixed.** The panel is not dynamic-height in this Figma spec. Content should scroll internally within the fixed panel.
- **Default variant has no header.** The white panel is an empty content slot. Any heading, content, or action buttons within the sheet are provided by the consuming component.
