import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'app.css';
import Login from "./pages/login";
import Map from "./pages/map";
import Quiz from "./pages/quiz";
import Scoreboard from "./pages/scoreboard";

function App() {
  return (
    <>
      <Header />
      <main className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<Map />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/scoreboard" element={<Scoreboard />} />
          <Route path="/about" element={<Login />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
