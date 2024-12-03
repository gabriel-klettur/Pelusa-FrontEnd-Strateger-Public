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

    console.log('--------------------------------')
    console.log('alarms', alarms);
    console.log('intervals', intervals);
    console.log('ordersType', ordersType);
    console.log('strategies', strategies);
    console.log('tickers', tickers);    
    console.log('--------------------------------')

    const newFilteredAlarms = alarms.filter((alarm) => {
      let foundIntervalFilter = false;
      let foundOrderTypeFilter = false;
      let foundStrategyFilter = false;
      let foundTickerFilter = false;
      let totalResult = false;

      const intervals = Object.keys(filters.intervals).filter(key => filters.intervals[key]);
      const ordersType = Object.keys(filters.ordersType).filter(key => filters.ordersType[key]);
      const strategies = Object.keys(filters.strategies).filter(key => filters.strategies[key]);
      const tickers = Object.keys(filters.tickers).filter(key => filters.tickers[key]);      
      
      intervals.forEach(interval => {        
        if (alarm.Temporalidad === interval) {
          foundIntervalFilter = true;                    
        }
      });

      ordersType.forEach(orderType => {                
        if (alarm.Order.replace(/Order/i, '').trim() === orderType.toLowerCase()) {          
          foundOrderTypeFilter = true;          
        }
      });

      strategies.forEach(strategy => {        
        if (alarm.Strategy === strategy) {
          foundStrategyFilter = true;          
        }
      });

      tickers.forEach(ticker => {        
        if (alarm.Ticker === ticker) {
          foundTickerFilter = true;          
        }
      });
/*
      console.log('foundIntervalFilter', foundIntervalFilter);
      console.log('foundOrderTypeFilter', foundOrderTypeFilter);
      console.log('foundStrategyFilter', foundStrategyFilter);
      console.log('foundTickerFilter', foundTickerFilter);
*/
      totalResult = foundIntervalFilter || foundOrderTypeFilter || foundStrategyFilter || foundTickerFilter;
      
  
      return totalResult; // Solo incluye la alarma si pasa todos los filtros.
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
