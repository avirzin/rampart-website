import React from 'react';
import './LandingPage.css';

function LandingPage() {
  return (
    <div className="landing-page">
      <div className="landing-content">
        <h1 className="main-title">
          <span className="title-gradient-blue">Automated Crypto</span>
          <span className="title-gradient-purple">Trading</span>
        </h1>
        
        <p className="tagline">Unlocking Latin America's Digital Future</p>
        
        <p className="description">
          Advanced AI-powered trading bots capturing opportunities across emerging crypto markets in Latin America
        </p>
        
        <div className="status-buttons">
          <button className="status-button active">
            <span className="status-dot"></span>
            Live Trading Active
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;

