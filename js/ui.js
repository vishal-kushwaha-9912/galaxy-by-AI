/* ═══════════════════════════════════════════════════════════════
   UI COMPONENTS AND PANEL MANAGEMENT
   ═══════════════════════════════════════════════════════════════ */

// Show info panel for selected object
function showInfo(key, extra) {
  const panel = document.getElementById('info-panel');
  state.activeData = extra || DATA[key];
  if (!state.activeData) return;
  
  document.getElementById('panel-title').textContent = state.activeData.title;
  document.getElementById('panel-subtitle').textContent = state.activeData.subtitle;
  document.getElementById('panel-icon').textContent = state.activeData.icon || ICONS[key] || '✦';
  
  renderTab(state.currentTab);
  panel.classList.add('open');
}

// Switch between tabs in info panel
function switchTab(tab) {
  state.currentTab = tab;
  document.querySelectorAll('.p-tab').forEach(t => t.classList.toggle('active', t.textContent.toLowerCase() === tab));
  if (state.activeData) renderTab(tab);
}

// Render content for selected tab
function renderTab(tab) {
  const d = state.activeData;
  let html = '';

  if (tab === 'stats') {
    if (d.stats) {
      html += '<div class="stat-grid">';
      d.stats.forEach(s => {
        html += `<div class="stat-card"><div class="stat-label">${s.label}</div><div class="stat-value">${s.value}</div></div>`;
      });
      html += '</div>';
    }
    if (d.overview) html += `<div class="info-section"><p>${d.overview}</p></div>`;
  } else if (tab === 'facts') {
    if (d.funFacts) {
      d.funFacts.forEach((f, i) => {
        html += `<div class="fun-fact"><div class="ff-num">0${i + 1}</div><p>${f}</p></div>`;
      });
    }
  } else {
    if (d.sections) {
      d.sections.forEach(s => {
        html += `<div class="info-section"><h3>${s.title}</h3><ul class="fact-list">`;
        s.facts.forEach(f => { html += `<li>${f}</li>`; });
        html += '</ul></div>';
      });
    }
  }

  document.getElementById('panel-body').innerHTML = html || '<div style="color:var(--muted);font-size:12px;padding:10px">No data.</div>';
}

// Close info panel
function closePanel() {
  document.getElementById('info-panel').classList.remove('open');
}

// Toggle info panel visibility
function togglePanel() {
  const p = document.getElementById('info-panel');
  if (p.classList.contains('open')) {
    closePanel();
  } else {
    showInfo(state.currentView);
  }
}

// Build object list for current view
function buildObjectList() {
  const list = document.getElementById('object-list');
  list.innerHTML = '';

  if (state.currentView === 'moons') {
    MOONS_DATA.forEach(m => {
      const btn = document.createElement('button');
      btn.className = 'obj-btn';
      btn.innerHTML = `<div class="obj-dot" style="background:#AAAAAA"></div><span class="obj-name">${m.emoji} ${m.name}</span>`;
      btn.onclick = () => {
        showInfo(null, {
          title: m.name.toUpperCase(),
          subtitle: `Moon of ${m.parent}`,
          icon: m.emoji,
          funFacts: m.facts
        });
        document.getElementById('hud-obj').textContent = m.name;
      };
      list.appendChild(btn);
    });
  } else if (state.currentView === 'solar') {
    PLANETS.forEach(p => {
      const btn = document.createElement('button');
      btn.className = 'obj-btn';
      btn.innerHTML = `<div class="obj-dot" style="background:${p.dot}"></div><span class="obj-name">${p.emoji} ${p.name}</span>`;
      btn.onclick = () => {
        showInfo(null, {
          title: p.name.toUpperCase(),
          subtitle: 'Planet',
          icon: p.emoji
        });
        document.getElementById('hud-obj').textContent = p.name;
      };
      list.appendChild(btn);
    });
    
    DWARF_PLANETS.forEach(d => {
      const btn = document.createElement('button');
      btn.className = 'obj-btn';
      btn.innerHTML = `<div class="obj-dot" style="background:${d.color};opacity:0.6"></div><span class="obj-name" style="opacity:0.7">${d.emoji} ${d.name}</span>`;
      btn.onclick = () => {
        showInfo(null, {
          title: d.name.toUpperCase(),
          subtitle: 'Dwarf Planet',
          icon: d.emoji,
          funFacts: d.facts
        });
      };
      list.appendChild(btn);
    });
  } else {
    [
      { key: 'galaxy', label: 'Milky Way', dot: '#FFD700', emoji: '🌌' },
      { key: 'universe', label: 'Universe', dot: '#4488FF', emoji: '🔭' },
      { key: 'blackhole', label: 'Black Holes', dot: '#FF2D78', emoji: '⚫' },
      { key: 'nebula', label: 'Nebulae', dot: '#AA44FF', emoji: '🌈' }
    ].forEach(v => {
      const btn = document.createElement('button');
      btn.className = 'obj-btn' + (state.currentView === v.key ? ' selected' : '');
      btn.innerHTML = `<div class="obj-dot" style="background:${v.dot}"></div><span class="obj-name">${v.emoji} ${v.label}</span>`;
      btn.onclick = () => setView(v.key);
      list.appendChild(btn);
    });
  }
}

