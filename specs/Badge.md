# Badge — Spec

> **Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Dopamine_2.0_Components?node-id=1625-1255
> **Component family:** Status / Indicators
> **Status:** Draft

---

## Prompt Match

```yaml
prompts:
  - "badge"
  - "tag"
  - "label badge"
  - "info badge"
  - "rating badge"
  - "star rating"
  - "notification badge"
  - "count badge"
  - "dot badge"
  - "sold out tag"
  - "product badge"
  - "category tag"
```

---

## Description

Badge is a non-interactive label element used to surface metadata about a product, entity, or state. It covers three distinct sub-types — `info` (coloured label for category/status annotation), `rating` (star-based rating with colour-coded score), and `notification` (small indicator showing a count or presence signal).

Info badges carry custom palette colours from a legacy "SPRING/Expressive" palette that are not yet part of the Dopamine 2.0 semantic token system (see notes). Rating and notification badges use resolved Dopamine 2.0 tokens.

### When to use

- **Info badge**: On product cards, search results, and listing tiles to surface category, campaign, or offer labels
- **Rating badge**: On product cards and reviews to show the numerical star rating in a compact pill
- **Notification (number)**: On icons, avatars, or navigation items to show unread counts or pending actions
- **Notification (dot)**: On icons or list items when presence of new content must be flagged without showing a number

### When NOT to use

- Do not use badges for interactive filtering — use `Chip/filter` or `Chip/selection` instead
- Do not use `notification.number` for counts above 99 without truncating to "99+"
- Do not use info badge for critical system status — use a status component (error state, warning banner) instead

---

## Anatomy

```
Info Badge (e.g. "Ember" label)
┌──────────────┐
│  px-8  Text  │  ← 11px Bold Figtree, tinted background, no py gap (lh-16 fills height)
└──────────────┘
  radius: 4px
  bg: 10% tint of text color over white

Rating Badge (e.g. "4.2 ★")
┌──────────┐
│  px-4  [ 4.2 ] [★ 8×8]  │  ← 12px Regular, white text
│  py-2   │
└──────────┘
  radius: 4px
  bg: solid colour (green / yellow / red)

Notification Badge — Number
┌────────┐
│  [ 4 ] │  ← 16×16 circle, 11px Medium, white text
└────────┘
  radius: 8px (= circle on 16px container)

Notification Badge — Dot
  ●  16×16 solid circle, no text
  radius: 8px
```

**Key elements:**
- **Label** (info): short text string, 1–4 words, all-caps or sentence case per content team
- **Score** (rating): one decimal float (e.g. "4.2"), 12px Regular, white
- **Star icon** (rating): 8×8px star icon, white
- **Count** (notification.number): integer string, 11px Medium, white
- **No content** (notification.dot): purely a presence signal

---

## Variants

### info.ember
```yaml
info.ember:
  use_when: "Warm/promotional label — typically campaign or limited-time offer tagging"
  element: span
  tokens:
    foreground: token.color.badge.ember
    background_tint: derived — rgba(token.color.badge.ember, 0.1) over white; see Background Technique section
    padding_x: token.space.8
    radius: token.radius.4
    font_family: token.font.family.sans
    font_size: token.font.size.tag-11
    font_weight: token.font.weight.bold
    line_height: token.font.line-height.16
```

### info.aqua
```yaml
info.aqua:
  use_when: "Fresh/health label — typically wellness or hydration category"
  element: span
  tokens:
    foreground: token.color.badge.aqua
    background_tint: derived — rgba(token.color.badge.aqua, 0.1) over white; see Background Technique section
    padding_x: token.space.8
    radius: token.radius.4
    font_family: token.font.family.sans
    font_size: token.font.size.tag-11
    font_weight: token.font.weight.bold
    line_height: token.font.line-height.16
```

### info.royal
```yaml
info.royal:
  use_when: "Premium/luxury label — typically premium tier or exclusive offer tagging"
  element: span
  tokens:
    foreground: token.color.badge.royal
    background_tint: derived — rgba(token.color.badge.royal, 0.1) over white; see Background Technique section
    padding_x: token.space.8
    radius: token.radius.4
    font_family: token.font.family.sans
    font_size: token.font.size.tag-11
    font_weight: token.font.weight.bold
    line_height: token.font.line-height.16
```

