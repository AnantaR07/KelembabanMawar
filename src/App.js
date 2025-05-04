import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomepageMawar from "./HomepageMawar";
import Profile from "./Profile";
import Contact from "./Contact";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomepageMawar />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
