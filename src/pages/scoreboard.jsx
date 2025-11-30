import React, {useEffect, useState} from 'react';

export function Scoreboard() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:4000/ws/scoreboard");


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
      <h2 style={{textAlign: "center"}}>Top Scores</h2>
      {/* <div
  id="live-chart"
  style={{
    border: "1px dashed rgb(135, 83, 148)",
    padding: "1rem",
    marginTop: "1rem",
    display: "flex",
    justifyContent: "center",
    width: "50%"
  }}
> */}
  {scores.length === 0 ? (
    <p>No scores yet</p>
  ) : (
    <table style={{ width: "100%", borderCollapse: "collapse", margin: "0 auto", width: "50%" }}>
      <thead>
        <tr>
          <th style={{ textAlign: "center", padding: "6px" }}>User</th>
          <th style={{ textAlign: "center", padding: "6px" }}>Score</th>
        </tr>
      </thead>

      <tbody>
        {scores.map((player, index) => (
          <tr key={index}>
            <td style={{ padding: "6px", borderBottom: "1px dotted #875394" }}>
              {player.username}
            </td>
            <td style={{ padding: "6px", borderBottom: "1px dotted #875394" }}>
              {player.score}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
{/* </div> */}

    </main>
  );
}