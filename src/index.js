import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { StatsProvider } from './StatsContext';
import './index.css';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <StatsProvider>
      <App />
    </StatsProvider>
  </BrowserRouter>
);
