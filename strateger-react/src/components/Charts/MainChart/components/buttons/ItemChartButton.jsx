//Path: strateger-react/src/components/Charts/MainChart/components/buttons/ItemChartButton.jsx

const ItemChartButton = ({ setShow, buttonName, icon, isVisible, onClick, disabled }) => {
  const bgColor = isVisible
    ? "bg-african_violet-300"
    : "bg-african_violet-500";

  const handleClick = () => {
    if (!disabled) {
      setShow();
      if (onClick) {
        onClick();
      }
    }
    
  };

  return (
    <button
      onClick={handleClick}
      className={`px-2 py-1 text-white rounded rounded-xs flex items-center justify-center space-x-2 ${bgColor} ${
        disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
      }`}
      disabled={disabled}
    >
      {icon && <img src={icon} alt={buttonName} className="w-6 h-6" />}
      {buttonName && <span>{buttonName}</span>}
    </button>
  );
};

export default ItemChartButton;
