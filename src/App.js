import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import CandidateList from "./components/CandidateList";
import CandidateRegistration from "./components/CandidateRegistration";

function App() {
  const [candidates, setCandidates] = useState([]);

  const onCandidateRegister = (newCandidate) => {
    setCandidates([...candidates, newCandidate]);
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/candidate/registration"
          element={<CandidateRegistration onCandidateRegister={onCandidateRegister} />}
        />
        <Route path="/candidate/list" element={<CandidateList candidates={candidates} />} />
      </Routes>
    </Router>
  );
}

export default App;