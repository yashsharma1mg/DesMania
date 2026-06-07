# Chip — Spec

> **Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Dopamine_2.0_Components?node-id=1682-4434
> **Component family:** Selection / Filtering
> **Status:** Draft

---

## Prompt Match

```yaml
prompts:
  - "chip"
  - "selection chip"
  - "filter chip"
  - "tag chip"
  - "small chip"
  - "date chip"
  - "time chip"
  - "timestamp chip"
  - "category chip"
  - "filter tag"
  - "date picker chip"
  - "time slot chip"
```

---

## Description

Chip is a family of compact interactive labels used for selection, filtering, and date/time picking. It covers four distinct sub-types — `selection` (toggleable selection chip with optional leading/trailing icon), `filter` (filter chip that shows a close action when selected), `small` (compact variant for dense layouts), and `timestamp` (date/time picker specialisation with distinct vertical or horizontal layout). All sub-types share rounded-16 pill geometry and the same dark selected treatment.

### When to use

- **Selection**: To let users toggle a single option or attribute (e.g. category, tag, variant) — replaces a checkbox in horizontal scroll lists
- **Filter**: To show active filter state with the affordance to clear it via a close icon tap
- **Small**: In very dense chip rows where standard py-8 would create too much vertical height
- **Timestamp**: In scheduling or delivery selection flows that require date or time slot picking

### When NOT to use

- Do not use chips for primary page-level actions — use `Button` instead
- Do not use selection chips as substitutes for `RadioButton` or `CheckboxItem` in vertical form lists
- Do not mix `selection` and `filter` chips in the same row — their selected-state affordances differ
- Do not use `timestamp` chips for free-text time input — use a `TimePicker` input instead

---

## Anatomy

```
Selection Chip (default, no icon)
┌──────────────────────┐
│  px-12  [ Label ]  px-12  │
│  py-8                │
└──────────────────────┘
radius: 16px

Selection Chip (leading icon)
┌──────────────────────────────────┐
│  px-12  [icon 16×16]  gap-4  [ Label ]  px-12  │
│  py-8                            │
└──────────────────────────────────┘

Selection Chip (trailing icon)
┌──────────────────────────────────┐
│  px-12  [ Label ]  gap-4  [icon 16×16]  px-12  │
│  py-8                            │
└──────────────────────────────────┘

Selection Chip (selected + badge)
┌──────────────────────┐
│  px-12  [ Label ]  px-12  │   ← chip (dark bg)
└──────────────────────┘
  ↑ badge overlaid top-right: 16px red circle + 11px count

Filter Chip (selected)
┌─────────────────────────────────────┐
│  px-12  [ Label ]  gap-4  [✕ 16×16]  px-12  │
│  py-8                               │
└─────────────────────────────────────┘

Small Chip
┌──────────────────────┐
│  px-12  [ Label ]  px-12  │
│  py-4                │
└──────────────────────┘

Timestamp — Date (56px wide, vertical)
┌──────────┐
│  Mon     │  ← day name, 12px Regular
│   14     │  ← date number, 12px Medium
│  Apr     │  ← month, 12px Regular
└──────────┘
width: 56px (fixed), height: auto

Timestamp — Time (auto width, horizontal)
┌───────────────────────────┐
│  px-16  [ 10:00 AM ]  px-16  │
│  py-12                   │
└───────────────────────────┘
```

**Key elements:**
- **Label**: text content of the chip — sentence case
- **Leading icon** (selection, filter — optional): 16×16px icon from Dopamine icon set; precedes the label
- **Trailing icon** (selection — optional): 16×16px icon; follows the label
- **Close icon** (filter selected): 16×16px circular ✕ icon; always trailing; white on dark bg
- **Badge** (selection selected+badge): 16×16px red circle overlaid on chip, carries count text at 11px
- **Date lines** (timestamp-date): three stacked text rows — day name, date number, month

---

## Variants

### selection.default
```yaml
selection.default:
  use_when: "Option not yet selected; compact selection list context"
  element: button
  props:
    icon_position: none | leading | trailing
  tokens:
    background: token.color.background.primary
    foreground: token.color.content.primary
    border: token.color.border.subtle
    border_width: 1px
    padding_x: token.space.12
    padding_y: token.space.8
    gap: token.space.4
    radius: token.radius.16
```

