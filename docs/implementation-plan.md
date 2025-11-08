# VoiceTales — Implementation Plan

## 🛠️ Step-by-Step Build Sequence

### **Phase 1 — MVP: Emotional Story Generator**
**Goal:** Create a minimal but magical story-to-voice experience.

1. **Setup & Environment**
   - Initialize Vite + React + TypeScript project
   - Install Tailwind CSS + shadcn/ui
   - Connect Supabase project (auth + storage + database)
   - Configure environment variables (API keys, Supabase URL)

2. **Core Layout & Navigation**
   - Create base routes: `/`, `/dashboard`, `/generate`, `/library`
   - Add top navigation (Account, Subscription, Word Quota)
   - Implement responsive layout with 8pt grid and soft shadows

3. **Auth & Onboarding**
   - Implement email/password and Google OAuth via Supabase
   - Create warm welcome screen with microcopy:
     > “Welcome to VoiceTales — where your stories come to life in color and sound.”
   - Redirect new users to `/dashboard`

4. **Story Input Interface**
   - Text input area with file upload (JPEG, PDF)
   - Display file parsing progress (“Reading your story…”)
   - Store parsed text in Supabase

5. **AI Narration Pipeline**
   - Integrate text-to-speech API (OpenAI TTS / ElevenLabs)
   - Add Emotional Dial (🌙 Calm → 🚀 Adventure)
   - Map dial setting to emotional parameters for voice generation
   - Generate and stream audio back to browser
   - Save result (metadata + URL) in Supabase

6. **Adaptive Background Music**
   - Create simple keyword + emotion matching system
   - Fetch corresponding royalty-free track
   - Mix using Web Audio API or pre-mix in backend function
   - Provide toggle for 🎼 Music / 🔊 SFX

7. **Playback & Library**
   - Build story cards with cover art + metadata
   - Add playback options:
     - Voice-only
     - Voice + background
   - Include “Reuse Voices” and “Replay” buttons

8. **UI Polish & Accessibility**
   - Add hover states, gentle motion (200–300ms ease-in-out)
   - Keyboard shortcuts for play/pause
   - “Quiet Mode” toggle to disable ambient sounds
   - Verify AA+ contrast ratios

---

### **Phase 2 — V1: Personalization & Emotional Depth**
**Goal:** Make storytelling more human, expressive, and memorable.

1. **Voice Cloning**
   - Record/upload short voice sample
   - Send to cloning API
   - Save custom voice profile linked to user

2. **Story Replay Mode**
   - Regenerate voice track with emotional variation
   - Limit 3 free replays per story (track via Supabase)
   - Label each replay with emotional profile (“Playful v2”)

3. **Smart Audio Mixer (Silent Helper)**
   - Analyze voice amplitude and background music volume
   - Adjust balance dynamically
   - Provide “Auto Adjust” toggle in player controls

4. **Usage & Billing Dashboard**
   - Track word count, replay count, and emotion usage
   - Display with playful bar charts (shadcn/ui)
   - Implement subscription tiers: Basic / Family / Pro

5. **Performance Optimization**
   - Preload voice previews
   - Use lazy loading for story cards
   - Cache last Emotional Dial setting per user

---

### **Phase 3 — V2: Delight & Expansion**
**Goal:** Enrich storytelling with more depth and emotional intelligence.

1. **Expanded Emotion Library**
   - Add new Emotional Dial modes (e.g., “💖 Heartfelt”)
   - Broaden sound effect catalog

2. **Offline Playback**
   - Enable service worker caching of generated stories
   - Local storage sync with Supabase

3. **Localization**
   - Multi-language TTS support (EN, ES, FR)
   - Update UI copy dynamically via i18n

4. **Parent Dashboard**
   - Summary of total stories created and time listened
   - Soft encouragement messages (“You’ve created 10 moments of magic!”)

5. **Polish & QA**
   - Monthly 3-user usability tests (Krug-style)
   - Emotional audit: confirm tone consistency and user delight

---

## 🗓️ Timeline & Checkpoints

| Phase | Duration | Key Deliverables |
|-------|-----------|------------------|
| **Phase 1 (MVP)** | 6–8 weeks | Story generation, playback, adaptive music |
| **Phase 2 (V1)** | +6 weeks | Voice cloning, replay mode, mixer, billing |
| **Phase 3 (V2)** | +8 weeks | Localization, offline mode, parental insights |

---

## 👥 Team Roles & Rituals

| Role | Responsibilities |
|------|-------------------|
| **Product Lead / CTO (You)** | Define vision, oversee AI and UX consistency |
| **Frontend Engineer** | React + UI implementation, audio playback logic |
| **Backend Engineer** | Supabase setup, API integration, storage management |
| **AI Audio Engineer** | Voice synthesis tuning, mixdown logic |
| **Designer (Lovable partner)** | Visual + emotional consistency across screens |
| **QA / Accessibility Tester** | Validate playback flow, accessibility, and delight |

### Rituals
- **Weekly Sync (30 min)** → Prioritize blockers & review generated stories  
- **Bi-weekly Usability Test (3 users)** → Observe real parents using MVP  
- **Monthly Emotional Audit** → Rate “warmth” and “joyfulness” of current design  
- **Retro Ritual:** Each sprint ends with the question:  
  > “Did this release make storytelling feel more magical?”

---

## 🌐 Optional Integrations & Stretch Goals
- **Smart Speaker Mode:** Alexa / Google Assistant playback  
- **AI Art Generator:** Illustrations for each story section  
- **Mobile App Wrapper:** React Native build for iOS/Android  
- **Family Share Pack:** Controlled story sharing via private link  
- **Learning Mode:** Highlight emotions and vocabulary as kids listen  

---

VoiceTales’ development should always return to one north star:
> “Does this make storytelling feel *warmer, easier, and more magical* for parents and kids?”
