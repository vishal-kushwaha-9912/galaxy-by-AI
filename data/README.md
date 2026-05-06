# Data Organization Guide

This directory is reserved for storing additional data files and external datasets.

## Current Data Location

All astronomical data is currently stored in:
- **`js/data.js`** - Central data file with planets, moons, facts, and information

## Data Structures

### Constants in `js/data.js`

**PLANETS**
```javascript
const PLANETS = [
  {
    name: 'Mercury',
    color: 0x9E9E9E,      // Hex color
    size: 0.18,           // Relative size
    dist: 3.5,            // Orbital distance
    speed: 0.04,          // Orbital speed
    dot: '#9E9E9E',       // UI indicator color
    emoji: '☿',           // Display emoji
    moons: 0              // Moon count
  },
  // ... more planets
];
```

**MOONS_DATA**
```javascript
const MOONS_DATA = [
  {
    name: 'Moon',
    parent: 'Earth',      // Parent body
    color: 0xAAAAAA,      // Hex color
    size: 0.08,           // Relative size
    orbit: 0.55,          // Orbital radius
    emoji: '🌙',          // Display emoji
    facts: [              // Array of facts
      'Earth\'s only natural satellite',
      '4.5 billion years old',
      // ...
    ]
  },
  // ... more moons
];
```

**DATA (General Information)**
```javascript
const DATA = {
  galaxy: {
    title: 'MILKY WAY',
    subtitle: 'Barred Spiral Galaxy',
    icon: '🌌',
    stats: [
      { label: 'Diameter', value: '105,700 LY' },
      // ...
    ],
    overview: 'Description...',
    sections: [
      {
        title: 'Structure',
        facts: ['Fact 1', 'Fact 2', ...]
      }
    ],
    funFacts: ['Fun fact 1', 'Fun fact 2', ...]
  },
  // ... more views
};
```

## Adding New Data

### 1. Add New Planet
```javascript
// In js/data.js, add to PLANETS array
{
  name: 'YourPlanet',
  color: 0xRRGGBB,        // RGB hex value
  size: 0.5,              // Relative size (Earth = 0.32)
  dist: 30.0,             // Orbital distance
  speed: 0.001,           // Orbital speed
  dot: '#RRGGBB',         // UI color (must match)
  emoji: '🪐',            // Choose appropriate emoji
  moons: 5                // Number of moons
}
```

### 2. Add New Moon
```javascript
// In js/data.js, add to MOONS_DATA array
{
  name: 'YourMoon',
  parent: 'ParentPlanet',
  color: 0xRRGGBB,
  size: 0.1,
  orbit: 0.5,
  emoji: '🌙',
  facts: [
    'Fact about your moon',
    'Another interesting fact',
    // ... more facts
  ]
}
```

### 3. Add New View Information
```javascript
// In js/data.js, add to DATA object
yourView: {
  title: 'YOUR VIEW TITLE',
  subtitle: 'Subtitle here',
  icon: '🌌',
  stats: [
    { label: 'Stat Name', value: 'Value' },
    { label: 'Another Stat', value: 'Value' }
  ],
  overview: 'Brief description of this view...',
  sections: [
    {
      title: 'Section Title',
      facts: [
        'Fact 1',
        'Fact 2',
        'Fact 3'
      ]
    }
  ],
  funFacts: [
    'Fun fact 1',
    'Fun fact 2',
    'Fun fact 3',
    'Fun fact 4'
  ]
}
```

## Organizing Larger Datasets

For future expansion with large datasets:

### Option 1: JSON Files
```
data/
├── planets.json         # Planet definitions
├── moons.json          # Moon definitions
├── exoplanets.json     # Exoplanet database
└── stars.json          # Star catalog
```

Load with:
```javascript
const planets = await fetch('data/planets.json').then(r => r.json());
```

### Option 2: CSV Format
```
data/
├── celestial_objects.csv
├── observations.csv
└── catalog.csv
```

Parse with:
```javascript
const response = await fetch('data/celestial_objects.csv');
const text = await response.text();
// Parse CSV...
```

### Option 3: Database
```
data/
├── database_schema.sql
├── migrations/
└── README.md
```

## Data Quality Guidelines

✅ **Good Data**
- Accurate scientific information
- Consistent formatting
- Proper Unicode emoji
- Verified facts from NASA/ESA
- Clear descriptions

❌ **Avoid**
- Fictional information
- Inconsistent units
- Outdated data
- Unverified "facts"
- Extremely long descriptions

## Color Codes Reference

Common hex colors for space objects:

```javascript
// Stars
0xFFDD44   // Yellow dwarf (Sun)
0xFFEECC   // White star
0xFF6655   // Red giant
0xFF0000   // Red star

// Planets
0x4488FF   // Blue (Earth)
0xCC4422   // Red (Mars)
0xC88B4C   // Orange (Jupiter)
0xDDCC88   // Yellow (Saturn)

// Special
0x000000   // Black hole
0xAAAAAA   // Grey/Rocky
0x00D4FF   // Cyan glow
0xAA44FF   // Purple/Nebula
```

## Size Reference

Relative sizes for visualization:

```javascript
// Reference: Earth = 0.32
0.06      // Moon, Pluto
0.18      // Mercury
0.22      // Mars
0.32      // Earth
0.3       // Venus
0.5       // Uranus
0.65      // Saturn
0.75      // Jupiter
```

## Distance Reference

Orbital distances (scaled):

```javascript
// Simplified scale from Sun
3.5       // Mercury
5.0       // Venus
7.0       // Earth
9.0       // Mars
13.0      // Jupiter
17.0      // Saturn
21.0      // Uranus
25.0      // Neptune
40+       // Dwarf planets, Kuiper Belt
```

## Integration with Scene

The search index is automatically built from all data:

```javascript
SEARCH_INDEX.push({
  label: 'Planet Name',
  sub: 'Planet',
  view: 'solar',
  planet: 'Planet Name',
  dot: '#color'
});
```

No additional steps needed - data appears in search automatically!

## Validation

Before adding data, verify:
- [ ] Scientific accuracy
- [ ] Consistent formatting
- [ ] No missing required fields
- [ ] Proper emoji selected
- [ ] Colors appropriate
- [ ] Facts are interesting
- [ ] No typos or grammar issues
- [ ] Data source documented

## Sources

Recommended data sources:
- NASA.gov - Official space agency
- ESA.org - European Space Agency
- Stellarium - Star database
- JPL Solar System - Official NASA
- SIMBAD - Astronomy database

---

Happy adding data to the cosmos! 🌌
