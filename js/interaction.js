/* ═══════════════════════════════════════════════════════════════
   INTERACTION HANDLERS - MOUSE, KEYBOARD, AND CAMERA CONTROLS
   ═══════════════════════════════════════════════════════════════ */

// Mouse move handler - raycast for tooltips
function onMouseMove(e) {
  state.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  state.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  
  state.raycaster.setFromCamera(state.mouse, state.camera);
  const hits = state.raycaster.intersectObjects(state.clickables);
  
  const tooltip = document.getElementById('tooltip');
  if (hits.length > 0 && hits[0].object.userData.name) {
    tooltip.textContent = hits[0].object.userData.name;
    tooltip.style.left = (e.clientX + 14) + 'px';
    tooltip.style.top = (e.clientY - 8) + 'px';
    tooltip.style.opacity = '1';
    document.body.style.cursor = 'pointer';
  } else {
    tooltip.style.opacity = '0';
    document.body.style.cursor = state.isDragging ? 'grabbing' : 'default';
  }
  
  if (state.isDragging) onDragMove(e);
}

// Click handler - select objects
function onMouseClick(e) {
  if (state.dragMoved) return;
  
  state.raycaster.setFromCamera(state.mouse, state.camera);
  const hits = state.raycaster.intersectObjects(state.clickables);
  
  if (hits.length > 0) {
    const obj = hits[0].object;
    const name = obj.userData.name;
    const type = obj.userData.type;
    
    if (type === 'moon' && obj.userData.facts) {
      showInfo(null, {
        title: name.toUpperCase(),
        subtitle: 'Moon',
        icon: '🌙',
        funFacts: obj.userData.facts
      });
    }
    document.getElementById('hud-obj').textContent = name;
  }
}

// Drag start handler
function onDragStart(e) {
  if (e.target !== document.getElementById(CONFIG.CANVAS_ID)) return;
  state.isDragging = true;
  state.dragMoved = false;
  state.dragStart = { x: e.clientX, y: e.clientY };
  document.body.style.cursor = 'grabbing';
}

// Drag move handler - rotate camera
function onDragMove(e) {
  if (!state.isDragging) return;
  
  const dx = e.clientX - state.dragStart.x;
  const dy = e.clientY - state.dragStart.y;
  
  if (Math.abs(dx) > 2 || Math.abs(dy) > 2) state.dragMoved = true;
  
  const r = state.camera.position.length();
  const theta = Math.atan2(state.camera.position.x, state.camera.position.z);
  const phi = Math.acos(Math.max(-1, Math.min(1, state.camera.position.y / r)));
  
  const newTheta = theta - dx * 0.008;
  const newPhi = Math.max(0.1, Math.min(Math.PI - 0.1, phi + dy * 0.008));
  
  state.camera.position.set(
    r * Math.sin(newPhi) * Math.sin(newTheta),
    r * Math.cos(newPhi),
    r * Math.sin(newPhi) * Math.cos(newTheta)
  );
  
  state.dragStart = { x: e.clientX, y: e.clientY };
}

// Drag end handler
function onDragEnd() {
  state.isDragging = false;
  document.body.style.cursor = 'default';
}

// Touch start handler
function onTouchStart(e) {
  e.preventDefault();
  if (e.touches.length === 1) {
    state.isDragging = true;
    state.dragMoved = false;
    state.dragStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }
}

// Touch move handler
function onTouchMove(e) {
  e.preventDefault();
  if (e.touches.length === 1 && state.isDragging) {
    onDragMove({ clientX: e.touches[0].clientX, clientY: e.touches[0].clientY });
  }
}

// Touch end handler
function onTouchEnd(e) {
  state.isDragging = false;
  if (e.touches.length === 0) {
    setTimeout(() => state.dragMoved = false, 50);
  }
}

