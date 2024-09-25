import React, { useContext, useEffect} from 'react';
import { StatsContext } from '../StatsContext';

const MyStats = () => {
  const { stats,updateStats } = useContext(StatsContext);
   useEffect(() => {
    
    localStorage.setItem('userStats', JSON.stringify(stats));
  }, [stats]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateStats(stats); 
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    
    const updatedStats = {
      ...stats,
      [name]: value, 
    };
    
    
    updateStats(updatedStats);
  };

  return (
    <div className="stats-container">
  <div className="stats-form">
    <h2>Update Your Stats</h2>
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={stats.name}
          onChange={handleChange}
        />
      </label>
      <label>
        Height (cm):
        <input
          type="number"
          name="height"
          value={stats.height}
          onChange={handleChange}
        />
      </label>
      <label>
        Age:
        <input
          type="number"
          name="age"
          value={stats.age}
          onChange={handleChange}
        />
      </label>
      <label>
        Current Weight (kg):
        <input
          type="number"
          name="currentWeight"
          value={stats.currentWeight}
          onChange={handleChange}
        />
      </label>
      <label>
        Goal Weight (kg):
        <input
          type="number"
          name="goalWeight"
          value={stats.goalWeight}
          onChange={handleChange}
        />
      </label>
      <label>
        Starting Weight (kg):
        <input
          type="number"
          name="startingWeight"
          value={stats.startingWeight}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Update Stats</button>
    </form>
  </div>

  <div className="stats-display">
    <h2>Your Stats</h2>
    <p><strong>Name:</strong> {stats.name}</p>
    <p><strong>Height:</strong> {stats.height} cm</p>
    <p><strong>Age:</strong> {stats.age} years</p>
    <p><strong>Current Weight:</strong> {stats.currentWeight} kg</p>
    <p><strong>Goal Weight:</strong> {stats.goalWeight} kg</p>
    <p><strong>Starting Weight:</strong> {stats.startingWeight} kg</p>
  </div>
</div>

  );
};

export default MyStats;