### selection.disable
```yaml
selection.disable:
  use_when: "Option is unavailable but must remain visible in the chip row"
  element: button
  props:
    icon_position: none | leading | trailing
  tokens:
    background: token.color.background.primary
    foreground: token.color.primitive.cool-neutral.50  # deliberate primitive — no semantic content token covers cool-neutral.50 (#626A7A); nearest semantics (content.disabled, content.tertiary) both resolve to cool-neutral.60
    border: token.color.border.subtle
    border_width: 1px
    padding_x: token.space.12
    padding_y: token.space.8
    gap: token.space.4
    radius: token.radius.16
```

### selection.selected
```yaml
selection.selected:
  use_when: "Option is selected"
  element: button
  props:
    icon_position: none | leading | trailing
  tokens:
    background: token.color.primitive.cool-neutral.10  # deliberate primitive exception — same approved precedent as Button fill.secondary, StepperButton filled, IconButton special-button; no semantic background token covers #181A1F
    foreground: token.color.content.inverse
    icon_color: token.color.content.inverse
    border: none
    padding_x: token.space.12
    padding_y: token.space.8
    gap: token.space.4
    radius: token.radius.16
```

### selection.selected-disable
```yaml
selection.selected-disable:
  use_when: "Option was selected but became unavailable (e.g. product variant sold out after selection)"
  element: button
  tokens:
    background: token.color.background.moderate
    foreground: token.color.primitive.cool-neutral.50  # deliberate primitive — same as selection.disable; no semantic token covers cool-neutral.50
    border: none
    padding_x: token.space.12
    padding_y: token.space.8
    radius: token.radius.16
```

### selection.selected-badge
```yaml
selection.selected-badge:
  use_when: "Option is selected AND has a count or notification indicator (e.g. number of items matching this filter)"
  element: button
  tokens:
    background: token.color.primitive.cool-neutral.10  # same primitive exception as selection.selected
    foreground: token.color.content.inverse
    border: none
    padding_x: token.space.12
    padding_y: token.space.8
    radius: token.radius.16
  badge:
    size: 16px  # raw value; no size token in scale
    background: token.color.brand.1mg
    foreground: token.color.content.inverse
    radius: token.radius.full
    position: top-right overlay
```

### filter.default
```yaml
filter.default:
  use_when: "Filter not yet applied; compact filter row context"
  element: button
  props:
    leading_icon: boolean
  tokens:
    background: token.color.background.primary
    foreground: token.color.content.primary
    icon_color: token.color.content.primary
    border: token.color.border.subtle
    border_width: 1px
    padding_x: token.space.12
    padding_y: token.space.8
    gap: token.space.4
    radius: token.radius.16
```

### filter.selected
```yaml
filter.selected:
  use_when: "Filter is active — shows label plus a trailing close icon to clear it"
  element: button
  props:
    leading_icon: boolean
  tokens:
    background: token.color.primitive.cool-neutral.10  # same approved primitive exception
    foreground: token.color.content.inverse
    icon_color: token.color.content.inverse
    border: none
    padding_x: token.space.12
    padding_y: token.space.8
    gap: token.space.4
    radius: token.radius.16
  close_icon:
    size: 16px
    color: token.color.content.inverse
```

### filter.disable
```yaml
filter.disable:
  use_when: "Filter option exists but is currently unavailable to select"
  element: button
  tokens:
    background: token.color.background.primary
    foreground: token.color.primitive.cool-neutral.50  # deliberate primitive — same as selection.disable; no semantic token covers cool-neutral.50
    border: token.color.border.subtle
    border_width: 1px
    padding_x: token.space.12
    padding_y: token.space.8
    gap: token.space.4
    radius: token.radius.16
```

### filter.selected-disable
```yaml
filter.selected-disable:
  use_when: "Filter was active but the filtered category became unavailable"
  element: button
  tokens:
    background: token.color.background.moderate
    foreground: token.color.primitive.cool-neutral.50  # deliberate primitive — same as selection.disable; no semantic token covers cool-neutral.50
    border: none
    padding_x: token.space.12
    padding_y: token.space.8
    radius: token.radius.16
```

