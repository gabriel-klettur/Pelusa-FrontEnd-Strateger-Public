// Path: strateger-react/src/components/Orders/ToolOrderBar/ToolOrderBar.js

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters, selectFilters } from '../../../../redux/slices/orderSlice';
import FilterButton from './FilterButton';

const sides = ['BUY', 'SELL'];
const symbols = ['BTC-USDT', 'ETH-USDT']; // Añadir todos los símbolos que necesites
const positionSides = ['LONG', 'SHORT'];
const types = ['LIMIT', 'MARKET'];

const OrderFiltersPanel = () => {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);

  const toggleFilter = (filterType, value) => {
    const updatedFilters = {
      ...filters,
      [filterType]: filters[filterType] === value ? '' : value,
    };

    if (filterType === 'Side') {
      updatedFilters.Side = filters.Side.includes(value)
        ? filters.Side.filter((item) => item !== value)
        : [...filters.Side, value];
    }

    dispatch(setFilters(updatedFilters));
  };

  return (
    <div className="grid grid-cols-8 gap-4 bg-african_violet-300 text-pomp_and_power-400">

      <div className="col-span-2 border-2 border-african_violet-500 flex flex-wrap justify-center items-center">
        {sides.map((side) => (
          <FilterButton
            key={side}
            label={side}
            isActive={filters.Side.includes(side)}
            onClick={() => toggleFilter('Side', side)}            
          />
        ))}
      </div>
      <div className="col-span-2 border-2 border-african_violet-500 flex flex-wrap justify-center items-center">
        {symbols.map((symbol) => (
          <FilterButton
            key={symbol}
            label={symbol}
            isActive={filters.Symbol === symbol}
            onClick={() => toggleFilter('Symbol', symbol)}
          />
        ))}
      </div>
      <div className="col-span-2 border-2 border-african_violet-500 flex flex-wrap justify-center items-center">
        {positionSides.map((positionSide) => (
          <FilterButton
            key={positionSide}
            label={positionSide}
            isActive={filters.PositionSide === positionSide}
            onClick={() => toggleFilter('PositionSide', positionSide)}
          />
        ))}
      </div>
      <div className="col-span-2 border-2 border-african_violet-500 flex flex-wrap justify-center items-center">
        {types.map((type) => (
          <FilterButton
            key={type}
            label={type}
            isActive={filters.Type === type}
            onClick={() => toggleFilter('Type', type)}
          />
        ))}
      </div>
    </div>
  );
};

export default OrderFiltersPanel;
