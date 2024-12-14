import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { setActiveTab } from '../../../../../redux/interaction';
import { setActiveRadarDataset } from '../../../../../redux/interaction';

import FilterIcon from '../../../assets/filter_icon.svg';
import FilterSection from './FilterSection';

import useClickOutside from './hooks/useClickOutside';


/**
 * TODO - FiltersMenu component renders a filter menu with various filter options such as intervals, order types, strategies, and tickers.
 * TODO - It allows users to apply or clear filters and handles the state of the filters.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.onApplyFilters - Callback function to apply the selected filters.
 * @param {Function} props.onClear - Callback function to clear the selected filters.
 * @param {Array<string>} props.uniqueStrategies - Array of unique strategy names.
 * @param {Array<string>} props.uniqueTickers - Array of unique ticker names.
 */
const FiltersMenu = ({ onApplyFilters, onClear, uniqueStrategies, uniqueTickers }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);  // State to handle whether the menu is open or not
  const menuRef = useRef(null);                 // Ref to reference the menu DOM element

  const initializeState = (keys) => keys.reduce((acc, key) => ({ ...acc, [key]: false }), {});

  const [intervals, setIntervals] = useState(initializeState(['1m', '5m', '15m', '30m', '1h', '4h', 'D', 'W', 'M']));
  const [ordersType, setOrderType] = useState(initializeState(['Open Long', 'Open Short', 'Close Long', 'Close Short']));
  const [strategies, setStrategies] = useState({});
  const [tickers, setTickers] = useState({});

  //!------------------------------------------------------//
  //!----------------------- HOOKS ------------------------//
  //!------------------------------------------------------//
  // Update the strategies and tickers state when the uniqueStrategies and uniqueTickers props change
  useEffect(() => {  
    setStrategies((prevStrategies) =>
      uniqueStrategies.reduce((acc, strategy) => {
        acc[strategy] = prevStrategies[strategy] ?? false;
        return acc;
      }, {})
    );

    setTickers((prevTickers) =>
      uniqueTickers.reduce((acc, ticker) => {
        acc[ticker] = prevTickers[ticker] ?? false;
        return acc;
      }, {})
    );

  }, [uniqueStrategies, uniqueTickers]);


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
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="px-4 py-2 flex items-center space-x-2 text-white rounded-sm hover:bg-african_violet-400"
      >
        <img
          src={FilterIcon}
          alt="filter icon"
          className="w-6 h-6 text-african_violet-200"
        />
        <span>Filters</span>
      </button>

      {/* --------------------------------------- Content of the menu ---------------------------------------*/}
      {isOpen && (
        <div className="absolute right-0 w-[600px] bg-african_violet-100/95 shadow-lg rounded-sm p-4 space-y-4 z-50">

          {filterSectionsConfig.map((section) => (
            <div key={section.title}>
              <FilterSection                
                title={section.title}
                items={section.items}
                onChange={(key) => handleCheckboxChange(section.stateUpdater, key)}
                gridCols={section.gridCols}
              />
              <hr />          
            </div>
          ))}                      
          
          {/* ----------------------------------- Apply and Clear buttons ---------------------------------*/}
          <div className="flex justify-between mt-4">
            <button
              onClick={handleApply}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Apply
            </button>
            <button
              onClick={handleClear}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FiltersMenu;
