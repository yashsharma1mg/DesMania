# Dopamine 2.0 — Accessibility Guidelines

> Designing for Everyone.
> WCAG 2.2 AA · IS 17802 · RPwD Act 2016 · GIGW 3.0
> Companion to the Dopamine 2.0 base tokens reference.

---

## Why This Exists

When a screen on 1mg is inaccessible, a user with a disability can't reorder their blood-pressure medication, can't read a prescription label, can't complete KYC for a teleconsult.

The cost of inaccessibility on a healthcare app isn't "lower engagement." It's people not getting their medicine.

---

## The Legal Stack

Accessibility is now constitutionally binding in India. Five instruments every product builder at 1mg should know:

| Year | Instrument | What it means |
|------|-----------|---------------|
| 2016 | **RPwD Act** — Sections 40, 42, 46 | Statutory foundation. Mandates accessibility standards for all ICT products & services. Section 42 specifically covers digital info & media. |
| 2021 | **IS 17802** (Bureau of Indian Standards) | Indian Standard for ICT Accessibility, Parts 1 & 2. Aligns with WCAG and EN 301 549. Made enforceable via the 2023 RPwD Rules amendment. |
| 2024 | **Rajive Raturi v. UoI** (SC, 8 Nov 2024) | Held Rule 15 ultra vires for being merely recommendatory. Affirmed accessibility as a fundamental right under Article 21. |
| 2025 | **Pragya Prasun v. UoI** (SC, 30 Apr 2025) | Right to digital access declared part of Article 21. Specifically targeted KYC processes that exclude PwDs and acid-attack survivors. |

> **Translation:** digital accessibility is no longer best practice. It is a fundamental right.

---

## Who This Is For

You are not designing for a niche.

| Audience | Scale | Note |
|----------|-------|------|
| Permanent disabilities | 26.8M in India (2011 Census — undercounted) | Visual, auditory, motor, cognitive, speech impairments |
| Age-related decline | 40+ is the fastest-growing buyer cohort | Low vision, hearing loss, motor decline — the demographic that buys most of our medicines |
| Situational impairments | Anyone, any day | Bright sunlight on a screen. One-handed use holding a child. Cracked display. Noisy bus. |
| Low-end / low-bandwidth | Tier-2/3 cities, 3-year-old phones | Budget Android, KaiOS, intermittent connection. Accessibility & performance overlap heavily. |

> **Design for the edges. The middle gets covered for free.**

---

## 01 — The Four Principles (POUR)

WCAG and IS 17802 are both built on these four. Every guideline downstream is a manifestation of one.

### Perceivable
Information must be presentable in ways users can perceive — visually, audibly, or via touch.
- Alt text on a prescription image
- Captions on a health-tip video
- Sufficient contrast on dosage labels

### Operable
Components must be operable by touch, keyboard, voice, switch control, or screen reader.
- 48dp tap targets
- No keyboard traps in modal flows
- Time-outs that can be extended

### Understandable
Information and operation must be understandable — language, navigation, error recovery.
- Plain-language drug instructions
- Predictable navigation
- Clear error messages with fix suggestions

### Robust
Content must be robust enough to be interpreted by a wide variety of user agents, including assistive tech.
- Native components over custom
- Correct ARIA roles
- Tested with TalkBack & VoiceOver

---

## 02 — Colour & Contrast

### The Four Numbers (WCAG 2.2 Level AA — these are the floors)

| Ratio | Applies to | Example |
|-------|-----------|---------|
| **4.5:1** | Body text under 18pt regular, or 14pt bold | Paragraphs, labels, helper text |
| **3:1** | Large text ≥ 18pt regular, or ≥ 14pt bold | Headings, oversized titles, button labels |
| **3:1** | UI components — icons (state), input borders, focus rings | Anything a user has to perceive as interactive |
| **N/A** | Decorative — pure ornament, disabled controls | Exempt — but disabled should still be distinguishable |

### Dopamine Token Contrast Audit

| Foreground | Background | Ratio | Body (4.5) | Large (3.0) | UI (3.0) | Status |
|------------|------------|-------|-----------|------------|---------|--------|
| Content/Primary `#181A1F` | white | 17.41:1 | ✅ AAA | ✅ AAA | ✅ | PASS |
| Content/Secondary `#414752` | white | 9.34:1 | ✅ AAA | ✅ AAA | ✅ | PASS |
| Content/Tertiary `#868E9E` | white | 3.29:1 | ❌ FAIL | ✅ AA | ✅ | PARTIAL |
| Content/Tertiary `#868E9E` | Bg/Subtle `#EEF1F5` | 2.91:1 | ❌ FAIL | ❌ FAIL | ❌ | FAIL |
| States/Warning `#BF9514` | white | 2.79:1 | ❌ FAIL | ❌ FAIL | ❌ | FAIL |
| States/Success `#308956` | white | 4.34:1 | ❌ FAIL | ✅ AA | ✅ | PARTIAL |
| States/Error `#A3111E` | white | 7.91:1 | ✅ AAA | ✅ AAA | ✅ | PASS |
| Brand/1mg Coral `#FF5443` | white | 3.18:1 | ❌ FAIL | ✅ AA | ✅ | PARTIAL |
| Brand/Care Plan `#903E38` | white | 7.16:1 | ✅ AAA | ✅ AAA | ✅ | PASS |
| Border/Subtle `#DDE2EB` | white | 1.30:1 | — | — | ❌ | FAIL |

