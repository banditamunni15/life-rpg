# Life RPG

Turn your real-life habits into a character build. Complete quests (study, coding,
exercise, reading, personal growth) to earn XP, grow attributes, level up, keep
streaks alive, and evolve your character.

## Tech stack

- React 19 + Vite
- Firebase Authentication (email/password)
- Cloud Firestore (per-user progress storage)

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a Firebase project at https://console.firebase.google.com
   - Enable **Authentication → Sign-in method → Email/Password**
   - Create a **Firestore database** (start in production mode)
   - Deploy the included `firestore.rules` (or paste its contents into the
     Firestore Rules tab) so users can only read/write their own document
   - Under Project Settings → General → Your apps, register a Web app and
     copy the config values

3. Copy `.env.example` to `.env.local` and fill in your Firebase config:

   ```bash
   cp .env.example .env.local
   ```

4. Run the dev server:
   ```bash
   npm run dev
   ```

If the browser reports `CONFIGURATION_NOT_FOUND` from
`identitytoolkit.googleapis.com`, the API key in `.env.local` is not attached
to an active Firebase Web app. Copy the complete current config again from
Project Settings > General > Your apps, replace every `VITE_FIREBASE_*` value,
and restart Vite. Also confirm that Authentication is enabled for the project.

## How progress is stored

Each signed-in user has a single Firestore document at `users/{uid}` holding
their XP, coins, streak, attributes, and quest list. It's created with sensible
defaults on first login and updated after every quest action, so progress
survives refreshes and works across devices.

## Project structure

```
src/
  firebase/config.js       Firebase app/auth/firestore initialization
  firebase/userData.js     Read/write per-user progress document
  context/AuthContext.jsx  Signup/login/logout + auth state
  components/Auth/         Login and Signup screens
  components/Dashboard.jsx Main game dashboard (post-login)
  components/              Character card, quests, attributes, streak, rewards
  utils/rpgConstants.js    XP table, attribute map, evolution stages
  utils/rpgEngine.js       Pure functions: leveling, streaks, attributes, coins
```

## Team

- M1: Main UI/dashboard + integration
- M2: Authentication + Firebase/database
- M3: XP, levels, streaks, attributes, rewards logic
- M4: UI polish, animations, responsiveness

## AI usage disclosure

Portions of this project (Firebase authentication setup, Firestore data layer,
and wiring the existing XP/level/streak/attribute engine into the UI) were
built with AI assistance (Claude), as permitted by the hackathon rulebook.
