# Pareto App

Een React applicatie om je taken te beheren en te optimaliseren voor maximale inkomsten.

## Features

- 📊 Visualiseer je taken en hun impact op je inkomen
- ⏱️ Track je tijdbesteding per categorie
- 🎯 Focus op de 20% taken die 80% van je inkomen genereren
- 🔍 Zoek en filter taken
- 📱 Responsive design voor alle apparaten

## Technologieën

- React
- TypeScript
- Material-UI
- Chart.js
- Recharts

## Installatie

1. Clone de repository:
```bash
git clone [repository-url]
cd pareto-app
```

2. Installeer dependencies:
```bash
npm install
```

3. Start de development server:
```bash
npm start
```

De app draait nu op [http://localhost:3000](http://localhost:3000)

## Gebruik

1. **Taken Toevoegen**
   - Klik op de "+" knop
   - Vul de taakgegevens in
   - Geef een impact score (1-10)
   - Geef aan of het een inkomensverhogende taak is

2. **Taken Beheren**
   - Bekijk alle taken in het overzicht
   - Zoek op titel of categorie
   - Bekijk details door op een taak te klikken
   - Bewerk of verwijder taken

3. **Analyses**
   - Bekijk je meest inkomensverhogende taken
   - Analyseer je tijdbesteding per categorie
   - Focus op taken met de hoogste impact

## Project Structuur

```
pareto-app/
├── src/
│   ├── components/     # React componenten
│   ├── types/         # TypeScript type definities
│   ├── App.tsx        # Hoofdcomponent
│   └── index.tsx      # Entry point
├── public/            # Statische bestanden
└── package.json       # Dependencies en scripts
```

## Ontwikkeling

- `npm start` - Start development server
- `npm test` - Run tests
- `npm run build` - Build voor productie
- `npm run eject` - Eject van Create React App

## Licentie

MIT
