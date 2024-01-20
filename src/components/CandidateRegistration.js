import React, { useState, useEffect } from "react"

// Base styles for the component
// const alertMessage = {
//   marginTop: "5px",
// }

const highlight = {
  border: "2px solid red",
  backgroundColor: "red",
}

const centerContainerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "50vh",
  textAlign: "center",
}

const addSkillButtonStyle = {
  backgroundColor: "#525252",
  border: "1px solid #333",
  color: "white",
  borderRadius: "5px",
  marginLeft: "10px",
  cursor: "pointer",
}

const formBoxStyle = {
  border: "1px solid #ccc",
  padding: "20px",
  backgroundColor: "#f5f5f5",
}

const formGroupStyle = {
  marginBottom: "10px",
  display: "flex",
  alignItems: "center",
}

const sharpEdgeButtonStyle = {
  backgroundColor: "#525252",
  border: "1px solid #333",
  padding: "10px 20px",
  color: "white",
  borderRadius: "5px",
  cursor: "pointer",
  marginTop: "10px",
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  boxSizing: "border-box",
}

const skillTagStyle = {
  backgroundColor: "#333",
  color: "white",
  borderRadius: "0",
  padding: "5px 10px",
  margin: "0 5px",
}

const buttonGroupStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "10px",
}

function CandidateRegistration() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    skill: "",
    skills: [],
  })
  const [buttunState, setButtonState] = useState(false)

  const [registrationStatus, setRegistrationStatus] = useState(null)
  const [candidates, setCandidates] = useState([])
  const highlightInput = true

  const handleFormdata = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
  const handleSkillChange = (e) => {
    if (formData.skills.length >= 5) {
      setButtonState(true)
    } else {
      setFormData((prev) => ({
        ...prev,
        skill: e.target.value,
      }))
    }
  }
  const handleAddSkill = () => {
    if (!formData.skill.trim()) return
    setFormData((prev) => ({
      ...prev,
      skills: [...prev.skills, prev.skill],
      skill: "",
    }))
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()

    if (candidates.some((candi) => formData.email === candi.email)) {
      setRegistrationStatus({
        status: "error",
        message: "Email already exists",
      })
      return
    }
    if (!formData.skills.length > 0) {
      setRegistrationStatus({
        status: "error",
        message: "skill must be added",
      })
      return
    }
    setCandidates((prev) => [
      ...prev,
      {
        name: formData.name,
        email: formData.email,
        role: formData.role,
        skills: formData.skills,
      },
    ])

    setFormData({
      name: "",
      email: "",
      role: "",
      skill: "",
      skills: [],
    })
    setRegistrationStatus({
      status: "success",
      message: "candidate Profile created",
    })
  }

  useEffect(() => {
    const storedCandidates = localStorage.getItem("candidates")
    if (storedCandidates) {
      // Hint: Implement this

      setCandidates(JSON.parse(storedCandidates))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("candidates", JSON.stringify(candidates))
    // Save candidates to localStorage whenever candidates state changes
  }, [candidates])

  useEffect(() => {
    let timeoutId

    if (registrationStatus) {
      timeoutId = setTimeout(() => {
        setRegistrationStatus({})
      }, 5000)
    }

    return () => clearTimeout(timeoutId)
  }, [registrationStatus])

  return (
    <div style={centerContainerStyle}>
      <div style={formBoxStyle}>
        <div data-testid="registration-component" style={formBoxStyle}>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group" style={formGroupStyle}>
              <input
                type="text"
                name="name"
                pattern="[A-Za-z0-9\s]+"
                placeholder="Name"
                value={formData.name}
                required
                onChange={handleFormdata}
                style={inputStyle}
                data-testid="form-input-name"
              />
            </div>
            <div className="form-group" style={formGroupStyle}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleFormdata}
                placeholder="Email"
                data-testid="form-input-email"
                required
                style={{ ...inputStyle, ...(highlightInput ? highlight : {}) }}
              />
            </div>
            <div className="form-group" style={formGroupStyle}>
              <input
                type="text"
                pattern="[A-Za-z0-9\s]+"
                name="role"
                value={formData.role}
                data-testid="form-input-role"
                onChange={handleFormdata}
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
                onChange={handleSkillChange}
                placeholder="Skill"
                style={inputStyle}
              />
              <button
                type="button"
                data-testid="add-btn"
                style={addSkillButtonStyle}
                disabled={buttunState}
                onClick={handleAddSkill}
              >
                Add Skill
              </button>
            </div>
            <div>
              {formData.skills.map((skill, index) => (
                <span key={index} data-testid="skill-tag" style={skillTagStyle}>
                  {/* Implement this */ skill}
                </span>
              ))}
            </div>
            <div style={buttonGroupStyle}>
              <button
                data-testid="submit-btn"
                type="submit"
                style={sharpEdgeButtonStyle}
                //disabled={}
              >
                Register
              </button>
              <button
                data-testid="reset-btn"
                style={sharpEdgeButtonStyle}
                onClick={() =>
                  setFormData({
                    name: "",
                    email: "",
                    role: "",
                    skill: "",
                    skills: [],
                  })
                }
              >
                Reset
              </button>
            </div>
          </form>
        </div>
        {registrationStatus && (
          <span
            style={{
              color: registrationStatus.status === "error" ? "red" : "green",
            }}
          >
            {registrationStatus.message}
          </span>
        )}
      </div>
    </div>
  )
}

export default CandidateRegistration
