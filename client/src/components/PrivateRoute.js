//components/PrivateRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useGlobalState } from '../context/GlobalStateContext';

const PrivateRoute = ({ children }) => {
  const { userType } = useGlobalState();
  const isAuthenticated = Boolean(localStorage.getItem('token'));
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Allow access to /premium-plans for both user types
  if (location.pathname === '/premium-plans') {
    return children;
  }

  // Redirect to the appropriate dashboard based on userType
  if (userType === 'user' && location.pathname !== '/user-dashboard') {
    return <Navigate to="/user-dashboard" replace />;
  }
  if (userType === 'recruiter' && location.pathname !== '/recruiter-dashboard') {
    return <Navigate to="/recruiter-dashboard" replace />;
  }

  return children;
};

export default PrivateRoute
