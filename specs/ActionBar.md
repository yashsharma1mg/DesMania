# ActionBar — Spec

> **Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Dopamine_2.0_Components?node-id=1661-3238
> **Component family:** Navigation / Layout
> **Status:** Draft

---

## Prompt Match

```yaml
prompts:
  - "action bar"
  - "bottom action bar"
  - "sticky CTA bar"
  - "checkout bar"
  - "add to cart bar"
  - "two button bar"
  - "payment bar"
  - "bill summary bar"
  - "proceed bar"
  - "single CTA bar"
```

---

## Description

ActionBar is a persistent bottom surface that holds one or two primary action buttons plus optional contextual content. It sits above the page scroll area — typically sticky to the bottom viewport. It acts as a layout container and composition pattern, not a single button.

Six active variants cover all standard checkout, product, and service flows. A seventh Payment/Checkout variant exists in Figma but is marked **NOT IN USE** and should not be implemented.

### When to use

- On product detail pages, cart, and checkout flows where the primary CTA must remain reachable while the user scrolls content
- On booking/scheduling flows where a multi-step confirmation needs a persistent proceed action
- On filtering or search result pages where the user needs to apply and clear selections

### When NOT to use

- Do not use ActionBar in modal sheets or drawers — the modal has its own footer area
- Do not use more than one ActionBar on the same screen
- Do not put more than two buttons in a single ActionBar — use a full-page layout instead

---

## Anatomy

```
Container (all variants)
┌──────────────────────────────────────────────────────┐
│  [ content area ]  [ button(s) ]                     │
│  p-16 or px-16 py-12 (varies by variant)             │
└──────────────────────────────────────────────────────┘
bg: token.color.background.primary
width: 100% (full device width)
```

**Key elements:**
- **Container**: white bg, no border/shadow defined in Figma — consuming app typically adds a `box-shadow` or `border-top` at the layout level
- **Primary button**: `Button/Fill/Primary` (coral bg, white label, 44px height, full-width or flex-1)
- **Secondary button**: `Button/Outline` (white bg, subtle border, coral label) — two-button variants only
- **Ghost link**: brand coral text, no bg/border — two-button vertical lower button only
- **Content area**: left-aligned text block (count + redirect, or price + link) — redirect variants only
- **Subtext**: optional second line within the primary button — one-button.with-subtext only

---

## Variants

### standard.one-button
```yaml
standard.one-button:
  use_when: "Single primary CTA occupying the full action bar width — simplest checkout step"
  layout: flex-row
  tokens:
    container_bg: token.color.background.primary
    container_padding: token.space.16  # all sides (p-16)
  button:
    type: fill.primary (Button component)
    width: full
    height: 44px
    tokens:
      background: token.color.brand.1mg
      foreground: token.color.content.inverse
      padding_x: token.space.16
      padding_y: token.space.12
      radius: token.radius.8
      label_font: token.font.size.body-14 / token.font.weight.bold / token.font.line-height.20
```

### standard.one-button-subtext
```yaml
standard.one-button-subtext:
  use_when: "Single CTA with a supplementary second line inside the button — e.g. 'Proceed • Free delivery'"
  layout: flex-row
  tokens:
    container_bg: token.color.background.primary
    container_padding: token.space.16
  button:
    type: fill.primary with secondary line
    width: full
    height: auto  # py-12×2 + lh-20 + gap-2 + lh-20 = 66px
    tokens:
      background: token.color.brand.1mg
      foreground: token.color.content.inverse
      padding_x: token.space.16
      padding_y: token.space.12
      gap_internal: token.space.2
      radius: token.radius.8
    label:
      font_size: token.font.size.body-14
      font_weight: token.font.weight.bold
      line_height: token.font.line-height.20
    subtext:
      font_size: token.font.size.body-14
      font_weight: token.font.weight.regular
      line_height: token.font.line-height.20
      color: token.color.content.inverse
```

### standard.two-button
```yaml
standard.two-button:
  use_when: "Two equal-weight actions side by side — secondary outline on left, primary fill on right"
  layout: flex-row, gap-8
  tokens:
    container_bg: token.color.background.primary
    container_padding: token.space.16
    gap: token.space.8
  secondary_button:
    type: outline (Button component)
    width: flex-1
    tokens:
      background: token.color.background.primary
      foreground: token.color.brand.1mg
      border: token.color.border.subtle
      border_width: 1px
      padding_x: token.space.16
      padding_y: token.space.12
      radius: token.radius.8
      label_font: token.font.size.body-14 / token.font.weight.bold / token.font.line-height.20
  primary_button:
    type: fill.primary
    width: flex-1
    tokens:
      background: token.color.brand.1mg
      foreground: token.color.content.inverse
      padding_x: token.space.16
      padding_y: token.space.12
      radius: token.radius.8
      label_font: token.font.size.body-14 / token.font.weight.bold / token.font.line-height.20
```

