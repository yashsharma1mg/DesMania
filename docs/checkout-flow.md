# Diagnostics Checkout Flow

This document summarizes the runnable checkout flow implemented in the React prototype. The source flow reference is `flows/DiagnosticsCheckout.md`; this document focuses on what the app currently demonstrates.

## Happy Path

```text
Cart
  -> Select Patient sheet
  -> Add Patient sheet, optional
  -> Select Slot sheet
  -> Choose Address page, optional
  -> Booking Details sheet
```

Payment and booking summary are intentionally out of scope for this milestone.

## Screen And Sheet Model

The app uses a local React state machine:

- `page`: `cart` or `address`.
- `sheet`: `patients`, `add-patient`, `slot`, `booking`, or `null`.
- `previewMode`: `checkout` or `prep-sheet-v2`.

All checkout surfaces are anchored to a fixed 360px shell. Bottom sheets are absolute overlays inside that shell; the external preview toggle is outside the shell.

## Cart

The Cart is the default full-screen page and contains:

- App header.
- Savings banner.
- Preparation alert banner.
- Tests added section with `LabTestCard` entries.
- Previously booked and frequently booked carousels.
- Coupon widget.
- NeuCoins widget.
- Additional services rows.
- Bill summary card.
- Sticky bottom bar with total and `Continue`.

Tapping `Continue` opens Select Patient.

## Select Patient

The Select Patient bottom sheet contains one accordion card per test. The first card is expanded by default and lists available patients. The sheet supports:

- Selecting saved patients.
- Opening Add Patient.
- Proceeding to Select Slot.

The Add Patient sheet stacks over Select Patient and returns to Select Patient after saving.

## Select Slot

The Select Slot sheet contains:

- Address and patient summary rows.
- Day picker pills.
- Morning, afternoon, and evening slot groups.
- High-demand badge in the morning group.
- Sticky `Confirm slot` CTA.

Changing the address opens the Choose Address full-screen page and returns to the calling sheet.

## Choose Address

Choose Address is a full-screen route, not a sheet. It shows:

- App header.
- Add new address button.
- Recent addresses.
- Sticky Continue CTA.

Selecting an address updates local checkout state and returns to the calling flow.

## Booking Details

Booking Details is a bottom sheet with:

- Address, patient, and slot summary rows.
- Change actions for address, patient, and slot.
- Inline expander for bill summary.
- Sticky `Proceed to pay` CTA.

The CTA is present as a visual endpoint; payment is not implemented.
