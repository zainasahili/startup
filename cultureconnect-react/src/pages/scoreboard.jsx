import React from 'react';

export function Scoreboard() {
  return (
    <main className="container-fluid bg-secondary text-center">
      <p> This page will show top live scores of all users. Below is a static placeholder and a spot for a live chart.</p>
        <ul id="score-list">
            <li>Alice — Japan — 85</li>
            <li>Bob — Morocco — 72</li>
            <li>Carla — Brazil — 90</li>
        </ul>
        <div id="live-chart" style={{border: "1px dashed rgb(135, 83, 148)", padding: "1rem", marginTop: "1rem"}}>
          WebSocket chart will be embedded here
        </div>
    </main>
  );
}