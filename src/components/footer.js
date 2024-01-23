import React from 'react';

function Footer() {
  const footerStyle = {
    backgroundColor: 'black',
    margin: '0',
    padding: '40px',
    color: 'white',
    position: 'fixed',
    bottom: '0', 
    width: '100%', 
    height: '40px'
  };

  return (
    <div style={footerStyle}>
    
      <p>© Code by Solomon. All rights reserved.</p>
    </div>
  );
}

export default Footer;