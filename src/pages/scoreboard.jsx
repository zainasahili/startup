import React, {useEffect, useState} from 'react';
import { WebSocket } from 'ws';

export function Scoreboard() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("wss://cultureconnect.click/ws/scoreboard");

    ws.onopen = () => {
      console.log("Connected to websocket scoreboard");
    };

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);

      if (msg.type === "scoreboard_init" || msg.type === "scoreboard_update") {
        setScores(msg.scores);
      }
    };

    ws.onerror = (err) => console.error("WebSocket Error:", err);

    return () => ws.close();
  }, []);

  // const updateScores = () => {
  //   const updated = scores.map((player) => ({
  //     name: player.name,
  //     score: player.score + Math.floor(Math.random() * 10) - 3
  //   }));
  //   updated.sort((a, b) => b.score - a.score);
  //   setScores(updated);
  // };

  return (
    <main>
      <h2>Top Scores</h2>
        <ul id="score-list">
          {scores.length === 0 && <li> No scores yet</li>}

          {scores.map((player, index) => (
            <li key={index}>
              {index + 1}. <strong>{player.name}</strong> — {player.score}
            </li>
          ))} 
        </ul>
      {/* <button onClick={updateScores} style={{ margin: '1px 0', padding: '5px 10px', width:'200px'}}>
        Refresh Score
      </button> */}
      <div
        id="live-chart"
        style={{
          border: '1px dashed rgb(135, 83, 148)',
          padding: '1rem',
          marginTop: '1rem',
        }}
      >
      </div>
    </main>
  );
}