# PreparationAlertBanner — Build Cache
**Built:** 2026-05-28
**Figma source:** New component — no Figma node yet (to be created in Diagnostics Ideal Checkout file)

---

## Variant Properties

| Property | Values |
|----------|--------|
| (none) | Display-only, no interactive variants |

---

## Spec

`../../specs/checkout/PreparationAlertBanner.md`

---

## Token Police Audit

- ✅ 9/10 token references resolve correctly
- 🚨 TOKEN MISSING: `token.color.background.warning` — not found in tokens.json. Required for banner background. Recommended value: `sunshine-yellow.97` (#FFF9D9). Add under `color.background.warning` in `tokens/tokens.json` before implementing.

### ✅ Passing references (9)

| Token ID | Resolved value | Usage |
|----------|---------------|-------|
| `token.color.state.warning` | #BF9514 | accent bar + icon color |
| `token.color.content.primary` | #181A1F | heading text |
| `token.color.content.secondary` | #414752 | body text |
| `token.space.16` | 16px | horizontal padding |
| `token.space.12` | 12px | vertical padding + gap icon→text |
| `token.radius.8` | 8px | border-radius |
| `token.font.size.body-14` | 14px | heading |
| `token.font.size.body-12` | 12px | body |
| `token.font.weight.bold` | 700 | heading |
| `token.font.weight.regular` | 400 | body |
| `token.font.line-height.20` | 20px | heading |
| `token.font.line-height.16` | 16px | body |
| `token.font.family.sans` | Figtree | all text |

### ✅ Base state check

| State | Required fields | Status |
|-------|----------------|--------|
| `focus` | n/a | ✅ not applicable — display-only component |
| `disabled` | n/a | ✅ not applicable |

---

## Notes

- **TOKEN MISSING action:** `token.color.background.warning` must be added to `tokens/tokens.json` before this component ships. Primitives (`sunshine-yellow.97`) must not be used directly in implementation.
- **No Figma source yet.** This component needs to be created in the Diagnostics Ideal Checkout Figma file as a new component frame. Figma creation is the next step after spec approval.
- **Relation to SavingsBanner.** Both are full-width informational banners in the Cart. `SavingsBanner` uses a teal gradient (no DS semantic bg token — raw hex `#208376`). `PreparationAlertBanner` should use `background.warning` once added. These are visually distinct and should never appear adjacent without the 8px section divider between them.
- **Relation to LabTestCard prep section.** This banner provides the cart-level summary. LabTestCard inline preparation provides the per-test detail. They carry different but complementary information — the banner is "you need to prepare", the card detail is "here's exactly what to do."
