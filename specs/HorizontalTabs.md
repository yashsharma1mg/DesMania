# Horizontal Tabs — Spec

> **Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Dopamine_2.0_Components?node-id=1897-4036
> **Component family:** Navigation / Tabs
> **Status:** Draft

---

## Prompt Match

```yaml
prompts:
  - "horizontal tabs"
  - "tab bar"
  - "tab navigation"
  - "underline tabs"
  - "pill tabs"
  - "highlighted tabs"
  - "category tabs"
  - "image tabs"
  - "scrollable tabs"
```

---

## Description

Horizontal Tabs provides two distinct visual modes — **standard (underline)** and **highlighted (pill)** — for switching between content areas. Both modes are non-hierarchical: exactly one tab is selected at a time, and its state is signalled by either an underline indicator or a filled bubble.

**Figma design note:** The indicator and selected-state accent color (default: `token.color.content.primary`) is explicitly marked as configurable — "the colour of the select + default tab state (text + bar) can be any hex code from the DS." The spec documents the Figma default (`content.primary`), but implementations should expose an `accentColor` prop.

### When to use

- **Standard / underline**: Full-width navigation within a page when tabs need to show rich content (images + labels); also text-only for compact horizontal nav
- **Highlighted / pill**: Two-option switchers (A/B), filter toggles, or segmented controls where fewer tabs (2–3) occupy a fixed-width strip
- **Icon + content highlighted**: When each option benefits from a thumbnail preview and a short title+subtext (e.g. service type switcher)

### When NOT to use

- Do not use more than ~5–6 tabs in a standard bar without making it horizontally scrollable
- Do not use highlighted tabs for more than 3 options — use Chip/filter instead
- Do not use tabs for sequential steps — use a Stepper

---

## Anatomy

```
Standard tab bar
┌─────────────────────────────────────────────┐
│  px-16  [ Tab ]  gap-12  [ Tab* ]  gap-12 …  │  ← bg: background.primary
└─────────────────────────────────────────────┘
              ────  4px indicator (accent color on selected)

Individual standard tab item (text-only)
┌──────────────────┐
│  px-12  Label     │  14px, gap-4 between label and indicator slot
│  ─────────────── │  4px indicator div (transparent → accent on select)
└──────────────────┘

Individual standard tab item (image + text)
┌─────────────────┐
│  [ 64×64 ○ ]    │  image circle: background.secondary, radius-full
│  Label text     │  14px label
│  ─────────────  │  4px indicator
└─────────────────┘  total w-80

Highlighted tab bar (simple)
┌──────────────────────────────────────────────┐
│ bg: background.secondary  rounded-24          │
│  [ ████ Selected ████ ]  [ Default text ]    │
└──────────────────────────────────────────────┘
  selected atom: content.primary fill, radius-24, h-40, px-16
  default atom: background.secondary, same dims

Highlighted tab bar (icon + content)
┌──────────────────────────────────────────────┐
│ bg: background.secondary  p-4  rounded-full  │
│  [ img Title      ]  [ ██ img Title      ██ ]│
│  [     Subtext    ]  [ ██     Subtext    ██ ]│
└──────────────────────────────────────────────┘
  atoms: px-8 py-4 rounded-full; image: 32×32 rounded-full border.subtle bg
```

---

## Variants

### standard.text-only

```yaml
standard.text-only.default:
  element: button
  role: tab
  aria_selected: "false"
  tokens:
    label_color: token.color.content.primary        # #181A1F — same color for both states, weight changes
    label_font_family: token.font.family.sans
    label_font_size: token.font.size.body-14
    label_font_weight: token.font.weight.regular    # 400
    label_line_height: token.font.line-height.20
    padding_x: token.space.12
    indicator_color: transparent                    # invisible in default
    indicator_height: token.space.4                # 4px

standard.text-only.selected:
  tokens:
    label_color: token.color.content.primary
    label_font_weight: token.font.weight.bold       # 700 — weight change is the selected signal
    indicator_color: token.color.content.primary    # accent; configurable — see design note
```

### standard.image-single-text

```yaml
standard.image-single-text.default:
  element: button
  role: tab
  aria_selected: "false"
  tokens:
    image_container_bg: token.color.background.secondary   # #F0F2F5 — placeholder circle
    image_container_radius: token.radius.full              # circle (raw Figma: 40px on 64px container)
    image_container_size: 64px                             # raw
    icon_size: 24px                                        # raw
    icon_offset: token.space.20                            # 20px = (64−24)/2 — centering derivation
    label_color: token.color.content.primary
    label_font_family: token.font.family.sans
    label_font_size: token.font.size.body-14
    label_font_weight: token.font.weight.regular
    label_line_height: token.font.line-height.20
    item_gap: token.space.4
    indicator_color: transparent
    indicator_height: token.space.4
    item_width: 80px                                       # raw

standard.image-single-text.selected:
  tokens:
    label_font_weight: token.font.weight.bold              # standardised; see note
    indicator_color: token.color.content.primary
```

### standard.image-double-text

```yaml
standard.image-double-text.default:
  note: >
    Identical structure to image-single-text but label wraps to 2 lines.
    Height expands from 96px to 116px (raw).
  tokens:
    # all same as image-single-text.default

standard.image-double-text.selected:
  tokens:
    label_font_weight: token.font.weight.bold
    indicator_color: token.color.content.primary
```

### highlighted.text-only

