import React, { useState, useEffect } from 'react';
import './LandingPage.css';

function LandingPage() {
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    const targetDate = new Date('2026-04-01T00:00:00').getTime();

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
        <div className="hero-blur">
          <h1 className="main-title">
            <span className="title-gradient-blue">Investing in</span>
            <span className="title-gradient-purple">emerging opportunities</span>
          </h1>
          
          {/* <p className="tagline">Focusing on major opportunities in emerging markets.</p> */}
        </div>
        
        {/* <p className="description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p> */}
        
        {/* <div className="status-buttons">
          <button className="status-button active">
            <span className="status-dot"></span>
            Investment strategy in development
          </button>
        </div> */}

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

