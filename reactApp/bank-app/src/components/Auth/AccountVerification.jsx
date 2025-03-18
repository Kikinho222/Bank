import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './About.css';  
import './AccountVerification.css';

const AccountVerification = () => {
  const [seconds, setSeconds] = useState(10); // Countdown time
  const [verificationStatus, setVerificationStatus] = useState(null); // Verification status
  const [isConfirmed, setIsConfirmed] = useState(false); // Loading state for the verification request
  const navigate = useNavigate();
  const location = useLocation(); // To access the URL query params

  // Extract the token from the URL query params
  const urlParams = new URLSearchParams(location.search);
  const verificationToken = urlParams.get('token');

  // Verify token function
  const verifyToken = async () => {
    if (!verificationToken) {
      setVerificationStatus('Invalid token.');
      setIsConfirmed(false);
      return;
    }

    try {
      // Example of sending token to your backend for verification (you need to implement this)
      const response = await axios.post("http://localhost:3000/api/user/account-verification", { verificationToken });

      if (response.data.success) {
        setVerificationStatus('Your account has been verified!');
        setIsConfirmed(true);
      } else {
        setVerificationStatus('Verification failed. Invalid token or expired.');
      }
    } catch (error) {
      setVerificationStatus('An error occurred while verifying your account.');
    }
  };

  // Countdown and automatic redirection
  useEffect(() => {
    if (seconds > 0) {
      const timer = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (seconds === 0 && isConfirmed) {
      // Redirect when countdown ends or verification completes
      navigate('/login'); // You can adjust the redirect URL as needed
    }
  }, [seconds, isConfirmed, navigate]);

  // Call verifyToken when the component mounts
  useEffect(() => {
    verifyToken();
  }, [verificationToken]);

  return (
    <div className="page-container">
      <div className="content-container">
      <h1>Account Verification</h1>
      {/* {isConfirmed ? ( */}
      <div className="founder-container">
            <img
              src={require('./AvshalomNachman.png')}
              alt="The Avshalom"
              className='founderA' 
            />
          </div>
        <div> 
          <p>Out Founder is verifying your account...</p>
          <p>Redirecting in {seconds} seconds...</p>
          <button onClick={() => navigate('/login')}>Go to Login</button>
        </div>
      {/* ) : ( */}
        <div>
          <p>{verificationStatus}</p>
        </div>
      {/* )} */}
      </div>
    </div>
  );
};

export default AccountVerification;
