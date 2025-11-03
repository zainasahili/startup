import React, {useState} from 'react';
import {ComposableMap, Geographies, Geography} from 'react-simple-maps';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";


export function Map() {

  const [hoveredCountry, setHoveredCountry] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [countryInfo, setCountryInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchCountry = async (name) => {
    try{
      setLoading(true);
      setError('');
      setCountryInfo(null);

      const response = await fetch(`/api/info/${name}`);
      if (!response.ok) throw new Error('Failed to fetch country info');

      const data = await response.json();

      const normalizedData = {
        languages: data.languages || data.cultural_info?.languages || data.cultural_information?.languages || [],
        greetings: data.greetings || data.cultural_info?.greetings || data.cultural_information?.greetings || [],
        values: data.values || data.cultural_info?.values || data.cultural_information?.values || [],
        traditions: data.traditions || data.cultural_info?.traditions || data.cultural_information?.traditions || [],
        taboos: data.taboos || data.cultural_info?.taboos || data.cultural_information?.taboos || [],
        history: data.history || data.cultural_info?.history || data.cultural_information?.history || [],
      };

      console.log(normalizedData);
      setCountryInfo(normalizedData);
     } catch (err) {
      setError('Could not load country info.');
      } finally {
        setLoading(false);
    }
    
    }

  return (
    <main>

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
                  const countryName = geo.properties.name;
                  setSelectedCountry(countryName);
                  fetchCountry(countryName);
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
            <h3>{selectedCountry}</h3>
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
}
