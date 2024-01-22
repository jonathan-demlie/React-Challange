import React, { useState, useEffect } from "react";

const alertMessage = {
  marginTop: "5px",
};

const highlight = {
  border: "2px solid red",
  backgroundColor: "red",
};
const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  boxSizing: "border-box",
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
    nameError: "",
    roleError: "",
    emailError: "",
    skillsError: "",
  });

  const [registrationStatus, setRegistrationStatus] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const highlightInput = true;
  const [existingEmails, setExistingEmails] = useState([]);

  useEffect(() => {
    const existingEmailsString = document.cookie
      .split("; ")
      .find((row) => row.startsWith("existingEmails="));

    if (existingEmailsString) {
      const existingEmails = existingEmailsString.split("=")[1].split(",");
      setExistingEmails(existingEmails);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      [`${name}Error`]: "",
    });
  };

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

  const disableAddSkillButton = formData.skills.length >= 5;

  useEffect(() => {
    const storedCandidates = localStorage.getItem("candidates");
    if (storedCandidates) {
      setCandidates(JSON.parse(storedCandidates));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("candidates", JSON.stringify(candidates));
  }, [candidates]);

  const validateForm = () => {
    const { name, role, email, skills } = formData;

    const namePattern = /^[a-zA-Z0-9\s]+$/;
    const rolePattern = /^[a-zA-Z0-9\s]+$/;
    const emailPattern = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

    let nameError = !name.match(namePattern) ? "Name is not valid" : "";
    let roleError = !role.match(rolePattern) ? "Role is not valid" : "";
    let emailError = !email.match(emailPattern) ? "Email is not valid" : "";
    let skillsError =
      skills.length === 0 || skills.length > 5
        ? "Skills should be between 1 and 5"
        : "";

    setFormData({
      ...formData,
      nameError,
      roleError,
      emailError,
      skillsError,
    });

    return !nameError && !roleError && !emailError && !skillsError;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      const emailExists = existingEmails.includes(formData.email);

      if (emailExists) {
        setFormData({
          ...formData,
          emailError: "Email already exists",
        });
        setRegistrationStatus(false);
      } else {
        const newCandidate = {
          name: formData.name,
          email: formData.email,
          role: formData.role,
          skills: formData.skills,
        };

        setCandidates([...candidates, newCandidate]);
        const updatedEmails = [...existingEmails, formData.email];
        document.cookie = `existingEmails=${updatedEmails.join(",")}`;

        setExistingEmails(updatedEmails);
        setRegistrationStatus(true);
        setFormData({
          name: "",
          email: "",
          role: "",
          skill: "",
          skills: [],
          nameError: "",
          roleError: "",
          emailError: "",
          skillsError: "",
        });
      }
    } else {
      setRegistrationStatus(false);
    }
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
                value={formData.name}
                onChange={handleInputChange}
                data-testid="form-input-name"
              />
            </div>
            <div className="form-group" style={formGroupStyle}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                data-testid="form-input-name"
                value={formData.email}
                onChange={handleInputChange}
                required
                style={{
                  ...inputStyle,
                  ...(highlightInput && formData.emailError
                    ? { ...highlight, backgroundColor: "red" }
                    : {}),
                }}
              />
            </div>
            <div className="form-group" style={formGroupStyle}>
              <input
                type="text"
                name="role"
                placeholder="Role"
                required
                style={inputStyle}
                value={formData.role}
                onChange={handleInputChange}
              />
            </div>
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
                disabled={disableAddSkillButton}
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
              >
                Register
              </button>
              <button
                data-testid="reset-btn"
                style={sharpEdgeButtonStyle}
                onClick={() => {
                  setFormData({
                    name: "",
                    email: "",
                    role: "",
                    skill: "",
                    skills: [],
                  });
                  setRegistrationStatus(false);
                }}
              >
                Reset
              </button>
            </div>

            {formData.emailError && (
              <div style={alertMessage}>{formData.emailError}</div>
            )}
            {registrationStatus && (
              <div style={alertMessage}>Candidate profile created</div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default CandidateRegistration;