### small.default
```yaml
small.default:
  use_when: "Compact chip in a dense horizontal row where standard py-8 creates too much vertical height"
  element: button
  tokens:
    background: token.color.background.primary
    foreground: token.color.content.primary
    border: token.color.border.subtle
    border_width: 1px
    padding_x: token.space.12
    padding_y: token.space.4
    radius: token.radius.16
```

### small.selected
```yaml
small.selected:
  use_when: "Small chip option is selected"
  element: button
  tokens:
    background: token.color.primitive.cool-neutral.10  # same approved primitive exception
    foreground: token.color.content.inverse
    border: none
    padding_x: token.space.12
    padding_y: token.space.4
    radius: token.radius.16
```

### timestamp-date.unselected
```yaml
timestamp-date.unselected:
  use_when: "Date slot available but not yet selected"
  element: button
  tokens:
    background: token.color.background.primary
    foreground: token.color.content.primary
    border: none
    width: 56px  # fixed raw value; no layout token in scale
    radius: token.radius.16
    layout: vertical
```

### timestamp-date.selected
```yaml
timestamp-date.selected:
  use_when: "Date slot is chosen by the user"
  element: button
  tokens:
    background: token.color.primitive.sunrise-glow.99  # deliberate primitive — no semantic background token covers this tinted brand surface (#FFFBFA)
    foreground: token.color.brand.1mg
    border: token.color.brand.1mg
    border_width: 1px
    width: 56px  # fixed raw value
    radius: token.radius.16
    layout: vertical
```

### timestamp-time.unselected
```yaml
timestamp-time.unselected:
  use_when: "Time slot available but not yet selected"
  element: button
  tokens:
    background: token.color.background.primary
    foreground: token.color.content.primary
    border: token.color.border.subtle
    border_width: 1px
    padding_x: token.space.16
    padding_y: token.space.12
    radius: token.radius.16
    layout: horizontal
```

### timestamp-time.selected
```yaml
timestamp-time.selected:
  use_when: "Time slot is chosen by the user"
  element: button
  tokens:
    background: token.color.primitive.sunrise-glow.99  # deliberate primitive — same tinted brand surface as timestamp-date.selected
    foreground: token.color.brand.1mg
    border: token.color.brand.1mg
    border_width: 1px
    padding_x: token.space.16
    padding_y: token.space.12
    radius: token.radius.16
    layout: horizontal
```

---

## States

```yaml
default:
  applies_to: [all]
  changes: {}

focus:
  applies_to: [all]
  changes:
    ring: token.color.border.high-contrast
    ring_width: 2px
    ring_offset: 2px

disabled:
  applies_to: [selection.disable, selection.selected-disable, filter.disable, filter.selected-disable]
  changes:
    opacity: 0.5
    pointer_events: none
  note: >
    Disable variants use explicit color overrides (TOKEN MISSING text for unresolved
    #626A7A; background.moderate for selected-disable) to communicate unavailability
    visually. opacity + pointer_events apply on top to block interaction.

loading:
  applies_to: [selection.default, filter.default]
  changes:
    pointer_events: none
```

---

## Sizes

```yaml
selection:
  padding_x: token.space.12
  padding_y: token.space.8
  icon_size: 16px
  badge_size: 16px

filter:
  padding_x: token.space.12
  padding_y: token.space.8
  icon_size: 16px
  close_icon_size: 16px

small:
  padding_x: token.space.12
  padding_y: token.space.4
  note: no icon support — icon not defined for small chip variant

timestamp_date:
  width: 56px  # raw layout value; no token equivalent
  height: auto
  layout: vertical (flex column, items-center)

timestamp_time:
  padding_x: token.space.16
  padding_y: token.space.12
  layout: horizontal (flex row)
```

---

## Typography

