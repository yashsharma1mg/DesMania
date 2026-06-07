# RadioButton — Spec

> **Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Dopamine_2.0_Components?node-id=1822-1266
> **Component family:** Form Controls
> **Status:** Draft

---

## Prompt Match

```yaml
prompts:
  - "radio button"
  - "radio input"
  - "single select control"
  - "option selector"
  - "radio group item"
```

---

## Description

RadioButton is the visual control for single-option selection within a group. It is a standalone control element — it does not include a label; labels and grouping are owned by the consuming form layout. It comes in two sizes (Large 24×24, Small 20×20) and covers six states for Large and four states for Small.

The "selected with icon" variants replace the inner dot with a 20×20 icon, allowing the radio button to carry a visual identifier when selected (e.g. a category icon). These icon variants are only defined for Large.

### When to use

- Within radio groups where exactly one option from a set can be chosen at a time
- In form layouts, settings screens, and filter panels
- When the option count is small enough that all choices are visible simultaneously (≤ ~6 options)

### When NOT to use

- Do not use for multi-select scenarios — use `Checkbox` instead
- Do not use as a standalone toggle — use `Chip/selection` or `Switch` instead
- Do not use RadioButton as the full form control — always pair with a label in the consuming layout

---

## Anatomy

```
Large (24×24) — Default
┌──────────────────────┐
│  ○  24×24 outer ring │  ← 24px circle, 1px visual ring (layered-circle technique)
│     22×22 inner fill │  ← 22px white circle centered inside
└──────────────────────┘

Large (24×24) — Selected
┌──────────────────────┐
│  ●  24×24 filled     │  ← 24px circle, brand coral fill
│     12×12 white dot  │  ← 12px centered white dot (radius-8)
└──────────────────────┘

Large (24×24) — Selected with icon
┌──────────────────────┐
│  ◉  24×24 filled     │  ← brand coral fill
│     20×20 icon       │  ← 20px icon from Dopamine set, white
└──────────────────────┘

Small (20×20) — structurally identical to Large, proportionally scaled
```

**Key elements:**
- **Outer circle**: 24×24 (Large) or 20×20 (Small), always fully circular
- **Inner fill** (default/disable): 22×22 white circle that makes the ring appear as 1px — not a CSS border
- **Inner dot** (selected): 12×12 white circle, `token.radius.8`, centered
- **Icon** (selected-icon): 20×20 icon from the Dopamine icon set, white, centered

---

## Variants

### large.default
```yaml
large.default:
  use_when: "Option is available and not yet chosen"
  element: div  # visual only; consuming layout wraps in input[type=radio] or role=radio
  tokens:
    ring_color: token.color.border.high-contrast
    ring_width: 1px  # achieved via layered circles, not CSS border
    inner_fill: token.color.background.primary
    radius: token.radius.full
    size: 24px
```

### large.selected
```yaml
large.selected:
  use_when: "This option is currently chosen"
  element: div
  tokens:
    background: token.color.brand.1mg
    inner_dot_color: token.color.background.primary
    inner_dot_size: 12px  # raw value
    inner_dot_radius: token.radius.8
    radius: token.radius.full
    size: 24px
```

### large.selected-icon
```yaml
large.selected-icon:
  use_when: "This option is chosen and carries a specific icon identifier"
  element: div
  tokens:
    background: token.color.brand.1mg
    icon_color: token.color.content.inverse
    icon_size: 20px  # raw value
    radius: token.radius.full
    size: 24px
```

### large.disable
```yaml
large.disable:
  use_when: "Option exists in the group but is not currently selectable"
  element: div
  tokens:
    ring_color: token.color.border.subtle
    ring_width: 1px
    inner_fill: token.color.background.primary
    radius: token.radius.full
    size: 24px
```

### large.disable-selected
```yaml
large.disable-selected:
  use_when: "This option was previously selected but the group or option is now disabled"
  element: div
  tokens:
    background: token.color.background.moderate
    inner_dot_color: token.color.background.primary
    inner_dot_size: 12px
    inner_dot_radius: token.radius.8
    radius: token.radius.full
    size: 24px
```

### large.disable-selected-icon
```yaml
large.disable-selected-icon:
  use_when: "Icon-carrying option was selected but is now disabled"
  element: div
  tokens:
    background: token.color.background.moderate
    icon_color: token.color.content.inverse
    icon_size: 20px
    radius: token.radius.full
    size: 24px
```

### small.default
```yaml
small.default:
  use_when: "Compact layout — option available and not chosen"
  element: div
  tokens:
    ring_color: token.color.border.high-contrast
    ring_width: 1px
    inner_fill: token.color.background.primary
    radius: token.radius.full
    size: 20px
```

