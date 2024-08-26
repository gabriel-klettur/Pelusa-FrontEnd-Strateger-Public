//Path: src/components/Alarms/hooks/useSortAlarmsById.js

import { useState, useEffect } from 'react';

const useSortAlarmsById = (viewType, alarms, selectedAlarms, allSelectedAlarms) => {
  const [sortedAlarms, setSortedAlarms] = useState([]);

  useEffect(() => {
    let listToSort = [];
    switch (viewType) {
      case 'selectedAlarms':
        listToSort = selectedAlarms;
        break;
      case 'allSelectedAlarms':
        listToSort = allSelectedAlarms;
        break;
      default:
        listToSort = alarms;
    }
    const sortedList = [...listToSort].sort((a, b) => b.id - a.id);
    setSortedAlarms(sortedList);
  }, [viewType, alarms, selectedAlarms, allSelectedAlarms]);

  return sortedAlarms;
};

export default useSortAlarmsById;
