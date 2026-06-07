# SummaryRow — Spec

> **Figma source:** https://www.figma.com/design/T96zjkCns9zCJ2oHYTPe7I/Diagnostics-Ideal-checkout — Booking Details + Select Slot sheets
> **Component family:** Lists / Data Display
> **Status:** Draft

---

## Prompt Match

```yaml
prompts:
  - "summary row"
  - "booking detail row"
  - "info row with change"
  - "detail row"
  - "address row"
  - "patient summary row"
  - "collection slot row"
```

---

## Description

SummaryRow is a data display row that shows a summary item (address, patient, slot) with a leading icon, a label/value pair, and an optional "Change ›" CTA on the right. It appears in the Select Slot and Booking Details sheets to give users a contextual overview of their current selections, each editable via the "Change" link.

### When to use

- Displaying confirmed selections with an option to change them (address, patient, slot)
- Pre-payment review rows in Booking Details

### When NOT to use

- Plain data display without a "Change" action → use a simple label/value row
- Interactive controls → use a form field or toggle instead

---

## Anatomy

```
┌──────────────────────────────────────────────────────┐
│  [🏠]   Sample collection address    Change  ›       │
│         Rail Vihar, Sec.15 part 2                    │
└──────────────────────────────────────────────────────┘
   40×40                                    "Change" + icon
  leading icon                               right edge
  height: 68px per row
```

---

## Variants

### summary-row.with-change

```yaml
summary-row.with-change:
  description: Row shows an editable selection with a "Change ›" CTA.
  cta: "Change" text + Chevron Right icon
  cta_visible: true
```

### summary-row.read-only

```yaml
summary-row.read-only:
  description: Row shows a confirmed value without an edit option.
  cta: absent
```

---

## Token values by context

Three rows appear in the checkout:

| Row | Leading icon | Label | Value |
|-----|-------------|-------|-------|
| Sample collection address | 🏠 address icon (pink-tinted circle bg) | "Sample collection address" | Street address, 2 lines |
| Patient | Patient Avatar (40×40) | "Patient" | Patient full name |
| Sample collection slot | 📅 calendar icon (purple-tinted circle bg) | "Sample collection slot" | "Today, 7:00–8:00 AM" |

---

## Tokens

```yaml
summary-row:
  container:
    bg: token.color.background.primary       # #FFFFFF
    border: 1px solid token.color.border.subtle  # #DDE2EB
    radius: token.radius.8                   # 8px
    padding_horizontal: token.space.16       # 16px
    padding_vertical: token.space.12         # 12px — results in ~68px height
    display: flex
    flex_direction: row
    align_items: center
    gap: token.space.12                      # 12px gap between icon and text block

  leading_icon:
    container_size: 40px × 40px              # raw
    radius: token.radius.full               # circular container
    # background tint is icon-specific (not a token — using asset illustration/icon)
    # address icon uses a light pink circle
    # calendar icon uses a light purple circle
    icon_size: 24px × 24px                  # raw

  text_block:
    flex: 1                                  # fills remaining space
    display: flex
    flex_direction: column
    gap: token.space.2                       # 2px between label and value

  label:
    color: token.color.content.secondary     # #414752
    font_family: token.font.family.sans
    font_size: token.font.size.body-12       # 12px
    font_weight: token.font.weight.regular   # 400
    line_height: token.font.line-height.16   # 16px

  value:
    color: token.color.content.primary       # #181A1F
    font_size: token.font.size.body-14       # 14px
    font_weight: token.font.weight.bold      # 700
    line_height: token.font.line-height.20   # 20px
    max_lines: 2                             # address can wrap to 2 lines

  cta_group:
    display: flex
    flex_direction: row
    align_items: center
    gap: token.space.2                       # 2px between "Change" text and chevron

  cta_text:
    color: token.color.brand.1mg             # #FF5443
    font_size: token.font.size.body-14       # 14px
    font_weight: token.font.weight.regular   # 400
    line_height: token.font.line-height.20   # 20px

  cta_chevron:
    size: 18px × 18px                        # raw — Navigation/Chevron Right
    color: token.color.brand.1mg             # #FF5443
```

---

## Layout

```yaml
summary-row:
  display: flex
  flex_direction: row
  align_items: center

  cols:
    leading_icon:   flex: 0 0 40px    # fixed width
    text_block:     flex: 1           # fluid, fills remaining space
    cta_group:      flex: 0 0 auto    # shrinks to content
```

---

## States

```yaml
interactive:
  # The entire row is not tappable — only the "Change" CTA is the tap target
  # "Change" focus state:
  cta_focus:
    ring: token.color.brand.1mg
    ring_width: 2px
    ring_offset: 2px
```

---

## Accessibility

```html
<div class="summary-row">
  <div class="leading-icon" aria-hidden="true">
    <!-- icon illustration -->
  </div>
  <div class="text-block">
    <span class="label">Sample collection address</span>
    <span class="value">Rail Vihar, Sec.15 part 2</span>
  </div>
  <button class="change-cta" aria-label="Change sample collection address">
    Change
    <span aria-hidden="true"><!-- chevron icon --></span>
  </button>
</div>
```

- "Change" button carries a descriptive `aria-label` that includes the row's label (e.g. `"Change sample collection address"`) to disambiguate multiple "Change" buttons on screen
- Leading icon is decorative — `aria-hidden="true"`

---

## Grouping (Booking Details use case)

Multiple SummaryRows are grouped inside a card container in the Booking Details sheet:

```yaml
booking_details_card:
  bg: token.color.background.primary
  border: 1px solid token.color.border.subtle
  radius: token.radius.8
  # SummaryRows are stacked with 1px dividers between them
  divider:
    height: 1px
    color: token.color.border.subtle
```
