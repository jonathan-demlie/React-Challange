import React, { useState, useEffect } from "react";

// Base styles for the component
const alertMessage = {
  marginTop: "5px",
};

const highlight = {
  border: "2px solid red",
  backgroundColor: "red",
};

const centerContainerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "50vh",
  textAlign: "center",
};

const addSkillButtonStyle = {
  backgroundColor: "#525252",
  border: "1px solid #333",
  color: "white",
  borderRadius: "5px",
  marginLeft: "10px",
  cursor: "pointer",
};

const formBoxStyle = {
  border: "1px solid #ccc",
  padding: "20px",
  backgroundColor: "#f5f5f5",
};

const formGroupStyle = {
  marginBottom: "10px",
  display: "flex",
  alignItems: "center",
};

const sharpEdgeButtonStyle = {
  backgroundColor: "#525252",
  border: "1px solid #333",
  padding: "10px 20px",
  color: "white",
  borderRadius: "5px",
  cursor: "pointer",
  marginTop: "10px",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  boxSizing: "border-box",
};

const skillTagStyle = {
  backgroundColor: "#333",
  color: "white",
  borderRadius: "0",
  padding: "5px 10px",
  margin: "0 5px",
};

const buttonGroupStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "10px",
};

function CandidateRegistration() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    skill: "",
    skills: [],
  });

  const [registrationStatus, setRegistrationStatus] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [highlightInput, setHighlightInput] = useState(false);

  const handleSkillChange = (e) => {
    setFormData({
      ...formData,
      skill: e.target.value,
    });
  };

  const handleAddSkill = () => {
    if (formData.skill && formData.skills.length < 5) {
      setFormData((prevData) => ({
        ...prevData,
        skills: [...prevData.skills, formData.skill],
        skill: "",
      }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (formData.name && formData.role && formData.email) {
      if (candidates.some((candidate) => candidate.email === formData.email)) {
        setRegistrationStatus("Email already exists");
        setHighlightInput(true);
      } else {
        setRegistrationStatus("Candidate profile created");
        setHighlightInput(false);
        setCandidates([...candidates, formData]);
        localStorage.setItem(
          "candidates",
          JSON.stringify([...candidates, formData])
        );
      }
    }
  };

  useEffect(() => {
    const storedCandidates = localStorage.getItem("candidates");
    if (storedCandidates) {
      try {
        const parsedCandidates = JSON.parse(storedCandidates);
        setCandidates(parsedCandidates);
      } catch (error) {
        console.error("Error parsing candidates from localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("candidates", JSON.stringify(candidates));
  }, [candidates]);

  return (
    <div style={centerContainerStyle}>
      <div style={formBoxStyle}>
        <div data-testid="registration-component" style={formBoxStyle}>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group" style={formGroupStyle}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Name"
                required
                style={inputStyle}
                data-testid="form-input-name"
              />
            </div>
            <div className="form-group" style={formGroupStyle}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Email"
                data-testid="form-input-email"
                required
                style={{ ...inputStyle, ...(highlightInput ? highlight : {}) }}
              />
            </div>
            <div className="form-group" style={formGroupStyle}>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                data-testid="form-input-role"
                placeholder="Role"
                required
                style={inputStyle}
              />
            </div>
            <div className="form-group" style={formGroupStyle}>
              <input
                data-testid="form-input-skill"
                type="text"
                name="skill"
                value={formData.skill}
                onChange={(e) => setFormData({ ...formData, skill: e.target.value })}
                placeholder="Skill"
                style={inputStyle}
              />
              <button
                type="button"
                data-testid="add-btn"
                style={addSkillButtonStyle}
                disabled={formData.skills.length >= 5}
                onClick={handleAddSkill}
              >
                Add Skill
              </button>
            </div>
            <div>
              {formData.skills.map((skill, index) => (
                <span key={index} data-testid="skill-tag" style={skillTagStyle}>
                  {skill}
                </span>
              ))}
            </div>
            <div style={buttonGroupStyle}>
                <button
                  data-testid="submit-btn"
                  type="submit"
                  style={sharpEdgeButtonStyle}
                  disabled={
                    !formData.name ||
                    !formData.role ||
                    !formData.email ||
                    formData.skills.length > 0
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    handleFormSubmit(e);
                    window.location.href = "/candidate/list";
                  }}
                >
                  Register
                </button>

              <button
                data-testid="reset-btn"
                type="reset"
                style={sharpEdgeButtonStyle}
                onClick={() => {
                  setFormData({
                    name: "",
                    email: "",
                    role: "",
                    skill: "",
                    skills: [],
                  });
                  setRegistrationStatus(null);
                  setHighlightInput(false);
                }}
              >
                Reset
              </button>
            </div>
          </form>
          {registrationStatus && (
            <div
              style={{
                ...alertMessage,
                color: registrationStatus.includes("exists") ? "red" : "green",
              }}
            >
              {registrationStatus}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CandidateRegistration;
