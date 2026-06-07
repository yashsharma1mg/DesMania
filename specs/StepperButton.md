# StepperButton — Spec

> **Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Dopamine_2.0_Components?node-id=4023-2529
> **Component family:** Actions
> **Status:** Draft

---

## Prompt Match

```yaml
prompts:
  - "add to cart button"
  - "stepper button"
  - "quantity stepper"
  - "add button product card"
  - "increment decrement button"
  - "add with customise"
  - "out of stock button"
```

---

## Description

StepperButton is a stateful add-to-cart control that transitions between three visual modes: an initial Add prompt, a numeric quantity stepper, and a text confirmation state. A persistent "Customise" sub-label sits below the control at all times to surface contextual product options. The component handles out-of-stock products by rendering a disabled appearance (Filled type only).

### When to use

- On product cards and product detail pages where quantity selection and cart addition happen inline
- When a product supports a "Customise" flow that is surfaced via the Added-Text state
- When the product can be added multiple times (quantity stepper becomes relevant)

### When NOT to use

- For non-product actions — use `Button` instead
- When no quantity adjustment is needed and there is no customise flow — use `Button` (Fill/Primary) directly
- For bulk order flows where quantity input via a text field is more appropriate

---

## Anatomy

```
Outer container (flex column, gap-2)
┌─────────────────────────────────────────────┐
│  Control row (varies by state — see below)  │
├─────────────────────────────────────────────┤
│  "Customise"   ← always present, 11px text  │
└─────────────────────────────────────────────┘

State: Add
┌───────────────────────────────┐
│  px-16  [ ADD ]  [icon 20×20]  px-16  │
└───────────────────────────────┘

State: Added-Number (stepper)
┌──────────────────────────────────────────────┐
│  px-16  [− 20×20]  gap-4  [ 100 ]  gap-4  [+ 20×20]  px-16  │
└──────────────────────────────────────────────┘
         ↑ decrement button             ↑ increment button
                      ↑ quantity display (not interactive)

State: Added-Text
┌───────────────────────────────────────────┐
│  px-16  [ 1 added ]  gap-8  [chevron 20×20]  px-16  │
└───────────────────────────────────────────┘
```

**Key elements:**
- **Control row**: the primary interactive area; its internal layout changes entirely per state
- **Decrement button** (Added-Number only): 20×20px icon, `aria-label="Decrease quantity"`
- **Quantity display** (Added-Number only): non-interactive count, 40px wide (Filled) / 32px wide (Outline)
- **Increment button** (Added-Number only): 20×20px icon, `aria-label="Increase quantity"`
- **Trailing icon** (Add state): 20×20px add/chevron icon, visibility controlled by `icon` prop
- **Chevron icon** (Added-Text state): 20×20px, opens the customise panel
- **Sub-label**: "Customise" text, always rendered below the control row, 11px Regular

---

## Variants

### filled.add
```yaml
filled.add:
  use_when: "Product not yet in cart"
  element: button
  tokens:
    background: token.color.brand.1mg
    foreground: token.color.content.inverse
    icon_color: token.color.content.inverse
    border: none
    padding_x: token.space.16
    padding_y: token.space.12
    gap: token.space.4
    radius: token.radius.8
```

### filled.added-number
```yaml
filled.added-number:
  use_when: "Product is in cart; user can increment or decrement quantity"
  element: div  # outer; decrement and increment are individual <button> elements inside
  tokens:
    background: token.color.brand.1mg
    foreground: token.color.content.inverse
    icon_color: token.color.content.inverse
    border: none
    padding_x: token.space.16
    padding_y: token.space.12
    gap: token.space.4
    radius: token.radius.8
```

### filled.added-text
```yaml
filled.added-text:
  use_when: "Product is in cart; tapping opens the customise/edit panel"
  element: button
  tokens:
    background: token.color.brand.1mg
    foreground: token.color.content.inverse
    icon_color: token.color.content.inverse
    border: none
    padding_x: token.space.16
    padding_y: token.space.12
    gap: token.space.8
    radius: token.radius.8
```

### filled.add.out-of-stock
```yaml
filled.add.out-of-stock:
  use_when: "Product is unavailable; shows ADD label in disabled appearance"
  element: button
  tokens:
    background: token.color.background.moderate
    foreground: token.color.content.disabled
    icon_color: token.color.content.disabled
    border: none
    padding_x: token.space.16
    padding_y: token.space.12
    gap: token.space.4
    radius: token.radius.8
```

