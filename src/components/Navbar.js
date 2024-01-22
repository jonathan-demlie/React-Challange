import React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const navbarStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px",
};

const linkStyle = {
  textDecoration: "none",
  color: "#fff",
  backgroundColor: "#525252",
  padding: "10px 20px",
  borderRadius: "5px",
  cursor: "pointer",
  marginRight: "10px",
};

const centerHeadingStyle = {
  marginLeft: "625px",
  flex: "1", // Allow it to take up the remaining space
};

function Navbar() {
  const location = useLocation();
  const [currentPage, setCurrentPage] = React.useState(location.pathname);
  const [candidateCount, setCandidateCount] = useState(0);

  useLocation().pathname !== currentPage && setCurrentPage(location.pathname);

  useEffect(() => {
    const storedCandidates = localStorage.getItem("candidates");
    if (storedCandidates) {
      try {
        const parsedCandidates = JSON.parse(storedCandidates);
        setCandidateCount(parsedCandidates.length);
      } catch (error) {
        console.error("Error parsing candidates from localStorage:", error);
      }
    }
  }, [currentPage]);

  return (
    <div style={navbarStyle}>
      <div style={centerHeadingStyle}>
        <h1 className="header-title" data-testid="header-title">
          Job Portal
        </h1>
      </div>
      <div>
        <Link to="/" style={linkStyle}>
          Home
        </Link>
        {currentPage === "/candidate/registration" ? (
          <Link to="/candidate/list" style={linkStyle}>
            Candidate List {candidateCount}
          </Link>
        ) : (
          <Link to="/candidate/registration" style={linkStyle}>
            Candidate Registration
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
