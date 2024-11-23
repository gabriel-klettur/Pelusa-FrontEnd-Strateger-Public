//Path: strateger-react/src/components/Alarms/components/AlarmFiltersPanel/DirectionFiltersPanel/OrderTypePanel.jsx

import { TabGroup, TabList, TabPanels } from '@headlessui/react';

import DirectionTabButton from './DirectionTabButton';
import TypeFilterTabPanel from './TypeFilterPanel';

const OrderTypePanel = ({ selectedTemporalidad, selectedTypes}) => {
    const Longtypes = [
        'Order open long', 'Order close long',   
        'Indicator open long', 'Indicator close long'
    ];
    const Shorttypes = [
        'Order open short', 'Order close short', 
        'Indicator open short', 'Indicator close short'
    ];
    return (
        <>
            <TabGroup className="flex space-x-12">
                <TabList className="flex space-x-4">
                    <DirectionTabButton direction="Long" />
                    <DirectionTabButton direction="Short" />          
                </TabList>
                <div className="p-1 text-african_violet-700">
                    |
                </div>
                <TabPanels className="">
                    <TypeFilterTabPanel 
                        types={Longtypes} 
                        selectedTemporalidad={selectedTemporalidad} 
                        selectedTypes={selectedTypes}                         
                    />
                    <TypeFilterTabPanel 
                        types={Shorttypes} 
                        selectedTemporalidad={selectedTemporalidad} 
                        selectedTypes={selectedTypes}                         
                    />
                </TabPanels>
            </TabGroup>
        </>
    )
}

export default OrderTypePanel;