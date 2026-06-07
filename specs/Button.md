# Button — Spec

> **Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Dopamine_2.0_Components?node-id=4021-1535
> **Component family:** Actions
> **Status:** Draft

---

## Prompt Match

```yaml
prompts:
  - "button"
  - "primary button"
  - "call to action"
  - "submit button"
  - "ghost button"
  - "outline button"
  - "text link button"
  - "icon button"
```

---

## Description

Button is the primary interactive action trigger in Dopamine 2.0. It communicates a single, clear action — from form submission to navigation to secondary decisions — and adapts its visual weight via type (Fill / Outline / Ghost) to signal hierarchy within a surface.

### When to use

- To trigger a single discrete action (submit, confirm, cancel, navigate)
- When the action is the primary call-to-action on a surface → use Fill / Primary
- When the action is supportive or equal-weight to a primary → use Outline or Ghost
- When an inline text-style action is needed → use Ghost / Underline

### When NOT to use

- For navigation between top-level sections → use Navigation components
- For multi-step workflows → prefer a dedicated flow component with step controls
- When more than two buttons share equal visual weight on one surface → reconsider layout or use a different action pattern

---

## Anatomy

```
Fill / Primary (Large, Text Only)
┌──────────────────────────────┐
│  ◀ px-16 ▶  [ Label ]  ◀ px-16 ▶  │  height: py-12 top + 20px line-height + py-12 bottom
└──────────────────────────────┘
                  ↑
           font: body-14 / bold / lh-20

Icon + Text variant
┌──────────────────────────────┐
│  px-16  [✦ 20×20]  gap-4  [Label]  px-16  │
└──────────────────────────────┘

Text + Icon variant
┌──────────────────────────────┐
│  px-16  [Label]  gap-4  [✦ 20×20]  px-16  │
└──────────────────────────────┘

Underline variant (Ghost only, no icon)
[ Label ]
─────────
```

**Key elements:**
- **Container**: flex row, center-aligned, border-radius 8px, min-width 104px
- **Label**: Figtree Bold 14px / lh-20, centered, min-width 44px, max-width 296px
- **Leading icon** (Icon + Text style): 20×20px, left of label, gap 4px
- **Trailing icon** (Text + Icon style): 20×20px, right of label, gap 4px
- **Underline decoration** (Underline style): applied to label text, no icons

---

## Variants

### fill.primary
```yaml
fill.primary:
  use_when: "The single strongest call-to-action on a surface — buy, confirm, submit"
  element: button
  tokens:
    background: token.color.brand.1mg
    foreground: token.color.content.inverse
    border: none
    padding_x: token.space.16
    padding_y: token.space.12
    radius: token.radius.8
```

### fill.secondary
```yaml
fill.secondary:
  use_when: "High-emphasis action that competes with or mirrors a primary action — e.g. 'Add to cart' alongside 'Buy now'"
  element: button
  tokens:
    background: token.color.primitive.cool-neutral.10  # deliberate primitive exception — no semantic bg token covers this value; approved by DS team
    foreground: token.color.content.inverse
    border: none
    padding_x: token.space.16
    padding_y: token.space.12
    radius: token.radius.8
```

### fill.inverse
```yaml
fill.inverse:
  use_when: "Primary action placed on a dark or brand-coloured surface where a white background is needed for contrast"
  element: button
  tokens:
    background: token.color.background.primary
    foreground: token.color.content.primary
    border: none
    padding_x: token.space.16
    padding_y: token.space.12
    radius: token.radius.8
```

### fill.disabled
```yaml
fill.disabled:
  use_when: "Action is temporarily unavailable — prerequisites unmet, form invalid, loading in progress"
  element: button
  tokens:
    background: token.color.background.moderate
    foreground: token.color.content.disabled
    border: none
    padding_x: token.space.16
    padding_y: token.space.12
    radius: token.radius.8
```

### outline.primary
```yaml
outline.primary:
  use_when: "Secondary action alongside a Fill/Primary button — equal or lower visual hierarchy"
  element: button
  tokens:
    background: token.color.background.primary
    foreground: token.color.brand.1mg
    border: token.color.border.subtle
    border_width: 1px
    padding_x: token.space.16
    padding_y: token.space.12
    radius: token.radius.8
```

### outline.disabled
```yaml
outline.disabled:
  use_when: "Outline action that is temporarily unavailable"
  element: button
  tokens:
    background: token.color.background.primary
    foreground: token.color.content.disabled
    border: token.color.border.subtle
    border_width: 1px
    padding_x: token.space.16
    padding_y: token.space.12
    radius: token.radius.8
```

