//Path: strateger-react/src/components/Alarms/components/AlarmToolPanel/TypeTabPanel.js

import TypeButton from './TypeButton';
import { TabPanel } from '@headlessui/react';
import { useDispatch } from 'react-redux';

import { 
  incrementTemporalidad, 
  decrementTemporalidad,     
  setSelectedTypes, 
  
} from '../../../../../redux/alarm/filtersPanel';

const TypeFilterPanel = ({ types, selectedTemporalidad, selectedTypes }) => {

  const dispatch = useDispatch();
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

  return (
    <TabPanel className="">
      <div className="">
        {types.map(type => (
          <TypeButton
            key={type}
            label={type}
            selectedTypes={selectedTypes[selectedTemporalidad] || []}
            onClick={toggleType}
          />
        ))}
      </div>
    </TabPanel>
  );
};

export default TypeFilterPanel;