### info.crimson
```yaml
info.crimson:
  use_when: "Bold/urgent label — typically limited quantity or hot-deal tagging"
  element: span
  tokens:
    foreground: token.color.badge.crimson
    background_tint: derived — rgba(token.color.badge.crimson, 0.1) over white; see Background Technique section
    padding_x: token.space.8
    radius: token.radius.4
    font_family: token.font.family.sans
    font_size: token.font.size.tag-11
    font_weight: token.font.weight.bold
    line_height: token.font.line-height.16
```

### info.molten
```yaml
info.molten:
  use_when: "Deep/rare label — typically rare ingredient or specialty category tagging"
  element: span
  tokens:
    foreground: token.color.badge.molten
    background_tint: derived — rgba(token.color.badge.molten, 0.1) over white; see Background Technique section
    padding_x: token.space.8
    radius: token.radius.4
    font_family: token.font.family.sans
    font_size: token.font.size.tag-11
    font_weight: token.font.weight.bold
    line_height: token.font.line-height.16
```

### info.sold-out
```yaml
info.sold-out:
  use_when: "Product is sold out — inventory unavailability signal on product card"
  element: span
  tokens:
    foreground: token.color.state.error  # Figma resolves to #C50F1F; tokens.json = #A3111E — value discrepancy, see notes
    background: token.color.primitive.comfort-pink.90  # Figma resolves to #FBD9E8; tokens.json = #F9CFE3 — value discrepancy, see notes
    padding_x: token.space.8
    radius: token.radius.4
    font_family: token.font.family.sans
    font_size: token.font.size.tag-11
    font_weight: token.font.weight.bold
    line_height: token.font.line-height.16
```

### rating.green
```yaml
rating.green:
  use_when: "High star rating (typically ≥ 4.0) — positive signal"
  element: span
  tokens:
    background: token.color.primitive.wellness-green.30
    foreground: token.color.content.inverse
    padding_x: token.space.4
    padding_y: token.space.2
    gap: token.space.4
    radius: token.radius.4
```

### rating.yellow
```yaml
rating.yellow:
  use_when: "Mid-range star rating (typically 3.0–3.9) — neutral/caution signal"
  element: span
  tokens:
    background: token.color.state.warning
    foreground: token.color.content.inverse
    padding_x: token.space.4
    padding_y: token.space.2
    gap: token.space.4
    radius: token.radius.4
```

### rating.red
```yaml
rating.red:
  use_when: "Low star rating (typically < 3.0) — negative signal"
  element: span
  tokens:
    background: token.color.state.error  # ⚠️ value discrepancy — see notes
    foreground: token.color.content.inverse
    padding_x: token.space.4
    padding_y: token.space.2
    gap: token.space.4
    radius: token.radius.4
```

### notification.number
```yaml
notification.number:
  use_when: "Show a count of pending items, unread messages, or pending actions"
  element: span
  tokens:
    background: token.color.brand.1mg
    foreground: token.color.content.inverse
    padding: token.space.4
    radius: token.radius.8  # 8px on 16px = circle
    size: 16px  # raw value
    font_family: token.font.family.sans
    font_size: token.font.size.tag-11
    font_weight: token.font.weight.medium
    line_height: token.font.line-height.16
```

### notification.dot
```yaml
notification.dot:
  use_when: "Signal new content or activity is present without showing a count"
  element: span
  tokens:
    background: token.color.brand.1mg
    radius: token.radius.8  # circle on 16px
    size: 16px  # raw value
```

---

## Info Badge — Background Technique

Info badges (ember, aqua, royal, crimson, molten) do not use a solid background token. Instead, they use a CSS tinted-blend technique:

```css
/* Implementation pattern */
background-image:
  linear-gradient(rgba(R, G, B, 0.1), rgba(R, G, B, 0.1)),
  linear-gradient(#FFFFFF, #FFFFFF);
```

Where `R, G, B` are the RGB components of the text colour. The result is the text colour at 10% opacity composited over white. There is no token equivalent for this pattern.

The `sold-out` variant is an exception — it uses a solid `comfort-pink.90` background (not the tinted-blend technique).

---

## States

```yaml
default:
  applies_to: [all]
  changes: {}
  note: Badges are non-interactive — no focus, hover, or press states are defined.
```

---

## Sizes

