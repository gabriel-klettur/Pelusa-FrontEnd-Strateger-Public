import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrdersUsdtm, fetchOrdersCoinm, fetchOrdersSpot, fetchOrdersStandard } from '../../../../redux/order';

import { selectFilteredOrdersUsdtm, selectFilteredOrdersCoinm, selectFilteredOrdersSpot, selectFilteredOrdersStandard } from '../../../../redux/order';
import { selectLoadingUsdtm, selectErrorUsdtm, selectPageUsdtm, selectHasMoreUsdtm } from '../../../../redux/order';
import { selectLoadingCoinm, selectErrorCoinm, selectPageCoinm, selectHasMoreCoinm } from '../../../../redux/order';
import { selectLoadingSpot, selectErrorSpot, selectPageSpot, selectHasMoreSpot } from '../../../../redux/order';
import { selectLoadingStandard, selectErrorStandard, selectPageStandard, selectHasMoreStandard } from '../../../../redux/order';

import LoadingOverlay from '../../../common/LoadingOverlay/LoadingOverlay';
import Tablita from '../../../common/Tablita';
import Pagination from './Pagination';

const OrderTable = ({ orderType }) => {
  const dispatch = useDispatch();

  // Seleccionar el thunk correcto basado en `orderType`
  const fetchOrder = 
    orderType === 'usdtm' ? fetchOrdersUsdtm :
    orderType === 'coinm' ? fetchOrdersCoinm :
    orderType === 'spot' ? fetchOrdersSpot :
    fetchOrdersStandard;

  // Seleccionar los estados correctos basados en `orderType`
  const orders = useSelector(
    orderType === 'usdtm' ? selectFilteredOrdersUsdtm :
    orderType === 'coinm' ? selectFilteredOrdersCoinm :
    orderType === 'spot' ? selectFilteredOrdersSpot :
    selectFilteredOrdersStandard
  );

  const loading = useSelector(
    orderType === 'usdtm' ? selectLoadingUsdtm :
    orderType === 'coinm' ? selectLoadingCoinm :
    orderType === 'spot' ? selectLoadingSpot :
    selectLoadingStandard
  );

  const error = useSelector(
    orderType === 'usdtm' ? selectErrorUsdtm :
    orderType === 'coinm' ? selectErrorCoinm :
    orderType === 'spot' ? selectErrorSpot :
    selectErrorStandard
  );

  const page = useSelector(
    orderType === 'usdtm' ? selectPageUsdtm :
    orderType === 'coinm' ? selectPageCoinm :
    orderType === 'spot' ? selectPageSpot :
    selectPageStandard
  );

  const hasMore = useSelector(
    orderType === 'usdtm' ? selectHasMoreUsdtm :
    orderType === 'coinm' ? selectHasMoreCoinm :
    orderType === 'spot' ? selectHasMoreSpot :
    selectHasMoreStandard
  );


  const columnsUsdtm = [
    { label: 'Order ID', key: 'orderId' },
    { label: 'Symbol', key: 'symbol' },
    { label: 'Side', key: 'side' },
    { label: 'Leverage', key: 'leverage' },
    { label: 'Type', key: 'type' },
    { label: 'Position Side', key: 'positionSide' },
    { label: 'Reduce Only', key: 'reduceOnly' },
    { label: 'Quantity (BTC)', key: 'quantity' },
    { label: 'Price', key: 'price' },
    { label: 'Average Price', key: 'averagePrice' },
    { label: 'Status', key: 'status' },
    { label: 'Profit (USD)', key: 'profit' },
    { label: 'Commission (USD)', key: 'commission' },
    { label: 'Stop Price', key: 'stopPrice' },
    { label: 'Working Type', key: 'workingType' },
    { label: 'Order Time', key: 'time' },
    { label: 'Update Time', key: 'updateTime' },
    //TODO implementar stop lost and take profit
  ];

  const columnsCoinm = [
    { label: 'Order ID', key: 'orderId' },
    { label: 'Symbol', key: 'symbol' },
    { label: 'Side', key: 'side' },
    //!{ label: 'Leverage', key: 'leverage' },             //In the Coinm Wallet leverage is defined in the wallet configuration
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
    { label: 'Order Time', key: 'time' },
    { label: 'Update Time', key: 'updateTime' },
    //TODO implementar stop lost and take profit
  ];

  const columnsSpot = [
    { label: 'Order ID', key: 'orderId' },
    { label: 'Symbol', key: 'symbol' },
    { label: 'Side', key: 'side' },    
    { label: 'Type', key: 'type' },
    { label: 'Reduce Only', key: 'reduceOnly' },
    { label: 'Quantity', key: 'quantity' },
    { label: 'Price', key: 'price' },
    { label: 'Average Price', key: 'averagePrice' },
    { label: 'Status', key: 'status' },
    { label: 'Cummulative Quote Quantity', key: 'cummulativeQuoteQty' },
    { label: 'Commission', key: 'commission' },    
    { label: 'Working Type', key: 'workingType' },
    { label: 'Order Time', key: 'time' },
    { label: 'Update Time', key: 'updateTime' },
  ];

  const columnsStandard = [
    { label: 'Order ID', key: 'orderId' },

    { label: 'Symbol', key: 'symbol' },    
    { label: 'Leverage', key: 'leverage' },
    { label: 'Position Side', key: 'positionSide' },
    { label: 'Reduce Only', key: 'reduceOnly' },    
    { label: 'Average Price', key: 'averagePrice' },
    { label: 'Status', key: 'status' },
    
    
    { label: 'Order Time', key: 'time' },
    { label: 'Update Time', key: 'updateTime' },
    
  ];

  const columns = 
    orderType === 'usdtm' ? columnsUsdtm :
    orderType === 'coinm' ? columnsCoinm :
    orderType === 'spot' ? columnsSpot :
    columnsStandard;



  useEffect(() => {    
    dispatch(fetchOrder({ limit: 500, offset: 0 }));  
  }, [dispatch, fetchOrder]);

  if (error) {
    return <div className="text-center py-4 text-red-600">Error al cargar órdenes: {error}</div>;
  }

  const startIndex = page * 20;
  const endIndex = startIndex + 20;

  const currentOrders = [...orders].sort((a, b) => b.orderId - a.orderId).slice(startIndex, endIndex);


  console.log('currentOrders', currentOrders);

  // Formateo de los datos para Tablita
  const data = currentOrders.map((order) => ({
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

  return (
    <div className="relative">
      <LoadingOverlay 
        isLoading={loading}
      />
      <Tablita 
        columns={columns} 
        data={data} 
      />
      <Pagination 
        page={page}         
        hasMore={hasMore} 
        endIndex={endIndex} 
        orders={orders} />
      
      {loading}
    </div>
  );
};

export default OrderTable;
