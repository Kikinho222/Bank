import React from 'react';
import './About.css'; 

const About = () => {
  return (
    <div className="page-container">

    
    <div className="about-container">
      <div className="about-header">
        <h1>About Us</h1>
        <p>Welcome brother, you are one of our family</p>
        <p>Your money - Our money</p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h2>Who are we?
          <h3>Founder - The Avshalom</h3></h2>
          <p className="quote">"The basis for a good bank, is a good bank"</p>
          
          {/* Founder Picture */}
          <div className="founder-container">
            <img
              src={require('./AvshalomNachman.png')}
              alt="The Avshalom"
              className='founder' 
            />
          </div>
          
          <p className="founder-description">
            Our founder, The Avshalom, is the visionary who paved the way for our bank. His dedication to financial excellence and unwavering commitment to taking your money has turned his dream into a reality. The Avshalom's leadership and unique approach to banking have forever changed the way we think about piggish capitalism, your money is ours and we owe you nothing. Truly, his legacy is one that will continue to inspire future generations.
          </p>
        </section>
      </div>
    </div>
    </div>
  );
}

export default About;
