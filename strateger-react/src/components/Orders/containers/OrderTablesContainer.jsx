
import { TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import OrderTable from '../components/OrderTable/OrderTable';
import OrderTab from '../components/OrderTab';

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
          </TabList>
          <TabPanels>
            <TabPanel>  
              <OrderTable 
                type="perp_usdt-m"
              />               
            </TabPanel>
            <TabPanel>
              <OrderTable 
                type="perp_coin-m"
              />              
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    );
}

export default OrderTablesContainer;