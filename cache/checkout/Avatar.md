# Avatar — Build Cache
**Built:** 2026-05-27
**Figma source:** https://www.figma.com/design/T96zjkCns9zCJ2oHYTPe7I/Diagnostics-Ideal-checkout — patient list rows

---

## Variant Properties

| Property | Values |
|----------|--------|
| `size` | `small` (32px), `medium` (40px), `large` (48px) |
| `type` | `image`, `initials` |

**Active combinations (6):**

| size | type | notes |
|------|------|-------|
| small | image | Compact usage |
| small | initials | Fallback |
| medium | image | Standard patient list (checkout default) |
| medium | initials | Fallback |
| large | image | Doctor cards |
| large | initials | Fallback |

---

## Spec

`../../specs/checkout/Avatar.md`

---

## Token Police Audit

**✅ 0 violations — 4/4 token references resolved correctly.**

### ✅ Passing references (4)

| Token ID | Resolved value | Usage |
|----------|---------------|-------|
| `token.radius.full` | 9999px | circular container (all sizes + types) |
| `token.color.background.subtle` | #EEF1F5 | initials fallback background |
| `token.color.content.secondary` | #414752 | initials text |
| `token.font.weight.bold` | 700 | initials typography |
| `token.font.size.body-14` | 14px | initials text (medium size) |

*(5 rows — 4 unique token IDs; font.size and font.weight are companion references)*

### ✅ Base state check

| State | Required fields | Status |
|-------|----------------|--------|
| `focus` | n/a | ✅ not applicable — Avatar is non-interactive |
| `disabled` | n/a | ✅ not applicable |

---

## Notes

- **No image border in checkout usage.** Patient avatars in the Select Patient sheet have no border ring. Do not add one speculatively.
- **Stock illustrations used as placeholder images.** The Diagnostics Checkout Figma uses gendered avatar illustrations (young female, adult female, adult male). In production, these are replaced by uploaded photos or remain as placeholder illustrations from a predefined set.
- **Size dimensions are raw values.** No layout size tokens cover 32px, 40px, or 48px in the current token scale. Implement as hardcoded CSS sizes.
- **Initials derivation rule.** Display first letter of first name + first letter of last name (e.g. "Saumya Kapoor" → "SK"). If single-name only, use first two characters.
