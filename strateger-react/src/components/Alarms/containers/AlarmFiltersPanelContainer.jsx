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
      let filtersResults = []; // Lista para almacenar resultados de filtros activos.
  
      const intervals = Object.keys(filters.intervals).filter(key => filters.intervals[key]);
      const ordersType = Object.keys(filters.ordersType).filter(key => filters.ordersType[key]);
      const strategies = Object.keys(filters.strategies).filter(key => filters.strategies[key]);
      const tickers = Object.keys(filters.tickers).filter(key => filters.tickers[key]);
  
      // Evaluar Intervalos
      if (intervals.length > 0) {
          const foundIntervalFilter = intervals.some(interval => alarm.Temporalidad === interval);
          filtersResults.push(foundIntervalFilter);
      }
  
      // Evaluar Tipos de Orden
      if (ordersType.length > 0) {
          const foundOrderTypeFilter = ordersType.some(orderType => 
              alarm.Order.replace(/Order/i, '').trim().toLowerCase() === orderType.toLowerCase()
          );
          filtersResults.push(foundOrderTypeFilter);
      }
  
      // Evaluar Estrategias
      if (strategies.length > 0) {
          const foundStrategyFilter = strategies.some(strategy => alarm.Strategy === strategy);
          filtersResults.push(foundStrategyFilter);
      }
  
      // Evaluar Tickers
      if (tickers.length > 0) {
          const foundTickerFilter = tickers.some(ticker => alarm.Ticker === ticker);
          filtersResults.push(foundTickerFilter);
      }
  
      // Calcular el resultado final
      const totalResult = filtersResults.every(result => result === true);
  
      console.log('----------------------------------------------');
      console.log('filtersResults:', filtersResults);
      console.log('totalResult:', totalResult);
  
      return totalResult; // Solo incluye la alarma si pasa todos los filtros activos.
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
