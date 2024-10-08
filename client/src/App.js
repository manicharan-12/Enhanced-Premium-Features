//App.js
import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { GlobalStateProvider } from './context/GlobalStateContext';
import Login from './components/Login';
import Register from './components/Register';
import UserDashboard from './components/UserDashboard';
import RecruiterDashboard from './components/RecruiterDashboard';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import PremiumPlans from './components/PremiumPlans';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Inter', sans-serif;
    background: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
    margin: 0;
    padding: 0;
    min-height: 100vh;
  }
`;

const AppWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

function App() {
  return (
    <GlobalStateProvider>
      <Router>
        <GlobalStyle />
        <AppWrapper>
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user-dashboard" element={<PrivateRoute><UserDashboard /></PrivateRoute>} />
            <Route path="/recruiter-dashboard" element={<PrivateRoute><RecruiterDashboard /></PrivateRoute>} />
            <Route path="/premium-plans" element={<PrivateRoute><PremiumPlans /></PrivateRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AppWrapper>
      </Router>
    </GlobalStateProvider>
  );
}

export default App;