// Path: strateger-react/src/components/Oders/components/OrderFiltersPanel/OrderFiltersPanel.js

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  setFiltersUsdtm, setFiltersCoinm, setFiltersSpot, setFiltersStandard,  
          selectFiltersCoinm, selectFiltersSpot, selectFiltersStandard, selectFiltersUsdtm, 
          selectSelectedTab } from 'reduxStore/order';
import FilterButton from './FilterButton';

const sides = ['BUY', 'SELL'];
const symbols = ['BTC-USDT', 'ETH-USDT']; 
const positionSides = ['LONG', 'SHORT'];
const types = ['LIMIT', 'MARKET'];

const OrderFiltersPanel = () => {
  const dispatch = useDispatch();
  const selectedTab = useSelector(selectSelectedTab);

  const filters = useSelector((state) => {
    switch (selectedTab) {
      case 'usdtm':
        return selectFiltersUsdtm(state);
      case 'coinm':
        return selectFiltersCoinm(state);
      case 'spot':
        return selectFiltersSpot(state);
      case 'standard':
        return selectFiltersStandard(state);
      default:
        return {};
    }
  });

  const setFilters = (updatedFilters) => {
    switch (selectedTab) {
      case 'usdtm':
        dispatch(setFiltersUsdtm(updatedFilters));
        break;
      case 'coinm':
        dispatch(setFiltersCoinm(updatedFilters));
        break;
      case 'spot':
        dispatch(setFiltersSpot(updatedFilters));
        break;
      case 'standard':
        dispatch(setFiltersStandard(updatedFilters));
        break;
      default:
        break;
    }
};


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
    
    setFilters(updatedFilters);
  };

  return (
    <div className="h-full flex justify-between align-center text-center">
      <div className="h-full w-full">
        {sides.map((side, index) => (
          <div className="h-1/2" key={`side-${index}`}>
            <FilterButton
              label={side}
              isActive={filters.Side.includes(side)}
              onClick={() => toggleFilter('Side', side)}            
            />
          </div>
        ))}
      </div>

      <div className="h-full w-full">
        {symbols.map((symbol, index) => (
          <div className="h-1/2" key={`symbol-${index}`}>
            <FilterButton
              label={symbol}
              isActive={filters.Symbol === symbol}
              onClick={() => toggleFilter('Symbol', symbol)}
            />
          </div>
        ))}
      </div>

      <div className="h-full w-full">
        {positionSides.map((positionSide, index) => (
          <div className="h-1/2" key={`positionSide-${index}`}>
            <FilterButton
              label={positionSide}
              isActive={filters.PositionSide === positionSide}
              onClick={() => toggleFilter('PositionSide', positionSide)}
            />
          </div>
        ))}
      </div>
      
      <div className="h-full w-full">
        {types.map((type, index) => (
          <div className="h-1/2" key={`type-${index}`}>
            <FilterButton
              label={type}
              isActive={filters.Type === type}
              onClick={() => toggleFilter('Type', type)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderFiltersPanel;
