# Bottom Sheet — Spec

> **Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Dopamine_2.0_Components?node-id=1974-2940
> **Component family:** Overlays / Sheets
> **Status:** Draft

---

## Prompt Match

```yaml
prompts:
  - "bottom sheet"
  - "bottom drawer"
  - "action sheet"
  - "slide up panel"
  - "sheet modal"
  - "bottom panel"
```

---

## Description

Bottom Sheet is an anchored overlay panel that slides up from the bottom of the viewport. It is the standard container for contextual flows that require more space than a Dialog Box but should not navigate the user away from the current screen.

Four variants cover the range of header treatments: a bare sheet for fully custom content, a titled sheet, and two back-navigation patterns.

### When to use

- Contextual sub-flows (filter, sort, address selection, sample selection)
- Multi-step flows initiated from a product page (quantity selector, pack selection)
- Any bottom-anchored panel containing scrollable content

### When NOT to use

- Do not use for full-page content that belongs in a dedicated screen
- Do not use when a Dialog Box (small confirmation) would suffice

---

## Anatomy

```
                [←]       [✕]  ← back button (left) + close button (right)
                               both are 40×40 white circles, floating above panel
┌──────────────────────────────┐ ← rounded top corners (radius.16)
│ Title text                   │ ← header: pt-16 px-16
│ Subtitle (secondary line)    │ ← only in With Secondary Line variant
│ ────────────────────────────│ ← 1px border.subtle divider
│                              │
│        [content area]        │
│                              │
└──────────────────────────────┘
  360px wide × 568px tall (fixed height)
```

---

## Variants

### bottom-sheet.default

```yaml
bottom-sheet.default:
  description: Bare sheet with no header — close button only. Content area is empty and fully custom.
  header: absent
  close_button: true
  back_button: false
```

### bottom-sheet.with-heading-header

```yaml
bottom-sheet.with-heading-header:
  description: Sheet with a titled header section. No navigation. Close button only.
  header:
    title: visible (16px ExtraBold, content.primary)
    subtitle: absent
    divider: visible (1px, border.subtle)
    padding: "pt-16 px-16"
  close_button: true
  back_button: false
```

### bottom-sheet.with-heading-header-and-back

```yaml
bottom-sheet.with-heading-header-and-back:
  description: >
    Sheet with titled header and both back + close navigation buttons.
    Used in multi-step flows where the user can return to a previous state.
  header:
    title: visible
    subtitle: absent
    divider: visible
    padding: "pt-16 px-16"
  close_button: true     # right side, left: 304px
  back_button: true      # left side, left: 16px
```

### bottom-sheet.with-secondary-line

```yaml
bottom-sheet.with-secondary-line:
  description: >
    Header with title + subtitle. Both back and close buttons visible.
    Used when the sheet context needs a brief sub-description below the title.
  header:
    title: visible (16px ExtraBold, content.primary)
    subtitle: visible (14px Regular, cool-neutral.50 — see Notes)
    divider: visible
    padding: "pt-16 px-16"
  close_button: true
  back_button: true
```

---

## Tokens

```yaml
bottom-sheet:
  overlay:
    bg: black (#000000)
    opacity: 0.8              # CSS property

  panel:
    bg: token.color.background.primary   # #FFFFFF
    width: 360px              # raw — full viewport width
    height: 568px             # raw — fixed panel height
    border_radius:
      top_left: token.radius.16   # 16px
      top_right: token.radius.16  # 16px
      bottom: 0               # flat — anchored to bottom edge
    position: anchored to viewport bottom

  header:
    bg: token.color.background.primary   # #FFFFFF
    padding_top: token.space.16          # 16px
    padding_horizontal: token.space.16   # 16px
    gap: token.space.16                  # 16px — gap between header sections

  title:
    color: token.color.content.primary   # #181A1F
    size: token.font.size.title-16       # 16px
    weight: token.font.weight.extrabold  # 800
    line_height: token.font.line-height.24  # 24px

  subtitle:
    color: token.color.primitive.cool-neutral.50  # #626A7A — see Notes
    size: token.font.size.body-14        # 14px
    weight: token.font.weight.regular    # 400
    line_height: token.font.line-height.20  # 20px

  divider:
    height: 1px               # raw
    color: token.color.border.subtle   # #DDE2EB

  close_button:
    size: 40px × 40px         # raw
    bg: token.color.background.primary   # white
    radius: token.radius.full            # 9999px — full circle
    shadow: token.shadow.1               # 0 2px 4px 0 rgba(39,43,51,0.06)
    icon_size: 20px × 20px    # raw — × icon (close)
    position: absolute, left: 304px, top: -56px   # raw values — above panel, right side

  back_button:
    size: 40px × 40px         # raw
    bg: token.color.background.primary   # white
    radius: token.radius.full            # 9999px — full circle
    shadow: token.shadow.1
    icon_size: 20px × 20px    # raw — ← arrow icon (back/chevron-left)
    position: absolute, left: 16px, top: -56px    # above panel, left side
```

---

## Layout

```yaml
outer_container:
  width: 360px, height: 640px   # raw
  position: relative

overlay:
  position: absolute, inset: 0

bottom_anchor_container:
  position: absolute, bottom: 0, left: 50%, transform: translateX(-50%)
  width: 360px
  display: flex
  flex_direction: column
  align_items: center
  justify_content: flex-end

panel:
  position: relative          # establishes context for button absolute positioning
  width: 100%
  height: 568px
```

---

## States

```yaml
close_button:
  focus:
    ring: token.color.content.primary
    ring_width: 2px
    ring_offset: 2px

back_button:
  focus:
    ring: token.color.content.primary
    ring_width: 2px
    ring_offset: 2px
```

---

## Accessibility

```html
<div role="dialog" aria-modal="true" aria-labelledby="sheet-title">
  <div class="overlay" aria-hidden="true"></div>
  <div class="sheet-panel">
    <button aria-label="Go back" class="back-btn"><!-- ← icon --></button>
    <button aria-label="Close" class="close-btn"><!-- × icon --></button>
    <header class="sheet-header">
      <h2 id="sheet-title">Samples required</h2>
      <p class="sheet-subtitle">Subtitle text…</p>  <!-- with-secondary-line only -->
    </header>
    <hr aria-hidden="true" />
    <div class="sheet-content">
      <!-- scrollable slot content -->
    </div>
  </div>
</div>
```

- `role="dialog"` + `aria-modal="true"` on the root panel
- `aria-labelledby` references the title element
- Close and back buttons carry descriptive `aria-label`s
- Focus trap applies within the sheet while open
- On close: return focus to the triggering element

---

## Implementation Notes

**Button positions are absolute, outside the panel.** Both close and back buttons are positioned `top: -56px` relative to the panel container. This places them above the rounded panel edge, visually floating over the overlay area.

**Close button is always right-aligned.** `left: 304px` on a 360px container = `right: 16px`. Use `right: 16px` in implementation for robustness over screen widths.

**Back button is always left-aligned.** `left: 16px`.

**`cool-neutral.50` for subtitle.** The Figma variable `--color/content/tertiary` resolves to `#626A7A` (cool-neutral.50) in the With Secondary Line variant. This is distinct from `token.color.content.tertiary` (#868E9E = cool-neutral.60) in tokens.json. Pending DS resolution — use `token.color.primitive.cool-neutral.50` until a semantic token is added.

**Panel height is fixed at 568px.** Internal content should use `overflow-y: auto` to scroll within the panel if content exceeds the available space below the header.
