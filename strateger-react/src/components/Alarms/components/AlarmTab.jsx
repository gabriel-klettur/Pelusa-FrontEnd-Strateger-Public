// Path: src/components/Alarms/components/AlarmTab.jsx
import { Tab } from '@headlessui/react';

const AlarmTab = ({ tabName, disabled, onClick }) => {
  return (
    <Tab
      className={({ selected }) =>
        `tab ${
          selected
            ? "tab-active"
            : "tab-inactive"
        } ${disabled ? "tab-disable" : ""}`
      }
      disabled={disabled}
      aria-disabled={disabled}
      onClick={onClick}
    >
      {tabName}
    </Tab>
  );
};

export default AlarmTab;
