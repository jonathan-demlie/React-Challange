import React, { useState, useEffect } from "react";

const searchContainerStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "50vh",
  textAlign: "center",
};

const profileCardStyles = {
  backgroundColor: "#f0f0f0",
  padding: "10px",
  maxWidth: "600px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  marginBottom: "10px",
};

const searchBoxContainerStyles = {
  display: "flex",
  alignItems: "center",
  marginBottom: "10px",
};

const skillsStyles = {
  backgroundColor: "#333",
  color: "white",
  borderRadius: "5px",
  padding: "5px 10px",
  margin: "5px",
};

const searchBoxStyles = {
  flex: "1",
  padding: "10px",
  fontSize: "14px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  marginRight: "10px",
};

const buttonStyles = {
  padding: "10px 20px",
  borderRadius: "5px",
  cursor: "pointer",
  marginRight: "10px",
};

const searchButtonStyles = {
  ...buttonStyles,
  backgroundColor: "#525252",
  color: "white",
  border: "none",
};

const listAllButtonStyles = {
  ...buttonStyles,
  backgroundColor: "#525252",
  color: "white",
  border: "none",
};


function CandidateList() {
  const [searchText, setSearchText] = useState("");
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false); // New state variable

  useEffect(() => {
    const storedCandidates = localStorage.getItem("candidates");
    if (storedCandidates) {
      setCandidates(JSON.parse(storedCandidates));
    }
  }, []);

  const handleSearch = () => {
    const filtered = candidates.filter(candidate =>
      candidate.skills.some(skill =>
        skill.toLowerCase().includes(searchText.toLowerCase())
      )
    );
    setFilteredCandidates(filtered);
    setSearchPerformed(true);
  };

  const handleListAll = () => {
    setSearchText("");
    setFilteredCandidates(candidates);
    setSearchPerformed(false);
  };

  useEffect(() => {
    if (searchText === "") {
      setFilteredCandidates([]);
      setSearchPerformed(false);
    }
  }, [searchText]);

  return (
    <div style={{ ...searchContainerStyles, alignItems: "center" }}>
      <div style={searchBoxContainerStyles}>
        <input
          type="text"
          placeholder="search skills"
          value={searchText}
          style={searchBoxStyles}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button style={searchButtonStyles} onClick={handleSearch}>
          Search
        </button>
        <button data-testid="candidate-card" style={listAllButtonStyles} onClick={handleListAll}>
          List All
        </button>
      </div>
      {searchPerformed && filteredCandidates.length === 0 ? (
        <p>No candidates found</p>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",
          }}
        >
          {/* Render candidate profiles */}
        </div>
      )}
    </div>
  );
}

export default CandidateList;