# IconButton — Spec

> **Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Dopamine_2.0_Components?node-id=4028-600
> **Component family:** Actions
> **Status:** Draft

---

## Prompt Match

```yaml
prompts:
  - "icon button"
  - "add icon button"
  - "floating action button"
  - "FAB button"
  - "icon only button"
  - "quantity badge button"
  - "order now pill"
  - "compact add button"
```

---

## Description

IconButton is a family of compact action controls that do not carry a primary text label. It covers four distinct sub-types — `Add` (icon-only add control), `Added` (quantity confirmation pill), `Special button` (short text pill for floating quick actions), and `FAB` (floating action button for low-contrast surfaces). All sub-types share the `IconButton` component shell but differ structurally in size, shape, and content.

### When to use

- **Add**: On product grid cards where a full-width StepperButton would be too large; provides a compact 32×32 add entry point
- **Added**: As the compact quantity indicator that pairs with `Add` — shows current count + chevron to open a detail/edit panel
- **Special button**: For a single high-priority floating quick-action with a short text label (2–3 words)
- **FAB**: For a floating utility action (e.g. filters, scroll-to-top, basket preview) that sits above low-contrast page backgrounds

### When NOT to use

- Do not use `Add` or `Added` as substitutes for `StepperButton` — they serve different layout contexts (compact grid vs inline full-width)
- Do not use `FAB` on dark or image backgrounds — Figma annotation specifies "for low contrast background" only
- Do not use `Special button` for more than 3 words — use `Button` (Ghost or Fill) instead

---

## Anatomy

```
Type=Add (32×32)
┌───────────┐
│  p-8      │  ← 8px padding all sides
│  [+ 16×16]│  ← 16px icon centered
│           │
└───────────┘

Type=Added (56px × auto)
┌─────────────────────────────┐
│  px-8  [ 1 ]  gap-4  [∨ 16×16]  px-8  │
│  py-4                       │
└─────────────────────────────┘
       ↑ count text (bold 14px)

Type=Special button (81px × auto)
┌──────────────────────────────────┐
│  px-12  [ Order Now ]  px-12    │
│  py-4                            │
└──────────────────────────────────┘
         ↑ label (regular 12px)

Type=FAB (~40×40, circular)
┌─────────────────┐
│   p-10          │  ← 10px padding all sides
│   [icon 20×20]  │
│                 │
└─────────────────┘
  radius: 20px (circle)
```

**Key elements:**
- **Add icon** (`Add` type): 16×16px `+` symbol
- **Tick icon** (`Add/Single Added`): 16×16px checkmark
- **Count text** (`Added` type): number string, bold 14px
- **Chevron icon** (`Added` type): 16×16px dropdown chevron
- **Label** (`Special button`): short action text, regular 12px
- **Action icon** (`FAB`): 20×20px icon from Dopamine icon set

---

## Variants

### add.default
```yaml
add.default:
  use_when: "Product not yet added; compact grid card context"
  element: button
  tokens:
    background: token.color.background.primary
    foreground: token.color.brand.1mg
    border: token.color.border.subtle
    border_width: 1px
    padding: token.space.8
    radius: token.radius.8
    size: 32px
    shadow: token.shadow.2
```

### add.disable
```yaml
add.disable:
  use_when: "Product unavailable in compact grid card context"
  element: button
  tokens:
    background: token.color.background.primary
    foreground: token.color.content.disabled
    border: token.color.border.subtle
    border_width: 1px
    padding: token.space.8
    radius: token.radius.8
    size: 32px
    shadow: token.shadow.2
```

### add.single-added
```yaml
add.single-added:
  use_when: "One unit just added — transient confirmation state before transitioning to Added pill or StepperButton"
  element: button
  tokens:
    background: token.color.brand.1mg
    foreground: token.color.content.inverse
    border: none
    padding: token.space.8
    radius: token.radius.8
    size: 32px
    shadow: token.shadow.2
```

### added.default
```yaml
added.default:
  use_when: "Item is in cart; shows current quantity and entry point to edit/customise — compact context"
  element: button
  tokens:
    background: token.color.brand.1mg
    foreground: token.color.content.inverse
    icon_color: token.color.content.inverse
    border: none
    padding_x: token.space.8
    padding_y: token.space.4
    gap: token.space.4
    radius: token.radius.8
    shadow: token.shadow.1
```

