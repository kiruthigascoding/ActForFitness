import React, { useContext, useEffect, useState } from 'react';
import { StatsContext } from '../StatsContext';
import ProgressDial from './ProgressDial'; 

const ProgressBar = ({ totalSteps, totalActivityCalories }) => {
  const { stats } = useContext(StatsContext);
  const [stepProgress, setStepProgress] = useState(0);
  const [caloriesProgress, setCaloriesProgress] = useState(0);
  const [weightProgress, setWeightProgress] = useState(0);

  useEffect(() => {
    if (stats) {
      
      const stepsPercentage = (totalSteps / 10000) * 100;
      setStepProgress(stepsPercentage);

      
      const totalCaloriesBurned = totalActivityCalories + (totalSteps * 0.04);
      const caloriesPercentage = (totalCaloriesBurned / 2500) * 100;
      setCaloriesProgress(caloriesPercentage);

    
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
      <ProgressDial label="Calories" unit="Cals" value={totalActivityCalories.toFixed(2)} maxValue={2500} />
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
