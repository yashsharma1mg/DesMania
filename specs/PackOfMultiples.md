# Pack of Multiples — Spec

> **Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Dopamine_2.0_Components?node-id=2013-3339
> **Component family:** Overlays / Selectors
> **Status:** Draft

---

## Prompt Match

```yaml
prompts:
  - "pack of multiples"
  - "pack selector"
  - "multi-pack"
  - "bundle selector"
  - "quantity pack"
  - "select quantity pack"
```

---

## Description

Pack of Multiples is a modal overlay for selecting a product pack size (e.g. "1 unit", "2 units", "3 units"). Each row shows a product image chip with quantity label, pricing information (strikethrough MRP + discounted price + discount badge), and a radio button.

Two modes:

- **Default**: plain rows; selected row has a light orange (`sunrise-glow.95`) background.
- **Highlighted text**: a "Recommended" pack row shows a green gradient background and "10% extra discount" label. Intended to nudge the user toward the best-value option.

Both modes support selected and unselected states. When a row is selected, a "Remove" footer action appears at the bottom of the card.

### When to use

- Product detail pages where the user can choose between unit packs (1× / 2× / 3× etc.)
- Any multi-option selection where pricing and visual differentiation of a recommended option matters

### When NOT to use

- Do not use for simple quantity (integer) selection — use Quantity Selector instead
- Do not use for more than ~6 pack options without pagination

---

## Anatomy

```
                              [✕]   ← close button (outside card, 40×40)
┌───────────────────────────────┐
│       Select Quantity          │ ← heading (16px ExtraBold, py-24)
│ ──────────────────────────── │ ← border.subtle divider
│ [img]x1  ₹440 ₹186 55%off ○ │ ← default unselected row (white bg)
│ [img]x2  ₹440 ₹186 55%off ○ │
│ [Recommended banner]          │
│ [img]x3  ₹660 ₹297 60%off ○ │ ← recommended unselected row (green gradient)
│          10% extra discount ↗ │
│ [img]x4  ₹440 ₹186 55%off ○ │
│ [img]x5  ₹440 ₹186 55%off ○ │ ←── scrollable area
│ ──────────────────────────── │ ← bottom divider (visible when row is selected)
│ 🗑  Remove                   │ ← remove footer (selected states only)
└───────────────────────────────┘
  328px wide
```

---

## States

| State | Row BG | Radio | Remove footer |
|-------|--------|-------|---------------|
| `default-unselected` | white | empty circle | hidden |
| `default-selected` | `sunrise-glow.95` | filled `brand.1mg` + checkmark | visible |
| `highlighted-text-unselected` | white (plain) + recommended rows have green gradient | empty circle | hidden |
| `highlighted-text-selected` | `sunrise-glow.95` on selected; green gradient on recommended | filled `brand.1mg` | visible |

---

## Tokens

