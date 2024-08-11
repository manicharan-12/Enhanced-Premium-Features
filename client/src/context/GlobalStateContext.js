//context/GlobalStateContext.js
import React, { createContext, useContext, useState, useEffect, useMemo,useCallback } from 'react';

const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [userType, setUserType] = useState(() => localStorage.getItem('userType') || null);
  const [plan, setPlan] = useState(() => localStorage.getItem('plan') || null);

  useEffect(() => {
    const handleStorageChange = () => {
      setUserType(localStorage.getItem('userType'));
      setPlan(localStorage.getItem('plan'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const updateGlobalState = useCallback((newUserType, newPlan) => {
    setUserType(newUserType);
    setPlan(newPlan);
    localStorage.setItem('userType', newUserType);
    localStorage.setItem('plan', newPlan);
  }, []);

  const value = useMemo(() => ({ userType, plan, updateGlobalState }), [userType, plan, updateGlobalState]);

  return (
    <GlobalStateContext.Provider value={value}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};