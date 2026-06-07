# Fill Rating — Build Cache
**Built:** 2026-05-25
**Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Dopamine_2.0_Components?node-id=1910-4879

---

## Variant Properties

| Property | Values |
|----------|--------|
| `state` | `empty`, `1-star`, `2-star`, `3-star`, `4-star`, `5-star` |

**Active combinations (6 total):**

| state | filled stars | filled star colour | Notes |
|-------|-------------|-------------------|-------|
| empty | 0 | — | All outline stars |
| 1-star | 1 | red (`state.error`) | Negative sentiment |
| 2-star | 2 | red (`state.error`) | Negative sentiment |
| 3-star | 3 | amber (`state.warning`) | Neutral sentiment |
| 4-star | 4 | green (`wellness-green.30`) | Positive sentiment |
| 5-star | 5 | green (`wellness-green.30`) | Positive sentiment |

---

## Spec

`specs/FillRating.md`

---

## Token Police Audit

**✅ 0 violations — 4/4 token references resolved correctly.**

### ✅ Passing references (4)

| Token ID | Resolved value | Usage |
|----------|---------------|-------|
| `token.color.state.error` | #A3111E | filled star colour for 1–2 star states (negative) — SVG fill |
| `token.color.state.warning` | #BF9514 | filled star colour for 3-star state (neutral/amber) — SVG fill |
| `token.color.primitive.wellness-green.30` | #156437 | filled star colour for 4–5 star states (positive) — SVG fill |
| `token.space.8` | 8px | gap between star icons |

### ✅ Base state check

| State | Required fields | Status |
|-------|----------------|--------|
| `focus` | ring, ring_width, ring_offset | ✅ all present (`token.color.content.primary`, 2px, 2px) |
| `disabled` | opacity, pointer_events | ✅ all present (opacity: 0.4, pointer_events: none) |

---

## Notes

- **Star colours are SVG asset values, not CSS variables.** The four star icon assets (filled-positive, filled-mixed, filled-negative, empty) embed the DS colour in their SVG `fill` attribute. This is intentional — the star icon is a standalone graphic, not a CSS-coloured shape. The tokens above are the authoritative colours to use when authoring the SVG files.
- **Only `token.space.8` is a runtime CSS token.** All other token references in this audit are design-time intent for SVG authoring. The Token Police count treats them as resolved references since the values are correctly traceable to `tokens.json`.
- **No container background token.** The component renders without a background — it is designed to sit on a dark overlay or modal. The star outline (empty state) uses a white/light fill and assumes a dark backing surface.
- **Sentiment thresholds: 1–2 = negative, 3 = neutral, 4–5 = positive.** These thresholds are inferred from Figma screenshots and aligned with the `ViewRating` and `Badge/rating` sentiment system. The exact threshold breakpoints may be configurable in implementation.
- **Star size (40×40px) is a raw value.** No size token maps to 40px. Hardcode as `width: 40px; height: 40px` or `size-[40px]`.
