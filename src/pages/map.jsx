import React, {useState} from 'react';
import {ComposableMap, Geographies, Geography} from 'react-simple-maps';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";


export function Map() {

  const [hoveredCountry, setHoveredCountry] = useState('');
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });


  return (
    <main>
      <p>Hover over a country to see its name. Click functionality coming soon!</p>

      {hoveredCountry && (
        <div
          style={{
            position: 'absolute',
            top: tooltipPosition.y,
            left: tooltipPosition.x,
            transform: 'translate(-50%, -120%)',
            background: '#6e3972',
            color: '#fafec8',
            padding: '4px 8px',
            borderRadius: '6px',
            pointerEvents: 'none',
            fontSize: '0.8rem',
            zIndex: 10,
            whiteSpace: 'nowrap',
          }}
        >
          {hoveredCountry}
        </div>
      )}

      <ComposableMap>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onMouseEnter={() => {
                  const countryName = geo.properties.name;
                  setHoveredCountry(countryName);
                }}
                onMouseMove={(event) => {
                  setTooltipPosition({ x: event.clientX, y: event.clientY });
                }}
                onMouseLeave={() => {
                  setHoveredCountry('');
                }}
                onClick={() => {
                  alert(`You clicked on ${geo.properties.name}. API link coming soon!`);
                }}
                style={{
          
                  default: { fill: '#ac64b1', outline: '#6e3972' },
                  hover: { fill: '#fafec8', outline: 'none' },
                  pressed: { fill: '#6e3972', outline: 'none' },
                }}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
    </main>
  );
}