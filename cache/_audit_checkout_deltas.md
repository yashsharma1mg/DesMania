# Checkout Component Delta Audit
**Audited:** 2026-05-27
**Against flow:** Diagnostics Ideal Checkout (Figma T96zjkCns9zCJ2oHYTPe7I, node 8553:14605)

Existing components audited against the checkout flow to flag missing variants before net-new components are specced.

---

## ActionBar ✅ No gap

Checkout uses:
- `standard.one-button-textual-redirect` — "₹675 / See bill summary ›" (left) + "Continue" (right). Existing variant covers this exactly.
- `standard.one-button` — "Proceed to slot selection", "Confirm slot", "Proceed to pay", "Save". Covered.

**No new variants needed.**

---

## Button ✅ No gap

Checkout uses:
- `fill.primary` — all sticky coral CTAs (Continue, Save, etc.). Covered via ActionBar.
- `outline.primary` — "Add new address" coral-outline CTA in Choose Address sheet. `outline.primary` exists.

**No new variants needed.**

---

## Badge ⚠️ Missing variant

Checkout needs a **standalone green label pill** — "High demand" — as a small status indicator alongside the time-of-day header in the slot selection sheet.

| Gap | Current coverage | Proposed resolution |
|-----|-----------------|---------------------|
| Green text-only info badge (no star/rating icon) | Closest: `rating.green` (wellness-green.30 bg, white text) but includes a mandatory star icon | Add `info.success` variant: wellness-green.30 bg + content.inverse text, same geometry as existing `info.*` badges. OR spec inside TimeOfDayHeader composite and not as a standalone Badge variant. |

**Recommended:** Handle within TimeOfDayHeader spec (PhaseC item 10). Only promote to Badge variant if "High demand" / equivalent green pills appear in other contexts too.

---

## Chip ⚠️ Missing variant

Checkout uses **day-picker pills** with two lines: date label ("Today") + slot-count sublabel ("7 slots").

| Gap | Current coverage | Proposed resolution |
|-----|-----------------|---------------------|
| Dual-line date + slot-count pill; three states: unselected, selected, empty/disabled | `timestamp-date` is single-line, 56px fixed width; does not support a sublabel | Spec as separate **DayPickerPill** component (Phase C, item 9). Do not extend Chip sub-types — two-line layout fundamentally changes the component structure and height. |

Also note: `timestamp-date` selected bg uses `sunrise-glow.99` (#FFFBFA — TOKEN MISSING in Chip cache). DayPickerPill should resolve to a confirmed token or document the gap.

**Required:** New DayPickerPill component (Phase C).

---

## StepperButton ✅ No gap

Checkout uses `-  N  +` in the LabTestCard for patient count. Current `added-number` state handles this. The "Patients" text label beneath the stepper is a **LabTestCard layout concern**, not a StepperButton variant.

**No new variants needed.**

---

## Checkbox ✅ No gap

Checkout uses Checkbox as:
- Trailing right control on patient list rows (PatientListItem layout, not a Checkbox variant)
- Trailing right control on VAS/Additional Services rows (AdditionalServicesRow layout)

Existing `large.default` / `large.selected` cover both use cases.

**No new variants needed.**

---

## RadioButton ✅ No gap

Checkout uses RadioButton in:
- Time slot rows (`large.default` / `large.selected`)
- Address selection cards (`large.default` / `large.selected`)

**No new variants needed.**

---

## Toggle ✅ No gap

Used inside NeuCoinsWidget for the redeem on/off toggle. Existing `selected` state covers the coral-on appearance shown in the Cart screenshot.

**No new variants needed.**

---

## IconButton ⚠️ Missing variant

Checkout requires navigation icon controls in the **TopBar** (top of Cart screen): back arrow (←) and search icon (🔍). These are icon-only buttons with no visible background, no border, and no shadow in their default state.

| Gap | Current coverage | Proposed resolution |
|-----|-----------------|---------------------|
| Ghost/nav icon-only button: 44×44px tap area, transparent bg, icon in `content.primary` | Current types: Add (white+border+shadow), Added (coral pill), Special (dark pill), FAB (light-gray squircle). None is transparent/ghost. | Add `type: nav` to IconButton: no bg, no border, no shadow; 24px icon in `content.primary`; focus ring via `border.high-contrast`. This is a minimal addition — essentially the system default for nav icon targets. |

**Note:** The BottomSheet close/back buttons (40×40 white circle with drop-shadow) are already handled inside the BottomSheet spec — they are not a separate IconButton variant.

**Existing TOKEN MISSING carry-forwards (unresolved from previous audit):**
1. `added.disable` background (#868E9E) — no `background.disabled` token
2. `fab.default` radius (20px) — no `token.radius.20`

**Required:** New `nav` type in IconButton spec. TOKEN MISSING items still pending DS team decision.

---

## Summary table

| Component | Status | Action |
|-----------|--------|--------|
| ActionBar | ✅ Covered | None |
| Button | ✅ Covered | None |
| Badge | ⚠️ Delta | Possibly add `info.success` variant; handle in TimeOfDayHeader for now |
| Chip | ⚠️ Delta | New **DayPickerPill** component (Phase C) |
| StepperButton | ✅ Covered | None |
| Checkbox | ✅ Covered | None |
| RadioButton | ✅ Covered | None |
| Toggle | ✅ Covered | None |
| IconButton | ⚠️ Delta | Add `type: nav` ghost variant |
| TopBar/NavBar | ❌ Not specced | New **AppHeader** component needed (contains back + title + trailing IconButton.nav). Not in the 19-component catalog at all. |
