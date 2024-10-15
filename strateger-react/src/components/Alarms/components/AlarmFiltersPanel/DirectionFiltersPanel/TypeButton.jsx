// Path: strateger-react/src/components/Alarms/components/AlarmToolPanel/TypeTabPanel.js

const TypeButton = ({ type, selectedTypes, toggleType }) => {
  return (
    <button 
      className={`font-semibold bg-african_violet-400 text-sm shadow-m transition-colors duration-200 ${
        selectedTypes.includes(type) 
          ? 'bg-african_violet-500 text-white'
          : 'bg-african_violet-300 text-african_violet-900'
      } hover:bg-african_violet-300`}
      onClick={() => toggleType(type)}
    >
      {type}
    </button>
  );
};

export default TypeButton;
