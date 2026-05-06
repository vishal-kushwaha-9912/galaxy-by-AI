/* ═══════════════════════════════════════════════════════════════
   ASTRONOMICAL DATA - PLANETS, MOONS, AND UNIVERSE INFO
   ═══════════════════════════════════════════════════════════════ */

// View icons mapping
const ICONS = {
  galaxy: '🌌',
  solar: '☀️',
  universe: '🔭',
  blackhole: '⚫',
  nebula: '🌈',
  moons: '🌙'
};

// Planets data
const PLANETS = [
  { name: 'Mercury', color: 0x9E9E9E, size: 0.18, dist: 3.5, speed: 0.04, dot: '#9E9E9E', emoji: '☿', moons: 0 },
  { name: 'Venus', color: 0xE8C27C, size: 0.3, dist: 5.0, speed: 0.025, dot: '#E8C27C', emoji: '♀', moons: 0 },
  { name: 'Earth', color: 0x4488FF, size: 0.32, dist: 7.0, speed: 0.018, dot: '#4488FF', emoji: '🌍', moons: 1 },
  { name: 'Mars', color: 0xCC4422, size: 0.22, dist: 9.0, speed: 0.012, dot: '#CC4422', emoji: '♂', moons: 2 },
  { name: 'Jupiter', color: 0xC88B4C, size: 0.75, dist: 13.0, speed: 0.005, dot: '#C88B4C', emoji: '♃', moons: 95 },
  { name: 'Saturn', color: 0xDDCC88, size: 0.65, dist: 17.0, speed: 0.003, dot: '#DDCC88', emoji: '♄', moons: 145 },
  { name: 'Uranus', color: 0x66CCDD, size: 0.5, dist: 21.0, speed: 0.002, dot: '#66CCDD', emoji: '♅', moons: 28 },
  { name: 'Neptune', color: 0x2244FF, size: 0.48, dist: 25.0, speed: 0.001, dot: '#2244FF', emoji: '♆', moons: 16 }
];

// Moons data
const MOONS_DATA = [
  { name: 'Moon', parent: 'Earth', color: 0xAAAAAA, size: 0.08, orbit: 0.55, emoji: '🌙', facts: ['Earth\'s only natural satellite', '4.5 billion years old', 'Causes ocean tides', 'Slowly drifting away at 3.8 cm/year'] },
  { name: 'Phobos', parent: 'Mars', color: 0x8B7355, size: 0.04, orbit: 0.25, emoji: '🪨', facts: ['Larger of Mars\' two moons', 'Potato-shaped', 'Orbits Mars every 7 hours', 'Will eventually crash into Mars in ~50 million years'] },
  { name: 'Deimos', parent: 'Mars', color: 0x9B8B7B, size: 0.03, orbit: 0.4, emoji: '🪨', facts: ['Smaller Martian moon', 'Extremely small', 'Orbits Mars every 30 hours', 'Named after Greek god of panic'] },
  { name: 'Io', parent: 'Jupiter', color: 0xFFDD44, size: 0.12, orbit: 0.8, emoji: '🌋', facts: ['Most volcanically active body', 'Over 500 volcanoes', 'Io and Europa subsystem', 'Named after priestess in Greek mythology'] },
  { name: 'Europa', parent: 'Jupiter', color: 0xDDDDCC, size: 0.11, orbit: 1.2, emoji: '❄️', facts: ['Icy moon with subsurface ocean', 'Potential for extraterrestrial life', 'Cracks suggest tidal heating', 'NASA plans future missions'] },
  { name: 'Ganymede', parent: 'Jupiter', color: 0xBBBBBB, size: 0.16, orbit: 1.6, emoji: '🌍', facts: ['Largest moon in Solar System', 'Bigger than Mercury', 'Has magnetic field', 'Ancient impact basins'] },
  { name: 'Callisto', parent: 'Jupiter', color: 0x555555, size: 0.15, orbit: 2.0, emoji: '🪨', facts: ['Heavily cratered surface', 'Minimal geological activity', 'Lacks magnetic field', 'Ancient, pristine surface'] },
  { name: 'Titan', parent: 'Saturn', color: 0xEEBB88, size: 0.2, orbit: 1.8, emoji: '🌫️', facts: ['Second-largest moon', 'Thick nitrogen atmosphere', 'Liquid methane lakes', 'Possible microbial life'] },
  { name: 'Enceladus', parent: 'Saturn', color: 0xFFFFFF, size: 0.08, orbit: 1.1, emoji: '❄️', facts: ['Icy geysers of water', 'Subsurface ocean', 'Candidate for life', 'NASA\'s CASSINI visited multiple times'] },
  { name: 'Triton', parent: 'Neptune', color: 0xDDEEFF, size: 0.09, orbit: 1.0, emoji: '❄️', facts: ['Orbits backwards (retrograde)', 'Likely captured Kuiper Belt object', 'Nitrogen geysers', 'Coldest planetary body'] }
];

