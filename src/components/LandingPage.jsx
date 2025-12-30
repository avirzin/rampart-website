import React, { useState, useEffect } from 'react';
import './LandingPage.css';

function LandingPage() {
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    const targetDate = new Date('2026-02-01T00:00:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setCountdown('00:00:00:00');
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown(
        `${String(days).padStart(2, '0')}:${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
      );
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

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
            Trading Validation in Progress
          </button>
        </div>

        <div className="countdown-terminal">
          <span className="terminal-prompt">$</span>
          <span className="terminal-command">countdown</span>
          <span className="terminal-countdown">{countdown}</span>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;

