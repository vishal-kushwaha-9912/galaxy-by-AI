/* ═══════════════════════════════════════════════════════════════
   API INTEGRATION - NASA, AI, AND EXTERNAL DATA SERVICES
   ═══════════════════════════════════════════════════════════════ */

// ═════════════════════════════════════════════════════════════════
// NASA API INTEGRATION (Astronomy Picture of the Day)
// ═════════════════════════════════════════════════════════════════

/**
 * Fetch NASA Astronomy Picture of the Day
 * Requires valid NASA API key in CONFIG.NASA_API_KEY
 * @returns {Promise<Object>} APOD data
 */
async function fetchNASAAPOD() {
  try {
    const url = `${CONFIG.NASA_API_BASE}/planetary/apod?api_key=${CONFIG.NASA_API_KEY}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`NASA API error: ${response.status}`);
    }
    
    const data = await response.json();
    Logger.info('NASA APOD data fetched successfully');
    return data;
  } catch (error) {
    Logger.error(`Failed to fetch NASA APOD: ${error.message}`);
    return null;
  }
}

/**
 * Fetch ISS (International Space Station) location
 * Uses wheretheiss.at API (free, no key required)
 * @returns {Promise<Object>} ISS location data
 */
async function fetchISSLocation() {
  try {
    const url = 'https://api.wheretheiss.at/v1/satellites/25544';
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`ISS API error: ${response.status}`);
    }
    
    const data = await response.json();
    Logger.info(`ISS Location: Lat ${data.latitude.toFixed(2)}, Lon ${data.longitude.toFixed(2)}`);
    return data;
  } catch (error) {
    Logger.error(`Failed to fetch ISS location: ${error.message}`);
    return null;
  }
}

/**
 * Fetch Mars rover weather data
 * Uses NASA Mars Weather API
 * @returns {Promise<Object>} Mars weather data
 */
async function fetchMarsWeather() {
  try {
    const url = `${CONFIG.NASA_API_BASE}/insight_weather/?api_key=${CONFIG.NASA_API_KEY}&feedtype=json`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Mars Weather API error: ${response.status}`);
    }
    
    const data = await response.json();
    Logger.info('Mars weather data fetched');
    return data;
  } catch (error) {
    Logger.error(`Failed to fetch Mars weather: ${error.message}`);
    return null;
  }
}

/**
 * Display NASA APOD in the UI
 */
async function displayNASAAPOD() {
  const container = document.getElementById('nasa');
  if (!container) {
    Logger.warn('NASA container element not found');
    return;
  }

  const data = await fetchNASAAPOD();
  if (!data) {
    container.innerHTML = '<div style="padding: 10px; color: var(--muted);">Unable to load NASA APOD</div>';
    return;
  }

  container.innerHTML = `
    <div class="card" style="margin: 10px;">
      <h2 style="color: var(--glow); margin-bottom: 10px;">${data.title}</h2>
      <img src="${data.url}" style="width: 100%; border-radius: 10px; margin-bottom: 10px;" alt="${data.title}">
      <p style="font-size: 12px; line-height: 1.6;">${data.explanation.substring(0, 300)}...</p>
      <p style="font-size: 10px; color: var(--muted); margin-top: 10px;">📅 ${data.date}</p>
    </div>
  `;
}

/**
 * Start ISS tracking (updates every 30 seconds)
 */
async function startISSTracking() {
  const container = document.getElementById('iss');
  if (!container) {
    Logger.warn('ISS container element not found');
    return;
  }

  const updateISS = async () => {
    const data = await fetchISSLocation();
    if (data) {
      container.innerHTML = `
        <div class="card" style="margin: 10px;">
          <h3 style="color: var(--glow); margin-bottom: 10px;">🚀 ISS Location</h3>
          <p style="font-size: 12px;">Latitude: <span style="color: var(--glow);">${data.latitude.toFixed(4)}°</span></p>
          <p style="font-size: 12px;">Longitude: <span style="color: var(--glow);">${data.longitude.toFixed(4)}°</span></p>
          <p style="font-size: 12px;">Altitude: <span style="color: var(--glow);">${data.altitude.toFixed(2)} km</span></p>
          <p style="font-size: 12px;">Velocity: <span style="color: var(--glow);">${data.velocity.toFixed(2)} km/h</span></p>
          <p style="font-size: 10px; color: var(--muted); margin-top: 10px;">Last updated: ${new Date().toLocaleTimeString()}</p>
        </div>
      `;
    }
  };

  // Initial update
  updateISS();

  // Update every 30 seconds
  setInterval(updateISS, 30000);
}

// ═════════════════════════════════════════════════════════════════
// AI INTEGRATION PLACEHOLDERS
// ═════════════════════════════════════════════════════════════════

/**
 * Query AI service for space-related questions
 * PLACEHOLDER: Requires setup of local AI service or API integration
 * @param {string} question - The user's question
 * @returns {Promise<string>} AI response
 */
async function queryAI(question) {
  try {
    // Placeholder for AI service integration
    // This could be connected to:
    // - OpenAI API
    // - Local LLM service
    // - Custom backend API
    
    Logger.warn('AI integration not yet configured. Returning placeholder response.');
    
    // Simulate response
    const responses = [
      'That is a fascinating question about space! Our AI would provide a detailed response here once configured.',
      'Space exploration is an incredible field. Would you like to learn more about specific aspects?',
      'The universe is vast and full of mysteries. AI analysis coming soon!'
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  } catch (error) {
    Logger.error(`AI Query failed: ${error.message}`);
    return 'Unable to process question at this time.';
  }
}

/**
 * Get AI-generated fun fact about current celestial object
 * @param {string} objectName - Name of celestial object
 * @returns {Promise<string>} Fun fact
 */
async function getAIFunFact(objectName) {
  try {
    // TODO: Integrate with AI service to generate facts
    Logger.debug(`Generating AI fact for: ${objectName}`);
    
    return `Fun fact about ${objectName} would be generated by AI here.`;
  } catch (error) {
    Logger.error(`Failed to generate AI fact: ${error.message}`);
    return null;
  }
}

/**
 * Process natural language commands via AI
 * @param {string} command - Natural language command
 * @returns {Promise<Object>} Parsed command with action
 */
async function processAICommand(command) {
  try {
    // TODO: Integrate with NLU service
    Logger.debug(`Processing AI command: ${command}`);
    
    // Placeholder command parsing
    if (command.toLowerCase().includes('solar')) {
      return { action: 'setView', target: 'solar' };
    } else if (command.toLowerCase().includes('galaxy')) {
      return { action: 'setView', target: 'galaxy' };
    }
    
    return { action: 'query', text: command };
  } catch (error) {
    Logger.error(`Command processing failed: ${error.message}`);
    return null;
  }
}

// ═════════════════════════════════════════════════════════════════
// INITIALIZATION
// ═════════════════════════════════════════════════════════════════

/**
 * Initialize API connections
 * Call this after DOM is ready
 */
function initializeAPIs() {
  Logger.info('Initializing API integrations...');
  
  // Display NASA APOD
  displayNASAAPOD();
  
  // Start ISS tracking
  startISSTracking();
  
  // TODO: Initialize AI connections when ready
  
  Logger.info('API integrations initialized');
}