### ghost.primary
```yaml
ghost.primary:
  use_when: "Lowest-weight action — tertiary CTAs, in-line links within dense layouts"
  element: button
  tokens:
    background: none
    foreground: token.color.brand.1mg
    border: none
    padding_x: token.space.16
    padding_y: token.space.12
    radius: token.radius.8
```

### ghost.secondary
```yaml
ghost.secondary:
  use_when: "Low-weight action on a light surface where brand colour is not needed"
  element: button
  tokens:
    background: none
    foreground: token.color.content.primary
    border: none
    padding_x: token.space.16
    padding_y: token.space.12
    radius: token.radius.8
```

### ghost.inverse
```yaml
ghost.inverse:
  use_when: "Ghost action placed on a dark or brand-coloured surface — text must be white"
  element: button
  tokens:
    background: none
    foreground: token.color.content.inverse
    border: none
    padding_x: token.space.16
    padding_y: token.space.12
    radius: token.radius.8
```

### ghost.disabled
```yaml
ghost.disabled:
  use_when: "Ghost action that is temporarily unavailable"
  element: button
  tokens:
    background: none
    foreground: token.color.content.disabled
    border: none
    padding_x: token.space.16
    padding_y: token.space.12
    radius: token.radius.8
```

### ghost.underline.primary
```yaml
ghost.underline.primary:
  use_when: "Inline text link that must read as a button action, not navigation — no icon allowed"
  element: button
  tokens:
    background: none
    foreground: token.color.brand.1mg
    border: none
    text_decoration: underline
    padding_x: token.space.16
    padding_y: token.space.12
    radius: token.radius.8
```

### ghost.underline.secondary
```yaml
ghost.underline.secondary:
  use_when: "Underline action on a light surface using default text colour"
  element: button
  tokens:
    background: none
    foreground: token.color.content.primary
    border: none
    text_decoration: underline
    padding_x: token.space.16
    padding_y: token.space.12
    radius: token.radius.8
```

### ghost.underline.inverse
```yaml
ghost.underline.inverse:
  use_when: "Underline action on a dark or brand-coloured surface"
  element: button
  tokens:
    background: none
    foreground: token.color.content.inverse
    border: none
    text_decoration: underline
    padding_x: token.space.16
    padding_y: token.space.12
    radius: token.radius.8
```

### ghost.underline.disabled
```yaml
ghost.underline.disabled:
  use_when: "Underline action that is temporarily unavailable"
  element: button
  tokens:
    background: none
    foreground: token.color.content.disabled
    border: none
    text_decoration: underline
    padding_x: token.space.16
    padding_y: token.space.12
    radius: token.radius.8
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

active:
  applies_to: [all]
  changes:
    shadow: none

disabled:
  applies_to: [all]
  changes:
    opacity: 0.5
    pointer_events: none
  note: >
    Disabled intent variants (fill.disabled, outline.disabled, ghost.disabled,
    ghost.underline.disabled) apply explicit color tokens to communicate disabled
    state visually. The opacity + pointer_events rules still apply on top to
    block interaction and satisfy assistive technology expectations.

loading:
  applies_to: [fill.primary, fill.secondary, outline.primary]
  changes:
    pointer_events: none
```

---

## Sizes

```yaml
large:
  padding_x: token.space.16
  padding_y: token.space.12
  text: token.font.size.body-14
  line_height: token.font.line-height.20
  icon_size: 20px

medium:
  padding_x: token.space.16
  padding_y: token.space.8 + token.space.2
  text: token.font.size.body-14
  line_height: token.font.line-height.20
  icon_size: 20px
```

---

## Typography

```yaml
label:
  font_family: token.font.family.sans
  font_size: token.font.size.body-14
  font_weight: token.font.weight.bold
  line_height: token.font.line-height.20
  letter_spacing: 0
  text_align: center
  min_width: 44px
  max_width: 296px
```

---

## With Icons

```yaml
icon_leading:
  layout: inline-flex
  direction: row
  align: center
  gap: token.space.4
  icon_position: left
  icon_size: 20px
  applies_to: [fill.primary, fill.secondary, fill.inverse, fill.disabled, outline.primary, outline.disabled, ghost.primary, ghost.secondary, ghost.inverse, ghost.disabled]

icon_trailing:
  layout: inline-flex
  direction: row
  align: center
  gap: token.space.4
  icon_position: right
  icon_size: 20px
  applies_to: [fill.primary, fill.secondary, fill.inverse, fill.disabled, outline.primary, outline.disabled, ghost.primary, ghost.secondary, ghost.inverse, ghost.disabled]

icon_only:
  supported: false
  note: "Icon-only buttons not defined in this component set — use a separate IconButton component if needed"

underline_with_icon:
  supported: false
  note: "Underline style does not support icon slots per Figma definition"
```

