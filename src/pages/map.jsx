import React from 'react';

export function Map() {
  return (
    <main>
      <p>This page will show an interactive SVG world map. For now it's a placeholder image</p>
      <img src="/worldmap.png" alt="World map" className="center-image" />
        <section>
            <h2>Map features (planned)</h2>
            <ul>
                <li>Hover for quick facts</li>
                <li>Click country to learn more</li>
            </ul>
        </section>
    </main>
  );
}