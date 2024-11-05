//Path: strateger-react/src/redux/order/index.jsx

// Slice
import orderReducer from './orderSlice'; 

//! Thunks
import { fetchOrdersUsdtm, fetchOrdersCoinm, fetchOrdersSpot, fetchOrdersStandard } from './orderThunks';

//! Selectors
import { selectSelectedTab } from './orderSelectors';
import { selectOrderUsdtm, selectFiltersUsdtm, selectFilteredOrdersUsdtm, selectLoadingUsdtm, selectErrorUsdtm, selectPageUsdtm, selectHasMoreUsdtm, selectOffsetUsdtm } from './orderSelectors';
import { selectOrderCoinm, selectFiltersCoinm, selectFilteredOrdersCoinm, selectLoadingCoinm, selectErrorCoinm, selectPageCoinm, selectHasMoreCoinm, selectOffsetCoinm } from './orderSelectors';
import { selectOrderSpot, selectFiltersSpot, selectFilteredOrdersSpot, selectLoadingSpot, selectErrorSpot, selectPageSpot, selectHasMoreSpot, selectOffsetSpot } from './orderSelectors';
import { selectOrderStandard, selectFiltersStandard, selectFilteredOrdersStandard, selectLoadingStandard, selectErrorStandard, selectPageStandard, selectHasMoreStandard, selectOffsetStandard } from './orderSelectors';

//! Actions
import {setSelectedOrderId, setSelectedTab,
        setPageUsdtm, setHasMoreUsdtm, setOffsetUsdtm, setFiltersUsdtm, setErrorUsdm,
        setPageCoinm, setHasMoreCoinm, setOffsetCoinm, setFiltersCoinm, setErrorCoinm,
        setPageSpot, setHasMoreSpot, setOffsetSpot, setFiltersSpot, setErrorSpot,
        setPageStandard, setHasMoreStandard, setOffsetStandard, setFiltersStandard, setErrorStandard } from './orderSlice';

//TODO Thunks
export { fetchOrdersUsdtm, fetchOrdersCoinm, fetchOrdersSpot, fetchOrdersStandard };

//TODO Selectors
export { selectSelectedTab };
export { selectOrderUsdtm, selectFiltersUsdtm, selectFilteredOrdersUsdtm, selectLoadingUsdtm, selectErrorUsdtm, selectPageUsdtm, selectHasMoreUsdtm, selectOffsetUsdtm };
export { selectOrderCoinm, selectFiltersCoinm, selectFilteredOrdersCoinm, selectLoadingCoinm, selectErrorCoinm, selectPageCoinm, selectHasMoreCoinm, selectOffsetCoinm };
export { selectOrderSpot, selectFiltersSpot, selectFilteredOrdersSpot, selectLoadingSpot, selectErrorSpot, selectPageSpot, selectHasMoreSpot, selectOffsetSpot };
export { selectOrderStandard, selectFiltersStandard, selectFilteredOrdersStandard, selectLoadingStandard, selectErrorStandard, selectPageStandard, selectHasMoreStandard, selectOffsetStandard };

//TODO Actions
export { setSelectedOrderId, setSelectedTab,
        setPageUsdtm, setHasMoreUsdtm, setOffsetUsdtm, setFiltersUsdtm, setErrorUsdm,
        setPageCoinm, setHasMoreCoinm, setOffsetCoinm, setFiltersCoinm,  setErrorCoinm,
        setPageSpot, setHasMoreSpot, setOffsetSpot, setFiltersSpot, setErrorSpot,
        setPageStandard, setHasMoreStandard, setOffsetStandard, setFiltersStandard, setErrorStandard };

// Slice
export default orderReducer;
