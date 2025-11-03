import React, {useState} from 'react';
import {ComposableMap, Geographies, Geography} from 'react-simple-maps';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";


export function Map() {

  const [hoveredCountry, setHoveredCountry] = useState('');
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [countryInfo, setCountryInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchCountryInfo = async (name) => {
    try{
      setLoading(True);
      setError('');
      setCountryInfo(null);

      const response = await fetch(`http://localhost:4000/api/info/${encodeURIComponent(name)}`);
      if (!response.ok) throw new Error('Failed to fetch country info');

      const data = await response.json();
      setCountryInfo(data);
     } catch (err) {
      setError('Could not load country info.');
      } finally {
        setLoading(false);
    }
    
    }
  }

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
                  setTooltipPosition({ x: event.clientX, y: event.clientY + window.scrollY });
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

      <div style={{ marginTop: '1rem', padding: '1rem', border: '1px dashed #6e3972', borderRadius: '8px' }}>
       {loading && <p>Loading info...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {countryInfo && (
          <div>
            <h3>{hoveredCountry}</h3>
            <p><strong>Languages:</strong> {countryInfo.languages?.join(', ') || 'N/A'}</p>
            <p><strong>Common Greetings:</strong> {countryInfo.greetings?.join(', ') || 'N/A'}</p>
            <p><strong>Core Values:</strong> {countryInfo.values?.join(', ') || 'N/A'}</p>
            <p><strong>Traditions:</strong> {countryInfo.traditions?.join(', ') || 'N/A'}</p>
            <p><strong>Taboos:</strong> {countryInfo.taboos?.join(', ') || 'N/A'}</p>
            <p><strong>Key Historical Facts:</strong> {countryInfo.history?.join(', ') || 'N/A'}</p>
          </div>
        )}
      </div>
    </main>
  );
