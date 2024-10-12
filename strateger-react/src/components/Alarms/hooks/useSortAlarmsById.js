//Path: src/components/Alarms/hooks/useSortAlarmsById.js

import { useState, useEffect } from 'react';

const useSortAlarmsById = (viewType, alarms, filteredByIntervalAlarms, filteredByIntervalAndTypeAlarms, filteredByClickAlarms) => {
  const [sortedAlarms, setSortedAlarms] = useState([]);

  useEffect(() => {
    let listToSort = [];
    
    switch (viewType) {
      case 'filteredByIntervalAlarms':        
        listToSort = filteredByIntervalAlarms;        
        break;
      case 'filteredByClickAlarms':        
        listToSort = filteredByClickAlarms;
        break;
      case 'filteredByIntervalAndTypeAlarms':        
        listToSort = filteredByIntervalAndTypeAlarms;
        break;
      default:        
        listToSort = alarms;
    }
    const sortedList = [...listToSort].sort((a, b) => b.id - a.id);
    setSortedAlarms(sortedList);
  }, [viewType, alarms, filteredByIntervalAlarms, filteredByIntervalAndTypeAlarms, filteredByClickAlarms]);

  return sortedAlarms;
};

export default useSortAlarmsById;