```yaml
pack-of-multiples:
  overlay:
    bg: black (#000000)
    opacity: 0.8

  close_button:
    size: 40px × 40px
    bg: token.color.background.primary
    radius: token.radius.full
    shadow: token.shadow.1
    icon_size: 20px × 20px

  card:
    bg: token.color.background.primary   # #FFFFFF
    width: 328px
    radius: token.radius.16
    overflow: hidden

  heading:
    text: "Select Quantity"
    color: token.color.content.primary   # #181A1F
    size: token.font.size.title-16       # 16px
    weight: token.font.weight.extrabold  # 800
    line_height: token.font.line-height.24
    padding: "px-16 py-24"              # token.space.16 + token.space.24

  divider:
    height: 1px
    color: token.color.border.subtle     # #DDE2EB

  row:
    height: 56px (default) | 80px (highlighted with extra-discount text)
    padding: "pl-16 pr-24 py-16"        # token.space.16 + token.space.24 + token.space.16
    separator:
      style: 1px dashed
      color: token.color.primitive.cool-neutral.95  # Figma: --colour-usage/outline/thick-divider (#F0F2F5) ≈ cool-neutral.95

    bg_default_unselected: token.color.background.primary   # white
    bg_default_selected: token.color.primitive.sunrise-glow.95   # see Notes (#FFEDE6 Figma / #FDD7C8 tokens)
    bg_recommended_unselected: "gradient: white → #EEFFF6 (left-to-right)"  # TOKEN MISSING — see Notes
    bg_recommended_selected: token.color.primitive.sunrise-glow.95   # same as default selected

  product_chip:
    bg: token.color.primitive.cool-neutral.95   # #EEF1F5 / Figma #F0F2F5
    bg_selected: token.color.primitive.cool-neutral.99   # #FBFCFD / Figma #FAFBFC
    radius: token.radius.4            # 4px
    gap: token.space.4                # 4px

    image_container:
      size: 32px × 32px              # raw
      bg: token.color.background.primary
      border: "1px solid token.color.border.subtle"  # #DDE2EB
      radius: 5.333px                # raw (derived from Figma — no token)
      padding: 2.667px               # raw

    quantity_label:
      color: token.color.content.primary   # #181A1F
      size: token.font.size.body-14        # 14px
      weight: token.font.weight.bold       # 700
      line_height: token.font.line-height.20

  price_group:
    strikethrough_price:
      color: token.color.content.tertiary  # #868E9E
      size: token.font.size.body-12        # 12px
      weight: token.font.weight.regular    # 400
      decoration: line-through

    sale_price:
      color: token.color.content.secondary # #414752
      size: token.font.size.body-12        # 12px
      weight: token.font.weight.bold       # 700

    discount_badge:
      bg: token.color.primitive.wellness-green.30   # #156437 — via --colour-usage/states/success
      text: token.color.content.inverse              # white
      size: token.font.size.body-12                  # 12px
      weight: token.font.weight.bold                 # 700
      padding: token.space.4                         # 4px
      radius: token.radius.4                         # 4px

    extra_discount_text:
      color: token.color.primitive.wellness-green.30   # #156437
      size: token.font.size.body-12                    # 12px
      weight: token.font.weight.bold                   # 700

  radio:
    size: 24px × 24px
    radius: token.radius.full           # full circle
    unselected:
      border: "1px solid token.color.border.high-contrast"  # #868E9E
      bg: token.color.background.primary
    selected:
      bg: token.color.brand.1mg         # #FF5443
      icon: white checkmark 20×20px
      icon_color: token.color.content.inverse

  recommended_banner:
    position: absolute, top: 0, left: 0
    padding: "py-2 pl-16 pr-10"
    bg: decorative gradient image asset (imgRectangle323153)
    radius_br: token.radius.4           # 4px — bottom-right corner only
    text:
      content: "Recommended"
      color: token.color.content.inverse  # white
      size: token.font.size.tag-11        # 11px
      weight: token.font.weight.bold      # 700

  scrollbar:
    width: 4px
    height: 120px
    color: token.color.content.primary  # #181A1F
    radius: token.radius.4
    position: "right: 8px; top: 8px"

  remove_footer:
    bg: token.color.background.primary
    padding: "py-24"
    gap: token.space.4
    icon_size: 20px × 20px
    text_color: TOKEN MISSING  # Figma: --colours/red/10 (#C50F1F)
    text_closest_token: token.color.state.error   # #A3111E
    text_size: token.font.size.body-14
    text_weight: token.font.weight.bold
```

---

## Layout

```yaml
outer_container:
  width: 360px, height: 640px
  position: relative

modal_inner:
  position: absolute, centered
  display: flex, flex_direction: column, align_items: flex-end
  gap: token.space.16

card_content:
  display: flex, flex_direction: column
  overflow: hidden

scrollable_rows:
  overflow-y: auto
  position: relative   # scrollbar absolute child
  height: 235px        # raw — selected states (with remove footer)

row_layout:
  display: flex
  align_items: center
  justify_content: space-between
  position: relative   # Recommended banner uses absolute positioning
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
    ring: token.color.state.error
    ring_width: 2px
    ring_offset: 2px
```

---

## Accessibility

```html
<div role="dialog" aria-modal="true" aria-labelledby="pack-heading">
  <button aria-label="Close"><!-- × icon --></button>
  <div class="pack-card">
    <h2 id="pack-heading">Select Quantity</h2>
    <hr aria-hidden="true" />
    <ul role="listbox" aria-label="Pack options">
      <li role="option" aria-selected="false">
        <!-- chip + price + radio -->
      </li>
      <li role="option" aria-selected="false" aria-description="Recommended pack">
        <!-- highlighted row -->
      </li>
    </ul>
    <hr aria-hidden="true" />
    <button aria-label="Remove pack from cart">Remove</button>
  </div>
</div>
```

---

## Implementation Notes

**`sunrise-glow.95` discrepancy.** Figma shows `#FFEDE6`; tokens.json defines `sunrise-glow.95` as `#FDD7C8`. Use tokens.json as authoritative. Both are warm peach tints; the visual difference is minimal. Flag for DS sync.

**Green gradient background is TOKEN MISSING.** The `highlighted-text` recommended rows use `background: linear-gradient(to left, white, #eefff6)`. The colour `#eefff6` (very light green) doesn't map to any token in tokens.json (closest: `wellness-green.99` = `#F8FFFB`, but not exact). Pending DS token addition — hardcode `#eefff6` for now.

**"Remove" text is TOKEN MISSING.** Same issue as Quantity Selector — `--colours/red/10` (#C50F1F) is not in tokens.json. Closest: `token.color.state.error` (#A3111E). Flagged for DS team.

**Recommended banner background is a design asset.** The green-to-pink gradient behind "Recommended" label is a rasterised/SVG image, not a CSS gradient. Treat as a UI asset (`imgRectangle323153`).

**Row chip `border-radius: 5.333px`.** This is a sub-pixel Figma value with no token equivalent. Hard-code as `border-radius: 5px` in implementation.

**"10% extra discount" arrow icon.** The small arrow chevron (`↗`) next to the extra discount text is a decorative SVG asset. Aria-hide it.
