# Flow: Diagnostics Ideal Checkout

**Figma source:** https://www.figma.com/design/T96zjkCns9zCJ2oHYTPe7I/Diagnostics-Ideal-checkout?node-id=8553-14605
**Deconstructed:** 2026-05-27
**Canvas size:** 18 637 × 39 021 px · Two parallel columns (Single SKU / Multi SKU happy paths + Use Cases)

---

## Flow Map

```
[Cart]
  │
  ▼  tap "Continue" (StickyBottomBar)
[Select Patient sheet]
  │
  ├──► [Add New Patient sheet]  ──────────────────────────────────► (returns to Select Patient)
  │        (optional, stacked over Select Patient)
  │
  ▼  tap "Proceed to slot selection"
[Select Slot sheet]
  │
  ├──► [Choose Address page]  ◄─── tap "Change" on address SummaryRow
  │        (full-screen route, not a sheet)
  │
  ▼  tap "Confirm slot"
[Booking Details sheet]
  │
  ├──► [Choose Address page]  ◄─── tap "Change" on address SummaryRow
  ├──► [Select Patient sheet] ◄─── tap "Change" on patient SummaryRow
  ├──► [Select Slot sheet]    ◄─── tap "Change" on slot SummaryRow
  │
  ▼  tap "Proceed to pay"
[Payment page]
  │
  ▼
[Booking Summary]
```

---

## Navigation Model

| Step | Surface | Stacked over |
|------|---------|-------------|
| Cart | Full-screen page | — |
| Select Patient | BottomSheet | Dimmed Cart |
| Add New Patient | BottomSheet | Dimmed Select Patient |
| Select Slot | BottomSheet | Dimmed Cart |
| Choose Address | Full-screen page | Replaces Cart (back → Cart) |
| Booking Details | BottomSheet | Dimmed Cart |
| Payment | Full-screen page | — |
| Booking Summary | Full-screen page | — |

All bottom sheets use `BottomSheet` component (`with-heading-header-and-back` variant). The close (✕) button floats outside the top-right of the sheet, positioned at `y = sheet_top − 16 − 40`.

---

## Step 1 — Cart

**Route type:** Full-screen page
**Entry point:** User taps "Add to cart" on a lab test

### Screen composition (top → bottom)

| # | Component | Props / Notes |
|---|-----------|--------------|
| 1 | `AppHeader` | `variant="back-title-action"` · title="Cart" · trailing=search |
| 2 | `SavingsBanner` | Shown when order savings > ₹0 · Figtree typography migrated |
| — | 8px divider | `background.subtle` full-width |
| 3 | Section label | "N Test/Tests added · Fulfilled by…" + `BrandPill` |
| 4 | `LabTestCard` × N | One per SKU · includes `PriceBlock`, `StepperButton`, `BrandPill` |
| — | 8px divider | |
| 5 | "Previously booked by you" carousel | Horizontal-scroll `Card` components with `PriceBlock` + "Add" CTA |
| — | 8px divider | |
| 6 | "Frequently booked together" carousel | Same pattern |
| — | 8px divider | |
| 7 | `CouponWidget` | |
| — | 8px divider | |
| 8 | `NeuCoinsWidget` | TCP/NeuCoin loyalty redemption |
| — | 8px divider | |
| 9 | `AdditionalServicesRow` × 2 | VAS: Hard copy, Premium collection |
| — | 8px divider | |
| 10 | `BillSummaryCard` | Line items + savings pill · Figtree typography migrated |
| — | 8px divider | |
| — | Scroll padding | 68px to clear StickyBottomBar |
| 11 | `StickyBottomBar` | `left_variant="price-summary"` · `cta_label="Continue"` · Figtree typography migrated |

### Data passed forward to Select Patient

```
cart_id
tests: [{ test_id, test_name, patient_count }]
```

---

## Step 2 — Select Patient

**Route type:** BottomSheet · `variant="with-heading-header-and-back"` · title="Select patient"
**Trigger:** "Continue" in Cart StickyBottomBar

### Screen composition

| # | Component | Props / Notes |
|---|-----------|--------------|
| 1 | `BottomSheet` chrome | Back + title + close (outside) |
| 2 | `AccordionCard` × N | One per test SKU in cart · starts collapsed-unselected |
| 3 | `PatientListItem` × M | Inside each accordion's content slot · `control="multi-select"` for multi-patient tests |
| 4 | `StickyBottomBar` | `left_variant="empty"` · `cta_label="Proceed to slot selection"` · enabled when all tests have ≥1 patient |

### AccordionCard footer actions

- **"View all"** — conditionally shown when saved patients > visible limit
- **"+ Add new patient"** — always shown · opens Add New Patient sheet

### Validation

"Proceed to slot selection" is disabled until every test's `AccordionCard` reaches `collapsed-selected` state (green tick visible).

### Data passed forward to Select Slot

```
patients: { [test_id]: [patient_id, …] }
```

---

## Step 2b — Add New Patient (optional)