```yaml
info:
  height: auto  # driven by lh-16 + py (≈ 16–20px depending on py)
  padding_x: token.space.8
  padding_y: token.space.2  # standard; Figma shows some variants with py-0 — use py-2 as default

rating:
  height: auto  # py-2×2 + lh-16 = 20px
  padding_x: token.space.4
  padding_y: token.space.2
  star_size: 8px  # raw value

notification:
  size: 16px  # fixed, both number and dot
  min_width: 16px  # grows wider if count is 2+ digits
```

---

## Typography

```yaml
info_label:
  font_family: token.font.family.sans  # Figtree — see notes on Figma inconsistency
  font_size: token.font.size.tag-11
  font_weight: token.font.weight.bold
  line_height: token.font.line-height.16
  text_align: center
  white_space: nowrap

rating_score:
  font_family: token.font.family.sans
  font_size: token.font.size.body-12
  font_weight: token.font.weight.regular
  line_height: token.font.line-height.16
  white_space: nowrap

notification_count:
  font_family: token.font.family.sans
  font_size: token.font.size.tag-11
  font_weight: token.font.weight.medium
  line_height: token.font.line-height.16
  text_align: center
  white_space: nowrap
```

---

## Composition

```yaml
composition:
  can_contain: []
  can_be_contained_by:
    info: [ProductCard, SearchResultItem, ListTile, CategoryBanner]
    rating: [ProductCard, ReviewSummary, SearchResultItem]
    notification: [IconButton, NavTab, Avatar, ListItem]
  note: >
    Badges are purely presentational — they carry no interactive affordance.
    Do not wrap them in a <button> unless the entire parent surface is interactive.
    notification.dot and notification.number must always be overlaid or adjacent
    to the element they qualify — never placed standalone.
```

---

## Accessibility

### ARIA Attributes

```html
<!-- Info badge — descriptive, read inline -->
<span aria-label="Ember">Badge text here</span>

<!-- Rating badge — include full context in label -->
<span aria-label="4.2 out of 5 stars">
  4.2 <img aria-hidden="true" alt="" />
</span>

<!-- Notification number — count only, parent context makes it meaningful -->
<span aria-label="4 unread notifications">4</span>
<!-- or: aria-live="polite" if count updates dynamically -->

<!-- Notification dot — presence only -->
<span role="status" aria-label="New activity"></span>
```

### Screen Reader Announcements

- Info badge: label text read inline with surrounding content
- Rating badge: provide `aria-label` with full score and scale ("X out of 5 stars")
- Notification number: `aria-label` describes what is being counted; if updates dynamically, wrap in `aria-live="polite"` region
- Notification dot: `role="status"` with descriptive `aria-label`; visually hidden text or tooltip recommended

---

## Content Guidelines

### Text

- **Info label**: 1–4 words; can be all-caps or title case per content — do not mix styles within a surface
- **Rating score**: one decimal place (e.g. "4.2"), never rounded to integer
- **Notification count**: integer only; truncate to "99+" when count exceeds 99

---

## Implementation Notes

**Info badge colour system:**
All five info colour variants reference `token.color.badge.*` entries (`ember`, `aqua`, `royal`, `crimson`, `molten`) added to `tokens/tokens.json`. These colours originate from the "SPRING/Expressive" legacy palette but are now first-class token entries under `color.badge`. Use the CSS variable `--color-badge-{name}` in implementation.

**Figma font inconsistency (Poppins vs Figtree):**
Several info badge variants in Figma use "Poppins:Medium" rather than "Figtree:Bold". This is a legacy inconsistency — Poppins is not in the Dopamine 2.0 font token system. Implement all badge labels with `token.font.family.sans` (Figtree). Flag the Figma file for correction.

**`token.color.state.error` value discrepancy:**
The Figma component file resolves `--colour-usage/states/error` to `#C50F1F`. The current `tokens.json` has `token.color.state.error` = `#A3111E`. These values differ. Use the `tokens.json` value (`#A3111E`) as the implementation source of truth until the token file is reconciled with the Figma library.

**`token.color.primitive.comfort-pink.90` value discrepancy:**
Figma resolves `--colours/comfort-pink/90` to `#FBD9E8`. The current `tokens.json` has `comfort-pink.90` = `#F9CFE3`. These differ slightly. Use `tokens.json` as source of truth.

**Notification badge minimum width:**
The 16×16 fixed size works for single-digit counts. For 2-digit counts (10–99), the badge should expand horizontally while staying 16px tall: `min-width: 16px; padding: 0 4px`.
