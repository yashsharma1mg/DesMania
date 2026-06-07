# Pack of Multiples — Build Cache
**Built:** 2026-05-26
**Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Dopamine_2.0_Components?node-id=2013-3339

---

## Variant Properties

| Property | Values |
|----------|--------|
| `state` | `default-unselected`, `default-selected`, `highlighted-text-unselected`, `highlighted-text-selected` |

**Active combinations (4 states):**

| state | selected row bg | recommended row | Remove footer |
|-------|----------------|-----------------|---------------|
| default-unselected | white | — | hidden |
| default-selected | sunrise-glow.95 | — | visible |
| highlighted-text-unselected | white (plain rows) | green gradient + "Recommended" banner | hidden |
| highlighted-text-selected | sunrise-glow.95 | green gradient + "Recommended" banner | visible |

---

## Spec

`specs/PackOfMultiples.md`

---

## Token Police Audit

**⚠️ 3 violations — 13/16 token references resolved. 2 primitive discrepancies + 1 TOKEN MISSING.**

### ✅ Passing references (13)

| Token ID | Resolved value | Usage |
|----------|---------------|-------|
| `token.color.background.primary` | #FFFFFF | card bg + unselected row bg |
| `token.color.content.primary` | #181A1F | heading text + quantity chip label + scrollbar |
| `token.color.content.secondary` | #414752 | sale price text |
| `token.color.content.tertiary` | #868E9E | strikethrough MRP text |
| `token.color.content.inverse` | #FFFFFF | discount badge text + "Recommended" label text |
| `token.color.border.subtle` | #DDE2EB | header divider + product image chip border |
| `token.color.brand.1mg` | #FF5443 | selected radio button background |
| `token.color.border.high-contrast` | #868E9E | unselected radio outer ring |
| `token.color.primitive.wellness-green.30` | #156437 | discount badge background + "10% extra discount" text |
| `token.shadow.1` | 0 2px 4px 0 rgba(39,43,51,0.06) | close button shadow |
| `token.radius.16` | 16px | card border-radius |
| `token.radius.4` | 4px | discount badge radius + scrollbar + "Recommended" banner br corner |
| `token.space.16` | 16px | card header px + modal gap |

### ⚠️ Primitive-only references (2)

| Token ID | Resolved value | Usage | Issue |
|----------|---------------|-------|-------|
| `token.color.primitive.sunrise-glow.95` | #FDD7C8 (tokens.json) | default-selected + highlighted-text-selected row bg | Figma: `--colours/sunrise-glow/95` = #FFEDE6. Same discrepancy as QuantitySelector. |
| `token.color.primitive.cool-neutral.95` | #EEF1F5 (tokens.json) | row chip background + row dashed separator | Figma: `--colours/cool-neutral/95` = #F0F2F5. Slight hex discrepancy. Use tokens.json value. |

### ❌ TOKEN MISSING (1)

| Figma value | Figma variable | Closest token | Gap |
|-------------|---------------|---------------|-----|
| #EEFFF6 | gradient endpoint in recommended row background | none | Very light green gradient target. `wellness-green.99` (#F8FFFB) is closest but not matching. Hardcode `#EEFFF6` until a token is added. |

*Also TOKEN MISSING: `--colours/red/10` (#C50F1F) for "Remove" text — same as QuantitySelector.*

### ✅ Base state check

| State | Required fields | Status |
|-------|----------------|--------|
| `focus` (close button) | ring, ring_width, ring_offset | ✅ token.color.content.primary, 2px, 2px |
| `focus` (remove button) | ring, ring_width, ring_offset | ✅ token.color.state.error, 2px, 2px |
| `disabled` | n/a | ✅ not applicable for selection rows |

---

## Notes

- **`wellness-green.30` (#156437) via Figma's `--colour-usage/states/success`.** Figma maps this alias to `#156437` = `wellness-green.30`. tokens.json's `state.success` = `#308956` (wellness-green.40). The Figma alias disagrees with the semantic token. Using the primitive `wellness-green.30` directly is the correct resolution.
- **`cool-neutral.95` Figma vs tokens.json.** Figma: `#F0F2F5`. tokens.json: `#EEF1F5`. Semantic token `token.color.background.subtle` = `#EEF1F5` (cool-neutral.95). Use `background.subtle` as the semantic reference; the row chip background is the same concept.
- **Green gradient background is TOKEN MISSING.** `background: linear-gradient(to left, white, #EEFFF6)` for recommended unselected rows. The `#EEFFF6` endpoint has no token. Hard-code until DS adds a `wellness-green.98` or equivalent.
- **"Recommended" banner is a design asset.** The gradient rectangle behind the text label is an image asset (`imgRectangle323153`). It is not a CSS gradient — import as an `<img>` or `background-image: url(...)`.
- **Product chip `border-radius: 5.333px` is a raw Figma sub-pixel value.** Round to `5px` in implementation. No token equivalent.
- **`--colours/red/10` (#C50F1F) is TOKEN MISSING.** Same as QuantitySelector — use `token.color.state.error` (#A3111E) pending DS resolution.
- **Row separator is 1px dashed**, not solid. `border-bottom: 1px dashed cool-neutral.95` — dashed style is not expressible via a token; border-color only is token-referenced.
