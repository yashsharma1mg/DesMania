# AccordionCard — Spec

> **Figma source:** https://www.figma.com/design/T96zjkCns9zCJ2oHYTPe7I/Diagnostics-Ideal-checkout — Select Patient bottom sheet
> **Component family:** Containers / Disclosure
> **Status:** Draft

---

## Prompt Match

```yaml
prompts:
  - "accordion"
  - "accordion card"
  - "collapsible"
  - "expander"
  - "collapse card"
  - "expandable section"
  - "test accordion"
```

---

## Description

AccordionCard is a collapsible card used to group content under a tappable header. In the diagnostics checkout, each test SKU in the Select Patient sheet is an AccordionCard: collapsed by default, expanded to reveal a list of patients to select for that test.

The header shows the test name, a sublabel indicating how many patients to select, and a chevron. In the selected state, the sublabel is replaced by the chosen patient names + a green success indicator.

### When to use

- Grouping patient selection per test SKU in a multi-test cart
- Any collapsible section with a title + sublabel header

### When NOT to use

- Single-level disclosures without a sublabel — use a simple Chip or toggle
- Full-page accordions — use VerticalTabs

---

## Anatomy

### Collapsed (default)

```
┌──────────────────────────────────────────────────┐
│ Fever Package Extensive (includes…        ⌄      │  ← title (14px Bold) + chevron
│ Select 2 patient                                  │  ← sublabel (12px Regular)
└──────────────────────────────────────────────────┘
```

### Collapsed (selected)

```
┌──────────────────────────────────────────────────┐
│ Fever Package Extensive (includes…        ⌄  ✓   │  ← title + chevron + success tick
│ Saumya, Kirti                                     │  ← selected names sublabel
└──────────────────────────────────────────────────┘
```

### Expanded

```
┌──────────────────────────────────────────────────┐
│ Fever Package Extensive (includes…        ⌃      │  ← chevron-up
│ Select 2 patient                                  │
├──────────────────────────────────────────────────┤
│  [Avatar] Saumya         Female, 26 | Edit  [□]  │  ← PatientListItem rows
│  [Avatar] Kirti          Female, 26 | Edit  [□]  │
│  [Avatar] Rahul Mehta    Male, 55   | Edit  [□]  │
├──────────────────────────────────────────────────┤
│  View all                       + Add new patient │  ← footer CTA row
└──────────────────────────────────────────────────┘
```

---

## Variants

### accordion-card.collapsed-unselected

```yaml
accordion-card.collapsed-unselected:
  description: Header only, no selections made yet.
  content: hidden
  footer: hidden
  success_indicator: absent
  sublabel: "Select N patient[s]"
```

### accordion-card.collapsed-selected

```yaml
accordion-card.collapsed-selected:
  description: Header only, selection complete.
  content: hidden
  footer: hidden
  success_indicator: visible (green checkmark, wellness-green.30)
  sublabel: comma-separated selected patient names
```

### accordion-card.expanded

```yaml
accordion-card.expanded:
  description: Content slot and footer are visible.
  content: PatientListItem rows (scrollable if overflow)
  footer:
    view_all: visible if saved patients > visible rows (default shows max 3–5 rows)
    add_new_patient: always visible
  chevron: up
```

---

## Tokens

