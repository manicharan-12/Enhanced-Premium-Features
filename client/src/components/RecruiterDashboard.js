import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { getRecruiterDashboard, upgradeToPremium } from '../services/api';
import PremiumFeatures from './PremiumFeatures';

function RecruiterDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const data = await getRecruiterDashboard();
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
    <div className="recruiter-dashboard">
      <h1>Recruiter Dashboard</h1>
      {dashboardData && (
        <>
          <p>Company: {dashboardData.company}</p>
          <p>Plan: {dashboardData.plan}</p>
          {dashboardData.plan === 'free' ? (
            <button onClick={handleUpgrade}>Upgrade to Premium</button>
          ) : (
            <PremiumFeatures userType="recruiter" />
          )}
        </>
      )}
    </div>
  );
}

export default RecruiterDashboard;
