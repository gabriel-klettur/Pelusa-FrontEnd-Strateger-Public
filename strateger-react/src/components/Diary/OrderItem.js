import React from 'react';

const OrderItem = ({ order, onSelect, isSelected }) => {
  return (
    <div
      className={`p-2 border ${isSelected ? 'border-blue-500' : 'border-gray-300'} rounded-md cursor-pointer`}
      onClick={() => onSelect(order.orderId)}
    >
      <div><strong>Symbol:</strong> {order.symbol}</div>
      <div><strong>Order ID:</strong> {order.orderId}</div>
      <div><strong>Side:</strong> {order.side}</div>
      <div><strong>Type:</strong> {order.type}</div>
      <div><strong>Quantity:</strong> {order.origQty}</div>
      <div><strong>Price:</strong> {order.price}</div>
      <div><strong>Executed Qty:</strong> {order.executedQty}</div>
      <div><strong>Avg Price:</strong> {order.avgPrice}</div>
      <div><strong>Status:</strong> {order.status}</div>
      <div><strong>Time:</strong> {new Date(order.time).toLocaleString()}</div>
      <div><strong>Leverage:</strong> {order.leverage}</div>
    </div>
  );
};

export default OrderItem;
