
import { TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import OrderTable from '../components/OrderTable/OrderTable';
import OrderTab from '../components/OrderTab';

import { fetchOrdersUsdtm, fetchOrdersCoinm, fetchOrdersSpot, fetchOrdersStandard } from '../../../redux/order';

const OrderTablesContainer = () => { 
    


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
                fetchOrder={fetchOrdersUsdtm}
              />               
            </TabPanel>
            <TabPanel>
              <OrderTable 
                fetchOrder={fetchOrdersCoinm}
              />              
            </TabPanel>            
            <TabPanel>
              <OrderTable 
                fetchOrder={fetchOrdersSpot}
              />
            </TabPanel>
            <TabPanel>
              <OrderTable 
                fetchOrder={fetchOrdersStandard}
              />
            </TabPanel>
          </TabPanels>
          
        </TabGroup>
      </div>
    );
}

export default OrderTablesContainer;