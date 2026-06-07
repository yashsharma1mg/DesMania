# TextField — Spec

> **Figma source:** https://www.figma.com/design/T96zjkCns9zCJ2oHYTPe7I/Diagnostics-Ideal-checkout?node-id=8700-25630
> **Component family:** Form / Inputs
> **Status:** Checkout variant — inherits the global InputField primitive (`../InputField.md`)

---

## Prompt Match

```yaml
prompts:
  - "text field"
  - "text input"
  - "input field"
  - "form input"
  - "name input"
  - "patient name"
  - "text box"
```

---

## Description

TextField is the checkout free-text variant of the global InputField primitive. It provides a floating-label field with placeholder, active/focus, filled, error, and disabled states. Used in the "Add new patient" form for the Patient Name field.

### When to use

- Any free-text form input (names, addresses, search terms)
- Single-line string data entry

### When NOT to use

- Date or calendar-specific inputs → DateInput
- Selections from a list → SelectDropdown
- Multi-line content → Textarea (not specced yet)

---

## Anatomy

```
┌────────────────────────────────────┐
│ Patient Name                       │  ← placeholder / label text (14px Regular)
└────────────────────────────────────┘
  width: fill parent
  height: 44px
  border: 1px border.subtle
  radius: radius.8
```

On focus / active, the border updates to brand.1mg. On error, border updates to state.error. Placeholder text disappears; the value text replaces it.

---

## Variants

### text-field.default

```yaml
text-field.default:
  description: Empty input at rest. Placeholder text visible.
  label: none (placeholder only)
  trailing_icon: none
```

### text-field.active

```yaml
text-field.active:
  description: Input currently receiving user input.
  border: token.color.brand.1mg
  label: floating (above input at 10px, 12px Regular)
  placeholder: hidden once typing begins
```

### text-field.filled

```yaml
text-field.filled:
  description: Input has a value, not focused.
  border: token.color.border.subtle
  label: floating (12px Regular, content.secondary)
  value: visible (14px Regular, content.primary)
```

### text-field.error

```yaml
text-field.error:
  description: Validation failed. Error message shown below.
  border: token.color.state.error
  label: floating (12px Regular, state.error)
  error_message:
    text: 12px Regular, state.error
    gap_above: token.space.4
```

### text-field.disabled

```yaml
text-field.disabled:
  description: Field cannot be interacted with.
  bg: token.color.background.subtle
  border: token.color.border.subtle
  text: token.color.content.disabled
  pointer_events: none
```

---

## Tokens

```yaml
text-field:
  container:
    bg: token.color.background.primary        # #FFFFFF
    border: 1px solid token.color.border.subtle   # #DDE2EB
    border_active: 1px solid token.color.brand.1mg  # #FF5443
    border_error: 1px solid token.color.state.error  # #A3111E
    border_disabled: 1px solid token.color.border.subtle
    bg_disabled: token.color.background.subtle  # #EEF1F5
    radius: token.radius.8                    # 8px
    height: 44px                              # raw
    width: fill                               # responsive

  input:
    padding_horizontal: token.space.12        # 12px
    padding_vertical: token.space.12          # 12px (derives 44px height with 20px lh text)
    font_family: token.font.family.sans      # inherited from InputField
    font_size: token.font.size.body-14        # 14px
    font_weight: token.font.weight.regular    # 400
    line_height: token.font.line-height.20    # 20px
    color: token.color.content.primary        # #181A1F
    color_disabled: token.color.content.disabled  # #868E9E

  placeholder:
    color: token.color.content.tertiary       # #868E9E
    font_size: token.font.size.body-14
    font_weight: token.font.weight.regular

  floating_label:
    color: token.color.content.secondary      # #414752
    color_error: token.color.state.error      # #A3111E
    font_size: token.font.size.body-12        # 12px
    font_weight: token.font.weight.regular    # 400
    line_height: token.font.line-height.16    # 16px
    gap_below_label: token.space.4            # 4px gap between label and input box

  error_message:
    color: token.color.state.error            # #A3111E
    font_size: token.font.size.body-12        # 12px
    font_weight: token.font.weight.regular
    line_height: token.font.line-height.16    # 16px
    gap_above: token.space.4                  # 4px above error message
```

---

## Layout

```yaml
wrapper:
  display: flex
  flex_direction: column
  gap: 0               # spacing between label and container is padding-based

container:
  position: relative
  width: 100%
  height: 44px         # raw — collapses to content-height if floating label is outside
```

---

## States

```yaml
focus:
  ring: token.color.brand.1mg
  ring_width: 2px
  ring_offset: 2px

disabled:
  opacity: 1           # use bg change, not opacity, for disabled treatment
  pointer_events: none
```

---

## Accessibility

```html
<div class="text-field-wrapper">
  <label for="patient-name" class="floating-label">Patient Name</label>
  <input
    id="patient-name"
    type="text"
    class="text-field-input"
    placeholder="Patient Name"
    aria-describedby="patient-name-error"   <!-- only when error present -->
    autocomplete="name"
  />
  <p id="patient-name-error" class="error-message" role="alert"><!-- error text --></p>
</div>
```

- `<label>` must be explicitly associated with `<input>` via `for`/`id` — never use placeholder as the only label
- Error message uses `role="alert"` so it is announced on entry
- 44px height meets WCAG 2.5.5 touch target minimum

---

## Implementation Notes

**No floating label animation in initial spec.** The Figma designs for the Diagnostics Checkout show a placeholder-only treatment (no animated floating label). The floating-label states are specced here for DS completeness but the first implementation pass may use a static label-above pattern.

**Label vs placeholder distinction.** The "Patient Name" placeholder in Figma doubles as both the label and placeholder. In implementation, a separate `<label>` element is always required for accessibility — do not rely on placeholder text alone.

**Global primitive.** Container, status, and Figtree typography behavior inherit from `../InputField.md`; this checkout spec only narrows the free-text form usage.

**44px minimum height.** Derived from `2 × padding.12 + line-height.20 = 44px`. Matches WCAG touch target guideline.
