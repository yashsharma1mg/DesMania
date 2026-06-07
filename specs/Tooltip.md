# Tooltip — Spec

> **Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Dopamine_2.0_Components?node-id=2015-3506
> **Component family:** Feedback / Tooltips
> **Status:** Draft

---

## Prompt Match

```yaml
prompts:
  - "tooltip"
  - "info tip"
  - "helper tip"
  - "contextual hint"
  - "delivery tooltip"
  - "map tooltip"
```

---

## Description

Tooltip is a short, dismissible label providing contextual information about a nearby UI element. It consists of a dark pill body with white text and an optional close icon, plus a 15×15px rotated-square caret that points toward the target. Four positional variants control which corner the caret appears at.

### When to use

- To provide a brief in-context hint (e.g. "Your order will be delivered here" on a map pin)
- When a non-blocking label aids comprehension without requiring a modal

### When NOT to use

- Do not use for critical errors — use an inline error or alert component
- Do not use for content longer than ~2 short lines
- Do not stack multiple tooltips simultaneously in the same view

---

## Anatomy

```
Top-left variant:
               [ caret ▲ ] ← above body, right-aligned
[ text label  ✕ ]          ← pill body (dark, p-8, rounded-8)

Bottom-left variant:
[ text label  ✕ ]
               [ caret ▼ ] ← below body, right-aligned
```

- **Body pill**: `content.primary` bg, `space.8` padding, `radius.8` corners, `max-width: 240px`
- **Caret**: 15×15px div, `rotate-45`, two-corner `radius.4` (top-right + bottom-left), same dark bg. Overlaps body by `space.12` via negative margin.
- **Text**: `tag-11` (11px), `font.weight.medium`, `font.family.sans`, `content.inverse`, `line-height.16`
- **Close icon**: 12×12px × icon, white fill — rendered when `closeIcon = true`

---

## Variants

| `variant` | Tooltip body position | Caret direction | Caret side |
|-----------|-----------------------|-----------------|------------|
| `top-left` | bottom-left of target | ▲ up | right side of caret container |
| `top-right` | bottom-right of target | ▲ up | left side of caret container |
| `bottom-left` | top-left of target | ▼ down | right side of caret container |
| `bottom-right` | top-right of target | ▼ down | left side of caret container |

```yaml
tooltip:
  element: div (outer container = flex-col)
  max_width: 240px         # raw — applied to body pill
  tokens:
    body_bg: token.color.content.primary      # #181A1F
    body_text: token.color.content.inverse    # #FFFFFF
    caret_bg: token.color.content.primary     # #181A1F — matches body
    body_padding: token.space.8               # 8px all sides
    body_radius: token.radius.8               # 8px
    caret_corner_radius: token.radius.4       # 4px — tr + bl corners only
    caret_overlap: token.space.12             # 12px — as negative margin
  caret:
    size: 15px × 15px      # raw
    transform: "rotate(45deg)"       # for all variants
    y_flip: "-scale-y-100"           # top variants only — flips to ▲
    rounded_corners: "border-top-right-radius: 4px; border-bottom-left-radius: 4px"
  typography:
    family: token.font.family.sans       # Figtree
    size: token.font.size.tag-11         # 11px
    weight: token.font.weight.medium     # 500
    line_height: token.font.line-height.16  # 16px
  close_icon:
    size: 12px × 12px    # raw
    color: token.color.content.inverse   # white
```

---

## Layout

```yaml
container:
  display: flex
  flex_direction: column
  top-left:  { align_items: flex-start }
  top-right: { align_items: flex-end }
  bottom-left:  { align_items: flex-start, justify_content: flex-end }
  bottom-right: { align_items: flex-end,   justify_content: flex-end }

element_order:
  top variants:    [caret_container, body]  # caret above, mb-[-12px] on caret
  bottom variants: [body, caret_container]  # caret below, mb-[-12px] on body

caret_container:
  height: 20px
  width: 41px   # raw — room for caret + positioning
  position: relative
  caret_within:
    top-left:   { right: 0, top: -1.33px }  # caret flush to container right
    top-right:  { left: 0, top: -1.61px }   # caret flush to container left
    bottom-left: { right: -0.1px, top: 0.28px }
    bottom-right: { left: 0, top: 0.28px }
```

---

## States

```yaml
# No interactive states — tooltip is shown/hidden by the parent, not internally stateful.
# Close icon is a button but the tooltip itself carries no focus/disabled states.
```

---

## Accessibility

```html
<div role="tooltip" id="tooltip-delivery">
  Your order will be delivered here
  <button aria-label="Close tooltip"><!-- × icon --></button>
</div>

<!-- The element that spawns the tooltip -->
<button aria-describedby="tooltip-delivery">
  📍 Delivery address
</button>
```

- Tooltip element takes `role="tooltip"` and an `id`
- The triggering element uses `aria-describedby` pointing to the tooltip's `id`
- Close button gets an explicit `aria-label`
- On dismiss, focus should return to the triggering element

---

## Implementation Notes

**Caret construction.** A single `div` with `transform: rotate(45deg)` creates a diamond. `-scale-y-100` flips it to ▲ for top variants. Two adjacent corners (`border-top-right-radius: 4px; border-bottom-left-radius: 4px`) shave the diamond into an arrow shape.

**Overlap.** Negative margin fuses caret to pill: `margin-bottom: -12px` on the caret container for top variants; on the body for bottom variants.

**Max-width.** Apply `max-width: 240px` to the body pill only. The 41px caret container is not width-constrained.
