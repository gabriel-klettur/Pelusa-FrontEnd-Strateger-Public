// Path: strateger-react/src/components/Charts/MainChart/components/buttons/ItemChartButton.jsx

const ItemChartButton = ({ setShow, indicatorName, isVisible, onClick, disabled }) => {
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
      className={`px-1 py-1 text-white rounded rounded-xs ${bgColor} ${
        disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
      }`}
      disabled={disabled}
    >
      {indicatorName}
    </button>
  );
};

export default ItemChartButton;
