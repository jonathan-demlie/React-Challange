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

  const [isDisabled, setIsDisabled] = useState(true);
  const [isDisabledSubmit, setIsDisabledSubmit] = useState(true);
  const [registrationStatus, setRegistrationStatus] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [highlightInput, setHighlightInput] = useState(false);

  //handling skill
  const handleSkillChange = (e) => {
    setFormData({
      ...formData,
      skill: e.target.value,
    });
  };

  const handleAddSkill = () => {
    const { skill, skills } = formData;

    if (skill.trim() !== "") {
      setFormData({
        ...formData,
        skill: "",
        skills: [...skills, skill.trim().toLowerCase()],
      });
    }
    if (skills.length === 4)
      setRegistrationStatus("you can add only maximum of 5 skills.");
  };

  //check the email already exit
  const isEmailExit = (email) => {
    return candidates.some((candidate) => candidate.email === email);
  };

  //validate the form
  const isFormValid = () => {
    const { name, email, role, skills } = formData;
    return (
      /^[a-zA-Z0-9\s]+$/.test(name) &&
      /^[a-zA-Z0-9\s]+$/.test(role) &&
      /\S+@\S+\.\S+/.test(email) &&
      Array.isArray(skills) &&
      skills.length > 0
    );
  };
  //resate the form
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      role: "",
      skill: "",
      skills: [],
    });
    setIsDisabled(true);
    setIsDisabledSubmit(true);
    setHighlightInput(false);
  };

  //disable enable submit button
  useEffect(() => {
    if (isFormValid(formData) && !isDisabled) {
      setIsDisabledSubmit(false);
    } else {
      setIsDisabledSubmit(true);
    }
  }, [formData, isDisabled]);

  //disable enable add skill button
  useEffect(() => {
    if (
      (formData.skill || formData.skills.length > 0) &&
      formData.skills.length < 5
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [formData.skill, formData.skills.length]);

  // handeling submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { email } = formData;

    if (isFormValid(formData)) {
      if (!isEmailExit(email)) {
        setCandidates((prevCandidates) => [...prevCandidates, formData]);
        candidates.push(formData);
        setRegistrationStatus("Candidate profile created");
      } else {
        setHighlightInput(true);
        setRegistrationStatus("Email already exists");
      }
    }
    resetForm();
  };

  useEffect(() => {
    const storedCandidates = localStorage.getItem("candidates");
    if (storedCandidates) {
      // Hint: Implement this
      setCandidates(JSON.parse(storedCandidates));
    }
  }, []);

  // useEffect(() => {
  //   localStorage.setItem("candidates", JSON.stringify(candidates));
  // }, [candidates]);

  useEffect(() => {
    // Save candidates to localStorage whenever candidates state changes
    const initialCandidates = JSON.parse(localStorage.getItem("candidates"));
    if (
      !initialCandidates ||
      initialCandidates.length !== candidates.length ||
      !initialCandidates.every((c, i) => c.id === candidates[i].id)
    ) {
      localStorage.setItem("candidates", JSON.stringify(candidates));
    }
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
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
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
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Email"
                data-testid="form-input-email"
                required
                style={{
                  ...inputStyle,
                  ...(highlightInput ? highlight : {}),
                }}
              />
            </div>
            <div className="form-group" style={formGroupStyle}>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                placeholder="Role"
                required
                data-testid="form-input-role"
                style={inputStyle}
              />
            </div>
            <div className="form-group" style={formGroupStyle}>
              <input
                data-testid="form-input-skill"
                type="text"
                name="skill"
                value={formData.skill}
                onChange={handleSkillChange}
                placeholder="Skill"
                style={inputStyle}
              />
              <button
                type="button"
                data-testid="add-btn"
                style={addSkillButtonStyle}
                onClick={handleAddSkill}
                disabled={isDisabled}
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
                disabled={isDisabledSubmit}
              >
                Register
              </button>
              <button
                data-testid="reset-btn"
                style={sharpEdgeButtonStyle}
                onClick={resetForm}
              >
                Reset
              </button>
            </div>
          </form>
          {registrationStatus}
        </div>
      </div>
    </div>
  );
}

export default CandidateRegistration;
