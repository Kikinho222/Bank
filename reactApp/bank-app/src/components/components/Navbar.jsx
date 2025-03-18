import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');

    const handleLogout = () => {
        sessionStorage.removeItem('token');
    };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
      <a href='/'> <img src={require('./BankerLogo3.png')} alt="Bank Logo" className='logoNav'/> </a>
      </div>
      <ul className="navbar-links">
        {token !== null ? (
            <> <li>
                    <Link to="/Dashboard">Dashboard</Link>
                </li>

                <li>
                    <Link to="/send">Transfer Money</Link>
                </li>
                
                <li>
                    <Link to="/about">About</Link>
                </li>
                
                <li>
                    <Link onClick={handleLogout} to="/">Logout</Link>           
                </li>
           </>
        ) : (
           <><li>
                <Link to="/Login">Login</Link>
            </li>

            <li>
                <Link to="/Register">Sign Up</Link>
            </li>
            
            <li>
                <Link to="/about">About</Link>
            </li>

            </>
        )}
       
       
      </ul>
      {/* <div className="navbar-signout">
        <Link to="/logout">Sign Out</Link>
      </div> */}
    </nav>
  );
};

export default Navbar;