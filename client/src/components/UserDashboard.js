import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { getUserDashboard, upgradeToPremium } from '../services/api';
import PremiumFeatures from './PremiumFeatures';

function UserDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const data = await getUserDashboard();
      setDashboardData(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch dashboard data');
      setLoading(false);
    }
  };

  const handleUpgrade = async () => {
    try {
      await upgradeToPremium();
      fetchDashboardData();
      navigate('/premium-plans'); // Navigate to premium-plans page
    } catch (err) {
      setError('Failed to upgrade to premium');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="user-dashboard">
      <h1>User Dashboard</h1>
      {dashboardData && (
        <>
          <p>Plan: {dashboardData.plan}</p>
          <h2>Skills</h2>
          <ul>
            {dashboardData.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
          <h2>Certifications</h2>
          <ul>
            {dashboardData.certifications.map((cert, index) => (
              <li key={index}>{cert}</li>
            ))}
          </ul>
          {dashboardData.plan === 'free' ? (
            <button onClick={handleUpgrade}>Upgrade to Premium</button>
          ) : (
            <PremiumFeatures userType="user" />
          )}
        </>
      )}
    </div>
  );
}

export default UserDashboard;
