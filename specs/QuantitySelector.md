# Quantity Selector — Spec

> **Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Dopamine_2.0_Components?node-id=2009-1697
> **Component family:** Overlays / Selectors
> **Status:** Draft

---

## Prompt Match

```yaml
prompts:
  - "quantity selector"
  - "select quantity"
  - "quantity picker"
  - "option selector"
  - "generic selector"
  - "list picker"
  - "scrollable picker"
```

---

## Description

Quantity Selector is a modal overlay containing a scrollable list of options with a single-selection radio pattern. Two sub-types exist: the **default / quantity** type which presents numerical quantities (1, 2, 3…), and the **generic** type which presents labelled options ("Option 1", "Option 2"…).

The default type includes a "Remove" footer action visible when an item is already selected (e.g. the user has an existing quantity in cart and wants to remove it). The generic type omits the Remove footer.

### When to use

- Let the user select a single value from a short ordered list (typical range: 1–10 items)
- Quantity selection on a product detail page
- Option selection in any context where a full-page screen would be excessive

### When NOT to use

- Do not use for binary choices — use a toggle or two-button dialog
- Do not use for more than ~10 options without infinite scroll support

---

## Anatomy

```
                              [✕]   ← close button (outside card, 40×40)
┌───────────────────────────────┐
│    Select your desired qty    │ ← heading (16px ExtraBold, py-24)
│ ──────────────────────────── │ ← 1px border.subtle divider
│ 1                          ◉ │ ← selected row (sunrise-glow.95 bg, brand.1mg radio)
│ 2                          ○ │ ← unselected row (white bg, high-contrast border)
│ 3                          ○ │
│ 4                          ○ │  ←── scrollable area (h-308px, 6 rows shown)
│ 5                          ○ │     vertical scrollbar: 4×120px, content.primary
│ 6                          ○ │
│ ──────────────────────────── │ ← bottom divider (default type only)
│ 🗑  Remove                   │ ← remove footer (default type only, TOKEN MISSING)
└───────────────────────────────┘
  328px wide
```

---

## Variants

### quantity-selector.default

```yaml
quantity-selector.default:
  description: Numerical quantity list (1, 2, 3…). Includes Remove footer when a quantity is pre-selected.
  heading_text: "Select your desired quantity"
  row_labels: integers (1, 2, 3 …)
  row_height: 56px        # raw
  row_padding: "px-24 py-16"  # token.space.24 + token.space.16
  card_height: 450px      # raw — includes remove footer
  scrollable_rows_height: 308px   # raw
  remove_footer: true     # shown when a selection exists
```

### quantity-selector.generic

```yaml
quantity-selector.generic:
  description: >
    Generic labelled option list ("Option 1", "Option 2"…).
    No Remove footer. Shorter card height.
  heading_text: "Heading"     # caller-defined
  row_labels: strings ("Option 1", "Option 2" …)
  row_height: 56px
  row_padding: "px-24 py-16"
  card_height: 313px      # raw — no remove footer
  scrollable_rows_height: 308px   # same scrollable area height
  remove_footer: false
```

---

## Tokens

