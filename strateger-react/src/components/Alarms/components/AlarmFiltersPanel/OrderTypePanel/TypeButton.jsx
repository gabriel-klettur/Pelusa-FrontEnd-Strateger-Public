// Path: strateger-react/src/components/Alarms/components/AlarmToolPanel/TypeTabPanel.js

const TypeButton = ({ label, selectedTypes, onClick }) => {
  return (
    <button 
      className={`font-semibold text-sm shadow-m transition-colors duration-200 
        ${
          selectedTypes.includes(label) 
            ? 'w-full bg-african_violet-500 text-white'
            : 'bg-african_violet-300 text-african_violet-900 hover:bg-african_violet-400'
        } 
      `}
      onClick={() => onClick(label)}
    >
      {label}
    </button>
  );
};

export default TypeButton;