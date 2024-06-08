import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders, setPage, setSelectedOrderId } from '../slices/orderSlice';

const OrderList = () => {
  const dispatch = useDispatch();
  const { orders, loading, error, page, selectedOrderId } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders(page));
  }, [dispatch, page]);

  const handlePreviousPage = () => {
    dispatch(setPage(Math.max(page - 1, 0)));
  };

  const handleNextPage = () => {
    dispatch(setPage(page + 1));
  };

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
            <th className="py-2 px-4 border-r">ID</th>
            <th className="py-2 px-4 border-r">Open Time</th>
            <th className="py-2 px-4 border-r">Close Time</th>
            <th className="py-2 px-4 border-r">Order ID</th>
            <th className="py-2 px-4 border-r">Symbol</th>
            <th className="py-2 px-4 border-r">Position Side</th>
            <th className="py-2 px-4 border-r">Side</th>
            <th className="py-2 px-4 border-r">Type</th>
            <th className="py-2 px-4 border-r">Price</th>
            <th className="py-2 px-4 border-r">Quantity</th>
            <th className="py-2 px-4 border-r">Stop Price</th>
            <th className="py-2 px-4 border-r">Working Type</th>
            <th className="py-2 px-4 border-r">Client Order ID</th>
            <th className="py-2 px-4 border-r">Time In Force</th>
            <th className="py-2 px-4 border-r">Price Rate</th>
            <th className="py-2 px-4 border-r">Stop Loss</th>
            <th className="py-2 px-4 border-r">Take Profit</th>
            <th className="py-2 px-4 border-r">Reduce Only</th>
            <th className="py-2 px-4 border-r">Activation Price</th>
            <th className="py-2 px-4 border-r">Close Position</th>
            <th className="py-2 px-4">Stop Guaranteed</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr
              key={order.id}
              className={`border-b hover:bg-gray-50 cursor-pointer ${selectedOrderId === order.id ? 'bg-gray-200' : ''}`}
              onClick={() => handleSelectOrder(order.id)}
            >
              <td className="py-2 px-4 border-r">{order.id}</td>
              <td className="py-2 px-4 border-r">{order.orderOpenTime}</td>
              <td className="py-2 px-4 border-r">{order.orderCloseTime}</td>
              <td className="py-2 px-4 border-r">{order.orderId}</td>
              <td className="py-2 px-4 border-r">{order.symbol}</td>
              <td className="py-2 px-4 border-r">{order.positionSide}</td>
              <td className="py-2 px-4 border-r">{order.side}</td>
              <td className="py-2 px-4 border-r">{order.type}</td>
              <td className="py-2 px-4 border-r">{order.price}</td>
              <td className="py-2 px-4 border-r">{order.quantity}</td>
              <td className="py-2 px-4 border-r">{order.stopPrice}</td>
              <td className="py-2 px-4 border-r">{order.workingType}</td>
              <td className="py-2 px-4 border-r">{order.clientOrderID}</td>
              <td className="py-2 px-4 border-r">{order.timeInForce}</td>
              <td className="py-2 px-4 border-r">{order.priceRate}</td>
              <td className="py-2 px-4 border-r">{order.stopLoss}</td>
              <td className="py-2 px-4 border-r">{order.takeProfit}</td>
              <td className="py-2 px-4 border-r">{order.reduceOnly}</td>
              <td className="py-2 px-4 border-r">{order.activationPrice}</td>
              <td className="py-2 px-4 border-r">{order.closePosition}</td>
              <td className="py-2 px-4">{order.stopGuaranteed}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
          onClick={handlePreviousPage}
          disabled={page === 0}
        >
          Anterior
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleNextPage}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default OrderList;