### standard.two-button-vertical
```yaml
standard.two-button-vertical:
  use_when: "Primary action stacked above a secondary ghost link — e.g. 'Proceed' over 'Skip for now'"
  layout: flex-col, gap-16
  tokens:
    container_bg: token.color.background.primary
    container_padding: token.space.16
    gap: token.space.16
  primary_button:
    type: fill.primary
    width: full
    tokens:
      background: token.color.brand.1mg
      foreground: token.color.content.inverse
      padding_x: token.space.16
      padding_y: token.space.12
      radius: token.radius.8
      label_font: token.font.size.body-14 / token.font.weight.bold / token.font.line-height.20
  ghost_link:
    type: text/ghost (no bg, no border)
    width: full
    tokens:
      foreground: token.color.brand.1mg
      label_font: token.font.size.body-14 / token.font.weight.bold / token.font.line-height.20
```

### standard.one-button-overlay-redirect
```yaml
standard.one-button-overlay-redirect:
  use_when: >
    Left side shows a dynamic count or value with an expand indicator;
    right side holds a compact fixed-width primary CTA.
    Example: test count badge + 'Book' button on a lab test product page.
  layout: flex-row, gap-16, items-center
  tokens:
    container_bg: token.color.background.primary
    container_padding_x: token.space.16
    container_padding_y: token.space.12
    gap: token.space.16
  content_area:
    layout: flex-col, gap-2
    sub_label:
      color: token.color.content.tertiary
      font_size: token.font.size.body-12
      font_weight: token.font.weight.regular
      line_height: token.font.line-height.16
    value_row:
      layout: flex-row, gap-4
      value_text:
        color: token.color.content.primary
        font_size: token.font.size.body-16
        font_weight: token.font.weight.bold
        line_height: token.font.line-height.24
      expand_icon:
        size: 16px  # raw value
        color: token.color.content.primary
  primary_button:
    type: fill.primary
    min_width: 104px  # raw layout value
    tokens:
      background: token.color.brand.1mg
      foreground: token.color.content.inverse
      padding_x: token.space.16
      padding_y: token.space.12
      radius: token.radius.8
      label_font: token.font.size.body-14 / token.font.weight.bold / token.font.line-height.20
```

### standard.one-button-textual-redirect
```yaml
standard.one-button-textual-redirect:
  use_when: >
    Left side shows a price and a tappable text link for secondary detail;
    right side holds a compact fixed-width primary CTA.
    Example: cart total + 'See bill summary' link + 'Proceed' button.
  layout: flex-row, gap-16, items-center
  tokens:
    container_bg: token.color.background.primary
    container_padding_x: token.space.16
    container_padding_y: token.space.12
    gap: token.space.16
  content_area:
    layout: flex-col, gap-2
    price_text:
      color: token.color.content.primary
      font_size: token.font.size.body-16
      font_weight: token.font.weight.bold
      line_height: token.font.line-height.24
    redirect_link:
      color: token.color.brand.1mg
      font_size: token.font.size.body-12
      font_weight: token.font.weight.bold
      line_height: token.font.line-height.16
      element: button or a (tappable link to detail)
  primary_button:
    type: fill.primary
    min_width: 104px  # raw layout value
    tokens:
      background: token.color.brand.1mg
      foreground: token.color.content.inverse
      padding_x: token.space.16
      padding_y: token.space.12
      radius: token.radius.8
      label_font: token.font.size.body-14 / token.font.weight.bold / token.font.line-height.20
```

### payment.checkout ⚠️ NOT IN USE
```yaml
payment.checkout:
  status: NOT IN USE — Figma annotation explicitly marks this variant as "NOT IN USE"
  use_when: N/A — do not implement
  note: >
    Documented for reference only. Shows a payment-method selector (Google Pay logo +
    label) on the left, and a price+CTA button on the right. The CTA button has a
    two-line layout: amount (16px Bold) + "TOTAL" label (14px Regular) with "Continue"
    (18px Medium heading) right-aligned. Do not ship this variant without explicit
    design confirmation that it has been reinstated.
```

---

## States

```yaml
default:
  applies_to: [all]
  changes: {}

loading:
  applies_to: [primary_button in all variants]
  changes:
    pointer_events: none
  note: >
    No loading spinner is defined at the ActionBar level in Figma — consuming
    implementation should apply a loading state to the Button component directly.
    The ActionBar container remains visible during button loading.

disabled:
  note: >
    Not defined as a variant. If the primary CTA is not yet actionable (e.g. no
    item selected, form incomplete), the Button inside should use its own disabled
    treatment. The ActionBar container does not change appearance.
```

---

## Sizes

```yaml
container:
  width: 100%  # full device width
  height: auto  # driven by content
  note: no min-height enforced; consuming layout provides safe-area-inset-bottom padding

one_button: ~76px  # p-16 + 44px button + p-16
one_button_subtext: ~98px  # p-16 + 66px button + p-16
two_button: ~76px  # same as one_button
two_button_vertical: ~128px  # p-16 + 44px primary + gap-16 + ~32px ghost + p-16
one_button_redirect: ~68px  # py-12 + (12+20+12=44 content area) + py-12
```

---

## Typography

