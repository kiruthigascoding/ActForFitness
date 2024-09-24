import React, { useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import MyStats from './components/MyStats';
import LogSteps from './components/LogSteps';
import LogActivity from './components/LogActivity';
import { StatsProvider } from './StatsContext';

function App() {
  const [activities, setActivities] = useState([]);

  const updateActivities = (newActivities) => {
    setActivities(newActivities);
  };
  

  return (
    <StatsProvider>
      <nav>
        <div className="title">
          <h1>ActForFitness</h1>
        </div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/mystats">My Stats</Link></li>
          <li><Link to="/logsteps">Log Steps</Link></li>
          <li><Link to="/logactivity">Log Activity</Link></li>
        </ul>
      </nav>

      <div>
        <Routes>
          <Route path="/" element={<Home activities={activities} />} />
          <Route path="/mystats" element={<MyStats />} />
          <Route path="/logsteps" element={<LogSteps />} />
          <Route path="/logactivity" element={<LogActivity updateActivities={updateActivities} />} />
        </Routes>
      </div>
    </StatsProvider>
  );
}

export default App;
