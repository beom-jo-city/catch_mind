import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Choice from "./components/Choice";
import Canvas from "./components/Canvas";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/choice" element={<Choice />} />
        <Route path="/canvas" element={<Canvas />} />
      </Routes>
    </Router>
  );
}

export default App;
