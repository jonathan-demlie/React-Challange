import React, { useState, useEffect } from "react";

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

function CandidateRegistration() {
  const [registrationStatus, setRegistrationStatus] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const highlightInput = true;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    skill: "",
    skills: [],
  });
  const handleSkillChange = (e) => {
    setFormData({ ...formData, skill: e.target.value });
  };
  const handleAddSkill = () => {
    if (formData.skill && formData.skills.length < 5) {
      setFormData({
        ...formData,
        skills: [...formData.skills, formData.skill],
        skill: "",
      });
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      role: "",
      skill: "",
      skills: [],
    });
    setErrorMessage("");
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      const newCandidate = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        role: formData.role,
        skills: formData.skills,
      };
      const updatedCandidates = [...candidates, newCandidate];
      setCandidates(updatedCandidates);
      localStorage.setItem("candidates", JSON.stringify(updatedCandidates));
      setRegistrationStatus("success");
      handleReset(); // Reset the form after successful registration
    } else {
      setRegistrationStatus("failed");
      setErrorMessage("Form is not valid. Please check your input.");
    }
  };

  useEffect(() => {
    const storedCandidates = localStorage.getItem("candidates");
    if (storedCandidates) {
      setCandidates(JSON.parse(storedCandidates));
    }
  }, []);

  useEffect(() => {
    // Validation logic here
    const isValidName = /^[a-zA-Z0-9 ]+$/.test(formData.name);
    const isValidRole = /^[a-zA-Z0-9 ]+$/.test(formData.role);
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    const hasSkills = formData.skills.length > 0 && formData.skills.length <= 5;
    const isEmailUnique = !candidates.some(
      (candidate) => candidate.email === formData.email
    );

    const formIsValid =
      isValidName && isValidRole && isValidEmail && hasSkills && isEmailUnique;
    setIsFormValid(formIsValid);

    if (!isEmailUnique) {
      setErrorMessage("Email already exists");
    } else {
      setErrorMessage("");
    }
  }, [formData, candidates]);

  const enabledButtonStyle = {
    ...sharpEdgeButtonStyle,
    backgroundColor: "#4CAF50", // Green color for enabled state
  };

  const disabledButtonStyle = {
    ...sharpEdgeButtonStyle,
    backgroundColor: "#9E9E9E", // Grey color for disabled state
  };
  return (
    <div style={centerContainerStyle}>
      <div style={formBoxStyle}>
        <div data-testid="registration-component" style={formBoxStyle}>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group" style={formGroupStyle}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                required
                style={inputStyle}
                data-testid="form-input-name"
                value={formData.name} // Bind input value to formData.name
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                } // Update formData.name on change
              />
            </div>
            <div className="form-group" style={formGroupStyle}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                style={{ ...inputStyle, ...(highlightInput ? highlight : {}) }}
                data-testid="form-input-email"
                value={formData.email} // Bind input value to formData.email
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                } // Update formData.email on change
              />
            </div>
            <input
              type="text"
              name="role"
              placeholder="Role"
              required
              style={inputStyle}
              data-testid="form-input-role"
              value={formData.role} // Bind input value to formData.role
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              } // Update formData.role on change
            />
            <div className="form-group" style={formGroupStyle}>
              <input
                data-testid="form-input-skill"
                type="text"
                name="skill"
                placeholder="Skill"
                value={formData.skill}
                onChange={handleSkillChange}
                style={inputStyle}
              />
              <button
                type="button"
                data-testid="add-btn"
                style={addSkillButtonStyle}
                onClick={handleAddSkill}
                disabled={!formData.skill || formData.skills.length >= 5}
              >
                Add Skill
              </button>
            </div>
            <div>
              {formData.skills.map((skill, index) => (
                <span
                  key={index} // Add a unique key prop using the index
                  data-testid="skill-tag"
                  style={skillTagStyle}
                >
                  {skill}
                </span>
              ))}
            </div>
            <div className="form-group" style={alertMessage}>
              {errorMessage}
            </div>
            <button
              data-testid="reset-btn"
              type="button"
              style={sharpEdgeButtonStyle}
              onClick={handleReset}
            >
              Reset
            </button>
            <button
              data-testid="submit-btn"
              type="submit"
              style={isFormValid ? enabledButtonStyle : disabledButtonStyle}
              disabled={!isFormValid}
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CandidateRegistration;
//Done By Tensae Aschalew Actually Not Done but Modified yeah May be This is The right word!
//Yenetta Mern Stack Project