### added.disable
```yaml
added.disable:
  use_when: "Item is in cart but product went out of stock — quantity badge shows unavailability"
  element: button
  tokens:
    background: # TOKEN MISSING: #868E9E — used here as a background; token.color.content.disabled and token.color.content.tertiary share this value but are content tokens, not background tokens; no semantic token.color.background.* maps to this value
    foreground: token.color.content.inverse
    icon_color: token.color.content.inverse
    border: none
    padding_x: token.space.8
    padding_y: token.space.4
    gap: token.space.4
    radius: token.radius.8
    shadow: token.shadow.1
```

### special-button.default
```yaml
special-button.default:
  use_when: "Floating compact quick-action pill with a short text label (e.g. 'Order Now') — not a navigation element"
  element: button
  tokens:
    background: token.color.primitive.cool-neutral.10  # deliberate primitive exception — same approved precedent as Button fill.secondary; no semantic background token covers #181A1F
    foreground: token.color.content.inverse
    border: none
    padding_x: token.space.12
    padding_y: token.space.4
    radius: token.radius.8
```

### fab.default
```yaml
fab.default:
  use_when: "Floating utility action on a low-contrast (light/white) background surface — Figma annotation: 'To be used for low contrast background'"
  element: button
  tokens:
    background: token.color.background.subtle
    foreground: token.color.content.primary
    icon_color: token.color.content.primary
    border: none
    padding: token.space.8 + token.space.2
    radius: # TOKEN MISSING: 20px — no token.radius.20 exists; on a 40×40px container this produces a circle; semantic equivalent would be token.radius.full (9999px) if circle intent is confirmed, or token.radius.16 / token.radius.24 if a rounded-square is intended
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
  applies_to: [add.disable, added.disable]
  changes:
    opacity: 0.5
    pointer_events: none
  note: >
    add.disable and added.disable use explicit color overrides to communicate
    unavailability visually. opacity + pointer_events apply on top to block
    interaction and satisfy assistive technology expectations.

loading:
  applies_to: [add.default, fab.default]
  changes:
    pointer_events: none
```

---

## Sizes

```yaml
add:
  size: 32px
  padding: token.space.8
  icon_size: 16px

added:
  padding_x: token.space.8
  padding_y: token.space.4
  icon_size: 16px
  count_min_width: 20px

special_button:
  padding_x: token.space.12
  padding_y: token.space.4

fab:
  padding: token.space.8 + token.space.2
  icon_size: 20px
  note: total rendered size = icon (20px) + padding (10px × 2) = 40×40px
```

---

## Typography

```yaml
added_count:
  font_family: token.font.family.sans
  font_size: token.font.size.body-14
  font_weight: token.font.weight.bold
  line_height: token.font.line-height.20
  text_align: center
  min_width: 20px

special_button_label:
  font_family: token.font.family.sans
  font_size: token.font.size.body-12
  font_weight: token.font.weight.regular
  line_height: token.font.line-height.16
  text_align: center
  white_space: nowrap
```

---

## With Icons

```yaml
add_icon:
  size: 16px
  position: centered
  applies_to: [add.default, add.disable]
  color: inherits foreground token

tick_icon:
  size: 16px
  position: centered
  applies_to: [add.single-added]
  color: token.color.content.inverse

chevron_icon:
  size: 16px
  position: trailing
  applies_to: [added.default, added.disable]
  color: inherits foreground token

fab_icon:
  size: 20px
  position: centered
  applies_to: [fab.default]
  color: token.color.content.primary
```

---

## Composition

```yaml
composition:
  can_contain: []
  can_be_contained_by:
    Add: [ProductCard, GridItem]
    Added: [ProductCard, GridItem]
    Special button: [BottomBar, FloatingLayer, AppBar]
    FAB: [PageLayer, BottomSheet, ScrollContainer]
  cannot_combine_with:
    Add: [StepperButton]
    Added: [StepperButton]
  note: >
    Add and Added are companion types — they appear in the same location on a
    product card and transition between each other. Added shows the count until
    the user taps, which then opens the StepperButton or detail panel.
    FAB must always float above page content; it must not be placed inline.
```

---

## Accessibility

### ARIA Attributes

