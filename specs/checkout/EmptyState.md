# EmptyState

**Source:** Diagnostics Ideal Checkout — "No template found" empty state frame
**Status:** New component

---

## Overview

A centred content block displayed when a list or search has no results. Contains an illustration, a heading, and an optional body message. Used for zero-result states (e.g., no patient template found, no available slots).

---

## Variant Properties

| Property | Values |
|----------|--------|
| `show_body` | `true`, `false` |
| `show_cta` | `true`, `false` |

---

## Anatomy

```
        [illustration]

       No template found

  We couldn't find any matches.
  Try a different search term.

       [ Try again ]        ← optional CTA
```

- **Illustration** — decorative image asset (context-specific per empty state)
- **Heading** — short message ("No template found")
- **Body** — optional 1–2 line explanation
- **CTA** — optional `Button` (outlined or filled, context-dependent)

---

## Dimensions

| Property | Value | Token |
|----------|-------|-------|
| Container alignment | centred horizontally + vertically | — |
| Illustration size | 120×120px | — (raw) |
| Gap: illustration to heading | 24px | `token.space.24` |
| Gap: heading to body | 8px | `token.space.8` |
| Gap: body to CTA | 24px | `token.space.24` |
| Horizontal padding | 32px | `token.space.32` |

---

## Tokens

| Element | Token | Value |
|---------|-------|-------|
| Heading font-size | `token.font.size.body-16` | 16px (or `title-16`) |
| Heading font-weight | `token.font.weight.bold` | 700 |
| Heading line-height | `token.font.line-height.24` | 24px |
| Heading color | `token.color.content.primary` | #181A1F |
| Heading text-align | center | — |
| Body font-size | `token.font.size.body-14` | 14px |
| Body font-weight | `token.font.weight.regular` | 400 |
| Body line-height | `token.font.line-height.20` | 20px |
| Body color | `token.color.content.secondary` | #414752 |
| Body text-align | center | — |
| Font family | `token.font.family.sans` | 'Figtree', system-ui, sans-serif |

---

## Accessibility

- Root: `role="status"` or `role="region"`, `aria-label="No results"`
- Illustration: `aria-hidden="true"`
- CTA: existing `Button` accessibility applies
