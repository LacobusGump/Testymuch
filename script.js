javascript
class VoidEngine {
  constructor() {
    this.ctx = null;
    this.active = false;
    this.analyser = null;
    this.dataArray = null;
    
    this.bpm = 60;
    this.step = 0;
    this.phrase = 'A';
    this.phraseCount = 0;
    this.phraseStructure = ['A', 'A', 'B', 'A', 'C', 'D', 'E', 'F'];
    this.sectionLength = 32;
    this.microRhythm = 0;
    
    this.motion = 0;
    this.intensity = 0;
    this.direction = 0;
    this.pos = { x: 50, y: 50 };
    this.velocity = { x: 0, y: 0 };
    this.acceleration = { x: 0, y: 0, z: 0 };
    this.lastAccel = { x: 0, y: 0, z: 0 };
    this.motionHistory = [];
    this.motionPattern = 'calm';
    this.stepCounter = 0;
    this.lastStepTime = 0;
    this.gestureRecognition = {
      shake: 0,
      spiral: 0,
      tap: 0,
      sustained: 0,
      chaos: 0,
      wave: 0
    };
    
    this.stage = 'VOID';
    this.subStage = 0;
    this.evolutionProgress = 0;
    this.totalMotion = 0;
    this.firstMovement = false;
    this.buildPhase = false;
    this.releasePhase = false;
    this.climaxPhase = false;
    this.dimensionalPhase = false;
    this.voidPhase = true;
    this.currentTechnique = 'waiting';
    this.lastEvolutionTime = 0;
    this.lastMotionTime = Date.now();
    this.voidCycleTime = 0;
    
    this.currentTheme = 'void';
    this.themes = {
      awakening: { mood: 'mysterious', colors: ['#0a0a0a', '#1a1a1a'], text: 'The Void Stirs', intensity: 0.2 },
      adventure: { mood: 'heroic', colors: ['#ff4500', '#0a0a0a'], text: 'Into the Fire', intensity: 0.5 },
      tension: { mood: 'suspenseful', colors: ['#1e90ff', '#0a0a0a'], text: 'Storm Rising', intensity: 0.7 },
      triumph: { mood: 'epic', colors: ['#8a2be2', '#ff1493'], text: 'Epic Triumph', intensity: 0.9 },
      reflection: { mood: 'serene', colors: ['#ffd700', '#0a0a0a'], text: 'Eternal Peace', intensity: 0.3 },
      chaos: { mood: 'chaotic', colors: ['#ff0000', '#000000'], text: 'Reality Fractures', intensity: 1.0 },
      dimensional: { mood: 'transcendent', colors: ['#00ffff', '#ff00ff'], text: 'Beyond Existence', intensity: 1.2 },
      void: { mood: 'healing', colors: ['#9370db', '#0a0a0a'], text: 'Healing Frequencies', intensity: 0.1 }
    };
    
    // Simplified audio chain
    this.masterGain = null;
    this.limiter = null;
    this.layerGains = {};
    this.layerPanners = {};
    this.layerFilters = {};
    this.layerEQs = {};
    this.layerCompressors = {};
    this.listener = null;
    this.convolver = null;
    this.delay = null;
    this.compressor = null;
    this.masterEQ = null;
    this.sidechain = null;
    this.sidechainGain = null;
    this.voidGain = null;
    
    this.orientation = { alpha: 0, beta: 0, gamma: 0 };
    this.spatialMapping = { x: 0, y: 0, z: 0 };
    
    this.shepardTones = []; 
    this.ostinatoPattern = [0, 2, 0, 5, 0, 3, 0, 7, 1, 4, 1, 6]; 
    this.ostinatoIndex = 0;
    this.shepardIntensity = 0;
    this.shepardRising = true;
    this.tensionBuildup = 0;
    this.glitchProbability = 0;
    this.harmonicTension = 0;
    
    // Reduced voice pool for clarity
    this.voicePool = {
      kick: { max: 1, active: [] },
      bass: { max: 2, active: [] },
      hihat: { max: 3, active: [] },
      snare: { max: 1, active: [] },
      percussion: { max: 4, active: [] },
      ostinato: { max: 4, active: [] },
      harmony: { max: 4, active: [] },
      lead: { max: 3, active: [] },
      pad: { max: 4, active: [] },
      atmosphere: { max: 3, active: [] },
      strings: { max: 6, active: [] }, 
      brass: { max: 4, active: [] },
      choir: { max: 4, active: [] },
      shepard: { max: 2, active: [] },
      risers: { max: 2, active: [] },
      impacts: { max: 1, active: [] }
    };
    
    this.layers = {
      kick: false, bass: false, hihat: false, snare: false, percussion: false,
      ostinato: false, harmony: false, lead: false,
      pad: false, atmosphere: false,
      strings: false, brass: false, choir: false,
      shepard: false, risers: false, impacts: false
    };
    
    this.key = 'D';
    this.keyOffsets = {'C':0, 'Db':1, 'D':2, 'Eb':3, 'E':4, 'F':5, 'Gb':6, 'G':7, 'Ab':8, 'A':9, 'Bb':10, 'B':11};
    this.mode = 'minor';
    this.scales = {
      minor: [0, 2, 3, 5, 7, 8, 10],
      major: [0, 2, 4, 5, 7, 9, 11],
      dorian: [0, 2, 3, 5, 7, 9, 10],
      lydian: [0, 2, 4, 6, 7, 9, 11],
      pentatonic: [0, 2, 4, 7, 9],
      wholeTone: [0, 2, 4, 6, 8, 10]
    };
    this.scale = this.scales[this.mode];
    this.chordProgression = [
      [0, 3, 7],    // i
      [5, 8, 0],    // iv
      [7, 10, 2],   // V
      [3, 7, 10]    // III
    ];
    this.currentChordIndex = 0;
    this.bassNote = 0;
    this.lastLeadFreq = 293.66;
    
    this.elements = {};
    this.waveBars = [];
    
    this.easterEggs = {
      konamiSequence: [],
      goldenRatio: false,
      perfectCircle: false,
      fibonacciSpiral: false,
      shepardInfinity: false,
      harmonicWave: false
    };
    this.specialEvents = {
      timeDilation: 0,
      dimensionalRift: 0,
      harmonicResonance: 0
    };
    
    this.init();
  }

  init() {
    ['startScreen', 'startBtn', 'evolutionSpace', 'orb', 'instruction',
     'stageName', 'bpmDisplay', 'voiceCount', 'intensityDisplay', 'uiMinimal',
     'cinematicOverlay', 'themeText', 'waveform', 'impactFlash']
    .forEach(id => this.elements[id] = document.getElementById(id));
    
    this.elements.startBtn.onclick = () => this.start();
    this.setupMotionDetection();
    this.setupOrientationDetection();
    this.setupWaveformVisualizer();
    this.setupInteractionListeners();
  }

  setupWaveformVisualizer() {
    for (let i = 0; i < 16; i++) {
      const bar = document.createElement('div');
      bar.className = 'wave-bar';
      bar.style.left = (i * 64) + 'px';
      bar.style.height = '0px';
      this.elements.waveform.appendChild(bar);
      this.waveBars.push(bar);
    }
  }

