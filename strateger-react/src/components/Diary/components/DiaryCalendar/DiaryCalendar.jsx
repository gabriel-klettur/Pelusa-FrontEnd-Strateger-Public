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

  const titleClassName = ({ date, view }) => {
    if (view === 'month') {
      const result = results.find((r) => new Date(r.date).toDateString() === date.toDateString());
      if (result) {
        return 'tile-with-results';
      }
    }
    return 'tile-without-results';
  };

  return (
    <div className="h-full w-full justify-center">
      <Calendar
        tileContent={tileContent}
        className="react-calendar h-full w-full"  // Aplica h-full para que el calendario ocupe todo el espacio
        nextLabel=">"
        prevLabel="<"
        next2Label=">>"
        prev2Label="<<"
        tileClassName={titleClassName}        
      />
    </div>
  );
};

export default DiaryCalendar;
