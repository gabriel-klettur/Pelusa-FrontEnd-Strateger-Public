// Path: strateger-react/src/components/Account/DailyResults.js

import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const DiaryCalendar = ({ results }) => {
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
    <div>      
      <Calendar tileContent={tileContent} />
    </div>
  );
};

export default DiaryCalendar;
