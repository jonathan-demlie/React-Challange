import React from "react";
import { Link, useLocation } from "react-router-dom";

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
  const location = useLocation();

 const handleClick = (event) => {
   if (event.target.textContent === "Register Candidate") {
     location.pathname = "/candidate/registration";
   } else {
     location.pathname = "/candidate/list";
   }
 };
  return (
    <div data-testid="home-component" style={homeStyle}>
      <div style={buttonContainerStyle}>
        <Link to="/candidate/registration" data-testid="register-button" style={buttonStyle} onClick={handleClick}>
          Register Candidate
        </Link>
        <Link to="/candidate/list" data-testid="list-button" style={buttonStyle} onClick={handleClick}>
          List Candidates
        </Link>
      </div>
    </div>
  );
}

export default Home;
