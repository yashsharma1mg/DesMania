# Vertical Tabs — Spec

> **Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Dopamine_2.0_Components?node-id=1897-3816
> **Component family:** Navigation / Tabs
> **Status:** Draft

---

## Prompt Match

```yaml
prompts:
  - "vertical tabs"
  - "vertical tab bar"
  - "side navigation"
  - "category sidebar"
  - "left rail tabs"
  - "vertical category selector"
```

---

## Description

Vertical Tabs is a scrollable left-rail navigation component. Each tab item displays a square image container above a short text label. The selected tab is signalled by a white background, a dark-filled image container, and a bold label. A 4px vertical indicator bar is absolutely positioned on the right edge of the selected tab. All other tabs use a muted background with a white image container and a medium-weight label.

The component renders exactly one selected tab at a time. The user-requested spec covers all three positional contexts: **first-selected**, **middle-selected**, and **last-selected** — which differ only in which surrounding tabs are in the default (muted) state.

### When to use

- Left-rail category navigation in browsing or marketplace contexts
- When 4–8 sibling categories must be visible simultaneously
- When each category has a visual identity (icon or image) that aids recognition

### When NOT to use

- Do not use for fewer than 3 tabs — use `Chip/selection` instead
- Do not use horizontal tab sets vertically — this component is column-only
- Do not use without an associated content panel; the tab bar is always paired with a scrollable content area to its right

---

## Anatomy

```
Vertical tab bar (88px wide, scrollable column)
┌──────────────────────────┐
│  [ selected tab        ] │ ← white bg, dark image box, bold label, right indicator
│  [ default tab         ] │ ← secondary bg, white image box, medium label
│  [ default tab         ] │
│  [ default tab         ] │
│  [ default tab         ] │
└──────────────────────────┘
  bar width: 88px
  bar top-left radius: token.radius.16
  scrollable: overflow-y auto

Tab item (88×100px)
┌──────────────────────────┐  ← px-8 py-16, flex-col gap-4, items-center justify-center
│ ┌──────────────────────┐ │
│ │  [    icon 24×24   ] │ │  ← 48×48px container, radius-8
│ └──────────────────────┘ │
│       Label text          │  ← 11px, centered
└──────────────────────────┘  4px wide indicator, absolutely on right edge (selected only)
                            ▐  indicator: h=84px, radius-4 on tl+bl
```

---

## Tab Item States

### tab.default

```yaml
tab.default:
  element: button
  role: tab
  aria_selected: "false"
  tokens:
    tab_background: token.color.background.secondary    # #F0F2F5
    tab_padding_x: token.space.8
    tab_padding_y: token.space.16
    tab_gap: token.space.4                              # gap between image container and label
    image_container_size: 48px                         # raw
    image_container_bg: token.color.background.primary  # #FFFFFF — white box on gray tab
    image_container_radius: token.radius.8
    icon_size: 24px                                    # raw
    icon_offset: token.space.12                        # 12px = (48−24)/2 — centering
    label_color: token.color.content.primary           # #181A1F
    label_font_family: token.font.family.sans
    label_font_size: token.font.size.tag-11
    label_font_weight: token.font.weight.medium        # 500
    label_line_height: token.font.line-height.16
    label_text_align: center
  indicator: none
```

### tab.selected

```yaml
tab.selected:
  element: button
  role: tab
  aria_selected: "true"
  tokens:
    tab_background: token.color.background.primary     # #FFFFFF — white tab on gray bar
    tab_padding_x: token.space.8
    tab_padding_y: token.space.16
    tab_gap: token.space.4
    image_container_size: 48px
    image_container_bg: token.color.content.primary    # #181A1F — inverted: dark box on white tab
    image_container_radius: token.radius.8
    icon_size: 24px
    icon_offset: token.space.12
    label_color: token.color.content.primary           # #181A1F
    label_font_family: token.font.family.sans
    label_font_size: token.font.size.tag-11
    label_font_weight: token.font.weight.bold          # 700
    label_line_height: token.font.line-height.16
    label_text_align: center
  indicator:
    position: absolute
    side: right (right: 0, top: 50%, transform: translateY(−50%))
    width: token.space.4                               # 4px
    height: 84px                                       # raw — derived: tab_height(100) − 2×8px visual gap
    bg: token.color.content.primary                    # #181A1F
    radius_tl: token.radius.4                          # 4px — only top-left + bottom-left rounded
    radius_bl: token.radius.4                          # creates inward-facing pill cap
    radius_tr: 0
    radius_br: 0
```

---

## Positional Assembly Variants

The tab item rendering is identical regardless of position. The following variants document the **bar-level composition** for the three positional contexts.

### bar.first-selected

```yaml
bar.first-selected:
  description: The topmost tab is selected; all tabs below are default.
  visual_context: >
    Selected tab sits at the top of the bar. Indicator is at the right edge of the first slot.
    No neighboring tab above — the bar's rounded top-left corner (token.radius.16) is visible
    directly above the selected tab.
  order: [selected, default, default, default, ...]
```

```
┌──────────────────────────┐  ← rounded-tl-16
│  [ ██ selected ██ ]    ▐ │  ← white bg, dark image, bold, indicator right
│  [   default      ]      │
│  [   default      ]      │
│  [   default      ]      │
│  [   default      ]      │
└──────────────────────────┘
```