  setupInteractionListeners() {
    let touchSequence = [];
    
    window.addEventListener('touchstart', (e) => {
      if (!this.active) return;
      touchSequence.push({ x: e.touches[0].clientX, y: e.touches[0].clientY, time: Date.now() });
      this.analyzeGesture(touchSequence);
    });

    window.addEventListener('click', (e) => {
      if (!this.active) return;
      touchSequence.push({ x: e.clientX, y: e.clientY, time: Date.now() });
      this.analyzeGesture(touchSequence);
    });

    setInterval(() => {
      const now = Date.now();
      touchSequence = touchSequence.filter(touch => now - touch.time < 5000);
    }, 2000);

    let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    let konamiIndex = 0;
    
    window.addEventListener('keydown', (e) => {
      if (!this.active) return;
      if (e.code === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          this.triggerKonamiEasterEgg();
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    });
  }

  analyzeGesture(sequence) {
    if (sequence.length < 3) return;
    
    const recent = sequence.slice(-10);
    const distances = [];
    const angles = [];
    
    for (let i = 1; i < recent.length; i++) {
      const dx = recent[i].x - recent[i-1].x;
      const dy = recent[i].y - recent[i-1].y;
      distances.push(Math.sqrt(dx*dx + dy*dy));
      angles.push(Math.atan2(dy, dx));
    }
    
    let angleSum = 0;
    for (let i = 1; i < angles.length; i++) {
      let diff = angles[i] - angles[i-1];
      if (diff > Math.PI) diff -= 2 * Math.PI;
      if (diff < -Math.PI) diff += 2 * Math.PI;
      angleSum += diff;
    }
    
    if (Math.abs(angleSum) > Math.PI * 2) {
      this.gestureRecognition.spiral += 0.3;
      if (this.gestureRecognition.spiral > 1 && !this.easterEggs.fibonacciSpiral) {
        this.triggerFibonacciSpiral();
      }
    }
    
    if (distances.length > 5) {
      const avgDistance = distances.reduce((a, b) => a + b, 0) / distances.length;
      const variance = distances.reduce((sum, d) => sum + Math.pow(d - avgDistance, 2), 0) / distances.length;
      
      if (variance < 100 && Math.abs(angleSum) > Math.PI * 1.8) {
        this.easterEggs.perfectCircle = true;
        this.triggerPerfectCircleEasterEgg();
      }
    }
    
    let waveScore = 0;
    for (let i = 2; i < angles.length; i++) {
      const angleDiff = angles[i] - angles[i-2];
      if (Math.abs(angleDiff) > Math.PI / 2 && Math.abs(angleDiff) < Math.PI * 1.5) {
        waveScore += 0.2;
      }
    }
    if (waveScore > 1 && sequence.length > 8) {
      this.gestureRecognition.wave += waveScore / sequence.length;
      if (this.gestureRecognition.wave > 1 && !this.easterEggs.harmonicWave) {
        this.triggerHarmonicWaveEasterEgg();
      }
    }
    
    Object.keys(this.gestureRecognition).forEach(key => {
      this.gestureRecognition[key] = Math.max(0, this.gestureRecognition[key] - 0.01);
    });
  }

  triggerKonamiEasterEgg() {
    console.log('🎮 KONAMI CODE ACTIVATED: God Mode Engaged');
    this.specialEvents.dimensionalRift = 2;
    this.bpm *= 1.5;
    this.currentTheme = 'chaos';
    this.evolveToDimensional();
    this.flashImpact();
  }

  triggerFibonacciSpiral() {
    console.log('🌀 FIBONACCI SPIRAL DETECTED: Golden Ratio Harmony');
    this.easterEggs.fibonacciSpiral = true;
    this.layers.shepard = true;
    this.shepardIntensity = 1;
    this.playGoldenRatioChord();
  }

  triggerPerfectCircleEasterEgg() {
    console.log('⭕ PERFECT CIRCLE: Infinite Loop Activated');
    this.easterEggs.perfectCircle = true;
    this.specialEvents.timeDilation = 1.5;
    this.layers.shepard = true;
    this.shepardIntensity = 1;
    this.playInfiniteLoop();
  }

  triggerHarmonicWaveEasterEgg() {
    console.log('🌊 HARMONIC WAVE DETECTED: Serene Resonance Flows');
    this.easterEggs.harmonicWave = true;
    this.layers.atmosphere = true;
    this.layers.pad = true;
    this.intensity = Math.max(0, this.intensity - 1);
    this.playSereneResonance();
    this.currentTheme = 'reflection';
  }

  flashImpact() {
    this.elements.impactFlash.style.opacity = 1;
    setTimeout(() => this.elements.impactFlash.style.opacity = 0, 150);
  }

  setupOrientationDetection() {
    window.addEventListener('deviceorientation', e => {
      if (!this.active || e.alpha === null) return;
      this.orientation.alpha = e.alpha;
      this.orientation.beta = e.beta;
      this.orientation.gamma = e.gamma;
      this.updateListenerOrientation();
      this.updateSpatialMapping();
    });
  }

  updateSpatialMapping() {
    const alphaRad = this.orientation.alpha * Math.PI / 180;
    const betaRad = this.orientation.beta * Math.PI / 180;
    const gammaRad = this.orientation.gamma * Math.PI / 180;
    
    this.spatialMapping.x = Math.sin(alphaRad) * Math.cos(betaRad);
    this.spatialMapping.y = Math.sin(betaRad);
    this.spatialMapping.z = Math.cos(alphaRad) * Math.cos(betaRad);
    
    this.updateSpatialProcessors();
  }

  updateSpatialProcessors() {
    Object.keys(this.layerPanners).forEach(layer => {
      if (this.layerPanners[layer]) {
        const x = this.spatialMapping.x * 10 + (this.pos.x - 50) * 0.2;
        const y = this.spatialMapping.y * 5 + (this.pos.y - 50) * 0.1;
        const z = this.spatialMapping.z * 8 - 5;
        
        const currentTime = this.ctx.currentTime;
        this.layerPanners[layer].positionX.linearRampToValueAtTime(x, currentTime + 0.05);
        this.layerPanners[layer].positionY.linearRampToValueAtTime(y, currentTime + 0.05);
        this.layerPanners[layer].positionZ.linearRampToValueAtTime(z, currentTime + 0.05);
      }
    });
  }

  updateListenerOrientation() {
    if (!this.listener) return;

    const alphaRad = this.orientation.alpha * Math.PI / 180;
    const betaRad = this.orientation.beta * Math.PI / 180;
    const gammaRad = this.orientation.gamma * Math.PI / 180;

    const forwardX = Math.cos(alphaRad) * Math.cos(betaRad);
    const forwardY = Math.sin(alphaRad) * Math.cos(betaRad);
    const forwardZ = Math.sin(betaRad);

    const upX = -Math.cos(alphaRad) * Math.sin(betaRad) * Math.sin(gammaRad) - Math.sin(alphaRad) * Math.cos(gammaRad);
    const upY = -Math.sin(alphaRad) * Math.sin(betaRad) * Math.sin(gammaRad) + Math.cos(alphaRad) * Math.cos(gammaRad);
    const upZ = Math.cos(betaRad) * Math.sin(gammaRad);

    const currentTime = this.ctx.currentTime;
    this.listener.forwardX.linearRampToValueAtTime(forwardX, currentTime + 0.05);
    this.listener.forwardY.linearRampToValueAtTime(forwardY, currentTime + 0.05);
    this.listener.forwardZ.linearRampToValueAtTime(forwardZ, currentTime + 0.05);
    this.listener.upX.linearRampToValueAtTime(upX, currentTime + 0.05);
    this.listener.upY.linearRampToValueAtTime(upY, currentTime + 0.05);
    this.listener.upZ.linearRampToValueAtTime(upZ, currentTime + 0.05);
  }

  async start() {
    try {
      if (typeof DeviceMotionEvent.requestPermission === 'function') {
        const motionPermission = await DeviceMotionEvent.requestPermission().catch(() => 'denied');
        if (motionPermission !== 'granted') {
          console.log('Motion permission not granted');
        }
      }

      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        const orientationPermission = await DeviceOrientationEvent.requestPermission().catch(() => 'denied');
        if (orientationPermission !== 'granted') {
          console.log('Orientation permission not granted');
        }
      }

      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      await this.ctx.resume();
      this.setupAudioChain();
      this.setLayerPositions();

      this.elements.startScreen.classList.add('hidden');
      this.elements.evolutionSpace.classList.add('active');
      
      setTimeout(() => {
        this.elements.instruction.textContent = 'BE STILL OR MOVE TO AWAKEN';
        this.elements.instruction.classList.add('show');
        setTimeout(() => this.elements.instruction.classList.remove('show'), 5000);
      }, 1500);

      this.active = true;
      this.startSequencer();
      this.animate();
      
      // Start in void state
      setTimeout(() => {
        this.enterVoidState();
      }, 500);
      
    } catch (e) {
      console.error('Failed to start engine:', e);
      alert('Failed to initialize. Please try again.');
    }
  }

  createReverbBuffer(time) {
    const length = this.ctx.sampleRate * time;
    const buffer = this.ctx.createBuffer(2, length, this.ctx.sampleRate);
    
    for (let c = 0; c < 2; c++) {
      const data = buffer.getChannelData(c);
      for (let i = 0; i < length; i++) {
        const decay = Math.pow(1 - i / length, 2.5);
        data[i] = (Math.random() * 2 - 1) * decay * 0.5;
      }
    }
    return buffer;
  }

  setupAudioChain() {
    this.analyser = this.ctx.createAnalyser();
    this.analyser.fftSize = 64;
    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    
    this.limiter = this.ctx.createDynamicsCompressor();
    this.limiter.threshold.value = -3;
    this.limiter.knee.value = 5;
    this.limiter.ratio.value = 8;
    this.limiter.attack.value = 0.001;
    this.limiter.release.value = 0.1;
    
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0.4; 
    
    this.compressor = this.ctx.createDynamicsCompressor();
    this.compressor.threshold.value = -24;
    this.compressor.knee.value = 10;
    this.compressor.ratio.value = 4;
    this.compressor.attack.value = 0.004;
    this.compressor.release.value = 0.2;
    
    this.masterEQ = this.createMultibandEQ();
    
    this.listener = this.ctx.listener;
    this.listener.positionX.value = 0;
    this.listener.positionY.value = 0;
    this.listener.positionZ.value = 0;
    
    this.convolver = this.ctx.createConvolver();
    this.convolver.buffer = this.createReverbBuffer(1.5);
    const reverbGain = this.ctx.createGain();
    reverbGain.gain.value = 0.08;
    
    this.delay = this.ctx.createDelay(1.0);
    this.delay.delayTime.value = 0.25;
    
    const delayFeedback = this.ctx.createGain();
    delayFeedback.gain.value = 0.25;
    const delayFilter = this.ctx.createBiquadFilter();
    delayFilter.type = 'highshelf';
    delayFilter.frequency.value = 4000;
    delayFilter.gain.value = -6;
    
    const delayMix = this.ctx.createGain();
    delayMix.gain.value = 0.12;
    
    this.delay.connect(delayFilter);
    delayFilter.connect(delayFeedback);
    delayFeedback.connect(this.delay);
    this.delay.connect(delayMix);
    
    this.setupSidechain();
    
    const layerNames = Object.keys(this.layers);
    
    const layerLevels = layerNames.map(layer => {
      switch(layer) {
        case 'kick': return 0.3;
        case 'bass': return 0.25;
        case 'hihat': return 0.1;
        case 'snare': return 0.2;
        case 'percussion': return 0.15;
        case 'ostinato': return 0.15;
        case 'harmony': return 0.12;
        case 'lead': return 0.18;
        case 'pad': return 0.1;
        case 'atmosphere': return 0.08;
        case 'strings': return 0.15;
        case 'brass': return 0.15;
        case 'choir': return 0.12;
        case 'shepard': return 0.1;
        case 'risers': return 0.25;
        case 'impacts': return 0.35;
        default: return 0.15;
      }
    });
    
    layerNames.forEach((name, i) => {
      this.layerGains[name] = this.ctx.createGain();
      this.layerGains[name].gain.value = layerLevels[i];

      this.layerCompressors[name] = this.ctx.createDynamicsCompressor();
      this.setupLayerCompressor(name);

      this.layerEQs[name] = this.createLayerEQ(name);

      this.layerPanners[name] = this.ctx.createPanner();
      this.layerPanners[name].panningModel = 'HRTF';
      this.layerPanners[name].distanceModel = 'inverse';
      this.layerPanners[name].refDistance = 1;
      this.layerPanners[name].maxDistance = 10000;
      this.layerPanners[name].rolloffFactor = 1;
      this.layerPanners[name].coneInnerAngle = 360;
      this.layerPanners[name].coneOuterAngle = 0;
      this.layerPanners[name].coneOuterGain = 0;

      this.layerFilters[name] = this.ctx.createBiquadFilter();
      this.layerFilters[name].type = 'lowpass';
      this.layerFilters[name].frequency.value = 20000;
      this.layerFilters[name].Q.value = 1;

      this.layerGains[name].connect(this.layerCompressors[name]);
      this.layerCompressors[name].connect(this.layerEQs[name]);
      this.layerEQs[name].connect(this.layerFilters[name]);
      this.layerFilters[name].connect(this.layerPanners[name]);
      
      if (['kick', 'bass', 'snare', 'percussion', 'impacts'].includes(name)) {
        this.layerPanners[name].connect(this.sidechainGain);
      } else {
        this.layerPanners[name].connect(this.compressor);
      }

      if (['strings', 'brass', 'choir', 'harmony', 'pad', 'atmosphere'].includes(name)) {
        const sendGain = this.ctx.createGain();
        sendGain.gain.value = 0.12;
        this.layerPanners[name].connect(sendGain);
        sendGain.connect(this.convolver);
      }
      
      if (['lead', 'ostinato', 'strings'].includes(name)) {
        const sendGain = this.ctx.createGain();
        sendGain.gain.value = 0.08;
        this.layerPanners[name].connect(sendGain);
        sendGain.connect(this.delay);
      }
    });
    
    this.voidGain = this.ctx.createGain();
    this.voidGain.gain.value = 0;
    this.voidGain.connect(this.limiter);
    
    this.sidechainGain.connect(this.compressor);
    this.compressor.connect(this.masterEQ);
    this.masterEQ.connect(this.limiter);
    this.convolver.connect(reverbGain);
    reverbGain.connect(this.limiter);
    delayMix.connect(this.limiter);
    this.limiter.connect(this.analyser);
    this.analyser.connect(this.masterGain);
    this.masterGain.connect(this.ctx.destination);
  }

