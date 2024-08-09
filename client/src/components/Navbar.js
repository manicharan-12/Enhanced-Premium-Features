import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [plan, setPlan] = useState(null);
  const userType = localStorage.getItem('userType');
  const isAuthenticated = !!localStorage.getItem('token');

  useEffect(() => {
    const userPlan = localStorage.getItem('plan');
    setPlan(userPlan);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('plan');
    navigate('/');
  };

  const handleUpgradeToPremium = () => {
    navigate('/premium-plans');
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {!isAuthenticated && (
          <Link to="/" className="text-white text-xl font-bold">
            JobConnect
          </Link>
        )}
        <div>
          {isAuthenticated ? (
            <>
              <Link
                to={userType === 'user' ? '/user-dashboard' : '/recruiter-dashboard'}
                className="text-white mr-4"
              >
                Dashboard
              </Link>
              {plan === 'free' && (
                <button onClick={handleUpgradeToPremium} className="text-white mr-4">
                  Upgrade to Premium
                </button>
              )}
              <button onClick={handleLogout} className="text-white">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white mr-4">
                Login
              </Link>
              <Link to="/register" className="text-white">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
