# CosmosVault Pro - Universe Explorer

## 📌 Project Overview

**CosmosVault Pro v2.0** is an interactive 3D web-based universe explorer built with Three.js. It provides an immersive experience to explore the Milky Way galaxy, our Solar System, moons, black holes, nebulae, and the observable universe. The application is now organized with a modular, scalable architecture ready for NASA API integration and AI features.

## 🗂️ Project Structure

```
galaxys/
├── index.html              # Main entry point (clean, organized)
│
├── css/
│   └── styles.css         # All styling (extracted from HTML)
│
├── js/                    # Modular JavaScript files
│   ├── config.js          # Configuration, constants, and state management
│   ├── data.js            # Astronomical data (planets, moons, facts)
│   ├── scene.js           # Three.js scene building and rendering
│   ├── views.js           # View management and animation loop
│   ├── ui.js              # UI components and panel management
│   ├── interaction.js     # Mouse, keyboard, and camera controls
│   ├── api-integration.js # NASA API, ISS tracking, AI placeholders
│   └── main.js            # Main initialization and event setup
│
├── api/                   # Placeholder for future API services
│   └── README.md          # Instructions for API setup
│
├── data/                  # Data files (for future expansion)
│   └── README.md          # Data organization guide
│
└── README.md              # This file
```

## 🚀 Quick Start

### 1. **Open in Browser**
Simply open `index.html` in a modern web browser (Chrome, Firefox, Safari, Edge).

### 2. **Local Server (Recommended)**
For best performance and to avoid CORS issues with APIs:

```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js (http-server)
npx http-server
```

Then visit: `http://localhost:8000`

## 🎮 Controls

### Keyboard Shortcuts
| Key | Action |
|-----|--------|
| **1-6** | Switch between views (Galaxy, Solar System, Moons, Universe, Black Holes, Nebulae) |
| **Space** | Toggle auto-rotation |
| **+/-** | Zoom in/out |
| **R** | Reset view to default position |
| **I** | Toggle information panel |
| **S** | Open search |
| **P** | Take screenshot |
| **D** | Save/Load session |
| **A** | Toggle AR mode |
| **?** | Show keyboard shortcuts |
| **Esc** | Close all overlays |

### Mouse & Touch
- **Click & Drag** - Rotate camera
- **Scroll** - Zoom in/out
- **Hover** - See object tooltips
- **Touch & Drag** - Mobile camera rotation

## 🔧 Configuration

Edit `js/config.js` to customize:

```javascript
// API Keys
CONFIG.NASA_API_KEY = 'YOUR_API_KEY_HERE';

// Particle counts
CONFIG.STARFIELD_COUNT = 15000;
CONFIG.GALAXY_STAR_COUNT = 25000;

// Animation speeds
CONFIG.SMOOTH_MOVE_STEPS = 70;
CONFIG.NOTIFICATION_TIMEOUT = 2500;
```

## 📡 API Integration Setup

### NASA API (APOD & Mars Weather)

1. **Get API Key**
   - Visit: https://api.nasa.gov/
   - Sign up for a free API key
   - The default `DEMO_KEY` works for testing

2. **Add Your Key**
   - Open `js/config.js`
   - Update: `CONFIG.NASA_API_KEY = 'YOUR_KEY_HERE'`

3. **Verify Integration**
   - Open browser console
   - Check for NASA APOD data loading
   - Watch for ISS location updates (every 30 seconds)

### ISS Tracking (Pre-configured)
No API key needed! Uses `wheretheiss.at` free service.
- Automatically displays ISS location
- Updates every 30 seconds
- Shows latitude, longitude, altitude, and velocity

## 🤖 AI Integration Setup

### Option 1: Local LLM Service
1. Set up local service (e.g., Ollama, LM Studio)
2. Update in `js/config.js`:
   ```javascript
   CONFIG.AI_API_BASE = 'http://localhost:5000';
   ```
3. Implement handlers in `js/api-integration.js`

### Option 2: OpenAI API
1. Get API key from https://platform.openai.com/
2. Update `js/api-integration.js` with:
   ```javascript
   const response = await fetch('https://api.openai.com/v1/chat/completions', {
     headers: { 'Authorization': `Bearer ${AI_API_KEY}` }
   });
   ```

### Option 3: Custom Backend
- Implement your own backend API
- Update `queryAI()` function in `js/api-integration.js`
- Connect any LLM service of choice

### Placeholder Functions Ready
Functions are already stubbed and ready for implementation:
- `queryAI(question)` - General space questions
- `getAIFunFact(objectName)` - Generate fun facts
- `processAICommand(command)` - Natural language commands

## 📊 Data Structure

### Astronomical Data (`js/data.js`)

All data is organized as constants for easy modification:

```javascript
const PLANETS = [
  { name: 'Mercury', color: 0x9E9E9E, size: 0.18, ... },
  // ... more planets
];

const MOONS_DATA = [
  { name: 'Moon', parent: 'Earth', facts: [...], ... },
  // ... more moons
];

const DATA = {
  galaxy: { stats: [...], overview: '...', sections: [...], funFacts: [...] },
  // ... more views
};
```

