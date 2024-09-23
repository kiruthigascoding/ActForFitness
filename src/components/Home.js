import React, { useEffect, useState } from 'react';
import ProgressBar from './ProgressBar';
import ActivityTable from './ActivityTable';

const Home = ({ stats }) => {
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

  useEffect(() => {
    
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
