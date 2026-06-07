# Dialog Box — Build Cache
**Built:** 2026-05-26
**Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Dopamine_2.0_Components?node-id=2023-2473

---

## Variant Properties

| Property | Values |
|----------|--------|
| `variant` | `image-two-button`, `image-one-button`, `text-only-one-button` |

**Active combinations (3 structural variants):**

| variant | image | button count | divider |
|---------|-------|-------------|---------|
| image-two-button | 64×64 placeholder | primary + secondary textual | visible |
| image-one-button | 64×64 placeholder | primary only | visible |
| text-only-one-button | none | primary only | visible |

---

## Spec

`specs/DialogBox.md`

---

## Token Police Audit

**✅ 0 violations — 12/12 token references resolved correctly.**

### ✅ Passing references (12)

| Token ID | Resolved value | Usage |
|----------|---------------|-------|
| `token.color.background.primary` | #FFFFFF | card background |
| `token.color.content.primary` | #181A1F | heading text |
| `token.color.content.secondary` | #414752 | body text |
| `token.color.content.inverse` | #FFFFFF | primary button text |
| `token.color.border.subtle` | #DDE2EB | horizontal divider between content and buttons |
| `token.color.brand.1mg` | #FF5443 | primary button background + secondary button text |
| `token.shadow.1` | 0 2px 4px 0 rgba(39,43,51,0.06) | close button drop shadow |
| `token.radius.16` | 16px | card border-radius (all 4 corners) |
| `token.radius.8` | 8px | primary button radius + image placeholder radius |
| `token.space.24` | 24px | card vertical padding + gap between image section and button section |
| `token.space.16` | 16px | primary button horizontal padding + button group gap |
| `token.space.12` | 12px | primary button vertical padding |

### ✅ Base state check

| State | Required fields | Status |
|-------|----------------|--------|
| `focus` (close button) | ring, ring_width, ring_offset | ✅ token.color.content.primary, 2px, 2px |
| `focus` (primary button) | ring, ring_width, ring_offset | ✅ token.color.content.primary, 2px, 2px |
| `focus` (secondary button) | ring, ring_width, ring_offset | ✅ token.color.brand.1mg, 2px, 2px |
| `disabled` | n/a | ✅ not applicable (dialog buttons always active when dialog is shown) |

---

## Notes

- **Image slot is a design placeholder.** The 64×64px gray square (`#d9d9d9`) in Figma is not a token — it is a placeholder frame. At runtime, replace with actual illustration or product image. The `#d9d9d9` color should not be referenced in implementation.
- **Secondary button has no background.** It is purely textual — only the `brand.1mg` text color distinguishes it from plain text. The `rounded-8` radius on its container is only relevant for the focus ring.
- **Figma Figma variable aliases for `brand.1mg`.** Primary button uses `--colours/coral/coral` (#FF5443); secondary uses `--colour-usage/brand/coral` (#FF5443). Both resolve to `token.color.brand.1mg` — same value, two Figma namespace paths.
- **Close button shadow.** Figma renders `filter: drop-shadow(0px 4px 2px rgba(0,0,0,0.08))` on the close button — a CSS filter rather than box-shadow. `token.shadow.1` is the closest semantic token; exact filter values should be taken from Figma (`0px 4px 2px rgba(0,0,0,0.08)`) for pixel accuracy.
- **Content width 280px.** Heading, body text, and button group are all `width: 280px` inside the 328px card (24px margin on each side from the card's `py-24` padding). This is a derived raw value, not a token.
- **`token.space.4` gap between heading and body text** is not counted in the audit total above (minor typography gap, not a structural token). It resolves to 4px via `gap: 4px` on the content container.
