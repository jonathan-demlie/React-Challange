import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const homeStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "30vh",
  textAlign: "center", // Adjusted to include textAlign: center
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
  padding: "20px 20px",
  borderRadius: "5px",
  cursor: "pointer",
  marginRight: "10px",
};

function Home() {
  // State to hold the total count of candidate profiles
  const [totalCandidates, setTotalCandidates] = useState(0);

  // Example: Fetch candidate profiles count from local storage
  useEffect(() => {
    const storedCandidates = localStorage.getItem("candidates");
    if (storedCandidates) {
      const parsedCandidates = JSON.parse(storedCandidates);
      setTotalCandidates(parsedCandidates.length);
    }
  }, []);

  return (
    <div data-testid="home-component" style={homeStyle}>
      <div style={buttonContainerStyle}>
        {/* Navigate to Candidate Registration page */}
        <Link to="/candidate/registration" style={buttonStyle} data-testid="register-btn">
          Register Candidate
        </Link>
             
        {/* Navigate to Candidate List page and display total candidate count */}
        <Link to="/candidate/list" style={buttonStyle} data-testid="list-btn">
          List Candidates ({totalCandidates})
        </Link>
      </div>
    </div>
  );
}

export default Home;
