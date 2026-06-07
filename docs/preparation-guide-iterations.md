# Preparation Guide Iterations

The preparation guide went through multiple UX treatments during the checkout prototype work.

## Earlier Bottom-Sheet Concept

The local specs reference an earlier design in which a preparation row opened a consolidated bottom sheet with tabs.

That previous pattern is noted in `specs/checkout/LabTestCard.md` as:

```text
truncated text + trailing Navigation/Chevron Right -> opens consolidated bottom sheet with tabs
```

The full standalone spec for that older sheet was not present in the repository.

## Inline Preparation UX

The current primary checkout keeps preparation guidance visible in context:

- `PreparationAlertBanner` appears between the savings banner and tests section.
- Each `LabTestCard` renders an inline `Preparations guide`.
- Rows are not interactive and do not use a trailing chevron.
- Tests with no requirements show `No special preparation required`.

This matches the documented replacement in `specs/checkout/LabTestCard.md` and `specs/checkout/PreparationAlertBanner.md`.

## Prep Guide Sheet v2 Preview

A second preview mode was added to preserve the bottom-sheet direction without replacing the current checkout.

The external preview toggle exposes:

- `Current checkout`
- `Prep Guide Sheet v2`

The v2 sheet renders over the cart with:

- Dimmed background.
- Floating back and close buttons.
- Drag handle.
- Title and explanatory subtitle.
- Preparation rows grouped by lab test.
- Bottom CTA using the shared `Button` component.

## CTA Correction

The first v2 sheet pass used a custom 68px CTA, which was too tall and conflicted with the documented Button component.

The CTA was corrected to use the shared `Button` primitive:

- Height: 44px.
- Width: full available footer width.
- Variant: `fill.primary`.

This brings the sheet back in line with `specs/Button.md` and the checkout sticky bar behavior.
