/* ═══════════════════════════════════════════════════════════════
   THREE.JS SCENE SETUP AND SCENE BUILDING FUNCTIONS
   ═══════════════════════════════════════════════════════════════ */

// Initialize Three.js scene
function initScene() {
  const canvas = document.getElementById(CONFIG.CANVAS_ID);
  
  state.scene = new THREE.Scene();
  state.camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    5000
  );
  state.camera.position.set(0, 20, 60);
  state.camera.lookAt(0, 0, 0);

  state.renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true,
    preserveDrawingBuffer: true
  });
  state.renderer.setSize(window.innerWidth, window.innerHeight);
  state.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  state.renderer.setClearColor(CONFIG.CLEAR_COLOR, 1);

  state.scene.add(new THREE.AmbientLight(CONFIG.AMBIENT_LIGHT, CONFIG.AMBIENT_LIGHT_INTENSITY));
  
  Logger.info('Three.js scene initialized');
}

// Add starfield background
function addStarfield() {
  const geo = new THREE.BufferGeometry();
  const count = CONFIG.STARFIELD_COUNT;
  const pos = new Float32Array(count * 3);
  const col = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const r = 450 + Math.random() * 1400;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    
    pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    pos[i * 3 + 2] = r * Math.cos(phi);

    const c = Math.random();
    if (c > 0.85) {
      col[i * 3] = 0.7;
      col[i * 3 + 1] = 0.85;
      col[i * 3 + 2] = 1.0;
    } else if (c > 0.6) {
      col[i * 3] = 1.0;
      col[i * 3 + 1] = 1.0;
      col[i * 3 + 2] = 0.85;
    } else if (c > 0.35) {
      col[i * 3] = 1.0;
      col[i * 3 + 1] = 0.75;
      col[i * 3 + 2] = 0.4;
    } else {
      col[i * 3] = 1.0;
      col[i * 3 + 1] = 0.55;
      col[i * 3 + 2] = 0.3;
    }
  }
  
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  state.scene.add(new THREE.Points(geo, new THREE.PointsMaterial({
    size: 0.4,
    vertexColors: true,
    sizeAttenuation: true
  })));
}

// Build Milky Way galaxy view
function buildGalaxy() {
  const grp = new THREE.Group();
  grp.name = 'galaxy';
  state.objects.galaxy = grp;

  const count = CONFIG.GALAXY_STAR_COUNT;
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3);
  const col = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const arm = Math.floor(Math.random() * 4);
    const r = 0.5 + Math.pow(Math.random(), 0.55) * 30;
    const armAngle = (arm / 4) * Math.PI * 2;
    const spiral = r * 0.42;
    const scatter = (Math.random() - 0.5) * (r * 0.14 + 0.4);
    const angle = armAngle + spiral + scatter;
    const y = (Math.random() - 0.5) * Math.max(0.08, 1.6 - r * 0.052);

    pos[i * 3] = Math.cos(angle) * r + (Math.random() - 0.5) * 0.6;
    pos[i * 3 + 1] = y;
    pos[i * 3 + 2] = Math.sin(angle) * r + (Math.random() - 0.5) * 0.6;

    const tf = r / 30;
    if (tf < 0.12) {
      col[i * 3] = 1;
      col[i * 3 + 1] = 0.95;
      col[i * 3 + 2] = 0.65;
    } else if (tf < 0.4) {
      col[i * 3] = 0.75;
      col[i * 3 + 1] = 0.88;
      col[i * 3 + 2] = 1.0;
    } else if (tf < 0.7) {
      col[i * 3] = 0.9;
      col[i * 3 + 1] = 0.75;
      col[i * 3 + 2] = 0.55;
    } else {
      col[i * 3] = 0.6;
      col[i * 3 + 1] = 0.65;
      col[i * 3 + 2] = 0.9;
    }
  }

  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  grp.add(new THREE.Points(geo, new THREE.PointsMaterial({
    size: 0.16,
    vertexColors: true
  })));

  // Galaxy glow layers
  [[2.2, 0xFFEE88, 0.55], [3.5, 0xFFCC44, 0.18], [5.0, 0xFF8800, 0.07]].forEach(([r, c, o]) => {
    const m = new THREE.Mesh(new THREE.SphereGeometry(r, 16, 16),
      new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: o }));
    grp.add(m);
  });

  // Black hole at center
  const bh = new THREE.Mesh(new THREE.SphereGeometry(0.3, 12, 12),
    new THREE.MeshBasicMaterial({ color: 0x000000 }));
  bh.userData = { name: 'Sagittarius A*', type: 'blackhole' };
  state.clickables.push(bh);
  grp.add(bh);

  state.scene.add(grp);
}

