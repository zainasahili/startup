import React, {userState} from 'react';

export function Scoreboard() {
  const [scores, setScores] = useState([
    { name: 'Alice', country: 'Japan', score: 85 },
    { name: 'Bob', country: 'Morocco', score: 72 },
    { name: 'Carla', country: 'Brazil', score: 90 },
  ]);

  const updateScores = () => {
    const updated = scores.map((player) => ({
      ...player,
      score: player.score + Math.floor(Math.random() * 10) - 3, // random small change
    }));
    updated.sort((a, b) => b.score - a.score);
    setScores(updated);
  };
  return (
    <main>
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