```yaml
chip_label_default:
  font_family: token.font.family.sans
  font_size: token.font.size.body-12
  font_weight: token.font.weight.regular
  line_height: token.font.line-height.16
  text_align: center

chip_label_selected:
  font_family: token.font.family.sans
  font_size: token.font.size.body-12
  font_weight: token.font.weight.bold
  line_height: token.font.line-height.16
  text_align: center

small_chip_label_default:
  font_family: token.font.family.sans
  font_size: token.font.size.body-14
  font_weight: token.font.weight.regular
  line_height: token.font.line-height.20
  text_align: center

small_chip_label_selected:
  font_family: token.font.family.sans
  font_size: token.font.size.body-14
  font_weight: token.font.weight.bold
  line_height: token.font.line-height.20
  text_align: center

timestamp_text:
  font_family: token.font.family.sans
  font_size: token.font.size.body-12
  font_weight: token.font.weight.medium  # date lines; bold in selected state
  line_height: token.font.line-height.16
  text_align: center

badge_label:
  font_family: token.font.family.sans
  font_size: token.font.size.tag-11
  font_weight: token.font.weight.medium
  line_height: token.font.line-height.16
  text_align: center
```

---

## With Icons

```yaml
leading_icon:
  size: 16px
  position: leading
  applies_to: [selection.*, filter.*]
  visibility: controlled_by_icon_position_prop
  color: inherits foreground token

trailing_icon:
  size: 16px
  position: trailing
  applies_to: [selection.*]
  visibility: controlled_by_icon_position_prop
  color: inherits foreground token

close_icon:
  size: 16px
  position: trailing
  applies_to: [filter.selected]
  visibility: always (shown only in selected state)
  color: token.color.content.inverse

badge:
  size: 16px
  shape: circle
  position: top-right overlay (absolute, edge of chip container)
  applies_to: [selection.selected-badge]
  background: token.color.brand.1mg
  label_color: token.color.content.inverse
  radius: token.radius.full
```

---

## Composition

```yaml
composition:
  can_contain: []
  can_be_contained_by:
    selection: [ChipGroup, HorizontalScrollList, FilterBar, VariantSelector]
    filter: [FilterBar, SearchResultHeader, ActiveFiltersRow]
    small: [ChipGroup, CompactFilterBar]
    timestamp: [DateTimePicker, DeliveryScheduler, TimeslotSelector]
  cannot_combine_with:
    selection: [RadioButton, CheckboxItem]  # selection chips replace these in horizontal chip rows
  note: >
    Selection and filter chips should not appear in the same row — their
    selected-state affordances are semantically different (toggle vs clear-filter).
    Timestamp chips should always appear within a dedicated date/time picker context;
    do not place them inline in a generic chip group.
```

---

## Accessibility

### ARIA Attributes

```html
<!-- Selection chip — unselected -->
<button type="button" aria-pressed="false" aria-label="[Category name]">
  [Label]
</button>

<!-- Selection chip — selected -->
<button type="button" aria-pressed="true" aria-label="[Category name], selected">
  [Label]
</button>

<!-- Selection chip — disabled -->
<button type="button" aria-disabled="true" aria-label="[Category name], unavailable" tabindex="0">
  [Label]
</button>

<!-- Selection chip — selected with badge -->
<button type="button" aria-pressed="true" aria-label="[Category name], [count] items selected">
  [Label]
  <span aria-hidden="true">[count]</span>  <!-- badge count visible, label carries full context -->
</button>

<!-- Filter chip — default -->
<button type="button" aria-pressed="false" aria-label="[Filter name]">
  [Label]
</button>

<!-- Filter chip — selected (with close) -->
<button type="button" aria-pressed="true" aria-label="[Filter name] — tap to remove">
  [Label]
  <img aria-hidden="true" ... />  <!-- close icon decorative -->
</button>

<!-- Timestamp chip — date -->
<button type="button" aria-pressed="false" aria-label="[Full date, e.g. Monday 14 April]">
  <span aria-hidden="true">Mon</span>
  <span aria-hidden="true">14</span>
  <span aria-hidden="true">Apr</span>
</button>

<!-- Timestamp chip — time -->
<button type="button" aria-pressed="false" aria-label="[Time slot, e.g. 10:00 AM to 11:00 AM]">
  [Time label]
</button>
```

### Keyboard Support

| Key | Action |
|---|---|
| `Tab` | Move focus to chip |
| `Shift + Tab` | Move focus to previous element |
| `Enter` or `Space` | Toggle chip selected state / activate filter clear |

### Touch Targets

