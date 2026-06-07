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

## System Fundamentals

DesMania has two connected layers:

1. **Design-system knowledge layer**
   - `tokens/` stores the design token lookup table and token hierarchy.
   - `specs/` stores human and machine-readable component specifications.
   - `cache/` stores build notes, token audits, and decisions from prior component deconstruction.
   - `flows/` stores the product flow model for Diagnostics Checkout.

2. **Runnable prototype layer**
   - `src/checkout/` turns the checkout flow into React screens and bottom sheets.
   - `components/` provides shared primitives such as Button, Badge, and Icon.
   - `src/assets/checkout/` keeps local brand, illustration, and checkout assets.
   - The app uses a small local state machine instead of a backend or router.

The key idea is that implementation does not start from a blank page. The repository captures design decisions as specs and cache files first, then the React prototype implements those documented decisions. This makes the prototype easier to audit, revise, and hand off.

## How The Checkout Prototype Works

`CheckoutApp` owns the checkout state:

- `previewMode`: switches between `Current checkout` and `Prep Guide Sheet v2`.
- `page`: switches between the Cart page and Choose Address page.
- `sheet`: controls active bottom sheets such as Select Patient, Add Patient, Select Slot, and Booking Details.
- Local IDs track selected patients, address, slot, day, additional services, and bill summary expansion.

The primary happy path is:

```text
Cart
  -> Select Patient sheet
  -> Add Patient sheet, optional
  -> Select Slot sheet
  -> Choose Address page, optional
  -> Booking Details sheet
```

The prototype is fixed to a 360px mobile shell. Bottom sheets are anchored inside that shell, while the preview toggle is intentionally outside the shell so QA can compare alternate screens without changing the mobile canvas.

## Skills And Why They Help

The `skills/` directory documents the repeatable design-system workflow used to turn Figma screens into implementation-ready specs.

### `ds-team`

`skills/ds-team.md` is the orchestrator. It coordinates the full workflow from a Figma link to an audited component spec and cache file.

It helps because it enforces the same sequence every time:

- Load previous cache and token memory.
- Read the Figma design.
- Run the spec-writing process.
- Run the token audit.
- Write a cache file that captures decisions and unresolved issues.

This prevents each component from being interpreted in isolation. New work inherits prior token choices, naming decisions, and known component constraints.

### `component-god`

`skills/component-god.md` is the spec writer. Its job is to inspect a Figma frame and produce a complete `specs/{ComponentName}.md` file.

It helps because it translates visual design into implementation details:

- Component name and prompt aliases.
- Variants and states.
- HTML semantics.
- Layout, spacing, radius, and typography.
- Accessibility rules.
- Token references for colors, spacing, radius, shadows, and fonts.

It does not write code. That separation is deliberate: the design is first converted into a stable spec, then implementation can follow the spec.

### `token-police`

`skills/token-police.md` audits component specs against `tokens/tokens.json`.

It helps because it catches design-system drift before code is written:

- Verifies every `token.*` reference resolves.
- Flags raw hex values in specs.
- Checks required focus and disabled state fields.
- Reports missing tokens instead of inventing replacements.

This is why the project can safely preserve measured Figma details while still keeping the implementation tied to the design-system token model.

## Why This Workflow Is Useful

The skills make the project more than a one-off prototype:

- **Consistency:** specs, cache files, and code refer to the same token source.
- **Traceability:** component decisions are documented before and after implementation.
- **Auditability:** token issues and raw values are visible in cache files.
- **Hand-off quality:** another engineer can read the specs and docs without reverse-engineering the UI.
- **Iteration support:** alternate UX treatments, such as the Prep Guide Sheet v2, can be added without deleting the current screen.

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
