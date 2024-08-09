import React from 'react';

function PremiumFeatures({ userType }) {
  return (
    <div className="premium-features">
      <h2>Premium Features</h2>
      {userType === 'user' ? (
        <ul>
          <li>Skill ranking based on certifications</li>
          <li>Discounted prices for certifications</li>
          <li>Increased visibility to companies</li>
        </ul>
      ) : (
        <ul>
          <li>Access to certified, background-verified candidates</li>
          <li>Advanced search and filtering options</li>
          <li>Detailed candidate analytics</li>
        </ul>
      )}
    </div>
  );
}

export default PremiumFeatures;