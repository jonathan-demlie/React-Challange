import React, { useState, useEffect } from 'react';

// Base styles for the component
const alertMessage = {
  marginTop: '5px',
};

const highlight = {
  border: '2px solid red',
  backgroundColor: 'red',
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
  border: '1px solid #ccc',
  boxSizing: 'border-box',
};

const skillTagStyle = {
  backgroundColor: '#333',
  color: 'white',
  borderRadius: '0',
  padding: '5px 10px',
  margin: '0 5px',
};

const footerStyle = {
  backgroundColor: 'black',
  padding: '10px',
  color: 'white',
  marginTop: '20px',
};

const buttonGroupStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '10px',
};

function CandidateRegistration({ onCandidateRegister }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    skill: '',
    skills: [],
  });

  const [candidates, setCandidates] = useState([]);
  const [registrationStatus, setRegistrationStatus] = useState(null);
  const [highlightInput, setHighlightInput] = useState(false);

  useEffect(() => {
    const storedCandidates = localStorage.getItem('candidates');
    if (storedCandidates) {
      setCandidates(JSON.parse(storedCandidates));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('candidates', JSON.stringify(candidates));
  }, [candidates]);

  const handleSkillChange = (e) => {
    setFormData({ ...formData, skill: e.target.value });
  };

  const isEmailExist = (email) => {
    return candidates && candidates.some((candidate) => candidate.email.toLowerCase() === email.toLowerCase());
  };

  const handleAddSkill = () => {
    const { skill, skills } = formData;

    if (skills.length >= 5) {
      setRegistrationStatus('You can add only a maximum of 5 skills.');
      return; // Exit the function if the maximum skills limit is reached
    }

    if (skill.trim() !== '') {
      setFormData({
        ...formData,
        skills: [...skills, skill],
        skill: '', // Clear the skill input
      });
    }
  };

  const { name, email } = formData;

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (name.trim() === '') {
      setRegistrationStatus('Error: Please enter a name.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setRegistrationStatus('Error: Please enter a valid email address.');
      return false;
    }

    if (email.trim() === '') {
      setRegistrationStatus('Error: Please enter an email address.');
      return false;
    }

    if (isEmailExist(formData.email)) {
      setRegistrationStatus('Email already exists.');
      return;
    }

    if (formData.skills.length === 0) {
      setRegistrationStatus('At least one skill is required.');
      return;
    }

    const newCandidate = {
      name: formData.name,
      email: formData.email,
      role: formData.role,
      skills: formData.skills,
    };

    onCandidateRegister(newCandidate);

    setCandidates([...candidates, newCandidate]);

    setFormData({ name: '', email: '', role: '', skill: '', skills: [] });

    setRegistrationStatus('Candidate profile created');
  };

  const handleReset = () => {
    // Reset the form data to its initial state
    setFormData({
      name: '',
      email: '',
      role: '',
      skill: '',
      skills: [],
    });

    // Clear the registration status
    setRegistrationStatus(null);
    setHighlightInput(false);
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
                data-testid="form-input-name"
                style={inputStyle}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="form-group" style={formGroupStyle}>
              <input
                type="Email"
                name="email"
                placeholder="Email"
                required
                style={inputStyle}
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
                value={formData.role}
                data-testid="form-input-role"
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
                <span data-testid="skill-tag" style={skillTagStyle} key={index}>
                  {skill}
                </span>
              ))}
            </div>
            <div style={buttonGroupStyle}>
              <button
                data-testid="submit-btn"
                type="submit"
                style={sharpEdgeButtonStyle}
                onClick={handleFormSubmit}>
                Register
                </button>
                <button data-testid="reset-btn" style={sharpEdgeButtonStyle} onClick={handleReset} >
                Reset
                </button>
                </div>
                <div>
                
                {registrationStatus && (
                  <div style={alertMessage} data-testid="alert-message">
                    {registrationStatus}
                  </div>
                )}    
              </div>
              </form>
              </div>
            </div>
          </div>
                
          );
                
        }
                
 export default CandidateRegistration;
