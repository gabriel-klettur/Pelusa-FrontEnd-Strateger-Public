import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedTab, selectSelectedTab } from './redux/slices/tabSlice';
import { loadSlicesInOrder } from './thunks/loadSlices';
import Header from './UI/Header';
import Body from './UI/Body/Body';
import Footer from './UI/Footer';
import Reloj from './components/common/utils/Reloj';
import useDateRange from './components/Charts/hooks/useDateRange';

const App = () => {
  const dispatch = useDispatch();
  const selectedTab = useSelector(selectSelectedTab);
  const initialTemporalidad = '1d';

  const currentDate = new Date();
  const startDate = new Date();
  startDate.setDate(currentDate.getDate() - 1000);

  const { startDate: selectedStartDate, endDate: selectedEndDate, handleDateChange } = useDateRange(startDate, currentDate);

  useEffect(() => {
    dispatch(loadSlicesInOrder());
  }, [dispatch]);

  const handleButtonClick = (index) => {
    dispatch(setSelectedTab(index));
  };

  return (
    <div className="min-h-screen bg-african_violet-200 text-african_violet-100">
      <Header
        selectedTab={selectedTab}
        initialTemporalidad={initialTemporalidad}
        selectedStartDate={selectedStartDate}
        selectedEndDate={selectedEndDate}
        handleDateChange={handleDateChange}
        handleButtonClick={handleButtonClick}
      />

      <Body
        initialTemporalidad={initialTemporalidad}
        selectedStartDate={selectedStartDate}
        selectedEndDate={selectedEndDate}
        selectedTab={selectedTab}
      />

      <Footer selectedTab={selectedTab} />

      <div className="fixed bottom-4 right-20">
        <Reloj direction="up" />
      </div>
    </div>
  );
};

export default App;
