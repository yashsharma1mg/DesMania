# InputField — Spec

> **Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Dopamine_2.0_Components?node-id=1619-588
> **Component family:** Form / Inputs
> **Status:** Draft

---

## Prompt Match

```yaml
prompts:
  - "input field"
  - "text input"
  - "form field"
  - "field with icon"
  - "field with action"
  - "otp input"
  - "pin input"
```

---

## Description

InputField is the global Dopamine 2.0 single-line input primitive. It covers basic text entry, text entry with a trailing icon, single-line fields with a trailing action, and grouped OTP inputs.

### When to use

- Single-line text or numeric entry
- Inputs that need a trailing icon such as calendar, chevron, search, or clear
- Inputs that need a trailing action such as "Apply", "Verify", or "Resend"
- 4-digit or 6-digit OTP/PIN entry

### When NOT to use

- Multi-line content → Textarea
- Mutually exclusive choices shown inline → RadioButton
- Binary on/off choices → Toggle
- Large searchable option sets → BottomSheet or search list pattern

---

## Variant Properties

| Property | Values |
|----------|--------|
| `type` | `basic`, `basic-with-icon-after`, `single-line-with-action`, `otp-4`, `otp-6` |
| `status` | `default`, `active`, `typing`, `success`, `error`, `disabled` |

Figma selection includes: Basic, Basic with icon after, Single line with action, 4 digit OTP, and 6 digit OTP. OTP variants use `default`, `active`, `typing`, `error`, and `disabled`.

---

## Anatomy

```text
Basic / Default
┌────────────────────────────────────┐
│ Label or placeholder               │
└────────────────────────────────────┘

Basic with icon after
┌────────────────────────────────────┐
│ Label or value                  ◯  │
└────────────────────────────────────┘

Single line with action
┌────────────────────────────────────┐
│ Value                    [Action]  │
└────────────────────────────────────┘

OTP 4 / OTP 6
┌────┐ ┌────┐ ┌────┐ ┌────┐  ... 
│ 1  │ │ 2  │ │ 3  │ │ 4  │
└────┘ └────┘ └────┘ └────┘
```

- **Container**: 44px minimum height, 8px radius, 1px outline.
- **Input text**: Figtree 14px with 20px line-height.
- **Helper/error text**: Figtree 12px with 16px line-height.
- **Trailing icon/action**: right-aligned affordance inside the field.
- **OTP cells**: fixed 44px-high cells arranged in a row.

---

## Tokens

```yaml
input-field:
  container:
    bg: token.color.background.primary
    bg_disabled: token.color.background.subtle
    border_default: 1px solid token.color.border.subtle
    border_active: 1px solid token.color.brand.1mg
    border_error: 1px solid token.color.state.error
    border_success: 1px solid token.color.primitive.wellness-green.30
    border_disabled: 1px solid token.color.border.subtle
    radius: token.radius.8
    height: 44px
    padding_x: token.space.12

  input_text:
    font_family: token.font.family.sans
    font_size: token.font.size.body-14
    font_weight: token.font.weight.regular
    line_height: token.font.line-height.20
    letter_spacing: 0
    color: token.color.content.primary
    color_placeholder: token.color.content.tertiary
    color_disabled: token.color.content.disabled

  label_or_helper:
    font_family: token.font.family.sans
    font_size: token.font.size.body-12
    font_weight: token.font.weight.regular
    line_height: token.font.line-height.16
    letter_spacing: 0
    color: token.color.content.secondary
    color_error: token.color.state.error
    color_success: token.color.primitive.wellness-green.30

  trailing_action:
    font_family: token.font.family.sans
    font_size: token.font.size.body-14
    font_weight: token.font.weight.medium
    line_height: token.font.line-height.20
    color: token.color.brand.1mg

  otp:
    cell_width: 44px
    cell_height: 44px
    gap: token.space.8
    font_family: token.font.family.sans
    font_size: token.font.size.body-14
    font_weight: token.font.weight.bold
    line_height: token.font.line-height.20
```

---

## Status Behavior

| Status | Behavior |
|--------|----------|
| `default` | Low-contrast outline, placeholder visible, tertiary text color |
| `active` | Brand outline, cursor/focus visible |
| `typing` | Brand outline while user input is present or being edited |
| `success` | Success outline/helper affordance for validated input |
| `error` | Error outline and error/helper text below the field |
| `disabled` | Subtle background, disabled text color, no pointer interaction |

---

## Accessibility

```html
<label for="field-id">Field label</label>
<input
  id="field-id"
  type="text"
  aria-invalid="false"
  aria-describedby="field-id-helper"
/>
<p id="field-id-helper">Helper or error text</p>
```

- Always associate a visible or programmatic label with the input.
- Use `aria-invalid="true"` and `role="alert"` on error helper text when validation fails.
- Decorative trailing icons are `aria-hidden="true"`.
- Action text inside the field must be a real button with a 44px minimum tap target.
- OTP groups should expose one label for the full code and use `inputmode="numeric"` with one-character cells or a single visually segmented input.

---

## Implementation Notes

**Figtree migration.** The selected Dopamine 2.0 component uses Figtree for all text styles. Preserve measured size, weight, line-height, and letter-spacing when migrating older flow-specific inputs into this primitive.

**Checkout variants.** `TextField`, `DateInput`, and `SelectDropdown` in the checkout surface should inherit this base container, status, and typography behavior, then add only their flow-specific affordances.
