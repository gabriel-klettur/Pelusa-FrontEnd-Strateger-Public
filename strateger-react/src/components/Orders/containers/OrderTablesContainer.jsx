//Path: src/components/Orders/containers/OrderTablesContainer.jsx

import { useSelector, useDispatch } from 'react-redux';

// Headless UI
import { TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';

// Components
import OrderTable from '../components/OrderTable/OrderTable';
import OrderTab from '../components/OrderTab';
import ErrorMessage from '../../common/ErrorMessage';

// Hooks
import useFetchOrdersUsdtm from '../hooks/useFetchOrdersUsdtm';
import useFetchOrdersCoinm from '../hooks/useFetchOrdersCoinm';
import useFetchOrdersSpot from '../hooks/useFetchOrdersSpot';
import useFetchOrdersStandard from '../hooks/useFetchOrdersStandard';

// Thunks
import { fetchOrdersUsdtm, selectSelectedTab } from '../../../redux/order';
import { fetchOrdersCoinm } from '../../../redux/order';
import { fetchOrdersSpot } from '../../../redux/order';
import { fetchOrdersStandard } from '../../../redux/order';

//Redux Selectors
import { selectFilteredOrdersUsdtm, selectErrorUsdtm, selectPageUsdtm, selectHasMoreUsdtm, selectOffsetUsdtm } from '../../../redux/order';
import { selectFilteredOrdersCoinm, selectErrorCoinm, selectPageCoinm, selectHasMoreCoinm, selectOffsetCoinm } from '../../../redux/order';
import { selectFilteredOrdersSpot, selectErrorSpot, selectPageSpot, selectHasMoreSpot, selectOffsetSpot } from '../../../redux/order';
import { selectFilteredOrdersStandard, selectErrorStandard, selectPageStandard, selectHasMoreStandard, selectOffsetStandard } from '../../../redux/order';

//Redux Actions
import {setSelectedTab,
        setPageUsdtm, setHasMoreUsdtm, 
        setPageCoinm, setHasMoreCoinm,
        setPageSpot, setHasMoreSpot,
        setPageStandard, setHasMoreStandard, }  from '../../../redux/order';

const OrderTablesContainer = () => { 
    const dispatch = useDispatch();

    const selectedTab = useSelector(selectSelectedTab);

    const dataFilteredUsdtm = useSelector(selectFilteredOrdersUsdtm);  
    const pageOrdersUsdtm = useSelector(selectPageUsdtm);
    const hasMoreOrdersUsdtm = useSelector(selectHasMoreUsdtm);
    const offsetOrdersUsdtm = useSelector(selectOffsetUsdtm);        
    const errorFetchOrdersUsdtm = useSelector(selectErrorUsdtm);
    
    const dataFilteredCoinm = useSelector(selectFilteredOrdersCoinm);
    const pageOrdersCoinm = useSelector(selectPageCoinm);
    const hasMoreOrdersCoinm = useSelector(selectHasMoreCoinm);
    const offsetOrdersCoinm = useSelector(selectOffsetCoinm);
    const errorFetchOrdersCoinm = useSelector(selectErrorCoinm);

    
    const dataFilteredSpot = useSelector(selectFilteredOrdersSpot);
    const pageOrdersSpot = useSelector(selectPageSpot);
    const hasMoreOrdersSpot = useSelector(selectHasMoreSpot);
    const offsetOrdersSpot = useSelector(selectOffsetSpot);
    const errorFetchOrdersSpot = useSelector(selectErrorSpot);
    
    const dataFilteredStandard = useSelector(selectFilteredOrdersStandard);
    const pageOrdersStandard = useSelector(selectPageStandard);
    const hasMoreOrdersStandard = useSelector(selectHasMoreStandard);
    const offsetOrdersStandard = useSelector(selectOffsetStandard);
    const errorFetchOrdersStandard = useSelector(selectErrorStandard);

    useFetchOrdersUsdtm();
    useFetchOrdersCoinm();
    useFetchOrdersSpot();
    useFetchOrdersStandard();

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

    const tabMap = { usdtm: 0, coinm: 1, spot: 2, standard: 3 };
    const tabNames = ['usdtm', 'coinm', 'spot', 'standard'];

    const handleTabChange = (index) => {
        const tabName = tabNames[index];         
        dispatch(setSelectedTab(tabName));
    };

    if (errorFetchOrdersUsdtm) {
      return <ErrorMessage message={errorFetchOrdersUsdtm}/>;
    }

    if (errorFetchOrdersCoinm) {
      return <ErrorMessage message={errorFetchOrdersCoinm}/>;
    }

    if (errorFetchOrdersSpot) {
      return <ErrorMessage message={errorFetchOrdersSpot}/>;
    }

    if (errorFetchOrdersStandard) {
      return <ErrorMessage message={errorFetchOrdersStandard}/>;
    }      

    return (
      <div className="bg-african_violet-400 text-sm"> {/* Set text-sm here for consistency */}
         <TabGroup selectedIndex={tabMap[selectedTab]} onChange={handleTabChange}>
          <TabList className="flex justify-start bg-african_violet-300">
            <OrderTab 
              tabname="Orders Perp USDT-M"               
            />
            <OrderTab 
              tabname="Orders Perp COIN-M"               
            />          
            <OrderTab 
              tabname="Orders SPOT"               
            />          
            <OrderTab 
              tabname="Orders Standard Futures"               
            />          
          </TabList>
          <TabPanels>
            <TabPanel>  
              <OrderTable                 
                data={dataFilteredUsdtm}
                page={pageOrdersUsdtm}
                hasMore={hasMoreOrdersUsdtm}
                setHasMore={setHasMoreUsdtm}
                offset={offsetOrdersUsdtm}
                setPage={setPageUsdtm}
                columns={columnsUsdtm}
                fetchOrders={fetchOrdersUsdtm}
              />               
            </TabPanel>
            <TabPanel>
              <OrderTable                 
                data={dataFilteredCoinm}
                page={pageOrdersCoinm}
                hasMore={hasMoreOrdersCoinm}
                setHasMore={setHasMoreCoinm}
                offset={offsetOrdersCoinm}
                setPage={setPageCoinm}      
                columns={columnsCoinm}   
                fetchOrders={fetchOrdersCoinm}       
              />              
            </TabPanel>            
            <TabPanel>
              <OrderTable                 
                data={dataFilteredSpot}
                page={pageOrdersSpot}
                hasMore={hasMoreOrdersSpot}
                setHasMore={setHasMoreSpot}
                offset={offsetOrdersSpot}
                setPage={setPageSpot} 
                columns={columnsSpot}     
                fetchOrders={fetchOrdersSpot}           
              />
            </TabPanel>
            <TabPanel>
              <OrderTable                 
                data={dataFilteredStandard}
                page={pageOrdersStandard}
                hasMore={hasMoreOrdersStandard}
                setHasMore={setHasMoreStandard}
                offset={offsetOrdersStandard}
                setPage={setPageStandard}                 
                columns={columnsStandard}
                fetchOrders={fetchOrdersStandard}
              />
            </TabPanel>
          </TabPanels>          
        </TabGroup>
      </div>
    );
}

export default OrderTablesContainer;
