<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1Jn-X0rbBk-mabAjnBHGzN5zdDghwQp4V

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

---

## iOS Performance Optimizations

### The Problem: iOS Safari SpeechSynthesis Blocks Main Thread

iOS Safari's Web Speech API (`speechSynthesis`) has a fundamental limitation: it blocks the main JavaScript thread for ~300-400ms when an utterance completes. This causes severe frame drops (60fps → 30fps) in games and animations.

**Root Cause:**
- iOS Safari runs speech synthesis on the main thread
- When an utterance ends, the speech engine "spins down" and performs cleanup
- This cleanup blocks JavaScript execution for 300-400ms
- No amount of JavaScript-level workarounds (deferred callbacks, utterance pooling, etc.) can prevent this

**Failed Approaches:**
1. `requestIdleCallback` / `setTimeout` for cleanup - hitch still occurs
2. Utterance object pooling - hitch still occurs  
3. Hidden iframe isolation - reduced but still present
4. SAM.js (pure JS speech) - no hitch but voice quality is poor

### The Solution: Keep-Alive Speech Loop

The key insight: iOS only blocks when the speech engine **stops**. If we keep it running continuously, there's no spin-down blocking.

**Implementation:**

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

### Other iOS Optimizations

**Device Detection:**
```javascript
const DeviceConfig = {
    isMobile: /iPhone|iPad|iPod|Android/i.test(navigator.userAgent),
    isIOS: /iPhone|iPad|iPod/.test(navigator.userAgent) && !window.MSStream,
    // Adaptive quality settings...
};
```

**Adaptive Graphics Quality:**
- Capped pixel ratio at 2x on mobile (iPhone Pro uses 3x native)
- Reduced bloom resolution to 50% on mobile
- Reduced particle counts and ground geometry segments
- Reduced starfield count with slightly larger star size

**Collision Detection Optimization:**
- `CollisionCache` system with 3 reusable `THREE.Box3` objects
- Eliminates per-frame object creation that triggers garbage collection
