import React, { useContext, useEffect, useState } from 'react';
import { StatsContext } from '../StatsContext';

const LogActivity = ({ updateActivities }) => {
  const { stats } = useContext(StatsContext); 
  const [activitiesData, setActivitiesData] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState('');
  const [selectedMotion, setSelectedMotion] = useState('');
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [caloriesBurned, setCaloriesBurned] = useState(0);

  
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch('/activities.json');
        const data = await response.json();
        setActivitiesData(data);
      } catch (error) {
        console.error('Error fetching activities data:', error);
      }
    };

    fetchActivities();
  }, []);

  
  const handleCalculate = () => {
    if (!stats || !stats.currentWeight) {
      console.error('Current weight is not available');
      return;
    }

    const totalTime = hours + minutes / 60;
    const activity = activitiesData.find((act) => act.motion === selectedMotion);

    if (activity) {
      const calories = activity.met * stats.currentWeight * totalTime;
      setCaloriesBurned(calories);
    }
  };

  
  const handleLogActivity = () => {
    if (caloriesBurned === 0 || !selectedActivity || !selectedMotion) {
      console.error('Missing activity data or calories not calculated');
      return;
    }

    const totalTime = hours + minutes / 60;
    const loggedActivity = {
      id: Date.now(),
      activity: selectedActivity,
      motion: selectedMotion,
      calories: caloriesBurned,
      time: totalTime,
    
      
      date: new Date().toLocaleDateString(undefined, {
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
      }),
    
      
      timestamp: new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString(),
    };
    
    
    const existingLogs = JSON.parse(localStorage.getItem('loggedActivities')) || [];
    existingLogs.push(loggedActivity);
    localStorage.setItem('loggedActivities', JSON.stringify(existingLogs));

    
    updateActivities(existingLogs);

    
    setSelectedActivity('');
    setSelectedMotion('');
    setHours(0);
    setMinutes(0);
    setCaloriesBurned(0);
  };

  const uniqueActivities = [...new Set(activitiesData.map((act) => act.activity))];

  return (
    <div className="log-activity-container">
      <h2>Log Your Activity</h2>
      <div className="form-container">
        <label>
          Activity:
          <select
            value={selectedActivity}
            onChange={(e) => {
              setSelectedActivity(e.target.value);
              setSelectedMotion(''); 
            }}
          >
            <option value="">Select an activity</option>
            {uniqueActivities.map((activity) => (
              <option key={activity} value={activity}>
                {activity}
              </option>
            ))}
          </select>
        </label>

        <label>
          Motion:
          <select
            value={selectedMotion}
            onChange={(e) => setSelectedMotion(e.target.value)}
            disabled={!selectedActivity}
          >
            <option value="">Select a motion</option>
            {activitiesData
              .filter((act) => act.activity === selectedActivity)
              .map((act) => (
                <option key={act.id} value={act.motion}>
                  {act.motion}
                </option>
              ))}
          </select>
        </label>

        <label>
          Hours:
          <input
            type="number"
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
            min="0"
          />
        </label>

        <label>
          Minutes:
          <input
            type="number"
            value={minutes}
            onChange={(e) => setMinutes(Number(e.target.value))}
            min="0"
            max="59"
          />
        </label>

        <button onClick={handleCalculate} disabled={!selectedActivity || !selectedMotion}>
          Calculate Calories Burned
        </button>
        <button
          onClick={handleLogActivity}
          disabled={caloriesBurned === 0 || !selectedActivity || !selectedMotion}
        >
          Log Activity
        </button>
      </div>
      {caloriesBurned > 0 && <h3>Calories Burned: {caloriesBurned.toFixed(2)}</h3>}
    </div>
  );
};

export default LogActivity;
