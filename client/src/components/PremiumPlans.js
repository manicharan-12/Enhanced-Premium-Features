import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getPremiumPlans } from '../services/api';

const PlanCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: ${props => props.color};
  color: white;
`;

const PlanName = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const PlanPeriod = styled.p`
  margin-bottom: 1rem;
`;

const PlanPrice = styled.div`
  font-size: 2.25rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;

const FeatureList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-bottom: 1.5rem;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  color: ${props => props.included ? 'white' : 'rgba(255, 255, 255, 0.8)'};
`;

const FeatureIcon = styled.span`
  margin-right: 0.5rem;
  color: ${props => props.included ? '#4ade80' : '#f87171'};
`;

const FeatureText = styled.span`
  color: ${props => props.included ? 'white' : 'rgba(255, 255, 255, 0.8)'};
`;

const BuyButton = styled.button`
  margin-top: auto;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-weight: 600;
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

const PlanCard = ({ name, price, features, color }) => {
  console.log(features);
  
  return(
    <PlanCardWrapper color={color}>
    <PlanName>{name}</PlanName>
    <PlanPeriod>PER MONTH</PlanPeriod>
    <PlanPrice>${price}</PlanPrice>
    <FeatureList>
      {features.map((feature, index) => (
        <FeatureItem key={index} included={feature.included}>
          <FeatureIcon included={feature.included}>
            {feature.included ? '✓' : '✕'}
          </FeatureIcon>
          <FeatureText included={feature.included}>{feature.text}</FeatureText>
        </FeatureItem>
      ))}
    </FeatureList>
    <BuyButton>BUY NOW</BuyButton>
  </PlanCardWrapper>
  )
  
};

const PlansContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f3f4f6;
`;

const PlansGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 72rem;
  width: 100%;
  padding: 0 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PremiumPlans = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    const data = await getPremiumPlans();
    setPlans(data);
  };

  const getColorForPlan = (name) => {
    switch (name.toUpperCase()) {
      case 'BASIC': return '#10b981';
      case 'STANDARD': return '#fbbf24';
      case 'PREMIUM': return '#f43f5e';
      default: return '#9ca3af';
    }
  };

  return (
    <PlansContainer>
      <PlansGrid>
        {plans.map((plan, index) => (
          <PlanCard
            key={index}
            name={plan.name}
            price={plan.price}
            features={plan.features}
            color={getColorForPlan(plan.name)}
          />
        ))}
      </PlansGrid>
    </PlansContainer>
  );
};

export default PremiumPlans;
