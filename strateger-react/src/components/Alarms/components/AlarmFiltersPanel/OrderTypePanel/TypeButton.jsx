// Path: src/components/Alarms/components/AlarmFiltersPanel/OrderTypePanel/TypeButton.jsx

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