//Path: strateger-react/src/components/Alarms/components/AlarmTab.js

import { Tab } from '@headlessui/react';

const AlarmTab = ({ tabName}) => {
  return (
    <Tab      
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
