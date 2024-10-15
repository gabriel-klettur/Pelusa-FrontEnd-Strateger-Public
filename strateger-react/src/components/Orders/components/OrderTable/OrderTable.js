// Path: strateger-react/src/components/Orders/OrderList/OrderList.js

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders, setPage, selectFilteredOrders } from '../../../../redux/slices/orderSlice';

import LoadingOverlay from '../../../common/LoadingOverlay/LoadingOverlay';
import Tablita from '../../../common/Tablita';

const OrderTable = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectFilteredOrders);
  const { loading, error, page, hasMore, offset } = useSelector((state) => state.orders);

  useEffect(() => {
    if (orders.length === 0) {
      dispatch(fetchOrders({ limit: 500, offset: 0 }));
    }
  }, [dispatch, orders.length]);

  const handlePreviousPage = () => {
    dispatch(setPage(Math.max(page - 1, 0)));
  };

  const handleNextPage = () => {
    const nextPage = page + 1;
    if (nextPage * 20 >= orders.length && hasMore) {
      dispatch(fetchOrders({ limit: 500, offset }));
    }
    dispatch(setPage(nextPage));
  };

  if (error) {
    return <div className="text-center py-4 text-red-600">Error al cargar órdenes: {error}</div>;
  }

  const startIndex = page * 20;
  const endIndex = startIndex + 20;
  const currentOrders = [...orders].sort((a, b) => b.orderId - a.orderId).slice(startIndex, endIndex);

  // Definición de columnas para Tablita
  const columns = [
    { label: 'Order ID', key: 'orderId' },
    { label: 'Symbol', key: 'symbol' },
    { label: 'Side', key: 'side' },
    { label: 'Type', key: 'type' },
    { label: 'Position Side', key: 'positionSide' },
    { label: 'Reduce Only', key: 'reduceOnly' },
    { label: 'Quantity', key: 'quantity' },
    { label: 'Price', key: 'price' },
    { label: 'Average Price', key: 'averagePrice' },
    { label: 'Status', key: 'status' },
    { label: 'Profit', key: 'profit' },
    { label: 'Commission', key: 'commission' },
    { label: 'Stop Price', key: 'stopPrice' },
    { label: 'Working Type', key: 'workingType' },
    { label: 'Order Time', key: 'orderTime' },
    { label: 'Update Time', key: 'updateTime' },
  ];

  // Formateo de los datos para Tablita
  const data = currentOrders.map((order) => ({
    orderId: order.orderId,
    symbol: order.symbol,
    side: order.side,
    type: order.type,
    positionSide: order.positionSide,
    reduceOnly: order.reduceOnly ? 'Yes' : 'No',
    quantity: order.quantity,
    price: order.price,
    averagePrice: order.averagePrice,
    status: order.status,
    profit: order.profit,
    commission: order.commission,
    stopPrice: order.stopPrice,
    workingType: order.workingType,
    orderTime: new Date(order.orderTime).toLocaleString(),
    updateTime: new Date(order.updateTime).toLocaleString(),
  }));

  return (
    <div className="relative">
      <LoadingOverlay isLoading={loading} />
      <Tablita columns={columns} data={data} />

      {/* --------------------------------- Botones de paginación --------------------------------*/}
      <div className="flex justify-between mt-4">
        <button
          className={`px-4 py-2 font-semibold rounded-lg shadow-md transition-colors duration-200 ${
            page === 0
              ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
              : 'bg-african_violet-500 text-white hover:bg-african_violet-700'
          }`}
          onClick={handlePreviousPage}
          disabled={page === 0}
        >
          Anterior
        </button>
        <button
          className={`px-4 py-2 font-semibold rounded-lg shadow-md transition-colors duration-200 ${
            !hasMore && endIndex >= orders.length
              ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
              : 'bg-african_violet-500 text-white hover:bg-african_violet-700'
          }`}
          onClick={handleNextPage}
          disabled={!hasMore && endIndex >= orders.length}
        >
          Siguiente
        </button>
      </div>
      {loading && <div className="text-center py-4">Cargando más órdenes...</div>}
    </div>
  );
};

export default OrderTable;
