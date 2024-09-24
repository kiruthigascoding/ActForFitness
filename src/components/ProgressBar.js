import React, { useContext, useEffect, useState } from 'react'; 
import { StatsContext } from '../StatsContext';
import ProgressDial from './ProgressDial'; 

const ProgressBar = ({ totalSteps, totalActivityCalories }) => {
  const { stats } = useContext(StatsContext);
 
  const [weightProgress, setWeightProgress] = useState(0);
  const [totalCaloriesBurned, setTotalCaloriesBurned] = useState(0);

  useEffect(() => {
    if (stats) {
      
     
      const totalCalories = totalActivityCalories + (totalSteps * 0.04);
      setTotalCaloriesBurned(totalCalories);  
     

      const startingWeight = stats.startingWeight || 0;
      const currentWeight = stats.currentWeight || 0;
      const goalWeight = stats.goalWeight || 0;

      const totalWeightToLose = startingWeight - goalWeight;
      const weightLost = startingWeight - currentWeight;

      let weightPercentage = 0;
      if (totalWeightToLose > 0) {
        weightPercentage = (weightLost / totalWeightToLose) * 100;
      } else if (currentWeight <= goalWeight) {
        weightPercentage = 100; 
      }

      setWeightProgress(weightPercentage);
    }
  }, [totalSteps, totalActivityCalories, stats]);

  return (
    <div className="progress-panel">
      <ProgressDial label="Steps" unit="Steps" value={totalSteps} maxValue={10000} />
      <ProgressDial label="Calories" unit="Cals" value={totalCaloriesBurned.toFixed(2)} maxValue={2500} /> 
      <ProgressDial 
        label="Goal" 
        unit="%" 
        value={weightProgress.toFixed(2)} 
        maxValue={100} 
      />
    </div>
  );
};

export default ProgressBar;
