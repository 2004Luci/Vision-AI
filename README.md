# VisionAI – Assistive Technology for the Visually Impaired

A prototype application that helps blind and visually impaired individuals by providing real-time object descriptions through camera input and text-to-speech output.

## Features

- Real-time camera object detection (planned)
- Offline ML model processing (planned)
- Text-to-speech audio feedback (planned)
- **React Native (Expo)** mobile app with **TypeScript** and **Tailwind (NativeWind)**
- **FastAPI** backend API (Python)
- **ML models** in a dedicated `models/` folder (planned)

## Project Structure

```
VisionAI/
├── frontend/         # Expo React Native app (TypeScript, NativeWind)
├── backend/         # FastAPI backend (Python)
├── models/          # ML models (to be added)
├── .githooks/       # Git hooks (branch name validation)
├── .github/         # CI workflows
├── package.json     # Root scripts (runs frontend commands)
├── README.md
└── SETUP_INSTRUCTIONS.md
```

## Quick Start

### Prerequisites

- **Node.js** (v18+)
- **Python 3.10+** (for backend)
- **Expo Go** app (for testing on device)
- **Android Studio** / **Xcode** (for emulators; optional)

### Run the app (frontend only)

From the **repo root**:

```bash
npm install          # only if you need root deps (optional)
npm start            # starts Expo dev server
npm run android      # Android
npm run ios          # iOS (macOS only)
npm run web          # Web
```

Or from the **frontend** folder:

```bash
cd frontend
npm install
npm start
```

**Tunnel mode** (if your phone can’t reach the dev server on the same Wi‑Fi, e.g. “Failed to download remote update” in Expo Go):

```bash
cd frontend
npx expo start --tunnel
```

Then open in Expo Go (scan QR code) or press `a` (Android) / `i` (iOS) / `w` (web).

### Backend & models

Backend is implemented with FastAPI. See [SETUP_INSTRUCTIONS.md](SETUP_INSTRUCTIONS.md) for backend and ML setup.

## Detailed setup

See **[SETUP_INSTRUCTIONS.md](SETUP_INSTRUCTIONS.md)** for:

- Git hooks (branch name validation)
- Backend (FastAPI) setup
- Frontend (Expo) configuration
- Environment variables and troubleshooting

## Branching & pull request workflow

1. **Create a branch** with a suitable name (enforced by pre-commit):
   - `feature/<slug>` — new features (e.g. `feature/camera-settings`)
   - `bugfix/<slug>` — bug fixes (e.g. `bugfix/audio-crash`)
   - `update/<slug>` — updates or refactors (e.g. `update/deps`)
   - `release/<slug>` — release prep (e.g. `release/1.0.0`)
   - Use lowercase letters, numbers, dots, underscores, hyphens only.

2. **Open a PR into `development`** (not `main`). Get review and merge to `development`.

3. **When ready for production**, open a PR **from `development` to `main`**. After merge, `main` is the production branch.

**One-time setup:** Install Git hooks so branch names are validated on commit: see [SETUP_INSTRUCTIONS.md](SETUP_INSTRUCTIONS.md#2-git-hooks-one-time-all-contributors).

## Contributing

This is a prototype project for educational purposes.
