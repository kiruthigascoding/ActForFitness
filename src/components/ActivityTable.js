import React from 'react';


const formatDuration = (time) => {
  const hours = Math.floor(time);
  const minutes = Math.round((time - hours) * 60);
  return `${hours}h ${minutes}m`;
};

const ActivityTable = ({ activityLogs }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Activity</th>
          <th>Duration</th>
          <th>Calories Burned</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {activityLogs.length > 0 ? (
          activityLogs.map((log, index) => (
            <tr key={index}>
              <td>{log.activity}</td>
              <td>{formatDuration(log.time)}</td>
              { }
              <td>{log.calories !== undefined ? log.calories.toFixed(2) : 'N/A'}</td>
              <td>
                {new Date(log.timestamp).toLocaleDateString(undefined, {
                 timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone 
                })}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4">No activities logged for this date.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ActivityTable;
