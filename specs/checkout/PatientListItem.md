# PatientListItem — Spec

> **Figma source:** https://www.figma.com/design/T96zjkCns9zCJ2oHYTPe7I/Diagnostics-Ideal-checkout — patient selection bottom sheet rows
> **Component family:** Lists / Controls
> **Status:** Draft

---

## Prompt Match

```yaml
prompts:
  - "patient list item"
  - "patient row"
  - "patient card"
  - "select patient"
  - "person list item"
  - "patient selector"
```

---

## Description

PatientListItem is a list row representing a saved patient profile. It combines an Avatar, a name + demographic label, an "Edit" CTA, and a trailing selection control (Checkbox for multi-select, RadioButton for single-select). Appears inside the AccordionCard's expanded content slot in the Select Patient sheet.

### When to use

- Selecting one or more patients from a saved list
- Any list that displays a person with demographic details + selection control

### When NOT to use

- Doctor/specialist display — use a separate DoctorCard
- Profile overview — use a full profile section

---

## Anatomy

```
┌──────────────────────────────────────────────┐
│  [Avatar]  Saumya                    [□]     │
│            Female, 26 | Edit                 │
└──────────────────────────────────────────────┘
   48px       ← flex-1 column →         24px
  left padding 16px               right padding 16px
  height: 56px
```

---

## Variants

### patient-list-item.multi-select (default)

```yaml
patient-list-item.multi-select:
  description: Row with trailing Checkbox for selecting one or more patients per test.
  control: Checkbox (large)
  selection_rule: multiple allowed
```

### patient-list-item.single-select

```yaml
patient-list-item.single-select:
  description: Row with trailing RadioButton for selecting one patient per test.
  control: RadioButton (large)
  selection_rule: single exclusive
```

### patient-list-item.selected

```yaml
patient-list-item.selected:
  description: The row is currently selected. Control shows selected state.
  bg: token.color.background.primary    # no tint — selection is indicated by control only
  control: Checkbox.selected or RadioButton.selected
```

---

## Tokens

```yaml
patient-list-item:
  container:
    bg: token.color.background.primary    # #FFFFFF
    height: 56px                          # raw
    width: fill
    padding_horizontal: token.space.16    # 16px
    padding_vertical: token.space.8       # 8px (derives 56px with 40px content)
    display: flex
    flex_direction: row
    align_items: center
    gap: token.space.12                   # 12px gap between avatar and text block

  avatar:
    size: 40px × 40px                     # Avatar.medium

  name:
    color: token.color.content.primary    # #181A1F
    font_family: token.font.family.sans
    font_size: token.font.size.body-14    # 14px
    font_weight: token.font.weight.bold   # 700
    line_height: token.font.line-height.20  # 20px

  meta:
    display: flex
    flex_direction: row
    align_items: center
    gap: token.space.4                    # 4px
    # "Female, 26" label:
    demo_text:
      color: token.color.content.secondary  # #414752
      font_size: token.font.size.body-12    # 12px
      font_weight: token.font.weight.regular
      line_height: token.font.line-height.16  # 16px
    # Separator "|":
    separator:
      color: token.color.content.secondary  # #414752 (inline pipe character)
    # "Edit" CTA:
    edit_link:
      color: token.color.brand.1mg          # #FF5443
      font_size: token.font.size.body-12    # 12px
      font_weight: token.font.weight.regular
      line_height: token.font.line-height.16  # 16px

  control:
    # trailing Checkbox or RadioButton — see respective specs
    # positioned: flex-end (pushed right by flex)
```

---

## Layout

```yaml
patient-list-item:
  direction: row
  align_items: center

  left: Avatar (40×40, flex-shrink: 0)
  center:
    flex: 1
    direction: column
    gap: token.space.2          # 2px between name and meta row
  right: Checkbox or RadioButton (flex-shrink: 0)
```

---

## States

```yaml
selected:
  bg: token.color.background.primary    # unchanged — highlight is on control only
  control: Checkbox.selected / RadioButton.selected

focus:
  # Focus is managed at the list level (role="option" inside role="listbox")
  # Individual row: outline visible on keyboard navigation
  ring: token.color.content.primary
  ring_width: 2px
  ring_offset: 2px
  ring_inset: true

disabled:
  control: Checkbox.disabled / RadioButton.disable
  opacity: 1   # do not dim the whole row; grey only the control
```

---

## Accessibility

```html
<ul role="listbox" aria-multiselectable="true" aria-label="Select patients for Fever Package">
  <li
    role="option"
    aria-selected="false"
    class="patient-list-item"
    tabindex="0"
  >
    <img class="avatar" src="..." alt="Saumya, Female, 26" />
    <div class="text-block">
      <span class="name">Saumya</span>
      <div class="meta">
        <span>Female, 26</span>
        <button class="edit-link" aria-label="Edit Saumya's profile">Edit</button>
      </div>
    </div>
    <input type="checkbox" aria-label="Select Saumya" tabindex="-1" />
  </li>
</ul>
```

- Parent container is `role="listbox"` with `aria-multiselectable="true"` (multi-select) or `"false"` (single-select)
- Each row is `role="option"` with `aria-selected`
- The visual checkbox/radio is decorative for screen readers — the option's `aria-selected` carries the selection state
- "Edit" is a separate `<button>` with `aria-label` including the patient's name to disambiguate
- Touch target: 56px height meets WCAG minimum

---

## Implementation Notes

**Edit tap target.** The "Edit" text button occupies ~24px height, below the 44px minimum. The consuming layout (AccordionCard) should extend the "Edit" tap area. In a list row, the entire row is the primary tap target for selection; "Edit" is a secondary action and may use a 44×44dp invisible hit area.

**New Patient row.** The "+ Add new patient" CTA is NOT a PatientListItem variant — it is a separate text button rendered in the AccordionCard's footer slot, alongside "View all".
