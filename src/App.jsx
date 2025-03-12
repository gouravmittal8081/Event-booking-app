import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EventDetails from "./components/EventDetails";
import "./app.css";
const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/event/:id" element={<EventDetails />} />
      </Routes>
  );
};

export default App;
