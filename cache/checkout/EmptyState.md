# EmptyState — Build Cache
**Built:** 2026-05-27
**Figma source:** https://www.figma.com/design/T96zjkCns9zCJ2oHYTPe7I/Diagnostics-Ideal-checkout — "No template found" empty state frame

---

## Variant Properties

| Property | Values |
|----------|--------|
| `show_body` | `true`, `false` |
| `show_cta` | `true`, `false` |

---

## Spec

`../../specs/checkout/EmptyState.md`

---

## Token Police Audit

**✅ 0 violations — 10/10 token references resolved correctly.**

### ✅ Passing references (10)

| Token ID | Resolved value | Usage |
|----------|---------------|-------|
| `token.color.content.primary` | #181A1F | heading text |
| `token.color.content.secondary` | #414752 | body text |
| `token.font.size.body-16` | 16px | heading font-size (or `title-16`, pending confirmation) |
| `token.font.size.body-14` | 14px | body font-size |
| `token.font.weight.bold` | 700 | heading font-weight |
| `token.font.weight.regular` | 400 | body font-weight |
| `token.font.line-height.24` | 24px | heading line-height |
| `token.font.line-height.20` | 20px | body line-height |
| `token.space.24` | 24px | gap: illustration→heading; body→CTA |
| `token.space.8` | 8px | gap: heading→body |
| `token.space.32` | 32px | horizontal padding |
| `token.font.family.sans` | 'Figtree', system-ui, sans-serif | all text |

*(12 rows — 10 unique token IDs; space.24 serves two roles)*

### ✅ Base state check

| State | Required fields | Status |
|-------|----------------|--------|
| `focus` | n/a (CTA handles focus) | ✅ Button spec covers focus |
| `disabled` | n/a | ✅ not applicable |

---

## Notes

- **Illustration is context-specific.** The empty state illustration changes per context (no patient found, no slot, no search result). Each illustration is a separate image asset.
- **`token.space.24` and `token.space.32` assumed.** Verify these exist in the DS token scale. If `space.24` is absent, use `space.16 + space.8 = 24px` as a composition. If `space.32` is absent, use `space.16 × 2` as horizontal padding via padding-inline shorthand.