// Toggle search overlay
function toggleSearch() {
  state.searchOpen = !state.searchOpen;
  document.getElementById('search-wrap').classList.toggle('open', state.searchOpen);
  if (state.searchOpen) {
    setTimeout(() => document.getElementById('search-box').focus(), 200);
  } else {
    document.getElementById('search-box').value = '';
    document.getElementById('search-results').classList.remove('show');
  }
}

// Perform search
function doSearch(q) {
  const res = document.getElementById('search-results');
  if (!q.trim()) {
    res.classList.remove('show');
    return;
  }

  const matches = SEARCH_INDEX.filter(i =>
    i.label.toLowerCase().includes(q.toLowerCase()) ||
    i.sub.toLowerCase().includes(q.toLowerCase())
  ).slice(0, 10);

  res.innerHTML = matches.map(m =>
    `<div class="search-item" onclick="searchSelect('${m.view}','${m.planet || m.moon || m.dwarf || ''}')">
      <div class="s-dot" style="background:${m.dot}"></div>
      <div>${m.label}<br><span style="font-size:9px;color:var(--muted)">${m.sub}</span></div>
      <span class="s-cat">${m.view}</span>
    </div>`
  ).join('');
  res.classList.toggle('show', matches.length > 0);
}

// Select from search results
function searchSelect(view, extra) {
  setView(view);
  state.searchOpen = false;
  document.getElementById('search-wrap').classList.remove('open');
  document.getElementById('search-box').value = '';
  notify(`Navigating to ${extra || view}…`);
}

// Handle search box keydown
function searchKeydown(e) {
  if (e.key === 'Escape') toggleSearch();
}

// Toggle keyboard shortcuts overlay
function toggleShortcuts() {
  document.getElementById('shortcuts-overlay').classList.toggle('open');
}

// Toggle data modal
function toggleDataModal() {
  document.getElementById('data-modal').classList.toggle('open');
}

// Save session to localStorage
function saveSession() {
  const session = {
    view: state.currentView,
    camPos: { x: state.camera.position.x, y: state.camera.position.y, z: state.camera.position.z },
    zoom: 60 / state.camera.position.length(),
    time: new Date().toISOString()
  };
  localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(session));
  notify('✓ Session saved to browser storage');
}

// Load session from localStorage
function loadSession() {
  const saved = localStorage.getItem(CONFIG.STORAGE_KEY);
  if (!saved) {
    notify('✗ No saved session found');
    return;
  }
  const session = JSON.parse(saved);
  setView(session.view);
  gsmoothTo(state.camera.position, [session.camPos.x, session.camPos.y, session.camPos.z], 50);
  notify(`✓ Session loaded from ${new Date(session.time).toLocaleDateString()}`);
  toggleDataModal();
}

// Toggle multiplayer mode
function toggleMultiplayer() {
  state.multiplayerOnline = !state.multiplayerOnline;
  const status = document.getElementById('multiplayer-status');
  const btn = document.getElementById('mp-btn');
  if (state.multiplayerOnline) {
    status.classList.add('online');
    btn.textContent = '🟢 ONLINE';
    btn.style.borderColor = 'var(--green)';
    btn.style.color = 'var(--green)';
    notify('🟢 Multiplayer connected!');
  } else {
    status.classList.remove('online');
    btn.textContent = '⚫ OFFLINE';
    btn.style.borderColor = 'var(--muted)';
    btn.style.color = 'var(--muted)';
    notify('⚫ Multiplayer disconnected');
  }
}

// Toggle AR mode
function toggleARMode() {
  state.arActive = !state.arActive;
  document.getElementById('ar-overlay').classList.toggle('active', state.arActive);
  if (state.arActive) {
    notify('📱 AR Mode activated');
  } else {
    notify('📱 AR Mode deactivated');
  }
}

// Show notification
let notifTimer;
function notify(msg) {
  const el = document.getElementById('notif');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(notifTimer);
  notifTimer = setTimeout(() => el.classList.remove('show'), CONFIG.NOTIFICATION_TIMEOUT);
}

// Update HUD zoom display
function updateZoomHUD() {
  document.getElementById('hud-zoom').textContent = (60 / state.camera.position.length()).toFixed(2) + '×';
}
