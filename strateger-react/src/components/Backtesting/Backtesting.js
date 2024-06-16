// Path: strateger-react/src/components/Backtesting/Backtesting.js

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BacktestingForm from './BacktestingForm';
import BacktestingList from './BacktestingList';
import BacktestingResult from './BacktestingResult';
import { addTest } from '../../slices/backtestingSlice';

const Backtesting = () => {
  const tests = useSelector((state) => state.backtesting.tests);
  const dispatch = useDispatch();
  const [selectedTest, setSelectedTest] = useState(null);

  const handleAddTest = (test) => {
    dispatch(addTest(test));
  };

  const handleSelectTest = (test) => {
    setSelectedTest(test);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Backtesting</h2>
      <BacktestingForm onSave={handleAddTest} />
      <BacktestingList tests={tests} onSelect={handleSelectTest} />
      {selectedTest && <BacktestingResult test={selectedTest} />}
    </div>
  );
};

export default Backtesting;
