// Path: strateger-react/src/components/Charts/MainChart/components/buttons/ItemChartButton.jsx

const ItemChartButton = ({ setShow, indicatorName, bgColor, onClick, disabled }) => {
  const handleClick = () => {
    if (!disabled) { // Asegúrate de que el botón no esté deshabilitado antes de ejecutar
      setShow(); 
      if (onClick) {
        onClick(); // Sincroniza con el tab correspondiente
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
