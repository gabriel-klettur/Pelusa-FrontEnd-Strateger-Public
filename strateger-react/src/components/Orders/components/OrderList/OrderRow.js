// Path: strateger-react/src/components/Orders/OrderList/OrderRow.js

import React from 'react';

const OrderRow = ({ order, selectedOrderId, handleSelectOrder }) => (
  <tr
    className={`border-b transition-colors duration-200 hover:bg-african_violet-700 cursor-pointer ${
      selectedOrderId === order.orderId ? 'bg-african_violet-400 text-white' : 'bg-white text-african_violet-400'
    }`}
    onClick={() => handleSelectOrder(order.orderId)}
  >
    <td className="py-2 px-4 border-r">{order.orderId}</td>
    <td className="py-2 px-4 border-r">{order.symbol}</td>
    <td className="py-2 px-4 border-r">{order.side}</td>
    <td className="py-2 px-4 border-r">{order.type}</td>
    <td className="py-2 px-4 border-r">{order.positionSide}</td>
    <td className="py-2 px-4 border-r">{order.reduceOnly.toString()}</td>
    <td className="py-2 px-4 border-r">{order.origQty}</td>
    <td className="py-2 px-4 border-r">{order.price}</td>
    <td className="py-2 px-4 border-r">{order.avgPrice}</td>
    <td className="py-2 px-4 border-r">{order.status}</td>
    <td className="py-2 px-4 border-r">{order.profit}</td>
    <td className="py-2 px-4 border-r">{order.commission}</td>
    <td className="py-2 px-4 border-r">{order.stopPrice}</td>
    <td className="py-2 px-4 border-r">{order.workingType}</td>
    <td className="py-2 px-4 border-r">{new Date(order.time).toLocaleString()}</td>
    <td className="py-2 px-4 border-r">{new Date(order.updateTime).toLocaleString()}</td>
  </tr>
);

export default OrderRow;
