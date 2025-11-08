# design-guidelines.md

## Emotional Thesis
Feels like a colorful kids’ library — warm light, playful curves, and calm interaction flow.  
(Reference: informed by `design-tips.md` emotional-first approach.)

---

## Visual & Emotional Summary (one sentence)
Calm, joyful, and softly playful — the UI makes parents feel in control and children feel enchanted.

---

## Typography
- **Principle:** legible, friendly, and warm.
- **Typefaces**
  - **Display / H1–H2:** *Fredoka* — rounded, friendly, friendly-weighted for headlines.
  - **Body / UI:** *Inter* — neutral, highly readable at small sizes.
- **Hierarchy (mobile-first)**
  - H1 — 40px / 48px line-height / Fredoka 700
  - H2 — 28px / 36px line-height / Fredoka 600
  - H3 — 20px / 28px line-height / Inter 600
  - H4 — 16px / 24px line-height / Inter 600
  - Body — 16px / 24px line-height / Inter 400
  - Caption — 12px / 16px line-height / Inter 400
- **Rules**
  - Maintain ≥ 1.5× line-height for body copy.
  - Use larger leading for long-form copy to reduce cognitive load.
  - Prefer sentence-case for UI labels (calm, friendly tone).

---

## Color System
- **Principle:** warm, playful, high-contrast where needed, gentle backgrounds.
- **Core palette**
  - Primary — `#FFB84C` / RGB(255,184,76) — Warm sunshine
  - Accent — `#FF6F61` / RGB(255,111,97) — Playful energy
  - Secondary — `#6CC5FF` / RGB(108,197,255) — Friendly calm
  - Background — `#FFF8E7` / RGB(255,248,231) — Soft comfort
  - Text — `#2E2E2E` / RGB(46,46,46) — Easy readability
- **Semantic additions**
  - Success — `#4CAF50`
  - Warning — `#FFB84C` (reuse primary in lower opacity)
  - Danger — `#E75452`
  - Muted / Surface — `#F6F4F2`
- **Contrast & accessibility**
  - Body text must meet **WCAG AA (≥ 4.5:1)** against background.
  - Use darker text (`#2E2E2E`) on light cards; reserve white text for strongly colored CTA only when contrast is sufficient.
  - Provide high-contrast variant tokens for "Quiet Mode" and accessibility theme.

---

## Spacing & Layout
- **Grid:** 8-point system (mobile-first).
- **Containers**
  - Page padding (mobile): 16px (2×8)
  - Container max-widths: mobile 100% → md 720px → lg 1024px → xl 1280px
- **Card rules**
  - Padding: 16–24px depending on card importance
  - Border-radius: 12px
  - Elevation: subtle shadow (soft blur, low opacity)
- **Breakpoints & responsive rules**
  - Mobile-first breakpoints: `sm` ≥ 640px, `md` ≥ 768px, `lg` ≥ 1024px
  - Stack vertically on ≤ `sm`; two-column grid at `md`; three-column at `lg` for library thumbnails
- **Vertical rhythm**
  - Base line-height multiples: 1× (tight UI label), 1.5× (body), 2× (hero or long text)

---

## Motion & Interaction
- **Principle:** expressive but gentle; never startling.
- **Easing & duration**
  - Micro-interactions: 150–220ms, `ease-out`
  - Standard transitions: 200–300ms, `ease-in-out`
  - Modal / scene transitions: 300–420ms, slightly springy
- **Interaction patterns**
  - Hover: subtle scale (1.02) + shadow lift
  - Click: brief 90–120ms press animation
  - Loading: friendly progress copy + looping gentle shimmer
  - Generation step: playful narrative message ("Mixing voices and melodies…")
- **Motion constraints**
  - Never exceed 500ms for non-cinematic UI motion.
  - Provide a **Reduce Motion** toggle in accessibility settings.
  - Avoid motion during critical flows (e.g., onboarding confirmation).

---

## Voice & Microcopy
- **Tone:** calm, helpful, slightly playful.
- **Copy rules**
  - Short sentences (≤ 20 words).
  - Lead with intent — label first, then detail.
  - Use emojis only in casual contexts (Emotional Dial, not legal copy).
- **Examples**
  - Welcome: “Welcome back! Let’s make your next story sing.”
  - Generate CTA: “Generate Emotional Reading”
  - Music Toggle: “Add some magic with background sound?”
  - Replay hint: “A fresh emotional take, coming right up.”
  - Error: “Whoops — we couldn’t read that file. Try a PDF or paste the text.”

---

## System Consistency & Patterns
- **Anchors**
  - Use shadcn/ui primitives for consistent components.
  - Card → Thumbnail → Action pattern across dashboard and library.
- **Component rules**
  - Buttons: Primary (solid primary), Secondary (outline), Ghost (icon only).
  - Emotional Dial: emoji knob + labels; always visible near voice controls.
  - Player: persistent mini-player with play/pause, music toggle, balance slider.
- **Naming**
  - Use clear, verb-first names for actions: `Generate`, `Replay`, `Clone Voice`, `Save Mixdown`.

---

## Accessibility
- **Principles**
  - Keyboard-first interactions.
  - Clear focus states for every control.
  - Screen-reader friendly labels and ARIA roles.
- **Must-have items**
  - Skip-to-content link.
  - Accessible audio controls (volume + captions/transcript).
  - Color contrast audits for each screen (AA+ for body).
  - Toggle: “Quiet Mode” to disable all nonessential sounds.
  - Provide transcripts for every generated story (auto-generated).
- **Testing**
  - Run axe-core checks during CI.
  - Conduct keyboard-only and screen-reader tests in each sprint.

---

## Emotional Audit Checklist
For each major design change, answer:
- Does this evoke the intended emotion? (Calm / Playful / Heartfelt)
- Is motion supporting the feeling, not distracting?
- Does copy sound encouraging, not prescriptive?
- Would a tired parent feel relieved, not overwhelmed?
- Can a child recognize the UI as “fun” and not “scary”?

---

## Technical QA Checklist
- Typography scales match design tokens.
- Contrast ratios meet WCAG AA+ for primary content.
- Interactive states (hover, focus, active) are present and distinguishable.
- Motion durations stay within specified ranges or honor Reduce Motion.
- Audio toggles map to accessible controls and expose state to screen readers.
- All generated audio files are stored with secure, expirable URLs.
- Player persists across route changes without restarting playback.

---

## Adaptive System Memory & Continuity
- Persist last Emotional Dial and last used voice per user.
- If prior design-guidelines exist, reuse shared tokens (color, type, spacing).
- Offer a “carry-over” option on onboarding: “Use your last look and feel” to maintain continuity.

---

## Design Snapshot Output
### Color palette (copy-paste tokens)
