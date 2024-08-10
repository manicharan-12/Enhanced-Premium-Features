// PremiumPlans.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { upgradeToPremium } from '../services/api';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const PlanContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  animation: ${fadeIn} 0.5s ease-out;
`;

const PlanCard = styled.div`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.1);
  transition: all 0.3s ease;
  text-align: center;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(31, 38, 135, 0.2);
  }
`;

const PlanTitle = styled.h2`
  color: #333;
  margin-bottom: 20px;
`;

const PlanPrice = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: #4a90e2;
  margin-bottom: 20px;
`;

const PlanFeatures = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-bottom: 20px;
`;

const PlanFeature = styled.li`
  padding: 10px 0;
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

  &:hover {
    background: #357abd;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(74, 144, 226, 0.4);
  }
`;

const PremiumPlans = () => {
  const navigate = useNavigate();
  const userType = localStorage.getItem('userType');

  const handleUpgrade = async (plan) => {
    try {
      await upgradeToPremium(plan);
      navigate(userType === 'user' ? '/user-dashboard' : '/recruiter-dashboard');
    } catch (err) {
      console.error('Failed to upgrade to premium', err);
    }
  };

  return (
    <PlanContainer>
      <PlanCard>
        <PlanTitle>Monthly Plan</PlanTitle>
        <PlanPrice>$9.99 per month</PlanPrice>
        <PlanFeatures>
          <PlanFeature>All premium features</PlanFeature>
          <PlanFeature>Cancel anytime</PlanFeature>
        </PlanFeatures>
        <Button onClick={() => handleUpgrade('monthly')}>
          Upgrade to Monthly Plan
        </Button>
      </PlanCard>
      <PlanCard>
        <PlanTitle>Annual Plan</PlanTitle>
        <PlanPrice>$99.99 per year</PlanPrice>
        <PlanFeatures>
          <PlanFeature>All premium features</PlanFeature>
          <PlanFeature>Save 17%</PlanFeature>
          <PlanFeature>Best value</PlanFeature>
        </PlanFeatures>
        <Button onClick={() => handleUpgrade('annual')}>
          Upgrade to Annual Plan
        </Button>
      </PlanCard>
    </PlanContainer>
  );
};

export default PremiumPlans;