import React from 'react';

const AlarmItem = ({ alarm, onSelect, isSelected }) => {
  return (
    <div
      className={`p-2 border ${isSelected ? 'border-blue-500' : 'border-gray-300'} rounded-md cursor-pointer`}
      onClick={() => onSelect(alarm.id)}
    >
      <div><strong>Ticker:</strong> {alarm.Ticker}</div>
      <div><strong>Temporalidad:</strong> {alarm.Temporalidad}</div>
      <div><strong>Quantity:</strong> {alarm.Quantity}</div>
      <div><strong>Exit Price Alert:</strong> {alarm.Exit_Price_Alert}</div>
      <div><strong>Time Alert:</strong> {alarm.Time_Alert}</div>
      <div><strong>Order:</strong> {alarm.Order}</div>
      <div><strong>Strategy:</strong> {alarm.Strategy}</div>
    </div>
  );
};

export default AlarmItem;
