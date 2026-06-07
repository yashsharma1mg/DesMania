# Icon — Build Cache
**Resumed:** 2026-05-28
**Figma sources checked:**
- Dopamine 2.0 Components: `BsQQUym4xOYfOs419MpBBX`, node `4028:600` (`Icon Button`)
- Diagnostics Checkout: `T96zjkCns9zCJ2oHYTPe7I`, node `8553:43921` (`VAS`)
- Asset Library 2.1 reference from Figma documentation: `e0KlsOl75M6sjP8AsT3YWD`, node `315:11035`

---

## Current Registry

`components/Icon/Icon.tsx` exports a generic `Icon` component backed by `components/Icon/paths.ts`.

Current public icon names: 58

Current path exports used by the component: 58

The registry is now internally wired: every public `IconName` maps to an exported path object.

---

## Fixed During Resume

| Issue | Resolution |
|-------|------------|
| `delete` mapped to `paths.delete`, but `paths.ts` exports `deleteIcon` | Updated `Icon.tsx` to map `delete` to `paths.deleteIcon` |
| `phone` was listed as public icon but no `paths.phone` existed | Removed `phone` from `IconName` and `pathMap` until a real Figma-exported DS icon is available |

---

## Figma Findings

### IconButton assets

Figma node `4028:600` returns icon assets for:
- Add
- Tick
- Added chevron pill
- FAB icon

The exported Figma assets are SVG image assets, not all simple stroked paths:
- `Add` is a filled plus shape in a 16x16 viewBox.
- `Tick` is a stroked check in a 10.6667x8.6667 viewBox.
- `Added` chevron includes a white circular background plus a filled chevron.
- `FAB` is a multi-path filled category/grid glyph.

This means the current `Icon` renderer (`fill="none"`, `stroke=currentColor`) is only correct for stroke-line icons. Filled or multi-shape icons need either:
- a richer path registry that stores render mode and viewBox, or
- dedicated SVG/image assets outside the generic `Icon` primitive.

### Checkout VAS assets

Checkout node `8553:43921` confirms:
- `Printer` is a complex illustration from Asset Library 2.1, not a DS icon.
- `Call_doctor_` / premium collection graphic is also a complex illustration asset.
- The info glyph is a DS-style `General/information` asset.

Do not add the VAS service illustrations to `IconName`.

---

## Remaining Work

1. Decide whether `Icon` should support both stroke and fill icons.
2. Replace placeholder/simple paths in the `Dopamine_2.0_Assets` section with real Figma-exported SVG paths.
3. Keep complex checkout illustrations as assets in consuming components, not generic icons.
4. Add `IconButton.nav` separately in the IconButton spec/component work; it depends on `arrow-left` and `search`, which are already present in `Icon`.
