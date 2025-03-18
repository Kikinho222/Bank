import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import './Auth.css'; 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/user/login', { email, password });
      console.log(response);
     // alert('Login successful');
       const token = response.data.token;
      if(!token) {
        alert("no token try again");

        return;
      }
      
      sessionStorage.setItem("token", token);
      navigate('/Dashboard'); 
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="page-container">
    <div className="auth-container">
      <h2>Login</h2>
      {/* <div className="logo-container">
        <a href='/'> <img src={require('./BankerLogo3.png')} alt="Bank Logo" className='logo'/></a>
      </div> */}
      <form onSubmit={handleSubmit}>
        <div className="auth-field">
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="auth-field">
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <a href='/register'>Register</a></p>
    </div>
    </div>
  );
}

export default Login;


