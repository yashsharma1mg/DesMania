# Horizontal Tabs — Build Cache
**Built:** 2026-05-25
**Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Dopamine_2.0_Components?node-id=1897-4036

---

## Variant Properties

| Property | Values |
|----------|--------|
| `mode` | `standard`, `highlighted` |
| `content` (standard) | `text-only`, `image-single-text`, `image-double-text` |
| `content` (highlighted) | `text-only`, `icon-content` |
| `state` (per tab item) | `default`, `selected` |

**Active combinations (7 tab-level variants):**

| mode | content | state | Notes |
|------|---------|-------|-------|
| standard | text-only | default | Regular label, transparent indicator |
| standard | text-only | selected | Bold label, content.primary indicator |
| standard | image-single-text | default / selected | 64px circle image + label; selected = bold + indicator |
| standard | image-double-text | default / selected | Same but label wraps to 2 lines, h=116px |
| highlighted | text-only | default | background.secondary pill, medium label, cool-neutral.40 text |
| highlighted | text-only | selected | content.primary fill, inverse text, bold |
| highlighted | icon-content | default / selected | 32px image + title + subtext; selected = dark fill, all text inverse |

---

## Spec

`specs/HorizontalTabs.md`

---

## Token Police Audit

**✅ 0 violations — 25/25 token references resolved correctly.**

### ✅ Passing references (25)

| Token ID | Resolved value | Usage |
|----------|---------------|-------|
| `token.color.content.primary` | #181A1F | standard tab label (all states); selected indicator bar; highlighted selected atom bg |
| `token.color.content.inverse` | #FFFFFF | highlighted selected atom text (all content types) |
| `token.color.content.secondary` | #414752 | icon+content default subtext |
| `token.color.background.primary` | #FFFFFF | standard tab bar container background |
| `token.color.background.secondary` | #F0F2F5 | standard image circle bg; highlighted bar container bg; highlighted default atom bg; icon+content container bg |
| `token.color.border.subtle` | #DDE2EB | icon+content tab image container background (both atom states) |
| `token.color.primitive.cool-neutral.0` | #000000 | icon+content default atom title (see note) |
| `token.color.primitive.cool-neutral.40` | #4E5665 | highlighted simple default atom label (see Poppins note) |
| `token.font.family.sans` | 'Figtree', system-ui, sans-serif | all tab text (standardised) |
| `token.font.size.body-14` | 14px | standard tab labels; highlighted simple tab text |
| `token.font.size.body-16` | 16px | icon+content tab title |
| `token.font.size.tag-11` | 11px | icon+content tab subtext |
| `token.font.weight.regular` | 400 | default standard tab label; icon+content subtext |
| `token.font.weight.bold` | 700 | selected standard tab label; highlighted selected text; icon+content title |
| `token.font.weight.medium` | 500 | highlighted simple default atom label |
| `token.font.line-height.20` | 20px | body-14 text |
| `token.font.line-height.24` | 24px | body-16 icon+content title |
| `token.font.line-height.16` | 16px | tag-11 icon+content subtext |
| `token.space.4` | 4px | tab item gap (content → indicator slot); indicator height; icon+content container padding; icon+content atom py; icon+content image-text gap |
| `token.space.8` | 8px | icon+content atom px; icon+content image container padding |
| `token.space.12` | 12px | standard tab bar gap between tabs; text-only tab padding_x |
| `token.space.16` | 16px | standard tab bar horizontal padding; highlighted simple atom padding_x |
| `token.space.20` | 20px | image icon centering offset in standard tabs (derived: (64−24)/2 = 20px) |
| `token.radius.full` | 9999px | standard image circle container (Figma: 40px on 64px = circle); icon+content container pill; icon+content atom pill; icon+content image container |
| `token.radius.24` | 24px | highlighted simple tab bar container + atom border-radius |

### ✅ Base state check

| State | Required fields | Status |
|-------|----------------|--------|
| `focus` | ring, ring_width, ring_offset | ✅ all present (`token.color.content.primary`, 2px, 2px) |
| `disabled` | n/a | ✅ not defined in Figma — documented in spec |

---

## Notes

- **Accent color is configurable.** The Figma design note explicitly states: "the colour of the select + default tab state (text+bar) can be any hex code from the DS." Implementation must expose an `accentColor` prop; `token.color.content.primary` is the Figma default.
- **Poppins inconsistency in highlighted simple default.** Figma uses `Poppins:Medium` + #4E5665 (`cool-neutral.40`) for the unselected highlighted tab atom. Poppins is not in the Dopamine 2.0 font token system. Standardized on `token.font.family.sans` (Figtree) + `token.font.weight.medium`. Font is flagged for Figma correction; the `cool-neutral.40` color is a valid primitive reference and documented as such.
- **`token.color.primitive.cool-neutral.0` (#000000) vs `content.primary` (#181A1F).** The icon+content default tab title uses pure black. This is slightly darker than content.primary and may be a Figma authoring nuance. Consider aligning to `content.primary` in implementation for semantic consistency.
- **Image-single-text selected label weight inconsistency.** Figma renders the selected single-image tab label as Regular weight (same as default). This is inconsistent with text-only and double-text selected (both Bold). Standardized on `font.weight.bold` for all selected states.
- **`token.color.background.secondary` covers multiple Figma variable names.** `--background/background-secondary`, `--colour-usage/outline/thick-divider`, and `--colour-usage/background/low-contrast` all resolve to #F0F2F5. All mapped to a single semantic token.
- **Bottom separator is a layout concern.** The 1px divider line visible below the standard tab bar is a separate Figma section element, not inside the component. Consuming layouts apply `border-bottom: 1px solid token.color.border.subtle` on the tab bar container.
