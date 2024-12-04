// Path: strateger-react/src/components/Charts/MainChart/components/buttons/ItemChartButton.jsx

const ItemChartButton = ({ setShow, indicatorName, bgColor }) => {
    return (
        <button
            onClick={setShow}
            className={`px-1 py-1 text-white rounded rounded-xs ${bgColor}`}
        >
            {indicatorName}
        </button>
    );
};

export default ItemChartButton;