```yaml
button_label:
  font_family: token.font.family.sans
  font_size: token.font.size.body-14
  font_weight: token.font.weight.bold
  line_height: token.font.line-height.20

button_subtext:
  font_family: token.font.family.sans
  font_size: token.font.size.body-14
  font_weight: token.font.weight.regular
  line_height: token.font.line-height.20

content_sub_label:
  font_family: token.font.family.sans
  font_size: token.font.size.body-12
  font_weight: token.font.weight.regular
  line_height: token.font.line-height.16

content_value:
  font_family: token.font.family.sans
  font_size: token.font.size.body-16
  font_weight: token.font.weight.bold
  line_height: token.font.line-height.24

redirect_link:
  font_family: token.font.family.sans
  font_size: token.font.size.body-12
  font_weight: token.font.weight.bold
  line_height: token.font.line-height.16
```

---

## Composition

```yaml
composition:
  can_contain: [Button, text nodes]
  can_be_contained_by: [Page, Screen, BottomFixedLayer]
  cannot_combine_with: [BottomSheet, Modal footer]
  note: >
    ActionBar contains Button components — do not recreate button styles inline.
    In redirect variants, the content area is not a Button — it is a flex container
    with text and an optional tappable link. The redirect_link element should be
    a <button type="button"> or <a href> depending on whether it navigates or
    triggers an in-page panel.
    Only one ActionBar per screen. It must always be the last element in the
    fixed/sticky layer above the navigation bar.
```

---

## Accessibility

### ARIA Attributes

```html
<!-- ActionBar container -->
<footer role="contentinfo" aria-label="Actions">
  <!-- or: <div role="group" aria-label="Page actions"> if footer semantics are used elsewhere -->

  <!-- One-button variant -->
  <button type="button">Proceed to checkout</button>

  <!-- Two-button variant -->
  <button type="button">Cancel</button>
  <button type="button">Confirm</button>

  <!-- Redirect variant — content area link -->
  <div>
    <p>Tests added</p>
    <button type="button" aria-label="69 tests added — tap to view">
      69 <span aria-hidden="true">↑</span>
    </button>
  </div>
  <button type="button">Book now</button>

  <!-- Textual redirect variant -->
  <div>
    <p>₹69,420</p>
    <button type="button" aria-label="See bill summary">See bill summary</button>
  </div>
  <button type="button">Proceed</button>
</footer>
```

### Keyboard Support

| Key | Action |
|---|---|
| `Tab` | Move focus between interactive elements in the bar |
| `Enter` or `Space` | Activate focused button or link |

### Touch Targets

- **Primary button (one-button, two-button)**: 44px height ✅ (py-12 × 2 + lh-20 = 44px)
- **Ghost link (two-button-vertical)**: no minimum height enforced — consuming layout must ensure 44px tap area
- **Redirect link**: 16px text — below 44px; consuming layout must extend tap area to 44px
- **Compact primary CTA (redirect variants)**: py-12 × 2 + lh-20 = 44px ✅

---

## Usage Guidelines

### Do's

✅ **Do this:**
- Keep the primary CTA label short (1–3 words) and action-oriented: "Proceed", "Book now", "Add to cart"
- Use `two-button` when there is a genuine secondary path (e.g. "Cancel" vs "Confirm") — do not add a secondary button just for visual balance
- Add `safe-area-inset-bottom` padding to the container on iOS to avoid overlap with the home indicator
- In redirect variants, ensure the content area value updates in real time as the user modifies the cart/selection

### Don'ts

❌ **Don't do this:**
- Do not put more than two buttons in a single ActionBar — use a different layout pattern
- Do not use the `payment.checkout` variant — it is marked NOT IN USE in Figma
- Do not place non-button interactive elements (e.g. dropdowns, stepper inputs) in the ActionBar — use a sheet or panel instead
- Do not use ActionBar inside a modal or bottom sheet — modals have their own footer patterns

---

## Implementation Notes

**No border/shadow on container:**
Figma defines no `border-top` or `box-shadow` on the ActionBar container. In implementation, the consuming layout or design system theme should decide whether to add a top separator (e.g. `border-top: 1px solid token.color.border.subtle`) to lift the bar above scrolled content. This is not part of the component itself.

**`min_width: 104px` on compact CTA:**
The compact primary button in `one-button-overlay-redirect` and `one-button-textual-redirect` has a raw `min-width: 104px`. No layout token covers this — implement as hardcoded CSS.

**Ghost link in `two-button-vertical`:**
The lower link uses no background and no border. It is not a ghost variant of Button in the traditional sense — it has zero frame styling and only inherits the label token. It renders purely as bold coral text. Implement as `<button type="button">` with no background, or `<a>` if it navigates.

**Subtext inside button (`one-button-subtext`):**
The subtext is a second `<p>` inside the `<button>` element, separated by `gap: token.space.2`. Screen readers will read both lines as part of the button label — ensure the combined text makes sense as an accessible label.

**Currency formatting in redirect variants:**
The price "₹69,420" uses a rupee symbol. Ensure the currency symbol is rendered as a character (not an icon) for screen reader compatibility.
