// Path: strateger-react/src/components/Charts/MainChart/components/buttons/ItemChartButton.jsx

const ItemChartButton = ({ setShow, indicatorName, bgColor }) => {
  const handleClick = () => {
    setShow();     
  };

  return (
    <button
      onClick={handleClick} 
      className={`px-1 py-1 text-white rounded rounded-xs ${bgColor}`}
    >
      {indicatorName}
    </button>
  );
};

export default ItemChartButton;

