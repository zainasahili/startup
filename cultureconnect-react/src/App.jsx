import React from 'react';
import { BrowserRouter, NavLink, Routes, Route } from "react-router-dom";
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
                  <Route path='/login' element={<Login />} />
                  <Route path='/quiz' element={<Quiz />} />
                  <Route path='/scoreboard' element={<Scoreboard />} />
                  <Route path='/' element={<Home />} />
                  <Route path='/map' element={<Map />} />
                  <Route path='*' element={<NotFound />} />
        </Routes>

        <footer className="bg-dark text-white-50">
            <div className="container-fluid">
            <span className="text-reset"></span>
            <a className="text-reset" href="https://github.com/zainasahili/startup">
                My GitHub Repo
            </a>
            </div>
        </footer>
    </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}

