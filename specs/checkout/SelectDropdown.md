# SelectDropdown — Spec

> **Figma source:** https://www.figma.com/design/T96zjkCns9zCJ2oHYTPe7I/Diagnostics-Ideal-checkout?node-id=8700-25630
> **Component family:** Form / Inputs
> **Status:** Checkout variant — inherits the global InputField primitive (`../InputField.md`)

---

## Prompt Match

```yaml
prompts:
  - "select dropdown"
  - "dropdown"
  - "select input"
  - "gender select"
  - "dropdown field"
  - "select field"
  - "picker"
```

---

## Description

SelectDropdown is the checkout select variant of the global InputField primitive. It opens a system picker or custom bottom sheet with a list of options. The trailing chevron-down icon signals selectability. Used in the "Add new patient" form for the Gender field, rendered half-width alongside the DateInput.

### When to use

- Short lists of mutually exclusive options (Gender, State, Blood type)
- When a select-from-list pattern is preferred over radio buttons

### When NOT to use

- Large option sets (50+ items) → use a searchable list in a BottomSheet instead
- Binary choices → Toggle or RadioButton pair

---

## Anatomy

```
┌──────────────────────────┐
│ Gender              ⌄   │  ← placeholder (14px Regular) + trailing chevron-down (20×20)
└──────────────────────────┘
  width: fills half-row (calc(50% - 4px))
  height: 44px
  border: 1px border.subtle
  radius: radius.8
```

---

## Variants

### select-dropdown.default

```yaml
select-dropdown.default:
  description: No option selected. Placeholder visible.
  placeholder: "Gender" (14px Regular, content.tertiary)
  trailing_icon: chevron-down (20×20, content.tertiary)
```

### select-dropdown.selected

```yaml
select-dropdown.selected:
  description: An option has been chosen.
  value: selected option text (14px Regular, content.primary)
  trailing_icon: chevron-down (20×20, content.secondary)
  label: floating (12px Regular, content.secondary)
```

### select-dropdown.active

```yaml
select-dropdown.active:
  description: Dropdown is open / options list visible.
  border: token.color.brand.1mg
  trailing_icon: chevron-up (20×20, content.primary)
```

### select-dropdown.error

```yaml
select-dropdown.error:
  description: Required field not selected.
  border: token.color.state.error
  trailing_icon: chevron-down (20×20, state.error)
  error_message: below the field (12px Regular, state.error)
```

### select-dropdown.disabled

```yaml
select-dropdown.disabled:
  description: Cannot be interacted with.
  bg: token.color.background.subtle
  border: token.color.border.subtle
  text: token.color.content.disabled
  pointer_events: none
```

---

## Tokens

```yaml
select-dropdown:
  # Inherits all container/input/placeholder/error tokens from ../InputField.md and TextField.md.
  # Additional tokens:

  trailing_icon:
    size: 20px × 20px                       # raw — chevron-down / chevron-up
    color: token.color.content.tertiary     # #868E9E (default + disabled)
    color_selected: token.color.content.secondary  # #414752
    color_active: token.color.content.primary      # #181A1F (open state)
    color_error: token.color.state.error    # #A3111E
    margin_right: token.space.12            # 12px from right edge
```

---

## States

Inherits focus and disabled states from TextField spec.

---

## Accessibility

```html
<!-- Native select (preferred for simple lists) -->
<div class="select-wrapper">
  <label for="gender">Gender</label>
  <div class="select-container">
    <select id="gender" class="select-input" aria-label="Gender">
      <option value="" disabled selected>Gender</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
      <option value="other">Other</option>
    </select>
    <span class="trailing-icon" aria-hidden="true"><!-- chevron icon --></span>
  </div>
</div>
```

- Prefer native `<select>` for small option lists (accessibility for free)
- If using a custom bottom-sheet picker: implement `role="listbox"` with `aria-expanded` and `aria-activedescendant`
- Trailing chevron icon is decorative — `aria-hidden="true"`

---

## Implementation Notes

**Chevron rotation.** The icon rotates 180° (chevron-down → chevron-up) when the list is open. Animate with `transform: rotate(180deg)` and `transition: transform 200ms ease`.

**Options picker pattern.** On mobile (iOS/Android), tapping this field may open a native picker sheet or a custom BottomSheet with a RadioButton list. The component spec does not dictate the picker implementation — only the trigger field appearance.
