import React, { createContext, useState } from 'react';

export const StatsContext = createContext();

export const StatsProvider = ({ children }) => {
  const [stats, setStats] = useState({
    name: '',
    height: '',
    age: '',
    currentWeight: '',
    goalWeight: '',
    startingWeight: 0,
  });

  const updateStats = (newStats) => {
    setStats(newStats);
  };

  return (
    <StatsContext.Provider value={{ stats, updateStats }}>
      {children}
    </StatsContext.Provider>
  );
};
