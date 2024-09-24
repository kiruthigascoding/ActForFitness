import React, { useContext,useEffect, useState } from 'react';
import ProgressBar from './ProgressBar';
import ActivityTable from './ActivityTable';
import { StatsContext } from '../StatsContext';


const Home = ({ stats }) => {
  const { updateStats } = useContext(StatsContext);
  
   const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
      .toISOString()
      .split('T')[0];
    return localDate;
  });
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [totalSteps, setTotalSteps] = useState(0);
  const [totalActivityCalories, setTotalActivityCalories] = useState(0);
  const [isFirstLaunch, setIsFirstLaunch] = useState(false);

  useEffect(() => {
    
  
    const storedStats = JSON.parse(localStorage.getItem('userStats'));
    if (!storedStats || !storedStats.currentWeight) {
      setIsFirstLaunch(true);
    } else {
      updateStats(storedStats);
    }

    

    
    const stepLogs = JSON.parse(localStorage.getItem('loggedSteps')) || [];
    const today = new Date().toLocaleDateString(undefined, {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone 
    });

    const stepsToday = stepLogs
      .filter(log => log.date === today)
      .reduce((acc, log) => acc + parseInt(log.steps, 10), 0);

    setTotalSteps(stepsToday);

    
    const activityLogs = JSON.parse(localStorage.getItem('loggedActivities')) || [];
    const caloriesToday = activityLogs
      .filter(log => log.date === today)
      .reduce((acc, log) => acc + parseFloat(log.calories), 0);

    setTotalActivityCalories(caloriesToday);
  }, []);

  useEffect(() => {
    
    const storedActivities = JSON.parse(localStorage.getItem('loggedActivities')) || [];
    const fetchFilteredActivities = () => {
      const todayActivities = storedActivities.filter(activity => {
        if (!activity.timestamp) return false; 
        const activityDate = new Date(activity.timestamp);
        return activityDate.toISOString().split('T')[0] === selectedDate;
      });
      setFilteredActivities(todayActivities);
    };

    fetchFilteredActivities();
  }, [selectedDate]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div className="home-container">
      {isFirstLaunch && (
        <div className="welcome-message">
          <h2>Welcome to ActForFitness!</h2>
          <p>Please update your stats in the <strong>MyStats</strong> tab to personalize your experience.</p>
        </div>
      )}

      <div className="activity-table">
        <h2>Today's Activities</h2>
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          style={{ marginBottom: '20px' }}
        />
        {filteredActivities.length === 0 ? (
          <p>No activities logged for this date.</p>
        ) : (
          <ActivityTable activityLogs={filteredActivities} />
        )}
      </div>
      
      <div className="progress-bar-container">
        <ProgressBar totalSteps={totalSteps} totalActivityCalories={totalActivityCalories} />
      </div>
    </div>
  );
};

export default Home;
