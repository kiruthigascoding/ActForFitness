import React, { useState, useContext } from 'react';
import { StatsContext } from '../StatsContext';

const LogSteps = () => {
  const { stats } = useContext(StatsContext); 
  const [steps, setSteps] = useState(0);
  const [distance, setDistance] = useState(0);
  const [caloriesBurned, setCaloriesBurned] = useState(0);

  const handleLogSteps = () => {

    

    if (!stats || !stats.height) {
      console.error('Height is not available in stats');
      return;
    }
  
    const strideLength = stats.height * 0.413;
    const distanceWalked = (steps * strideLength) / 100000;
    const calories = steps * 0.04;
  
    setDistance(distanceWalked.toFixed(2));
    setCaloriesBurned(calories.toFixed(2));
  
    const currentDate = new Date().toLocaleDateString();
  
    const loggedSteps = {
      id: Date.now(),
      steps: steps,
      distance: distanceWalked.toFixed(2),
      caloriesBurned: calories.toFixed(2),
      date: currentDate,
    };
    const existingLogs = JSON.parse(localStorage.getItem('loggedSteps')) || [];
    const todayLogs = existingLogs.filter(log => log.date === currentDate);
    todayLogs.push(loggedSteps);
    localStorage.setItem('loggedSteps', JSON.stringify([...existingLogs.filter(log => log.date !== currentDate), ...todayLogs]));
  };

  return (
    <div className="log-steps-container">
      <h2>Log Your Steps</h2>
      <label>
        Steps Walked:
        <input
          type="number"
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
          min="0"
        />
      </label>
      <button onClick={handleLogSteps}>Log Steps</button>

      {distance > 0 && (
        <div className="results">
          <h3>Results</h3>
          <p>Total Distance: {distance} km</p>
          <p>Calories Burned: {caloriesBurned} kcal</p>
        </div>
      )}
    </div>
  );
};

export default LogSteps;