```yaml
highlighted.text-only.default:
  element: button
  role: tab
  aria_selected: "false"
  tokens:
    atom_bg: token.color.background.secondary              # #F0F2F5
    atom_height: 40px                                      # raw
    atom_radius: token.radius.24                           # 24px
    atom_padding_x: token.space.16
    label_color: token.color.primitive.cool-neutral.40     # #4E5665 — see Poppins note
    label_font_family: token.font.family.sans              # standardised; see note
    label_font_size: token.font.size.body-14
    label_font_weight: token.font.weight.medium            # 500 — matches Figma intent
    label_line_height: token.font.line-height.20

highlighted.text-only.selected:
  tokens:
    atom_bg: token.color.content.primary                   # #181A1F
    label_color: token.color.content.inverse               # #FFFFFF
    label_font_weight: token.font.weight.bold              # 700

highlighted.bar_container:
  tokens:
    background: token.color.background.secondary
    radius: token.radius.24
    layout: flex items-start (atoms flex-1 each)
```

### highlighted.icon-content

```yaml
highlighted.icon-content.default:
  element: button
  role: tab
  aria_selected: "false"
  tokens:
    atom_padding_x: token.space.8
    atom_padding_y: token.space.4
    atom_gap: token.space.4                                # gap between image and text block
    atom_radius: token.radius.full
    image_container_size: 32px                             # raw
    image_container_padding: token.space.8
    image_container_bg: token.color.border.subtle          # #DDE2EB — same in both states
    image_container_radius: token.radius.full
    icon_size: 16px                                        # raw — 32 − 2×8px padding
    title_color: token.color.primitive.cool-neutral.0      # #000000 — see note
    title_font_family: token.font.family.sans
    title_font_size: token.font.size.body-16
    title_font_weight: token.font.weight.bold
    title_line_height: token.font.line-height.24
    subtext_color: token.color.content.secondary           # #414752
    subtext_font_family: token.font.family.sans
    subtext_font_size: token.font.size.tag-11
    subtext_font_weight: token.font.weight.regular
    subtext_line_height: token.font.line-height.16
    subtext_overflow: ellipsis (1-line max)

highlighted.icon-content.selected:
  tokens:
    atom_bg: token.color.content.primary                   # #181A1F
    title_color: token.color.content.inverse               # #FFFFFF
    subtext_color: token.color.content.inverse             # #FFFFFF
    image_container_bg: token.color.border.subtle          # unchanged from default

highlighted.icon-content.bar_container:
  tokens:
    background: token.color.background.secondary
    padding: token.space.4
    radius: token.radius.full
    layout: flex items-center (atoms flex-1 each)
```

---

## Standard Tab Bar — Composition

```yaml
standard_tab_bar:
  container:
    background: token.color.background.primary
    padding_x: token.space.16
    gap: token.space.12
    overflow_x: auto (scroll when tabs exceed viewport)
    bottom_separator: >
      1px solid token.color.border.subtle — consuming layout's responsibility.
      Not defined inside the component; add via border-bottom or a sibling element.
  tab_items:
    min_width: fit-content
    height: 28px (text-only) | 96px (image-single) | 116px (image-double)
```

---

## States

```yaml
focus:
  applies_to: [all tab variants]
  ring: token.color.content.primary
  ring_width: 2px
  ring_offset: 2px

hover:
  applies_to: [all tab variants]
  note: No hover token defined in Figma. Consuming implementation may add opacity or bg tint.
```

---

## Accessibility

```html
<!-- Tab bar container -->
<div role="tablist" aria-label="Section navigation">
  <button role="tab" aria-selected="false" aria-controls="panel-1" id="tab-1">Text</button>
  <button role="tab" aria-selected="true" aria-controls="panel-2" id="tab-2">Text</button>
</div>

<!-- Panel linked to each tab -->
<div role="tabpanel" id="panel-2" aria-labelledby="tab-2">…</div>
```

- Use `aria-selected="true"` on the active tab; `false` on all others
- `aria-controls` + `id` pairing links each tab to its panel
- Images inside tab items are decorative — `alt=""`, `aria-hidden="true"`
- If tabs have only an image (no label), add `aria-label` to the button

---

## Implementation Notes

**Accent color is a prop.** The Figma design note explicitly states the indicator + selected text color is customizable. Default to `token.color.content.primary`, but expose as a prop.

**Highlighted simple tab — Poppins inconsistency.** Figma uses `Poppins:Medium` for the default (unselected) atom text. Poppins is not in the Dopamine 2.0 font token system. Standardize on `token.font.family.sans` (Figtree) at `font.weight.medium` (500). Flag Figma for correction.

**Icon+content default title uses `cool-neutral.0` (#000000).** This is slightly darker than `content.primary` (#181A1F). The difference is subtle — treat as a Figma nuance and consider whether to align to `content.primary` for semantic consistency. Both are valid primitives.

**Image-single-text selected label weight.** Figma renders the selected single-image tab with Regular weight (not Bold). This is inconsistent with text-only and double-text selected. Standardize on `font.weight.bold` for all selected standard tab labels.

**Bottom separator.** The 1px divider line below the standard tab bar is visible in Figma but is a separate section element, not part of the tab bar component. Consuming layouts add it via `border-bottom: 1px solid token.color.border.subtle` on the tab bar container or as a sibling `<hr>`.

**Scrollable standard bars.** When the number of tabs exceeds viewport width, apply `overflow-x: auto; white-space: nowrap` to the bar container. Ensure touch momentum scrolling (`-webkit-overflow-scrolling: touch`) for iOS.