### filled.added-number.out-of-stock
```yaml
filled.added-number.out-of-stock:
  use_when: "Product went out of stock while already in cart (e.g. last item removed by another session)"
  element: div
  tokens:
    background: token.color.background.moderate
    foreground: token.color.content.disabled
    icon_color: token.color.content.disabled
    border: none
    padding_x: token.space.16
    padding_y: token.space.12
    gap: token.space.4
    radius: token.radius.8
```

### filled.added-text.out-of-stock
```yaml
filled.added-text.out-of-stock:
  use_when: "Customisable product went out of stock while already in cart"
  element: button
  tokens:
    background: token.color.background.moderate
    foreground: token.color.content.disabled
    icon_color: token.color.content.disabled
    border: none
    padding_x: token.space.16
    padding_y: token.space.12
    gap: token.space.8
    radius: token.radius.8
```

### outline.add
```yaml
outline.add:
  use_when: "Product not yet in cart, on a surface where a bordered/lightweight style is required"
  element: button
  tokens:
    background: token.color.background.primary
    foreground: token.color.brand.1mg
    icon_color: token.color.brand.1mg
    border: token.color.border.subtle
    border_width: 1px
    padding_x: token.space.16
    padding_y: token.space.12
    gap: token.space.4
    radius: token.radius.8
```

### outline.added-number
```yaml
outline.added-number:
  use_when: "Product is in cart, outline context; user can adjust quantity"
  element: div
  tokens:
    background: token.color.background.primary
    foreground: token.color.brand.1mg
    icon_color: token.color.brand.1mg
    border: token.color.border.subtle
    border_width: 1px
    padding_x: token.space.16
    padding_y: token.space.12
    gap: token.space.4
    radius: token.radius.8
```

### outline.added-text
```yaml
outline.added-text:
  use_when: "Product is in cart, outline context; tapping opens customise panel"
  element: button
  tokens:
    background: token.color.background.primary
    foreground: token.color.brand.1mg
    icon_color: token.color.brand.1mg
    border: token.color.border.subtle
    border_width: 1px
    padding_x: token.space.16
    padding_y: token.space.12
    gap: token.space.8
    radius: token.radius.8
```

---

## Sub-label

```yaml
sub_label:
  content: "Customise"
  always_visible: true
  position: below_control
  gap_from_control: token.space.2
  tokens:
    font_family: token.font.family.sans
    font_size: token.font.size.tag-11
    font_weight: token.font.weight.regular
    line_height: token.font.line-height.16
    color: token.color.content.tertiary
    text_align: center
    width: full
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
    In the added-number state the focus ring applies to whichever of the two
    <button> elements (decrement / increment) is currently focused, not to the
    container div.

disabled:
  applies_to: [all out-of-stock variants]
  changes:
    opacity: 0.5
    pointer_events: none
  note: >
    Out-of-stock variants use explicit disabled color tokens (background.moderate,
    content.disabled) to communicate unavailability visually. opacity + pointer_events
    still apply on top to block interaction.

loading:
  applies_to: [filled.add, outline.add]
  changes:
    pointer_events: none
```

---

## Sizes

```yaml
large:
  padding_x: token.space.16
  padding_y: token.space.12
  font_size: token.font.size.body-14
  line_height: token.font.line-height.20
  icon_size: 20px

medium:
  padding_x: token.space.16
  padding_y: token.space.8 + token.space.2
  font_size: token.font.size.body-14
  line_height: token.font.line-height.20
  icon_size: 20px
```

---

## Typography

```yaml
control_label:
  font_family: token.font.family.sans
  font_size: token.font.size.body-14
  font_weight: token.font.weight.bold
  line_height: token.font.line-height.20
  letter_spacing: 0
  text_align: center

quantity_display:
  font_family: token.font.family.sans
  font_size: token.font.size.body-14
  font_weight: token.font.weight.bold
  line_height: token.font.line-height.20
  text_align: center
  width_filled: 40px
  width_outline: 32px

sub_label:
  font_family: token.font.family.sans
  font_size: token.font.size.tag-11
  font_weight: token.font.weight.regular
  line_height: token.font.line-height.16
  text_align: center
```

---

## With Icons

```yaml
add_icon:
  size: 20px
  position: trailing
  visibility: controlled_by_icon_prop
  applies_to: [*.add]

decrement_icon:
  size: 20px
  position: leading
  visibility: always
  applies_to: [*.added-number]

increment_icon:
  size: 20px
  position: trailing
  visibility: always
  applies_to: [*.added-number]

chevron_icon:
  size: 20px
  position: trailing
  visibility: controlled_by_icon_prop
  applies_to: [*.added-text]
```

