//Path: strateger-react/src/components/Alarms/components/AlarmFiltersPanel/DirectionFiltersPanel/OrderTypePanel.jsx

import { TabGroup, TabList, TabPanels } from '@headlessui/react';

import DirectionTabButton from './DirectionTabButton';
import TypeFilterTabPanel from './TypeFilterPanel';

const OrderTypePanel = ({ selectedTemporalidad, selectedTypes}) => {
    const Longtypes = [
        'order open long', 'order close long',   
        'indicator open long', 'indicator close long'
    ];
    const Shorttypes = [
        'order open short', 'order close short', 
        'indicator open short', 'indicator close short'
    ];
    return (
        <>
            <TabGroup className="flex flex-col h-full">
                <TabList className="flex justify-center space-x-1 bg-african_violet-500 p-1">          
                    <DirectionTabButton direction="Long" />
                    <DirectionTabButton direction="Short" />          
                </TabList>
                <TabPanels className="h-full">
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