  setupSidechain() {
    this.sidechainGain = this.ctx.createGain();
    this.sidechainGain.gain.value = 1;
  }

  triggerSidechainDuck() {
    const now = this.ctx.currentTime;
    this.sidechainGain.gain.cancelScheduledValues(now);
    this.sidechainGain.gain.setValueAtTime(1, now);
    this.sidechainGain.gain.linearRampToValueAtTime(0.75, now + 0.01);
    this.sidechainGain.gain.linearRampToValueAtTime(1, now + 0.15);
  }

  setupLayerCompressor(layer) {
    const comp = this.layerCompressors[layer];
    
    switch(layer) {
      case 'kick':
        comp.threshold.value = -12;
        comp.knee.value = 3;
        comp.ratio.value = 8;
        comp.attack.value = 0.001;
        comp.release.value = 0.1;
        break;
      case 'bass':
        comp.threshold.value = -15;
        comp.knee.value = 5;
        comp.ratio.value = 6;
        comp.attack.value = 0.002;
        comp.release.value = 0.15;
        break;
      case 'snare':
        comp.threshold.value = -10;
        comp.knee.value = 2;
        comp.ratio.value = 6;
        comp.attack.value = 0.001;
        comp.release.value = 0.08;
        break;
      default:
        comp.threshold.value = -20;
        comp.knee.value = 6;
        comp.ratio.value = 4;
        comp.attack.value = 0.002;
        comp.release.value = 0.12;
    }
  }

  createLayerEQ(layer) {
    const input = this.ctx.createGain();
    const output = this.ctx.createGain();
    
    const low = this.ctx.createBiquadFilter();
    const mid = this.ctx.createBiquadFilter();
    const high = this.ctx.createBiquadFilter();
    
    low.type = 'lowshelf';
    low.frequency.value = 150;
    mid.type = 'peaking';
    mid.frequency.value = 1000;
    mid.Q.value = 0.5;
    high.type = 'highshelf';
    high.frequency.value = 8000;
    
    switch(layer) {
      case 'kick':
        low.gain.value = 2;
        mid.gain.value = -2;
        high.gain.value = -6;
        break;
      case 'bass':
        low.gain.value = 1;
        mid.gain.value = 0;
        high.gain.value = -8;
        break;
      case 'hihat':
        low.gain.value = -10;
        mid.gain.value = -3;
        high.gain.value = 1;
        break;
      case 'lead':
        low.gain.value = -3;
        mid.gain.value = 1;
        high.gain.value = 0;
        break;
      case 'pad':
      case 'atmosphere':
        low.gain.value = -6;
        mid.gain.value = 0;
        high.gain.value = 1;
        break;
      default:
        low.gain.value = 0;
        mid.gain.value = 0;
        high.gain.value = 0;
    }
    
    input.connect(low);
    low.connect(mid);
    mid.connect(high);
    high.connect(output);
    
    return { connect: (dest) => input.connect(dest), disconnect: () => output.disconnect(), output };
  }

  createMultibandEQ() {
    const input = this.ctx.createGain();
    const output = this.ctx.createGain();
    
    const low = this.ctx.createBiquadFilter();
    const lowMid = this.ctx.createBiquadFilter();
    const highMid = this.ctx.createBiquadFilter();
    const high = this.ctx.createBiquadFilter();
    
    low.type = 'lowshelf';
    low.frequency.value = 80;
    low.gain.value = -2;
    
    lowMid.type = 'peaking';
    lowMid.frequency.value = 300;
    lowMid.Q.value = 0.5;
    lowMid.gain.value = -2;
    
    highMid.type = 'peaking';
    highMid.frequency.value = 2000;
    highMid.Q.value = 0.5;
    highMid.gain.value = 0;
    
    high.type = 'highshelf';
    high.frequency.value = 8000;
    high.gain.value = 1;
    
    input.connect(low);
    low.connect(lowMid);
    lowMid.connect(highMid);
    highMid.connect(high);
    high.connect(output);
    
    return { connect: (dest) => input.connect(dest), disconnect: () => output.disconnect(), output };
  }

  setLayerPositions() {
    const positions = {
      kick: { x: 0, y: -1, z: -2 },
      bass: { x: 0, y: -2, z: -3 },
      snare: { x: 0, y: 0, z: -1 },
      hihat: { x: 1, y: 1, z: -2 },
      percussion: { x: -1, y: 1, z: -2 },
      ostinato: { x: -3, y: 0, z: -4 },
      harmony: { x: 3, y: 0, z: -4 },
      lead: { x: 0, y: 1, z: -3 },
      pad: { x: 0, y: 3, z: 8 },
      atmosphere: { x: 0, y: 5, z: 15 },
      strings: { x: -6, y: 0, z: -8 },
      brass: { x: 6, y: 0, z: -8 },
      choir: { x: 0, y: 4, z: 12 },
      shepard: { x: 0, y: 8, z: -15 },
      risers: { x: 0, y: 6, z: -20 },
      impacts: { x: 0, y: -3, z: -1 }
    };
    
    Object.entries(positions).forEach(([layer, pos]) => {
      if (this.layerPanners[layer]) {
        this.layerPanners[layer].positionX.value = pos.x;
        this.layerPanners[layer].positionY.value = pos.y;
        this.layerPanners[layer].positionZ.value = pos.z;
      }
    });
  }

  setupMotionDetection() {
    window.addEventListener('devicemotion', e => {
      if (!this.active) return;
      
      const acc = e.accelerationIncludingGravity;
      if (!acc || acc.x === null) return;

      const dx = Math.abs(acc.x - this.lastAccel.x);
      const dy = Math.abs(acc.y - this.lastAccel.y);
      const dz = Math.abs(acc.z - this.lastAccel.z);
      
      const newMotion = Math.sqrt(dx * dx + dy * dy + dz * dz) * 0.7;
      this.updateMotion(newMotion);
      
      this.velocity.x += acc.x * 0.018;
      this.velocity.y += acc.y * 0.018;
      this.updatePosition();
      
      this.direction = Math.atan2(this.velocity.y, this.velocity.x) * (180 / Math.PI);
      
      if (newMotion > 5 && Date.now() - this.lastStepTime > 200) {
        this.stepCounter++;
        this.lastStepTime = Date.now();
        this.syncBPMToSteps();
        this.gestureRecognition.tap += 0.5;
        this.triggerImpactEffects();
      }
      
      if (newMotion > 8) {
        this.gestureRecognition.shake += 0.3;
        if (this.gestureRecognition.shake > 2) {
          this.triggerShakeEffects();
        }
      }
      
      if (newMotion > 12) {
        this.gestureRecognition.chaos += 0.4;
        if (this.gestureRecognition.chaos > 1.5) {
          this.triggerChaosMode();
        }
      }
      
      if (Math.abs(dy) > Math.abs(dx) * 1.5 && newMotion > 3 && newMotion < 7) {
        this.gestureRecognition.wave += 0.1;
      }
      
      this.lastAccel = { x: acc.x, y: acc.y, z: acc.z };
    });

    let lastMouse = { x: 0, y: 0, time: 0 };
    window.addEventListener('mousemove', e => {
      if (!this.active) return;
      
      const now = Date.now();
      const dt = Math.max(1, now - lastMouse.time);
      
      const newX = (e.clientX / window.innerWidth) * 100;
      const newY = (e.clientY / window.innerHeight) * 100;
      
      const velocityX = (newX - lastMouse.x) / dt * 150;
      const velocityY = (newY - lastMouse.y) / dt * 150;
      
      const mouseMotion = Math.sqrt(velocityX * velocityX + velocityY * velocityY) * 0.2;
      this.updateMotion(mouseMotion);
      
      this.pos.x = newX;
      this.pos.y = newY;
      this.direction = Math.atan2(velocityY, velocityX) * (180 / Math.PI);
      
      this.orientation.alpha = (newX / 100) * 360;
      this.orientation.beta = (newY - 50) * 2.0;
      this.orientation.gamma = 0;
      this.updateListenerOrientation();
      this.updateSpatialMapping();
      
      lastMouse = { x: newX, y: newY, time: now };
    });
  }

