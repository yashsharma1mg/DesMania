# IconButton — Build Cache
**Built:** 2026-05-25
**Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Dopamine_2.0_Components?node-id=4028-600

---

## Variant Properties

| Property | Values |
|----------|--------|
| `type` | `Add`, `Added`, `Special button`, `FAB` |
| `state` | `Default`, `Disable`, `Single Added` |

**Active combinations (7 total):**

| type | state | Notes |
|------|-------|-------|
| Add | Default | White + border, red icon |
| Add | Disable | White + border, gray icon |
| Add | Single Added | Red bg, tick icon |
| Added | Default | Red pill, count + chevron |
| Added | Disable | Gray pill, count + chevron |
| Special button | Default | Dark pill, text label |
| FAB | Default | Light gray squircle, 20px icon |

No Disable state defined for Special button or FAB. No Single Added state for Added or FAB.

---

## Spec

`specs/IconButton.md`

---

## Token Police Audit

**⚠️ 2 violations — 23/25 token references resolved correctly.**

### ✅ Passing references (23)

| Token ID | Resolved value | Usage |
|----------|---------------|-------|
| `token.color.brand.1mg` | #FF5443 | add.default icon; add.single-added bg; added.default bg |
| `token.color.background.primary` | #FFFFFF | add.default + add.disable bg |
| `token.color.background.subtle` | #EEF1F5 | fab.default bg |
| `token.color.content.inverse` | #FFFFFF | foreground on all coloured bg |
| `token.color.content.primary` | #181A1F | fab icon color |
| `token.color.content.disabled` | #868E9E | add.disable icon |
| `token.color.border.subtle` | #DDE2EB | add.default + add.disable border |
| `token.color.border.high-contrast` | #868E9E | focus ring |
| `token.color.primitive.cool-neutral.10` | #181A1F | special-button bg (approved primitive exception) |
| `token.shadow.1` | 0 2px 4px 0 rgba(39,43,51,0.06) | added.default + added.disable elevation (Foundation Level 1) |
| `token.shadow.2` | 0 4px 12px 0 rgba(39,43,51,0.08) | add.default + add.disable + add.single-added elevation (Foundation Level 2) |
| `token.space.2` | 2px | FAB padding composite |
| `token.space.4` | 4px | added padding_y + gap |
| `token.space.8` | 8px | add padding; added padding_x; FAB padding composite |
| `token.space.12` | 12px | special-button padding_x |
| `token.radius.8` | 8px | add, added, special-button radius |
| `token.font.family.sans` | 'Figtree', system-ui, sans-serif | both type scales |
| `token.font.size.body-14` | 14px | added count |
| `token.font.size.body-12` | 12px | special-button label |
| `token.font.weight.bold` | 700 | added count |
| `token.font.weight.regular` | 400 | special-button label |
| `token.font.line-height.16` | 16px | special-button label |
| `token.font.line-height.20` | 20px | added count |

### 🚨 TOKEN MISSING (2 remaining)

1. **`added.disable` → background** — Figma value `#868E9E`. Used here as a container background. The only tokens with this value are `token.color.content.disabled` and `token.color.content.tertiary` — both are content-role tokens, not background tokens. No `token.color.background.*` covers this value.
   - **Resolution path:** Add `token.color.background.disabled` → `#868E9E`, or confirm whether `token.color.background.moderate` (#DDE2EB) should be used instead for consistency with Button's disabled treatment.

2. **`fab.default` → radius** — Figma value `20px`. No `token.radius.20` in the scale (valid values: 0, 2, 4, 8, 12, 16, 24, full). On a 40×40px container, 20px = circle.
   - **Resolution path:** If circle is the confirmed intent, use `token.radius.full`. If a precise squircle at 20px is needed, add `token.radius.20` to the token scale and `tokens/token-structure.md`.

### ✅ Base state check

| State | Required fields | Status |
|-------|----------------|--------|
| `focus` | ring, ring_width, ring_offset | ✅ all present |
| `disabled` | opacity, pointer_events | ✅ all present |

---

## Notes

- **`added.disable` background is the most impactful missing token.** Using #868E9E as a background is inconsistent with the disabled bg pattern established in Button (`token.color.background.moderate` = #DDE2EB). Flag for design team review — likely either a design inconsistency or an intentional darker disabled treatment unique to the compact pill format.
- **Shadow tokens confirmed from Foundation file (Dopamine-2.0-Foundation, node 8236:1959).** All 4 shadow tokens verified: `token.shadow.1` (Level 1), `token.shadow.1-iy` (Level 1 iY), `token.shadow.2` (Level 2), `token.shadow.2-iy` (Level 2 iY). Foundation values added as `figma_level` metadata in `tokens/tokens.json`. Shadow references in this spec now resolved — `token.shadow.2` for Add group, `token.shadow.1` for Added group. Figma component file uses slightly different blur values (2px) from Foundation (4px/12px); Foundation is source of truth.
- **FAB radius confirm needed.** 20px on a 40×40px container = circle. `token.radius.full` is the likely correct token once intent is confirmed with design team.
- **`special-button` bg carries the same primitive exception as Button/fill.secondary** (`token.color.primitive.cool-neutral.10`). Both approved.
- **`Add` 32px visual size is below WCAG 44px touch target.** Consuming layouts must extend tap area to 44×44px. Same for FAB (40px) and Special button (~24px height).
- **Carries forward established precedents:** medium `padding_y` composite (`token.space.8 + token.space.2`), primitive exception for `#181A1F`, no hover treatment, no min-width enforcement.
