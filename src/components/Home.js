import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const homeStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "30vh",
  textAlign: "center",
};

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
  width: "500px",
  margin: "20px",
};

const buttonStyle = {
  textDecoration: "none",
  color: "#fff",
  backgroundColor: "#525252",
  padding: "10px 20px",
  borderRadius: "5px",
  cursor: "pointer",
  marginRight: "10px",
};

function Home() {
  const [candidatesCount, setCandidatesCount] = useState(0);

  useEffect(() => {
    const storedCandidates = localStorage.getItem("candidates");
    if (storedCandidates) {
      const parsedCandidates = JSON.parse(storedCandidates);
      setCandidatesCount(parsedCandidates.length);
    }
  }, []);

  return (
    <div data-testid="home-component" style={homeStyle}>
      <div style={buttonContainerStyle}>
        <Link to="/candidate/registration" style={{ textDecoration: "none" }}>
          <button data-testid="register-button" style={buttonStyle}>
            Register Candidate
          </button>
        </Link>
        <Link to="/candidate/list" style={{ textDecoration: "none" }}>
          <button data-testid="list-button" style={buttonStyle}>
            List Candidates ({candidatesCount})
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
