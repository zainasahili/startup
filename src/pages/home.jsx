import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export function Home() {


  return (
    <main>
      <section id="overview">
        <h2>App overview</h2>
        <p>CultureConnect helps users learn and test cultural knowledge around the world — greetings, taboos, traditions, and more</p>
    </section>
    <section id="placeholders">
        <ul>
          <li><Link to="/map">Interactive Map</Link></li>
          <li><Link to="/quiz">Quiz</Link></li>
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
    </main>
  );
}