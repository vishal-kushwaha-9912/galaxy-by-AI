/* ═══════════════════════════════════════════════════════════════
   VIEW MANAGEMENT AND SCENE ANIMATION
   ═══════════════════════════════════════════════════════════════ */

// Set current view and switch scenes
function setView(v) {
  state.currentView = v;
  const cfg = VIEW_CONFIG[v];
  
  // Hide all objects
  Object.keys(state.objects).forEach(k => {
    if (state.objects[k]) state.objects[k].visible = false;
  });
  
  // Show current view
  if (state.objects[cfg.obj]) state.objects[cfg.obj].visible = true;

  // Smooth camera movement
  gsmoothTo(state.camera.position, cfg.pos, CONFIG.SMOOTH_MOVE_STEPS);

  // Update navigation pills
  document.querySelectorAll('.nav-pill').forEach(b => {
    b.classList.toggle('active', b.dataset.view === v);
  });
  
  // Update HUD
  document.getElementById('hud-view').textContent = cfg.label;
  document.getElementById('panel-icon').textContent = ICONS[v] || '✦';

  // Show scale label
  const sl = document.getElementById('scale-mode');
  sl.textContent = cfg.label;
  sl.classList.add('show');
  setTimeout(() => sl.classList.remove('show'), CONFIG.SCALE_LABEL_TIMEOUT);

  // Update info panel
  showInfo(v);
  buildObjectList();
  
  Logger.info(`View switched to ${v}`);
}

// Main animation loop
function animate() {
  requestAnimationFrame(animate);
  
  state.t += 0.005 * state.simSpeed;
  state.sessionTime += 0.016;

  // Update FPS and time display
  state.fpsFrames++;
  const now = performance.now();
  if (now - state.fpsLast > 1000) {
    document.getElementById('hud-fps').textContent = state.fpsFrames + ' fps';
    const mins = Math.floor(state.sessionTime / 60);
    const secs = Math.floor(state.sessionTime % 60);
    document.getElementById('hud-time').textContent =
      String(mins).padStart(2, '0') + ':' + String(secs).padStart(2, '0');
    state.fpsFrames = 0;
    state.fpsLast = now;
  }

  // Auto-rotate scenes
  if (state.autoRotate && state.objects.galaxy?.visible) {
    state.objects.galaxy.rotation.y += 0.0008 * state.simSpeed;
  }
  
  if (state.objects.nebula?.visible) {
    state.objects.nebula.rotation.y += 0.001 * state.simSpeed;
  }
  
  if (state.autoRotate && state.objects.universe?.visible) {
    state.objects.universe.rotation.y += 0.0005 * state.simSpeed;
  }
  
  if (state.objects.moons?.visible) {
    state.objects.moons.rotation.y += 0.0003 * state.simSpeed;
  }

  // Rotate black hole accretion disk
  if (state.objects.blackhole?.visible) {
    state.objects.blackhole.children.forEach((c, i) => {
      if (c.userData.diskLayer) {
        c.rotation.z += 0.004 * state.simSpeed * (i % 2 === 0 ? 1 : -1);
      }
    });
  }

  // Animate planets in solar system view
  if (state.objects.solar?.visible) {
    state.objects.solar.children.forEach(child => {
      if (child.userData?.type === 'planet') {
        state.orbitAngles[child.userData.name] += child.userData.speed * state.simSpeed;
        const a = state.orbitAngles[child.userData.name];
        const d = child.userData.dist;
        
        child.position.set(Math.cos(a) * d, 0, Math.sin(a) * d);
        child.rotation.y += 0.012 * state.simSpeed;
        
        // Rotate moons around planets
        child.children.forEach(m => {
          if (m.userData?.type === 'moon') m.rotation.y += 0.03 * state.simSpeed;
        });
      }
    });
  }

  // Auto-rotate camera orbit
  if (state.autoRotate && !state.isDragging) {
    state.camera.position.x += Math.sin(state.t * 0.18) * 0.015;
    state.camera.position.y += Math.sin(state.t * 0.12) * 0.01;
  }

  state.camera.lookAt(0, 0, 0);
  state.renderer.render(state.scene, state.camera);
}

// Update loading progress
function setLoadStep(text, pct) {
  document.getElementById('load-step').textContent = text;
  document.getElementById('load-bar').style.width = pct + '%';
}

// Initialize all scenes and start animation
function initializeScenes() {
  Logger.info('Starting scene initialization...');
  
  setLoadStep('Generating starfield…', 10);
  addStarfield();
  
  setLoadStep('Building galaxy…', 25);
  buildGalaxy();
  
  setLoadStep('Placing planets…', 40);
  buildSolarSystem();
  
  setLoadStep('Cataloging moons…', 55);
  buildMoonsView();
  
  setLoadStep('Mapping universe…', 70);
  buildUniverseView();
  
  setLoadStep('Sculpting black holes…', 85);
  buildBlackholeScene();
  
  setLoadStep('Painting nebulae…', 95);
  buildNebulaScene();
  
  setLoadStep('Launching…', 100);

  setView('galaxy');
  animate();
  
  Logger.info('All scenes initialized successfully');
}

// Hide loading screen and show initial info
function hideLoadingScreen() {
  setTimeout(() => {
    document.getElementById('loading').classList.add('hidden');
    setTimeout(() => showInfo(state.currentView), 300);
  }, CONFIG.LOAD_DURATION);
}
