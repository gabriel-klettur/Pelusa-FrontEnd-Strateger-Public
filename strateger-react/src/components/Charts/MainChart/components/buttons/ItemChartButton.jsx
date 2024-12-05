// Path: strateger-react/src/components/Charts/MainChart/components/buttons/ItemChartButton.jsx

const ItemChartButton = ({ setShow, indicatorName, bgColor, disabled }) => {
  return (
    <button
      onClick={disabled ? undefined : setShow} // No ejecuta la acción si está deshabilitado
      className={`px-1 py-1 text-white rounded rounded-xs ${bgColor} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={disabled} // Propiedad nativa para deshabilitar el botón
    >
      {indicatorName}
    </button>
  );
};

export default ItemChartButton;

