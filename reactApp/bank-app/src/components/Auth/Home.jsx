// src/HomePage.js
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Home.css'; // Create the CSS file for styling

const HomePage = () => {
    const navigate = useNavigate();
    const handleSignUp = () => {
        navigate('/Register'); // Navigate to the Register page
      };
    const handleLogin = () => {
        navigate('/Login');
    };
  return (
       <div className="home-container">
       {/* <header className="header"> */}

        <div className="logo-container">

          <a href='/'> <img src={require('./BankerLogo3.png')} alt="Bank Logo" className='logo'/> </a>

        </div>
        {/* <h1>Welcome to Banker</h1>
        <p>Your money - our pleasure</p> */}
      {/* </header> */}

      <section className="features">
        <h2>Why Choose Us?</h2>
        <div className="feature-cards">
          <div className="card">
            <h3>Easy Transfers</h3>
            <p>Send money across the globe with just a few clicks.</p>
          </div>
          <div className="card">
            <h3>24/7 Support</h3>
            <p>We’re here to help you at any time, day or night.</p>
          </div>
          <div className="card">
            <h3>Secure Banking</h3>
            <p>Your safety is our top priority with bank-grade security.</p>
          </div>
        </div>
      </section>

      <section className="cta">
        <h2>Ready to get started?</h2>
        <p>Create an account to manage your finances or log in to your existing account.</p>
        <div className="buttons">
          <button className="cta-button"
            onClick={handleLogin}>Login</button>
          <button className="cta-button"
            onClick={handleSignUp}>Sign Up</button>
        </div>
      </section>

      
    </div>
  );
};

export default HomePage;
