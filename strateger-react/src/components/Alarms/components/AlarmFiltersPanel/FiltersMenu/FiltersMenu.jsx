import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { setActiveTab } from '../../../../../redux/interaction';
import { setActiveRadarDataset } from '../../../../../redux/interaction';

import FilterIcon from '../../../assets/filter_icon.svg';
import FilterSection from './FilterSection';




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

  const [intervals, setIntervals] = useState({
    '1m': false,
    '5m': false,
    '15m': false,
    '30m': false,
    '1h': false,
    '4h': false,
    D: false,
    W: false,
    M: false,
  });
  const [ordersType, setOrderType] = useState({
    'Open Long': false,
    'Open Short': false,
    'Close Long': false,
    'Close Short': false,
  });
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


  // Handle click outside the menu to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false); // Cerrar el menú si el clic ocurre fuera de él
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
    setIntervals({
      '1m': false,
      '5m': false,
      '15m': false,
      '30m': false,
      '1h': false,
      '4h': false,
      D: false,
      W: false,
      M: false,
    });

    setOrderType({
      'Open Long': false,
      'Open Short': false,
      'Close Long': false,
      'Close Short': false,
    });

    setStrategies(
      uniqueStrategies.reduce((acc, strategy) => {
        acc[strategy] = false;
        return acc;
      }, {})
    );

    setTickers(
      uniqueTickers.reduce((acc, ticker) => {
        acc[ticker] = false;
        return acc;
      }, {})
    );

    onClear();    
  };

  //!------------------------------------------------------//
  //!----------------------- RENDER -----------------------//
  //!------------------------------------------------------//

  return (
    <div className="relative" ref={menuRef}>
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
          <FilterSection
            title="Intervals"
            items={intervals}
            onChange={(key) => handleCheckboxChange(setIntervals, key)}
            gridCols={3}
          />
          <hr />
          <FilterSection
            title="Order Types"
            items={ordersType}
            onChange={(key) => handleCheckboxChange(setOrderType, key)}
            gridCols={2}
          />
          <hr />
          <FilterSection
            title="Strategies"
            items={strategies}
            onChange={(key) => handleCheckboxChange(setStrategies, key)}
            gridCols={2}
          />
          <hr />
          <FilterSection
            title="Tickers"
            items={tickers}
            onChange={(key) => handleCheckboxChange(setTickers, key)}
            gridCols={2}
          />
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
