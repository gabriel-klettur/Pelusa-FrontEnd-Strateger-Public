// Path: src/components/Alarms/containers/AlarmFiltersPanelContainer.jsx

import { useDispatch, useSelector } from 'react-redux';

import {
  selectAlarmsData,  
  setFilteredByOptions,
} from '../../../redux/alarm';

import FiltersMenu from '../components/AlarmFiltersPanel/FiltersMenu/FiltersMenu';

const AlarmFiltersPanelContainer = () => {
  const dispatch = useDispatch();
  const alarms = useSelector(selectAlarmsData);  

  const uniqueStrategies = [...new Set(alarms.map((alarm) => alarm.Strategy))];
  const uniqueTickers = [...new Set(alarms.map((alarm) => alarm.Ticker))];
  

  //!------------------------------------------------------//
  //!----------------------- HANDLERS ----------------------//
  //!------------------------------------------------------//

  // Apply filters to the alarms data and return the filtered alarms
  const handleApplyFilters = (filters) => {    

    const newFilteredAlarms = alarms.filter((alarm) => {
      let filtersResults = []; 
  
      const intervals = Object.keys(filters.intervals).filter(key => filters.intervals[key]);
      const ordersType = Object.keys(filters.ordersType).filter(key => filters.ordersType[key]);
      const strategies = Object.keys(filters.strategies).filter(key => filters.strategies[key]);
      const tickers = Object.keys(filters.tickers).filter(key => filters.tickers[key]);
        
      if (intervals.length > 0) {
          const foundIntervalFilter = intervals.some(interval => alarm.Interval === interval);
          filtersResults.push(foundIntervalFilter);
      }
        
      if (ordersType.length > 0) {
          const foundOrderTypeFilter = ordersType.some(orderType => 
              alarm.Order.replace(/Order/i, '').trim().toLowerCase() === orderType.toLowerCase()
          );
          filtersResults.push(foundOrderTypeFilter);
      }
        
      if (strategies.length > 0) {
          const foundStrategyFilter = strategies.some(strategy => alarm.Strategy === strategy);
          filtersResults.push(foundStrategyFilter);
      }
        
      if (tickers.length > 0) {
          const foundTickerFilter = tickers.some(ticker => alarm.Ticker === ticker);
          filtersResults.push(foundTickerFilter);
      }
        
      const totalResult = filtersResults.every(result => result === true);      
  
      return totalResult; 
    });

    dispatch(setFilteredByOptions(newFilteredAlarms));  // Set the filtered alarms in the redux store
  };

  const handleClearFilters = () => {
    dispatch(setFilteredByOptions());
  };


  //!-------------------------------------------------------//
  //!----------------------- RENDER ------------------------//
  //!-------------------------------------------------------//

  return (
    <div className="flex space-x-12">
      <div data-testid="alarm-filters-panel-container">
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
