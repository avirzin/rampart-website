# Rampart Website - Remittance Globe Visualization

Interactive 3D globe visualization showing remittance inflows (money received) by country using World Bank KNOMAD data.

## Features

- **3D Interactive Globe**: Rotate, zoom, and explore remittance data on a beautiful 3D globe
- **Year Selection**: View data from 2000-2023 with a year selector
- **Color-Coded Visualization**: Countries are color-coded and sized based on remittance amounts
- **Interactive Tooltips**: Hover over countries to see detailed information
- **Click to Focus**: Click on any country to focus the camera on it

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Data Source

The visualization uses data from the World Bank's KNOMAD (Global Knowledge Partnership on Migration and Development) database, specifically remittance inflow data (`WB_KNOMAD_MRI` indicator).

## Technology Stack

- **React** - UI framework
- **react-globe.gl** - 3D globe visualization
- **Vite** - Build tool and dev server
- **PapaParse** - CSV parsing
- **Three.js** - 3D graphics (via react-globe.gl)

## Project Structure

```
rampart-website/
├── data/
│   └── WB_KNOMAD.csv          # Remittance data
├── public/
│   └── data/
│       └── WB_KNOMAD.csv      # Served CSV file
├── src/
│   ├── components/
│   │   ├── RemittanceGlobe.jsx
│   │   └── RemittanceGlobe.css
│   ├── utils/
│   │   ├── processRemittanceData.js
│   │   └── countryCoordinates.js
│   ├── styles/
│   │   ├── App.css
│   │   └── index.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```
