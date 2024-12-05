//Path: src/components/Alarms/components/AlarmTab.jsx

import { Tab } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { setToggleAlarmTab, selectAlarmTab } from '../../../redux/interaction';

const AlarmTab = ({ tabName, tabReduxId }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setToggleAlarmTab({ tabReduxId }));
  };

  return (
    <Tab
      onClick={handleClick}
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

