//Path: src/components/Alarms/components/AlarmFiltersPanel/IntervalBar/IntervalBar.jsx

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
        <div className="flex">
            {temporalidades.map((temp, index) => (
                <div key={`${temp}-${index}`}>
                    <IntervalButton
                        temporalidad={temp}
                        selectedTemporalidad={selectedTemporalidad}
                        selectedIntervalAndTypes={selectedTypes}            
                        toggleTemporalidad={toggleTemporalidad}
                    />
                </div>
            ))}
        </div>
    );
}


export default IntervalBar;