---

## Composition

```yaml
composition:
  can_contain: []
  can_be_contained_by: [ButtonGroup, BottomSheet, Modal, Card, Form, PageHeader, AppBar]
  cannot_combine_with: []
  icon_source: >
    Icons rendered inside buttons are sourced from the Dopamine icon set at 20×20px.
    Icon colour inherits from the button foreground token — do not override separately.
```

---

## Accessibility

### ARIA Attributes

```html
<!-- Default action button -->
<button
  type="button"
  aria-label="[Descriptive action label if icon-only or label is ambiguous]"
  aria-disabled="false"
>
  Button
</button>

<!-- Disabled state — use aria-disabled, not disabled attribute, to preserve keyboard discoverability -->
<button
  type="button"
  aria-disabled="true"
  tabindex="0"
>
  Button
</button>

<!-- Loading state -->
<button
  type="button"
  aria-busy="true"
  aria-disabled="true"
>
  Button
</button>
```

### Keyboard Support

| Key | Action |
|---|---|
| `Tab` | Move focus to button |
| `Shift + Tab` | Move focus to previous element |
| `Enter` or `Space` | Activate button |

### Touch Targets

- **Minimum size**: 44×44px (WCAG 2.5.5)
- **Large size**: 44px height met by py-12 + 20px line-height = 44px total ✅
- **Medium size**: height from py-10 + 20px line-height = 40px — falls below 44px minimum; padding_y resolution required once TOKEN MISSING is resolved
- **Spacing**: Minimum 8px between adjacent buttons

### Screen Reader Announcements

**What should be announced:**
- Button role (from `<button>` element)
- Label text content
- Disabled state: "dimmed" or "unavailable" via `aria-disabled="true"`
- Busy/loading state via `aria-busy="true"`

---

## Content Guidelines

### Text Length

- **Label**: 2–20 characters recommended; max-width cap at 296px enforced by layout
- Short, verb-led labels preferred: "Add to cart", "Confirm", "Cancel", "Learn more"

### Tone & Voice

- Sentence case, not title case
- Active voice: "Submit order" not "Order submission"
- Be specific: "Pay ₹499" is better than "Proceed"
- Avoid padding words: "Click here to continue" → "Continue"

---

## Usage Guidelines

### Do's

✅ **Do this:**
- Use exactly one Fill/Primary button as the primary CTA per visible surface
- Pair Fill/Primary with Ghost or Outline for a two-button layout
- Match button size to the density of the surrounding content — Large for touch-first surfaces, Medium for dense web views
- Use Ghost/Underline only for inline supportive actions where a full-height button would be visually heavy

### Don'ts

❌ **Don't do this:**
- Do not stack two Fill/Primary buttons side-by-side — hierarchy becomes unclear
- Do not use Fill/Secondary on a dark background without checking contrast — the token is unresolved (TOKEN MISSING); use Fill/Inverse instead
- Do not use Underline style with icons — not supported per Figma definition
- Do not use a `<div>` or `<span>` to implement this component — always `<button>` or `<a>`

---

## Implementation Notes

**HTML element:**
- Use `<button type="button">` for actions (prevents accidental form submission)
- Use `<button type="submit">` inside forms
- Use `<a href="...">` only when the action navigates — apply button visual styles via CSS

**Icon rendering:**
- Icon colour must inherit from the button's foreground token — do not set icon colour independently
- Icons are image assets (SVG/PNG) from the Dopamine icon set at exactly 20×20px

**Disabled interaction:**
- Avoid the native `disabled` attribute alone; it removes keyboard focus
- Prefer `aria-disabled="true"` + `pointer-events: none` via CSS to keep the element focusable and discoverable by screen readers

**Resolved token decisions (recorded for future consistency):**
- `fill.secondary` background uses `token.color.primitive.cool-neutral.10` — deliberate primitive exception, approved by DS team; no semantic bg token exists for this value
- Medium `padding_y` is expressed as `token.space.8 + token.space.2` (composites to 10px) — keeps spacing on the Dopamine token scale
- No hover background treatment — no semantic hover tokens are defined; hover has no visual change
- No minimum button width or height enforced — constrained by content and layout context
