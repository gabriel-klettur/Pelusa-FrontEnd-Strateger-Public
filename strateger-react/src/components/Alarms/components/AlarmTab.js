import React from 'react';
import { Tab } from '@headlessui/react';

const AlarmTab = ({ tabName, setViewType }) => {
  return (
    <Tab
      onClick={setViewType}
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
