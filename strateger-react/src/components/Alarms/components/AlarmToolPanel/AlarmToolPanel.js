//Path: strateger-react/src/components/Alarms/components/AlarmToolPanel/AlarmToolPanel.js

import React from 'react';
import { TabGroup, TabList, TabPanels } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';

import TemporalidadButton from './TemporalidadButton';
import IntervalsTab from './DirectionTabs';
import TypePanel from './TypeTabPanel';

import { 
  incrementTemporalidad, 
  decrementTemporalidad,   
  setSelectedTemporalidad, 
  setSelectedTypes, 
  selectSelectedTemporalidad, 
  selectSelectedTypes 
} from '../../../../redux/slices/alarmFilterSlice';

const temporalidades = ['1m', '5m', '15m', '30m', '1h', '4h', 'D', 'W', 'M'];
const Longtypes = [
  'order open long', 'order close long',   
  'indicator open long', 'indicator close long'
];
const Shorttypes = [
  'order open short', 'order close short', 
  'indicator open short', 'indicator close short'
];

const AlarmToolPanel = () => {
  const dispatch = useDispatch();

  const selectedTemporalidad = useSelector(selectSelectedTemporalidad);       // temporalidad seleccionada en el panel
  const selectedTypes = useSelector(selectSelectedTypes);                     // objeto que guarda la temporalidad y los tipos seleccionados en el panel  

  const toggleType = (type) => {
    const types = selectedTypes[selectedTemporalidad] || [];
    let updatedTypes;
    if (types.includes(type)) {
      updatedTypes = types.filter(t => t !== type);
      dispatch(decrementTemporalidad(selectedTemporalidad));
    } else {
      updatedTypes = [...types, type];
      dispatch(incrementTemporalidad(selectedTemporalidad));
    }
    dispatch(setSelectedTypes(updatedTypes));
  };

  const toggleTemporalidad = (temp) => {
    dispatch(setSelectedTemporalidad(temp));
  };

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
