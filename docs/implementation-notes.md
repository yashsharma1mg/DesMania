# Implementation Notes

## Stack

- Vite
- React
- TypeScript
- CSS Modules and plain CSS
- Local design-system primitives from `components/`

No Tailwind or routing library is used. The prototype is intentionally small and state-driven.

## 360px Mobile Shell

The app shell is fixed to 360px and centered for desktop preview convenience. This matches the mobile screen assumptions used during the diagnostics checkout deconstruction.

The shell owns:

- Page scrolling.
- Bottom-sheet overlays.
- Sticky app headers.
- Sticky bottom bars.

The preview switcher for alternate screens sits outside the shell so the mobile canvas remains clean.

## State Management

State lives in `CheckoutApp`:

- `previewMode` toggles between the normal checkout and the Prep Guide Sheet v2 preview.
- `page` switches between Cart and Choose Address.
- `sheet` controls active bottom sheet.
- Local arrays/ids store selected patients, address, slot, services, day, and bill expander state.

This is a prototype state machine, not a production data layer.

## Component Pattern

Shared primitives come from `components/`, including:

- `Button`
- `Badge`
- `Icon`

Checkout-specific UI is composed inside `src/checkout/CheckoutApp.tsx` and styled in `src/checkout/CheckoutApp.module.css`.

The implementation follows the existing Button/Badge pattern and keeps local custom UI scoped to checkout.

## Assets

Checkout assets live in `src/assets/checkout/` and are exported by `src/assets/checkout/index.ts`.

Complex illustrations and brand assets remain local imports instead of being added to the design-system `IconName` set. The DS `Icon` component remains for stroke icons and generic UI symbols.

## Design-System Constraints Applied

- Button CTA sizing follows `specs/Button.md`: large buttons are 44px high.
- Sticky checkout bars follow the 68px measured container from `specs/checkout/StickyBottomBar.md`.
- Cards use restrained 8px radii.
- Page sections use full-width bands and dividers rather than nested decorative cards.
- Horizontal overflow is disallowed except intentional scrollers such as day pills and carousels.

## Out Of Scope

- Responsive tablet/desktop layouts.
- Payment page.
- Booking summary page.
- API integration.
- Persistent storage.
