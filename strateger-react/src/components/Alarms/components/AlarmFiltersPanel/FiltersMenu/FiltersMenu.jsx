import { useState, useEffect } from 'react';
import { Menu, MenuButton, MenuItems } from '@headlessui/react';

import FilterIcon from '../../../assets/filter_icon.svg';
import FilterSection from './FilterSection';

const FiltersMenu = ({ onApplyFilters, onClear, uniqueStrategies, uniqueTickers }) => {
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

  useEffect(() => {
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
  }, [uniqueStrategies, uniqueTickers]);

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow; // Guardar estilo original
    document.body.style.overflow = 'auto'; // Asegurar que el scroll esté habilitado

    return () => {
      document.body.style.overflow = originalStyle; // Restaurar cuando el menú se cierre
    };
  }, []);

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
    onApplyFilters(filters); // Pasar un único objeto con todos los estados
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

  return (
    <Menu as="div" className="">
      <MenuButton className="px-4 py-2 flex items-center space-x-2 text-white rounded-sm hover:bg-african_violet-400">
        <img
          src={FilterIcon}
          alt="filter icon"
          className="w-6 h-6 text-african_violet-200"
        />
        <span>Filters</span>
      </MenuButton>
      <MenuItems 
        className="absolute right-0 w-70 bg-african_violet-100/95 shadow-lg rounded-sm p-4 space-y-4 z-50"
      >            
        <FilterSection
          title="Intervals"
          items={intervals}
          onChange={(key) => handleCheckboxChange(setIntervals, key)}
          gridCols={3}
        />
        <hr/>
        <FilterSection
          title="Order Types"
          items={ordersType}
          onChange={(key) => handleCheckboxChange(setOrderType, key)}
          gridCols={2}
        />
        <hr/>
        <FilterSection
          title="Strategies"
          items={strategies}
          onChange={(key) => handleCheckboxChange(setStrategies, key)}
          gridCols={2}
        />
        <hr/>
        <FilterSection
          title="Tickers"
          items={tickers}
          onChange={(key) => handleCheckboxChange(setTickers, key)}
          gridCols={2}
        />
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
            Clean
          </button>
        </div>
      </MenuItems>
    </Menu>
  );
};

export default FiltersMenu;