  updateMotion(newMotion) {
    this.motion = this.motion * 0.6 + newMotion * 0.4;
    this.motionHistory.push(this.motion);
    if (this.motionHistory.length > 50) this.motionHistory.shift();
    
    this.totalMotion += this.motion;
    
    if (this.motion > 0.3) {
      this.lastMotionTime = Date.now();
      if (this.voidPhase) {
        this.voidPhase = false;
        const now = this.ctx.currentTime;
        this.voidGain.gain.linearRampToValueAtTime(0, now + 3);
      }
    }
    
    if (Date.now() - this.lastMotionTime > 3000 && !this.voidPhase) {
      this.enterVoidState();
    }
    
    if (!this.firstMovement && this.motion > 1) {
      this.firstMovement = true;
      this.evolveToTribal();
    }
    
    const avgMotion = this.motionHistory.reduce((a, b) => a + b, 0) / this.motionHistory.length;
    this.intensity = this.motionHistory.reduce((sum, m) => sum + Math.abs(m - avgMotion), 0) / this.motionHistory.length;
    
    const variance = this.intensity;
    const recentHistory = this.motionHistory.slice(-25);
    const isRhythmic = recentHistory.filter(m => m > 3).length > 12 && variance < 2.5;
    const isErratic = variance > 3 && avgMotion > 2.5;
    const isSustained = avgMotion > 3 && variance < 2;
    const isChaotic = variance > 4 && avgMotion > 4;
    const isWavy = this.gestureRecognition.wave > 0.5 && avgMotion > 2 && variance < 3;
    
    if (isChaotic) this.motionPattern = 'chaotic';
    else if (isErratic) this.motionPattern = 'erratic';
    else if (isRhythmic) this.motionPattern = 'rhythmic';
    else if (isSustained) this.motionPattern = 'sustained';
    else if (isWavy) this.motionPattern = 'wavy';
    else this.motionPattern = 'calm';
    
    this.updateTechniques(avgMotion, variance);
    this.updateEvolution();
    this.updateProceduralSystems(avgMotion, variance);
  }

  enterVoidState() {
    console.log('🌌 ENTERING VOID STATE: Healing Frequencies Activated');
    this.voidPhase = true;
    this.stage = 'VOID';
    this.elements.orb.className = 'orb void';
    this.currentTheme = 'void';
    
    Object.keys(this.layers).forEach(layer => this.layers[layer] = false);
    
    const now = this.ctx.currentTime;
    this.voidGain.gain.linearRampToValueAtTime(1, now + 1);
    
    this.playHeavenlySoundscape();
    
    this.elements.themeText.textContent = this.themes.void.text;
    this.elements.themeText.classList.add('visible');
    setTimeout(() => this.elements.themeText.classList.remove('visible'), 5000);
  }

  playHeavenlySoundscape() {
    this.playHeavenlyPad();
    setTimeout(() => {
      if (this.voidPhase && this.active) {
        this.playHeavenlySoundscape();
      }
    }, 15000);
  }

