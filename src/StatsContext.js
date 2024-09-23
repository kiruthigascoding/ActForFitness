import React, { createContext, useState } from 'react';

export const StatsContext = createContext();

export const StatsProvider = ({ children }) => {
  const [stats, setStats] = useState({
    name: '',
    height: 0,
    age: 0,
    currentWeight: 0,
    goalWeight: 0,
    startingWeight: 0,
  });

  const updateStats = (newStats) => {
    setStats((prevStats) => ({
      ...prevStats,
      ...newStats,
    }));
  };

  return (
    <StatsContext.Provider value={{ stats, updateStats }}>
      {children}
    </StatsContext.Provider>
  );
};