// Build Solar System view
function buildSolarSystem() {
  const grp = new THREE.Group();
  grp.name = 'solar';
  state.objects.solar = grp;
  grp.visible = false;

  // Sun with glow
  [[1.5, 0xFFDD44, 1], [2.0, 0xFFAA00, 0.14], [2.8, 0xFF6600, 0.06]].forEach(([r, c, o], i) => {
    const sun = new THREE.Mesh(new THREE.SphereGeometry(r, 32, 32),
      new THREE.MeshBasicMaterial({ color: c, transparent: o < 1, opacity: o }));
    if (i === 0) {
      sun.userData = { name: 'The Sun', type: 'star' };
      state.clickables.push(sun);
    }
    grp.add(sun);
  });
  grp.add(new THREE.PointLight(0xFFEE88, 3, 200));

  // Planets
  PLANETS.forEach(p => {
    state.orbitAngles[p.name] = Math.random() * Math.PI * 2;
    
    // Orbit ring
    grp.add(new THREE.Mesh(
      new THREE.RingGeometry(p.dist - 0.03, p.dist + 0.03, 120),
      new THREE.MeshBasicMaterial({
        color: 0x334455,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.35
      })
    ));

    // Planet
    const planet = new THREE.Mesh(
      new THREE.SphereGeometry(p.size, 28, 28),
      new THREE.MeshStandardMaterial({ color: p.color, metalness: 0.15, roughness: 0.75 })
    );
    planet.position.set(p.dist, 0, 0);
    planet.userData = { name: p.name, type: 'planet', dist: p.dist, speed: p.speed };
    state.clickables.push(planet);
    grp.add(planet);

    // Saturn rings
    if (p.name === 'Saturn') {
      [[p.size * 1.5, p.size * 2.2, 0xCCBB88, 0.55], [p.size * 2.2, p.size * 2.6, 0xBBAA77, 0.35]].forEach(([ri, ro, c, o]) => {
        const ring = new THREE.Mesh(new THREE.RingGeometry(ri, ro, 64),
          new THREE.MeshBasicMaterial({ color: c, side: THREE.DoubleSide, transparent: true, opacity: o }));
        ring.rotation.x = Math.PI * 0.38;
        planet.add(ring);
      });
    }

    // Uranus rings
    if (p.name === 'Uranus') {
      const ring = new THREE.Mesh(new THREE.RingGeometry(p.size * 1.4, p.size * 1.8, 40),
        new THREE.MeshBasicMaterial({ color: 0x66BBCC, side: THREE.DoubleSide, transparent: true, opacity: 0.25 }));
      ring.rotation.z = Math.PI * 0.48;
      planet.add(ring);
    }

    // Earth Moon
    if (p.name === 'Earth') {
      const moon = new THREE.Mesh(new THREE.SphereGeometry(0.08, 12, 12),
        new THREE.MeshStandardMaterial({ color: 0xAAAAAA, roughness: 0.9 }));
      moon.position.set(0.55, 0, 0);
      moon.userData = { name: 'The Moon', type: 'moon' };
      planet.add(moon);
    }
  });

  // Asteroid belt
  const abGeo = new THREE.BufferGeometry();
  const abCount = 1200;
  const abPos = new Float32Array(abCount * 3);
  const abCol = new Float32Array(abCount * 3);
  for (let i = 0; i < abCount; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = 10.3 + Math.random() * 1.8;
    abPos[i * 3] = Math.cos(a) * r;
    abPos[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
    abPos[i * 3 + 2] = Math.sin(a) * r;
    const shade = 0.4 + Math.random() * 0.4;
    abCol[i * 3] = shade;
    abCol[i * 3 + 1] = shade * 0.95;
    abCol[i * 3 + 2] = shade * 0.85;
  }
  abGeo.setAttribute('position', new THREE.BufferAttribute(abPos, 3));
  abGeo.setAttribute('color', new THREE.BufferAttribute(abCol, 3));
  grp.add(new THREE.Points(abGeo, new THREE.PointsMaterial({ size: 0.07, vertexColors: true })));

  // Kuiper Belt
  const kbGeo = new THREE.BufferGeometry();
  const kbCount = 800;
  const kbPos = new Float32Array(kbCount * 3);
  const kbCol = new Float32Array(kbCount * 3);
  for (let i = 0; i < kbCount; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = 30 + Math.random() * 15;
    kbPos[i * 3] = Math.cos(a) * r;
    kbPos[i * 3 + 1] = (Math.random() - 0.5) * 2;
    kbPos[i * 3 + 2] = Math.sin(a) * r;
    kbCol[i * 3] = 0.55;
    kbCol[i * 3 + 1] = 0.5;
    kbCol[i * 3 + 2] = 0.6;
  }
  kbGeo.setAttribute('position', new THREE.BufferAttribute(kbPos, 3));
  kbGeo.setAttribute('color', new THREE.BufferAttribute(kbCol, 3));
  grp.add(new THREE.Points(kbGeo, new THREE.PointsMaterial({
    size: 0.05,
    vertexColors: true,
    transparent: true,
    opacity: 0.6
  })));

  state.scene.add(grp);
}

// Build Moons view
function buildMoonsView() {
  const grp = new THREE.Group();
  grp.name = 'moons';
  state.objects.moons = grp;
  grp.visible = false;

  const planetPositions = {
    'Earth': { x: 0, y: 0, z: 0 },
    'Mars': { x: 15, y: 0, z: 0 },
    'Jupiter': { x: 30, y: 0, z: 0 },
    'Saturn': { x: 45, y: 0, z: 0 },
    'Neptune': { x: 60, y: 0, z: 0 }
  };

  MOONS_DATA.forEach((moon, idx) => {
    const ppos = planetPositions[moon.parent] || { x: 75, y: 0, z: 0 };
    const offset = (idx % 3) * 0.1 + 0.3;
    const m = new THREE.Mesh(new THREE.SphereGeometry(moon.size, 12, 12),
      new THREE.MeshStandardMaterial({ color: moon.color, roughness: 0.8 }));
    m.position.set(ppos.x + offset, ppos.y, ppos.z);
    m.userData = { name: moon.name, type: 'moon', facts: moon.facts };
    state.clickables.push(m);
    grp.add(m);
  });

  state.scene.add(grp);
}

// Build Universe view
function buildUniverseView() {
  const grp = new THREE.Group();
  grp.name = 'universe';
  state.objects.universe = grp;
  grp.visible = false;

  const count = CONFIG.UNIVERSE_CLUSTER_COUNT;
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3);
  const col = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const cluster = Math.floor(Math.random() * 24);
    const cx = (cluster % 6 - 2.5) * 38 + (Math.random() - 0.5) * 4;
    const cy = (Math.floor(cluster / 6) % 4 - 1.5) * 28 + (Math.random() - 0.5) * 4;
    const cz = (Math.floor(cluster / 12) - 0.5) * 65;
    const r = Math.random() * 14;
    const a = Math.random() * Math.PI * 2;
    const b = Math.random() * Math.PI;
    pos[i * 3] = cx + r * Math.sin(b) * Math.cos(a);
    pos[i * 3 + 1] = cy + r * Math.sin(b) * Math.sin(a) * 0.5;
    pos[i * 3 + 2] = cz + r * Math.cos(b);
    const c = Math.random();
    col[i * 3] = c > 0.5 ? 0.5 : 0.9;
    col[i * 3 + 1] = c > 0.5 ? 0.65 : 0.88;
    col[i * 3 + 2] = 1.0;
  }

  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  grp.add(new THREE.Points(geo, new THREE.PointsMaterial({ size: 0.6, vertexColors: true })));
  state.scene.add(grp);
}

