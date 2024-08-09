import React from 'react';
import { useNavigate } from 'react-router-dom';
import { upgradeToPremium } from '../services/api';

const PremiumPlans = () => {
  const navigate = useNavigate();
  const userType = localStorage.getItem('userType');

  const handleUpgrade = async () => {
    try {
      await upgradeToPremium();
      navigate(userType === 'user' ? '/user-dashboard' : '/recruiter-dashboard');
    } catch (err) {
      console.error('Failed to upgrade to premium', err);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6">Premium Plans</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Monthly Plan</h2>
          <p className="mb-4">$9.99 per month</p>
          <ul className="list-disc list-inside mb-4">
            <li>All premium features</li>
            <li>Cancel anytime</li>
          </ul>
          <button
            onClick={handleUpgrade}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Upgrade to Monthly Plan
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Annual Plan</h2>
          <p className="mb-4">$99.99 per year (Save 17%)</p>
          <ul className="list-disc list-inside mb-4">
            <li>All premium features</li>
            <li>Best value</li>
          </ul>
          <button
            onClick={handleUpgrade}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Upgrade to Annual Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default PremiumPlans;