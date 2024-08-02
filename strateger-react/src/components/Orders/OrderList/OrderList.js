import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders, setSelectedOrderId, setPage, selectFilteredOrders } from '../../../slices/orderSlice';
import OrderRow from './OrderRow';
import LoadingOverlay from '../../common/LoadingOverlay/LoadingOverlay';

const OrderList = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectFilteredOrders);
  const { loading, error, selectedOrderId, page, hasMore, offset } = useSelector((state) => state.orders);

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

  const handleSelectOrder = (orderId) => {
    dispatch(setSelectedOrderId(orderId));
  };

  if (error) {
    return <div className="text-center py-4 text-red-600">Error al cargar órdenes: {error}</div>;
  }

  const startIndex = page * 20;
  const endIndex = startIndex + 20;
  const currentOrders = [...orders].sort((a, b) => b.orderId - a.orderId).slice(startIndex, endIndex);

  return (      
    <div className="pl-4 text-sm">      
      <LoadingOverlay isLoading={loading} />
      <table className="min-w-full bg-white border border-gray-200">        
        <thead>
          <tr className="w-full bg-gray-100 border-b">
            {/* ... column headers */}
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
          {currentOrders.map((order, index) => (
            <OrderRow 
              key={`${order.orderId}-${index}`} 
              order={order} 
              selectedOrderId={selectedOrderId} 
              handleSelectOrder={handleSelectOrder} 
            />
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
          disabled={!hasMore && endIndex >= orders.length}
        >
          Siguiente
        </button>
      </div>
      {loading && <div className="text-center py-4">Cargando más órdenes...</div>}
    </div>    
  );
};

export default OrderList;
