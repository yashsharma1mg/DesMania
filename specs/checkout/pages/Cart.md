# Page Spec: Cart

**Flow position:** Step 1 of the checkout flow
**Figma source:** https://www.figma.com/design/T96zjkCns9zCJ2oHYTPe7I/Diagnostics-Ideal-checkout — "Single SKU cart" (node 8553:43875), "Multi cart"
**Route type:** Full-screen page (not a bottom sheet)

---

## Overview

The Cart page is the entry point for the diagnostics checkout. It presents all added lab tests, pricing, applicable coupons and loyalty points, VAS upsells, and a bill summary. A sticky bottom bar initiates the checkout flow.

---

## Layout

```
┌────────────────────────────────────┐ y=0
│  AppHeader (back + "Cart" + search) │  49px
├────────────────────────────────────┤
│  SavingsBanner ("₹X saved...")     │  72px
├────────────────────────────────────┤
│  8px section divider               │   8px
├────────────────────────────────────┤
│  Section heading: "Test/Tests added│
│  · Fulfilled by TATA 1mg ⓘ"       │  ← BrandPill row
│  LabTestCard × N                   │  294px each
│  8px divider                       │
├────────────────────────────────────┤
│  "Previously booked by you" header │
│  Horizontal carousel (Card × N)    │  241px
│  8px divider                       │
├────────────────────────────────────┤
│  "Frequently booked together" hdr  │
│  Horizontal carousel (Card × N)    │  263px
│  8px divider                       │
├────────────────────────────────────┤
│  CouponWidget                      │  64px
│  8px divider                       │
├────────────────────────────────────┤
│  NeuCoinsWidget                    │  153px
│  8px divider                       │
├────────────────────────────────────┤
│  AdditionalServicesRow × 2         │  292px (VAS section)
│  8px divider                       │
├────────────────────────────────────┤
│  BillSummaryCard                   │  282px
│  8px divider                       │
├────────────────────────────────────┤
│  [scroll padding for StickyBar]    │  68px
└────────────────────────────────────┘

[StickyBottomBar] — position: sticky; bottom: 0
│  left_variant: price-summary
│  cta_label: "Continue"
```

---

## Component Instances & Props

| Component | Props | Notes |
|-----------|-------|-------|
| `AppHeader` | `variant="back-title-action"`, title="Cart", trailing_action=search | |
| `SavingsBanner` | amount={savings_amount} | Hidden when savings = 0 |
| `BrandPill` | logo="TATA 1mg Labs", show_tooltip=true | Section-level, not per-card |
| `LabTestCard` | test data per SKU | Repeated N times for N tests in cart |
| `CouponWidget` | state="empty"\|"applied", coupon_data | |
| `NeuCoinsWidget` | balance, redeemed_amount | |
| `AdditionalServicesRow` | service data, state="unselected"\|"selected" | × 2 services |
| `BillSummaryCard` | line_items[] | |
| `StickyBottomBar` | left_variant="price-summary", cta_label="Continue", amount, sub_label | |

---

## Spacing Between Sections

All section boundaries are separated by 8px `Divider` elements (full-width, `background.subtle` fill).

---

## Scroll Behaviour

Page is `overflow-y: auto`. AppHeader is `position: sticky; top: 0; z-index: 10`. StickyBottomBar is `position: sticky; bottom: 0; z-index: 10`. Content scrolls between them.

---

## Variants

| Variant | Difference |
|---------|-----------|
| Single SKU | One `LabTestCard`; "Test added" section heading |
| Multi SKU | Multiple `LabTestCard`; "Tests added" section heading; each card has independent patient stepper |

---

## State: Empty Cart

If all tests are removed, show `EmptyState` with illustration and "Your cart is empty" message and a CTA back to the tests catalogue. StickyBottomBar is hidden.