```yaml
accordion-card:
  container:
    bg: token.color.background.primary     # #FFFFFF
    border: 1px solid token.color.border.subtle  # #DDE2EB
    radius: token.radius.8                 # 8px
    width: fill
    overflow: hidden

  header:
    padding_horizontal: token.space.16     # 16px
    padding_vertical: token.space.12       # 12px
    display: flex
    flex_direction: row
    align_items: flex-start
    gap: token.space.8                     # 8px gap between text block and icons

  title:
    color: token.color.content.primary     # #181A1F
    font_family: token.font.family.sans
    font_size: token.font.size.body-14     # 14px
    font_weight: token.font.weight.bold    # 700
    line_height: token.font.line-height.20  # 20px
    max_lines: 1                           # truncate with ellipsis

  sublabel:
    color: token.color.content.secondary   # #414752
    font_size: token.font.size.body-12     # 12px
    font_weight: token.font.weight.regular  # 400
    line_height: token.font.line-height.16  # 16px
    max_lines: 1                           # truncate if names overflow

  chevron:
    size: 20px × 20px                      # raw
    color: token.color.content.tertiary    # #868E9E
    rotation_collapsed: 0deg               # chevron-down
    rotation_expanded: 180deg             # chevron-up (CSS transform)

  success_indicator:
    icon: checkmark circle / check
    size: 16px × 16px                      # raw
    color: token.color.primitive.wellness-green.30  # #156437
    margin_left: token.space.4             # 4px gap from chevron

  divider:
    height: 1px
    color: token.color.border.subtle       # #DDE2EB
    position: between header and content when expanded

  content_slot:
    padding: 0                             # PatientListItem carries its own px-16 py-8

  footer:
    padding_horizontal: token.space.16     # 16px
    padding_vertical: token.space.12       # 12px
    display: flex
    flex_direction: row
    justify_content: space-between
    border_top: 1px solid token.color.border.subtle

  footer_view_all:
    color: token.color.brand.1mg           # #FF5443
    font_size: token.font.size.body-14     # 14px
    font_weight: token.font.weight.regular  # 400

  footer_add_new:
    color: token.color.brand.1mg           # #FF5443
    font_size: token.font.size.body-14     # 14px
    font_weight: token.font.weight.regular  # 400
```

---

## States

```yaml
focus:
  ring: token.color.content.primary
  ring_width: 2px
  ring_offset: 2px
  applied_to: header row (the interactive tap target)

expanded:
  chevron: rotated 180deg
  content_slot: visible (height: auto)

collapsed:
  chevron: 0deg
  content_slot: height: 0 + overflow: hidden
```

---

## Accessibility

```html
<div class="accordion-card">
  <button
    class="accordion-header"
    aria-expanded="false"
    aria-controls="accordion-content-1"
    id="accordion-header-1"
  >
    <div class="text-block">
      <span class="title">Fever Package Extensive (includes…</span>
      <span class="sublabel">Select 2 patients</span>
    </div>
    <span class="icon-group" aria-hidden="true">
      <!-- chevron icon -->
      <!-- success check (visible only when selected) -->
    </span>
  </button>

  <div
    id="accordion-content-1"
    role="region"
    aria-labelledby="accordion-header-1"
    hidden    <!-- toggle hidden attribute to show/hide -->
  >
    <ul role="listbox" aria-multiselectable="true">
      <!-- PatientListItem rows -->
    </ul>
    <div class="accordion-footer">
      <button>View all</button>
      <button>+ Add new patient</button>
    </div>
  </div>
</div>
```

- `aria-expanded` on the header button reflects current state
- Content region uses `aria-labelledby` to reference the header
- Toggle via `hidden` attribute (not CSS `display:none`) for AT compatibility
- The success checkmark is decorative (`aria-hidden="true"`)

---

## Animation

```yaml
expand:
  duration: 200ms              # within the 300ms functional-motion limit from AccessibilityGuidelines
  easing: ease-in-out
  property: height (0 → auto via max-height trick)
  
chevron:
  duration: 200ms
  property: transform rotate (0 → 180deg)
```

---

## Implementation Notes

**Max rows before scroll.** The Figma design shows a fixed AccordionCard height showing ~3–4 patient rows. For longer lists (7+ patients), the accordion body should scroll internally (`overflow-y: auto`, `max-height: ~224px` = 4 × 56px PatientListItem). The "View all" footer CTA provides an escape for very long lists.

**Multi-accordion.** In the multi-SKU checkout, multiple AccordionCards stack vertically in the Select Patient sheet. Only one need be open at a time (exclusive expand), though the design does not explicitly forbid multiple open simultaneously. Default to exclusive expand.

**Sublabel truncation.** Selected patient names in the collapsed sublabel (`"Saumya, Kirti"`) should truncate at max one line with ellipsis if names are long.
