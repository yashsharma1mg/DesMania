# PreparationAlertBanner — Spec

> **Figma source:** New component — Diagnostics Checkout UX redesign (preparation guide overhaul)
> **Component family:** Feedback / Alerts
> **Status:** Draft

---

## Prompt Match

```yaml
prompts:
  - "preparation alert"
  - "fasting warning banner"
  - "test preparation notice"
  - "pre-test instructions banner"
  - "lab test preparation alert"
  - "preparation required cart"
```

---

## Description

A non-interactive informational banner displayed at the top of the Cart page when one or more lab tests require preparation (fasting, medication restrictions, sample collection requirements, etc.). Surfaces the aggregate worst-case preparation requirement so the user sees critical instructions without needing to tap or navigate anywhere.

### When to use

- In the Cart page, directly above the "Tests added" section, when ≥1 test has preparation requirements
- Always show the most demanding preparation requirement across all tests in the cart (e.g., if one test needs 8 hrs fasting and another 12 hrs, show 12 hrs)

### When NOT to use

- Do not show when all cart tests have no preparation requirements
- Do not use for error or failure states — use `Toast` for system messages
- Do not use for promotional or savings communication — use `SavingsBanner` for that
- Do not add a dismiss/close action — this information must persist for the entire cart session

---

## Anatomy

```
┌──────────────────────────────────────────────────┐
│▌  🕐  Fasting required before collection         │
│▌      Avoid food & drink 8–12 hrs before         │
│▌      your sample collection appointment         │
└──────────────────────────────────────────────────┘
 ↑
 4px left accent bar (state.warning)
```

**Key elements:**
- **Left accent bar**: 4px wide full-height vertical bar — visual signal of advisory status
- **Leading icon**: Clock/timer icon, 20×20px — reinforces the time-sensitive nature of preparation
- **Heading**: Bold single-line summary of the preparation requirement
- **Body**: 1–2 line supporting detail (specific duration, action, or restriction)

---

## Variants

### default

```yaml
default:
  use_when: "One or more cart tests require preparation — show in Cart above Tests section"
  element: div
  tokens:
    background: # TOKEN MISSING: background.warning — no semantic warm-tint background token exists. Recommended addition: token.color.background.warning = sunshine-yellow.97 (#FFF9D9). Add to tokens.json before implementing.
    accent_bar_color: token.color.state.warning
    icon_color: token.color.state.warning
    heading_color: token.color.content.primary
    body_color: token.color.content.secondary
    padding_x: token.space.16
    padding_y: token.space.12
    gap_icon_to_text: token.space.12
    radius: token.radius.8
    accent_bar_width: 4px    # raw — no space token for 4px
```

---

## States

```yaml
default:
  applies_to: [all]
  changes: {}
```

No interactive states. This is a display-only informational component — no hover, focus, or active states.

---

## Dimensions

| Property | Value | Token |
|----------|-------|-------|
| Horizontal padding | 16px | `token.space.16` |
| Vertical padding | 12px | `token.space.12` |
| Gap: icon to text block | 12px | `token.space.12` |
| Icon size | 20×20px | — (raw) |
| Accent bar width | 4px | — (raw, no token) |
| Border-radius | 8px | `token.radius.8` |
| Heading font-size | 14px | `token.font.size.body-14` |
| Heading font-weight | 700 | `token.font.weight.bold` |
| Heading line-height | 20px | `token.font.line-height.20` |
| Heading color | `token.color.content.primary` | #181A1F |
| Body font-size | 12px | `token.font.size.body-12` |
| Body font-weight | 400 | `token.font.weight.regular` |
| Body line-height | 16px | `token.font.line-height.16` |
| Body color | `token.color.content.secondary` | #414752 |
| Font family | Figtree | `token.font.family.sans` |

---

## Composition

```yaml
composition:
  can_contain: []
  can_be_contained_by: [Cart page]
  cannot_combine_with: [SavingsBanner]
```

In the Cart page layout, `PreparationAlertBanner` sits between `SavingsBanner` (savings row) and the "Tests added" section heading. The two banners must not be visually adjacent without a gap — the 8px section divider between `SavingsBanner` and the tests section provides natural separation.

---

## Content Guidelines

### Text Length

- **Heading**: Max 60 characters — must fit on 1–2 lines at ~311px text width (343px container minus 16px padding each side minus 4px accent bar minus 12px icon gap minus 20px icon)
- **Body**: Max 120 characters — 2 lines maximum

### Tone & Voice

- Informational, not alarming — this is guidance, not an error
- Sentence case throughout
- Lead with the constraint: "Fasting required…", "Avoid iron supplements…"
- Plain language — no medical jargon

### Dynamic content rules

- Heading and body are computed from preparation data across all cart tests
- When multiple tests require fasting with different durations, show the longest (most restrictive) duration
- When tests have different preparation types (fasting + medication restriction), heading covers fasting if present — it is the highest-friction requirement

---

## Accessibility

```html
<aside
  role="note"
  aria-label="Test preparation required"
>
  <span aria-hidden="true"><!-- clock icon, 20×20 --></span>
  <div>
    <p class="banner-heading">Fasting required before collection</p>
    <p class="banner-body">Avoid food &amp; drink 8–12 hrs before your sample collection</p>
  </div>
</aside>
```

### Keyboard Support

| Key | Action |
|-----|--------|
| `Tab` | Skipped — non-interactive element |

### Screen Reader Announcements

- Announced on mount: role "note" with label "Test preparation required", followed by heading and body text
- Does not repeat on re-render unless heading or body content changes

---

## Usage Guidelines

### Do's

✅ **Do this:**
- Always show when ≥1 cart test requires preparation — even on repeat sessions
- Keep heading to the single most actionable, time-sensitive requirement
- Let body text expand naturally to 2 lines if needed — do not truncate

### Don'ts

❌ **Don't do this:**
- Don't make it dismissible — preparation instructions are safety-critical
- Don't use it for general product notes (report delivery time, packaging info)
- Don't stack multiple `PreparationAlertBanner` instances — consolidate into one

---

## Implementation Notes

**HTML element:** `<aside>` with `role="note"` — advisory content related to the main page but not part of the primary interactive flow.

**Left accent bar:** Implement as `border-left: 4px solid var(--color-state-warning)` on the root element, or as a 4px wide sibling `<div>` with `flex-shrink: 0`. The pseudo-element approach is simpler and doesn't add DOM nodes.

**TOKEN MISSING — action required:** `token.color.background.warning` does not exist in `tokens/tokens.json`. Before implementing, add it:
```json
"background": {
  "warning": { "value": "#FFF9D9", "primitive": "sunshine-yellow.97" }
}
```
Until added, use `token.color.primitive.sunshine-yellow.97` as a placeholder only — do not ship with a primitive reference.

**Content is dynamic:** The component receives `heading` (string) and `body` (string) as props — content is computed by the cart layer from preparation data across all SKUs. The component itself renders, not computes.
