# Swipe Indicators — Spec

> **Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Dopamine_2.0_Components?node-id=1836-1659
> **Component family:** Navigation / Indicators
> **Status:** Draft

---

## Prompt Match

```yaml
prompts:
  - "swipe indicator"
  - "progress indicator"
  - "scroll indicator"
  - "carousel dots"
  - "dot indicator"
  - "pagination dots"
  - "swipe progress"
  - "linear progress"
```

---

## Description

Swipe Indicators communicate how far through a swipeable or scrollable sequence the user is. Two visual modes:

1. **Linear** — a pill-shaped track with a sliding active indicator. Three sub-types: `standard-scroll` (smooth percentage-based, e.g. a scroll progress bar), `standard-swipe-large` (full-width 4-step swipe tracker), `standard-swipe-small` (compact 4-step swipe tracker).
2. **Dot** — a row of equally-sized dots where one active dot is filled dark; used for discrete slide or carousel positions.

Both modes are non-interactive (purely presentational) — they reflect state, they do not drive it.

### When to use

- **Linear / standard-scroll**: Horizontal scroll containers (e.g. category shelves) to show scroll depth
- **Linear / standard-swipe**: Onboarding flows, product image carousels with 4 steps, where the user swipes through a fixed number of panels
- **Dot**: Carousels, image galleries, or any discrete-page switcher with up to ~10 items

### When NOT to use

- Do not use linear swipe for more than ~8 steps — dots handle discrete counts more readably
- Do not use dots for continuous scroll — use the linear scroll variant
- Do not use either as an interactive control; they are status indicators only

---

## Anatomy

```
Linear indicator
┌────────────────────────────────────────┐  ← track: border.subtle bg, h=2px
│ ████████────────────────────────────── │  ← indicator: content.primary, width = progress × track
└────────────────────────────────────────┘
  w=216px (large) or 48px (small), h=2px

Dot indicator
  ●  ●  ◉  ●  ●  ●  ●  ●
  4px dots, gap-4px, active dot = content.primary, inactive = border.subtle
  each dot: 4×4px, rounded-full
```

---

## Variants

### linear.standard-scroll

```yaml
linear.standard-scroll:
  use_when: "Reflects continuous scroll progress as a percentage of total scrollable width"
  element: div (non-interactive)
  aria_hidden: "true"  # consumed via aria-label on the scrollable container
  tokens:
    track_bg: token.color.border.subtle         # #DDE2EB
    indicator_bg: token.color.content.primary   # #181A1F
    track_height: 2px                           # raw
    track_width: 216px                          # raw — large variant
  indicator_width: >
    derived: track_width × (scroll_position / total_scroll_width)
    example: 25% scrolled → indicator_width = 216 × 0.25 = 54px
```

### linear.standard-swipe-large

```yaml
linear.standard-swipe-large:
  use_when: "Tracks discrete swipe steps across a full-width swipeable area (4-step default)"
  element: div (non-interactive)
  tokens:
    track_bg: token.color.border.subtle
    indicator_bg: token.color.content.primary
    track_height: 2px
    track_width: 216px                          # raw — spans a content area ~216px+
  indicator_width: >
    derived: track_width × (current_step / total_steps)
    example (4 steps): step 1 = 54px, step 2 = 108px, step 3 = 162px, step 4 = 216px
```

### linear.standard-swipe-small

```yaml
linear.standard-swipe-small:
  use_when: "Compact swipe tracker when the content area is narrow or stacked (4-step default)"
  element: div (non-interactive)
  tokens:
    track_bg: token.color.border.subtle
    indicator_bg: token.color.content.primary
    track_height: 2px
    track_width: 48px                           # raw — compact, e.g. stacked content panels
  indicator_width: >
    derived: track_width × (current_step / total_steps)
    example (4 steps): step 1 = 12px, step 2 = 24px, step 3 = 36px, step 4 = 48px
```

### dot.standard-swipe

```yaml
dot.standard-swipe:
  use_when: "Discrete carousel or gallery with up to ~10 slides; each dot = one slide"
  element: div (non-interactive, role=tablist not needed — purely visual)
  tokens:
    active_dot_bg: token.color.content.primary     # #181A1F
    inactive_dot_bg: token.color.border.subtle     # #DDE2EB
    dot_gap: token.space.4                         # 4px
    dot_radius: token.radius.4                     # 4px — equals dot size → full circle
  sizes:
    dot_size: 4px                                  # raw (= token.space.4 value)
  example:
    figma_demo: 8 dots, 3rd dot active (3/8 swipe)
    container_width: 60px (8 × 4px + 7 × 4px = 60px)
```

---

## Layout

```yaml
linear:
  display: flex
  flex_direction: column  # indicator sits inside track as first child
  overflow: hidden        # clips indicator that may exceed track width during animation
  border_radius: none     # track has no explicit radius in Figma

dot:
  display: flex
  gap: token.space.4
  align_items: center
  justify_content: center
```

---

## Sizes

```yaml
linear_large:
  track_width: 216px     # raw
  track_height: 2px      # raw

linear_small:
  track_width: 48px      # raw
  track_height: 2px      # raw

dot:
  dot_size: 4px          # raw
  dot_gap: token.space.4 # 4px
  count: variable (Figma demo = 8 dots)
```

---

## States

```yaml
# No interactive states — component is read-only.
# Animation (slide/transition) is an implementation concern; Figma only specifies static positions.
```

---

## Accessibility

```html
<!-- Linear — aria-hidden, progress expressed on scrollable container -->
<div aria-hidden="true" class="swipe-indicator-track">
  <div class="swipe-indicator-fill" style="width: 54px"></div>
</div>

<!-- Dot — for a carousel, accessible state lives on the carousel, not dots -->
<div aria-hidden="true" class="dot-indicator">
  <span class="dot inactive"></span>
  <span class="dot inactive"></span>
  <span class="dot active"></span>
  ...
</div>

<!-- Carousel container carries the accessible status -->
<div role="region" aria-label="Product images" aria-roledescription="carousel">
  <div aria-live="polite" aria-atomic="true" class="sr-only">
    Slide 3 of 8
  </div>
  ...
</div>
```

- Swipe indicators are **always `aria-hidden`** — they duplicate visual state already communicated by the carousel/scroller itself
- The parent scrollable or carousel component announces position via `aria-live` or `role="tablist"` on its navigation controls
- Do not add `role="progressbar"` to these indicators — they are aesthetic, not functional controls

---

## Implementation Notes

**Linear indicator width is dynamic.** For `standard-scroll`, compute `indicatorWidth = trackWidth × (scrollLeft / (scrollWidth - clientWidth))` on scroll events. For `standard-swipe`, snap to step: `indicatorWidth = trackWidth × (currentStep / totalSteps)`.

**Animate the indicator.** Apply `transition: width 200ms ease-out` to the indicator element for a smooth progress feel. The static Figma frames show only the end states.

**Dot count is variable.** The Figma demo shows 8 dots but the component should render N dots based on the slide count prop. The `60px` container width in Figma is derived from `8 × 4px + 7 × 4px = 60px` — it auto-sizes with `gap`.

**Track width is contextual.** Use `w-full` and let the parent container constrain the width — the `216px` and `48px` values in Figma represent example contexts (full-width content area vs compact stacked panel). Do not hardcode these values.