```html
<!-- Add / Default -->
<button type="button" aria-label="Add to cart">
  <img aria-hidden="true" ... />
</button>

<!-- Add / Disable -->
<button type="button" aria-disabled="true" aria-label="Out of stock" tabindex="0">
  <img aria-hidden="true" ... />
</button>

<!-- Add / Single Added (transient) -->
<button type="button" aria-label="Added to cart" aria-live="polite">
  <img aria-hidden="true" ... />
</button>

<!-- Added / Default -->
<button type="button" aria-label="1 in cart — tap to edit">
  <span aria-live="polite">1</span>
  <img aria-hidden="true" ... />
</button>

<!-- Added / Disable -->
<button type="button" aria-disabled="true" aria-label="Out of stock" tabindex="0">
  <span>12</span>
  <img aria-hidden="true" ... />
</button>

<!-- Special button -->
<button type="button" aria-label="Order now">
  Order Now
</button>

<!-- FAB -->
<button type="button" aria-label="[Describe the FAB action specifically]">
  <img aria-hidden="true" ... />
</button>
```

### Keyboard Support

| Key | Action |
|---|---|
| `Tab` | Move focus to button |
| `Shift + Tab` | Move focus to previous element |
| `Enter` or `Space` | Activate button |

### Touch Targets

- **Add / Added**: 32px visual size — below 44px WCAG minimum; consuming layout must ensure 44×44px tap area via padding or invisible hit-area extension
- **FAB**: ~40×40px — also slightly below 44px minimum by 4px; same hit-area extension note applies
- **Special button**: height = py-4 × 2 + lh-16 = 24px — well below 44px; floating placement must ensure 44px vertical tap space

### Screen Reader Announcements

- `Add/Default`: "Add to cart, button"
- `Add/Single Added`: count change announced via `aria-live` region
- `Added`: "N in cart — tap to edit, button"; count updates via `aria-live`
- `Special button`: label text + "button"
- `FAB`: descriptive `aria-label` required — icon alone is not sufficient

---

## Content Guidelines

### Text

- **Added count**: integer only; no units; max display "99+" if count exceeds display width
- **Special button label**: 2–3 words max; sentence case; verb-led ("Order Now", "View Cart")
- **FAB**: icon-only — no text label in the button; provide `aria-label` that describes the specific action

### Tone & Voice

- Short, active, specific labels — "Order Now" not "Place Your Order"
- `Added` count speaks for itself — no surrounding label needed inside the button

---

## Usage Guidelines

### Do's

✅ **Do this:**
- Use `Add` + `Added` as a pair on the same card — they occupy the same space and swap on interaction
- Use `FAB` only on low-contrast (white/light) backgrounds per Figma specification
- Extend the tap area of `Add`, `Added`, and `FAB` to 44×44px in the consuming layout to meet touch target requirements
- Use `single-added` as a brief transient state (e.g. 600–800ms) before settling into `Added` or `Add`

### Don'ts

❌ **Don't do this:**
- Do not place `FAB` on dark or image backgrounds — the `token.color.background.subtle` bg will disappear
- Do not use `Special button` for navigation — use `Button` (Ghost or Outline) or a `<a>` element
- Do not show `Added/Disable` without also communicating out-of-stock state in the surrounding product card
- Do not place `Add` and `StepperButton` in the same layout position — they serve the same function

---

## Implementation Notes

**HTML elements:**
- All types → `<button type="button">` (never `<div>` or `<span>`)
- `Added` count → `<span aria-live="polite">` inside the button so count changes are announced

**`Add` button size:**
- 32×32px is the design-specified size; achieved via `padding: 8px` + `icon 16px` = 32px total
- Consuming layout should provide a 44×44px invisible tap area around the button

**`Added` fixed width (56px) and `Special button` fixed width (81px):**
- Raw layout values; no token equivalent; implement as hardcoded CSS until a layout token scale is introduced

**Shadow mapping:**
- `Add` group → `token.shadow.2` (Foundation Level 2: `0 4px 12px 0 rgba(39,43,51,0.08)`) — y-offset and elevation intent match; Figma component uses a slightly tighter blur (2px) that deviates from Foundation
- `Added` group → `token.shadow.1` (Foundation Level 1: `0 2px 4px 0 rgba(39,43,51,0.06)`) — y-offset and color match; Figma component uses 2px blur vs Foundation's 4px
- Foundation values are the implementation source of truth; Figma component deviations should be corrected in the component file

**FAB radius:**
- `20px` on a `40×40px` container produces a circle; if circle is the confirmed intent, implement as `border-radius: 50%` or `token.radius.full` at the implementation level; pending design team confirmation

**Primitive exception carried forward:**
- `special-button.default` uses `token.color.primitive.cool-neutral.10` (#181A1F) — same approved precedent as `Button/fill.secondary`
