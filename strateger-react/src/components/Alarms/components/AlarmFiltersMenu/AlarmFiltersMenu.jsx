import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { setActiveTab } from 'reduxStore/interaction';
import { setActiveRadarDataset } from 'reduxStore/interaction';


//!------------------------ HOOKS ------------------------------//
import useClickOutside from 'Alarms/components/AlarmFiltersMenu/hooks/useClickOutside';
import useSyncStrategiesAndTickers from 'Alarms/components/AlarmFiltersMenu/hooks/useSyncStrategiesAndTickers';

//!------------------------ COMPONENTS ------------------------------//
import { initializeState } from 'Alarms/components/AlarmFiltersMenu/components/helpers';
import FiltersButton from 'Alarms/components/AlarmFiltersMenu/components/FiltersButton';
import FiltersPanel from 'Alarms/components/AlarmFiltersMenu/components/FiltersPanel';


/**
 * TODO - AlarmFiltersMenu component renders a filter menu with various filter options such as intervals, order types, strategies, and tickers.
 * TODO - It allows users to apply or clear filters and handles the state of the filters.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.onApplyFilters - Callback function to apply the selected filters.
 * @param {Function} props.onClear - Callback function to clear the selected filters.
 * @param {Array<string>} props.uniqueStrategies - Array of unique strategy names.
 * @param {Array<string>} props.uniqueTickers - Array of unique ticker names.
 */
const AlarmAlarmFiltersMenu = ({ onApplyFilters, onClear, uniqueStrategies, uniqueTickers }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);  // State to handle whether the menu is open or not
  const menuRef = useRef(null);                 // Ref to reference the menu DOM element


  const [intervals, setIntervals] = useState(initializeState(['1m', '5m', '15m', '30m', '1h', '4h', 'D', 'W', 'M']));
  const [ordersType, setOrderType] = useState(initializeState(['Open Long', 'Open Short', 'Close Long', 'Close Short']));
  const [strategies, setStrategies] = useState({});
  const [tickers, setTickers] = useState({});

  //!------------------------------------------------------//
  //!----------------------- HOOKS ------------------------//
  //!------------------------------------------------------//

  // Sync the strategies and tickers state with the uniqueStrategies and uniqueTickers props
  useSyncStrategiesAndTickers(uniqueStrategies, uniqueTickers, setStrategies, setTickers);

  // Handle click outside of the menu to close it
  useClickOutside(menuRef, () => setIsOpen(false));

  //!------------------------------------------------------//
  //!----------------------- FUNCTIONS --------------------//
  //!------------------------------------------------------//

  
  const handleCheckboxChange = (stateUpdater, key) => {
    stateUpdater((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleApply = () => {
    const filters = {
      intervals,
      ordersType,
      strategies,
      tickers,
    };
    onApplyFilters(filters);    
    dispatch(setActiveTab({ tabReduxId: 'filtered' }));
    dispatch(setActiveRadarDataset('filtered'))
  };

  const handleClear = () => {
    setIntervals(initializeState(Object.keys(intervals)));
    setOrderType(initializeState(Object.keys(ordersType)));
    setStrategies(initializeState(Object.keys(strategies)));
    setTickers(initializeState(Object.keys(tickers)));
    onClear();
  };

  //!------------------------------------------------------//
  //!----------------------- RENDER -----------------------//
  //!------------------------------------------------------//

  const filterSectionsConfig = [
    {
      title: 'Intervals',
      items: intervals,
      stateUpdater: setIntervals,
      gridCols: 3,
    },
    {
      title: 'Order Types',
      items: ordersType,
      stateUpdater: setOrderType,
      gridCols: 2,
    },
    {
      title: 'Strategies',
      items: strategies,
      stateUpdater: setStrategies,
      gridCols: 2,
    },
    {
      title: 'Tickers',
      items: tickers,
      stateUpdater: setTickers,
      gridCols: 2,
    },
  ];

  return (
    <div className="relative" ref={menuRef} data-testid="filters-menu">
      {/* --------------------------------- Filter Button to open the menu ---------------------------------*/}
      <FiltersButton  setIsOpen={setIsOpen} />

      {/* --------------------------------------- Content of the menu ---------------------------------------*/}
      {isOpen && (
          <FiltersPanel filterSectionsConfig={filterSectionsConfig} handleCheckboxChange={handleCheckboxChange} handleApply={handleApply} handleClear={handleClear} />
      )}
    </div>
  );
};

export default AlarmAlarmFiltersMenu;
