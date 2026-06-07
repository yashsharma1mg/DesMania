# Fill Rating — Spec

> **Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Dopamine_2.0_Components?node-id=1910-4879
> **Component family:** Ratings
> **Status:** Draft

---

## Prompt Match

```yaml
prompts:
  - "fill rating"
  - "star rating input"
  - "rate product"
  - "rating input"
  - "star picker"
  - "review stars"
```

---

## Description

Fill Rating is the **input** counterpart to View Rating — it lets a user actively select a star count (1–5) by tapping. It renders five 40×40px tappable star icons in a row. The filled-star icon colour provides instant sentiment feedback, shifting from red (negative) through amber (neutral) to green (positive) as the user selects more stars. An unselected star shows as an outline.

Fill Rating is always used inside a rating/review flow — never displayed as a standalone read-only element (use View Rating for that).

### When to use

- Product review submission flows
- Post-purchase feedback modals
- Service rating prompts

### When NOT to use

- Do not use to display an existing rating — use `ViewRating` instead
- Do not use inside a dense card or list item — the 40×40 tap target requires adequate surrounding space

---

## Anatomy

```
[ ★ ] [ ★ ] [ ★ ] [ ☆ ] [ ☆ ]   ← 3-star selected example
  40px  gap-8  40px  gap-8  40px
```

- 5 star icons, each 40×40px
- Gap between stars: `token.space.8`
- No container background — transparent; designed to sit on a dark overlay/modal background
- Filled stars: SVG asset colour shifts with sentiment (see Star Colour section)
- Empty stars: outline SVG asset

---

## States (star count)

```yaml
fill-rating.empty:
  stars_filled: 0
  filled_star_color: n/a
  empty_star_asset: outline star (white/light outline — for dark background contexts)

fill-rating.1-star:
  stars_filled: 1
  filled_star_color: token.color.state.error       # #A3111E — negative sentiment
  empty_star_asset: outline star

fill-rating.2-star:
  stars_filled: 2
  filled_star_color: token.color.state.error       # #A3111E — negative sentiment

fill-rating.3-star:
  stars_filled: 3
  filled_star_color: token.color.state.warning     # #BF9514 — neutral/amber sentiment

fill-rating.4-star:
  stars_filled: 4
  filled_star_color: token.color.primitive.wellness-green.30  # #156437 — positive

fill-rating.5-star:
  stars_filled: 5
  filled_star_color: token.color.primitive.wellness-green.30  # #156437 — positive
```

---

## Star Colour — Sentiment Mapping

Filled-star icon colour transitions based on selected count, providing immediate emotional feedback:

| Stars selected | Sentiment | Star fill colour | Token |
|---------------|-----------|-----------------|-------|
| 0 | empty | outline only | — |
| 1–2 | negative | red | `token.color.state.error` (#A3111E) |
| 3 | neutral | amber | `token.color.state.warning` (#BF9514) |
| 4–5 | positive | green | `token.color.primitive.wellness-green.30` (#156437) |

**Note:** The colours are encoded in the SVG star icon assets, not applied via CSS variables. When building the icon, use the above token values as the SVG `fill`. The transition between colour tiers happens at selection time — the entire row of filled stars changes colour together.

---

## Layout

```yaml
container:
  display: flex
  gap: token.space.8     # 8px between each star
  align_items: flex-start
  background: transparent

star:
  size: 40px             # raw — both width and height
  element: button        # each star is individually tappable
  role: radio (within radiogroup)
```

---

## States (interaction)

```yaml
focus:
  applies_to: [each star button]
  ring: token.color.content.primary
  ring_width: 2px
  ring_offset: 2px

disabled:
  opacity: 0.4
  pointer_events: none
  note: Full row disabled, not individual stars.
```

---

## Accessibility

```html
<div role="radiogroup" aria-label="Rate this product">
  <button role="radio" aria-checked="false" aria-label="1 star"><!-- star icon --></button>
  <button role="radio" aria-checked="false" aria-label="2 stars"><!-- star icon --></button>
  <button role="radio" aria-checked="true"  aria-label="3 stars"><!-- star icon --></button>
  <button role="radio" aria-checked="false" aria-label="4 stars"><!-- star icon --></button>
  <button role="radio" aria-checked="false" aria-label="5 stars"><!-- star icon --></button>
</div>
```

- Use `role="radiogroup"` on the container with a descriptive `aria-label`
- Each star button uses `role="radio"` and `aria-checked="true"` on the selected star
- Star label text must be screenreader-visible ("1 star", "2 stars", …"5 stars") — visually hidden or via `aria-label`
- Support keyboard: arrow keys navigate between stars, Space/Enter selects

---

## Implementation Notes

**Star colour is applied at the SVG level, not via CSS.** The colour tier (red / amber / green) requires three filled-star SVG variants. The consuming component swaps the asset based on the selected count using the threshold defined in the Star Colour table above.

**Hover preview.** On hover/pointer-enter, consider previewing the filled colour up to the hovered star (standard rating input pattern). Not defined in Figma but expected by users.

**Touch target.** Each star is 40×40px — meets WCAG 44×44px minimum only if no margin is added that shrinks the effective target. Use `touch-action: manipulation` to prevent double-tap zoom on rapid taps.
