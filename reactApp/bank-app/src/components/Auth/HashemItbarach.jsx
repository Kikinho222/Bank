import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import './HashemItbarach.css';

function CelebrationPage() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="celebration-container">
      <Confetti width={windowWidth} height={windowHeight} />
      <div className="celebration-content">
        <img
          src={require('./AvshalomNachman.png')}
          alt="Celebration" 
          className="jumping-image"
        />
        <h1 className="celebration-text">OH GOD, WE LOVE YOUR MONEY!</h1>
      </div>

      {/* Audio for celebration music */}
      <audio autoPlay loop>
        <source src={require('./WelcomeSong.mp3')} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export default CelebrationPage;