  playHeavenlyPad() {
    const now = this.ctx.currentTime;
    const duration = 20;
    
    for (let layer = 0; layer < 2; layer++) {
      const baseFreq = 110 * Math.pow(2, layer / 3);
      for (let i = 0; i < 2; i++) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();
        const lfo = this.ctx.createOscillator();
        const lfoGain = this.ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.value = baseFreq * Math.pow(2, i / 12);
        osc.detune.value = (i - 1) * 5;
        
        filter.type = 'lowpass';
        filter.frequency.value = 300;
        filter.Q.value = 0.2;
        
        lfo.type = 'sine';
        lfo.frequency.value = 0.08 + layer * 0.04;
        lfoGain.gain.value = 40;
        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);
        
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.006, now + 6); 
        gain.gain.setValueAtTime(0.006, now + duration - 6);
        gain.gain.linearRampToValueAtTime(0, now + duration);
        
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.voidGain);
        gain.connect(this.convolver);
        
        lfo.start(now);
        osc.start(now);
        lfo.stop(now + duration);
        osc.stop(now + duration);
      }
    }
  }

  updateTechniques(avgMotion, variance) {
    if (avgMotion > 3 && variance > 2) {
      this.shepardIntensity = Math.min(this.shepardIntensity + 0.02, 1.0);
      this.tensionBuildup = Math.min(this.tensionBuildup + 0.01, 1.0);
      this.currentTechnique = 'shepard-rising';
    } else if (avgMotion < 1.5) {
      this.shepardIntensity = Math.max(this.shepardIntensity - 0.02, 0);
      this.tensionBuildup = Math.max(this.tensionBuildup - 0.01, 0);
      this.currentTechnique = 'ostinato-calm';
    }
    
    this.buildPhase = (this.motionPattern === 'sustained' || this.motionPattern === 'rhythmic') && avgMotion > 2.5;
    this.releasePhase = this.motionPattern === 'calm' && this.totalMotion > 150;
    this.climaxPhase = this.motionPattern === 'chaotic' && variance > 4;
    this.dimensionalPhase = this.specialEvents.dimensionalRift > 0 || this.easterEggs.fibonacciSpiral;
    
    if (this.climaxPhase) this.currentTechnique = 'climax';
    else if (this.buildPhase) this.currentTechnique = 'build';
    else if (this.releasePhase) this.currentTechnique = 'release';
    else if (this.dimensionalPhase) this.currentTechnique = 'dimensional';
    
    this.harmonicTension = Math.min(avgMotion / 8 + variance / 6, 1);
    
    if (this.motionPattern === 'wavy') {
      this.currentTechnique = 'resonance-flow';
      this.harmonicTension = Math.min(this.harmonicTension * 0.8, 0.6);
      this.shepardIntensity = Math.max(this.shepardIntensity - 0.01, 0.2);
    }
  }

  updatePosition() {
    this.pos.x += this.velocity.x;
    this.pos.y += this.velocity.y;
    
    if (this.pos.x < 5 || this.pos.x > 95) {
      this.velocity.x *= -0.6;
    }
    if (this.pos.y < 5 || this.pos.y > 95) {
      this.velocity.y *= -0.6;
    }
    
    this.pos.x = Math.max(5, Math.min(95, this.pos.x));
    this.pos.y = Math.max(5, Math.min(95, this.pos.y));
    
    this.velocity.x *= 0.88;
    this.velocity.y *= 0.88;
  }

  playKick() {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const env = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();
    
    if (!this.allocateVoice('kick', osc, gain, 0.5)) return;
    
    const baseFreq = 50 + this.intensity * 5;
    const now = this.ctx.currentTime;
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(baseFreq * 1.5, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq, now + 0.02);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.25);
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(baseFreq * 5, now);
    filter.frequency.exponentialRampToValueAtTime(baseFreq * 2, now + 0.12);
    filter.Q.value = 1;
    
    env.gain.setValueAtTime(0, now);
    env.gain.linearRampToValueAtTime(0.5, now + 0.003);
    env.gain.exponentialRampToValueAtTime(0.2, now + 0.04);
    env.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
    
    gain.gain.value = 0.5;
    
    osc.connect(filter);
    filter.connect(env);
    env.connect(gain);
    gain.connect(this.layerGains['kick']);
    
    osc.start(now);
    osc.stop(now + 0.4);
    
    this.triggerSidechainDuck();
  }

  playBass() {
    const noteIndex = this.bassNote % this.scale.length;
    const freq = this.noteToFreq(this.scale[noteIndex], 1);
    
    const osc1 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const env = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();
    
    if (!this.allocateVoice('bass', osc1, gain, 1.0)) return;
    
    const now = this.ctx.currentTime;
    
    osc1.type = 'sawtooth';
    osc1.frequency.value = freq;
    osc1.detune.value = -5;
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(80, now);
    filter.frequency.exponentialRampToValueAtTime(120 + this.motion * 30, now + 0.12);
    filter.frequency.exponentialRampToValueAtTime(100, now + 0.7);
    filter.Q.value = 1.5 + this.intensity * 0.3;
    
    env.gain.setValueAtTime(0, now);
    env.gain.linearRampToValueAtTime(0.5, now + 0.01);
    env.gain.exponentialRampToValueAtTime(0.3, now + 0.08);
    env.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
    
    gain.gain.value = 0.4;
    
    osc1.connect(filter);
    filter.connect(env);
    env.connect(gain);
    gain.connect(this.layerGains['bass']);
    
    osc1.start(now);
    osc1.stop(now + 0.8);
  }

  playHihat() {
    const now = this.ctx.currentTime;
    
    const bufferSize = 0.04 * this.ctx.sampleRate;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.sin(i * 0.08);
    }
    
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    
    const gain = this.ctx.createGain();
    const env = this.ctx.createGain();
    const filter1 = this.ctx.createBiquadFilter();
    
    if (!this.allocateVoice('hihat', noise, gain, 0.2)) return;
    
    filter1.type = 'highpass';
    filter1.frequency.value = 6000 + this.motion * 800;
    filter1.Q.value = 0.8;
    
    const isOpen = Math.random() < 0.15 && this.motionPattern === 'rhythmic';
    env.gain.setValueAtTime(0, now);
    env.gain.linearRampToValueAtTime(0.5, now + 0.003);
    env.gain.exponentialRampToValueAtTime(0.001, now + (isOpen ? 0.25 : 0.04));
    
    gain.gain.value = 0.18;
    
    noise.connect(filter1);
    filter1.connect(env);
    env.connect(gain);
    gain.connect(this.layerGains['hihat']);
    
    noise.start(now);
    noise.stop(now + 0.25);
  }

  playSnare() {
    const now = this.ctx.currentTime;
    
    const bufferSize = 0.08 * this.ctx.sampleRate;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    
    const gain = this.ctx.createGain();
    const env = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();
    
    if (!this.allocateVoice('snare', noise, gain, 0.4)) return;
    
    filter.type = 'bandpass';
    filter.frequency.value = 2500 + this.intensity * 800;
    filter.Q.value = 1.5;
    
    env.gain.setValueAtTime(0, now);
    env.gain.linearRampToValueAtTime(0.5, now + 0.003);
    env.gain.exponentialRampToValueAtTime(0.15, now + 0.025);
    env.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    
    gain.gain.value = 0.28;
    
    noise.connect(filter);
    filter.connect(env);
    env.connect(gain);
    gain.connect(this.layerGains['snare']);
    
    noise.start(now);
    noise.stop(now + 0.3);
    
    this.triggerSidechainDuck();
  }

  playPercussion() {
    const now = this.ctx.currentTime;
    const percType = Math.floor(Math.random() * 2); // Reduced types for simplicity
    
    switch(percType) {
      case 0:
        this.playPercussionConga();
        break;
      case 1:
        this.playPercussionShaker();
        break;
    }
  }

  playPercussionConga() {
    const now = this.ctx.currentTime;
    const freq = 200 + Math.random() * 100;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const env = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();
    
    if (!this.allocateVoice('percussion', osc, gain, 0.25)) return;
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq * 1.4, now);
    osc.frequency.exponentialRampToValueAtTime(freq, now + 0.015);
    
    filter.type = 'bandpass';
    filter.frequency.value = freq * 1.4;
    filter.Q.value = 6;
    
    env.gain.setValueAtTime(0, now);
    env.gain.linearRampToValueAtTime(0.4, now + 0.004);
    env.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    
    gain.gain.value = 0.25;
    
    osc.connect(filter);
    filter.connect(env);
    env.connect(gain);
    gain.connect(this.layerGains['percussion']);
    
    osc.start(now);
    osc.stop(now + 0.25);
  }

  playPercussionShaker() {
    const now = this.ctx.currentTime;
    
    const bufferSize = 0.04 * this.ctx.sampleRate;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.cos(i * 0.4);
    }
    
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    
    const gain = this.ctx.createGain();
    const env = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();
    
    if (!this.allocateVoice('percussion', noise, gain, 0.08)) return;
    
    filter.type = 'bandpass';
    filter.frequency.value = 7000 + Math.random() * 1500;
    filter.Q.value = 2.5;
    
    env.gain.setValueAtTime(0, now);
    env.gain.linearRampToValueAtTime(0.25, now + 0.008);
    env.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    
    gain.gain.value = 0.18;
    
    noise.connect(filter);
    filter.connect(env);
    env.connect(gain);
    gain.connect(this.layerGains['percussion']);
    
    noise.start(now);
    noise.stop(now + 0.08);
  }

  playOstinato() {
    const noteIndex = this.ostinatoPattern[this.ostinatoIndex % this.ostinatoPattern.length];
    const freq = this.noteToFreq(noteIndex, 4);
    const now = this.ctx.currentTime;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const env = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();
    
    if (!this.allocateVoice('ostinato', osc, gain, 0.8)) return;
    
    osc.type = this.stage === 'DIMENSIONAL' ? 'triangle' : 'sawtooth';
    osc.frequency.value = freq;
    osc.detune.value = -2;
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(600, now);
    filter.frequency.exponentialRampToValueAtTime(1200 + this.motion * 150, now + 0.15);
    filter.frequency.exponentialRampToValueAtTime(800, now + 0.7);
    filter.Q.value = 1.5 + this.intensity * 0.3;
    
    env.gain.setValueAtTime(0, now);
    env.gain.linearRampToValueAtTime(0.5, now + 0.04);
    env.gain.exponentialRampToValueAtTime(0.12, now + 0.25);
    env.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
    
    gain.gain.value = 0.18;
    
    osc.connect(filter);
    filter.connect(env);
    env.connect(gain);
    gain.connect(this.layerGains['ostinato']);
    
    osc.start(now);
    osc.stop(now + 0.8);
    
    this.ostinatoIndex = (this.ostinatoIndex + 1) % this.ostinatoPattern.length;
  }

  playHarmony() {
    const chord = this.chordProgression[this.currentChordIndex];
    const duration = 4 + this.intensity;
    const baseGain = 0.08 / chord.length;
    const now = this.ctx.currentTime;

    chord.forEach((interval, i) => {
      const freq = this.noteToFreq(interval, 3 + (i % 2));
      
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const env = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();
      
      if (!this.allocateVoice('harmony', osc, gain, duration)) return;
      
      osc.type = 'sine';
      osc.frequency.value = freq;
      
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(500, now);
      filter.frequency.exponentialRampToValueAtTime(700 + this.motion * 150, now + 1.5);
      filter.frequency.exponentialRampToValueAtTime(500, now + duration);
      filter.Q.value = 0.8;
      
      env.gain.setValueAtTime(0, now);
      env.gain.linearRampToValueAtTime(0.5, now + 1);
      env.gain.setValueAtTime(0.5, now + duration - 1.5);
      env.gain.exponentialRampToValueAtTime(0.001, now + duration);
      
      gain.gain.value = baseGain;
      
      osc.connect(filter);
      filter.connect(env);
      env.connect(gain);
      gain.connect(this.layerGains['harmony']);
      
      osc.start(now);
      osc.stop(now + duration);
    });
  }

  playLead() {
    const scale = this.scale;
    const noteIndex = Math.floor(Math.random() * scale.length);
    const freq = this.noteToFreq(scale[noteIndex], 5);
    const now = this.ctx.currentTime;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const env = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();
    const vibrato = this.ctx.createOscillator();
    const vibratoGain = this.ctx.createGain();
    
    if (!this.allocateVoice('lead', osc, gain, 1.5)) return;
    
    osc.type = 'sawtooth';
    osc.frequency.value = freq;
    
    vibrato.type = 'sine';
    vibrato.frequency.value = 4;
    vibratoGain.gain.value = 6;
    
    vibrato.connect(vibratoGain);
    vibratoGain.connect(osc.frequency);
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(freq, now);
    filter.frequency.exponentialRampToValueAtTime(freq * 3, now + 0.4);
    filter.frequency.exponentialRampToValueAtTime(freq * 1.5, now + 1.2);
    filter.Q.value = 2 + this.intensity * 0.5;
    
    env.gain.setValueAtTime(0, now);
    env.gain.linearRampToValueAtTime(0.4, now + 0.04);
    env.gain.setValueAtTime(0.4, now + 0.4);
    env.gain.exponentialRampToValueAtTime(0.15, now + 0.8);
    env.gain.exponentialRampToValueAtTime(0.001, now + 1.5);
    
    gain.gain.value = 0.22;
    
    osc.connect(filter);
    filter.connect(env);
    env.connect(gain);
    gain.connect(this.layerGains['lead']);
    
    vibrato.start(now);
    osc.start(now);
    vibrato.stop(now + 1.5);
    osc.stop(now + 1.5);
    
    this.lastLeadFreq = freq;
  }

  playPad() {
    const chord = this.chordProgression[this.currentChordIndex];
    const duration = 10 + this.intensity * 2;
    const now = this.ctx.currentTime;
    
    chord.forEach((note, i) => {
      const freq = this.noteToFreq(note, 2 + (i % 2));
      
      for (let d = 0; d < 2; d++) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const env = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();
        
        if (!this.allocateVoice('pad', osc, gain, duration)) return;
        
        osc.type = 'sine';
        osc.frequency.value = freq;
        osc.detune.value = (d - 1) * 10;
        
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(250, now);
        filter.frequency.exponentialRampToValueAtTime(350 + this.motion * 80, now + 3);
        filter.frequency.exponentialRampToValueAtTime(250, now + duration);
        filter.Q.value = 0.4;
        
        env.gain.setValueAtTime(0, now);
        env.gain.linearRampToValueAtTime(0.35, now + 3);
        env.gain.setValueAtTime(0.35, now + duration - 3);
        env.gain.exponentialRampToValueAtTime(0.001, now + duration);
        
        gain.gain.value = 0.035;
        
        osc.connect(filter);
        filter.connect(env);
        env.connect(gain);
        gain.connect(this.layerGains['pad']);
        
        osc.start(now);
        osc.stop(now + duration);
      }
    });
  }

  playAtmosphere() {
    const freq = this.noteToFreq(this.scale[Math.floor(Math.random() * this.scale.length)], 6);
    const now = this.ctx.currentTime;
    const duration = 20;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const env = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    
    if (!this.allocateVoice('atmosphere', osc, gain, duration)) return;
    
    osc.type = 'sine';
    osc.frequency.value = freq;
    
    lfo.type = 'sine';
    lfo.frequency.value = 0.15 + Math.random() * 0.2;
    lfoGain.gain.value = 40;
    
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    
    filter.type = 'lowpass';
    filter.frequency.value = freq * 1.5;
    filter.Q.value = 0.4;
    
    env.gain.setValueAtTime(0, now);
    env.gain.linearRampToValueAtTime(0.25, now + 6);
    env.gain.setValueAtTime(0.25, now + duration - 6);
    env.gain.exponentialRampToValueAtTime(0.001, now + duration);
    
    gain.gain.value = 0.025;
    
    osc.connect(filter);
    filter.connect(env);
    env.connect(gain);
    gain.connect(this.layerGains['atmosphere']);
    
    lfo.start(now);
    osc.start(now);
    lfo.stop(now + duration);
    osc.stop(now + duration);
  }

  playStrings() {
    const noteIndex = this.ostinatoPattern[this.ostinatoIndex % this.ostinatoPattern.length];
    const freq = this.noteToFreq(noteIndex, 3);
    const voices = 4;
    const now = this.ctx.currentTime;
    
    for (let i = 0; i < voices; i++) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const env = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();
      const vibrato = this.ctx.createOscillator();
      const vibratoGain = this.ctx.createGain();
      
      if (!this.allocateVoice('strings', osc, gain, 3.5)) return;
      
      osc.type = 'sawtooth';
      osc.frequency.value = freq * (1 + i * 0.002);
      osc.detune.value = (i - voices/2) * 6;
      
      vibrato.type = 'sine';
      vibrato.frequency.value = 3.5 + i * 0.4;
      vibratoGain.gain.value = 1.5;
      
      vibrato.connect(vibratoGain);
      vibratoGain.connect(osc.frequency);
      
      filter.type = 'lowpass';
      filter.frequency.value = 800 + this.motion * 200 + this.intensity * 150;
      filter.Q.value = 0.8;
      
      env.gain.setValueAtTime(0, now);
      env.gain.linearRampToValueAtTime(0.4, now + 0.08);
      env.gain.exponentialRampToValueAtTime(0.25, now + 0.8);
      env.gain.exponentialRampToValueAtTime(0.001, now + 3.5);
      
      gain.gain.value = 0.05;
      
      osc.connect(filter);
      filter.connect(env);
      env.connect(gain);
      gain.connect(this.layerGains['strings']);
      
      vibrato.start(now);
      osc.start(now);
      vibrato.stop(now + 3.5);
      osc.stop(now + 3.5);
    }
  }

  playBrass() {
    const note = this.scale[Math.floor(this.scale.length / 2)];
    const freq = this.noteToFreq(note, 3);
    const now = this.ctx.currentTime;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const env = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();
    
    if (!this.allocateVoice('brass', osc, gain, 3.5)) return;
      
    osc.type = 'sawtooth';
    osc.frequency.value = freq;
      
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(freq, now);
    filter.frequency.exponentialRampToValueAtTime(freq * 3 + this.intensity * 400, now + 0.15);
    filter.frequency.exponentialRampToValueAtTime(freq * 1.5, now + 1.5);
    filter.Q.value = 2.5 + this.intensity * 0.5;
      
    env.gain.setValueAtTime(0, now);
    env.gain.linearRampToValueAtTime(0.5, now + 0.12);
    env.gain.exponentialRampToValueAtTime(0.35, now + 0.8);
    env.gain.exponentialRampToValueAtTime(0.001, now + 3.5);
      
    gain.gain.value = 0.12;
      
    osc.connect(filter);
    filter.connect(env);
    env.connect(gain);
    gain.connect(this.layerGains['brass']);
      
    osc.start(now);
    osc.stop(now + 3.5);
  }

  playChoir() {
    const vowelFormants = {
      'a': [700, 1050, 2400],
      'o': [550, 800, 2400]
    };
    
    const vowels = Object.keys(vowelFormants);
    const currentVowel = vowels[Math.floor(Date.now() / 6000) % vowels.length];
    const formants = vowelFormants[currentVowel];
    const now = this.ctx.currentTime;
    const duration = 15;
    
    this.chordProgression[this.currentChordIndex].forEach((interval, i) => {
      const freq = this.noteToFreq(interval, 4 + (i % 2));
      
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const env = this.ctx.createGain();
      
      const formantFilters = formants.map(formantFreq => {
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = formantFreq;
        filter.Q.value = 6;
        return filter;
      });
      
      if (!this.allocateVoice('choir', osc, gain, duration)) return;
      
      osc.type = 'triangle';
      osc.frequency.value = freq;
      
      env.gain.setValueAtTime(0, now);
      env.gain.linearRampToValueAtTime(0.25, now + 5);
      env.gain.setValueAtTime(0.25, now + duration - 5);
      env.gain.exponentialRampToValueAtTime(0.001, now + duration);
      
      gain.gain.value = 0.035;
      
      let source = osc;
      formantFilters.forEach(filter => {
        source.connect(filter);
        source = filter;
      });
      source.connect(env);
      env.connect(gain);
      gain.connect(this.layerGains['choir']);
      
      osc.start(now);
      osc.stop(now + duration);
    });
  }

  playShepardTone() {
    const baseFreq = 220 * Math.pow(2, this.shepardIntensity * 0.4);
    const layers = 2;
    const now = this.ctx.currentTime;
    const duration = 5;
    
    for (let i = 0; i < layers; i++) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const env = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();
      
      if (!this.allocateVoice('shepard', osc, gain, duration)) return;
      
      const freq = baseFreq * Math.pow(2, i);
      osc.type = 'sine';
      
      if (this.shepardRising) {
        osc.frequency.setValueAtTime(freq, now);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + duration);
      } else {
        osc.frequency.setValueAtTime(freq * 1.5, now);
        osc.frequency.exponentialRampToValueAtTime(freq, now + duration);
      }
      
      const amplitude = Math.sin((i / layers) * Math.PI) * this.shepardIntensity * 0.25 + 0.25;
      
      filter.type = 'bandpass';
      filter.frequency.value = freq * 1.2;
      filter.Q.value = 1.5;
      
      env.gain.setValueAtTime(0, now);
      env.gain.linearRampToValueAtTime(amplitude, now + 0.8);
      env.gain.setValueAtTime(amplitude, now + duration - 0.8);
      env.gain.exponentialRampToValueAtTime(0.001, now + duration);
      
      gain.gain.value = 0.1;
      
      osc.connect(filter);
      filter.connect(env);
      env.connect(gain);
      gain.connect(this.layerGains['shepard']);
      
      osc.start(now);
      osc.stop(now + duration);
    }
    
    if (Math.random() < 0.08) {
      this.shepardRising = !this.shepardRising;
    }
  }

  playRiser() {
    const duration = 3 + this.intensity * 1.5;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const env = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();
    
    if (!this.allocateVoice('risers', osc, gain, duration)) return;
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(60, now);
    osc.frequency.exponentialRampToValueAtTime(1500, now + duration);
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(150, now);
    filter.frequency.exponentialRampToValueAtTime(8000, now + duration);
    filter.Q.value = 4;
    
    env.gain.setValueAtTime(0, now);
    env.gain.linearRampToValueAtTime(0.5, now + duration);
    
    gain.gain.value = 0.25;
    
    osc.connect(filter);
    filter.connect(env);
    env.connect(gain);
    gain.connect(this.layerGains['risers']);
    
    osc.start(now);
    osc.stop(now + duration);
  }

  playImpact() {
    const freq = 60;
    const now = this.ctx.currentTime;
    
    const osc1 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const env = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();
    
    if (!this.allocateVoice('impacts', osc1, gain, 1.2)) return;
    
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq * 1.4, now);
    osc1.frequency.exponentialRampToValueAtTime(freq * 0.6, now + 0.8);
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(freq * 6, now);
    filter.frequency.exponentialRampToValueAtTime(freq * 1.5, now + 0.25);
    filter.Q.value = 1.5;
    
    env.gain.setValueAtTime(0, now);
    env.gain.linearRampToValueAtTime(0.4, now + 0.008);
    env.gain.exponentialRampToValueAtTime(0.12, now + 0.06);
    env.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
    
    gain.gain.value = 0.35;
    
    osc1.connect(filter);
    filter.connect(env);
    env.connect(gain);
    gain.connect(this.layerGains['impacts']);
    
    osc1.start(now);
    osc1.stop(now + 1.2);
    
    this.flashImpact();
  }

  playGoldenRatioChord() {
    console.log('✨ GOLDEN RATIO CHORD: Divine Harmony');
    const phi = 1.618033988749;
    const baseFreq = 220;
    const now = this.ctx.currentTime;
    const duration = 10;
    
    const ratios = [1, phi, phi * phi];
    
    ratios.forEach((ratio, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const env = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();
      
      if (!this.allocateVoice('shepard', osc, gain, duration)) return;
      
      osc.type = 'sine';
      osc.frequency.value = baseFreq * ratio;
      
      filter.type = 'bandpass';
      filter.frequency.value = baseFreq * ratio;
      filter.Q.value = 15;
      
      env.gain.setValueAtTime(0, now);
      env.gain.linearRampToValueAtTime(0.25, now + 2.5);
      env.gain.setValueAtTime(0.25, now + duration - 2.5);
      env.gain.exponentialRampToValueAtTime(0.001, now + duration);
      
      gain.gain.value = 0.12;
      
      osc.connect(filter);
      filter.connect(env);
      env.connect(gain);
      gain.connect(this.layerGains['shepard']);
      
      osc.start(now);
      osc.stop(now + duration);
    });
    
    this.easterEggs.goldenRatio = true;
  }

  playInfiniteLoop() {
    console.log('∞ INFINITE LOOP: Shepard\'s Dream');
    const layers = 4;
    const duration = 15;
    const now = this.ctx.currentTime;
    
    for (let i = 0; i < layers; i++) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const env = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();
      
      if (!this.allocateVoice('shepard', osc, gain, duration)) return;
      
      const baseFreq = 55 * Math.pow(2, i / 5);
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 3, now + duration / 2);
      osc.frequency.exponentialRampToValueAtTime(baseFreq, now + duration);
      
      const amplitude = Math.sin((i / layers) * Math.PI * 1.5) * 0.4 + 0.4;
      
      filter.type = 'bandpass';
      filter.frequency.value = baseFreq * 1.5;
      filter.Q.value = 4;
      
      env.gain.setValueAtTime(0, now);
      env.gain.linearRampToValueAtTime(amplitude * 0.2, now + 1.5);
      env.gain.setValueAtTime(amplitude * 0.2, now + duration - 1.5);
      env.gain.exponentialRampToValueAtTime(0.001, now + duration);
      
      gain.gain.value = 0.15;
      
      osc.connect(filter);
      filter.connect(env);
      env.connect(gain);
      gain.connect(this.layerGains['shepard']);
      
      osc.start(now);
      osc.stop(now + duration);
    }
    
    this.easterEggs.shepardInfinity = true;
  }

  playSereneResonance() {
    const baseFreq = 110;
    const duration = 12;
    const layers = 2;
    const now = this.ctx.currentTime;

    for (let i = 0; i < layers; i++) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const env = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();
      
      if (!this.allocateVoice('atmosphere', osc, gain, duration)) return;
      
      osc.type = 'sine';
      osc.frequency.value = baseFreq * (1 + i * 0.5);
      
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(250, now);
      filter.frequency.exponentialRampToValueAtTime(700, now + duration / 2);
      filter.frequency.exponentialRampToValueAtTime(250, now + duration);
      filter.Q.value = 0.8;
      
      env.gain.setValueAtTime(0, now);
      env.gain.linearRampToValueAtTime(0.2, now + 3);
      env.gain.setValueAtTime(0.2, now + duration - 3);
      env.gain.exponentialRampToValueAtTime(0.001, now + duration);
      
      gain.gain.value = 0.08;
      
      osc.connect(filter);
      filter.connect(env);
      env.connect(gain);
      gain.connect(this.layerGains['atmosphere']);
      
      osc.start(now);
      osc.stop(now + duration);
    }
  }

  allocateVoice(layer, osc, gainNode, duration) {
    const pool = this.voicePool[layer];
    if (!pool) return false;
    
    const now = this.ctx.currentTime;
    pool.active = pool.active.filter(voice => now <= voice.startTime + voice.duration + 0.1);
    
    if (pool.active.length >= pool.max) {
      const oldest = pool.active.shift();
      if (oldest && oldest.osc && oldest.gain) {
        oldest.gain.gain.cancelScheduledValues(now);
        oldest.gain.gain.linearRampToValueAtTime(0, now + 0.02);
        
        if (oldest.osc.stop) {
          oldest.osc.stop(now + 0.03);
        }
      }
    }
    
    const voice = { osc, gain: gainNode, startTime: now, duration };
    pool.active.push(voice);
    
    return true;
  }

  updateHarmony() {
    this.bassNote = this.chordProgression[this.currentChordIndex][0];
  }

  noteToFreq(note, octave = 4) {
    const semitones = this.keyOffsets[this.key] + note;
    return 261.63 * Math.pow(2, semitones / 12 + (octave - 4));
  }

  updateUI() {
    this.elements.stageName.textContent = this.voidPhase ? 'VOID STATE' : this.stage;
    this.elements.bpmDisplay.textContent = Math.round(this.bpm);
    
    const totalVoices = Object.values(this.voicePool).reduce((sum, pool) => sum + pool.active.length, 0);
    this.elements.voiceCount.textContent = totalVoices;
    
    const intensityPercent = Math.min(this.intensity * 25, 100);
    this.elements.intensityDisplay.textContent = Math.round(intensityPercent) + '%';
    
    if (this.analyser) {
      this.analyser.getByteFrequencyData(this.dataArray);
      this.waveBars.forEach((bar, i) => {
        const dataIndex = Math.floor(i * (this.dataArray.length / 16));
        const height = (this.dataArray[dataIndex] / 255) * 50;
        bar.style.height = height + 'px';
          
        let color = 'rgba(255,255,255,0.6)';
        if (this.voidPhase) color = 'rgba(147,112,219,0.4)';
        else if (this.stage === 'TRIBAL') color = 'rgba(255,69,0,0.8)';
        else if (this.stage === 'ORCHESTRAL') color = 'rgba(30,144,255,0.8)';
        else if (this.stage === 'TRANSCENDENT') color = 'rgba(138,43,226,0.8)';
        else if (this.stage === 'DIMENSIONAL') color = 'linear-gradient(0deg, rgba(0,255,255,0.8), rgba(255,0,255,0.8))';
          
        bar.style.background = color;
      });
    }
  }

  animate() {
    const loop = () => {
      if (!this.active) return;
      
      this.elements.orb.style.left = this.pos.x + '%';
      this.elements.orb.style.top = this.pos.y + '%';
      
      if (this.step % 16 === 0) {
        this.updateUI();
      }
      
      const theme = this.themes[this.voidPhase ? 'void' : this.currentTheme];
      const intensityNorm = Math.min(this.intensity / 5, 1);
      
      let bg;
      if (this.voidPhase) {
        const breathe = Math.sin(Date.now() / 3000) * 0.5 + 0.5;
        bg = `radial-gradient(circle at 50% 50%, rgba(147, 112, 219, ${0.1 + breathe * 0.1}) 5%, rgba(75, 0, 130, ${0.05 + breathe * 0.05}) 20%, #000000 60%)`;
      } else if (this.dimensionalPhase) {
        const hue = (Date.now() / 20 % 360);
        bg = `radial-gradient(circle at 50% 50%, hsl(${hue}, 70%, ${20 + intensityNorm * 30}%) 5%, hsl(${(hue + 120) % 360}, 70%, ${15 + intensityNorm * 20}%) 20%, #000000 60%)`;
      } else {
        bg = `radial-gradient(circle at 50% 50%, ${theme.colors[0]} 5%, ${theme.colors[1] || '#050505'} 20%, #050505 60%)`;
      }
      
      document.body.style.background = bg;
      
      this.elements.cinematicOverlay.classList.toggle('active', this.buildPhase || this.climaxPhase || this.intensity > 3);
      
      const uiOpacity = Math.max(0.3, 1 - this.intensity * 0.1);
      this.elements.uiMinimal.style.opacity = uiOpacity;
      
      if (this.gestureRecognition.wave > 0.5) {
        this.elements.orb.style.filter = `drop-shadow(0 0 ${20 + this.gestureRecognition.wave * 10}px rgba(255,255,255,0.3))`;
      }
      
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  updateEvolution() {
    const avgMotion = this.motionHistory.reduce((a, b) => a + b, 0) / this.motionHistory.length;
    
    if (this.voidPhase) {
      this.layers = Object.fromEntries(Object.keys(this.layers).map(k => [k, false]));
      return;
    }
    
    const activationThreshold = this.buildPhase ? 0.6 : this.climaxPhase ? 0.4 : 1.0;
    const deactivationThreshold = 0.7;
    
    this.layers.kick = avgMotion > activationThreshold || (this.layers.kick && avgMotion > deactivationThreshold);
    this.layers.bass = (avgMotion > 0.6 || (this.layers.bass && avgMotion > 0.3)) && (this.motionPattern !== 'calm');
    this.layers.hihat = (avgMotion > 1.0 || this.intensity > 1.0 || this.motionPattern === 'rhythmic');
    this.layers.snare = (avgMotion > 1.5 && this.intensity > 1.5) || (this.motionPattern === 'erratic');
    this.layers.percussion = this.motionPattern === 'rhythmic' && avgMotion > 1.5;
    
    this.layers.ostinato = avgMotion > 0.5 && this.stage !== 'SILENCE';
    this.layers.harmony = (avgMotion > 2.0 || this.intensity > 1.5) && !this.releasePhase;
    this.layers.lead = this.stage !== 'SILENCE' && avgMotion > 2.0 && this.buildPhase;
    
    this.layers.pad = avgMotion < 1.5 && this.totalMotion > 100 && this.releasePhase;
    this.layers.atmosphere = this.intensity < 1.0 && avgMotion < 1.5 && (this.releasePhase || this.stage === 'SILENCE');
    
    this.layers.strings = this.stage !== 'SILENCE' && avgMotion > 1.0;
    this.layers.brass = this.stage !== 'SILENCE' && this.intensity > 1.5 && (this.buildPhase || this.climaxPhase);
    this.layers.choir = (this.stage === 'TRANSCENDENT' || this.stage === 'DIMENSIONAL') && avgMotion < 2.0 && this.releasePhase;
    
    this.layers.shepard = this.shepardIntensity > 0.1;
    this.layers.risers = this.buildPhase && this.intensity > 2.0;
    this.layers.impacts = this.gestureRecognition.tap > 0.5;
    
    if (this.motionPattern === 'wavy') {
      this.layers.atmosphere = true;
      this.layers.pad = true;
    }
    
    this.evolutionProgress = Math.min(this.totalMotion / 1500, 4);
    this.subStage = Math.floor(this.evolutionProgress);
    
    const now = Date.now();
    if (this.stage === 'TRIBAL' && this.totalMotion > 400 && now - this.lastEvolutionTime > 10000) {
      this.evolveToOrchestral();
      this.lastEvolutionTime = now;
    } else if (this.stage === 'ORCHESTRAL' && this.totalMotion > 800 && now - this.lastEvolutionTime > 15000) {
      this.evolveToTranscendent();
      this.lastEvolutionTime = now;
    } else if (this.stage === 'TRANSCENDENT' && this.totalMotion > 1200 && this.specialEvents.dimensionalRift > 0) {
      this.evolveToDimensional();
      this.lastEvolutionTime = now;
    }
    
    let baseBPM = 60 + (avgMotion * 8) + (this.intensity * 6);
    baseBPM += (this.subStage * 15);
    
    if (this.stage === 'TRIBAL') baseBPM += 20;
    else if (this.stage === 'ORCHESTRAL') baseBPM += 40;
    else if (this.stage === 'TRANSCENDENT') baseBPM += 60;
    else if (this.stage === 'DIMENSIONAL') baseBPM += 90;
    
    if (this.buildPhase) baseBPM *= 1.2;
    if (this.climaxPhase) baseBPM *= 1.4;
    if (this.releasePhase) baseBPM *= 0.8;
    if (this.dimensionalPhase) baseBPM *= (1 + Math.sin(Date.now() * 0.0008) * 0.2);
    
    this.bpm = this.bpm * 0.85 + baseBPM * 0.15;
    this.bpm = Math.max(40, Math.min(200, this.bpm));
    
    this.updateCinematicTheme(avgMotion, this.intensity);
  }

  updateCinematicTheme(avgMotion, intensity) {
    let newTheme = 'awakening';
    
    if (this.voidPhase) {
      newTheme = 'void';
      this.bpm = 40;
    } else if (this.dimensionalPhase) newTheme = 'dimensional';
    else if (this.motionPattern === 'chaotic' || intensity > 4) newTheme = 'chaos';
    else if (avgMotion > 5 && intensity > 3.5 && (this.buildPhase || this.climaxPhase)) newTheme = 'triumph';
    else if (avgMotion > 3 && intensity > 2.5) newTheme = 'tension';
    else if (avgMotion > 2) newTheme = 'adventure';
    else if (avgMotion < 2 && this.totalMotion > 200 && this.releasePhase) newTheme = 'reflection';
    else if (this.motionPattern === 'wavy') newTheme = 'reflection';
    
    if (newTheme !== this.currentTheme) {
      this.currentTheme = newTheme;
      this.elements.themeText.textContent = this.themes[newTheme].text;
      this.elements.themeText.classList.add('visible');
      setTimeout(() => this.elements.themeText.classList.remove('visible'), 5000);
    }
  }

  updateProceduralSystems(avgMotion, variance) {
    const now = this.ctx.currentTime;
    
    Object.keys(this.layerFilters).forEach(layer => {
      if (this.layerFilters[layer] && this.layers[layer]) {
        const baseFreq = this.getLayerBaseFrequency(layer);
        const modulation = avgMotion * 80 + variance * 40 + Math.sin(Date.now() * 0.0008 + this.getLayerPhase(layer)) * 150;
        const targetFreq = Math.min(baseFreq + modulation, 20000);
        
        this.layerFilters[layer].frequency.linearRampToValueAtTime(targetFreq, now + 0.04);
        this.layerFilters[layer].Q.linearRampToValueAtTime(0.8 + this.intensity * 0.3, now + 0.04);
      }
    });
    
    this.updateDynamicSpatialPositioning(avgMotion, variance);
  }

  getLayerBaseFrequency(layer) {
    const frequencies = {
      kick: 100, bass: 200, hihat: 8000, snare: 2000, percussion: 1500,
      ostinato: 1000, harmony: 800, lead: 1200,
      pad: 500, atmosphere: 300,
      strings: 1000, brass: 800, choir: 600,
      shepard: 2000, risers: 500, impacts: 150
    };
    return frequencies[layer] || 1000;
  }

  getLayerPhase(layer) {
    const phases = {
      kick: 0, bass: 0.5, hihat: 1.2, snare: 0.8, percussion: 1.5,
      ostinato: 2, harmony: 2.5, lead: 3,
      pad: 4, atmosphere: 4.5,
      strings: 6, brass: 6.5, choir: 7.5,
      shepard: 8, risers: 9.5, impacts: 10
    };
    return phases[layer] || 0;
  }

  updateDynamicSpatialPositioning(avgMotion, variance) {
    const time = Date.now() * 0.0008;
    const now = this.ctx.currentTime;
    
    Object.keys(this.layerPanners).forEach(layer => {
      if (this.layerPanners[layer] && this.layers[layer]) {
        const basePos = this.getLayerBasePosition(layer);
        
        const motionX = Math.sin(time * 0.4 + basePos.phase) * avgMotion * 0.4;
        const motionY = Math.cos(time * 0.25 + basePos.phase) * variance * 0.25;
        const motionZ = Math.sin(time * 0.6 + basePos.phase) * this.intensity * 0.15;
        
        if (this.dimensionalPhase) {
          const dimX = Math.sin(time * 1.5 + basePos.phase) * 4;
          const dimY = Math.cos(time * 1 + basePos.phase) * 2.5;
          const dimZ = Math.sin(time * 2 + basePos.phase) * 6;
          
          this.layerPanners[layer].positionX.linearRampToValueAtTime(basePos.x + motionX + dimX, now + 0.08);
          this.layerPanners[layer].positionY.linearRampToValueAtTime(basePos.y + motionY + dimY, now + 0.08);
          this.layerPanners[layer].positionZ.linearRampToValueAtTime(basePos.z + motionZ + dimZ, now + 0.08);
        } else {
          this.layerPanners[layer].positionX.linearRampToValueAtTime(basePos.x + motionX, now + 0.08);
          this.layerPanners[layer].positionY.linearRampToValueAtTime(basePos.y + motionY, now + 0.08);
          this.layerPanners[layer].positionZ.linearRampToValueAtTime(basePos.z + motionZ, now + 0.08);
        }
      }
    });
  }

  getLayerBasePosition(layer) {
    const positions = {
      kick: { x: 0, y: -1, z: -2, phase: 0 },
      bass: { x: 0, y: -2, z: -3, phase: 0.5 },
      hihat: { x: 1, y: 1, z: -2, phase: 1 },
      snare: { x: 0, y: 0, z: -1, phase: 1.5 },
      percussion: { x: -1, y: 1, z: -2, phase: 2 },
      ostinato: { x: -3, y: 0, z: -4, phase: 2.5 },
      harmony: { x: 3, y: 0, z: -4, phase: 3 },
      lead: { x: 0, y: 1, z: -3, phase: 3.5 },
      pad: { x: 0, y: 3, z: 8, phase: 4.5 },
      atmosphere: { x: 0, y: 5, z: 15, phase: 5 },
      strings: { x: -6, y: 0, z: -8, phase: 6 },
      brass: { x: 6, y: 0, z: -8, phase: 6.5 },
      choir: { x: 0, y: 4, z: 12, phase: 7.5 },
      shepard: { x: 0, y: 8, z: -15, phase: 8 },
      risers: { x: 0, y: 6, z: -20, phase: 9.5 },
      impacts: { x: 0, y: -3, z: -1, phase: 10 }
    };
    return positions[layer] || { x: 0, y: 0, z: 0, phase: 0 };
  }

  triggerShakeEffects() {
    console.log('🌪️ SHAKE DETECTED: Chaos Unleashed');
    this.gestureRecognition.shake = 0;
    this.layers.impacts = true;
    this.bpm += 15;
    this.flashImpact();
  }

  triggerChaosMode() {
    console.log('🔥 CHAOS MODE: Reality Breaks Down');
    this.gestureRecognition.chaos = 0;
    this.currentTheme = 'chaos';
    this.specialEvents.harmonicResonance = 1.5;
    this.scale = this.scales.wholeTone;
  }

  triggerImpactEffects() {
    this.layers.impacts = true;
    setTimeout(() => this.layers.impacts = false, 200);
  }

  evolveToTribal() {
    this.voidPhase = false;
    this.stage = 'TRIBAL';
    this.elements.orb.className = 'orb tribal';
    this.mode = 'pentatonic';
    this.scale = this.scales.pentatonic;
    console.log('🔥 TRIBAL EVOLUTION: Primal Fire Awakens');
  }

  evolveToOrchestral() {
    this.stage = 'ORCHESTRAL';
    this.elements.orb.className = 'orb orchestral';
    this.mode = 'dorian';
    this.scale = this.scales.dorian;
    console.log('🌊 ORCHESTRAL EVOLUTION: Symphonic Depths');
  }

  evolveToTranscendent() {
    this.stage = 'TRANSCENDENT';
    this.elements.orb.className = 'orb transcendent';
    this.mode = 'lydian';
    this.scale = this.scales.lydian;
    this.layers.choir = true;
    console.log('✨ TRANSCENDENT EVOLUTION: Beyond Mortal Sound');
  }

  evolveToDimensional() {
    this.stage = 'DIMENSIONAL';
    this.elements.orb.className = 'orb dimensional';
    this.mode = 'wholeTone';
    this.scale = this.scales.wholeTone;
    this.dimensionalPhase = true;
    this.specialEvents.dimensionalRift = 3;
    console.log('🌌 DIMENSIONAL EVOLUTION: Reality Transcended');
  }

  syncBPMToSteps() {
    if (this.stepCounter < 4) return;
    
    const stepInterval = (Date.now() - this.lastStepTime * (this.stepCounter - 1)) / (this.stepCounter - 1);
    const targetBPM = 60 / (stepInterval / 1000) * 1.6;
    
    this.bpm = this.bpm * 0.6 + targetBPM * 0.4;
    this.bpm = Math.max(40, Math.min(200, this.bpm));
    
    if (this.specialEvents.timeDilation > 0) {
      this.bpm *= this.specialEvents.timeDilation;
    }
  }

  startSequencer() {
    const tick = () => {
      if (!this.active) return;
      
      this.playStep();
      this.step = (this.step + 1) % this.sectionLength;
      this.microRhythm = (this.microRhythm + 1) % 4;
      
      if (this.step === 0) {
        this.phraseCount++;
        this.phrase = this.phraseStructure[this.phraseCount % this.phraseStructure.length];
        this.currentChordIndex = (this.currentChordIndex + 1) % this.chordProgression.length;
        this.updateHarmony();
      }
      
      const baseInterval = (60 / this.bpm) * 250;
      const swingFactor = this.motionPattern === 'rhythmic' ? 1.05 : 1;
      const microTiming = this.microRhythm % 2 === 1 ? swingFactor : 1;
      const chaosOffset = this.motionPattern === 'chaotic' ? (Math.random() - 0.5) * 40 : 0;
      
      const interval = baseInterval * microTiming + chaosOffset;
      setTimeout(tick, Math.max(50, interval));
    };
    tick();
  }

  playStep() {
    if (this.voidPhase) return;
    
    if (this.step % 4 === 0) {
      this.elements.orb.classList.add('pulse');
      setTimeout(() => this.elements.orb.classList.remove('pulse'), 100);
    }
    
    if (this.layers.kick && this.step % 8 === 0) this.playKick();
    if (this.layers.bass && this.step % 4 === 0) this.playBass();
    if (this.layers.hihat && this.step % 2 === 1 && Math.random() < 0.7) this.playHihat();
    if (this.layers.snare && (this.step % 8 === 4 || (this.motionPattern === 'erratic' && this.step % 8 === 6 && Math.random() < 0.5))) this.playSnare();
    if (this.layers.percussion && this.step % 3 === 0 && Math.random() < 0.6) this.playPercussion();
    
    if (this.layers.ostinato && this.step % 2 === 0) this.playOstinato();
    if (this.layers.harmony && this.step % 16 === 0) this.playHarmony();
    if (this.layers.lead && this.step % 8 === 0 && Math.random() < 0.7) this.playLead();
    
    if (this.layers.pad && this.step % 32 === 0 && this.releasePhase) this.playPad();
    if (this.layers.atmosphere && Math.random() < 0.015 && this.releasePhase) this.playAtmosphere();
    
    if (this.layers.strings && (this.step % 4 === 0 || this.buildPhase)) this.playStrings();
    if (this.layers.brass && this.step % 16 === 0 && this.buildPhase) this.playBrass();
    if (this.layers.choir && this.step % 32 === 0 && this.releasePhase) this.playChoir();
    
    if (this.layers.shepard && this.step % 8 === 0) this.playShepardTone();
    if (this.layers.risers && this.step % 64 === 0) this.playRiser();
    if (this.layers.impacts && Math.random() < 0.25) this.playImpact();
    
    Object.keys(this.specialEvents).forEach(event => {
      this.specialEvents[event] = Math.max(0, this.specialEvents[event] - 0.01);
    });
  }
}

new VoidEngine();

// PWA registration for app-like magic
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => console.log('PWA Service Worker ready! 🚀'))
      .catch(err => console.error('PWA setup failed:', err));
  });
}