**Route type:** BottomSheet · stacked over Select Patient · `variant="with-heading-header-and-back"` · title="Add a new patient"
**Trigger:** "+ Add new patient" in AccordionCard footer

### Screen composition

| # | Component | Props / Notes |
|---|-----------|--------------|
| 1 | `BottomSheet` chrome | |
| 2 | `TextField` | label="Patient Name" |
| 3 | `DateInput` | label="Date of birth" · trailing calendar icon |
| 4 | `SelectDropdown` | label="Gender" · options: Male / Female / Other |
| 5 | `StickyBottomBar` | `left_variant="empty"` · `cta_label="Save"` |

On save: new patient appended to the saved list · sheet dismisses · parent AccordionCard auto-selects the new patient.

---

## Step 3 — Select Slot

**Route type:** BottomSheet · `variant="with-heading-header-and-back"` · title="Select slot"
**Trigger:** "Proceed to slot selection" from Select Patient

### Screen composition

| # | Component | Props / Notes |
|---|-----------|--------------|
| 1 | `BottomSheet` chrome | |
| 2 | Summary card | Grouped `SummaryRow`s (address + patient) · `variant="with-change"` |
| 3 | Slot selection card | DayPickerPill row + TimeOfDayHeader/TimeSlotRow groups |
| 4 | `DayPickerPill` row | Horizontal scroll · 3–7 days shown · one selected at a time |
| 5 | `TimeOfDayHeader` | Per period: Morning / Afternoon / Evening · optional "High demand" badge |
| 6 | `TimeSlotRow` × N | Per slot in the period · radio + time range + optional "+₹50" surcharge |
| 7 | `StickyBottomBar` | `left_variant="empty"` · `cta_label="Confirm slot"` · enabled when a slot is selected |

### "Change" address navigation

Tapping "Change ›" on the address `SummaryRow` navigates to **Choose Address** (full-screen page). On return, the Select Slot sheet resumes with the updated address pre-populated.

### Error states (from Use Cases UC 1–6)

| Scenario | Component change |
|----------|----------------|
| No slots on selected date | All `TimeSlotRow` → `disabled`; `EmptyState` within slot card |
| No premium slots | Premium `TimeSlotRow` → `disabled`; `Toast` notification |
| High demand | `TimeOfDayHeader` `show_demand_badge=true` |
| All dates unavailable | All `DayPickerPill` → `disabled`; fallback message |

### Data passed forward to Booking Details

```
slot: { date, time_range, surcharge }
```

---

## Step 3b — Choose Address

**Route type:** Full-screen page (confirmed from screenshot — no sheet chrome visible)
**Trigger:** "Change ›" on address SummaryRow in Select Slot or Booking Details

### Screen composition

| # | Component | Props / Notes |
|---|-----------|--------------|
| 1 | `AppHeader` | `variant="back-title"` · title="Choose address" |
| 2 | "Add new address" button | Coral outline `Button` · full-width |
| 3 | "Recent address" section label | 12px regular `content.secondary` |
| 4 | `AddressCard` × 1 | Most recent address · may be pre-selected |
| 5 | "Other saved addresses" section label | |
| 6 | `AddressCard` × N | Other saved addresses |
| 7 | `StickyBottomBar` | `left_variant="empty"` · `cta_label="Continue"` |

On continue: returns to the calling step (Select Slot or Booking Details) with the selected address.

---

## Step 4 — Booking Details

**Route type:** BottomSheet · `variant="with-heading-header-and-back"` · title="Booking details"
**Trigger:** "Confirm slot" from Select Slot

### Screen composition

| # | Component | Props / Notes |
|---|-----------|--------------|
| 1 | `BottomSheet` chrome | |
| 2 | Summary card | Three `SummaryRow`s: address + patient + slot · all `variant="with-change"` |
| 3 | `InlineExpander` | label="To be paid" · trailing=₹total · reveals `BillSummaryCard` on expand |
| 4 | `BillSummaryCard` | Hidden (collapsed) by default · shown when InlineExpander is expanded |
| 5 | `StickyBottomBar` | `left_variant="to-be-paid"` · `cta_label="Proceed to pay"` |

### "Change" navigation

| SummaryRow | Navigates to |
|-----------|-------------|
| Address | Choose Address (full-screen) |
| Patient | Select Patient (sheet, stacked) |
| Slot | Select Slot (sheet, stacked) |

After returning from any "Change" flow, Booking Details refreshes the changed data.

---

## Data Flow Summary

```
Cart
  └── cart_id, tests[], order_total, coupon, neucoins
        │
Select Patient
  └── patients: { test_id → [patient_id] }
        │
Select Slot
  └── slot: { date, time_range, surcharge }
  └── address: { address_id }   ← may update via Choose Address
        │
Booking Details
  └── Final review: address + patients + slot + pricing
        │
Payment
  └── payment_method, transaction_id
        │
Booking Summary
  └── booking_id, confirmation details
```

---

## Component Registry (this flow)

All components used in this flow, with their spec and cache locations:

| Component | Spec | Cache | Phase |
|-----------|------|-------|-------|
| `AppHeader` | `specs/checkout/AppHeader.md` | `cache/checkout/AppHeader.md` | B |
| `SavingsBanner` | `specs/checkout/SavingsBanner.md` | `cache/checkout/SavingsBanner.md` | D |
| `BrandPill` | `specs/checkout/BrandPill.md` | `cache/checkout/BrandPill.md` | D |
| `LabTestCard` | `specs/checkout/LabTestCard.md` | `cache/checkout/LabTestCard.md` | D |
| `PriceBlock` | `specs/checkout/PriceBlock.md` | `cache/checkout/PriceBlock.md` | D |
| `StepperButton` | `specs/StepperButton.md` | `cache/StepperButton.md` | existing |
| `CouponWidget` | `specs/checkout/CouponWidget.md` | `cache/checkout/CouponWidget.md` | D |
| `NeuCoinsWidget` | `specs/checkout/NeuCoinsWidget.md` | `cache/checkout/NeuCoinsWidget.md` | D |
| `AdditionalServicesRow` | `specs/checkout/AdditionalServicesRow.md` | `cache/checkout/AdditionalServicesRow.md` | D |
| `BillSummaryCard` | `specs/checkout/BillSummaryCard.md` | `cache/checkout/BillSummaryCard.md` | D |
| `StickyBottomBar` | `specs/checkout/StickyBottomBar.md` | `cache/checkout/StickyBottomBar.md` | D |
| `BottomSheet` | `specs/BottomSheet.md` | `cache/BottomSheet.md` | existing |
| `AccordionCard` | `specs/checkout/AccordionCard.md` | `cache/checkout/AccordionCard.md` | B |
| `PatientListItem` | `specs/checkout/PatientListItem.md` | `cache/checkout/PatientListItem.md` | B |
| `Avatar` | `specs/checkout/Avatar.md` | `cache/checkout/Avatar.md` | B |
| `Checkbox` | `specs/Checkbox.md` | `cache/Checkbox.md` | existing |
| `TextField` | `specs/checkout/TextField.md` | `cache/checkout/TextField.md` | B |
| `DateInput` | `specs/checkout/DateInput.md` | `cache/checkout/DateInput.md` | B |
| `SelectDropdown` | `specs/checkout/SelectDropdown.md` | `cache/checkout/SelectDropdown.md` | B |
| `SummaryRow` | `specs/checkout/SummaryRow.md` | `cache/checkout/SummaryRow.md` | B |
| `DayPickerPill` | `specs/checkout/DayPickerPill.md` | `cache/checkout/DayPickerPill.md` | C |
| `TimeOfDayHeader` | `specs/checkout/TimeOfDayHeader.md` | `cache/checkout/TimeOfDayHeader.md` | C |
| `TimeSlotRow` | `specs/checkout/TimeSlotRow.md` | `cache/checkout/TimeSlotRow.md` | C |
| `RadioButton` | `specs/RadioButton.md` | `cache/RadioButton.md` | existing |
| `AddressCard` | `specs/checkout/AddressCard.md` | `cache/checkout/AddressCard.md` | C |
| `Button` | `specs/Button.md` | `cache/Button.md` | existing |
| `InlineExpander` | `specs/checkout/InlineExpander.md` | `cache/checkout/InlineExpander.md` | D |
| `Toast` | `specs/checkout/Toast.md` | `cache/checkout/Toast.md` | E |
| `EmptyState` | `specs/checkout/EmptyState.md` | `cache/checkout/EmptyState.md` | E |
| `Toggle` | `specs/Toggle.md` | `cache/Toggle.md` | existing |
| `Badge` | `specs/Badge.md` | `cache/Badge.md` | existing |
| `Tooltip` | `specs/Tooltip.md` | `cache/Tooltip.md` | existing |

---

## Figtree Migration Notes

The cart components that previously carried non-Dopamine typography are now specified with Figtree while preserving the measured weight, size, line-height, and spacing values from the checkout source.

- `SavingsBanner` — amount 16px / 700 / 24px; supporting text 14px / 500 / 20px
- `LabTestCard` price block — current price 14px / 500 / 20px
- `BillSummaryCard` total row — total label and amount 16px / 700 / 24px
- `StickyBottomBar` price amount — 18px / 500 / 27px raw line-height
- Carousel cards price — 18px / 500 / 27px raw line-height

Components from Step 3 onwards (Select Slot, Booking Details) are fully on Figtree and use `var(--colour-usage/*)` CSS token variables.

---

## Open Items

| Item | Status |
|------|--------|
| 18px typography | Use `token.font.size.heading-18` where the measured size is 18px |
| Cart typography migration | Complete — use Figtree and preserve the measured weight per component |
| SavingsBanner background gradient | Raw values `#208376` / teal; no DS semantic token yet |
| Payment page + Booking Summary | Not deconstructed — separate inspection pass needed |
| Use-case variants UC 1–6 | Slot error states noted; full UC audit not completed |
