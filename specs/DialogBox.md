# Dialog Box — Spec

> **Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Dopamine_2.0_Components?node-id=2023-2473
> **Component family:** Overlays / Modals
> **Status:** Draft

---

## Prompt Match

```yaml
prompts:
  - "dialog box"
  - "dialog"
  - "modal"
  - "alert dialog"
  - "confirmation dialog"
  - "prompt dialog"
  - "popup"
```

---

## Description

Dialog Box is a full-overlay modal used to present a short, focused message that requires user acknowledgement or action. It sits over a black semi-transparent overlay and contains an optional image/illustration, a heading, body text, and one or two call-to-action buttons. A close button floats above the card, outside the white panel.

### When to use

- Confirmation prompts ("Are you sure?")
- Contextual upsell or education overlays with a clear primary CTA
- Any interruptive message requiring an explicit user response before proceeding

### When NOT to use

- Do not use for long-form content — use a Bottom Sheet instead
- Do not use without at least one CTA button
- Do not nest dialogs

---

## Anatomy

```
┌─────────────────────────────────────┐
│ ██████████████ overlay (black 80%)  │
│                              [✕]    │  ← close button (outside card, 40×40px)
│         ┌─────────────────┐         │
│         │  [ 64×64 img ]  │         │  ← image slot (optional)
│         │    Heading      │         │  ← 16px ExtraBold, content.primary
│         │  Body copy...   │         │  ← 14px Regular, content.secondary
│         │ ─────────────── │         │  ← 1px border.subtle divider
│         │  [  Primary  ]  │         │  ← fill button, brand.1mg
│         │  Secondary action│        │  ← textual button, brand.1mg
│         └─────────────────┘         │
└─────────────────────────────────────┘
  360px viewport  |  328px card
```

---

## Variants

### dialog-box.image-two-button

```yaml
dialog-box.image-two-button:
  description: >
    Standard dialog with image slot, heading, body, and two actions
    (primary fill button + secondary textual button). Most common variant.
  image_slot: 64×64px     # raw — placeholder or product illustration
  button_group: [primary_fill, secondary_textual]
```

### dialog-box.image-one-button

```yaml
dialog-box.image-one-button:
  description: >
    Same as image-two-button but with only the primary fill button.
    Used when there is no meaningful secondary action.
  button_group: [primary_fill]
```

### dialog-box.text-only-one-button

```yaml
dialog-box.text-only-one-button:
  description: >
    No image slot. Heading + body + one primary button.
    Used for brief confirmations where visual reinforcement is unnecessary.
  image_slot: absent
  button_group: [primary_fill]
```

---

## Tokens

```yaml
dialog-box:
  overlay:
    bg: black (#000000)
    opacity: 0.8             # not a token — CSS opacity property

  close_button:
    size: 40px × 40px        # raw
    bg: token.color.background.primary   # white
    radius: token.radius.full            # full circle (40px div, r=20px)
    shadow: token.shadow.1               # 0 2px 4px 0 rgba(39,43,51,0.06)
    icon_size: 20px × 20px   # raw
    position: absolute, top-right of outer container, outside card
    gap_to_card: token.space.16          # 16px — flex gap between close btn and card

  card:
    bg: token.color.background.primary   # #FFFFFF
    radius: token.radius.16              # 16px — all 4 corners
    padding_vertical: token.space.24     # 24px — py
    width: 328px             # raw

  image_slot:
    size: 64px × 64px        # raw
    bg: #d9d9d9              # placeholder gray — no token (design asset slot)
    radius: token.radius.8   # 8px

  content:
    gap_image_to_text: token.space.24    # 24px
    gap_heading_to_body: token.space.4   # 4px

  heading:
    color: token.color.content.primary   # #181A1F
    size: token.font.size.title-16       # 16px
    weight: token.font.weight.extrabold  # 800
    line_height: token.font.line-height.24  # 24px
    width: 280px             # raw — inner content width

  body:
    color: token.color.content.secondary  # #414752
    size: token.font.size.body-14         # 14px
    weight: token.font.weight.regular     # 400
    line_height: token.font.line-height.20  # 20px
    width: 280px             # raw

  divider:
    height: 1px              # raw
    color: token.color.border.subtle   # #DDE2EB

  button_group:
    width: 280px             # raw
    gap: token.space.16      # 16px

  primary_button:
    bg: token.color.brand.1mg         # #FF5443
    text: token.color.content.inverse # #FFFFFF
    size: token.font.size.body-14     # 14px
    weight: token.font.weight.bold    # 700
    padding: "token.space.16 × token.space.12"  # px-16 py-12
    radius: token.radius.8            # 8px
    width: full (280px)

  secondary_button:
    bg: transparent
    text: token.color.brand.1mg       # #FF5443
    size: token.font.size.body-14     # 14px
    weight: token.font.weight.bold    # 700
    radius: token.radius.8            # 8px (for focus ring)
    width: full (280px)
```

---

## Layout

```yaml
outer_container:
  width: 360px    # raw — full viewport width
  height: 640px   # raw — full viewport height
  position: relative

overlay:
  position: absolute
  inset: 0

modal_inner:
  position: absolute
  center: translate(-50%, -50%) left-50% top-50%
  display: flex
  flex_direction: column
  align_items: flex-end    # close button aligns right
  gap: token.space.16      # 16px — between close btn and card

card:
  display: flex
  flex_direction: column
  align_items: center
  gap: token.space.24      # 24px — between image-section and divider+buttons
```

---

## States

```yaml
close_button:
  hover: { cursor: pointer }
  focus:
    ring: token.color.content.primary
    ring_width: 2px
    ring_offset: 2px

primary_button:
  hover: { opacity: 0.9 }
  focus:
    ring: token.color.content.primary
    ring_width: 2px
    ring_offset: 2px

secondary_button:
  hover: { opacity: 0.8 }
  focus:
    ring: token.color.brand.1mg
    ring_width: 2px
    ring_offset: 2px
```

---

## Accessibility

```html
<div role="dialog" aria-modal="true" aria-labelledby="dialog-heading">
  <button aria-label="Close dialog" class="close-btn"><!-- × icon --></button>
  <div class="dialog-card">
    <!-- optional image -->
    <img src="..." alt="Illustration description" />
    <h2 id="dialog-heading">Heading</h2>
    <p>Body copy…</p>
    <hr aria-hidden="true" />
    <button>Primary action</button>
    <button>Secondary action</button>
  </div>
</div>
```

- `role="dialog"` + `aria-modal="true"` on the outermost overlay container
- `aria-labelledby` points to the heading element
- On open: move focus to the first interactive element (close button or primary CTA)
- On close: return focus to the element that triggered the dialog
- Trap focus within dialog while open

---

## Implementation Notes

**Close button is outside the card.** It sits in the same flex container as the card, above and right-aligned (`align-items: flex-end`). The 16px gap between the close button and the card top edge comes from `gap: 16px` on the flex column.

**Image slot is a placeholder.** The 64×64px gray area in Figma is a design placeholder — replace with actual illustration or product image at runtime.

**Button widths.** Both primary and secondary buttons are `width: 280px` (full card inner width). They're stacked vertically in a flex-col button group.
