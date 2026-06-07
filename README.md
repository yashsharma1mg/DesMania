# DesMania

High-fidelity React prototype for the Diagnostics Ideal Checkout flow, built for a fixed 360px mobile canvas.

The repository contains the runnable Vite app, local checkout assets, design-system component specs, build cache notes, flow documentation, and QA output screenshots.

## Quick Start

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually:

```text
http://127.0.0.1:5173/
```

For production validation:

```bash
npm run build
```

## Preview Modes

The app renders a control outside the 360px mobile shell:

- `Current checkout`: the primary cart-to-booking happy path.
- `Prep Guide Sheet v2`: an alternate bottom-sheet preparation guide preview over the cart.

The external toggle is intentionally outside the app shell so it does not affect the 360px mobile screen fidelity.

## What Is Implemented

- Cart screen with savings, test cards, preparation alert, coupon, NeuCoins, additional services, bill summary, and sticky CTA.
- Select Patient bottom sheet with stacked Add Patient sheet.
- Select Slot bottom sheet with address/patient summary, day picker, time-of-day groups, slots, and high-demand badge.
- Choose Address full-screen page.
- Booking Details bottom sheet with summary rows and expandable bill summary.
- Preparation guide iterations:
  - Inline prep alert and per-test preparation guide.
  - Separate Prep Guide Sheet v2 preview with documented DS button sizing.

Payment and booking summary are documented as out of scope for this milestone because those screens were not deconstructed.

## Repository Structure

```text
components/            Shared design-system primitives used by the prototype
src/checkout/          React checkout app, local state machine, and screen/sheet components
src/assets/checkout/   Local checkout assets and Figma-extracted illustrations
specs/                 Component and checkout screen specifications
cache/                 Build cache notes and token audits from the deconstruction pass
flows/                 Flow-level diagnostics checkout documentation
tokens/                Token references and token structure notes
docs/                  Project documentation and QA output artifacts
```

## Documentation

- [Checkout Flow](docs/checkout-flow.md)
- [Implementation Notes](docs/implementation-notes.md)
- [Preparation Guide Iterations](docs/preparation-guide-iterations.md)
- [QA Results](docs/qa-results.md)

## Scripts

```bash
npm run dev       # Start Vite on 127.0.0.1
npm run build     # TypeScript check and production build
npm run preview   # Preview production build on 127.0.0.1
```

## GitHub Publication

This project was prepared for publication as the public GitHub repository:

```text
https://github.com/yashsharma1mg/DesMania
```

Generated dependencies and build output are intentionally excluded from Git. Source assets, specs, cache documentation, flow docs, and selected QA screenshots are committed.
