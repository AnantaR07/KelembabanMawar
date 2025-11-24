import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomepageMawarPertama from "./HomepageMawarPertama";
import HomepageMawarKedua from "./HomepageMawarKedua";
import Profile from "./Profile";
import Contact from "./Contact";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomepageMawarPertama />} />
        <Route path="/tanamanmawardua" element={<HomepageMawarKedua />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
