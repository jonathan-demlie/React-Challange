import React from 'react';

function Footer() {
  const footerStyle = {
    backgroundColor: 'black',
    padding: '20px',
    color: 'white',
    position: 'fixed',
    bottom: '0', 
    width: '100%', 
  };

  return (
    <div style={footerStyle}>
    
      <p>© Code by Solomon. All rights reserved.</p>
    </div>
  );
}

export default Footer;