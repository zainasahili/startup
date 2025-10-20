import React, {useState} from 'react';
import {ComposableMap, Geographies, Geography} from 'react-simple-maps';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";


export function Map() {

  const [hoveredCountry, setHoveredCountry] = useState('');

  return (
    <main>
      <p>Hover over a country to see its name. Click functionality coming soon!</p>
      <ComposableMap>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onMouseEnter={() => {
                  const { NAME } = geo.properties;
                  setHoveredCountry(NAME);
                }}
                onMouseLeave={() => {
                  setHoveredCountry('');
                }}
                onClick={() => {
                  alert(`You clicked on ${geo.properties.NAME}. API link coming soon!`);
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