### small.selected
```yaml
small.selected:
  use_when: "Compact layout — option is chosen"
  element: div
  tokens:
    background: token.color.brand.1mg
    inner_dot_color: token.color.background.primary
    inner_dot_size: 10px  # raw value, proportional to 20px container
    inner_dot_radius: token.radius.full
    radius: token.radius.full
    size: 20px
```

### small.disable
```yaml
small.disable:
  use_when: "Compact layout — option not selectable"
  element: div
  tokens:
    ring_color: token.color.border.subtle
    ring_width: 1px
    inner_fill: token.color.background.primary
    radius: token.radius.full
    size: 20px
```

### small.disable-selected
```yaml
small.disable-selected:
  use_when: "Compact layout — option was selected, now disabled"
  element: div
  tokens:
    background: token.color.background.moderate
    inner_dot_color: token.color.background.primary
    inner_dot_size: 10px
    inner_dot_radius: token.radius.full
    radius: token.radius.full
    size: 20px
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
  note: >
    Focus ring is the outline on the outer circle container, not the inner dot.
    Applies to the native input element (or role=radio wrapper).

disabled:
  applies_to: [all disable variants]
  changes:
    opacity: 0.5
    pointer_events: none
  note: >
    Disable variants use explicit color overrides to communicate
    unavailability. opacity + pointer_events apply on top.
```

---

## Sizes

```yaml
large:
  outer_size: 24px
  inner_fill_size: 22px  # raw value — produces 1px visual ring
  inner_dot_size: 12px   # raw value — selected states
  icon_size: 20px        # raw value — selected-icon states

small:
  outer_size: 20px
  inner_fill_size: 18px  # raw value — produces 1px visual ring
  inner_dot_size: 10px   # raw value — selected states
  note: icon variants not defined for Small size
```

---

## Composition

```yaml
composition:
  can_contain: []
  can_be_contained_by: [RadioGroup, FormRow, SettingsRow, FilterPanel]
  note: >
    RadioButton is a control-only element. It must always be paired
    with a visible text label in the consuming layout. The RadioGroup
    wrapper is responsible for single-selection logic (aria-radiogroup,
    name attribute binding).
```

---

## Accessibility

### ARIA Attributes

```html
<!-- Preferred: native HTML -->
<label>
  <input type="radio" name="group-name" value="option-value" />
  Option label text
</label>

<!-- Custom implementation -->
<div role="radio" aria-checked="false" tabindex="0" aria-label="Option label text">
  <!-- visual RadioButton element -->
</div>

<!-- Disabled state -->
<input type="radio" disabled aria-label="Option label text" />
<!-- or for custom: -->
<div role="radio" aria-checked="false" aria-disabled="true" tabindex="0">...</div>
```

### Keyboard Support

| Key | Action |
|---|---|
| `Tab` | Move focus to the radio group |
| `Arrow keys` | Move selection within the group |
| `Space` | Select the focused option |

### Touch Targets

- **Large**: 24×24px visual — below 44px WCAG minimum; consuming layout must provide 44×44px tap area
- **Small**: 20×20px visual — same issue; consuming layout must extend tap area

---

## Content Guidelines

RadioButton carries no text — all labelling is managed by the consuming layout. See `RadioGroup` for labelling guidelines.

---

## Implementation Notes

**Layered-circle technique (not CSS border):**
The ring in the default and disable states is achieved by layering two circles:
- Outer: `size: 24px`, `background: ring_color`, `border-radius: 50%`
- Inner (centered, absolute): `size: 22px`, `background: white`, `border-radius: 50%`

This creates the visual appearance of a 1px ring without using a CSS `border`. This pattern matches the Figma source exactly — do not replace with a CSS border.

**Selected state inner dot:**
The 12×12 white dot (radius-8) is centered inside the 24px coral-filled circle. Because `border-radius: 8px` on a 12×12 element exceeds half-width (6px), it renders as a circle.

**Large selected-with-icon:**
The 20×20 icon fills most of the 24px circle. There is no inner dot — the icon replaces it entirely. Icon color should be `token.color.content.inverse` (white) so it reads on the brand coral background.

**Native input vs custom:**
Prefer `<input type="radio">` for native keyboard handling and screen reader support. Use a custom `role="radio"` implementation only when the native input cannot be visually hidden cleanly. In custom implementations, the RadioGroup wrapper must manage `aria-radiogroup` and keyboard arrow-key navigation.
