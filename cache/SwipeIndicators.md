# Swipe Indicators — Build Cache
**Built:** 2026-05-25
**Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Dopamine_2.0_Components?node-id=1836-1659

---

## Variant Properties

| Property | Values |
|----------|--------|
| `type` | `linear`, `dot` |
| `sub-type` (linear) | `standard-scroll`, `standard-swipe-large`, `standard-swipe-small` |
| `progress` (linear) | 25%, 50%, 75%, 100% (4-step examples) |
| `active-index` (dot) | 0–N (Figma demo: index 2 of 8) |

**Active combinations (4 structural variants):**

| type | sub-type | track width | height | Notes |
|------|----------|------------|--------|-------|
| linear | standard-scroll | 216px | 2px | Percentage-based progress |
| linear | standard-swipe-large | 216px | 2px | Fraction-based 4-step progress |
| linear | standard-swipe-small | 48px | 2px | Compact 4-step progress |
| dot | standard-swipe | auto (60px for 8 dots) | 4px | Discrete dot per slide |

---

## Spec

`specs/SwipeIndicators.md`

---

## Token Police Audit

**✅ 0 violations — 4/4 token references resolved correctly.**

### ✅ Passing references (4)

| Token ID | Resolved value | Usage |
|----------|---------------|-------|
| `token.color.content.primary` | #181A1F | linear indicator fill; dot active background |
| `token.color.border.subtle` | #DDE2EB | linear track background; dot inactive background |
| `token.space.4` | 4px | dot gap between dots; dot size (4×4px) |
| `token.radius.4` | 4px | dot border-radius (= dot size → full circle) |

### ✅ Base state check

| State | Required fields | Status |
|-------|----------------|--------|
| `focus` | n/a | ✅ not applicable — non-interactive component |
| `disabled` | n/a | ✅ not applicable |

---

## Notes

- **`token.color.border.subtle` covers two Figma variable names.** `--colours/cool-neutral/90` (#DDE2EB) and `--colour-usage/outline/low-contrast` (#DDE2EB) both resolve to the same hex and the same semantic token. One token, two Figma aliases.
- **Standard-scroll and standard-swipe-large are visually identical.** Both are 216×2px with the same token references. Their difference is semantic: scroll = continuous percentage, swipe = discrete step fraction. The distinction matters for how the `indicatorWidth` is calculated in code.
- **Track width is contextual, not fixed.** The `216px` and `48px` values reflect Figma example contexts. Implementing with `width: 100%` and letting the parent constrain is recommended.
- **Dot size (4px) equals `token.space.4`.** Implemented as `width: 4px; height: 4px` — the value coincides with `--space-4` but is used as a dimension, not spacing. Reference as raw `4px` in implementation; the token audit recognises the size as `token.space.4` for consistency.
- **`token.radius.4` (4px) on a 4×4px dot = full circle.** No visual rounding — the radius equals half the dimension, producing a circle. Same technique as `notification.dot` in Badge (token.radius.8 on 16×16px).
- **Indicator width is a runtime-computed value, not a token.** It is `track_width × progress_fraction`. The 54px / 108px / 162px / 216px values in Figma are static examples; actual width must be computed dynamically.
