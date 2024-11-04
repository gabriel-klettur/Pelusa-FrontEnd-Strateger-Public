
//Path: src/components/Orders/containers/OrderTablesContainer.jsx

import { useSelector } from 'react-redux';

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

//Redux Selectors
import { selectOrderUsdtm, selectErrorUsdtm, selectPageUsdtm, selectHasMoreUsdtm, selectOffsetUsdtm } from '../../../redux/order';
import { selectOrderCoinm, selectErrorCoinm, selectPageCoinm, selectHasMoreCoinm, selectOffsetCoinm } from '../../../redux/order';
import { selectOrderSpot, selectErrorSpot, selectPageSpot, selectHasMoreSpot, selectOffsetSpot } from '../../../redux/order';
import { selectOrderStandard, selectErrorStandard, selectPageStandard, selectHasMoreStandard, selectOffsetStandard } from '../../../redux/order';

//Redux Actions
import {setPageUsdtm, setHasMoreUsdtm, 
        setPageCoinm, setHasMoreCoinm,
        setPageSpot, setHasMoreSpot,
        setPageStandard, setHasMoreStandard, }  from '../../../redux/order';

const OrderTablesContainer = () => { 

    const dataOrdersUsdtm = useSelector(selectOrderUsdtm);
    const pageOrdersUsdtm = useSelector(selectPageUsdtm);
    const hasMoreOrdersUsdtm = useSelector(selectHasMoreUsdtm);
    const offsetOrdersUsdtm = useSelector(selectOffsetUsdtm);
    const setPageOrdersUsdtm = useSelector(setPageUsdtm);
    const setHasMoreOrdersUsdtm = useSelector(setHasMoreUsdtm);
    const errorFetchOrdersUsdtm = useSelector(selectErrorUsdtm);

    const dataOrdersCoinm = useSelector(selectOrderCoinm);
    const pageOrdersCoinm = useSelector(selectPageCoinm);
    const hasMoreOrdersCoinm = useSelector(selectHasMoreCoinm);
    const offsetOrdersCoinm = useSelector(selectOffsetCoinm);
    const setPageOrdersCoinm = useSelector(setPageCoinm);
    const setHasMoreOrdersCoinm = useSelector(setHasMoreCoinm);
    const errorFetchOrdersCoinm = useSelector(selectErrorCoinm);

    const dataOrdersSpot = useSelector(selectOrderSpot);
    const pageOrdersSpot = useSelector(selectPageSpot);
    const hasMoreOrdersSpot = useSelector(selectHasMoreSpot);
    const offsetOrdersSpot = useSelector(selectOffsetSpot);
    const setPageOrdersSpot = useSelector(setPageSpot);
    const setHasMoreOrdersSpot = useSelector(setHasMoreSpot);
    const errorFetchOrdersSpot = useSelector(selectErrorSpot);

    const dataOrdersStandard = useSelector(selectOrderStandard);
    const pageOrdersStandard = useSelector(selectPageStandard);
    const hasMoreOrdersStandard = useSelector(selectHasMoreStandard);
    const offsetOrdersStandard = useSelector(selectOffsetStandard);
    const setPageOrdersStandard = useSelector(setPageStandard);
    const setHasMoreOrdersStandard = useSelector(setHasMoreStandard);
    const errorFetchOrdersStandard = useSelector(selectErrorStandard);

    useFetchOrdersUsdtm();
    useFetchOrdersCoinm();
    useFetchOrdersSpot();
    useFetchOrdersStandard();

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
        <TabGroup>
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
                orderType="usdtm" 
                data={dataOrdersUsdtm}
                page={pageOrdersUsdtm}
                hasMore={hasMoreOrdersUsdtm}
                setHasMore={setHasMoreOrdersUsdtm}
                offset={offsetOrdersUsdtm}
                setPage={setPageOrdersUsdtm}
              />               
            </TabPanel>
            <TabPanel>
              <OrderTable 
                orderType="coinm"
                data={dataOrdersCoinm}
                page={pageOrdersCoinm}
                hasMore={hasMoreOrdersCoinm}
                setHasMore={setHasMoreOrdersCoinm}
                offset={offsetOrdersCoinm}
                setPage={setPageOrdersCoinm}                
              />              
            </TabPanel>            
            <TabPanel>
              <OrderTable 
                orderType="spot" 
                data={dataOrdersSpot}
                page={pageOrdersSpot}
                hasMore={hasMoreOrdersSpot}
                setHasMore={setHasMoreOrdersSpot}
                offset={offsetOrdersSpot}
                setPage={setPageOrdersSpot}                
              />
            </TabPanel>
            <TabPanel>
              <OrderTable 
                orderType="standard" 
                data={dataOrdersStandard}
                page={pageOrdersStandard}
                hasMore={hasMoreOrdersStandard}
                setHasMore={setHasMoreOrdersStandard}
                offset={offsetOrdersStandard}
                setPage={setPageOrdersStandard}                 
              />
            </TabPanel>
          </TabPanels>          
        </TabGroup>
      </div>
    );
}

export default OrderTablesContainer;