// Build Black Hole scene
function buildBlackholeScene() {
  const grp = new THREE.Group();
  grp.name = 'blackhole';
  state.objects.blackhole = grp;
  grp.visible = false;

  // Event horizon
  grp.add(new THREE.Mesh(new THREE.SphereGeometry(2, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0x000000 })));

  // Accretion disk layers
  const diskData = [
    [2.3, 3.8, 0xFF8800, 0.85],
    [3.5, 5.5, 0xFF5500, 0.65],
    [5.0, 8.0, 0xFF3300, 0.45],
    [7.5, 11.0, 0x882200, 0.25]
  ];

  diskData.forEach(([ri, ro, c, o]) => {
    const disk = new THREE.Mesh(new THREE.RingGeometry(ri, ro, 80, 4),
      new THREE.MeshBasicMaterial({
        color: c,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: o
      }));
    disk.rotation.x = Math.PI * 0.22;
    disk.userData = { diskLayer: true };
    grp.add(disk);
  });

  // Inner accretion disk
  const inner = new THREE.Mesh(new THREE.RingGeometry(2.1, 3.0, 60),
    new THREE.MeshBasicMaterial({
      color: 0xFFFFAA,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.6
    }));
  inner.rotation.x = Math.PI * 0.22;
  grp.add(inner);

  // White ring
  grp.add(new THREE.Mesh(new THREE.TorusGeometry(3.1, 0.04, 8, 100),
    new THREE.MeshBasicMaterial({ color: 0xFFFFFF })));

  // Halo
  const halo = new THREE.Mesh(new THREE.RingGeometry(3.8, 4.2, 80),
    new THREE.MeshBasicMaterial({
      color: 0xFFAA66,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.15
    }));
  halo.rotation.x = Math.PI * 0.15;
  grp.add(halo);

  // Jets
  [[12, 0], [-12, Math.PI]].forEach(([y, r]) => {
    const jet = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.5, 20, 8),
      new THREE.MeshBasicMaterial({ color: 0x4488FF, transparent: true, opacity: 0.45 }));
    jet.position.y = y;
    jet.rotation.z = r;
    grp.add(jet);
  });

  state.scene.add(grp);
}

