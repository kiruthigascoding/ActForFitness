import React, { useContext, useEffect, useState } from 'react';
import { StatsContext } from '../StatsContext';

const MyStats = () => {
  const { updateStats } = useContext(StatsContext);
  const [stats, setStats] = useState({
    name: '',
    height: '',
    age: '',
    currentWeight: '',
    goalWeight: '',
    startingWeight: 0,
  });


  useEffect(() => {
    const storedStats = JSON.parse(localStorage.getItem('userStats'));
    if (storedStats) {
      setStats(storedStats);
    }
  }, []);


  useEffect(() => {
    localStorage.setItem('userStats', JSON.stringify(stats));
  }, [stats]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateStats(stats); 
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStats((prevStats) => ({
      ...prevStats,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>My Stats</h2>
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

      <h3>Your Stats:</h3>
      <p>Name: {stats.name}</p>
      <p>Height: {stats.height} cm</p>
      <p>Age: {stats.age} years</p>
      <p>Current Weight: {stats.currentWeight} kg</p>
      <p>Goal Weight: {stats.goalWeight} kg</p>
      <p>Starting Weight: {stats.startingWeight} kg</p>
    </div>
  );
};

export default MyStats;
