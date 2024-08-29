import React from 'react';
import TypeButton from './TypeButton';
import { TabPanel } from '@headlessui/react';

const TypeTabPanel = ({ types, selectedTemporalidad, selectedTypes, toggleType }) => {
  return (
    <TabPanel className="h-full">
      <div className="h-full grid grid-cols-2">
        {types.map(type => (
          <TypeButton
            key={type}
            type={type}
            selectedTypes={selectedTypes[selectedTemporalidad] || []}
            toggleType={toggleType}
          />
        ))}
      </div>
    </TabPanel>
  );
};

export default TypeTabPanel;
