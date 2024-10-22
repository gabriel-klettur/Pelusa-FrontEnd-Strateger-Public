//Path: strateger-react/src/components/Alarms/components/AlarmToolPanel/DirectionTab.js

import { Tab } from '@headlessui/react';

const DirectionTabButton = ({ direction }) => {
  return (
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
      {direction}
    </Tab>
  );
};

export default DirectionTabButton;