- **Selection / Filter**: py-8 × 2 + lh-16 = 32px visual height — below 44px WCAG minimum; consuming layout must provide 44px tap height via padding extension or invisible hit area
- **Small**: py-4 × 2 + lh-20 = 28px visual height — well below 44px; same hit-area extension note applies
- **Timestamp-Date**: 56px wide but height is auto (driven by 3 text lines); consuming layout must ensure 44px height
- **Timestamp-Time**: py-12 × 2 + lh-16 = 40px visual height — 4px short of 44px; same note applies

### Screen Reader Announcements

- Unselected chip: "[Label], button" or "[Label], not pressed, button"
- Selected chip: "[Label], pressed, button"
- Disabled chip: "[Label], dimmed" via `aria-disabled`
- Filter chip with close: label + "tap to remove"
- Timestamp chip: full date/time string via `aria-label` (not the abbreviated display text)

---

## Content Guidelines

### Text

- **Chip label**: 1–3 words; sentence case; noun or noun phrase (e.g. "Vitamins", "Next Day", "Morning")
- **Filter chip label**: noun or short descriptor matching the filter key; avoid verbs
- **Timestamp-Date**: three-line display — abbreviated day name (3 chars), date number, abbreviated month (3 chars)
- **Timestamp-Time**: time range or slot label in user's locale format
- **Badge count**: integer only; display "99+" if count exceeds 2 digits

### Tone & Voice

- Labels should be minimal and scannable — users read chip rows quickly
- Avoid punctuation inside chip labels
- For date/time timestamps, always provide a full accessible `aria-label` even though the display is abbreviated

---

## Usage Guidelines

### Do's

✅ **Do this:**
- Use `selection` chips in horizontally scrollable rows for category/tag selection
- Use `filter` chips in a dedicated active-filters row above search results
- Use `small` chips in very dense layouts (e.g. tag cloud, inline variant selector)
- Provide a full `aria-label` on `timestamp` chips — the abbreviated text is not sufficient for screen readers
- Extend all chip tap areas to 44×44px in the consuming layout

### Don'ts

❌ **Don't do this:**
- Do not mix `selection` and `filter` chips in the same chip row
- Do not use chips as navigation links — use `Button` (Ghost) or `<a>` tags instead
- Do not show `selected-disable` without also communicating unavailability in the surrounding product/filter context
- Do not show count in badge exceeding 99 without the "99+" truncation
- Do not place timestamp chips outside a scheduling/picker context

---

## Implementation Notes

**HTML elements:**
- All chip types → `<button type="button">` (never `<div>` or `<span>`)
- Badge count in `selected-badge` → `<span aria-hidden="true">` inside button; full context lives in `aria-label`
- Timestamp date lines → `<span aria-hidden="true">` wrappers; full date string in `aria-label`

**`icon_position` prop (selection / filter):**
- `none` — no icon slot rendered
- `leading` — icon prepended before label with `gap: token.space.4`
- `trailing` — icon appended after label with `gap: token.space.4`
- Filter chip `close_icon` in selected state is always trailing and is not controlled by `icon_position`

**Selected state background:**
- All selected variants (selection, filter, small) use `token.color.primitive.cool-neutral.10` (#181A1F) — same deliberate primitive exception approved for Button, StepperButton, and IconButton. No semantic background token covers this value.

**Timestamp fixed width:**
- `timestamp-date` width of 56px is a raw layout value with no token equivalent — implement as hardcoded CSS until a layout token scale is introduced.

**Disabled text color (primitive exception):**
- All disable variants use `token.color.primitive.cool-neutral.50` (#626A7A). No semantic content token covers this value — `content.disabled` and `content.tertiary` both resolve to cool-neutral.60 (#868E9E). Do not substitute them; the values differ intentionally.

**Timestamp selected background (primitive exception):**
- `timestamp-date.selected` and `timestamp-time.selected` both use `token.color.primitive.sunrise-glow.99` (#FFFBFA) as a tinted brand surface. No semantic background token covers this value.

**Badge overlay positioning:**
- Badge on `selection.selected-badge` is absolutely positioned at the top-right corner of the chip container. The chip container must have `position: relative`.

**`aria-pressed` vs `aria-selected`:**
- Use `aria-pressed` for standalone toggle chips outside a listbox context.
- If chips are rendered inside a `role="listbox"` (e.g. a chip group acting as a single-select), use `aria-selected` instead of `aria-pressed`.
