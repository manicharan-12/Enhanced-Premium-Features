import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import UserDashboard from './components/UserDashboard';
import RecruiterDashboard from './components/RecruiterDashboard';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import PremiumPlans from './components/PremiumPlans';

function App() {
  return (
    <Router>
      <div className="App">
      <Navbar/>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user-dashboard" element={<PrivateRoute element={<UserDashboard />} />} />
          <Route path="/recruiter-dashboard" element={<PrivateRoute element={<RecruiterDashboard />} />} />
          <Route path="/premium-plans" element={<PrivateRoute element={<PremiumPlans/>}/>}/>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
