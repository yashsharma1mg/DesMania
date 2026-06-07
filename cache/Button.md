# Button — Build Cache
**Built:** 2026-05-25
**Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Dopamine_2.0_Components?node-id=4021-1535

---

## Variant Properties

| Property | Values |
|----------|--------|
| `type`   | `fill`, `outline`, `ghost` |
| `intent` | `primary`, `secondary`, `inverse`, `disabled` |
| `style`  | `text-only`, `icon-leading`, `icon-trailing`, `underline` |
| `size`   | `large`, `medium` |

**Constraint:** `outline` only supports `primary` and `disabled` intents (Figma-defined). `underline` style only available on `ghost` type and does not support icon slots.

---

## Spec

`specs/Button.md`

---

## Token Police Audit

**✅ 0 violations — all 19 token references correctly resolved.**

### Resolved references (19)

| Token ID | Resolved value | Note |
|----------|---------------|------|
| `token.color.brand.1mg` | #FF5443 | |
| `token.color.primitive.cool-neutral.10` | #181A1F | Deliberate primitive exception — DS team approved |
| `token.color.background.primary` | #FFFFFF | |
| `token.color.background.moderate` | #DDE2EB | |
| `token.color.content.inverse` | #FFFFFF | |
| `token.color.content.primary` | #181A1F | |
| `token.color.content.disabled` | #868E9E | |
| `token.color.border.subtle` | #DDE2EB | |
| `token.color.border.high-contrast` | #868E9E | |
| `token.space.2` | 2px | Used in medium padding_y composite |
| `token.space.4` | 4px | |
| `token.space.8` | 8px | Used in medium padding_y composite |
| `token.space.12` | 12px | |
| `token.space.16` | 16px | |
| `token.space.20` | 20px | Icon size |
| `token.radius.8` | 8px | |
| `token.font.family.sans` | 'Figtree', system-ui, sans-serif | |
| `token.font.size.body-14` | 14px | |
| `token.font.weight.bold` | 700 | |
| `token.font.line-height.20` | 20px | |

### ✅ Base state check

| State | Required fields | Status |
|-------|----------------|--------|
| `focus` | ring, ring_width, ring_offset | ✅ all present |
| `disabled` | opacity, pointer_events | ✅ all present |

---

## Notes

- **fill.secondary primitive exception.** Uses `token.color.primitive.cool-neutral.10` (#181A1F) directly — no semantic bg token covers this value and the DS team has approved the exception. If a future semantic token is introduced (e.g. `token.color.background.strong`), update this reference.
- **Medium padding_y as composite.** Expressed as `token.space.8 + token.space.2` (= 10px). Both tokens resolve individually. Implementation renders as a single `padding-block: 10px` CSS value — the composite notation is spec-level documentation only.
- **No hover treatment defined.** Hover state produces no visual change; no hover background tokens exist and none are planned. If press/active feedback is needed, use CSS `opacity` at the implementation level without a token reference.
- **No min-width or min-height constraints.** Button dimensions are fully driven by content and layout context. Touch target compliance is the responsibility of the consuming layout.
- **Outline type is intentionally narrow.** Secondary and Inverse intents are not defined for Outline in Figma. Do not add them speculatively.
- **Icon color inheritance.** All icon fills in Figma match the label foreground token. In code, use `currentColor` on SVG icons so they inherit automatically.
- **`token.color.border.high-contrast` as focus ring.** Maps to `#868E9E` — meets WCAG 1.4.11 non-text contrast (3:1) at minimum. Update to a dedicated focus token if one is introduced.
