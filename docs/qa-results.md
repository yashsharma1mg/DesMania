# QA Results

## Build Validation

Command:

```bash
npm run build
```

Result:

```text
tsc && vite build completed successfully
```

The latest production build transformed 57 modules and emitted the Vite bundle successfully.

## Browser Validation

The prototype was checked in the browser at `http://127.0.0.1:5173/`.

Validated behaviors:

- The app shell measures 360px wide.
- The external preview toggle is outside the app shell.
- `Current checkout` is the default mode.
- `Prep Guide Sheet v2` opens the preparation guide dialog over the cart.
- Switching back to `Current checkout` closes the v2 dialog.
- No horizontal overflow was detected.
- The current checkout entry point still exposes one `Continue` CTA.

## Checkout Happy Path

Validated flow:

```text
Cart
  -> Continue
  -> Select Patient
  -> Add Patient
  -> Save
  -> Select Patient
  -> Proceed to slot selection
  -> Select Slot
  -> Confirm slot
  -> Booking Details
```

## Prep Guide Sheet v2 CTA

The bottom CTA was corrected from a custom oversized treatment to the shared Button primitive.

Measured browser result:

```text
buttonHeight: 44px
buttonWidth: 312px
appWidth: 360px
horizontalOverflow: false
```

## Output Screenshot

![Prep Guide Sheet v2 CTA QA](assets/prep-guide-sheet-v2-cta-qa.png)
