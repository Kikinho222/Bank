import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ( components ) => {
  const token = sessionStorage.getItem("token");

  if (token) {
    return <Navigate to="/dashboard" />;
  }

    return components.children;
};

export default ProtectedRoute;