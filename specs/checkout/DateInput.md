# DateInput — Spec

> **Figma source:** https://www.figma.com/design/T96zjkCns9zCJ2oHYTPe7I/Diagnostics-Ideal-checkout?node-id=8700-25638
> **Component family:** Form / Inputs
> **Status:** Checkout variant — inherits the global InputField primitive (`../InputField.md`)

---

## Prompt Match

```yaml
prompts:
  - "date input"
  - "date field"
  - "date of birth"
  - "date picker"
  - "dob field"
  - "calendar input"
```

---

## Description

DateInput is the checkout date-entry variant of the global InputField primitive with a trailing calendar icon. It accepts a date value as formatted text (e.g. `10-10-2000`). The calendar icon is a visual affordance for date format; it may trigger a native date picker or a system date picker overlay on tap, depending on the platform.

Appears in the "Add new patient" form alongside the SelectDropdown. The two fields share a horizontal row (each ~50% of available width with an 8px gap between them).

### When to use

- Any date entry field (date of birth, appointment date)

### When NOT to use

- When a full date-range selector is needed — use a separate Calendar component (not yet specced)

---

## Anatomy

```
┌──────────────────────────┐
│ Date of birth      📅   │  ← placeholder (14px Regular) + trailing calendar icon (20×20)
└──────────────────────────┘
  width: fills half-row (calc(50% - 4px))
  height: 44px
  border: 1px border.subtle
  radius: radius.8
```

---

## Variants

Inherits InputField/TextField states (default, active, filled, error, disabled) with the additional trailing icon.

### date-input.default

```yaml
date-input.default:
  description: Empty date input with placeholder and calendar icon visible.
  placeholder: "Date of birth"
  trailing_icon: calendar (20×20, content.tertiary)
```

### date-input.filled

```yaml
date-input.filled:
  description: Has a date value. Calendar icon remains visible.
  trailing_icon: calendar (20×20, content.secondary)
  value: "10-10-2000" (14px Regular, content.primary)
```

### date-input.error

```yaml
date-input.error:
  description: Invalid date entered.
  border: token.color.state.error
  trailing_icon: calendar (20×20, state.error)
  error_message: below the field (12px Regular, state.error)
```

---

## Tokens

```yaml
date-input:
  # Inherits all container/input/placeholder/error tokens from ../InputField.md and TextField.md.
  # Additional tokens:

  trailing_icon:
    size: 20px × 20px             # raw — calendar icon
    color: token.color.content.tertiary  # #868E9E (default + disabled)
    color_filled: token.color.content.secondary  # #414752
    color_error: token.color.state.error  # #A3111E
    margin_right: token.space.12         # 12px from right edge
    icon: calendar / date-range (system icon)
```

---

## Layout

```yaml
date_input_row:
  # When used with SelectDropdown (Add Patient form):
  display: flex
  flex_direction: row
  gap: token.space.8          # 8px between DateInput and SelectDropdown
  
  date_input:
    flex: 1                   # 50% of row

  select_dropdown:
    flex: 1                   # 50% of row
```

---

## States

Inherits focus and disabled states from TextField spec.

---

## Accessibility

```html
<div class="date-input-wrapper">
  <label for="dob" class="floating-label">Date of birth</label>
  <div class="date-input-container">
    <input
      id="dob"
      type="date"        <!-- or type="text" with inputmode="numeric" pattern -->
      class="date-input"
      placeholder="DD-MM-YYYY"
      aria-label="Date of birth"
    />
    <span class="trailing-icon" aria-hidden="true"><!-- calendar icon --></span>
  </div>
</div>
```

- Trailing icon is decorative — `aria-hidden="true"`
- Use `type="date"` where native date pickers are acceptable; use `type="text"` with an explicit format hint if a custom picker is used

---

## Implementation Notes

**Icon tap area.** The calendar icon should extend its tap target to the full right portion of the input (at minimum 44×44dp from the right edge). Tapping the icon can open a date picker overlay.

**Input format.** Figma shows `10-10-2000` format (DD-MM-YYYY). Add a `placeholder="DD-MM-YYYY"` format hint alongside the label text.
