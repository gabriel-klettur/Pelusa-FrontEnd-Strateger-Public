import { useDispatch } from "react-redux";

import IntervalButton from "./IntervalButton";

import { setSelectedTemporalidad } from '../../../../../redux/alarm/filtersPanel';

const IntervalBar = ({ selectedTemporalidad, selectedTypes}) => {
    const dispatch = useDispatch();

    const temporalidades = ['1m', '5m', '15m', '30m', '1h', '4h', 'D', 'W', 'M'];

    const toggleTemporalidad = (temp) => {
        dispatch(setSelectedTemporalidad(temp));
    };
  

    return (
        <div className="flex flex-nowrap justify-center items-center bg-african_violet-300 text-pomp_and_power-400">
            {temporalidades.map((temp) => (
            <IntervalButton
                key={temp}
                temporalidad={temp}
                selectedTemporalidad={selectedTemporalidad}
                selectedIntervalAndTypes={selectedTypes}            
                toggleTemporalidad={toggleTemporalidad}
            />
            ))}
        </div>
    )
}


export default IntervalBar;