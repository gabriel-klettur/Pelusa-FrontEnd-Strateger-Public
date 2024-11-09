import { useState } from 'react';

const ItemChartButton = ({ setShow, indicatorName }) => {
    const [bgColor, setBgColor] = useState('bg-african_violet-500');

    return (
        <button
            onClick={() => {
                setShow(previousState => {
                    const newState = !previousState;
                    setBgColor(newState ? 'bg-african_violet-300' : 'bg-african_violet-500');
                    return newState;
                });
            }}
            className={`px-1 py-1 text-white rounded rounded-xs ${bgColor}`}
        >
            {indicatorName}
        </button>
    );
};

export default ItemChartButton;
