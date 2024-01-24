import React, { useState, useEffect } from 'react';

// Base styles for the component
const alertMessage = {
  marginTop: '5px'
}

const highlight = {
 
  boxShadow: '0 0 5px red',
  color : 'red',
 
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

const buttonGroupStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '10px',
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
  const [candidateCount, setCandidateCount] = useState(0);

  const [skillInputValue, setSkillInputValue] = useState(''); 

  // const inputHandler=(e)=>{
  //     setFormData([...formData,{[e.target.name]: e.target.value}])
  // }
  const inputHandler=(e)=>{
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      })
        
  }
  
  const handleSkillChange = (e) => {
    const skill = e.target.value;
    setFormData((prevState) =>({
        ...prevState,
        skill,
        // skills: [...prevState.skills, skill]
    })
    )

  };

  const handleAddSkill = () => {
    if (formData.skill.trim() === "") {
      return;
    }
  
    if (formData.skills.length >= 5) {
      alert("You can add only a maximum of 5 skills.");
      return;
    }
  
    setFormData((prevState) => ({
      ...prevState,
      skills: [...prevState.skills.slice(0, 4), formData.skill.trim()],
      skill: "",
    }));
  };



  const handleFormSubmit = (e) => {
    e.preventDefault();
  
    const existingCandidate = candidates.find(
      (candidate) => candidate.email === formData.email 
    );
  
    if (existingCandidate) {
      setRegistrationStatus('Email already exists');
    } else if (formData.skills.length === 0) {
      setRegistrationStatus('Please add at least one skill');
    } else {
      const newCandidate = {
        name: formData.name,
        email: formData.email,
        role: formData.role,
        skills: formData.skills
      };
  
      setCandidates([...candidates, newCandidate]);
      setCandidateCount((prevCount) => prevCount + 1);
  
      setFormData({
        name: "",
        email: "",
        role: "",
        skill: "",
        skills: [],
      });
  
      setRegistrationStatus('Candidate Profile Created');
      // localStorage.setItem("candidates", JSON.stringify("candidates"))
    }
  };
  
  

  useEffect(() => {
    const storedCandidates = localStorage.getItem("candidates");
    if (storedCandidates) {
      // Hint: Implement this
      const parsedCandidates = JSON.parse(storedCandidates);
      setCandidates(parsedCandidates);
      setCandidateCount(parsedCandidates.length);
    }
  }, []);

  useEffect(() => {
    // Save candidates to localStorage whenever candidates state changes
     localStorage.setItem("candidates",JSON.stringify(candidates))
     setCandidateCount(candidates.length);
  }, [candidates]);
return (
    <div style={centerContainerStyle}>
      <div style={formBoxStyle}>
        <div data-testid="registration-component" style={formBoxStyle}>
          <form onSubmit={handleFormSubmit} >
            <div className="form-group" style={formGroupStyle}>
              <input
              value={formData.name}
              onChange={inputHandler}
                type="text"
                name="name"
                placeholder="Name"
                required
                style={inputStyle}
                data-testid="form-input-name"
               
              />
            </div>
            <div className="form-group" style={formGroupStyle}>
           
              <input
              value={formData.email}
              onChange={inputHandler}
              type="email"
              name="email"
              placeholder="Email"
              data-testid="form-input-email"
              required
              style={{
                ...inputStyle,
                ...(registrationStatus === 'Email already exists' || registrationStatus === 'Error' ? highlight : {}),
              }}
             
              
            />
            </div>
            <div className="form-group" style={formGroupStyle}>
              <input
              value={formData.role}
              onChange={inputHandler}
                type="text"
                name="role"
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
                placeholder="Skill"
               
                value={formData.skill}
                onChange={handleSkillChange}
                style={inputStyle}
              />
              <button
                type="button"
                data-testid="add-btn"
                onClick={handleAddSkill}
                style={addSkillButtonStyle}
              >
                Add Skill
              </button>
            </div>
            <div>
            {formData.skills.slice(0, 5).map((skill, index) => (
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
                  type="reset"
                  style={sharpEdgeButtonStyle}
                  onClick={() => {
                    setFormData({ name: "", email: "", role: "", skill: "", skills: [] });
                    setSkillInputValue("");
                  }}
                >Reset
                </button>
            </div>
          </form>
          {registrationStatus && (
            <div style={alertMessage}>
              <p data-testid="status">{registrationStatus}</p>
            </div>
        
          )}

          <div >
        
      </div>

        </div>
      </div>
    </div>
  );
}

export default CandidateRegistration;