// Keyboard handler
function onKeydown(e) {
  // Don't handle shortcuts if typing in search
  if (document.getElementById('search-box') === document.activeElement && e.key !== 'Escape') return;

  const viewKeys = ['galaxy', 'solar', 'moons', 'universe', 'blackhole', 'nebula'];

  switch (e.key) {
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
      setView(viewKeys[+e.key - 1]);
      break;
    case ' ':
      e.preventDefault();
      toggleRotate();
      break;
    case '+':
    case '=':
      zoomIn();
      break;
    case '-':
    case '_':
      zoomOut();
      break;
    case 'r':
    case 'R':
      resetView();
      break;
    case 'i':
    case 'I':
      togglePanel();
      break;
    case 's':
    case 'S':
      toggleSearch();
      break;
    case 'p':
    case 'P':
      takeScreenshot();
      break;
    case 'd':
    case 'D':
      toggleDataModal();
      break;
    case 'a':
    case 'A':
      toggleARMode();
      break;
    case '?':
      toggleShortcuts();
      break;
    case 'Escape':
      closePanel();
      if (state.searchOpen) toggleSearch();
      if (document.getElementById('shortcuts-overlay').classList.contains('open')) toggleShortcuts();
      if (document.getElementById('data-modal').classList.contains('open')) toggleDataModal();
      if (state.arActive) toggleARMode();
      break;
  }
}

// Wheel zoom handler
function onWheel(e) {
  e.preventDefault();
  state.camera.position.multiplyScalar(e.deltaY > 0 ? CONFIG.ZOOM_WHEEL_IN : CONFIG.ZOOM_WHEEL_OUT);
  updateZoomHUD();
}

// Window resize handler
function onResize() {
  state.camera.aspect = window.innerWidth / window.innerHeight;
  state.camera.updateProjectionMatrix();
  state.renderer.setSize(window.innerWidth, window.innerHeight);
}

// ═════════════════════════════════════════════════════════════════
// CAMERA CONTROLS
// ═════════════════════════════════════════════════════════════════

// Smooth camera movement to target position
function gsmoothTo(pos, target, steps) {
  const start = { x: pos.x, y: pos.y, z: pos.z };
  const end = { x: target[0], y: target[1], z: target[2] };
  let step = 0;

  function tick() {
    step++;
    const tt = step / steps;
    // Ease-in-out easing
    const ease = tt < 0.5 ? 2 * tt * tt : -1 + (4 - 2 * tt) * tt;
    
    pos.x = start.x + (end.x - start.x) * ease;
    pos.y = start.y + (end.y - start.y) * ease;
    pos.z = start.z + (end.z - start.z) * ease;
    
    if (step < steps) requestAnimationFrame(tick);
  }
  tick();
}

// Zoom in
function zoomIn() {
  state.camera.position.multiplyScalar(CONFIG.ZOOM_SPEED_IN);
  updateZoomHUD();
}

// Zoom out
function zoomOut() {
  state.camera.position.multiplyScalar(CONFIG.ZOOM_SPEED_OUT);
  updateZoomHUD();
}

// Reset view to default position
function resetView() {
  gsmoothTo(state.camera.position, VIEW_CONFIG[state.currentView].pos, CONFIG.RESET_STEPS);
}

// Toggle auto-rotation
function toggleRotate() {
  state.autoRotate = !state.autoRotate;
  document.getElementById('rotate-btn').classList.toggle('active', state.autoRotate);
  notify(state.autoRotate ? 'Auto-Rotate ON' : 'Auto-Rotate OFF');
}

// Set simulation speed
function setSpeed(v) {
  state.simSpeed = parseFloat(v);
}

// Take screenshot
function takeScreenshot() {
  state.renderer.render(state.scene, state.camera);
  const link = document.createElement('a');
  link.download = 'cosmosvault-pro-' + state.currentView + '.png';
  link.href = document.getElementById(CONFIG.CANVAS_ID).toDataURL('image/png');
  link.click();
  
  const flash = document.getElementById('flash');
  flash.classList.add('on');
  setTimeout(() => flash.classList.remove('on'), 120);
  notify('📸 Screenshot saved!');
}