// Dwarf planets data
const DWARF_PLANETS = [
  { name: 'Pluto', color: 0x8B7D6B, size: 0.06, dist: 40, emoji: '🪨', facts: ['No longer classified as planet (2006)', 'Has 5 moons', 'Heart-shaped region on surface', 'New Horizons flew by in 2015'] },
  { name: 'Eris', color: 0x999999, size: 0.07, dist: 44, emoji: '❄️', facts: ['More massive than Pluto', 'Farthest dwarf planet', 'Discovered in 2005', 'Caused Pluto\'s reclassification'] },
  { name: 'Haumea', color: 0x999988, size: 0.05, dist: 38, emoji: '🏉', facts: ['Egg-shaped due to rapid rotation', 'Has ring system', 'Discovered in 2004', 'Named after Hawaiian goddess'] },
  { name: 'Makemake', color: 0x776655, size: 0.05, dist: 42, emoji: '🪨', facts: ['Second-brightest Kuiper Belt object', 'Has small moon', 'Possible thin atmosphere', 'Named after Rapa Nui creator god'] }
];

// Main informational data for each view
const DATA = {
  galaxy: {
    title: 'MILKY WAY',
    subtitle: 'Barred Spiral Galaxy',
    icon: '🌌',
    stats: [
      { label: 'Diameter', value: '105,700 LY' },
      { label: 'Stars', value: '~300 Billion' },
      { label: 'Age', value: '13.6 Billion Yr' },
      { label: 'Type', value: 'SBbc' }
    ],
    overview: 'The Milky Way is a barred spiral galaxy containing our Solar System. Home to billions of stars, and centered on a supermassive black hole.',
    sections: [
      { title: 'Structure', facts: ['Central bulge ~10,000 LY', 'Four major spiral arms', 'Dark matter halo extends 800,000 LY', 'Barred structure ~27,000 LY across'] },
      { title: 'Our Location', facts: ['Solar System 26,000 LY from center', 'On the Orion Arm', 'Orbits center at ~220 km/s', 'One orbital period: ~225 million years'] }
    ],
    funFacts: ['The Milky Way is so large that light from its edge predates Earth itself.', 'If shrunk to the size of the US, Earth would fit inside a coffee cup.', 'We can only see ~5,000 stars with naked eye despite 300 billion in the galaxy.', 'Sagittarius A* black hole has a mass of 4 million Suns.']
  },
  solar: {
    title: 'SOLAR SYSTEM',
    subtitle: 'Our Cosmic Neighborhood',
    icon: '☀️',
    stats: [
      { label: 'Age', value: '4.6 Billion Yr' },
      { label: 'Planets', value: '8' },
      { label: 'Moons', value: '200+' },
      { label: 'Diameter', value: '~2 Light-Years' }
    ],
    overview: 'Formed from collapsing molecular cloud 4.6 billion years ago. Contains 8 planets, 200+ moons, and countless asteroids.',
    sections: [
      { title: 'The Sun', facts: ['Type G2V yellow dwarf', 'Diameter: 1.39 million km', 'Core temp: 15 million °C', 'Fuses 600 million tonnes H per second'] },
      { title: 'Rocky Planets', facts: ['Mercury: Extreme temp swings', 'Venus: Hottest at 465°C', 'Earth: Only known life planet', 'Mars: Home to Olympus Mons'] }
    ],
    funFacts: ['Jupiter could fit 1,300 Earths inside it.', 'Saturn is so light it would float on water.', 'A Martian day is almost identical to Earth\'s (24h 37m).', 'All planets could fit between Earth and Moon with room to spare.']
  },
  moons: {
    title: 'MOONS & SATELLITES',
    subtitle: 'Orbital Companions',
    icon: '🌙',
    stats: [
      { label: 'Total Moons', value: '200+' },
      { label: 'Largest', value: 'Ganymede' },
      { label: 'Most Active', value: 'Io' },
      { label: 'Icy Worlds', value: 'Europa, Enceladus, Triton' }
    ],
    overview: 'Over 200 moons orbit our Solar System\'s planets. From Earth\'s Moon to Jupiter\'s Ganymede, these worlds show incredible diversity.',
    sections: [
      { title: 'Planetary Moons', facts: ['Mercury & Venus: 0 moons', 'Earth: 1 moon', 'Mars: 2 small moons', 'Jupiter: 95+ moons', 'Saturn: 145+ moons'] },
      { title: 'Notable Moons', facts: ['Ganymede: Largest in Solar System', 'Titan: Has atmosphere like Earth', 'Enceladus: Water geysers below ice', 'Triton: Retrograde orbit, coldest body'] }
    ],
    funFacts: ['The Moon is slowly leaving Earth at 3.8 cm per year.', 'Io has more volcanoes than any other body in the Solar System.', 'Europa likely has more liquid water than all Earth\'s oceans.', 'Titan\'s atmosphere is thicker than Earth\'s.']
  },
  universe: {
    title: 'THE OBSERVABLE UNIVERSE',
    subtitle: 'The Cosmos',
    icon: '🔭',
    stats: [
      { label: 'Age', value: '13.8 Billion Yr' },
      { label: 'Diameter', value: '93 Billion LY' },
      { label: 'Galaxies', value: '~2 Trillion' },
      { label: 'Dark Energy', value: '68%' }
    ],
    overview: 'The observable universe spans 93 billion light-years and contains 2 trillion galaxies. It began with the Big Bang and continues expanding.',
    sections: [
      { title: 'Big Bang & Inflation', facts: ['Singularity ~13.8 billion years ago', 'Cosmic inflation in 10⁻³² seconds', 'First atoms formed 380,000 years later', 'CMB radiation is afterglow'] },
      { title: 'Dark Universe', facts: ['Ordinary matter: only 5%', 'Dark matter: 27% (invisible)', 'Dark energy: 68% (expansion)', 'Both remain mysterious'] }
    ],
    funFacts: ['There are more stars in the universe than grains of sand on all Earth\'s beaches.', 'Light from universe\'s edge left before Earth existed.', 'We cannot see 95% of the universe (dark matter & energy).', 'Every galaxy is receding from every other galaxy.']
  },
  blackhole: {
    title: 'BLACK HOLES',
    subtitle: 'Spacetime Singularities',
    icon: '⚫',
    stats: [
      { label: 'Escape Vel.', value: 'Speed of Light' },
      { label: 'Sgr A* Mass', value: '4M Suns' },
      { label: 'M87* Mass', value: '6.5B Suns' },
      { label: 'Hawking Radiation', value: 'Causes Evaporation' }
    ],
    overview: 'Black holes are regions where gravity is so extreme that nothing escapes. They form from collapsed stars or primordial fluctuations.',
    sections: [
      { title: 'Anatomy', facts: ['Singularity at center', 'Event horizon: point of no return', 'Photon sphere: light orbit', 'Ergosphere: space-dragging zone'] },
      { title: 'Types', facts: ['Stellar: 5-100 solar masses', 'Intermediate: 100k solar masses', 'Supermassive: in galaxy centers', 'Primordial: hypothetical early universe'] }
    ],
    funFacts: ['Outside observers see you slow down at event horizon.', 'M87* black hole could fit entire Solar System inside.', 'Merging black holes create gravitational waves.', 'Hawking radiation means black holes eventually evaporate.']
  },
  nebula: {
    title: 'NEBULAE',
    subtitle: 'Star Nurseries',
    icon: '🌈',
    stats: [
      { label: 'Orion Nebula', value: '1,344 LY Away' },
      { label: 'Type', value: 'Emission & Reflection' },
      { label: 'Composition', value: 'Gas & Dust' },
      { label: 'Temperature', value: '10K – 10,000K' }
    ],
    overview: 'Nebulae are vast clouds of gas and dust where stars are born. They come in emission, reflection, dark, and planetary types.',
    sections: [
      { title: 'Types', facts: ['Emission: ionized glowing gas', 'Reflection: scattered starlight', 'Dark: dense blocking clouds', 'Planetary: expanding gas shells'] },
      { title: 'Star Formation', facts: ['Gravity collapses dense pockets', 'Protostars heat to 10M °C', 'Fusion ignites, stars form', 'Ionized gas glows brilliantly'] }
    ],
    funFacts: ['Orion Nebula has 700+ stars in various formation stages.', 'Pillars of Creation are 6,500 light-years away and 4-5 light-years tall.', 'Carina Nebula is birthing thousands of stars.', 'Nebulae contain atoms that become planets and life.']
  }
};

// Build search index from data
const SEARCH_INDEX = [];

function buildSearchIndex() {
  const colors = {
    galaxy: '#FFD700',
    solar: '#FFDD44',
    universe: '#4488FF',
    blackhole: '#FF2D78',
    nebula: '#AA44FF',
    moons: '#AAAAAA'
  };

  Object.entries(DATA).forEach(([k, v]) => {
    SEARCH_INDEX.push({ label: v.title, sub: v.subtitle, view: k, dot: colors[k] });
  });

  PLANETS.forEach(p => {
    SEARCH_INDEX.push({ label: p.name, sub: 'Planet', view: 'solar', planet: p.name, dot: p.dot });
  });

  MOONS_DATA.forEach(m => {
    SEARCH_INDEX.push({ label: m.name, sub: `Moon of ${m.parent}`, view: 'moons', moon: m.name, dot: '#AAAAAA' });
  });

  DWARF_PLANETS.forEach(d => {
    SEARCH_INDEX.push({ label: d.name, sub: 'Dwarf Planet', view: 'solar', dwarf: d.name, dot: d.color });
  });
}

// Call on load
buildSearchIndex();
