# Page Spec: Select Slot

**Flow position:** Step 3 (after Select Patient)
**Figma source:** https://www.figma.com/design/T96zjkCns9zCJ2oHYTPe7I/Diagnostics-Ideal-checkout — "Select slot" sheet
**Route type:** Bottom sheet (`BottomSheet` component, `with-heading-header-and-back` variant), stacked over dimmed Cart

---

## Overview

The Select Slot sheet lets the user pick a date and time slot for sample collection. The top shows a summary of the selected address and patient, followed by a horizontally scrollable day picker and a time slot list grouped by time of day.

---

## Layout

```
╔════════════════════════════════════╗  ← BottomSheet chrome
║ ← Select slot                  ✕  ║  sheet header
╠════════════════════════════════════╣
║                                    ║
║  ┌──────────────────────────────┐  ║  ← Summary card (grouped SummaryRows)
║  │ SummaryRow (address)         │  ║  border.subtle, radius.8
║  ├──────────────────────────────┤  ║  1px divider between rows
║  │ SummaryRow (patient)         │  ║
║  └──────────────────────────────┘  ║
║                                    ║
║  ┌──────────────────────────────┐  ║  ← Slot selection card
║  │ DayPickerPill  D1  D2  D3 …  │  ║  horizontal scroll
║  ├──────────────────────────────┤  ║  1px divider
║  │ TimeOfDayHeader (Morning 🌅) │  ║
║  │ TimeSlotRow (6:00–7:00 am)   │  ║
║  │ TimeSlotRow (7:00–8:00 am)   │  ║
║  ├──────────────────────────────┤  ║  divider
║  │ TimeOfDayHeader (Afternoon ☀)│  ║
║  │ TimeSlotRow …                │  ║
║  └──────────────────────────────┘  ║
║                                    ║
╠════════════════════════════════════╣
║  StickyBottomBar                   ║  left_variant="empty"
║  [ Confirm slot ]                  ║  cta_label="Confirm slot"
╚════════════════════════════════════╝
```

---

## Component Instances & Props

| Component | Props | Notes |
|-----------|-------|-------|
| `BottomSheet` | `variant="with-heading-header-and-back"`, title="Select slot" | Close (✕) floats outside top-right |
| `SummaryRow` | address row: `variant="with-change"`, `icon_type="address"` | Inside summary card |
| `SummaryRow` | patient row: `variant="with-change"`, `icon_type="patient-avatar"` | Inside summary card |
| `DayPickerPill` | state per day (unselected/selected/disabled), label, slot_count | Inside slot card, horizontally scrollable |
| `TimeOfDayHeader` | period, show_demand_badge | Repeated per time-of-day group |
| `TimeSlotRow` | state, time_range, show_surcharge, surcharge_amount | Repeated per slot |
| `StickyBottomBar` | left_variant="empty", cta_label="Confirm slot" | |

---

## Summary Card (Grouping)

Address + patient `SummaryRow`s are grouped in a single card container:
- `border: 1px token.color.border.subtle`
- `border-radius: token.radius.8`
- `margin: token.space.16`
- `1px border.subtle` divider between rows

---

## Slot Selection Card

- `border: 1px token.color.border.subtle`
- `border-radius: token.radius.8`
- `margin: token.space.16`
- DayPickerPill row: `overflow-x: auto`, `padding: token.space.12`, `gap: token.space.8`
- `1px border.subtle` divider between DayPicker row and first TimeOfDayHeader

---

## Scroll Behaviour

Sheet content scrolls within the BottomSheet container. StickyBottomBar is `position: sticky; bottom: 0`.

---

## Error / Edge-Case Variants

| Scenario | Treatment |
|----------|-----------|
| No slots for selected date | All `TimeSlotRow`s `state="disabled"` + `EmptyState` within slot card |
| No premium slots | `TimeSlotRow`s without premium exist; premium row `state="disabled"` + `Toast` ("No premium slots available") |
| High demand | `TimeOfDayHeader` `show_demand_badge=true` for affected period |
| All dates full | All `DayPickerPill`s `state="disabled"`; prompt to check back later |
