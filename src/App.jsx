import React from 'react';
import Logo from './components/Logo';
import LandingPage from './components/LandingPage';
import RemittanceGlobe from './components/RemittanceGlobe';
import './styles/App.css';

function App() {
  return (
    <div className="app">
      <Logo />
      <RemittanceGlobe />
      <LandingPage />
    </div>
  );
}

export default App;