### bar.middle-selected

```yaml
bar.middle-selected:
  description: A tab that is neither first nor last is selected; tabs above and below are default.
  visual_context: >
    Selected tab is flanked on both sides by default (gray) tabs. The indicator at the right
    creates a visual "notch" in an otherwise uniform gray column. This is the most common
    in-use state after the user has navigated away from the first tab.
  order: [default, ..., selected, ..., default]
```

```
┌──────────────────────────┐
│  [   default      ]      │
│  [   default      ]      │
│  [ ██ selected ██ ]    ▐ │  ← white bg, indicator right
│  [   default      ]      │
│  [   default      ]      │
└──────────────────────────┘
```

### bar.last-selected

```yaml
bar.last-selected:
  description: The bottommost tab is selected; all tabs above are default.
  visual_context: >
    Selected tab sits at the bottom of the visible/scrolled-to area. The gray column above
    terminates at the white selected tab. No neighboring tab below.
  order: [default, default, default, ..., selected]
```

```
┌──────────────────────────┐
│  [   default      ]      │
│  [   default      ]      │
│  [   default      ]      │
│  [   default      ]      │
│  [ ██ selected ██ ]    ▐ │  ← indicator aligns to right edge of last slot
└──────────────────────────┘
```

---

## Bar Container

```yaml
vertical_tab_bar:
  width: 88px                                  # raw — fixed
  height: auto                                 # grows with tab count; typically 496px for 5 tabs
  tab_height: 100px                            # raw — each slot is fixed 100px
  background: token.color.background.primary   # #FFFFFF
  radius_tl: token.radius.16                   # top-left only — bar sits flush against content panel
  overflow_y: auto                             # scrollable when tabs exceed viewport
  display: flex flex-col items-end
  note: >
    items-end ensures the right-edge indicator aligns to the bar's right boundary
    without overflowing into the content panel.
```

---

## States

```yaml
focus:
  applies_to: [tab.default, tab.selected]
  ring: token.color.content.primary
  ring_width: 2px
  ring_offset: 2px

disabled:
  note: No disabled state defined in Figma. If needed, apply opacity 0.4 + pointer-events none.
```

---

## Accessibility

```html
<!-- Vertical tab bar -->
<div role="tablist" aria-label="Categories" aria-orientation="vertical">
  <button role="tab" aria-selected="false" aria-controls="panel-1" id="tab-1">
    <img aria-hidden="true" alt="" src="…" />
    <span>Category</span>
  </button>
  <button role="tab" aria-selected="true" aria-controls="panel-2" id="tab-2">
    <img aria-hidden="true" alt="" src="…" />
    <span>Category</span>
  </button>
</div>

<!-- Linked content panel -->
<div role="tabpanel" id="panel-2" aria-labelledby="tab-2">…</div>
```

- `aria-orientation="vertical"` enables arrow-key navigation (↑ / ↓) in assistive technologies
- `aria-selected="true"` on the active tab; `false` on all others
- Images are decorative; label `<span>` carries the accessible name
- If the bar scrolls, ensure keyboard users can reach off-screen tabs via arrow keys without a visible scroll mechanism

---

## Content Guidelines

- **Label**: 1–2 words, title case (e.g. "Vitamins", "Skin Care")
- **Icon**: 24×24px, monochrome; color is determined by the image container state (white on dark bg = container inverts the icon visually if icon is white-on-dark SVG)
- Do not exceed 12 characters in a label — the 88px column cannot accommodate longer text without overflow

---

## Composition

```yaml
composition:
  can_contain: []
  can_be_contained_by: [CategoryBrowsePage, MarketplaceLayout]
  pairing: >
    Always rendered adjacent to a scrollable content panel. The tab bar sits on the left;
    the content panel fills the remaining width. Selecting a tab scrolls or replaces
    the content panel without a page navigation.
```

---

## Implementation Notes

**Indicator geometry.** The 4px indicator is `position: absolute; right: 0; top: 50%; transform: translateY(-50%)`. Height is 84px (= tab height 100px − 2×8px visual breathing room). The 8px gap top and bottom is not a padding token — it is derived from the centering math. Only the top-left and bottom-left corners have `border-radius: token.radius.4`; the right corners are square so the bar connects flush to any right-side element.

**Image icon color.** The 24×24 icon inside the image container renders as white in the default state (white icon on white bg = invisible? No — the icon SVG uses `#E8EAED` as its own fill from the `imagesmode_24dp_E8EAED_FILL0` naming convention visible in Figma). In the selected state, the container is dark (`content.primary`), making the light gray icon visible against it. Ensure icons are provided in the `#E8EAED` fill variant for this component.

**Bar `overflow-y: auto`.** Figma sets `overflow-x: clip; overflow-y: auto` on the bar, enabling vertical scroll without horizontal bleed. On touch devices, add `-webkit-overflow-scrolling: touch`.

**First/middle/last positional variants** differ only in surrounding context. No conditional styling is applied to the selected tab based on its index. Indicator rendering is always identical — position is handled by `position: absolute` on the indicator element inside the tab button.
