//Path: strateger-react/src/redux/order/index.jsx

// Importaciones del slice
import orderReducer from './orderSlice'; 

// Importaciones de acciones (reducers)
import { 
  setFilters, 
  setPage, 
  setFilteredOrders, 
  setSelectedOrderId 
} from './orderSlice';

// Importaciones de Thunks (acciones asíncronas)
import { 
  fetchOrdersUsdtm, 
  fetchOrdersCoinm, 
  fetchOrdersSpot, 
  fetchOrdersStandard 
} from './orderThunks';

// Importaciones de Selectores
import { 
  selectOrdersUsdtm, 
  selectOrdersCoinm, 
  selectOrdersSpot, 
  selectOrdersStandard,
  selectFiltersUsdtm,
  selectFiltersCoinm,
  selectFiltersSpot,
  selectFiltersStandard,
  selectFilteredOrdersUsdtm,
  selectFilteredOrdersCoinm,
  selectFilteredOrdersSpot,
  selectFilteredOrdersStandard,
  selectLoadingUsdtm,
  selectErrorUsdtm,
  selectPageUsdtm,
  selectHasMoreUsdtm,
  selectLoadingCoinm,
  selectErrorCoinm,
  selectPageCoinm,
  selectHasMoreCoinm,
  selectLoadingSpot,
  selectErrorSpot,
  selectPageSpot,
  selectHasMoreSpot,
  selectLoadingStandard,
  selectErrorStandard,
  selectPageStandard,
  selectHasMoreStandard
} from './orderSelectors';

// Exportar Thunks
export { 
  fetchOrdersUsdtm, 
  fetchOrdersCoinm, 
  fetchOrdersSpot, 
  fetchOrdersStandard 
};

// Exportar Selectores
export { 
  selectOrdersUsdtm, 
  selectOrdersCoinm, 
  selectOrdersSpot, 
  selectOrdersStandard,
  selectFiltersUsdtm,
  selectFiltersCoinm,
  selectFiltersSpot,
  selectFiltersStandard,
  selectFilteredOrdersUsdtm,
  selectFilteredOrdersCoinm,
  selectFilteredOrdersSpot,
  selectFilteredOrdersStandard,
  selectLoadingUsdtm,
  selectErrorUsdtm,
  selectPageUsdtm,
  selectHasMoreUsdtm,
  selectLoadingCoinm,
  selectErrorCoinm,
  selectPageCoinm,
  selectHasMoreCoinm,
  selectLoadingSpot,
  selectErrorSpot,
  selectPageSpot,
  selectHasMoreSpot,
  selectLoadingStandard,
  selectErrorStandard,
  selectPageStandard,
  selectHasMoreStandard
};

// Exportar Acciones
export { 
  setFilters, 
  setPage, 
  setFilteredOrders, 
  setSelectedOrderId 
};

// Exportar Reducer por defecto
export default orderReducer;