**To add new data:**
1. Add entries to appropriate constant in `js/data.js`
2. Data automatically appears in search and UI
3. No other files need modification

## 🎨 Customization

### Change Color Scheme
Edit CSS variables in `css/styles.css`:

```css
:root {
  --glow: #00d4ff;      /* Cyan accent */
  --amber: #ffb347;     /* Orange accent */
  --green: #00ff9d;     /* Green accent */
  /* ... more colors ... */
}
```

### Modify Scene Objects
Edit scene building functions in `js/scene.js`:
- `buildGalaxy()` - Milky Way appearance
- `buildSolarSystem()` - Planets and orbits
- `buildBlackholeScene()` - Black hole visualization

### Add New Views
1. Create scene builder function in `js/scene.js`
2. Add to `state.objects` in that function
3. Add view config in `js/config.js` `VIEW_CONFIG`
4. Add navigation pill in `index.html` `<div id="nav-pills">`

## 📱 Features

✅ **6 Different Views**
- Milky Way Galaxy
- Solar System (8 planets + moons)
- Moon system (10+ moons)
- Observable Universe
- Black holes with accretion disk
- Nebulae (star nurseries)

✅ **Interactive Elements**
- Search with autocomplete
- Click objects for details
- Hover for tooltips
- Drag to rotate camera
- Zoom with scroll or buttons

✅ **Information Panels**
- Statistics (distance, mass, etc.)
- Overview descriptions
- Fun facts database
- Categorized facts

✅ **Session Management**
- Save/load position and zoom
- Browser localStorage persistence
- Multiplayer mode (demo)
- AR mode (demo)

✅ **Visualization Features**
- 15,000+ starfield background
- Real-time FPS counter
- Session timer
- Object HUD display
- Screenshot capability

## 🔌 Adding New Features

### 1. **Add New Astronomical Object**
```javascript
// In js/data.js, add to PLANETS or create new array
{ name: 'NewPlanet', color: 0xRRGGBB, size: 0.5, ... }

// Add mesh in js/scene.js buildSolarSystem()
const planet = new THREE.Mesh(...);
state.objects.solar.add(planet);
```

### 2. **Add API Endpoint**
```javascript
// In js/api-integration.js
async function fetchNewData() {
  const response = await fetch(url);
  return response.json();
}
```

### 3. **Add UI Panel**
```javascript
// In index.html, add new overlay
<div id="new-panel">...</div>

// In js/ui.js, add toggle function
function toggleNewPanel() { ... }
```

## 🐛 Troubleshooting

### **3D Scene Not Loading**
- Check browser console for errors
- Verify Three.js library loaded
- Check GPU/WebGL support

### **API Data Not Loading**
- Check NASA API key in `js/config.js`
- Open browser console for error messages
- Verify network connection
- Check CORS settings if using custom backend

### **Performance Issues**
- Reduce particle counts in `js/config.js`
- Lower camera quality settings
- Close unneeded UI panels
- Test on different browser/GPU

### **Search Not Working**
- Verify data in `js/data.js` SEARCH_INDEX
- Check console for JavaScript errors
- Clear browser cache

## 📚 Code Organization

Each JavaScript file has a specific responsibility:

| File | Purpose |
|------|---------|
| **config.js** | State, constants, configuration |
| **data.js** | All astronomical data |
| **scene.js** | Three.js geometry and scene setup |
| **views.js** | View switching and animation |
| **ui.js** | UI components and interactions |
| **interaction.js** | Input handling (mouse, keyboard) |
| **api-integration.js** | External API calls |
| **main.js** | Application initialization |

## 🚀 Deployment

### GitHub Pages
1. Push to `gh-pages` branch
2. Enable in repository settings
3. Access at `https://username.github.io/galaxys`

### Netlify
1. Connect Git repository
2. Build command: (leave empty)
3. Publish directory: `/`
4. Deploy!

### Self-Hosted
1. Copy all files to server
2. Ensure proper CORS headers
3. Use HTTPS for production
4. Point domain to `/index.html`

## 📝 Future Enhancements

- [ ] Real-time exoplanet database integration
- [ ] Advanced AI chatbot for space questions
- [ ] Multiplayer real sessions
- [ ] Full AR implementation with device sensors
- [ ] 3D model import system
- [ ] Space sounds and music
- [ ] Educational missions/tours
- [ ] Social sharing features
- [ ] Night mode optimization

## 📄 License

This project is open source and available under MIT License.

## 🤝 Contributing

Contributions welcome! Areas that need work:
- AI integration completion
- More astronomical data
- UI/UX improvements
- Performance optimization
- Bug fixes

## 📧 Support

For issues, questions, or suggestions:
1. Check this README
2. Review browser console for errors
3. Check GitHub issues
4. Create a new issue with details

---

**Happy exploring the cosmos!** 🌌✨
