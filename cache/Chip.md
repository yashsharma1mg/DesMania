# Chip — Build Cache
**Built:** 2026-05-25
**Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Dopamine_2.0_Components?node-id=1682-4434

---

## Variant Properties

| Property | Values |
|----------|--------|
| `sub_type` | `selection`, `filter`, `small`, `timestamp-date`, `timestamp-time` |
| `state` | `default`, `selected`, `disable`, `selected-disable`, `selected-badge` |
| `icon_position` | `none`, `leading`, `trailing` (selection + filter only) |

**Active combinations (15 total):**

| sub_type | state | Notes |
|----------|-------|-------|
| selection | default | White + border, primary text, optional icon |
| selection | disable | White + border, TOKEN MISSING text (#626A7A) |
| selection | selected | Dark bg (primitive), white bold text |
| selection | selected-disable | Moderate bg, TOKEN MISSING text (#626A7A) |
| selection | selected-badge | Dark bg + red badge overlay, count label |
| filter | default | White + border, primary text, optional leading icon |
| filter | selected | Dark bg, white bold text + trailing close icon |
| filter | disable | White + border, TOKEN MISSING text (#626A7A) |
| filter | selected-disable | Moderate bg, TOKEN MISSING text (#626A7A) |
| small | default | White + border, 14px regular text |
| small | selected | Dark bg (primitive), 14px bold white text |
| timestamp-date | unselected | White bg, no border, 12px medium, 56px fixed width |
| timestamp-date | selected | TOKEN MISSING bg (#FFFBFA), brand border + text |
| timestamp-time | unselected | White + border, 12px medium, wider padding |
| timestamp-time | selected | TOKEN MISSING bg (#FFFBFA), brand border + text |

---

## Spec

`specs/Chip.md`

---

## Token Police Audit

**✅ 0 violations — 25/25 token references resolved correctly.**

### ✅ Passing references (25)

| Token ID | Resolved value | Usage |
|----------|---------------|-------|
| `token.color.background.primary` | #FFFFFF | selection/filter/small/timestamp default + disable backgrounds |
| `token.color.background.moderate` | #DDE2EB | selection.selected-disable + filter.selected-disable backgrounds |
| `token.color.content.primary` | #181A1F | chip label default state |
| `token.color.content.inverse` | #FFFFFF | chip label on all dark (selected) states; badge label; close icon |
| `token.color.border.subtle` | #DDE2EB | chip default + disable borders; timestamp-time.unselected border |
| `token.color.border.high-contrast` | #868E9E | focus ring |
| `token.color.brand.1mg` | #FF5443 | badge dot bg; timestamp selected border + foreground |
| `token.color.primitive.cool-neutral.10` | #181A1F | selected bg on selection, filter, small (approved primitive exception — same as Button/StepperButton/IconButton) |
| `token.color.primitive.cool-neutral.50` | #626A7A | disabled text on all disable variants (primitive exception — no semantic content token covers cool-neutral.50) |
| `token.color.primitive.sunrise-glow.99` | #FFFBFA | timestamp selected bg (primitive exception — no semantic background token covers this tinted brand surface) |
| `token.font.family.sans` | 'Figtree', system-ui, sans-serif | all text |
| `token.font.size.body-12` | 12px | selection/filter/timestamp chip labels |
| `token.font.size.body-14` | 14px | small chip label |
| `token.font.size.tag-11` | 11px | badge count label |
| `token.font.weight.regular` | 400 | chip label unselected |
| `token.font.weight.medium` | 500 | timestamp text; badge label |
| `token.font.weight.bold` | 700 | chip label selected |
| `token.font.line-height.16` | 16px | body-12 text line height; tag-11 line height |
| `token.font.line-height.20` | 20px | body-14 (small chip) line height |
| `token.space.4` | 4px | icon gap; small chip padding_y |
| `token.space.8` | 8px | selection/filter chip padding_y |
| `token.space.12` | 12px | all chip padding_x; timestamp-time padding_y |
| `token.space.16` | 16px | timestamp-time padding_x |
| `token.radius.16` | 16px | all chip border radius |
| `token.radius.full` | 9999px | badge shape (circle) |

### ✅ Base state check

| State | Required fields | Status |
|-------|----------------|--------|
| `focus` | ring, ring_width, ring_offset | ✅ all present |
| `disabled` | opacity, pointer_events | ✅ all present |

---

## Notes

- **Disabled text uses `token.color.primitive.cool-neutral.50` (#626A7A)** across all four disable variants — no semantic content token covers cool-neutral.50. This is deliberately darker than `content.disabled` (#868E9E / cool-neutral.60); do not substitute. Same primitive-exception treatment as the dark selected background.
- **Timestamp selected background uses `token.color.primitive.sunrise-glow.99` (#FFFBFA)** — no semantic background token covers this tinted brand surface. Primitive exception documented in spec.
- **All "selected" states across chip sub-types share `token.color.primitive.cool-neutral.10`** — consistent with the approved primitive exception pattern in Button (fill.secondary), StepperButton (filled), and IconButton (special-button).
- **`small` chip uses `token.font.size.body-14` (14px), not body-12.** The "small" designation refers to the reduced padding (py-4 vs py-8), not a smaller font size. This is counter-intuitive; verify with design team if the size token is intentional.
- **`timestamp-date` fixed width of 56px is a raw layout value.** No `token.space.56` exists in the scale. Implement as hardcoded CSS until a layout token scale is introduced.
- **Badge overlay on `selection.selected-badge` is absolutely positioned** — chip container requires `position: relative`. No token governs this structural concern.
- **Touch targets below 44px WCAG minimum across all sub-types.** Standard chips reach only 32px height; small chips 28px; timestamp-time ~40px. All consuming layouts must extend tap areas.
- **`aria-pressed` vs `aria-selected` context-sensitivity** — standalone chips use `aria-pressed`; chips inside `role="listbox"` should switch to `aria-selected`. Implementation must handle both cases.
