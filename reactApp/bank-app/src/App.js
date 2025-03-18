import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Auth/Dashboard';
import SendTransaction from './components/Auth/SendTransaction';
import Home from './components/Auth/Home';
import About from './components/Auth/About';
import HashemItbarach from './components/Auth/HashemItbarach';
import VerificationPage from './components/Auth/AccountVerification'
import Navbar from './components/components/Navbar';
import Footer from './components/components/footer';
import ProtectedRoute from './components/components/ProtecterRoute';
import ProtectedRouteLoggedIn from './components/components/ProtectedRouteLoggedIn';

function App() { 
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<ProtectedRouteLoggedIn> <Home /> </ProtectedRouteLoggedIn>} />
                <Route path="/account-verification" element = {<VerificationPage />} />
            
                    <Route path="/login" element={<ProtectedRouteLoggedIn> <Login /> </ProtectedRouteLoggedIn>} /> 
                    <Route path="/register" element={<ProtectedRouteLoggedIn> <Register /> </ProtectedRouteLoggedIn>} />
                    
                
                    <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
                    <Route path="/send" element={<ProtectedRoute> <SendTransaction /> </ProtectedRoute>} />
                    <Route path="/celebration" element={<ProtectedRoute> <HashemItbarach /> </ProtectedRoute>} />
                    <Route path="/about" element={<About />} />
            
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;