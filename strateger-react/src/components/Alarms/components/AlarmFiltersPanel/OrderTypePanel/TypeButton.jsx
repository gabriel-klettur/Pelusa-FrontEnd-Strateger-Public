// Path: strateger-react/src/components/Alarms/components/AlarmToolPanel/TypeTabPanel.js

const TypeButton = ({ label, selectedTypes, onClick }) => {
  return (
    <button 
      className={` font-semibold text-base py-1 px-2 hover:bg-african_violet-400 hover:rounded-lg
        ${
          selectedTypes.includes(label) 
            ? 'text-african_violet-100 underline decoration-2'
            : 'text-african_violet-900' 
        } 
      `}
      onClick={() => onClick(label)}
    >
      {label}
    </button>
  );
};

export default TypeButton;