//Path: src/components/Alarms/hooks/useSortAlarmsById.js

import { useState, useEffect } from 'react';

const useSortAlarmsById = (viewType, alarms, filteredByIntervalAlarms, filteredByIntervalAndTypeAlarms) => {
  const [sortedAlarms, setSortedAlarms] = useState([]);

  useEffect(() => {
    let listToSort = [];
    switch (viewType) {
      case 'filteredByIntervalAlarms':
        listToSort = filteredByIntervalAlarms;
        break;
      case 'filteredByIntervalAndTypeAlarms':
        listToSort = filteredByIntervalAndTypeAlarms;
        break;
      default:
        listToSort = alarms;
    }
    const sortedList = [...listToSort].sort((a, b) => b.id - a.id);
    setSortedAlarms(sortedList);
  }, [viewType, alarms, filteredByIntervalAlarms, filteredByIntervalAndTypeAlarms]);

  return sortedAlarms;
};

export default useSortAlarmsById;
