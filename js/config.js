/* ═══════════════════════════════════════════════════════════════
   CONFIGURATION & STATE MANAGEMENT
   ═══════════════════════════════════════════════════════════════ */

// Global state variables
let state = {
  scene: null,
  camera: null,
  renderer: null,
  
  // Interaction
  autoRotate: true,
  currentView: 'galaxy',
  isDragging: false,
  dragStart: { x: 0, y: 0 },
  dragMoved: false,
  
  // UI
  currentTab: 'info',
  activeData: null,
  searchOpen: false,
  
  // Performance
  fpsFrames: 0,
  fpsLast: performance.now(),
  sessionTime: 0,
  
  // Scene objects
  objects: {},
  clickables: [],
  orbitAngles: {},
  
  // Animation
  t: 0,
  simSpeed: 1,
  
  // Features
  arActive: false,
  multiplayerOnline: false,
  
  // Mouse
  mouse: new THREE.Vector2(),
  raycaster: new THREE.Raycaster()
};

// Configuration constants
const CONFIG = {
  CANVAS_ID: 'c',
  STARS_CANVAS_ID: 'stars',
  
  // Rendering
  CLEAR_COLOR: 0x000000,
  AMBIENT_LIGHT: 0x111133,
  AMBIENT_LIGHT_INTENSITY: 2,
  
  // Zoom
  ZOOM_SPEED_IN: 0.85,
  ZOOM_SPEED_OUT: 1.18,
  ZOOM_WHEEL_IN: 1.07,
  ZOOM_WHEEL_OUT: 0.935,
  
  // Animations
  SMOOTH_MOVE_STEPS: 70,
  RESET_STEPS: 45,
  
  // Particles
  STARFIELD_COUNT: 15000,
  GALAXY_STAR_COUNT: 25000,
  UNIVERSE_CLUSTER_COUNT: 5000,
  
  // Timing
  LOAD_DURATION: 2400,
  NOTIFICATION_TIMEOUT: 2500,
  SCALE_LABEL_TIMEOUT: 2200,
  
  // API Keys (Will be added for NASA integration)
  NASA_API_KEY: 'DEMO_KEY', // Replace with actual key
  NASA_API_BASE: 'https://api.nasa.gov',
  
  // AI Integration placeholder
  AI_API_BASE: 'http://localhost:5000', // For local AI service
  
  // localStorage keys
  STORAGE_KEY: 'cosmosvault-session'
};

// View configurations with camera positions
const VIEW_CONFIG = {
  galaxy: {
    pos: [0, 25, 55],
    look: [0, 0, 0],
    obj: 'galaxy',
    label: 'MILKY WAY GALAXY'
  },
  solar: {
    pos: [0, 30, 50],
    look: [0, 0, 0],
    obj: 'solar',
    label: 'SOLAR SYSTEM'
  },
  moons: {
    pos: [0, 15, 90],
    look: [0, 0, 0],
    obj: 'moons',
    label: 'MOON SYSTEM'
  },
  universe: {
    pos: [0, 60, 120],
    look: [0, 0, 0],
    obj: 'universe',
    label: 'OBSERVABLE UNIVERSE'
  },
  blackhole: {
    pos: [0, 12, 30],
    look: [0, 0, 0],
    obj: 'blackhole',
    label: 'BLACK HOLE'
  },
  nebula: {
    pos: [0, 15, 45],
    look: [0, 0, 0],
    obj: 'nebula',
    label: 'NEBULA CLOUD'
  }
};

// Utility functions
function getState(key) {
  return state[key];
}

function setState(key, value) {
  state[key] = value;
}

function updateState(updates) {
  Object.assign(state, updates);
}

// Logging utility
const Logger = {
  info: (msg) => console.log('✓ ' + msg),
  error: (msg) => console.error('✗ ' + msg),
  warn: (msg) => console.warn('⚠ ' + msg),
  debug: (msg) => console.debug('🔍 ' + msg)
};
