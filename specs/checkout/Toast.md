# Toast

**Source:** Diagnostics Ideal Checkout — "Toast" 360×800 Figma frame (top-of-screen notification)
**Status:** New component

---

## Overview

A transient notification banner that slides in from the top of the screen. Communicates non-blocking feedback (success, error, info) about a recent action. Auto-dismisses after a timeout or can be manually dismissed.

---

## Variant Properties

| Property | Values |
|----------|--------|
| `variant` | `success`, `error`, `info` |
| `dismissible` | `true`, `false` |

---

## Anatomy

```
┌─────────────────────────────────────────────────┐
│  [✓]  Patient added successfully          [✕]  │
└─────────────────────────────────────────────────┘
```

- **Leading icon** — status icon (checkmark/warning/info), 20×20px
- **Message text** — single-line notification message
- **Dismiss button** — optional 24×24 close icon (right)

---

## Dimensions

| Property | Value | Token |
|----------|-------|-------|
| Width | 100% viewport | — |
| Min height | 48px | — (raw) |
| Horizontal padding | 16px | `token.space.16` |
| Vertical padding | 14px | — (raw, to achieve 48px with 20px line-height) |
| Gap: icon to text | 8px | `token.space.8` |
| Gap: text to dismiss | 8px | `token.space.8` |
| Position | `position: fixed; top: 0; left: 0; right: 0` | — |
| Z-index | above all page content and sheets | — |

---

## Variants

### `success`

| Element | Token | Value |
|---------|-------|-------|
| Background | `token.color.primitive.wellness-green.30` | #156437 |
| Text + icon | `token.color.background.primary` | #FFFFFF |
| Dismiss icon | `token.color.background.primary` | #FFFFFF |

### `error`

| Element | Token | Value |
|---------|-------|-------|
| Background | `token.color.state.error` | — (confirm from token scale) |
| Text + icon | `token.color.background.primary` | #FFFFFF |

### `info`

| Element | Token | Value |
|---------|-------|-------|
| Background | `token.color.content.primary` | #181A1F |
| Text + icon | `token.color.background.primary` | #FFFFFF |

---

## Typography

| Element | Token | Value |
|---------|-------|-------|
| Message font-size | `token.font.size.body-14` | 14px |
| Message font-weight | `token.font.weight.regular` | 400 |
| Message line-height | `token.font.line-height.20` | 20px |
| Font family | `token.font.family.sans` | 'Figtree', system-ui, sans-serif |

---

## Animation

- **Enter:** slide down from `translateY(-100%)` to `translateY(0)`, `200ms ease-out`
- **Exit:** slide up from `translateY(0)` to `translateY(-100%)`, `200ms ease-in`
- Auto-dismiss timeout: 4000ms (default)

---

## Accessibility

- Root: `role="alert"` (for `error`/`success`) or `role="status"` (for `info`)
- `aria-live="assertive"` for `error`; `aria-live="polite"` for `success`/`info`
- Dismiss button: `aria-label="Dismiss notification"`
- Focus management: focus does not move to toast (non-blocking notification)
