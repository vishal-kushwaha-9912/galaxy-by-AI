/* ═══════════════════════════════════════════════════════════════
   MAIN INITIALIZATION AND STARTUP
   ═══════════════════════════════════════════════════════════════ */

// Main initialization function
function initializeApp() {
  Logger.info('CosmosVault Pro v2.0 - Initializing...');

  try {
    // Initialize Three.js scene
    initScene();

    // Setup event listeners
    setupEventListeners();

    // Initialize scenes
    initializeScenes();

    // Hide loading screen
    hideLoadingScreen();

    // Initialize API connections
    initializeAPIs();

    Logger.info('CosmosVault Pro v2.0 initialized successfully');
  } catch (err) {
    Logger.error(`Initialization failed: ${err.message}`);
    alert('Error loading CosmosVault:\n' + err.message);
  }
}

// Setup all event listeners
function setupEventListeners() {
  // Window events
  window.addEventListener('resize', onResize);
  window.addEventListener('keydown', onKeydown);

  // Mouse events
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('click', onMouseClick);
  window.addEventListener('wheel', onWheel, { passive: false });

  // Canvas drag events
  const canvas = document.getElementById(CONFIG.CANVAS_ID);
  canvas.addEventListener('mousedown', onDragStart);
  window.addEventListener('mousemove', onDragMove);
  window.addEventListener('mouseup', onDragEnd);

  // Touch events
  canvas.addEventListener('touchstart', onTouchStart, { passive: false });
  canvas.addEventListener('touchmove', onTouchMove, { passive: false });
  canvas.addEventListener('touchend', onTouchEnd);

  Logger.info('Event listeners configured');
}

// Start the application when DOM is ready
document.addEventListener('DOMContentLoaded', initializeApp);

// Handle any uncaught errors gracefully
window.addEventListener('error', (event) => {
  Logger.error(`Uncaught error: ${event.message}`);
});
