# View Rating — Spec

> **Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Dopamine_2.0_Components?node-id=1910-4957
> **Component family:** Ratings
> **Status:** Draft

---

## Prompt Match

```yaml
prompts:
  - "view rating"
  - "star rating display"
  - "read only stars"
  - "product rating"
  - "rating display"
  - "stars"
```

---

## Description

View Rating is the **read-only display** counterpart to Fill Rating. It renders a row of 5 star icons at two sizes — Large (20×20px) and Small (12×12px) — with colour-coded filled stars communicating sentiment. The empty/unfilled stars always appear in a neutral gray; filled stars are coloured green (positive), amber (mixed), or red (negative) depending on the rating value.

### When to use

- Product cards, search results, and listing tiles to show an aggregate star rating
- Review summaries to display average rating
- Any read-only context where a numerical rating needs visual reinforcement

### When NOT to use

- Do not use for user input — use `FillRating` instead
- Do not use without an accessible text label that states the numerical score ("4.2 out of 5")
- Do not use the Small variant where text smaller than 11px accompanies it

---

## Anatomy

```
Large (20×20px stars, gap-4px)
[ ★ ][ ★ ][ ★ ][ ☆ ][ ☆ ]
 20px  4px  20px  4px  20px ...    total w=116px

Small (12×12px stars, gap-2px)
[★][★][★][☆][☆]
12px 2px 12px ...                  total w=68px
```

- 5 stars always rendered (never fewer/more)
- Filled count = `floor(rating)` — no half-star in Figma definition
- Empty stars: neutral gray outline
- Filled stars: colour driven by sentiment tier (see table below)

---

## Variants

### view-rating.large

```yaml
view-rating.large:
  element: div
  role: img (non-interactive)
  tokens:
    star_gap: token.space.4    # 4px
  sizes:
    star_size: 20px            # raw

  sub-states:
    empty:
      filled_count: 0
      filled_star_color: n/a
      empty_star_color: token.color.content.tertiary   # #868E9E — gray outline

    positive:
      filled_count: typically 4–5 (≥4.0)
      filled_star_color: token.color.primitive.wellness-green.30  # #156437
      empty_star_color: token.color.content.tertiary

    mixed:
      filled_count: typically 2–3 (3.0–3.9)
      filled_star_color: token.color.state.warning     # #BF9514 — amber
      empty_star_color: token.color.content.tertiary

    negative:
      filled_count: typically 1 (< 3.0)
      filled_star_color: token.color.state.error       # #A3111E — red
      empty_star_color: token.color.content.tertiary
```

### view-rating.small

```yaml
view-rating.small:
  element: div
  role: img (non-interactive)
  tokens:
    star_gap: token.space.2    # 2px
  sizes:
    star_size: 12px            # raw

  sub-states:
    # same sentiment/color mapping as Large — only size and gap differ
    empty:
      empty_star_color: token.color.content.tertiary
    positive:
      filled_star_color: token.color.primitive.wellness-green.30
    mixed:
      filled_star_color: token.color.state.warning
    negative:
      filled_star_color: token.color.state.error
```

---

## Sentiment Threshold Mapping

Aligns with the `Badge/rating` component thresholds:

| Rating value | Sentiment | Filled star colour | Token |
|-------------|-----------|-------------------|-------|
| 0 | empty | — | — |
| < 3.0 | negative | red | `token.color.state.error` (#A3111E) |
| 3.0 – 3.9 | mixed | amber | `token.color.state.warning` (#BF9514) |
| ≥ 4.0 | positive | green | `token.color.primitive.wellness-green.30` (#156437) |

**Note:** Star colours are encoded in SVG icon assets, not CSS variables. The three states (filled-positive, filled-mixed, filled-negative, empty) each require a distinct SVG variant.

---

## Sizes

```yaml
large:
  star_size: 20px        # raw
  gap: token.space.4     # 4px
  total_width: 116px     # derived: 5×20px + 4×4px

small:
  star_size: 12px        # raw
  gap: token.space.2     # 2px
  total_width: 68px      # derived: 5×12px + 4×2px
```

---

## Accessibility

```html
<!-- Always pair with a visible or aria-label score -->
<div role="img" aria-label="4.2 out of 5 stars">
  <!-- 5 star SVG icons, aria-hidden -->
</div>

<!-- Or inline with text -->
<span>4.2</span>
<div role="img" aria-label="4.2 out of 5 stars" aria-hidden="true">
  <!-- stars -->
</div>
```

- The star row itself is presentational — wrap in `role="img"` with the full score as `aria-label`
- All individual star icons are `aria-hidden="true"`
- If the rating updates dynamically, wrap in `aria-live="polite"`

---

## Composition

```yaml
can_be_contained_by: [ProductCard, ReviewSummary, SearchResultItem, ListTile, Badge/rating]
note: >
  ViewRating renders the star row only. The numerical score label ("4.2") is rendered
  by the consuming component alongside the star row.
```

---

## Implementation Notes

**Four SVG star assets required per size:**
Each size needs: `star-filled-positive.svg`, `star-filled-mixed.svg`, `star-filled-negative.svg`, `star-empty.svg`. Fill each with the corresponding DS token colour.

**Filled count is `floor(rating)`.** No half-stars are shown in the Dopamine 2.0 spec. Round down: a 4.7 rating shows 4 filled + 1 empty.

**Small variant is distinct from the Badge/rating component.** The `Badge/rating` (from specs/Badge.md) shows the numerical score inside a coloured pill. ViewRating renders the full 5-star row. Both can appear together — badge shows the number, ViewRating shows the stars.
