//Path: strateger-react/src/components/Alarms/components/AlarmToolPanel/DirectionTab.js

import { Tab } from '@headlessui/react';

const DirectionTabButton = ({ direction }) => {
  return (
    <Tab
      className={({ selected }) =>
              ` font-semibold text-base py-1 px-2 hover:bg-african_violet-400 hover:rounded-lg
              ${
                selected
                  ? 'text-african_violet-100 underline decoration-2'
                  : 'text-african_violet-900'
              }`
            }
          >
      {direction}
    </Tab>
  );
};

export default DirectionTabButton;
