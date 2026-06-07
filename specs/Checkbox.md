# Checkbox — Spec

> **Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Dopamine_2.0_Components?node-id=1884-2966
> **Component family:** Form Controls
> **Status:** Draft

---

## Prompt Match

```yaml
prompts:
  - "checkbox"
  - "check input"
  - "multi-select control"
  - "tick box"
  - "checkmark input"
```

---

## Description

Checkbox is the visual control for multi-option selection. Unlike RadioButton, multiple checkboxes within a group can be selected simultaneously. It is a standalone control element — labels and grouping belong to the consuming layout. Two sizes (Large 24×24, Small 20×20) with four states each.

### When to use

- When users can select zero or more options from a set
- In form layouts, preference screens, filter panels, and bulk-action interfaces
- When the list of options requires individual acknowledgement (e.g. "I agree to terms")

### When NOT to use

- Do not use when only one option may be chosen — use `RadioButton` instead
- Do not use as a standalone toggle — use `Switch` instead
- Do not use `Checkbox` without a visible label in the consuming layout

---

## Anatomy

```
Large (24×24) — Default
┌────────┐
│        │  ← 24×24 square, radius-4, 1px border (#868E9E), white bg
│        │
└────────┘

Large (24×24) — Selected
┌────────┐
│  [✓]   │  ← 24×24 square, radius-4, brand coral fill, p-2
│        │    inner: 20×20 white checkmark icon
└────────┘

Small (20×20) — structurally identical, proportionally scaled
```

**Key elements:**
- **Outer square**: 24×24 (Large) or 20×20 (Small), `token.radius.4`
- **Border** (default/disable): 1px, applied as CSS `border` (unlike RadioButton which layers circles)
- **Checkmark icon** (selected states): 20×20 icon (Large), white, centered via `p-2` inner padding
- **Inner padding** (selected states): `token.space.2` all sides — constrains the 20×20 icon inside 24px container

---

## Variants

### large.default
```yaml
large.default:
  use_when: "Option is available and not yet checked"
  element: div  # visual only; consuming layout wraps in input[type=checkbox]
  tokens:
    background: token.color.background.primary
    border: token.color.border.high-contrast
    border_width: 1px
    radius: token.radius.4
    size: 24px
```

### large.selected
```yaml
large.selected:
  use_when: "Option is checked"
  element: div
  tokens:
    background: token.color.brand.1mg
    border: none
    padding: token.space.2
    radius: token.radius.4
    size: 24px
  icon:
    size: 20px
    color: token.color.content.inverse
```

### large.disable
```yaml
large.disable:
  use_when: "Option is visible but cannot be interacted with"
  element: div
  tokens:
    background: token.color.background.primary
    border: token.color.border.subtle
    border_width: 1px
    radius: token.radius.4
    size: 24px
```

### large.disabled-selected
```yaml
large.disabled-selected:
  use_when: "Option was checked but is now in a disabled state (e.g. required/locked selection)"
  element: div
  tokens:
    background: token.color.background.moderate
    border: none
    padding: token.space.2
    radius: token.radius.4
    size: 24px
  icon:
    size: 20px
    color: token.color.content.inverse
```

### small.default
```yaml
small.default:
  use_when: "Compact layout — option available and not checked"
  element: div
  tokens:
    background: token.color.background.primary
    border: token.color.border.high-contrast
    border_width: 1px
    radius: token.radius.4
    size: 20px
```

### small.selected
```yaml
small.selected:
  use_when: "Compact layout — option is checked"
  element: div
  tokens:
    background: token.color.brand.1mg
    border: none
    padding: token.space.2
    radius: token.radius.4
    size: 20px
  icon:
    size: 16px  # raw value — proportional to 20px container (20 - 2×2 = 16)
    color: token.color.content.inverse
```

### small.disable
```yaml
small.disable:
  use_when: "Compact layout — option not checkable"
  element: div
  tokens:
    background: token.color.background.primary
    border: token.color.border.subtle
    border_width: 1px
    radius: token.radius.4
    size: 20px
```

### small.disabled-selected
```yaml
small.disabled-selected:
  use_when: "Compact layout — option was checked, now disabled"
  element: div
  tokens:
    background: token.color.background.moderate
    border: none
    padding: token.space.2
    radius: token.radius.4
    size: 20px
  icon:
    size: 16px
    color: token.color.content.inverse
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
  applies_to: [all disable variants]
  changes:
    opacity: 0.5
    pointer_events: none
  note: >
    Disable variants use explicit color overrides to communicate
    unavailability visually. opacity + pointer_events still apply on top.
```

---

## Sizes

```yaml
large:
  outer_size: 24px
  icon_size: 20px
  inner_padding: token.space.2  # 2px all sides on selected states

small:
  outer_size: 20px
  icon_size: 16px  # raw value — 20px - (2px padding × 2)
  inner_padding: token.space.2
```

---

## Composition

```yaml
composition:
  can_contain: []
  can_be_contained_by: [CheckboxGroup, FormRow, SettingsRow, FilterPanel, BulkActionBar]
  note: >
    Checkbox is a control-only element. It must always be paired with
    a visible text label in the consuming layout. For indeterminate
    state (partially checked), the consuming form layer sets
    aria-checked="mixed" — no separate visual variant is defined
    in Figma for indeterminate.
```

---

## Accessibility

### ARIA Attributes

```html
<!-- Preferred: native HTML -->
<label>
  <input type="checkbox" />
  Option label text
</label>

<!-- With indeterminate state (JS-set only) -->
<input type="checkbox" id="cb" />
<!-- JS: document.getElementById('cb').indeterminate = true -->

<!-- Custom implementation -->
<div role="checkbox" aria-checked="false" tabindex="0" aria-label="Option label text">
  <!-- visual Checkbox element -->
</div>

<!-- Disabled state -->
<input type="checkbox" disabled />
<div role="checkbox" aria-checked="false" aria-disabled="true" tabindex="0">...</div>
```

### Keyboard Support

| Key | Action |
|---|---|
| `Tab` | Move focus to checkbox |
| `Shift + Tab` | Move focus to previous element |
| `Space` | Toggle checked state |

### Touch Targets

- **Large**: 24×24px visual — below 44px WCAG minimum; consuming layout must provide 44×44px tap area
- **Small**: 20×20px visual — same issue; consuming layout must extend tap area

---

## Content Guidelines

Checkbox carries no text — all labelling is managed by the consuming layout. Label text should be short (≤ 8 words), sentence case, and describe the option being checked (not the action of checking).

---

## Implementation Notes

**CSS border (unlike RadioButton):**
Checkbox default and disable states use a CSS `border` property — not layered elements. This differs from RadioButton, which uses the layered-circle technique.

**Selected state inner padding:**
`token.space.2` (2px) padding inside the checkbox container constrains the checkmark icon:
- Large: `24px container - 2px × 2 = 20px icon` ✅
- Small: `20px container - 2px × 2 = 16px icon` ✅

**Checkmark icon color:**
All checkmark icons use `token.color.content.inverse` (white). Use `currentColor` on SVG to inherit; set `color: white` on the container.

**Indeterminate state:**
Not defined as a visual variant in Figma. If needed, implement via `aria-checked="mixed"` and a custom dash-icon visual. Do not invent a new variant without design sign-off.

**Native input vs custom:**
Prefer `<input type="checkbox">` for native browser behavior. Use `role="checkbox"` only when the native element cannot be visually overridden cleanly.
