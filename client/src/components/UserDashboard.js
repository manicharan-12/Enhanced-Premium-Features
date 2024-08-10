// UserDashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { ThreeDots } from 'react-loader-spinner';
import { getUserDashboard } from '../services/api';
import PremiumFeatures from './PremiumFeatures';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  animation: ${fadeIn} 0.5s ease-out;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(31, 38, 135, 0.2);
  }
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 20px;
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ListItem = styled.li`
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0;
  &:last-child {
    border-bottom: none;
  }
`;

const Button = styled.button`
  background: #4a90e2;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 30px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;

  &:hover {
    background: #357abd;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(74, 144, 226, 0.4);
  }
`;

function UserDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
      navigate('/premium-plans');
    } catch (err) {
      setError('Failed to upgrade to premium');
    }
  };

  if (loading) return <ThreeDots color="#4a90e2" height={80} width={80} />;
  if (error) return <div className="error">{error}</div>;

  return (
    <DashboardContainer>
      <Card>
        <Title>User Dashboard</Title>
        {dashboardData && (
          <>
            <p>Plan: {dashboardData.plan}</p>
            <Title>Skills</Title>
            <List>
              {dashboardData.skills.map((skill, index) => (
                <ListItem key={index}>{skill}</ListItem>
              ))}
            </List>
            <Title>Certifications</Title>
            <List>
              {dashboardData.certifications.map((cert, index) => (
                <ListItem key={index}>{cert}</ListItem>
              ))}
            </List>
            {dashboardData.plan === 'free' ? (
              <Button onClick={handleUpgrade}>Upgrade to Premium</Button>
            ) : (
              <PremiumFeatures userType="user" />
            )}
          </>
        )}
      </Card>
    </DashboardContainer>
  );
}

export default UserDashboard;
