// HealthContext.js
import React, { createContext, useContext, useState } from 'react';

const HealthContext = createContext();

export const HealthProvider = ({ children }) => {
  const [calories, setCalories] = useState('');
  const [water, setWater] = useState('');

  return (
    <HealthContext.Provider value={{ calories, setCalories, water, setWater }}>
      {children}
    </HealthContext.Provider>
  );
};

export const useHealth = () => useContext(HealthContext);
