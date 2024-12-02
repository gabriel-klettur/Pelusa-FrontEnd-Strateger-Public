//Path: src/components/Alarms/components/AlarmTab.jsx

import { Tab } from '@headlessui/react';

const AlarmTab = ({ tabName, setShowFilterPanel }) => {
  const handleClick = () => {

    if(tabName === 'Filtered by Selected Interval' || tabName === 'Filtered by Selected Interval and Type') {    
      setShowFilterPanel(true); // Cambia el estado para mostrar el panel
    }else{
      setShowFilterPanel(false);
    }

  };

  return (
    <Tab
      onClick={handleClick} // Manejo del clic
      className={({ selected }) =>
        `px-4 py-2 font-semibold transition-colors duration-200 shadow-md ${
          selected
            ? 'bg-african_violet-500 text-white'
            : 'bg-african_violet-300 text-african_violet-900 hover:bg-african_violet-400'
        }`
      }
    >
      {tabName}
    </Tab>
  );
};

export default AlarmTab;
