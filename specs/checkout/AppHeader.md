# AppHeader — Spec

> **Figma source:** https://www.figma.com/design/T96zjkCns9zCJ2oHYTPe7I/Diagnostics-Ideal-checkout — Cart screen Header (node 8553:43638)
> **Component family:** Navigation / App Shell
> **Status:** Draft — checkout-specific observation; not yet in Dopamine_2.0_Components library

---

## Prompt Match

```yaml
prompts:
  - "app header"
  - "top app bar"
  - "navigation bar"
  - "nav bar"
  - "topbar"
  - "header"
  - "page header"
  - "back header"
```

---

## Description

AppHeader is the top navigation bar of a full-page screen. It provides a back navigation control on the left, a page title in the center, and an optional trailing action (search, filter, or menu) on the right. The Cart screen uses: ← back | "Cart" | 🔍 search.

This is distinct from the BottomSheet header, which is a panel-level header with back/close chrome positioned outside the panel.

### When to use

- Full-screen pages that require a title and back navigation (Cart, addresses, catalogue pages)

### When NOT to use

- BottomSheet headers → use BottomSheet's built-in header variants
- Screens with a prominent hero/image header — use a transparent or overlay header instead

---

## Anatomy

```
┌────────────────────────────────────────────────────────┐
│ [←]                  Cart                        [🔍] │
└────────────────────────────────────────────────────────┘
  48dp high
  1px bottom border

  ←: IconButton.nav, left: 16px
  Title: centered (or left-aligned depending on layout)
  🔍: IconButton.nav, right: 16px
```

---

## Variants

### app-header.back-title-action

```yaml
app-header.back-title-action:
  description: Back arrow + center title + trailing icon action (default checkout layout).
  back: visible
  title: visible
  trailing_action: visible (icon)
```

### app-header.back-title

```yaml
app-header.back-title:
  description: Back arrow + center title, no trailing action.
  back: visible
  title: visible
  trailing_action: absent
```

### app-header.title-only

```yaml
app-header.title-only:
  description: Centred title with no navigation controls. Used on root screens.
  back: absent
  title: visible
  trailing_action: absent
```

---

## Tokens

```yaml
app-header:
  container:
    bg: token.color.background.primary       # #FFFFFF
    height: 48px                             # raw
    width: fill
    padding_horizontal: token.space.16       # 16px (icon inset)
    display: flex
    flex_direction: row
    align_items: center

  divider:
    height: 1px                              # raw
    color: token.color.border.subtle         # #DDE2EB
    position: bottom edge of container

  back_button:
    icon: chevron-left / arrow-back
    icon_size: 24px × 24px                   # raw
    hit_area: 44px × 44px                    # raw — centered on icon
    color: token.color.content.primary       # #181A1F

  title:
    color: token.color.content.primary       # #181A1F
    font_family: token.font.family.sans
    font_size: token.font.size.title-16      # 16px (may be 18px — needs Figma confirmation)
    font_weight: token.font.weight.extrabold  # 800
    line_height: token.font.line-height.24   # 24px
    flex: 1
    text_align: center                        # centered between back and action icons

  trailing_action:
    icon: search (or any action icon)
    icon_size: 24px × 24px                   # raw
    hit_area: 44px × 44px
    color: token.color.content.primary       # #181A1F
```

---

## States

```yaml
back_button:
  focus:
    ring: token.color.content.primary
    ring_width: 2px
    ring_offset: 2px

trailing_action:
  focus:
    ring: token.color.content.primary
    ring_width: 2px
    ring_offset: 2px
```

---

## Accessibility

```html
<header class="app-header">
  <button class="back-btn" aria-label="Go back">
    <!-- ← icon, aria-hidden -->
  </button>
  <h1 class="header-title">Cart</h1>
  <button class="search-btn" aria-label="Search">
    <!-- 🔍 icon, aria-hidden -->
  </button>
</header>
```

- Page title wrapped in `<h1>` — sets document landmark and heading structure
- Back and trailing action buttons carry descriptive `aria-label`
- 44dp hit areas on both icon buttons meet WCAG 2.5.5

---

## Implementation Notes

**Title font size TBD.** The Cart header screenshot shows "Cart" at approximately 16–18px ExtraBold. Needs Figma token confirmation — use `token.font.size.title-16` as the starting point.

**IconButton.nav dependency.** The back and trailing action buttons use `IconButton.nav`, the ghost/transparent nav variant identified as missing in the delta audit (`../../cache/_audit_checkout_deltas.md`). Until IconButton.nav is added to the IconButton spec, implement the icon buttons inline within AppHeader as 44×44dp transparent tap targets.

**Content below.** The page content should start below the 48px header + 1px divider = 49px total. Use `padding-top: 49px` or CSS sticky positioning for the header.
