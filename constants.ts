
export const GEMINI_MODEL = 'gemini-2.5-flash';

export const INITIAL_GAME_CODE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Spectre Protocol</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body {
            font-family: 'Inter', sans-serif;
            margin: 0;
            overflow: hidden;
            height: 100vh;
            width: 100vw;
            background-color: #0b0213;
        }
        
        #main-container {
            position: relative;
            width: 100%;
            height: 100%;
        }
        
        #game-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
        }
        
        #ui-panel {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: auto;
            min-height: 80px;
            background: linear-gradient(to top, rgba(11, 2, 19, 0.95), rgba(11, 2, 19, 0.6));
            backdrop-filter: blur(4px);
            border-top: 2px solid #ff007f;
            z-index: 20;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            padding: 0 2rem;
            box-shadow: 0 -5px 20px rgba(255, 0, 127, 0.2);
        }

        #hud {
            position: absolute;
            top: 20px;
            left: 20px;
            color: #00ffc8;
            font-family: monospace;
            font-size: 1.2rem;
            z-index: 50;
            text-shadow: 0 0 5px #00ffc8;
            pointer-events: none;
            background: rgba(0, 0, 0, 0.3);
            padding: 10px;
            border: 1px solid rgba(0, 255, 200, 0.3);
            border-radius: 4px;
        }
        
        .breach-warning {
            color: #ff007f;
            font-weight: bold;
            animation: pulse-red 1s infinite;
        }

        @keyframes pulse-red {
            0% { opacity: 0.7; text-shadow: 0 0 5px #ff007f; }
            50% { opacity: 1; text-shadow: 0 0 15px #ff007f; }
            100% { opacity: 0.7; text-shadow: 0 0 5px #ff007f; }
        }

        h1 {
            color: #ff007f;
            text-shadow: 0 0 10px #ff007f;
            font-size: 1.5rem;
            margin: 0;
            font-family: monospace;
            font-weight: bold;
            letter-spacing: 2px;
        }
        
        #overlay-screen {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.85);
            color: #ff007f;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 100;
            text-align: center;
            backdrop-filter: blur(5px);
        }
        
        .glitch-text {
            font-size: 4rem;
            font-weight: 900;
            letter-spacing: 4px;
            text-shadow: 2px 2px #00ffc8;
            animation: glitch-effect 0.2s infinite alternate-reverse;
            margin-bottom: 1rem;
        }
        
        @keyframes glitch-effect {
            0% { transform: translate(1px, 1px); text-shadow: 2px 2px #00ffc8; }
            25% { transform: translate(-1px, -1px); text-shadow: -2px 2px #ff007f; }
            50% { transform: translate(-1px, 1px); text-shadow: 2px -2px #00ffc8; }
            100% { transform: translate(1px, -1px); text-shadow: -2px -2px #ff007f; }
        }
        
        .neon-button {
            background: #0b0213;
            color: #00ffc8;
            padding: 1rem 2.5rem;
            border-radius: 4px;
            font-weight: bold;
            text-transform: uppercase;
            cursor: pointer;
            border: 2px solid #00ffc8;
            box-shadow: 0 0 10px #00ffc8, inset 0 0 10px #00ffc8;
            transition: all 0.2s;
            margin-top: 20px;
            font-family: monospace;
            letter-spacing: 2px;
        }
        
        .neon-button:hover {
            background: #00ffc8;
            color: #0b0213;
            box-shadow: 0 0 20px #00ffc8, inset 0 0 20px #00ffc8;
        }
        
        .control-btn {
            background: transparent;
            border: 1px solid #ff007f;
            color: #ff007f;
            padding: 0.4rem 1rem;
            cursor: pointer;
            font-size: 0.75rem;
            transition: 0.2s;
            font-family: monospace;
            margin-left: 10px;
        }
        
        .control-btn:hover {
            background: #ff007f;
            color: white;
        }
        
        .leaderboard {
            width: 90%;
            max-width: 400px;
            margin-top: 20px;
            border: 2px solid #00ffc8;
            box-shadow: 0 0 15px #00ffc8;
            font-family: monospace;
            background: rgba(0, 0, 0, 0.7);
            color: #00ffc8;
        }

        .leaderboard h3 {
            background: #00ffc8;
            color: #0b0213;
            padding: 8px;
            margin: 0;
            font-size: 1.1rem;
            text-shadow: none;
        }
        
        .leaderboard table {
            width: 100%;
            border-collapse: collapse;
            font-size: 0.9rem;
        }
        
        .leaderboard th, .leaderboard td {
            padding: 6px 10px;
            text-align: left;
            border-bottom: 1px solid rgba(0, 255, 200, 0.2);
        }
        
        .leaderboard tr:nth-child(even) {
            background: rgba(0, 255, 200, 0.05);
        }

        .leaderboard tr:hover {
            background: rgba(255, 0, 127, 0.1);
        }

        @media (max-width: 768px) {
            #ui-panel {
                flex-direction: column;
                padding: 1rem;
                gap: 0.5rem;
                min-height: 100px;
            }
            .control-group {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
            }
            .glitch-text { font-size: 2rem; }
            .leaderboard { width: 95%; }
        }
    </style>
    
    <script type="importmap">
        {
            "imports": {
                "three": "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js",
                "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/",
                "firebase/app": "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js",
                "firebase/auth": "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js",
                "firebase/firestore": "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js"
            }
        }
    </script>
</head>
<body>

<div id="main-container">
    <div id="game-container">
        <div id="hud">
            <div>SCORE: <span id="score-display">0</span></div>
            <div class="mt-2 text-red-400">BREACHES: <span id="missed-display">0</span>/3</div>
            <div id="wave-display" class="text-xs mt-1 text-pink-500 opacity-80">PHASE: INITIALIZING</div>
        </div>
        
        <div id="overlay-screen">
            <p class="glitch-text" id="overlay-title">SPECTRE PROTOCOL</p>
            <div id="leaderboard-display" class="leaderboard">
                <h3>TOP 10 INTERCEPTORS</h3>
                <table>
                    <thead><tr><th>Rank</th><th>Agent</th><th>Score</th></tr></thead>
                    <tbody id="leaderboard-body">
                        <tr><td colspan="3" class="text-center text-xs text-pink-400">Loading Data...</td></tr>
                    </tbody>
                </table>
            </div>
            <div id="instructions" class="text-center mt-6">
                <p class="text-white font-mono text-sm max-w-md p-2 mx-auto">
                    MISSION: INTERCEPT INCOMING DATA BLOCKS.
                </p>
                <p class="text-pink-500 font-mono text-xs mb-4">
                    WARNING: ALLOWING 3 ENEMIES TO PASS RESULTS IN SYSTEM FAILURE.
                </p>
                <div class="text-cyan-300 text-xs font-mono mb-6">
                    MOVE: WASD / ARROWS / MOUSE | FIRE: SPACE / CLICK
                </div>
            </div>
            <button id="start-btn" class="neon-button">INITIATE PROTOCOL</button>
        </div>
    </div>
    
    <div id="ui-panel">
        <div class="flex flex-col items-start">
            <h1>SPECTRE PROTOCOL</h1>
            <p class="text-xs text-cyan-600 font-mono">SYS.VER.8.7 // ENGINES & AUDIO FIX</p>
        </div>
        <div class="text-center hidden md:block">
            <div class="text-xs text-pink-500 font-mono animate-pulse">DATABASE LINK ESTABLISHED</div>
        </div>
        <div class="control-group flex items-center">
            <button id="mute-btn" class="control-btn">MUTE AUDIO</button>
        </div>
    </div>
</div>

<script type="module">
    import * as THREE from 'three';
    import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
    import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
    import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
    import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
    import { CopyShader } from 'three/addons/shaders/CopyShader.js';

    import { initializeApp } from 'firebase/app';
    import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
    import { getFirestore, collection, query, limit, onSnapshot, addDoc, serverTimestamp, setLogLevel } from 'firebase/firestore';

    const FirebaseState = {
        db: null,
        auth: null,
        userId: null
    };

    const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');
    const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
    const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

    if (Object.keys(firebaseConfig).length > 0) {
        const app = initializeApp(firebaseConfig);
        FirebaseState.db = getFirestore(app);
        FirebaseState.auth = getAuth(app);
        setLogLevel('error');
    }

    async function initializeFirebase() {
        const auth = FirebaseState.auth;
        if (!auth) return;
        try {
            if (initialAuthToken) {
                await signInWithCustomToken(auth, initialAuthToken);
            } else {
                await signInAnonymously(auth);
            }
        } catch (error) {
            console.error("Firebase authentication failed:", error);
            FirebaseState.userId = crypto.randomUUID();
        }

        onAuthStateChanged(auth, (user) => {
            if (user) {
                FirebaseState.userId = user.uid;
                setupLeaderboardListener();
            } else {
                FirebaseState.userId = crypto.randomUUID();
                setupLeaderboardListener();
            }
        });
    }

    function getScoresCollectionRef() {
        return collection(FirebaseState.db, \`artifacts/\${appId}/public/data/scores\`);
    }

    function setupLeaderboardListener() {
        if (!FirebaseState.db) {
            document.getElementById('leaderboard-body').innerHTML = \`<tr><td colspan="3" class="text-center text-pink-400">Offline Mode</td></tr>\`;
            return;
        }
        const scoresQuery = query(getScoresCollectionRef(), { field: 'score', direction: 'desc' }, limit(10));
        onSnapshot(scoresQuery, (snapshot) => {
            renderLeaderboard(snapshot.docs.map(doc => doc.data()));
        });
    }

    function renderLeaderboard(scores) {
        const body = document.getElementById('leaderboard-body');
        body.innerHTML = '';
        if (scores.length === 0) {
            body.innerHTML = \`<tr><td colspan="3" class="text-center text-xs text-pink-400">No scores yet.</td></tr>\`;
            return;
        }
        scores.forEach((s, index) => {
            const row = body.insertRow();
            row.insertCell(0).innerText = index + 1;
            row.insertCell(1).innerText = s.name.substring(0, 12);
            row.insertCell(2).innerText = s.score;
        });
    }

    async function submitScore(finalScore) {
        if (!FirebaseState.db) return;
        
        const inputContainer = document.createElement('div');
        inputContainer.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.9); z-index: 200; display: flex; flex-direction: column; align-items: center; justify-content: center;';
        inputContainer.innerHTML = \`
            <div class="p-6 bg-[#0b0213] border-2 border-[#ff007f] rounded-lg shadow-xl text-center">
                <p class="text-xl text-[#00ffc8] font-mono mb-4">NEW HIGH SCORE! INITIALS:</p>
                <input id="score-name-input" type="text" maxlength="12" placeholder="XXX" 
                       class="w-full p-2 mb-4 bg-gray-900 border border-[#00ffc8] text-[#ff007f] font-mono text-center rounded-sm">
                <button id="submit-name-btn" class="neon-button text-sm p-2">SUBMIT</button>
            </div>
        \`;
        document.body.appendChild(inputContainer);

        return new Promise((resolve) => {
            document.getElementById('submit-name-btn').onclick = () => {
                const input = document.getElementById('score-name-input');
                const name = input.value.trim() || 'ANONYMOUS';
                document.body.removeChild(inputContainer);
                resolve(name);
            };
        }).then(async (name) => {
            await addDoc(getScoresCollectionRef(), {
                name: name,
                score: finalScore,
                timestamp: serverTimestamp(),
                userId: FirebaseState.userId,
            });
        });
    }

    // --- FULL EDM AUDIO ENGINE ---
    const AudioSys = {
        ctx: null, isMuted: false, isPlaying: false,
        nextNoteTime: 0, tempo: 128, lookahead: 25.0, scheduleAheadTime: 0.1, timerID: null, measure: 0, beat: 0,
        
        init: function() {
            if (!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)();
            if (this.ctx.state === 'suspended') this.ctx.resume();
        },
        toggleMute: function() {
            this.isMuted = !this.isMuted;
            if (this.isMuted) { if(this.ctx) this.ctx.suspend(); } 
            else { if(this.ctx) this.ctx.resume(); }
            return this.isMuted;
        },
        
        playTone: function(freq, type, len, time, vol=0.1) {
            if (this.isMuted || !this.ctx) return;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, time);
            gain.gain.setValueAtTime(vol, time);
            gain.gain.exponentialRampToValueAtTime(0.01, time + len);
            osc.connect(gain); gain.connect(this.ctx.destination);
            osc.start(time); osc.stop(time + len);
        },

        playNoise: function(len, filterFreq, time) {
            if (this.isMuted || !this.ctx) return;
            const bufferSize = this.ctx.sampleRate * len;
            const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
            const noise = this.ctx.createBufferSource();
            noise.buffer = buffer;
            const gain = this.ctx.createGain();
            const filter = this.ctx.createBiquadFilter();
            filter.type = 'highpass'; filter.frequency.value = filterFreq;
            gain.gain.setValueAtTime(0.3, time);
            gain.gain.exponentialRampToValueAtTime(0.01, time + len);
            noise.connect(filter); filter.connect(gain); gain.connect(this.ctx.destination);
            noise.start(time);
        },
        
        // Synth: Kick
        playKick: function(time) {
            if (this.isMuted || !this.ctx) return;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.frequency.setValueAtTime(150, time);
            osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.5);
            gain.gain.setValueAtTime(0.8, time);
            gain.gain.exponentialRampToValueAtTime(0.01, time + 0.5);
            osc.connect(gain); gain.connect(this.ctx.destination);
            osc.start(time); osc.stop(time + 0.5);
        },
        
        playSnare: function(time) { this.playNoise(0.1, 1000, time); },
        playHiHat: function(time, open = false) { this.playNoise(open ? 0.1 : 0.05, 8000, time); },

        // Synth: Bass
        playBass: function(time, freq, intensity = 0) {
             if (this.isMuted || !this.ctx) return;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const filter = this.ctx.createBiquadFilter();
            osc.type = 'sawtooth'; osc.frequency.setValueAtTime(freq, time);
            filter.type = 'lowpass';
            const baseFreq = 200 + (intensity * 2000);
            filter.frequency.setValueAtTime(baseFreq, time);
            filter.frequency.exponentialRampToValueAtTime(100, time + 0.2);
            gain.gain.setValueAtTime(0.15, time);
            gain.gain.exponentialRampToValueAtTime(0.01, time + 0.3);
            osc.connect(filter); filter.connect(gain); gain.connect(this.ctx.destination);
            osc.start(time); osc.stop(time + 0.3);
        },

        // Synth: Lead
        playLead: function(time, freq) {
            if (this.isMuted || !this.ctx) return;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'square'; 
            osc.frequency.setValueAtTime(freq, time);
            osc.frequency.linearRampToValueAtTime(freq + 5, time + 0.1);
            gain.gain.setValueAtTime(0.05, time);
            gain.gain.exponentialRampToValueAtTime(0.001, time + 0.3);
            osc.connect(gain); gain.connect(this.ctx.destination);
            osc.start(time); osc.stop(time + 0.3);
        },
        
        scheduleNote: function(beatNumber, time) {
            const gameTime = (performance.now() - gameStartTime) / 1000;
            const intensity = Math.min(1, gameTime / 120);

            // Kick
            if (beatNumber % 4 === 0 && gameTime > 2) this.playKick(time);
            // Snare
            if (gameTime > 15 && (beatNumber === 4 || beatNumber === 12)) this.playSnare(time);
            // HiHat
            if (gameTime > 10) {
                if (intensity > 0.5) this.playHiHat(time, beatNumber % 4 === 2);
                else if (beatNumber % 2 === 0) this.playHiHat(time);
            }
            
            // Bass
            const bassRoot = [55, 55, 65.4, 43.6][Math.floor((this.measure % 4))]; 
            if (gameTime > 30 && gameTime < 60) {
                 this.playBass(time, bassRoot, intensity); // Drop
            } else {
                if (beatNumber === 0 || beatNumber === 3 || beatNumber === 7 || beatNumber === 10) {
                    this.playBass(time, bassRoot, intensity);
                }
            }
            
            // Lead Arp
            if (gameTime > 45 && beatNumber % 2 === 0) {
                const arpNotes = [440, 523, 659, 880];
                this.playLead(time, arpNotes[Math.floor(Math.random()*arpNotes.length)]);
            }
        },
        
        scheduler: function() {
            while (this.nextNoteTime < this.ctx.currentTime + this.scheduleAheadTime) {
                this.scheduleNote(this.beat, this.nextNoteTime);
                const secondsPerBeat = 60.0 / this.tempo / 4;
                this.nextNoteTime += secondsPerBeat;
                this.beat++;
                if (this.beat === 16) { this.beat = 0; this.measure++; }
            }
            this.timerID = window.setTimeout(this.scheduler.bind(this), this.lookahead);
        },
        start: function() {
            if (this.isPlaying) return;
            this.isPlaying = true; this.beat = 0; this.measure = 0;
            this.nextNoteTime = this.ctx.currentTime + 0.1;
            this.scheduler();
        },
        stop: function() {
            this.isPlaying = false; window.clearTimeout(this.timerID);
        },
        
        // SFX
        playLaser: function() { 
            if (this.isMuted || !this.ctx) return;
            this.playTone(880, 'square', 0.1, this.ctx.currentTime, 0.1);
        },
        playExplosion: function() {
             if (this.isMuted || !this.ctx) return;
             for(let i=0; i<3; i++) {
                 this.playBass(this.ctx.currentTime, 30 + Math.random() * 40, 1.0); 
             }
        },
        playBreach: function() {
            if (this.isMuted || !this.ctx) return;
            this.playTone(150, 'sawtooth', 0.5, this.ctx.currentTime, 0.5);
        }
    };

    let scene, camera, renderer, composer;
    let player, groundMesh1, groundMesh2;
    const lasers = [];
    const enemies = [];
    const keys = { left: false, right: false };
    let score = 0, missedEnemies = 0, isGameOver = false, isGameRunning = false, gameStartTime = 0;
    let spawnInterval = 2500, lastEnemySpawnTime = 0, targetX = 0;
    
    const COLORS = { cyan: 0x00ffc8, pink: 0xff007f, dark: 0x0b0213, neonGreen: 0x00ff88, darkGreen: 0x004411 };
    const GROUND_SIZE = 200;
    
    // Use a function to create enemy types to ensure THREE is ready, although implicit here
    // But we can define the config data statically
    const ENEMY_CONFIGS = [
        { name: 'STANDARD', color: 0xff007f, speed: 1.0, rot: {x: 0.02, y: 0.02}, score: 100 },
        { name: 'FAST', color: 0x00ffc8, speed: 1.5, rot: {x: 0.0, y: 0.1}, score: 150 },
        { name: 'HEAVY', color: 0xff2a00, speed: 0.7, rot: {x: 0.005, y: 0.005}, score: 200 }
    ];

    function init() {
        initializeFirebase();
        const container = document.getElementById('game-container');
        scene = new THREE.Scene();
        scene.background = new THREE.Color(COLORS.dark);
        scene.fog = new THREE.FogExp2(COLORS.dark, 0.02); 

        camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.set(0, 1.0, 6); 
        camera.rotation.x = -0.1;

        renderer = new THREE.WebGLRenderer({ antialias: false });
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        const ambientLight = new THREE.AmbientLight(COLORS.pink, 0.5);
        scene.add(ambientLight);
        const dirLight = new THREE.DirectionalLight(COLORS.pink, 1);
        dirLight.position.set(0, 10, 5);
        scene.add(dirLight);

        createGround();
        createPlayerShip();
        createStarfield();
        setupPostProcessing(container.clientWidth, container.clientHeight);

        window.addEventListener('resize', onWindowResize);
        container.addEventListener('mousemove', (e) => {
             const rect = renderer.domElement.getBoundingClientRect();
             targetX = ((e.clientX - rect.left) / rect.width * 2 - 1) * 8;
        });
        container.addEventListener('click', () => { if(isGameRunning) createLaser(); });

        window.addEventListener('keydown', (e) => {
            if(!isGameRunning) return;
            if (e.code === 'ArrowLeft' || e.code === 'KeyA') { keys.left = true; }
            if (e.code === 'ArrowRight' || e.code === 'KeyD') { keys.right = true; }
            if (e.code === 'Space') {
                if (!e.repeat) createLaser();
                e.preventDefault();
            }
        });
        
        window.addEventListener('keyup', (e) => {
            if (e.code === 'ArrowLeft' || e.code === 'KeyA') keys.left = false;
            if (e.code === 'ArrowRight' || e.code === 'KeyD') keys.right = false;
        });

        document.getElementById('start-btn').addEventListener('click', startGame);
        document.getElementById('mute-btn').addEventListener('click', (e) => {
            e.target.innerText = AudioSys.toggleMute() ? "UNMUTE AUDIO" : "MUTE AUDIO";
        });

        animate(0);
    }

    function setupPostProcessing(w, h) {
        composer = new EffectComposer(renderer);
        composer.addPass(new RenderPass(scene, camera));
        // GLOW ADJUSTMENT: Threshold 0.2 ensures lasers/ships glow, but dark ground does not.
        composer.addPass(new UnrealBloomPass(new THREE.Vector2(w, h), 0.75, 0.5, 0.2));
        composer.addPass(new ShaderPass(CopyShader));
    }

    function createGround() {
        const geo = new THREE.PlaneGeometry(60, GROUND_SIZE, 20, 40);
        const mat = new THREE.MeshBasicMaterial({ 
            color: COLORS.darkGreen, 
            wireframe: true, 
            side: THREE.DoubleSide 
        });

        groundMesh1 = new THREE.Mesh(geo, mat);
        groundMesh1.rotation.x = -Math.PI / 2;
        groundMesh1.position.set(0, -1.5, -GROUND_SIZE/2 + 6); 
        scene.add(groundMesh1);

        groundMesh2 = new THREE.Mesh(geo, mat);
        groundMesh2.rotation.x = -Math.PI / 2;
        groundMesh2.position.set(0, -1.5, -GROUND_SIZE/2 + 6 - GROUND_SIZE); 
        scene.add(groundMesh2);
    }

    function updateGround(delta) {
        const speed = 20 * delta;
        groundMesh1.position.z += speed;
        groundMesh2.position.z += speed;

        if (groundMesh1.position.z > 6 + GROUND_SIZE/2) groundMesh1.position.z -= GROUND_SIZE * 2;
        if (groundMesh2.position.z > 6 + GROUND_SIZE/2) groundMesh2.position.z -= GROUND_SIZE * 2;
    }

    function createStarfield() {
        const geo = new THREE.BufferGeometry();
        const pos = [];
        for(let i=0; i<2000; i++) pos.push((Math.random()-0.5)*200, (Math.random()-0.5)*100, (Math.random()-0.5)*200);
        geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
        const mat = new THREE.PointsMaterial({size: 0.1, color: 0xffffff});
        scene.add(new THREE.Points(geo, mat));
    }

    function createPlayerShip() {
        const group = new THREE.Group();
        // Bright colors for player to ensure bloom
        const body = new THREE.Mesh(new THREE.ConeGeometry(0.4, 1.2, 3), new THREE.MeshBasicMaterial({color: 0xff007f}));
        body.rotation.x = Math.PI / 2;
        body.rotation.z = Math.PI;
        group.add(body);

        // Restore Green Engines (Bright Cyan)
        const engineGeo = new THREE.BoxGeometry(0.6, 0.1, 0.1);
        const engineMat = new THREE.MeshBasicMaterial({ color: 0x00ffc8 });
        const engine = new THREE.Mesh(engineGeo, engineMat);
        engine.position.set(0, 0, 0.5);
        group.add(engine);

        player = group;
        player.position.set(0, -1.0, 0);
        scene.add(player);
    }

    function createLaser() {
        AudioSys.playLaser();
        const l = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 1.5), new THREE.MeshBasicMaterial({color: 0xccffff})); // Very bright for bloom
        l.position.copy(player.position);
        l.position.z -= 1;
        lasers.push(l);
        scene.add(l);
    }

    function spawnEnemy() {
        const typeConfig = ENEMY_CONFIGS[Math.floor(Math.random() * ENEMY_CONFIGS.length)];
        
        let geometry;
        if (typeConfig.name === 'STANDARD') geometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
        else if (typeConfig.name === 'FAST') geometry = new THREE.OctahedronGeometry(0.6, 0);
        else geometry = new THREE.IcosahedronGeometry(0.7, 0);

        // Make Solid Sooner: Use MeshBasicMaterial for solid neon look + Edge Wireframe overlay
        const mat = new THREE.MeshBasicMaterial({ color: typeConfig.color }); 
        const mesh = new THREE.Mesh(geometry, mat);
        
        // Add wireframe overlay for "tech" aesthetic while keeping it solid
        const edges = new THREE.LineSegments(
            new THREE.EdgesGeometry(geometry), 
            new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.4 })
        );
        mesh.add(edges);

        mesh.userData = { 
            speedMult: typeConfig.speed, 
            rotSpeed: typeConfig.rot,
            scoreVal: typeConfig.score 
        };
        
        // Spawn at random X within range
        mesh.position.set((Math.random()-0.5)*10, -1.0, -100);
        enemies.push(mesh);
        scene.add(mesh);
        lastEnemySpawnTime = performance.now();
    }

    function checkCollisions() {
        const pBox = new THREE.Box3().setFromObject(player);
        for (let i = lasers.length - 1; i >= 0; i--) {
            const lBox = new THREE.Box3().setFromObject(lasers[i]);
            for (let j = enemies.length - 1; j >= 0; j--) {
                if (lBox.intersectsBox(new THREE.Box3().setFromObject(enemies[j]))) {
                    AudioSys.playExplosion();
                    const enemyScore = enemies[j].userData.scoreVal || 100;
                    scene.remove(enemies[j]); enemies.splice(j, 1);
                    scene.remove(lasers[i]); lasers.splice(i, 1);
                    score += enemyScore; updateUI();
                    break;
                }
            }
        }
        for (const e of enemies) {
            if (pBox.intersectsBox(new THREE.Box3().setFromObject(e))) {
                AudioSys.playExplosion();
                gameOver("IMPACT DETECTED");
            }
        }
    }

    function updateUI() {
        document.getElementById('score-display').innerText = score;
        document.getElementById('missed-display').innerText = missedEnemies;
        const phase = (performance.now() - gameStartTime) / 1000 > 30 ? "PHASE: HARD" : "PHASE: NORMAL";
        document.getElementById('wave-display').innerText = phase;
    }

    function gameOver(reason) {
        isGameOver = true; isGameRunning = false;
        AudioSys.stop();
        document.getElementById('overlay-title').innerText = \`\${reason}\\nSCORE: \${score}\`;
        document.getElementById('start-btn').innerText = "RETRY";
        document.getElementById('overlay-screen').style.display = 'flex';
        document.getElementById('instructions').style.display = 'none';
        submitScore(score);
    }

    function startGame() {
        AudioSys.init(); AudioSys.start();
        isGameOver = false; isGameRunning = true;
        score = 0; missedEnemies = 0; gameStartTime = performance.now();
        updateUI();
        document.getElementById('overlay-screen').style.display = 'none';
        enemies.forEach(e => scene.remove(e)); enemies.length = 0;
        lasers.forEach(l => scene.remove(l)); lasers.length = 0;
        player.position.set(0, -1.0, 0);
    }

    function onWindowResize() {
        const c = document.getElementById('game-container');
        camera.aspect = c.clientWidth / c.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(c.clientWidth, c.clientHeight);
        composer.setSize(c.clientWidth, c.clientHeight);
    }

    let lastTime = 0;
    function animate(time) {
        requestAnimationFrame(animate);
        if(!lastTime) { lastTime = time; return; }
        const delta = (time - lastTime) / 1000;
        lastTime = time;

        updateGround(delta);

        if (isGameRunning) {
            // Keyboard Input Logic
            if (keys.left) targetX -= 25 * delta;
            if (keys.right) targetX += 25 * delta;
            targetX = Math.max(-8, Math.min(8, targetX));

            const now = performance.now();
            player.position.x += (targetX - player.position.x) * 0.1;
            player.rotation.z = (player.position.x - targetX) * 0.1;

            for (let i = lasers.length - 1; i >= 0; i--) {
                lasers[i].position.z -= 20 * delta;
                if (lasers[i].position.z < -100) { scene.remove(lasers[i]); lasers.splice(i, 1); }
            }
            
            const baseSpeed = 0.025 + (now - gameStartTime) / 120000 * 0.06;
            for (let i = enemies.length - 1; i >= 0; i--) {
                // Update Z position with enemy-specific speed multiplier
                const moveSpeed = baseSpeed * (enemies[i].userData.speedMult || 1.0);
                enemies[i].position.z += moveSpeed * delta * 60 * 20; 
                
                // Rotate Enemy based on type-specific rotation speed
                if (enemies[i].userData.rotSpeed) {
                    enemies[i].rotation.x += enemies[i].userData.rotSpeed.x;
                    enemies[i].rotation.y += enemies[i].userData.rotSpeed.y;
                }

                if (enemies[i].position.z > 6) {
                    scene.remove(enemies[i]); enemies.splice(i, 1);
                    missedEnemies++; AudioSys.playBreach(); updateUI();
                    if (missedEnemies >= 3) gameOver("SECURITY BREACH");
                }
            }

            if (now - lastEnemySpawnTime > Math.max(600, 2500 - (now - gameStartTime)/120000*1900)) spawnEnemy();
            checkCollisions();
        }
        composer.render();
    }
    init();
</script>
</body>
</html>`
