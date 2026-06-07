# Toggle — Spec

> **Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Dopamine_2.0_Components?node-id=1563-298
> **Component family:** Form Controls
> **Status:** Draft

---

## Prompt Match

```yaml
prompts:
  - "toggle"
  - "switch"
  - "toggle switch"
  - "on off switch"
  - "enable disable toggle"
  - "settings toggle"
```

---

## Description

Toggle (Switch) is a binary control that lets users turn a setting on or off. It presents as a pill-shaped track with a circular thumb that slides between two positions. The selected (on) position moves the thumb to the right and fills the track with brand coral. The default (off) position moves the thumb to the left with a neutral track colour.

Toggle has no size variants — one fixed 40×24px form factor.

### When to use

- Settings screens to toggle features or preferences on/off
- In-line with a label row to control a boolean option
- As a replacement for a checkbox when the action takes immediate effect (no form submit needed)

### When NOT to use

- Do not use Toggle inside a `<form>` that requires explicit submit — use `Checkbox` instead
- Do not use Toggle for multi-option selection — use `Chip/selection` or `RadioButton`
- Do not use Toggle without an associated label; the control must always be paired with descriptive text in the consuming layout

---

## Anatomy

```
Track (40×24px)
┌──────────────────────────┐
│  p-2  [ Thumb 20×20 ] ··· │  ← default (off): thumb at left, gray track
└──────────────────────────┘

┌──────────────────────────┐
│  ··· [ Thumb 20×20 ]  p-2 │  ← selected (on): thumb at right, coral track
└──────────────────────────┘
  track radius: 12px
  thumb radius: 12px (= pill)
  thumb contains optional check icon (16×16) in selected states
```

**Key elements:**
- **Track**: pill-shaped container, 40×24px, carries state colour
- **Thumb**: white circle, 20×20px (derived: 24px track height − 2×2px padding), radius 12px
- **Check icon** (selected states only): 16×16px, positioned 2px inset from thumb edges — signals "on" state

---

## Variants

### default
```yaml
default:
  use_when: "Toggle is off / unchecked"
  element: button
  role: switch
  aria_checked: "false"
  tokens:
    track_background: token.color.border.high-contrast     # #868E9E — neutral off-state
    thumb_background: token.color.background.primary       # #FFFFFF
    track_padding: token.space.2                           # 2px — positions thumb inside track
    track_radius: token.radius.12                          # 12px
    thumb_radius: token.radius.12                          # 12px
    thumb_size: 20px                                       # raw — derived: track_height(24) − 2×padding(2) = 20
  thumb_icon: none
```

### selected
```yaml
selected:
  use_when: "Toggle is on / checked"
  element: button
  role: switch
  aria_checked: "true"
  tokens:
    track_background: token.color.brand.1mg                # #FF5443 — brand coral, on-state signal
    thumb_background: token.color.background.primary       # #FFFFFF
    track_padding: token.space.2
    track_radius: token.radius.12
    thumb_radius: token.radius.12
    thumb_size: 20px
    icon_color: token.color.brand.1mg                      # #FF5443 — check echoes track color on white thumb
    icon_size: 16px                                        # raw — 20px thumb − 2×2px inset = 16px
  thumb_icon: check
  thumb_position: right
```

### disabled
```yaml
disabled:
  use_when: "Toggle is off and cannot be interacted with"
  element: button
  role: switch
  aria_checked: "false"
  aria_disabled: "true"
  tokens:
    track_background: token.color.border.subtle            # #DDE2EB — low-contrast, off-state disabled
    thumb_background: token.color.background.primary       # #FFFFFF
    track_padding: token.space.2
    track_radius: token.radius.12
    thumb_radius: token.radius.12
    thumb_size: 20px
    opacity: 1                                             # full opacity retained — colour itself communicates disabled
    pointer_events: none
  thumb_icon: none
```

### disabled-selected
```yaml
disabled-selected:
  use_when: "Toggle is on but cannot be changed — e.g. locked system setting"
  element: button
  role: switch
  aria_checked: "true"
  aria_disabled: "true"
  tokens:
    track_background: token.color.border.subtle            # #DDE2EB — same muted gray as disabled-off
    thumb_background: token.color.background.primary       # #FFFFFF
    track_padding: token.space.2
    track_radius: token.radius.12
    thumb_radius: token.radius.12
    thumb_size: 20px
    icon_color: token.color.content.tertiary               # #868E9E — muted check signals locked-on state
    icon_size: 16px
    opacity: 1
    pointer_events: none
  thumb_icon: check
  thumb_position: right
```

