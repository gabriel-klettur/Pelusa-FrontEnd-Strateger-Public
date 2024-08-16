//Path: strateger-react/src/components/Diary/OrderItem.js

import React, { useState } from 'react';

const OrderItem = ({ order, onSelect, isSelected, onAdd }) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="border-b border-african_violet-300 py-2">
      <div className="flex justify-between items-center">
        <div className="cursor-pointer" onClick={handleToggle}>
          <span className={isSelected ? 'font-bold' : ''}>[{order.symbol}]-[{new Date(order.time).toLocaleString()}]-[{order.avgPrice}]</span>
        </div>
        <button
          type="button" // Asegúrate de que el tipo sea "button"
          className="ml-4 bg-african_violet-400 hover:bg-african_violet-700 text-white px-2 py-1 rounded"   
          onClick={() => onAdd("Order:"+order.orderId)}
        >
          Agregar
        </button>
      </div>
      {expanded && (
        <div className="mt-2">
          <div><strong>Side:</strong> {order.side}</div>
          <div><strong>Position Side:</strong> {order.positionSide}</div>
          <div><strong>Type:</strong> {order.type}</div>
          <div><strong>Orig Qty:</strong> {order.origQty}</div>
          <div><strong>Price:</strong> {order.price}</div>
          <div><strong>Executed Qty:</strong> {order.executedQty}</div>
          <div><strong>Avg Price:</strong> {order.avgPrice}</div>
          <div><strong>Cum Quote:</strong> {order.cumQuote}</div>
          <div><strong>Status:</strong> {order.status}</div>
          <div><strong>Time:</strong> {new Date(order.time).toLocaleString()}</div>
        </div>
      )}
    </div>
  );
};

export default OrderItem;
