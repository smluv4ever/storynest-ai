
### Typographic scale
| Token | Size (px) | Line-height | Font / Weight |
|-------|----------:|------------:|---------------|
| H1    | 40        | 48          | Fredoka 700    |
| H2    | 28        | 36          | Fredoka 600    |
| H3    | 20        | 28          | Inter 600      |
| H4    | 16        | 24          | Inter 600      |
| Body  | 16        | 24          | Inter 400      |
| Caption| 12       | 16          | Inter 400      |

### Spacing & layout summary
- Grid base: 8px
- Page padding mobile: 16px
- Card radius: 12px
- Motion: 200–300ms default

---

## Design Integrity Review
- **Verdict:** Visual and interaction choices align with the emotional thesis. Typography and palette create a warm, playful atmosphere while supporting readability and accessibility. Motion and microcopy reinforce the “calm, magical” experience.  
- **One improvement to increase harmony:** Add a secondary, lower-contrast accent palette for “Quiet Mode” (muted pastels and reduced saturation) so the UI can shift to an even calmer state automatically when parents choose it.

---

## Quick Implementation Notes (for dev handoff)
- Export tokens as CSS variables and source them from a single `theme` file.
- Provide Storybook stories for: Emotional Dial, Player, Library Card, Voice Cloning flow.
- Include an accessibility checklist in PR templates.
- Ship a small design spec PDF that includes the typographic table and color tokens for legal/marketing sync.

---
