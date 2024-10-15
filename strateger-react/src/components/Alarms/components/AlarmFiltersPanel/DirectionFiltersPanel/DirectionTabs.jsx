//Path: strateger-react/src/components/Alarms/components/AlarmFiltersPanel/DirectionFiltersPanel/DirectionTabs.jsx

import { TabGroup, TabList, TabPanels } from '@headlessui/react';

import DirectionTabButton from './DirectionTabButton';
import TypeFilterTabPanel from './TypeFilterPanel';

const DirectionTabs = ({ selectedTemporalidad, selectedTypes, toggleType}) => {
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
            <TabGroup className="">
                <TabList className="flex justify-center space-x-1 bg-african_violet-500 p-1">          
                    <DirectionTabButton direction="Long" />
                    <DirectionTabButton direction="Short" />          
                </TabList>
                <TabPanels className="h-44">
                    <TypeFilterTabPanel 
                        types={Longtypes} 
                        selectedTemporalidad={selectedTemporalidad} 
                        selectedTypes={selectedTypes} 
                        toggleType={toggleType} 
                    />
                    <TypeFilterTabPanel 
                        types={Shorttypes} 
                        selectedTemporalidad={selectedTemporalidad} 
                        selectedTypes={selectedTypes} 
                        toggleType={toggleType} 
                    />
                </TabPanels>
            </TabGroup>
        </>
    )
}

export default DirectionTabs;