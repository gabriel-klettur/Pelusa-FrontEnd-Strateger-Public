// Path: src/components/Alarms/containers/AlarmFiltersPanelContainer.jsx

import { useDispatch, useSelector } from 'react-redux';

import {
  selectAlarmsData,
  selectFilteredByOptionsAlarms,
  setFilteredByOptions,
} from '../../../redux/alarm';

import FiltersMenu from '../components/AlarmFiltersPanel/FiltersMenu/FiltersMenu';

const AlarmFiltersPanelContainer = () => {
  const dispatch = useDispatch();
  const alarms = useSelector(selectAlarmsData);
  const filteredAlarms = useSelector(selectFilteredByOptionsAlarms);

  const uniqueStrategies = [...new Set(alarms.map((alarm) => alarm.Strategy))];
  const uniqueTickers = [...new Set(alarms.map((alarm) => alarm.Ticker))];

  const handleApplyFilters = (filters) => {
    const { intervals, ordersType, strategies, tickers } = filters;

    const newFilteredAlarms = alarms.filter((alarm) => {
      const matchesInterval = intervals[alarm.Temporalidad] || false;
      const matchesOrderType = ordersType[alarm.Order] || false;
      const matchesStrategy = strategies[alarm.Strategy] || false;
      const matchesTicker = tickers[alarm.Ticker] || false;

      console.log('matchesInterval', matchesInterval);
      console.log('matchesOrderType', matchesOrderType);
      console.log('matchesStrategy', matchesStrategy);
      console.log('matchesTicker', matchesTicker);

      return matchesInterval || matchesOrderType || matchesStrategy || matchesTicker;
    });

    dispatch(setFilteredByOptions(newFilteredAlarms));
  };

  const handleClearFilters = () => {
    dispatch(setFilteredByOptions());
  };

  console.log('filteredAlarms', filteredAlarms);

  return (
    <div className="flex space-x-12">
      <div>
        <FiltersMenu
          onApplyFilters={handleApplyFilters}
          onClear={handleClearFilters}
          uniqueStrategies={uniqueStrategies}
          uniqueTickers={uniqueTickers}
        />
      </div>
    </div>
  );
};

export default AlarmFiltersPanelContainer;
