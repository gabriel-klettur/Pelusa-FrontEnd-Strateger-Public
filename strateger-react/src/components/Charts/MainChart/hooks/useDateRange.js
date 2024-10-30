// src/components/Charts/CandlestickChartChart/hooks/useDateRange.js
import { useState } from 'react';

const useDateRange = (initialStartDate, initialEndDate) => {
  const [startDate, setStartDate] = useState(new Date(initialStartDate));
  const [endDate, setEndDate] = useState(new Date(initialEndDate));

  const handleDateChange = (newStartDate, newEndDate) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  return { startDate, endDate, handleDateChange };
};

export default useDateRange;
