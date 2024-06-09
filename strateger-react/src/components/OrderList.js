import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders, setSelectedOrderId } from '../slices/orderSlice';

const OrderList = () => {
  const dispatch = useDispatch();
  const { orders, loading, error, selectedOrderId } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleSelectOrder = (orderId) => {
    dispatch(setSelectedOrderId(orderId));
  };

  if (loading) {
    return <div className="text-center py-4">Cargando órdenes...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-600">Error al cargar órdenes: {error}</div>;
  }

  if (!orders || orders.length === 0) {
    return <div className="text-center py-4">No hay órdenes disponibles.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 text-sm">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="w-full bg-gray-100 border-b">
            <th className="py-2 px-4 border-r">Order ID</th>
            <th className="py-2 px-4 border-r">Symbol</th>
            <th className="py-2 px-4 border-r">Side</th>
            <th className="py-2 px-4 border-r">Type</th>
            <th className="py-2 px-4 border-r">Position Side</th>
            <th className="py-2 px-4 border-r">Reduce Only</th>
            <th className="py-2 px-4 border-r">Quantity</th>
            <th className="py-2 px-4 border-r">Price</th>
            <th className="py-2 px-4 border-r">Average Price</th>
            <th className="py-2 px-4 border-r">Status</th>
            <th className="py-2 px-4 border-r">Profit</th>
            <th className="py-2 px-4 border-r">Commission</th>
            <th className="py-2 px-4 border-r">Stop Price</th>
            <th className="py-2 px-4 border-r">Working Type</th>
            <th className="py-2 px-4 border-r">Order Time</th>
            <th className="py-2 px-4 border-r">Update Time</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr
              key={order.orderId}
              className={`border-b hover:bg-gray-50 cursor-pointer ${selectedOrderId === order.orderId ? 'bg-gray-200' : ''}`}
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
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
