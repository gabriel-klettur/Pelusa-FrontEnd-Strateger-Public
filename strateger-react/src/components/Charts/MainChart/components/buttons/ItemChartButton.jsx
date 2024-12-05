// Path: strateger-react/src/components/Charts/MainChart/components/buttons/ItemChartButton.jsx
import { useDispatch } from 'react-redux';
import { setToggleChartAlarmButtons } from '../../../../../redux/interaction';

const ItemChartButton = ({ setShow, indicatorName, bgColor, buttonReduxId }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    setShow(); 
    dispatch(setToggleChartAlarmButtons({ buttonReduxId }));
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

