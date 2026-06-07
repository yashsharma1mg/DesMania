# Avatar — Spec

> **Figma source:** https://www.figma.com/design/T96zjkCns9zCJ2oHYTPe7I/Diagnostics-Ideal-checkout — patient list rows
> **Component family:** Data Display / Identity
> **Status:** Draft — derived from Diagnostics Ideal Checkout patient list; not yet in Dopamine_2.0_Components library

---

## Prompt Match

```yaml
prompts:
  - "avatar"
  - "profile image"
  - "patient avatar"
  - "user profile"
  - "profile picture"
  - "person image"
```

---

## Description

Avatar is a circular image container used to represent a person (patient, doctor, or user). In the checkout flow, patient list items use a 40×40 avatar displaying a stock illustration keyed to gender (young female, adult male, etc.). A fallback initial-letter state is shown when no image is available.

### When to use

- Patient list items (PatientListItem)
- Doctor cards
- Profile sections

### When NOT to use

- Product images — use a square image container with rounded corners instead
- Decorative icons — use Icon directly

---

## Anatomy

```
  ╭───╮
 │ A │   ← 40×40 full-circle container
  ╰───╯
```

---

## Variants

### avatar.image

```yaml
avatar.image:
  description: Shows a profile photograph or stock illustration.
  size: 40px × 40px      # default (checkout usage)
  shape: full circle
  content: <img> with object-fit: cover
```

### avatar.initials

```yaml
avatar.initials:
  description: Fallback when no photo is available. Shows first + last initial.
  bg: token.color.background.subtle    # #EEF1F5
  text: initials (14px Bold, content.secondary)
```

---

## Sizes

| Size | Dimensions | Usage |
|------|-----------|-------|
| `small` | 32×32px | Compact lists |
| `medium` | 40×40px | Standard patient list item (default) |
| `large` | 48×48px | Doctor cards, profile sections |

---

## Tokens

```yaml
avatar:
  size:
    small: 32px               # raw
    medium: 40px              # raw (default checkout usage)
    large: 48px               # raw

  shape:
    radius: token.radius.full  # 9999px — always circular

  fallback_initials:
    bg: token.color.background.subtle   # #EEF1F5
    color: token.color.content.secondary  # #414752
    font_family: token.font.family.sans
    font_size: token.font.size.body-14    # 14px
    font_weight: token.font.weight.bold   # 700
    line_height: token.font.line-height.20  # 20px
```

---

## Accessibility

```html
<!-- With image -->
<img
  class="avatar"
  src="avatar-url.jpg"
  alt="Saumya, Female, 26"    <!-- descriptive alt with patient context -->
  width="40"
  height="40"
/>

<!-- Initials fallback -->
<div class="avatar avatar--initials" role="img" aria-label="Saumya">
  <span aria-hidden="true">SA</span>
</div>
```

- Alt text on photo avatars should describe the person, not the image (`"Saumya, Female, 26"` not `"avatar image"`)
- Initials fallback uses `role="img"` with `aria-label` for the person's name

---

## Implementation Notes

**Stock illustration source.** The checkout design uses gender-keyed stock illustrations (young female, adult female, adult male). In production, these will be uploaded patient photos. The component must gracefully degrade to initials if no image URL is provided or if the image fails to load.

**No border.** Patient list avatars in the checkout have no visible border ring — they are plain circular clips.
