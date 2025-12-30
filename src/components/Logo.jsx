import React from 'react';
import './Logo.css';
import rampartLogo from '../images/rampart_logo.png';

function Logo() {
  return (
    <div className="logo-container">
      <img src={rampartLogo} alt="Rampart Capital" className="logo" />
    </div>
  );
}

export default Logo;

