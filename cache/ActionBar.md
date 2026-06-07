# ActionBar — Build Cache
**Built:** 2026-05-25
**Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Dopamine_2.0_Components?node-id=1661-3238

---

## Variant Properties

| Property | Values |
|----------|--------|
| `section` | `standard`, `payment` |
| `layout` | `one-button`, `one-button-subtext`, `two-button`, `two-button-vertical`, `one-button-overlay-redirect`, `one-button-textual-redirect` |
| `payment.checkout` | `NOT IN USE` |

**Active combinations (6 standard + 1 deprecated):**

| variant | Notes |
|---------|-------|
| standard.one-button | Single full-width primary CTA |
| standard.one-button-subtext | Single CTA with secondary text line inside button |
| standard.two-button | Outline secondary + fill primary, side by side |
| standard.two-button-vertical | Fill primary stacked over ghost link |
| standard.one-button-overlay-redirect | Content area (count + expand) + compact CTA |
| standard.one-button-textual-redirect | Content area (price + link) + compact CTA |
| payment.checkout | ⚠️ NOT IN USE — do not implement |

---

## Spec

`specs/ActionBar.md`

---

## Token Police Audit

**✅ 0 violations — 21/21 token references resolved correctly.**

### ✅ Passing references (21)

| Token ID | Resolved value | Usage |
|----------|---------------|-------|
| `token.color.background.primary` | #FFFFFF | container background (all variants) |
| `token.color.brand.1mg` | #FF5443 | fill button bg; ghost link text; redirect link text |
| `token.color.content.inverse` | #FFFFFF | fill button label + subtext |
| `token.color.border.subtle` | #DDE2EB | outline button border |
| `token.color.content.primary` | #181A1F | count/price text in redirect content areas |
| `token.color.content.tertiary` | #868E9E | sub-label text in overlay-redirect |
| `token.color.content.secondary` | #414752 | "Pay using" text in checkout (NOT IN USE variant) |
| `token.font.family.sans` | 'Figtree', system-ui, sans-serif | all text |
| `token.font.size.body-14` | 14px | button label + subtext |
| `token.font.size.body-12` | 12px | sub-label text; redirect link |
| `token.font.size.body-16` | 16px | count/price value text |
| `token.font.size.heading-18` | 18px | "Continue" label in checkout (NOT IN USE variant) |
| `token.font.weight.bold` | 700 | button labels; count/price; redirect link |
| `token.font.weight.regular` | 400 | button subtext; sub-label |
| `token.font.weight.medium` | 500 | "Continue" label in checkout (NOT IN USE variant) |
| `token.font.line-height.20` | 20px | body-14 text |
| `token.font.line-height.24` | 24px | body-16 count/price |
| `token.font.line-height.16` | 16px | body-12 sub-label + redirect link |
| `token.font.line-height.28` | 28px | heading-18 in checkout (NOT IN USE variant) |
| `token.radius.8` | 8px | all button border radii |
| `token.space.16` | 16px | container padding (p-16 and px-16); gap (redirect variants); button px |
| `token.space.12` | 12px | container padding_y (redirect variants); button py |
| `token.space.8` | 8px | gap between two-button pair |
| `token.space.4` | 4px | gap between count value and expand icon |
| `token.space.2` | 2px | gap between button label and subtext; gap between redirect content lines |

### ✅ Base state check

| State | Required fields | Status |
|-------|----------------|--------|
| `focus` | handled by Button component | ✅ |
| `disabled` | handled by Button component | ✅ |

---

## Notes

- **ActionBar is a layout container, not a single component.** Token references are split between the container itself (bg, padding, gap) and the Button components inside. The `specs/Button.md` spec governs Button token usage — ActionBar only defines the outer shell.
- **`payment.checkout` is NOT IN USE.** Figma annotates this variant explicitly. Tokens are documented in the passing table for completeness but this variant must not be shipped without explicit design confirmation.
- **No border or shadow on the container.** Figma defines no `border-top` or `box-shadow`. The consuming app or theme layer decides whether to add a top separator. This is not part of the ActionBar component spec.
- **`min-width: 104px` on compact CTA** (redirect variants) is a raw layout value — no token equivalent. Implement as hardcoded CSS.
- **Ghost link in `two-button-vertical`** has no background, no border, and no padding token. It renders purely as bold coral text on white. Its touch target is below 44px; consuming layout must extend.
- **`token.font.size.body-16` + `token.font.line-height.24`** appear here for the first time in action bar context (price/count values). These tokens were already in `tokens.json`.
- **Carry-forward conventions** — button padding (`token.space.16` / `token.space.12`), radius (`token.radius.8`), label style (Bold 14px / lh-20) are identical to `Button/Fill/Primary` and `Button/Outline` in `specs/Button.md`.
