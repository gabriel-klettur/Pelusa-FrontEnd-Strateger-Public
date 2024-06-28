// Path: strateger-react/src/components/TradingViewChart/ToolOrderBar.js

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilteredOrders } from '../../slices/orderSlice';

const sides = ['BUY', 'SELL'];
const symbols = ['BTC-USDT', 'ETH-USDT']; // Añadir todos los símbolos que necesites
const positionSides = ['LONG', 'SHORT'];
const types = ['LIMIT', 'MARKET'];

const ToolOrderBar = () => {
  const dispatch = useDispatch();
  const filteredOrders = useSelector(state => state.orders.filteredOrders);

  const toggleFilter = (filterType, value) => {
    // Crear una copia de filteredOrders
    const updatedFilters = {
      ...filteredOrders,
      Side: [...filteredOrders.Side],
    };

    if (filterType === 'Side') {
      if (updatedFilters.Side.includes(value)) {
        updatedFilters.Side = updatedFilters.Side.filter(item => item !== value);
      } else {
        updatedFilters.Side.push(value);
      }
    } else {
      updatedFilters[filterType] = updatedFilters[filterType] === value ? '' : value;
    }

    dispatch(setFilteredOrders(updatedFilters));
  };

  return (
    <div className="grid grid-cols-10 gap-4">
      <div className="col-span-2 border-2 border-blue-500 flex flex-wrap justify-center items-center">
        {sides.map(side => (
          <button 
            key={side} 
            className={`px-4 py-2 rounded m-1 ${filteredOrders.Side.includes(side) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
            onClick={() => toggleFilter('Side', side)}
          >
            {side}
          </button>
        ))}
      </div>
      <div className="col-span-2 border-2 border-green-500 flex flex-wrap justify-center items-center">
        {symbols.map(symbol => (
          <button 
            key={symbol} 
            className={`px-4 py-2 rounded m-1 ${filteredOrders.Symbol === symbol ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
            onClick={() => toggleFilter('Symbol', symbol)}
          >
            {symbol}
          </button>
        ))}
      </div>
      <div className="col-span-3 border-2 border-red-500 flex flex-wrap justify-center items-center">
        {positionSides.map(positionSide => (
          <button 
            key={positionSide} 
            className={`px-4 py-2 rounded m-1 ${filteredOrders.PositionSide === positionSide ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
            onClick={() => toggleFilter('PositionSide', positionSide)}
          >
            {positionSide}
          </button>
        ))}
      </div>
      <div className="col-span-3 border-2 border-orange-500 flex flex-wrap justify-center items-center">
        {types.map(type => (
          <button 
            key={type} 
            className={`px-4 py-2 rounded m-1 ${filteredOrders.Type === type ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
            onClick={() => toggleFilter('Type', type)}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ToolOrderBar;
