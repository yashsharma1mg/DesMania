# View Rating — Build Cache
**Built:** 2026-05-25
**Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Dopamine_2.0_Components?node-id=1910-4957

---

## Variant Properties

| Property | Values |
|----------|--------|
| `size` | `large`, `small` |
| `sentiment` | `empty`, `positive`, `mixed`, `negative` |

**Active combinations (8 total):**

| size | sentiment | filled stars | filled star colour | gap | star size |
|------|-----------|-------------|-------------------|-----|-----------|
| large | empty | 0 | — | 4px | 20×20px |
| large | positive | 5 | green | 4px | 20×20px |
| large | mixed | 2–3 | amber | 4px | 20×20px |
| large | negative | 1 | red | 4px | 20×20px |
| small | empty | 0 | — | 2px | 12×12px |
| small | positive | 5 | green | 2px | 12×12px |
| small | mixed | 2–3 | amber | 2px | 12×12px |
| small | negative | 1 | red | 2px | 12×12px |

---

## Spec

`specs/ViewRating.md`

---

## Token Police Audit

**✅ 0 violations — 5/5 token references resolved correctly.**

### ✅ Passing references (5)

| Token ID | Resolved value | Usage |
|----------|---------------|-------|
| `token.color.primitive.wellness-green.30` | #156437 | filled star — positive sentiment (≥4.0) — SVG fill |
| `token.color.state.warning` | #BF9514 | filled star — mixed sentiment (3.0–3.9) — SVG fill |
| `token.color.state.error` | #A3111E | filled star — negative sentiment (<3.0) — SVG fill |
| `token.color.content.tertiary` | #868E9E | empty/unfilled star — SVG fill |
| `token.space.4` | 4px | gap between stars (large variant) |
| `token.space.2` | 2px | gap between stars (small variant) |

*(6 rows — 5 unique tokens with `token.space.4` and `token.space.2` both counted. Audit total = 6 resolved.)*

**✅ 0 violations — 6/6 token references resolved correctly.**

### ✅ Base state check

| State | Required fields | Status |
|-------|----------------|--------|
| `focus` | n/a | ✅ not applicable — read-only display component |
| `disabled` | n/a | ✅ not applicable |

---

## Notes

- **Star colours are SVG asset values, not CSS variables.** Four distinct SVG variants are required per size (2 sizes × 4 states = 8 star assets total: filled-positive, filled-mixed, filled-negative, empty — for each of large and small).
- **Sentiment thresholds align with `Badge/rating`.** Positive ≥4.0 (green), mixed 3.0–3.9 (amber), negative <3.0 (red). Consistent across the Dopamine 2.0 rating system.
- **`token.color.content.tertiary` (#868E9E) for empty stars.** This is the muted gray used for the unfilled star outline in view-only context. Fill rating uses a lighter outline (white) because it's designed for dark overlay backgrounds.
- **Filled count uses `floor(rating)`.** No half-star treatment in Dopamine 2.0. A 4.7 rating shows 4 filled + 1 empty.
- **Large total width: 116px. Small total width: 68px.** Both derived from `5 × star_size + 4 × gap`.
- **Distinct from `Badge/rating` component.** The Badge/rating pill (specs/Badge.md) shows a numerical score in a coloured bubble. ViewRating shows the full 5-star row. The two are compositional — Badge provides the number, ViewRating provides the visual row.
