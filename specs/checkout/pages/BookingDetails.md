# Page Spec: Booking Details

**Flow position:** Step 5 (after Select Slot / Choose Address, before Payment)
**Figma source:** https://www.figma.com/design/T96zjkCns9zCJ2oHYTPe7I/Diagnostics-Ideal-checkout — "Booking details" sheet (node 8730:33384), overlaid on Cart
**Route type:** Bottom sheet (`BottomSheet`, `with-heading-header-and-back` variant), stacked over dimmed Cart

---

## Overview

The Booking Details sheet presents a final review of the booking before payment. The user can see (and change) address, patient, and slot. The total is shown via an InlineExpander. A "Proceed to pay" button initiates payment.

---

## Layout

```
╔════════════════════════════════════╗  ← BottomSheet chrome
║ ← Booking details               ✕ ║  sheet header
╠════════════════════════════════════╣
║                                    ║
║  ┌──────────────────────────────┐  ║  ← Summary card (3 SummaryRows grouped)
║  │ SummaryRow (address)         │  ║  border.subtle, radius.8
║  ├──────────────────────────────┤  ║  1px divider
║  │ SummaryRow (patient)         │  ║
║  ├──────────────────────────────┤  ║  1px divider
║  │ SummaryRow (slot)            │  ║
║  └──────────────────────────────┘  ║
║                                    ║
║  ┌──────────────────────────────┐  ║  ← InlineExpander row
║  │ To be paid  ▾          ₹751  │  ║
║  │                              │  ║  ← BillSummaryCard (collapsed by default)
║  └──────────────────────────────┘  ║
║                                    ║
╠════════════════════════════════════╣
║  StickyBottomBar                   ║  left_variant="to-be-paid"
║  To be paid ▾  ₹751   [Proceed]   ║  cta_label="Proceed to pay"
╚════════════════════════════════════╝
```

---

## Component Instances & Props

| Component | Props | Notes |
|-----------|-------|-------|
| `BottomSheet` | `variant="with-heading-header-and-back"`, title="Booking details" | Close (✕) floats outside top-right |
| `SummaryRow` | address: `variant="with-change"`, `icon_type="address"` | |
| `SummaryRow` | patient: `variant="with-change"`, `icon_type="patient-avatar"` | |
| `SummaryRow` | slot: `variant="with-change"`, `icon_type="calendar"` | |
| `InlineExpander` | label="To be paid", trailing_value={total}, state="collapsed" | Expands to reveal BillSummaryCard |
| `BillSummaryCard` | line_items[] | Revealed when InlineExpander is `expanded` |
| `StickyBottomBar` | left_variant="to-be-paid", cta_label="Proceed to pay" | Left content uses InlineExpander |

---

## Summary Card Grouping

All three `SummaryRow`s are grouped in a single card container:
- `border: 1px token.color.border.subtle`
- `border-radius: token.radius.8`
- `margin: token.space.16`
- `1px border.subtle` dividers between rows (not below the last row)

---

## InlineExpander Positioning

The `InlineExpander` row sits below the summary card with `margin-top: token.space.16`. When expanded, `BillSummaryCard` appears directly below the expander row within the same card container. The sheet scrolls to accommodate the expanded content.

---

## StickyBottomBar: `to-be-paid` Variant

The StickyBottomBar `left_variant="to-be-paid"` contains its own `InlineExpander` instance (same state as the inline one, kept in sync). When either expander is tapped, both expand — the sheet body scrolls to show the BillSummaryCard.

---

## "Change" Navigation

Each `SummaryRow` "Change ›" CTA navigates to:
- Address → Choose Address (full-screen route)
- Patient → Select Patient sheet (stacked BottomSheet)
- Slot → Select Slot sheet (stacked BottomSheet)

After returning from a "Change" flow, the Booking Details sheet resumes with the updated data.

---

## Sheet Height

The Booking Details sheet renders at approximately 72% of screen height in its collapsed state (summary + InlineExpander row + StickyBottomBar). When InlineExpander is expanded, the sheet should allow scroll to show the BillSummaryCard rows. BottomSheet `max-height` constraint applies per the BottomSheet spec.
