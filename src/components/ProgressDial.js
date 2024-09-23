import React from 'react';


export default function ProgressDial({ label, unit, value, maxValue }) {
  const radius = 40; 
  const circumference = 2 * Math.PI * radius; 
  const percent = Math.min((value / maxValue) * 100, 100); 
  const dashoffset = circumference - (circumference * percent) / 100; 

  return (
    <div className="card">
      <div className="percent">
        <svg width="140" height="140">
          <circle cx="70" cy="70" r={radius} className="background-circle"></circle>
          <circle
            cx="70"
            cy="70"
            r={radius}
            className="progress-circle"
            style={{
              strokeDasharray: `${circumference} ${circumference}`, 
              strokeDashoffset: dashoffset, 
            }}
          ></circle>
          <text x="70" y="75" className="progress-text" textAnchor="middle" dominantBaseline="middle">
            {value <= 0 ? 0 : value > 0 && value < maxValue ? value : maxValue}
            <tspan className="unit-text">{unit}</tspan>
          </text>
        </svg>
      </div>
      <div className="title">
        <h2>{label}</h2>
      </div>
    </div>
  );
}