// Build Nebula scene
function buildNebulaScene() {
  const grp = new THREE.Group();
  grp.name = 'nebula';
  state.objects.nebula = grp;
  grp.visible = false;

  const layers = [
    { color1: [0.85, 0.2, 0.95], color2: [0.4, 0.08, 0.85], count: 3500, spread: 28, ySpread: 17, size: 0.4 },
    { color1: [0.2, 0.75, 0.95], color2: [0.08, 0.4, 0.85], count: 2500, spread: 22, ySpread: 13, size: 0.35 },
    { color1: [0.95, 0.45, 0.15], color2: [0.75, 0.2, 0.08], count: 1800, spread: 16, ySpread: 9, size: 0.3 },
    { color1: [0.2, 0.9, 0.55], color2: [0.1, 0.55, 0.3], count: 1000, spread: 12, ySpread: 6, size: 0.25 }
  ];

  layers.forEach(l => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(l.count * 3);
    const col = new Float32Array(l.count * 3);
    for (let i = 0; i < l.count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * l.spread;
      pos[i * 3 + 1] = (Math.random() - 0.5) * l.ySpread;
      pos[i * 3 + 2] = (Math.random() - 0.5) * l.spread;
      const tt = Math.random();
      col[i * 3] = l.color1[0] * tt + l.color2[0] * (1 - tt);
      col[i * 3 + 1] = l.color1[1] * tt + l.color2[1] * (1 - tt);
      col[i * 3 + 2] = l.color1[2] * tt + l.color2[2] * (1 - tt);
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    grp.add(new THREE.Points(geo, new THREE.PointsMaterial({
      size: l.size,
      vertexColors: true,
      transparent: true,
      opacity: 0.8
    })));
  });

  // Embedded stars
  for (let i = 0; i < 12; i++) {
    const star = new THREE.Mesh(new THREE.SphereGeometry(0.25 + Math.random() * 0.15, 10, 10),
      new THREE.MeshBasicMaterial({ color: 0xCCEEFF }));
    star.position.set(
      (Math.random() - 0.5) * 14,
      (Math.random() - 0.5) * 7,
      (Math.random() - 0.5) * 14
    );
    grp.add(star);
  }

  state.scene.add(grp);
}
