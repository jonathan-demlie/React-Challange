import React, { useState, useEffect } from "react";

// CandidateList Styles for Job portal
const searchContainerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "50vh",
  textAlign: "center",
};

const profileCardStyle = {
  backgroundColor: "#f0f0f0",
  padding: "10px",
  maxWidth: "600px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  marginBottom: "10px",
};

const searchBoxContainerStyle = {
  display: "flex",
  alignItems: "center",
  marginBottom: "10px",
};

const skillsStyle = {
  backgroundColor: "#333",
  color: "white",
  borderRadius: "5px",
  padding: "5px 10px",
  margin: "5px",
};

const searchBoxStyle = {
  flex: "1",
  padding: "10px",
  fontSize: "14px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  marginRight: "10px",
};

const buttonStyle = {
  padding: "10px 20px",
  borderRadius: "5px",
  cursor: "pointer",
  marginRight: "10px",
};

const searchButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#525252",
  color: "white",
  border: "none",
};

const listAllButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#525252",
  color: "white",
  border: "none",
};
//  Function Candidate list for job portal 
function CandidateList() {
  const [searchText, setSearchText] = useState("");
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const storedCandidates = localStorage.getItem("candidates");
    if (storedCandidates) {
      const parsedCandidates = JSON.parse(storedCandidates);
      setCandidates(parsedCandidates);
      setFilteredCandidates(parsedCandidates);
    }
  }, []);

     // Arrow Functions for More Functionalities 
  const handleSearch = () => {
    const filtered = candidates.filter(candidate =>
      candidate.skills.includes(searchText)
    );
    setFilteredCandidates(filtered);
  };

  const handleListAll = () => {
    setFilteredCandidates(candidates);
  };

  return (
    <div style={{ ...searchContainerStyle, alignItems: "center" }}>
      <div style={searchBoxContainerStyle}>
        <input
          data-testid="search-input"
          type="text"
          placeholder="search skills"
          value={searchText}
          style={searchBoxStyle}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button style={searchButtonStyle} onClick={handleSearch} >
          Search
        </button>
        <button style={listAllButtonStyle} onClick={handleListAll} data-testid="search-all">
          All
        </button>
      </div>
      <p data-testid="profiles-found-tag">{`${filteredCandidates.length} profiles found`}</p>
      {filteredCandidates.length === 0 ? (
        <p>No candidates found.</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-start" }}>
          {filteredCandidates.map((candidate, index) => (
            <div
              key={index}
              style={{ ...profileCardStyle, textAlign: "left", marginRight: "10px" }}
              data-testid="profile-card"
            >
              <h2 style={{ marginBottom: "10px" }}>Role: {candidate.role}</h2>
              <p>Name: {candidate.name}</p>
              <p>Email: {candidate.email}</p>
              <div>
                <p style={{ fontWeight: "bold" }}>Skills</p>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {candidate.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} style={skillsStyle}>
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


export default CandidateList;
