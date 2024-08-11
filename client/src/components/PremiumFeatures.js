// components/PremiumFeatures.js
import React from 'react';
import styled from 'styled-components';

const FeaturesContainer = styled.div`
  margin-top: 20px;
`;

const FeaturesList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const FeatureItem = styled.li`
  padding: 10px 0;
  display: flex;
  align-items: center;

  &:before {
    content: '✓';
    color: #4a90e2;
    font-weight: bold;
    margin-right: 10px;
  }
`;

function PremiumFeatures({ userType }) {
  return (
    <FeaturesContainer>
      <h3>Premium Features</h3>
      <FeaturesList>
        {userType === 'user' ? (
          <>
            <FeatureItem>Skill ranking based on certifications</FeatureItem>
            <FeatureItem>Discounted prices for certifications</FeatureItem>
            <FeatureItem>Increased visibility to companies</FeatureItem>
          </>
        ) : (
          <>
            <FeatureItem>Access to certified, background-verified candidates</FeatureItem>
            <FeatureItem>Advanced search and filtering options</FeatureItem>
            <FeatureItem>Detailed candidate analytics</FeatureItem>
          </>
        )}
      </FeaturesList>
    </FeaturesContainer>
  );
}

export default PremiumFeatures
