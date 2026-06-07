# Vertical Tabs — Build Cache
**Built:** 2026-05-25
**Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Dopamine_2.0_Components?node-id=1897-3816

---

## Variant Properties

| Property | Values |
|----------|--------|
| `state` (tab item) | `default`, `selected` |
| `position` (bar assembly) | `first-selected`, `middle-selected`, `last-selected` |

**Active combinations:**

| variant | Notes |
|---------|-------|
| tab.default | Gray bg, white image container, medium label, no indicator |
| tab.selected | White bg, dark image container, bold label, right-edge indicator |
| bar.first-selected | Selected at top; all below are default |
| bar.middle-selected | Selected flanked by default tabs above and below — user-extended variant |
| bar.last-selected | Selected at bottom; all above are default — user-extended variant |

---

## Spec

`specs/VerticalTabs.md`

---

## Token Police Audit

**✅ 0 violations — 15/15 token references resolved correctly.**

### ✅ Passing references (15)

| Token ID | Resolved value | Usage |
|----------|---------------|-------|
| `token.color.background.primary` | #FFFFFF | bar container bg; selected tab bg |
| `token.color.background.secondary` | #F0F2F5 | default tab bg |
| `token.color.content.primary` | #181A1F | selected image container bg; indicator bar; label text (all states) |
| `token.font.family.sans` | 'Figtree', system-ui, sans-serif | all tab labels |
| `token.font.size.tag-11` | 11px | all tab labels |
| `token.font.weight.bold` | 700 | selected tab label |
| `token.font.weight.medium` | 500 | default tab label |
| `token.font.line-height.16` | 16px | all tab labels |
| `token.radius.16` | 16px | bar container top-left corner radius |
| `token.radius.8` | 8px | image container corner radius (both states) |
| `token.radius.4` | 4px | indicator bar top-left + bottom-left corners |
| `token.space.4` | 4px | tab item gap (image container → label); indicator bar width |
| `token.space.8` | 8px | tab horizontal padding |
| `token.space.12` | 12px | icon centering offset inside 48px image container (derived: (48−24)/2) |
| `token.space.16` | 16px | tab vertical padding |

### ✅ Base state check

| State | Required fields | Status |
|-------|----------------|--------|
| `focus` | ring, ring_width, ring_offset | ✅ all present (`token.color.content.primary`, 2px, 2px) |
| `disabled` | n/a | ✅ not defined in Figma; spec notes fallback pattern |

---

## Notes

- **Three positional variants (first / middle / last) are spec extensions.** Figma shows only the first-selected arrangement (one selected tab at top, rest default). Middle-selected and last-selected are logically derived — the tab item rendering is identical regardless of position. No conditional styling changes based on tab index.
- **Indicator is purely absolute-positioned.** The 4px × 84px right-edge bar uses `position: absolute; right: 0; top: 50%; transform: translateY(-50%)`. The 84px height is a raw derived value: `tab_height(100px) − 2×8px visual breathing room`. The 8px gaps are not padding tokens — they come from centering math.
- **Indicator radius is left-side only.** `border-top-left-radius` and `border-bottom-left-radius` use `token.radius.4`; right corners are square (0). This creates a pill cap facing inward toward the tab content, with the flat edge flush against the bar's right boundary.
- **Icon fill convention.** Tab icons use the `imagesmode_24dp_E8EAED_FILL0` naming convention — the icon SVG fill is #E8EAED (near-white). On the dark selected image container, the light icon is visible. On the white default container, the same icon appears washed out — which is the intended visual treatment to de-emphasise unselected tabs.
- **`token.color.content.primary` serves three semantic roles here.** Image container bg (selected), indicator bar, and label text. All three intentionally use the same dark color to create a cohesive "selected" signal without additional tokens.
- **Bar is scrollable.** The component applies `overflow-y: auto` to support more tabs than the viewport height. Tab height is fixed at 100px; bar height expands to match tab count (e.g. 5 tabs = 500px, not 496px as in Figma — the 496px is a cropped preview height).