### The Three Tokens to Handle with Care

**Content/Tertiary — 3.29:1 · Fails for body text**
> Use for icon support or large captions only. For important information, escalate to Content/Secondary.

**States/Warning — 2.79:1 · Fails at every size**
> Never put yellow text on white. Use yellow as the background with Content/Primary on top, or shift text to `Sunshine Yellow 40` (#967500).

**Brand/Coral — 3.18:1 · Fails for body text**
> OK for ≥ 14pt bold (button labels) and as a button background with white text. Not for inline body text or microcopy.

---

## 03 — Typography

### Minimum Sizes

| Size | Style | Use |
|------|-------|-----|
| Heading/32 Extrabold | Page titles | Manage refills |
| Title/22 Extrabold | Section heads | Frequently bought together |
| Body/16 Bold | iOS input minimum | Prevents iOS auto-zoom on focus |
| **Body/14 Regular** | **Practical floor** | Body text default. ≥ 14pt for any sustained reading. |
| Body/12 Regular | Caption only | Allowed only with Content/Primary or Secondary |
| Tag/11 Bold | Densest allowed | Chips, badges. Not for sustained reading. |

> Anything below 11pt fails accessibility. That includes "T&C apply" microcopy.

### Text Scaling

Your design isn't what users see. Many 40+ users set their font scale to 130–150% months ago and forgot.

| Scale | Meaning |
|-------|---------|
| 200% | Maximum WCAG 2.2 AA conformance ceiling. Text must remain readable; content must not be lost. |
| 130% | Most common 40+ user setting. Treat this as the realistic default for testing. |

### The Four Failure Modes at Large Scale

1. **Fixed-height containers.** Buttons, cards, banners with a hard-coded height. Text overflows the moment a user hits 130%.
   - **Fix:** Use `min-height`, never `height`. Vertical padding, not fixed totals.

2. **Single-line truncation on critical text.** "Telmisartan + Hydrochlo…" — the user takes the wrong medicine.
   - **Fix:** Wrap, never ellipsis on dosage, drug name, allergens, or frequency.

3. **Text baked into images.** Promo banners, "Save ₹500" stamps inside JPEGs. Can't scale, translate, or be read by screen readers.
   - **Fix:** Real text overlaid on image. SVG with live `<text>` if typography matters.

4. **Critical content collapsed by default.** Dosage hidden behind "Details ▾". At 200%, the chevron is the only thing on screen.
   - **Fix:** Safety-critical content visible by default at every scale.

### Wrapping vs. Truncation

| Approach | Result | WCAG |
|----------|--------|------|
| Fixed height + ellipsis | Dosage strength "…othiazide 40 mg" hidden from user | ❌ Fails 1.4.4 |
| Hidden behind "Read more" | Dosage one tap away — many older users don't notice | ❌ Still fails |
| Content-driven height | Full drug name and strength visible at every font scale | ✅ Pass |

> Card is taller. That's the design working, not failing.

---

## 04 — Touch Targets

24dp is the WCAG minimum. 1mg holds higher where mistakes are expensive.

| Size | Standard | Use |
|------|----------|-----|
| 24×24dp | WCAG 2.2 AA floor | Inline icons, dismiss ×, small chevrons — with the spacing exception below |
| 44×44dp | WCAG AAA · iOS HIG | iOS default. Meets WCAG enhanced (Level AAA). |
| **48×48dp** | **Dopamine default** | Material Design floor. Use for any consumer touch point on Android & web. |
| ≥ 48 + 12dp | High-stakes actions | OTP, payment, dosage, destructive actions, allergy acknowledgement, KYC |

**The Spacing Exception:** A target smaller than 24×24dp is still WCAG-compliant if a 24px diameter circle centred on it doesn't intersect another target. That's how a 16×16 dismiss × or a spacious-list chevron stays legal — no need to inflate every icon to button size.

---

## 05 — Focus & States

Every interactive element has seven possible states. Having only "default", "disabled", and "selected" is incomplete.

| State | Description |
|-------|-------------|
| Default | Resting appearance |
| Hover | Pointer device over element |
| **Focus** | Keyboard / switch navigation — must be visibly distinct. Never strip the focus ring. |
| Pressed | Active tap or click |
| Loading | Async operation in progress |
| Disabled | Not currently interactive — must still be distinguishable from invisible |
| Selected | Chosen/active state (toggle, tab, checkbox) |

> Currently there are no exhaustive interactive states in Dopamine components. This is a known gap.

---

## 06 — Screen Reader

Screen-reader spec is UX engineering work. When you spec a component, you also spec how a blind user hears it.

### What TalkBack Should Announce (Example)

**What the user sees:** Crocin Advance · 500mg · Strip of 15 · ₹35.20 · [Add to cart]

**What TalkBack should say:**
> "Crocin Advance. Five hundred milligram paracetamol tablets, strip of fifteen. Image."
> "₹35.20."
> "Add to cart, button. Double-tap to add Crocin Advance, fifteen tablets, to your cart."

### Alt Text Rules

| Image type | Good alt text | Don't |
|------------|--------------|-------|
| Product hero | "Crocin Advance, 500mg paracetamol tablets, strip of 15" | "Image" or "Product photo" |
| Promotional banner | "Flat 20% off on diabetes care, this week only" | "Banner" or "Promotional offer" |
| Doctor / specialist | "Dr. Priya Mehta, General Physician" | "Smiling young doctor in white coat" |
| User-uploaded prescription | "Uploaded prescription — tap to add description" | Auto-generated alt from OCR (privacy + safety risk) |
| Decorative icon next to label | `alt=""` (mark as decorative — text already says "Free delivery") | "Truck icon" (double-announces the same info) |

---

## 07 — Forms

Forms are where basic issues start. KYC, prescription upload, address, payment — make every input legible to assistive tech.

### Don't — Placeholder as Label

```
[Pin code placeholder] → 11000 → "Invalid input"
```
Problems:
- Placeholder disappears on input — screen reader user has no anchor
- Doesn't identify the field, explain what's wrong, or suggest a fix
- Validation message floats with no field association

### Do — Persistent Label + Recoverable Error

```
Pin code *
[11000]
⚠ Pin code must be 6 digits. Try "110001" format.
```

Three rules:
1. **Identify the field** — "Pin code" not "Invalid input"
2. **Explain what's wrong** — "must be 6 digits"
3. **Suggest the fix** — "Try '110001' format"

---

## 08 — Motion & Time

| Limit | Rule |
|-------|------|
| 300ms | Maximum duration for functional motion — chevron rotate, sheet slide-in, modal fade. Anything longer is decoration. |
| 0 | Flashes per second above 3 — WCAG 2.3.1. Rules out blinking deals, flashing OTP timers, rapid Lottie animations. |
| 5s | Minimum auto-advance interval on auto-carousels, if used at all. Pause on focus. Provide a stop control. |
| 30s | Warning before session expires — plus an "Extend session" affordance. Never silently log users out mid-prescription. |

> Honour `prefers-reduced-motion`. Treat it like a directive, not a suggestion.

---

## 09 — Language

Plain language is accessibility. Aim for Grade 7–8 on consumer-facing copy.

| Don't | Do |
|-------|-----|
| Antihypertensive prophylaxis | Helps prevent high blood pressure |
| Concurrent administration is contraindicated | Don't take this with [other medicine] |
| Posology: 1 tab BD AC × 5d | Take 1 tablet, twice a day before meals, for 5 days |
| Adverse drug reaction may manifest | Side effects you might notice |

---

## 10 — General Principles

- **Default to larger system text scaling.** Don't fight the user's setting — embrace it. Test at 130% and 200%. Wrap text to fit content.
- **Pair every icon with a text label, wherever possible.** A heart icon may not read as "save" to a 65-year-old.
- **Avoid tooltips and hover-only content.** They don't exist reliably on mobile and aren't accessible via keyboard or screen reader.
- **Confirm destructive actions.** "Cancel order?", "Remove from refill?" — confirm before destroying.
- **Predictable, persistent navigation.** Cart icon stays in the same place. Bottom nav doesn't disappear.

---

## At a Glance — Do / Don't

### Do
- Design every state — default, hover, focus, pressed, disabled, loading, error
- Spec the screen-reader label alongside the visual label
- Use Content/Primary or /Secondary for any text users must read carefully
- Pair colour with at least one other signal (text, icon, weight)
- Treat 48dp as the minimum tap target
- Test layouts in Hindi at 200% font scale
- Provide a manual / assisted alternative to every biometric KYC check
- Aim for AAA on dosage, allergies, expiry, OTP, payment confirmations

### Don't
- Use Content/Tertiary for body text — it fails AA on white
- Put States/Warning yellow text on white — it fails at every size
- Use Coral as a body-text colour at sub-18pt sizes
- Strip focus rings to make designs "cleaner"
- Use placeholder text as the only label
- Auto-rotate carousels on critical surfaces
- Lock users into a single biometric KYC path
- Use Cabinet Grotesk below 24pt
