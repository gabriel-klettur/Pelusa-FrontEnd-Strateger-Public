// Path: strateger-react/src/components/Alarms/ToolAlarmBar/ToolAlarmBar.js

import React from 'react';
import TemporalidadButton from './TemporalidadButton';
import TypeButton from './TypeButton';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  incrementTemporalidad, 
  decrementTemporalidad, 
  selectFilteredTemporalidades, 
  setSelectedTemporalidad, 
  setSelectedTypes, 
  selectSelectedTemporalidad, 
  selectSelectedTypes 
} from '../../../slices/alarmSlice';

const temporalidades = ['1m', '5m', '15m', '30m', '1h', '4h', 'D', 'W', 'M'];
const types = [
  'order open long', 'order close long', 
  'order open short', 'order close short', 
  'indicator open long', 'indicator close long', 
  'indicator open short', 'indicator close short'
];

const ToolAlarmBar = () => {
  const dispatch = useDispatch();
  const selectedTemporalidad = useSelector(selectSelectedTemporalidad);
  const selectedTypes = useSelector(selectSelectedTypes);
  const filteredTemporalidades = useSelector(selectFilteredTemporalidades);

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
    <div className="space-y-4">
      {/* Temporalidad Buttons */}
      <div className="flex flex-wrap justify-center items-center border-2 border-african_violet-800 rounded-lg p-2">
        {temporalidades.map(temp => (
          <TemporalidadButton
            key={temp}
            temporalidad={temp}
            selectedTemporalidad={selectedTemporalidad}
            filteredTemporalidades={filteredTemporalidades}
            toggleTemporalidad={toggleTemporalidad}
          />
        ))}
      </div>

      {/* Tabs for Long and Short Types */}
      <TabGroup>
        <TabList className="flex justify-center space-x-1 rounded-t-xl bg-african_violet-500 p-1">
          
        <Tab
          className={({ selected }) =>
            `w-full py-2.5 text-sm leading-5 font-medium rounded-lg transition-colors duration-200
            ${
              selected
                ? 'bg-white shadow text-african_violet-300 border-4 border-african_violet-700'
                : 'text-african_violet-300 hover:bg-african_violet-400 hover:text-african_violet-900'
            } focus:outline-none focus:border-4 focus:border-african_violet-600`
          }
        >
          Long
        </Tab>

        <Tab
          className={({ selected }) =>
            `w-full py-2.5 text-sm leading-5 font-medium rounded-lg transition-colors duration-200
            ${
              selected
                ? 'bg-white shadow text-african_violet-300 border-4 border-african_violet-700'
                : 'text-african_violet-300 hover:bg-african_violet-400 hover:text-african_violet-900'
            } focus:outline-none focus:border-4 focus:border-african_violet-600`
          }
        >
          Short
        </Tab>

        </TabList>
        <TabPanels>
          <TabPanel className="p-2 border-b-2 border-l-2 border-r-2 border-african_violet-800 rounded-b-lg">            
            <div className="grid grid-cols-2 gap-2 my-2">
              {types.filter(type => type.includes('long') && type.includes('order')).map(type => (
                <TypeButton
                  key={type}
                  type={type}
                  selectedTypes={selectedTypes[selectedTemporalidad] || []}
                  toggleType={toggleType}
                />
              ))}
            </div>            
            <div className="grid grid-cols-2 gap-2 my-2">
              {types.filter(type => type.includes('long') && type.includes('indicator')).map(type => (
                <TypeButton
                  key={type}
                  type={type}
                  selectedTypes={selectedTypes[selectedTemporalidad] || []}
                  toggleType={toggleType}
                />
              ))}
            </div>
          </TabPanel>

          <TabPanel className="p-2 border-b-2 border-l-2 border-r-2 border-african_violet-800 rounded-b-lg">            
            <div className="grid grid-cols-2 gap-2 my-2">
              {types.filter(type => type.includes('short') && type.includes('order')).map(type => (
                <TypeButton
                  key={type}
                  type={type}
                  selectedTypes={selectedTypes[selectedTemporalidad] || []}
                  toggleType={toggleType}
                />
              ))}
            </div>            
            <div className="grid grid-cols-2 gap-2 my-2">
              {types.filter(type => type.includes('short') && type.includes('indicator')).map(type => (
                <TypeButton
                  key={type}
                  type={type}
                  selectedTypes={selectedTypes[selectedTemporalidad] || []}
                  toggleType={toggleType}
                />
              ))}
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
};

export default ToolAlarmBar;