```yaml
quantity-selector:
  overlay:
    bg: black (#000000)
    opacity: 0.8

  close_button:
    size: 40px × 40px         # raw
    bg: token.color.background.primary   # white
    radius: token.radius.full
    shadow: token.shadow.1
    icon_size: 20px × 20px    # raw

  card:
    bg: token.color.background.primary   # #FFFFFF
    width: 328px              # raw
    radius: token.radius.16   # 16px — all corners

  heading:
    color: token.color.content.primary   # #181A1F
    size: token.font.size.title-16       # 16px
    weight: token.font.weight.extrabold  # 800
    line_height: token.font.line-height.24  # 24px
    padding: "py-24"         # token.space.24 top and bottom

  divider:
    height: 1px
    color: token.color.border.subtle     # #DDE2EB

  row:
    height: 56px              # raw
    padding: "px-24 py-16"    # token.space.24 + token.space.16
    bg_unselected: token.color.background.primary  # white
    bg_selected: token.color.primitive.sunrise-glow.95  # see Notes
    text_color: token.color.content.primary   # #181A1F
    text_size: token.font.size.body-16   # 16px (body-16 value from body-16 token)
    text_weight: token.font.weight.regular  # 400
    text_line_height: token.font.line-height.24  # 24px

  radio:
    size: 24px × 24px         # raw
    radius: token.radius.full  # full circle (cr-l-12 in Figma = 12px on 24px = circle)
    unselected:
      border: 1px solid token.color.border.high-contrast  # #868E9E
      bg: token.color.background.primary   # white inner fill (22×22 inner circle)
    selected:
      bg: token.color.brand.1mg            # #FF5443
      icon: white checkmark (20×20px)
      icon_color: token.color.content.inverse  # #FFFFFF

  scrollbar:
    width: 4px               # raw
    height: 120px            # raw — visible window size
    color: token.color.content.primary  # #181A1F
    radius: token.radius.4   # 4px
    position: "right: 8px; top: 8px"   # raw offsets

  remove_footer:
    bg: token.color.background.primary   # white
    padding: "py-24"         # token.space.24
    gap: token.space.4       # 4px — icon to text
    icon_size: 20px × 20px   # raw — trash/bin icon
    text_color: TOKEN MISSING  # Figma: --colours/red/10 (#C50F1F) — not in tokens.json
    text_closest_token: token.color.state.error  # #A3111E — closest available
    text_size: token.font.size.body-14   # 14px
    text_weight: token.font.weight.bold  # 700
```

---

## Layout

```yaml
outer_container:
  width: 360px, height: 640px
  position: relative

modal_inner:
  position: absolute, centered (translate -50% -50%, left 50%, top 50%)
  display: flex, flex_direction: column, align_items: flex-end
  gap: token.space.16   # 16px between close button and card

card:
  display: flex, flex_direction: column
  overflow: hidden      # clips scrollable area

scrollable_area:
  overflow-y: auto
  height: 308px         # raw — visible rows window
  position: relative    # for scrollbar absolute positioning
```

---

## States

```yaml
close_button:
  focus:
    ring: token.color.content.primary
    ring_width: 2px
    ring_offset: 2px

row:
  hover: { cursor: pointer }

remove_footer:
  focus:
    ring: token.color.state.error   # or TOKEN MISSING red
    ring_width: 2px
    ring_offset: 2px
  disabled:
    opacity: 0.4
    pointer_events: none
```

---

## Accessibility

```html
<div role="dialog" aria-modal="true" aria-labelledby="qty-heading">
  <button aria-label="Close"><!-- × icon --></button>
  <div class="qty-card">
    <h2 id="qty-heading">Select your desired quantity</h2>
    <hr aria-hidden="true" />
    <ul role="listbox" aria-label="Quantity options">
      <li role="option" aria-selected="true" tabindex="0">1</li>
      <li role="option" aria-selected="false" tabindex="-1">2</li>
      <!-- … -->
    </ul>
    <hr aria-hidden="true" />
    <button class="remove-btn">Remove</button>
  </div>
</div>
```

- The list uses `role="listbox"` with `role="option"` rows and `aria-selected`
- `aria-modal="true"` traps focus within the overlay
- Remove button needs a descriptive context label (e.g. `aria-label="Remove item from cart"`)

---

## Implementation Notes

**`sunrise-glow.95` token discrepancy.** Figma variable `--colours/sunrise-glow/95` resolves to `#FFEDE6`. `tokens.json` defines `sunrise-glow.95` as `#FDD7C8`. These are different values. Use the tokens.json value as authoritative until Figma/tokens are reconciled. Reference as `token.color.primitive.sunrise-glow.95` (#FDD7C8).

**"Remove" text colour is TOKEN MISSING.** Figma uses `--colours/red/10` (#C50F1F). The `vital-red` palette in tokens.json does not contain this value. Closest available: `token.color.state.error` (#A3111E). Flagged for DS team resolution.

**Scrollbar is custom, not native.** Use a custom scrollbar element: `position: absolute; right: 8px; top: 8px; width: 4px; height: 120px; background: content.primary; border-radius: 4px`. Hide the browser's native scrollbar with `scrollbar-width: none`.

**Radio button inner fill.** The unselected radio renders a 22×22px white inner circle inside the 24×24px container with a `border.high-contrast` ring, creating the appearance of a 1px border without using `border`.
