import React from 'react';

export function Home() {
  return (
    <main className="container-fluid bg-secondary text-center">
      <section id="overview">
        <h2>App overview</h2>
        <p>CultureConnect helps users learn and test cultural knowledge around the world — greetings, taboos, traditions, and more</p>
    </section>
    <section id="placeholders">
        <ul>
            <li>Maps - <a href="map.html">Interactive Map</a></li>
            <li>Quiz - <a href="quiz.html">Daily Quiz</a></li>
            <li>scoreboard - <a href="scoreboard.html">Scoreboard</a></li>
            <li>login/register - <a href="login.html">Login/Register</a></li>
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
            <thead><tr><th>User</th><th>Country</th><th>Score</th><th>Date</th></tr></thead>
            <tbody>
                <tr><td>Zach</td><td>Japan</td><td>85</td><td>2025-08-20</td></tr>
                <tr><td>Rachel</td><td>Morocco</td><td>72</td><td>2025-09-18</td></tr>
            </tbody>
        </table>
    </section>
    </main>
  );
}