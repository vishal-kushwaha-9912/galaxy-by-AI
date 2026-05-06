# 🌌 CosmosVault Pro v2.0

> 🚀 Interactive 3D Universe Explorer built with Three.js
> 🌍 Explore galaxies, planets, moons, black holes & the observable universe in real-time

🔗 **Live Demo:** https://your-username.github.io/galaxys/
⭐ **Star this repo if you like it!**

---

## 📸 Preview

![Demo](assets/demo.gif)

---

## ✨ Highlights

* 🌌 Real-time 3D galaxy rendering using Three.js
* 🪐 Full Solar System with planets & moons
* 🛰️ Live ISS tracking (real-time data)
* 📡 NASA API integration ready
* 🧠 AI-powered space assistant (extensible)
* 🎮 Smooth camera controls & interactions
* 💾 Session save/load system
* 📱 Responsive & optimized UI

---

## 🧠 Why CosmosVault Pro?

CosmosVault Pro demonstrates how modern web technologies can simulate complex cosmic environments directly in the browser.

It is designed as a scalable foundation for:

* 🌍 Space data visualization tools
* 🎓 Educational platforms
* 🤖 AI-powered exploration systems

---

## 🎮 Live Experience

1. 🌌 Start in the Milky Way galaxy
2. 🪐 Zoom into the Solar System
3. 🌕 Explore moons and planetary systems
4. 🕳️ Dive into black holes & nebulae
5. 🛰️ Track the ISS in real-time

---

## 🗂️ Project Structure

```
galaxys/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── config.js
│   ├── data.js
│   ├── scene.js
│   ├── views.js
│   ├── ui.js
│   ├── interaction.js
│   ├── api-integration.js
│   └── main.js
├── api/
├── data/
└── README.md
```

---

## 🛠️ Tech Stack

* **Three.js** – 3D rendering engine
* **JavaScript (ES6+)** – Core logic
* **HTML5 & CSS3** – UI & styling
* **WebGL** – GPU-accelerated graphics
* **NASA API** – Space data integration

---

## 🎮 Controls

### ⌨️ Keyboard

| Key   | Action               |
| ----- | -------------------- |
| 1–6   | Switch views         |
| Space | Toggle auto-rotation |
| +/-   | Zoom                 |
| R     | Reset view           |
| I     | Toggle info panel    |
| S     | Search               |
| P     | Screenshot           |
| Esc   | Close overlays       |

### 🖱️ Mouse

* Drag → Rotate
* Scroll → Zoom
* Hover → Tooltips

---

## ⚡ Performance

* Handles **15,000+ stars smoothly**
* Optimized rendering loop
* Modular & scalable architecture

---

## ▶️ Getting Started

### Run Locally

```bash
git clone https://github.com/your-username/galaxys.git
cd galaxys
```

Open `index.html` in your browser

---

### Run with Local Server (Recommended)

```bash
# Python
python -m http.server 8000

# Node
npx http-server
```

Open: `http://localhost:8000`

---

## 📡 API Integration

### NASA API

1. Get API key from: https://api.nasa.gov/
2. Add in `js/config.js`:

```js
CONFIG.NASA_API_KEY = 'YOUR_KEY';
```

### ISS Tracking

* Uses free API (no key required)
* Updates automatically every 30 seconds

---

## 🤖 AI Integration (Optional)

Supports:

* Local LLM (Ollama / LM Studio)
* OpenAI API
* Custom backend

---

## 🎨 Customization

* Modify colors in `css/styles.css`
* Adjust scene in `js/scene.js`
* Update data in `js/data.js`

---

## 🚀 Deployment

### GitHub Pages

* Enable in repo settings
* Deploy from `main` branch

### Netlify

* Connect repo
* Deploy instantly

---

## 📝 Roadmap

* [ ] Real-time exoplanet data
* [ ] Advanced AI chatbot
* [ ] Multiplayer mode
* [ ] AR/VR support
* [ ] Space sound effects

---

## 🤝 Contributing

Contributions are welcome!
Feel free to fork, improve, and submit PRs.

---

## 📄 License

MIT License

---

## 👨‍💻 Author

**Vishal Kushwaha**

---

⭐ If you found this project useful, give it a star!

