import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ( componenets ) => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return componenets.children;
};

export default ProtectedRoute;
