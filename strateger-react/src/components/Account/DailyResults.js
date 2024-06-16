// Path: strateger-react/src/components/Account/DailyResults.js

import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const DailyResults = ({ results }) => {
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const result = results.find((r) => new Date(r.date).toDateString() === date.toDateString());
      if (result) {
        return (
          <div>
            <span>{result.pnl}</span>
          </div>
        );
      }
    }
    return null;
  };

  return (
    <div className="mb-4">
      <h3 className="text-xl font-bold mb-2">Daily Results</h3>
      <Calendar tileContent={tileContent} />
    </div>
  );
};

export default DailyResults;
