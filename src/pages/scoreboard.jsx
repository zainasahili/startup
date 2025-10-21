import React, {useState} from 'react';

export function Scoreboard() {
  const [scores, setScores] = useState([
    { name: 'Alice', score: 85 },
    { name: 'Bob', score: 72 },
    { name: 'Carla', score: 90 },
  ]);

  const updateScores = () => {
    const updated = scores.map((player) => ({
      player: player.name,
      score: player.score + Math.floor(Math.random() * 10) - 3
    }));
    updated.sort((a, b) => b.score - a.score);
    setScores(updated);
  };
  return (
    <main>
      <p> This page will show top live scores of all users. It will be connected to websocket soon!</p>
        <ul id="score-list">
          {scores.map((player, index) => (
            <li key={index}>
              {index + 1}. <strong>{player.name}</strong> — {player.score}
            </li>
          ))} 
        </ul>
      <button onClick={updateScores} style={{ margin: '1px 0', padding: '5px 10px', width:'200px'}}>
        Refresh Score
      </button>
      <div
        id="live-chart"
        style={{
          border: '1px dashed rgb(135, 83, 148)',
          padding: '1rem',
          marginTop: '1rem',
        }}
      >
        WebSocket chart will be embedded here later.
      </div>

    </main>
  );
}