---

## States

```yaml
focus:
  applies_to: [default, selected]
  ring: token.color.border.high-contrast
  ring_width: 2px
  ring_offset: 2px
  note: Focus ring wraps the track. Disabled states receive no focus ring.

disabled:
  applies_to: [disabled, disabled-selected]
  opacity: 1
  pointer_events: none
  note: >
    Full opacity is intentional — the disabled colour (border.subtle #DDE2EB) is lighter
    than the default (border.high-contrast #868E9E), which is sufficient contrast signal
    without an additional opacity layer. This matches the Figma source.
```

---

## Sizes

```yaml
track:
  width: 40px       # raw value
  height: 24px      # raw value
  radius: token.radius.12

thumb:
  size: 20px        # raw — driven by track_height(24) − 2×token.space.2(2px×2) = 20px
  radius: token.radius.12

icon:
  size: 16px        # raw — driven by thumb_size(20) − 2×2px_inset = 16px
```

---

## Layout

```yaml
track:
  display: flex
  align_items: center       # vertically centres thumb in track
  padding: token.space.2    # 2px all sides — creates 20×20 thumb space

thumb_position:
  default: align-start (flex-start) — thumb at left
  selected: align-end (flex-end) — thumb at right
  transition: thumb slides between positions on state change (animation optional)
```

---

## Accessibility

```html
<!-- Default (off) -->
<button role="switch" aria-checked="false" aria-label="Enable notifications">
  <!-- track + thumb are visual-only children -->
</button>

<!-- Selected (on) -->
<button role="switch" aria-checked="true" aria-label="Enable notifications">
</button>

<!-- Disabled (off) -->
<button role="switch" aria-checked="false" aria-disabled="true" disabled aria-label="Enable notifications">
</button>

<!-- Disabled + Selected (on, locked) -->
<button role="switch" aria-checked="true" aria-disabled="true" disabled aria-label="Enable notifications">
</button>
```

### Screen Reader Announcements

- `role="switch"` causes screen readers to announce "on" / "off" based on `aria-checked` value
- Always pair with a visible or `aria-label`-provided label — the toggle control alone carries no meaning
- If the toggle updates asynchronously (e.g. saved to server), wrap in `aria-live="polite"` region or announce state change separately

---

## Content Guidelines

- **Label**: 2–5 words, noun or verb phrase, sentence case (e.g. "Enable notifications", "Dark mode")
- Do not use the label to state the current state ("Notifications are off") — `aria-checked` handles that
- Place label to the left of the toggle; trailing-label layout is acceptable if left is unavailable

---

## Composition

```yaml
composition:
  can_contain: []
  can_be_contained_by: [SettingsRow, FormField, ListItem, PreferenceCard]
  note: >
    Toggle must always be paired with a label element in the consuming layout.
    The Toggle component itself does not render a label — the consuming component
    owns the label + toggle group and manages the `htmlFor`/`id` pairing.
```

---

## Implementation Notes

**Thumb geometry derivation:**
Track is 24px tall. With 2px padding on all sides (`token.space.2`), the thumb space is 24 − 4 = 20px. Thumb fills this space as a 20×20 circle. The check icon is 16×16, positioned 2px inset from all thumb edges.

**Thumb position:**
Figma uses flexbox `justify-content` to slide the thumb: `flex-start` = default, `flex-end` = selected. A CSS transition on `justify-content` does not animate smoothly — implement with `transform: translateX()` or a CSS `transition` on the thumb element for motion.

**Check icon colour:**
Figma delivers the icon as an SVG asset. In selected state, the icon colour should be `token.color.brand.1mg` (#FF5443) — the brand coral echoed on the white thumb to reinforce the "on" state. In disabled-selected, use `token.color.content.tertiary` (#868E9E) — a muted grey that signals the locked state without visual weight.

**Disabled opacity:**
Both disabled variants use `opacity: 1`. The lighter track colour (`token.color.border.subtle`) is the sole disabled signal. Do not layer additional opacity on top — it would push the thumb below WCAG minimum contrast.

**No label in component:**
Toggle renders the track + thumb only. The label is the consuming layout's responsibility — always wrapped in a `<label>` with `htmlFor` pointing to the `<button id>`, or via `aria-labelledby`.
