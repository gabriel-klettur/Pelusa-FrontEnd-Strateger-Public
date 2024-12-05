// Path: src/components/Alarms/components/AlarmTab.jsx
import { Tab } from '@headlessui/react';

const AlarmTab = ({ tabName, disabled, onClick }) => {
  return (
    <Tab
      className={({ selected }) =>
        `px-4 py-2 font-semibold transition-colors duration-200 shadow-md ${
          selected
            ? "bg-african_violet-500 text-white"
            : "bg-african_violet-300 text-african_violet-900 hover:bg-african_violet-400"
        } ${disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}`
      }
      disabled={disabled} // Propiedad nativa de Headless UI para deshabilitar el Tab
      onClick={onClick} // Maneja el evento de clic
    >
      {tabName}
    </Tab>
  );
};

export default AlarmTab;
