# [Component Name] — Spec

> **Figma source:** [Link to Figma file]
> **Component family:** [Actions / Forms / Display / Feedback / Navigation]
> **Status:** [Draft / Review / Stable]

---

## Prompt Match

```yaml
prompts:
  - "[phrase 1]"
  - "[phrase 2]"
  - "[phrase 3]"
```

---

## Description

[2-3 sentence description of what this component is and what it does]

### When to use

- [Primary use case]
- [Secondary use case]
- [Additional use case]

### When NOT to use

- [Anti-pattern or when to use a different component]
- [Situation where different component is better]

---

## Anatomy

```
┌─────────────────────────────┐
│  [Visual breakdown]         │
│  [of component parts]       │
└─────────────────────────────┘
```

**Key elements:**
- **Element 1**: [Description and purpose]
- **Element 2**: [Description and purpose]
- **Element 3**: [Description and purpose]

---

## Variants

### Variant 1: [Name]

```yaml
variant_name:
  use_when: "[One-line plain-English condition for choosing this variant]"
  element: button | a | input | div
  tokens:
    background: token.color.background.<id>
    foreground: token.color.content.<id>
    border: token.color.border.<id> | none
    padding_x: token.space.<id>
    padding_y: token.space.<id>
    radius: token.radius.<id>
```

### Variant 2: [Name]

```yaml
variant_name:
  use_when: "[One-line plain-English condition for choosing this variant]"
  element: button | a | input | div
  tokens:
    background: token.color.background.<id>
    foreground: token.color.content.<id>
    border: token.color.border.<id> | none
    padding_x: token.space.<id>
    padding_y: token.space.<id>
    radius: token.radius.<id>
```

---

## States

```yaml
default:
  applies_to: [all]
  changes: {}

hover:
  applies_to: [all]
  changes:
    background: token.color.background.<id>

focus:
  applies_to: [all]
  changes:
    ring: token.color.border.<id>
    ring_width: 2px
    ring_offset: 2px

active:
  applies_to: [all]
  changes:
    background: token.color.background.<id>

disabled:
  applies_to: [all]
  changes:
    opacity: 0.5
    pointer_events: none

loading:
  applies_to: [all]
  changes:
    pointer_events: none

error:
  applies_to: [variant_names]
  changes:
    border: token.color.state.error
    foreground: token.color.state.error
```

---

## Sizes (if applicable)

```yaml
small:
  height: token.space.<id>
  padding_x: token.space.<id>
  padding_y: token.space.<id>
  text: token.font.size.<id>

medium:
  height: token.space.<id>
  padding_x: token.space.<id>
  padding_y: token.space.<id>
  text: token.font.size.<id>

large:
  height: token.space.<id>
  padding_x: token.space.<id>
  padding_y: token.space.<id>
  text: token.font.size.<id>
```

---

## With Icons (if applicable)

```yaml
leading_icon:
  layout: inline-flex
  align: center
  gap: token.space.<id>
  icon_size: 20px

trailing_icon:
  layout: inline-flex
  align: center
  gap: token.space.<id>
  icon_size: 20px
```

---

## Composition

```yaml
composition:
  can_contain: [ComponentName]
  can_be_contained_by: [ComponentName]
  cannot_combine_with: [ComponentName]
```

---

## Accessibility

### ARIA Attributes

```html
<div
  role="[appropriate role]"
  aria-label="[Descriptive label]"
  aria-describedby="[helper text ID]"
  aria-expanded="false"
  aria-disabled="false"
  tabindex="0"
>
  Content
</div>
```

### Keyboard Support

| Key | Action |
|---|---|
| `Tab` | Move focus to component |
| `Shift + Tab` | Move focus to previous element |
| `Enter` or `Space` | Activate component (if interactive) |
| `Escape` | Close/cancel (if applicable) |
| `Arrow keys` | Navigate within component (if applicable) |

### Touch Targets

- **Minimum size**: 44×44px (exceeds WCAG 2.5.5 requirement)
- **Spacing**: Minimum 8px between adjacent interactive elements
- **Mobile**: Increase padding if needed to meet minimum

### Screen Reader Announcements

**What should be announced:**
- Component type and purpose
- Current state (expanded, selected, disabled)
- Value or content
- Any error messages

---

## Content Guidelines

### Text Length

- **Label**: [Max characters, e.g., 50]
- **Description**: [Max characters, e.g., 120]
- **Helper text**: [Max characters, e.g., 80]

### Tone & Voice

- [Friendly / Professional / Urgent / etc.]
- Use [sentence case / title case]
- [Active voice / Clear and direct]

---

## Usage Guidelines

### Do's

✅ **Do this:**
- [Specific guideline with example]
- [Specific guideline with example]

### Don'ts

❌ **Don't do this:**
- [What to avoid with example]
- [What to avoid with example]

---

## Implementation Notes

**HTML element:**
- Use `<button>` for actions
- Use `<a>` for navigation
- Use semantic HTML where possible

**Performance:**
- [Any performance considerations]

**Browser support:**
- Modern browsers: Full support
- Legacy browsers: [Fallback behavior if needed]
