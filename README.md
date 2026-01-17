<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />

# SPECTRE PROTOCOL

**A cyberpunk 3D space shooter with procedural synthwave music, cloud leaderboards, and PWA support**

[![Three.js](https://img.shields.io/badge/Three.js-0.160.0-black?logo=three.js)](https://threejs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?logo=vite)](https://vitejs.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-11.6.1-FFCA28?logo=firebase)](https://firebase.google.com/)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-5A0FC8?logo=pwa)](https://web.dev/progressive-web-apps/)

[Play Now](#run-locally) | [Features](#features) | [Controls](#controls) | [Architecture](#architecture)

</div>

---

## About

**Spectre Protocol** is a fast-paced 3D space shooter set in a neon-drenched cyberpunk universe. Players pilot a stealth interceptor to destroy incoming data blocks before they breach the system. The game features procedurally generated synthwave music, real-time voice announcements, and a cloud-synced global leaderboard.

Built as a single-file web application for maximum portability, it runs in any modern browser and can be installed as a Progressive Web App on mobile devices.

---

## Features

- **3D Graphics** - Full Three.js rendering with bloom, RGB shift, and post-processing effects
- **Procedural Audio** - Synthwave music generated in real-time using Web Audio API
- **Voice Announcements** - Text-to-speech callouts for game events using Web Speech API
- **Cloud Leaderboard** - Firebase-powered global high scores with localStorage fallback
- **Mobile Support** - Touch controls with virtual joystick for iOS and Android
- **PWA Ready** - Install to home screen for fullscreen native-like experience
- **Adaptive Quality** - Automatic performance scaling for mobile devices
- **Boss Battles** - Epic encounters every 5,000 points with unique boss types
- **Combo System** - Chain kills for score multipliers up to 10x
- **Near-Miss Bonus** - Earn points for close dodges
- **Quick Restart** - Press SPACE to instantly replay after game over
- **High Score Tracking** - Personal best saved locally with distance tracking

---

## Run Locally

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)

### Installation

```bash
# Clone the repository
git clone https://github.com/flynnsbit/Spectre-Protocol.git
cd Spectre-Protocol

# Install dependencies
npm install

# Start development server
npm run dev
```

The game will be available at `http://localhost:3000`

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Gameplay

### Objective

Intercept and destroy incoming data blocks before they pass your position. Allowing **3 enemies** to pass results in **System Failure** (game over).

### Controls

| Action | Desktop | Mobile |
|--------|---------|--------|
| Move | `WASD` or Arrow Keys | Virtual Joystick (left side) |
| Fire | `Space` (hold) or Mouse Click | Fire Button (right side) |
| Aim | Mouse Position | Joystick Direction |

### Game Phases

The game progresses through three phases of increasing intensity:

| Phase | Name | Time | Tempo | Visual |
|-------|------|------|-------|--------|
| 1 | Protocol Start | 0-30s | 128 BPM | Green grid |
| 2 | Hardline | 30-60s | 138 BPM | Cyan grid |
| 3 | System Overdrive | 60s+ | 150 BPM | Magenta grid |

Each phase transition triggers a voice announcement and visual bloom effect.

### Enemy Types

| Type | Shape | Color | Speed | Score |
|------|-------|-------|-------|-------|
| Standard | Cube | Pink | 1.0x | 100 |
| Fast | Octahedron | Cyan | 1.5x | 150 |
| Heavy | Icosahedron | Red | 0.7x | 200 |
| Boss Minion | Small Octahedron | Yellow | 0.09x | 50 |

### Power-Ups

Power-ups spawn every ~15 seconds and provide temporary advantages:

| Power-Up | Color | Effect | Duration |
|----------|-------|--------|----------|
| Rapid Fire | Gold | Fire rate: 250ms → 100ms | 10 seconds |
| Spread Shot | Blue | Triple shot pattern | 10 seconds |
| Armor Plating | RGB | Absorbs one collision | Until hit |
| Time Dilation | Purple | Slows all enemies to 30% speed | 10 seconds |

### Boss Battles

A boss spawns every **5,000 points**. Bosses hover and spawn minions while you attack:

| Boss | Type | HP | Score |
|------|------|----|----|
| The Monolith | Cube | 30 | 1,000 |
| The Prism | Tetrahedron | 20 | 2,000 |
| The Hive | Icosahedron | 50 | 3,000 |

**Note:** Bosses are invulnerable during their entrance animation. Wait for the "Boss vulnerable. Engage." announcement before attacking.

### Combo System

Chain kills quickly (within 2 seconds) to build combos and multiply your score:

| Combo Kills | Multiplier | Voice Callout |
|-------------|------------|---------------|
| 2+ | x2 | - |
| 5+ | x3 | "Triple Kill" |
| 10+ | x5 | "Unstoppable" |
| 20+ | x10 | "Godlike" |

Taking damage resets your combo.

### Near-Miss Bonus

Dodge enemies at close range (without getting hit) to earn **+25 bonus points** and hear "Close Call". Risk vs reward!

### Quick Restart

After game over, press **SPACE** or tap the **Quick Restart** button to immediately start a new game without navigating menus.

### Health System

- **3 HP** - Player can take 2 hits before death
- **Invulnerability** - 2 seconds after taking damage (ship blinks)
- **Armor** - Absorbs one hit, then breaks with debris effect
- **Death Sequence** - 1.5 second animation before game over

### High Score Tracking

Your personal best score is saved locally. After each game:
- If you beat your high score: "NEW HIGH SCORE!" is displayed
- If you didn't: Shows how many points away you were from your record

---

## Architecture

### Project Structure

```
spectre-protocol/
├── index.html          # Complete game (2200 lines: HTML + CSS + JS)
├── index.tsx           # Placeholder (unused)
├── manifest.json       # PWA manifest with icons
├── package.json        # Dependencies and scripts
├── vite.config.ts      # Vite dev server configuration
├── tsconfig.json       # TypeScript configuration
└── README.md           # This file
```

### Single-File Architecture

The entire game is contained in `index.html` for maximum portability. Key sections:

| Section | Description |
|---------|-------------|
| HTML/CSS | Game container, HUD, overlays, mobile controls |
| DeviceConfig | Adaptive quality settings for mobile/desktop |
| CollisionCache | Optimized collision detection with object pooling |
| SharedAssets | Memory-efficient geometry/material caching |
| Firebase | Authentication, Firestore, leaderboard sync |
| AudioSys | Procedural music, SFX, text-to-speech |
| Scene Setup | Three.js scene, camera, renderer, post-processing |
| Player Ship | Custom stealth fighter geometry |
| Boss System | Boss spawning, phases, and destruction |
| Combat | Lasers, enemies, power-ups, collisions |
| Combo System | Kill tracking, multipliers, streaks |
| Game Loop | Main animation loop and state management |

### Game State Machine

```
                    ┌─────────────────────────────────────┐
                    │                                     │
                    v                                     │
┌─────────┐  start  ┌─────────┐  collision/breach  ┌──────┴──────┐
│  IDLE   │────────>│ RUNNING │───────────────────>│    DYING    │
│(overlay)│         │ (game)  │                    │ (1.5s anim) │
└─────────┘         └─────────┘                    └──────┬──────┘
     ^                                                    │
     │                        ┌───────────┐               │
     └────────────────────────│ GAME_OVER │<──────────────┘
              restart         │ (overlay) │
                              └───────────┘
```

### Core Systems

#### DeviceConfig
Detects device capabilities and adjusts quality settings:

```javascript
const DeviceConfig = {
    isMobile: /iPhone|iPad|iPod|Android/i.test(navigator.userAgent),
    isIOS: /iPhone|iPad|iPod/.test(navigator.userAgent) && !window.MSStream,
    pixelRatio: 1,           // Capped at 2x on mobile
    bloomResolutionScale: 1.0, // 0.5 on mobile
    starfieldCount: 2000,    // 1000 on mobile
    particleCount: 12,       // 8 on mobile
    groundSegments: 50,      // 30 on mobile
    // ...
};
```

#### SharedGeos / SharedMats
Pre-allocated geometries and cached materials to eliminate per-frame object creation:

```javascript
const SharedGeos = {
    laser: new THREE.BoxGeometry(0.1, 0.1, 1.5),
    particle: new THREE.BoxGeometry(0.2, 0.2, 0.2),
    enemyBox: new THREE.BoxGeometry(0.9, 0.9, 0.9),
    enemyOcta: new THREE.OctahedronGeometry(0.7, 0),
    // Pre-calculated edges for wireframe rendering
    enemyBoxEdges: new THREE.EdgesGeometry(enemyBox),
    // ...
};

const SharedMats = new Map(); // Keyed by "color-wireframe-transparent"
```

#### CollisionCache
Reusable Box3 objects for collision detection without garbage collection:

```javascript
const CollisionCache = {
    playerBox: new THREE.Box3(),
    tempBox: new THREE.Box3(),
    tempBox2: new THREE.Box3(),
    
    checkIntersection: function(object) {
        this.tempBox.setFromObject(object);
        return this.playerBox.intersectsBox(this.tempBox);
    }
};
```

#### AudioSys
Procedural music engine with beat scheduling and voice synthesis:

```javascript
const AudioSys = {
    ctx: null,              // AudioContext
    tempo: 128,             // BPM (increases with phases)
    speechQueue: [],        // TTS queue for iOS
    
    playKick(), playSnare(), playHiHat(),  // Drums
    playBass(), playLead(),                 // Synths
    speak(),                                // Voice announcements
    // ...
};
```

---

## Performance Optimizations

### iOS Safari SpeechSynthesis Fix

iOS Safari's Web Speech API blocks the main thread for ~300-400ms when speech ends, causing severe frame drops. The solution: keep the speech engine running continuously with silent utterances.

**The Problem:**
- iOS Safari runs speech synthesis on the main thread
- When an utterance ends, the speech engine "spins down" and blocks JavaScript
- This causes 60fps → 30fps frame hitches

**Failed Approaches:**
1. `requestIdleCallback` / `setTimeout` for cleanup - hitch still occurs
2. Utterance object pooling - hitch still occurs
3. Hidden iframe isolation - reduced but still present
4. SAM.js (pure JS speech) - no hitch but voice quality is poor

**The Solution: Keep-Alive Speech Loop**

```javascript
const AudioSys = {
    speechQueue: [],
    speechKeepAliveActive: false,
    
    startSpeechKeepAlive: function() {
        if (!DeviceConfig.isIOS || this.speechKeepAliveActive) return;
        this.speechKeepAliveActive = true;
        
        const keepAlive = () => {
            if (!this.speechKeepAliveActive || this.isMuted) return;
            
            if (this.speechQueue.length > 0) {
                // Play queued real speech
                const text = this.speechQueue.shift();
                const msg = new SpeechSynthesisUtterance(text);
                msg.pitch = 0.4;
                msg.rate = 0.85;
                msg.volume = 1.0;
                if (this.selectedVoice) msg.voice = this.selectedVoice;
                msg.onend = () => setTimeout(keepAlive, 50);
                msg.onerror = () => setTimeout(keepAlive, 50);
                window.speechSynthesis.speak(msg);
            } else {
                // Play silent utterance to keep engine warm
                const silence = new SpeechSynthesisUtterance(".");
                silence.volume = 0.01;
                silence.rate = 10;
                silence.onend = () => setTimeout(keepAlive, 100);
                silence.onerror = () => setTimeout(keepAlive, 100);
                window.speechSynthesis.speak(silence);
            }
        };
        
        keepAlive();
    },
    
    stopSpeechKeepAlive: function() {
        this.speechKeepAliveActive = false;
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }
    },
    
    speak: function(text) {
        if (this.isMuted) return;
        if (text.trim() === "" || text.trim() === " ") return;

        if (DeviceConfig.isIOS) {
            // Queue speech for keep-alive loop to pick up
            this.speechQueue.push(text);
            return;
        }

        // Desktop: use speechSynthesis directly
        if ('speechSynthesis' in window) {
            const msg = new SpeechSynthesisUtterance(text);
            msg.pitch = 0.4;
            msg.rate = 0.9;
            msg.volume = 1.0;
            if (this.selectedVoice) msg.voice = this.selectedVoice;
            window.speechSynthesis.speak(msg);
        }
    }
};
```

**How It Works:**
1. On game start, call `startSpeechKeepAlive()`
2. A continuous loop plays tiny silent utterances (just ".") at near-zero volume and max speed
3. The speech engine stays "warm" and never spins down
4. When `speak("text")` is called, text is pushed to a queue
5. The loop picks up queued speech, plays it with proper settings
6. After real speech ends, immediately resumes silent utterances
7. On game end, call `stopSpeechKeepAlive()` to clean up

**Results:**
- Before: 331ms frame hitch (60fps → 36fps) every time speech ended
- After: Solid 60fps with no hitches, good native iOS voice quality

### Adaptive Graphics Quality

Mobile devices automatically receive optimized settings:

| Setting | Desktop | Mobile |
|---------|---------|--------|
| Pixel Ratio | Native | Capped at 2x |
| Bloom Resolution | 100% | 50% |
| Starfield Count | 2000 | 1000 |
| Particle Count | 12 | 8 |
| Ground Segments | 50x50 | 30x30 |
| Star Size | 0.1 | 0.15 (compensates for fewer stars) |

### Memory Optimization

**Shared Geometries:** All enemy types share pre-allocated geometry objects instead of creating new ones per spawn.

**Material Cache:** Materials are cached by a composite key (`color-wireframe-transparent-polygonOffset`) and reused across all objects.

**Collision Cache:** Three reusable `THREE.Box3` objects handle all collision detection, eliminating per-frame allocations.

---

## PWA Installation

### iOS (Safari)

1. Open the game in Safari
2. Tap the **Share** button (box with arrow)
3. Scroll down and tap **"Add to Home Screen"**
4. Tap **"Add"** in the top right

The game will appear on your home screen and run in fullscreen mode.

### Android (Chrome)

1. Open the game in Chrome
2. Tap the **three-dot menu** (top right)
3. Tap **"Add to Home screen"** or **"Install app"**
4. Confirm the installation

---

## Firebase Configuration

### Default Setup

The game includes a pre-configured Firebase project for the leaderboard. No setup is required for basic functionality.

### Custom Firebase (Optional)

To use your own Firebase project:

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable **Anonymous Authentication**
3. Create a **Firestore Database**
4. Update the `FIREBASE_CONFIG` object in `index.html`:

```javascript
const FIREBASE_CONFIG = {
    apiKey: "your-api-key",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id"
};
```

### Firestore Rules

Scores are stored at: `artifacts/{appId}/public/data/scores`

Recommended security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /artifacts/{appId}/public/data/scores/{scoreId} {
      allow read: if true;
      allow create: if request.auth != null;
    }
  }
}
```

### Offline Fallback

If Firebase is unavailable, scores are stored locally in `localStorage` under `spectre_local_leaderboard`.

---

## Extending the Game

### Adding a New Enemy Type

Edit the `ENEMY_CONFIGS` array (~line 1172):

```javascript
const ENEMY_CONFIGS = [
    { name: 'STANDARD', color: 0xff007f, speed: 1.0, rot: {x: 0.02, y: 0.02}, score: 100 },
    { name: 'FAST', color: 0x00ffc8, speed: 1.5, rot: {x: 0.0, y: 0.1}, score: 150 },
    { name: 'HEAVY', color: 0xff2a00, speed: 0.7, rot: {x: 0.005, y: 0.005}, score: 200 },
    // Add your new enemy type here:
    { name: 'STEALTH', color: 0x333333, speed: 1.2, rot: {x: 0.05, y: 0.05}, score: 250 }
];
```

Then add corresponding geometry in `SharedGeos` and update `spawnEnemy()`.

### Adding a New Power-Up

Edit the `POWERUP_TYPES` array (~line 1184):

```javascript
const POWERUP_TYPES = [
    { name: 'RAPID', color: COLORS.gold, label: "RAPID FIRE" },
    { name: 'SPREAD', color: COLORS.neonBlue, label: "SPREAD SHOT" },
    { name: 'SHIELD', color: COLORS.white, label: "ARMOR PLATING" },
    // Add your new power-up:
    { name: 'MEGA', color: 0xff00ff, label: "MEGA LASER" }
];
```

Then handle the new type in `activatePowerUp()` and the firing logic.

### Modifying Game Phases

Edit the `setPhase()` function (~line 1457) to change phase timing, colors, or effects.

Edit `checkPhaseLogic()` (~line 1486) to change when phases transition.

### Key Functions Reference

| Function | Purpose |
|----------|---------|
| `init()` | Initialize game, scene, controls |
| `startGame()` | Reset state and begin gameplay |
| `animate()` | Main game loop (called every frame) |
| `spawnEnemy()` | Create new enemy instance |
| `createLaser()` | Fire player laser |
| `checkCollisions()` | Handle all collision detection |
| `registerKill()` | Process enemy kill with combo system |
| `gameOver()` | End game and show overlay |

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| [Three.js](https://threejs.org/) | 0.160.0 | 3D graphics engine |
| [Vite](https://vitejs.dev/) | 6.2.0 | Development server and bundler |
| [Firebase](https://firebase.google.com/) | 11.6.1 | Authentication and Firestore database |
| [Tailwind CSS](https://tailwindcss.com/) | CDN | UI styling |
| Web Audio API | Native | Procedural music and sound effects |
| Web Speech API | Native | Voice announcements |
| TypeScript | 5.8.2 | Type checking (configured, minimal usage) |

---

## License

This project is provided as-is for educational and entertainment purposes.

---

<div align="center">

**[Back to Top](#spectre-protocol)**

Made with Three.js, Web Audio, and caffeine

</div>
