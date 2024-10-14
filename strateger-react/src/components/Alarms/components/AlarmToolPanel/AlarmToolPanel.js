//Path: strateger-react/src/components/Alarms/components/AlarmToolPanel/AlarmToolPanel.js

import React from 'react';
import { TabGroup, TabList, TabPanels } from '@headlessui/react';


import TemporalidadButton from './TemporalidadButton';
import IntervalsTab from './DirectionTabs';
import TypePanel from './TypeTabPanel';



const AlarmToolPanel = ({temporalidades, Longtypes, Shorttypes, selectedTemporalidad, selectedTypes, toggleTemporalidad, toggleType}) => {


  return (
    <div className="flex flex-col">
      {/* Temporalidad Buttons */}
      <div className="flex flex-nowrap justify-center items-center bg-african_violet-300 text-pomp_and_power-400">
        {temporalidades.map((temp) => (
          <TemporalidadButton
            key={temp}
            temporalidad={temp}
            selectedTemporalidad={selectedTemporalidad}
            selectedIntervalAndTypes={selectedTypes}            
            toggleTemporalidad={toggleTemporalidad}
          />
        ))}
      </div>

      {/* Tabs for Long and Short Types */}
      <TabGroup className="">
        <TabList className="flex justify-center space-x-1 bg-african_violet-500 p-1">          
          <IntervalsTab direction="Long" />
          <IntervalsTab direction="Short" />          
        </TabList>
        <TabPanels className="h-44">
          <TypePanel 
            types={Longtypes} 
            selectedTemporalidad={selectedTemporalidad} 
            selectedTypes={selectedTypes} 
            toggleType={toggleType} 
          />
          <TypePanel 
            types={Shorttypes} 
            selectedTemporalidad={selectedTemporalidad} 
            selectedTypes={selectedTypes} 
            toggleType={toggleType} 
          />
        </TabPanels>
      </TabGroup>
    </div>
  );
};

export default AlarmToolPanel;
