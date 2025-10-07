import React from 'react';
import { BrowserRouter, NavLink,Navigate, Routes, Route } from "react-router-dom";
import {Login} from "./pages/login";
import {Map} from "./pages/map";
import {Quiz} from "./pages/quiz";
import {Scoreboard} from "./pages/scoreboard";
import {Home} from "./pages/home";
import './app.css'

export default function App() {
  return (
   <BrowserRouter>
    <div className="body bg-dark text-light">
        <header className="navbar navbar-dark bg-dark px-3">
        <h1 className="navbar-brand">CultureConnect</h1>
        <nav>
            <menu className="navbar-nav">
                <li className="nav-item">
                <NavLink className="nav-link" to="/">
                    Home
                </NavLink>
                </li>
                <li className="nav-item">
                <NavLink className="nav-link" to="map">
                    Interactive Map
                </NavLink>
                </li>
                <li className="nav-item">
                <NavLink className="nav-link" to="quiz">
                    Daily Quiz
                </NavLink>
                </li>
                <li className="nav-item">
                <NavLink className="nav-link" to="scoreboard">
                    ScoreBoard
                </NavLink>
                </li>
                <li className="nav-item">
                <NavLink className="nav-link" to="login">
                    Login / Register
                </NavLink>
                </li>
                
            </menu>
        </nav>
        </header>

        <Routes>
                  <Route path="/index.html" element={<Navigate to="/" replace />} />
                  <Route path='/' element={<Home />} />
                  <Route path='/login' element={<Login />} />
                  <Route path='/quiz' element={<Quiz />} />
                  <Route path='/scoreboard' element={<Scoreboard />} />
                  <Route path='/map' element={<Map />} />
                  <Route path='*' element={<NotFound />} />
        </Routes>

        <footer className="footer-table">
            <div className="container-fluid">
            <span className="text-reset"></span>
            <table><thead>
                <tr>
                    <th>Created by Zaina Al-Sahili</th>
                    <th><a className="text-reset" href="https://github.com/zainasahili/startup"> My GitHub Repo</a></th>
                    <th>&copy; 2025 CultureConnect</th>
                </tr>
            </thead></table>
            
            </div>
        </footer>
    </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}

