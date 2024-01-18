import React, { useState, useEffect } from 'react';

// Base styles for the component
const alertMessage = {
  marginTop: '5px',
};
const redInputStyle = {
  border: '1px solid red',
  backgroundColor: 'red',
  width: '100%',
  padding: '10px',
  borderRadius: '5px',
  // border: '1px solid #999',
  boxSizing: 'border-box',

};

const existingEmailStyle = {
  ...redInputStyle,
};

const centerContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '50vh',
  textAlign: 'center',
};

const addSkillButtonStyle = {
  backgroundColor: '#525252',
  border: '1px solid #333',
  color: 'white',
  borderRadius: '5px',
  marginLeft: '10px',
  cursor: 'pointer',
};

const formBoxStyle = {
  border: '1px solid #ccc',
  padding: '20px',
  backgroundColor: '#f5f5f5',
};

const formGroupStyle = {
  marginBottom: '10px',
  display: 'flex',
  alignItems: 'center',
};

const sharpEdgeButtonStyle = {
  backgroundColor: '#525252',
  border: '1px solid #333',
  padding: '10px 20px',
  color: 'white',
  borderRadius: '5px',
  cursor: 'pointer',
  marginTop: '10px',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #999',
  boxSizing: 'border-box',
};

const skillTagStyle = {
  backgroundColor: '#333',
  color: 'white',
  borderRadius: '5px',
  padding: '5px 10px',
  margin: '0 5px',
};

const buttonGroupStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '10px',
};

function CandidateRegistration() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    skill: '',
    skills: [],
  });

  const [registrationStatus, setRegistrationStatus] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [highlightInput, setHighlightInput] = useState(false);

  const handleSkillChange = (e) => {
    setFormData({ ...formData, skill: e.target.value });
  };

  const handleAddSkill = () => {
    if (formData.skills.length < 5 && formData.skill.trim() !== '') {
      setFormData({
        ...formData,
        skills: [...formData.skills, formData.skill.trim()],
        skill: '',
      });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Validation: Ensure name, email, and role are not empty
    if (formData.name.trim() === '' || formData.email.trim() === '' || formData.role.trim() === '') {
      setHighlightInput(true);
      return;
    }

    // Validation: Ensure at least one skill is added
    if (formData.skills.length === 0) {
      setHighlightInput(true);
      return;
    }

    // Validation: Ensure a maximum of 5 skills
    if (formData.skills.length > 5) {
      setRegistrationStatus('You can add only a maximum of 5 skills.');
      return;
    }
    
    // Check if the email already exists
    if (candidates.some(candidate => candidate.email === formData.email.trim())) {
      setRegistrationStatus('Email already exists');
      setHighlightInput(true);
      return;
    }
      
    // Add the candidate to the list
    setCandidates([...candidates, formData]);

    // Reset form data and highlight
    setFormData({
      name: '',
      email: '',
      role: '',
      skill: '',
      skills: [],
    });
    setHighlightInput(false);

    // Set registration status
    setRegistrationStatus('Candidate profile created');
  };

  useEffect(() => {
    const storedCandidates = localStorage.getItem('candidates');
    if (storedCandidates) {
      setCandidates(JSON.parse(storedCandidates));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('candidates', JSON.stringify(candidates));
  }, [candidates]);

  return (
    <div style={centerContainerStyle}>
      <div style={formBoxStyle}>
        <div data-testid="registration-component">
          <form onSubmit={handleFormSubmit} data-testid="registration-form">
            <div className="form-group" style={formGroupStyle}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                required
                style={inputStyle}
                data-testid="form-input-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="form-group" style={formGroupStyle}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                style={highlightInput ? existingEmailStyle : inputStyle}
                data-testid="form-input-email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="form-group" style={formGroupStyle}>
              <input
                type="text"
                name="role"
                placeholder="Role"
                required
                style={inputStyle}
                data-testid="form-input-role"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              />
            </div>
            <div className="form-group" style={formGroupStyle}>
              <input
                data-testid="form-input-skill"
                type="text"
                name="skill"
                placeholder="Skill"
                style={inputStyle}
                value={formData.skill}
                onChange={handleSkillChange}
              />
              <button
                type="button"
                data-testid="add-btn"
                style={addSkillButtonStyle}
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
                disabled={!formData.name || !formData.email || !formData.role || formData.skills.length === 0}
              >
                Register
              </button>
              <button
                data-testid="reset-btn"
                style={sharpEdgeButtonStyle}
                type="button"
                onClick={() => setFormData({ ...formData, skills: [] })}
              >
                Reset
              </button>
            </div>
          </form>
          {registrationStatus && <p style={alertMessage} data-testid="alert-message">{registrationStatus}</p>}
        </div>
      </div>
    </div>
  );
}

export default CandidateRegistration;