---

## Composition

```yaml
composition:
  can_contain: []
  can_be_contained_by: [ProductCard, ProductDetailPage, CartItem]
  cannot_combine_with: [Button]
  note: >
    StepperButton contains its own sub-label ("Customise") — do not wrap it in
    another component that adds a redundant label below it.
    The added-number state renders two independent <button> elements inside a
    container div; treat it as a compound widget with a single group role.
```

---

## Accessibility

### ARIA Attributes

```html
<!-- Add state -->
<button type="button" aria-label="Add to cart">
  ADD
  <img aria-hidden="true" ... />
</button>

<!-- Added-Number state (compound widget) -->
<div role="group" aria-label="Quantity">
  <button type="button" aria-label="Decrease quantity">
    <img aria-hidden="true" ... />
  </button>
  <span aria-live="polite" aria-atomic="true">100</span>
  <button type="button" aria-label="Increase quantity">
    <img aria-hidden="true" ... />
  </button>
</div>

<!-- Added-Text state -->
<button type="button" aria-label="1 added — tap to customise">
  1 added
  <img aria-hidden="true" ... />
</button>

<!-- Out-of-stock state -->
<button
  type="button"
  aria-disabled="true"
  aria-label="Out of stock"
  tabindex="0"
>
  ADD
</button>
```

### Keyboard Support

| Key | Action |
|---|---|
| `Tab` | Move focus to control (or to decrement button in stepper state) |
| `Shift + Tab` | Move focus to previous element |
| `Enter` or `Space` | Activate button / decrement / increment |
| `Tab` (within stepper) | Move focus from decrement → increment |

### Touch Targets

- **Large**: 44px height (py-12 × 2 + lh-20 = 44px) ✅
- **Medium**: 40px height (py-10 × 2 + lh-20 = 40px) — falls short of 44px WCAG minimum by 4px; same known issue as `Button/Medium`
- **Stepper icons**: 20×20px visual; ensure 44×44px tap area via padding or invisible tap extension

### Screen Reader Announcements

- Add state: "Add to cart, button"
- Added-Number state: "Quantity, group" + live region announces count on change
- Added-Text state: "1 added — tap to customise, button"
- Out-of-stock: "Out of stock, dimmed" via `aria-disabled`

---

## Content Guidelines

### Text

- **Add label**: "ADD" — all caps, matches Figma; 3 chars max
- **Added-Text label**: short format "N added" — number + "added", e.g. "1 added", "2 added"
- **Sub-label**: "Customise" — sentence case; do not truncate; max ~10 chars

### Tone & Voice

- All-caps "ADD" is intentional brand voice for this component — do not change to "Add"
- "added" is lowercase to pair with the number naturally

---

## Usage Guidelines

### Do's

✅ **Do this:**
- Pair Large StepperButton with large product cards; Medium with compact grid cards
- Always show the "Customise" sub-label — it is part of the component, not optional
- Use out-of-stock state for Filled type only; Outline does not have an out-of-stock state per Figma
- Set `icon=false` only when the trailing icon would create visual clutter in a very constrained layout

### Don'ts

❌ **Don't do this:**
- Do not show the Added-Number stepper for Outline type in an out-of-stock state — not defined in Figma
- Do not reuse this component for non-product contexts (e.g. "add a row" in a form) — intent is commerce-specific
- Do not show the quantity display at 0 — transition back to the Add state when quantity reaches 0

---

## Implementation Notes

**HTML elements:**
- `Add` state → `<button type="button">`
- `Added-Text` state → `<button type="button">`
- `Added-Number` state → `<div role="group">` wrapping two `<button>` elements and a `<span>` for the count
- Outer wrapper (button + sub-label) → `<div>` flex column

**State machine:**
The three states represent a single logical cart interaction flow:
`Add` → (tap add) → `Added-Number` ← (quantity changes) → `Added-Text` (when product is customisable)
Transitions are driven by the parent (cart state). StepperButton is controlled — it does not own its own count.

**Icon color inheritance:**
Icon fills match the button foreground token in all states. Use `currentColor` on SVG elements to inherit automatically.

**Quantity display width:**
40px (Filled) / 32px (Outline) are raw layout values with no token equivalent — implement as hardcoded CSS until a layout token scale is introduced.
