// Path: strateger-react/src/components/Diary/DiaryCalendar.js

import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './DiaryCalendar.css'; // Importar estilos personalizados

const DiaryCalendar = ({ results }) => {
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const result = results.find((r) => new Date(r.date).toDateString() === date.toDateString());
      if (result) {
        return (
          <div className="text-xs text-center font-semibold">
            <span>{result.pnl}</span>
          </div>
        );
      }
    }
    return null;
  };

  return (
    <div className="flex justify-center">
      <Calendar
        tileContent={tileContent}
        className="react-calendar"
        nextLabel=">"
        prevLabel="<"
        next2Label=">>"
        prev2Label="<<"
        tileClassName={({ date, view }) =>
          view === 'month' && results.some(r => new Date(r.date).toDateString() === date.toDateString())
            ? 'tile-with-results'
            : 'tile-without-results'
        }
      />
    </div>
  );
};

export default DiaryCalendar;
