# Quantity Selector — Build Cache
**Built:** 2026-05-26
**Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Dopamine_2.0_Components?node-id=2009-1697

---

## Variant Properties

| Property | Values |
|----------|--------|
| `type` | `default`, `generic` |

**Active combinations (2 structural variants):**

| type | row labels | card height | Remove footer |
|------|-----------|-------------|---------------|
| default | integers (1, 2, 3…) | 450px | visible when selection exists |
| generic | strings ("Option 1", "Option 2"…) | 313px | hidden |

---

## Spec

`specs/QuantitySelector.md`

---

## Token Police Audit

**⚠️ 2 violations — 12/14 token references resolved. 1 primitive discrepancy + 1 TOKEN MISSING.**

### ✅ Passing references (12)

| Token ID | Resolved value | Usage |
|----------|---------------|-------|
| `token.color.background.primary` | #FFFFFF | card bg + unselected row bg |
| `token.color.content.primary` | #181A1F | heading text + row label text + scrollbar color |
| `token.color.border.subtle` | #DDE2EB | header divider + bottom section divider |
| `token.color.brand.1mg` | #FF5443 | selected radio button background |
| `token.color.content.inverse` | #FFFFFF | checkmark icon inside selected radio |
| `token.color.border.high-contrast` | #868E9E | unselected radio outer ring |
| `token.shadow.1` | 0 2px 4px 0 rgba(39,43,51,0.06) | close button shadow |
| `token.radius.16` | 16px | card border-radius |
| `token.radius.full` | 9999px | radio button + close button (full circles) |
| `token.radius.4` | 4px | scrollbar border-radius |
| `token.space.24` | 24px | heading py + row px padding |
| `token.space.16` | 16px | row py padding + gap between close button and card |

### ⚠️ Primitive-only references (1)

| Token ID | Resolved value | Usage | Issue |
|----------|---------------|-------|-------|
| `token.color.primitive.sunrise-glow.95` | #FDD7C8 (tokens.json) | selected row background | Figma: `--colours/sunrise-glow/95` = #FFEDE6. tokens.json: `sunrise-glow.95` = #FDD7C8. Values differ between Figma variables and the token file. Using tokens.json as authoritative. |

### ❌ TOKEN MISSING (1)

| Figma value | Figma variable | Closest token | Gap |
|-------------|---------------|---------------|-----|
| #C50F1F | `--colours/red/10` | `token.color.state.error` (#A3111E) | No `red` palette in tokens.json (only `vital-red`). `vital-red.10` = #280305 (near-black), not a match. #C50F1F has no mapping. Flag for DS team. |

### ✅ Base state check

| State | Required fields | Status |
|-------|----------------|--------|
| `focus` (close button) | ring, ring_width, ring_offset | ✅ token.color.content.primary, 2px, 2px |
| `focus` (row) | n/a | ✅ rows are `role="option"` — focus managed by listbox |
| `focus` (remove button) | ring, ring_width, ring_offset | ✅ token.color.state.error, 2px, 2px |
| `disabled` (remove button) | opacity, pointer_events | ✅ 0.4, none |

---

## Notes

- **`sunrise-glow.95` value discrepancy.** Figma variable resolves to `#FFEDE6`; tokens.json has `#FDD7C8`. Both are warm peach tones. Use `#FDD7C8` from tokens.json until the Figma variables are resynchronised with the token file.
- **TOKEN MISSING: "Remove" text colour.** `--colours/red/10` (#C50F1F) appears in both QuantitySelector and PackOfMultiples. The `vital-red` palette in tokens.json starts at `vital-red.10` = #280305 (near-black), suggesting Figma's "red" palette may be a different palette alias. Pending DS team clarification on which token should map to destructive action text.
- **Scrollbar is custom.** `width: 4px; height: 120px; position: absolute; right: 8px; top: 8px; border-radius: 4px; background: content.primary`. Hide native scrollbar with `overflow-y: scroll; scrollbar-width: none`.
- **Radio ring is not a CSS border.** The Figma design renders the unselected radio as a 24×24px container with a 24×24px coloured background circle overlaid, then a 22×22px white inner circle — simulating a 1px ring without using `border`. Equivalent CSS: `outline: 1px solid token.color.border.high-contrast`.
- **Remove footer: `--colours/red/10`** uses a Figma palette path not present in tokens.json. The closest semantic token is `state.error` (#A3111E). Use `state.error` in implementation pending DS resolution. The visual difference from #C50F1F is minimal (slightly darker red).
