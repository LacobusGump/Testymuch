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
    
    // Enhanced audio chain components
    this.masterGain = null;
    this.limiter = null;
    this.layerGains = {};
    this.layerPanners = {};
    this.layerFilters = {};
    this.layerEQs = {};
    this.layerCompressors = {};
    this.layerSaturators = {};
    this.listener = null;
    this.convolver = null;
    this.delay = null;
    this.compressor = null;
    this.masterEQ = null;
    this.masterSaturator = null;
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
    
    // Enhanced voice pool with better limits
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
      texture: { max: 6, active: [] },
      strings: { max: 6, active: [] }, 
      brass: { max: 4, active: [] },
      woodwinds: { max: 3, active: [] },
      choir: { max: 4, active: [] },
      shepard: { max: 2, active: [] },
      granular: { max: 6, active: [] },
      glitch: { max: 3, active: [] },
      risers: { max: 2, active: [] },
      impacts: { max: 1, active: [] }
    };
    
    this.layers = {
      kick: false, bass: false, hihat: false, snare: false, percussion: false,
      ostinato: false, harmony: false, lead: false,
      pad: false, atmosphere: false, texture: false,
      strings: false, brass: false, woodwinds: false, choir: false,
      shepard: false, granular: false, glitch: false, risers: false, impacts: false
    };
    
    this.key = 'D';
    this.keyOffsets = {'C':0, 'Db':1, 'D':2, 'Eb':3, 'E':4, 'F':5, 'Gb':6, 'G':7, 'Ab':8, 'A':9, 'Bb':10, 'B':11};
    this.mode = 'minor';
    this.scales = {
      minor: [0, 2, 3, 5, 7, 8, 10],
      major: [0, 2, 4, 5, 7, 9, 11],
      dorian: [0, 2, 3, 5, 7, 9, 10],
      phrygian: [0, 1, 3, 5, 7, 8, 10],
      lydian: [0, 2, 4, 6, 7, 9, 11],
      mixolydian: [0, 2, 4, 5, 7, 9, 10],
      locrian: [0, 1, 3, 5, 6, 8, 10],
      pentatonic: [0, 2, 4, 7, 9],
      blues: [0, 3, 5, 6, 7, 10],
      chromatic: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      wholeTone: [0, 2, 4, 6, 8, 10]
    };
    this.scale = this.scales[this.mode];
    this.chordProgression = [
      [0, 3, 7],    // i
      [10, 2, 5],   // VII
      [5, 8, 0],    // iv
      [7, 10, 2],   // V
      [3, 7, 10],   // III
      [8, 0, 3],    // vi
      [2, 5, 8],    // ii°
      [5, 9, 0]     // iv (add6)
    ];
    this.currentChordIndex = 0;
    this.bassNote = 0;
    this.lastLeadFreq = 293.66;
    
    this.elements = {};
    this.waveBars = [];
    
    this.granularBuffer = null;
    
    this.easterEggs = {
      konamiSequence: [],
      goldenRatio: false,
      perfectCircle: false,
      chaosAttractor: false,
      fibonacciSpiral: false,
      shepardInfinity: false,
      harmonicWave: false
    };
    this.specialEvents = {
      glitchStorm: 0,
      timeDilation: 0,
      dimensionalRift: 0,
      harmonicResonance: 0
    };
    
    this.init();
  }

  // ... (paste the rest of your original class methods here—init(), setupWaveformVisualizer(), all the way to playStep() and startSequencer())

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
