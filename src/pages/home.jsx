import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export function Home() {

    const [scores] = useState([
        { user: 'Zach', score: 85, date: '2025-08-20' },
        { user: 'Rachel',score: 72, date: '2025-09-18' },
    ]);

  return (
    <main>
      <section id="overview">
        <h2>App overview</h2>
        <p>CultureConnect helps users learn and test cultural knowledge around the world — greetings, taboos, traditions, and more</p>
    </section>
    <section id="placeholders">
        <ul>
          <li><Link to="/map">Interactive Map</Link></li>
          <li><Link to="/quiz">Daily Quiz</Link></li>
          <li><Link to="/scoreboard">Scoreboard</Link></li>
          <li><Link to="/login">Login/Register</Link></li>
        </ul>
    </section>
    <section id="third party/APIs">
        <ul>
            <li>Country data API - fetch cultural facts, greetings, and traditions for each country</li>
            <li>Auth service — handle register/login securely</li>
            <li>Realtime WebSocket endpoint for scoreboard updates</li>
        </ul>
    </section>
    <section id="DataBase placeholder">
        <h1>DataBase placeholder</h1>
        <table border="1" id="db-table">
            <thead><tr><th>User</th><th>Score</th><th>Date</th></tr></thead>
            <tbody>
                {scores.map((entry, index) => (
                    <tr key={index}>
                        <td>{entry.user}</td>
                        <td>{entry.score}</td>
                        <td>{entry.date}</td>
                    </tr>     
            ))}
            </tbody>
        </table>
    </section>
    </main>
  );
}