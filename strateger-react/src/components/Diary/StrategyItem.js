import React from 'react';

const StrategyItem = ({ strategy, onSelect, isSelected }) => {
  return (
    <div
      className={`p-2 border ${isSelected ? 'border-blue-500' : 'border-gray-300'} rounded-md cursor-pointer`}
      onClick={() => onSelect(strategy.id)}
    >
      <div><strong>Name:</strong> {strategy.name}</div>
      <div><strong>Ticker:</strong> {strategy.ticker}</div>
      <div><strong>On Start Date:</strong> {strategy.onStartDate}</div>
      <div><strong>Long Entry Order:</strong> {strategy.longEntryOrder}</div>
      <div><strong>Long Close Order:</strong> {strategy.longCloseOrder}</div>
      <div><strong>Long Leverage:</strong> {strategy.longLeverage}</div>
      <div><strong>Long Quantity:</strong> {strategy.longQuantity}</div>
    </div>
  );
};

export default StrategyItem;
