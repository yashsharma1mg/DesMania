# InputField — Build Cache
**Built:** 2026-05-27
**Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Dopamine_2.0_Components?node-id=1619-588

---

## Variant Properties

| Property | Values |
|----------|--------|
| `type` | `basic`, `basic-with-icon-after`, `single-line-with-action`, `otp-4`, `otp-6` |
| `status` | `default`, `active`, `typing`, `success`, `error`, `disabled` |

Observed Figma symbols:

- Basic: default, active, error, success, typing, disabled
- Basic with icon after: default, active, error, success, typing, disabled
- Single line with action: default, active, error, typing, disabled
- 4 digit OTP: default, active, error, typing, disabled
- 6 digit OTP: default, active, error, typing, disabled

---

## Spec

`specs/InputField.md`

---

## Token Police Audit

**Figma MCP variable definitions confirm Figtree typography and state colors for the selected component set.**

### Passing references

| Token ID | Resolved value | Usage |
|----------|---------------|-------|
| `token.font.family.sans` | 'Figtree', system-ui, sans-serif | all input text |
| `token.font.size.body-14` | 14px | input value, placeholder, trailing action, OTP cells |
| `token.font.weight.regular` | 400 | default input value, placeholder, helper text |
| `token.font.weight.medium` | 500 | trailing action text |
| `token.font.weight.bold` | 700 | OTP cell value when emphasized |
| `token.font.line-height.20` | 20px | 14px input/action text |
| `token.font.size.body-12` | 12px | helper, label, error text |
| `token.font.line-height.16` | 16px | 12px helper/label text |
| `token.color.content.primary` | #181A1F | typed value |
| `token.color.content.secondary` | #414752 | label/helper text |
| `token.color.content.tertiary` | #868E9E | placeholder and icon default |
| `token.color.border.subtle` | #DDE2EB | default/disabled outline |
| `token.color.brand.1mg` | #FF5443 | active outline and action text |
| `token.color.state.error` | #C50F1F | error outline/helper |
| `token.color.primitive.wellness-green.30` | #156437 | success outline/helper |
| `token.radius.8` | 8px | input container radius |
| `token.space.12` | 12px | horizontal padding |
| `token.space.8` | 8px | OTP cell gap |

---

## Notes

- The MCP metadata reports the selected frame as `Input fields`, 368×3588, containing 27 symbols.
- Component dimensions are 328×88 for full-width input variants, 224×44 for 4-digit OTP, and 304×44 for 6-digit OTP.
- Letter spacing is `0` for all confirmed Figtree text styles.
