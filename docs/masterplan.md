# VoiceTales — Masterplan

## 🎬 30-Second Elevator Pitch
VoiceTales is a warm, playful web app that turns children’s stories into expressive, emotionally intelligent narrations.  
Parents upload or write a story, and VoiceTales brings it to life with human-like voices, adaptive background music, and gentle sound effects that match the story’s mood — creating bedtime moments that sound like magic.

---

## 🧭 Problem & Mission
**Problem:**  
Traditional audiobooks lack personal connection. Reading aloud every night can be exhausting, and flat AI narration kills the magic.  

**Mission:**  
Empower parents and caregivers to effortlessly transform any story into a cinematic, emotionally rich audio experience — one that feels handcrafted and full of heart.

---

## 🎯 Target Audience
- Parents and guardians seeking calm, joyful bedtime experiences  
- Children (ages 3-10) who love imaginative storytelling  
- Educators enhancing reading engagement in classrooms  

---

## 🧩 Core Features
- **AI Emotional Narration** — Auto-detects tone, characters, and emotion  
- **Adaptive Soundscapes** — Suggests background music and sound effects matching mood  
- **Emotional Dial** — Global tone slider (Calm → Adventure)  
- **Story Replay Mode** — Natural emotional re-reads for freshness  
- **Voice Cloning** — Record your own or a loved one’s voice  
- **Story Library** — Replay, reuse, or share your creations privately  
- **Simple Auth & Dashboard** — Email or Google login, word quota tracking  
- **Smart Audio Mixer (Silent Helper)** — Optional assistant that balances sound automatically  

---

## 🧱 High-Level Tech Stack
| Layer | Technology | Why It Fits |
|-------|-------------|-------------|
| Frontend | **Vite + TypeScript + React + shadcn/ui + Tailwind CSS** | Fast, composable, and supports playful UI motion |
| Backend | **Supabase** | Unified database, storage, and auth with minimal overhead |
| Auth | **Supabase Auth (Email + Google)** | Simple and privacy-first |
| Storage | **Supabase Buckets** | Stores text, audio, and user uploads |
| AI Voice Layer | **OpenAI TTS / ElevenLabs / Play.ht (API)** | Emotional speech synthesis |
| Hosting | **Lovable Cloud** | Seamless deployment and collaboration environment |

---

## 🧩 Conceptual Data Model (in words)
**User**  
→ has many **Stories**  
→ each Story has many **Voices** (system-assigned or custom)  
→ each Story has one **EmotionalProfile** (Dial setting, keywords, mood)  
→ each Story generates one or more **Mixdowns** (voice + music + SFX render)

---

## 🎨 UI Design Principles (Aligned with Krug’s Laws)
- **Don’t make me think:** single-step “Generate Emotional Reading” button  
- **Self-evident controls:** emoji-based Emotional Dial  
- **Design for scanning:** big story cards, minimal text clutter  
- **Visual kindness:** warm palette, round corners, gentle shadows  
- **Feedback with delight:** playful animations (“Mixing voices and melodies…”)  

---

## 🔒 Security & Compliance Notes
- All voice samples stored securely in Supabase with user-only access  
- Voice cloning models used strictly for personal, non-public playback  
- Option to delete all assets at any time  
- COPPA-friendly: no social features, zero external sharing by default  

---

## 🚀 Phased Roadmap

### **MVP**
- Text upload or typing
- AI voice narration + Emotional Dial
- Basic adaptive music pairing
- Story Library with playback
- Secure Supabase login

### **V1**
- Voice Cloning (record/upload)
- Story Replay Mode
- Smart Audio Mixer (Silent Helper)
- Basic analytics (usage & billing)

### **V2**
- Expanded sound/emotion libraries
- Offline playback
- Localization (multi-language voices)
- Light parental dashboard (usage tracking, gentle recommendations)

---

## ⚖️ Risks & Mitigations
| Risk | Mitigation |
|------|-------------|
| Emotional mismatch between voice & music | Fine-tune mood classifier, user override |
| Voice cloning misuse | Clear consent prompts, personal-use enforcement |
| Audio latency in browser | Preload strategy + progressive rendering |
| Overcomplex UI for parents | “Calm first” UX: defaults set to safe, delightful presets |

---

## 🌈 Future Expansion Ideas
- Story-creation templates for kids to co-write with parents  
- “Story Postcards” — short sharable clips (if sharing ever added)  
- Integration with smart speakers (Alexa, Google Home)  
- Dynamic illustrations generated alongside narration  
- Educational mode: emotional literacy through storytelling  

---

**VoiceTales** blends emotion-aware AI and playful design to make storytelling feel alive, safe, and full of wonder — turning everyday text into soundscapes that speak, sing, and smile.
