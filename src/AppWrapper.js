import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { StatsProvider } from './StatsContext';

const AppWrapper = () => {
  return (
    <Router>
      <StatsProvider>
        <App />
      </StatsProvider>
    </Router>
  );
};

export default AppWrapper;
