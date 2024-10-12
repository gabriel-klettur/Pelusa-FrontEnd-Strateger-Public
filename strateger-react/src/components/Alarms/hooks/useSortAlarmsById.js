//Path: src/components/Alarms/hooks/useSortAlarmsById.js

import { useState, useEffect } from 'react';

const useSortAlarmsById = (viewType, alarms, filteredByIntervalAlarms, filteredByIntervalAndTypeAlarms, filteredByClickAlarms) => {
  const [sortedAlarms, setSortedAlarms] = useState([]);

  useEffect(() => {
    let listToUse = [];
    
    switch (viewType) {
      case 'filteredByIntervalAlarms':        
        listToUse = filteredByIntervalAlarms;        
        break;
      case 'filteredByClickAlarms':        
        listToUse = filteredByClickAlarms;
        break;
      case 'filteredByIntervalAndTypeAlarms':        
        listToUse = filteredByIntervalAndTypeAlarms;
        break;
      default:        
        listToUse = alarms;
    }
    
    setSortedAlarms(listToUse);
  }, [viewType, alarms, filteredByIntervalAlarms, filteredByIntervalAndTypeAlarms, filteredByClickAlarms]);

  return sortedAlarms;
};

export default useSortAlarmsById;
