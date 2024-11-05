//Path: src/components/Orders/components/OrderTable/OrderTable.js

import Tablita from '../../../common/Tablita';
import Pagination from './Pagination';

const OrderTable = ({ data, page, hasMore, setHasMore, offset, setPage, columns, fetchOrders }) => {

  const totalDataLength = data.length;

  const currentOrders = [...data].sort((a, b) => b.orderId - a.orderId);

  const formatedData = currentOrders.map((order) => ({
    orderId: order.orderId || order.positionId,    
    symbol: order.symbol,
    side: order.side,
    type: order.type,
    leverage: order.leverage,
    positionSide: order.positionSide,
    reduceOnly: order.reduceOnly ? 'Yes' : 'No',
    quantity: order.quantity || order.origQty,
    price: order.price,
    averagePrice: order.averagePrice || order.avgPrice,
    status: order.status,
    profit: order.profit,
    cummulativeQuoteQty: order.cummulativeQuoteQty,
    commission: order.commission || order.fee,
    stopPrice: order.stopPrice,
    workingType: order.workingType || order.type,
    time: new Date(order.time).toLocaleString(),
    updateTime: new Date(order.updateTime).toLocaleString(),
  }));

  const paginatedData = formatedData.slice(page * 20, (page * 20) + 20);

  return (
    <div className="relative">
      <Tablita 
        columns={columns} 
        data={paginatedData} 
      />
      <Pagination 
        page={page}         
        hasMore={hasMore}
        setHasMore={setHasMore} 
        endIndex={page * 20 + paginatedData.length} 
        totalDataLength={totalDataLength}
        offset={offset}
        setPage={setPage}
        fetcData={fetchOrders}
      />      
    </div>
  );
};

export default OrderTable;
