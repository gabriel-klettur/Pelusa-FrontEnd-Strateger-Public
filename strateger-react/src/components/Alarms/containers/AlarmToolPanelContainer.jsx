import AlarmToolPanel from "../components/AlarmToolPanel/AlarmToolPanel";
import { useDispatch, useSelector } from 'react-redux';

import { 
        incrementTemporalidad, 
        decrementTemporalidad,   
        setSelectedTemporalidad, 
        setSelectedTypes, 
        selectSelectedTemporalidad, 
        selectSelectedTypes 
    } from '../../../redux/slices/alarmFilterSlice';
  

const AlarmToolPanelContainer = () => {
    const temporalidades = ['1m', '5m', '15m', '30m', '1h', '4h', 'D', 'W', 'M'];
    const Longtypes = [
    'order open long', 'order close long',   
    'indicator open long', 'indicator close long'
    ];
    const Shorttypes = [
    'order open short', 'order close short', 
    'indicator open short', 'indicator close short'
    ];

    const dispatch = useDispatch();

    const selectedTemporalidad = useSelector(selectSelectedTemporalidad);       // temporalidad seleccionada en el panel
    const selectedTypes = useSelector(selectSelectedTypes);                     // objeto que guarda la temporalidad y los tipos seleccionados en el panel  

    const toggleType = (type) => {
        const types = selectedTypes[selectedTemporalidad] || [];
        let updatedTypes;
        if (types.includes(type)) {
            updatedTypes = types.filter(t => t !== type);
            dispatch(decrementTemporalidad(selectedTemporalidad));
        } else {
            updatedTypes = [...types, type];
            dispatch(incrementTemporalidad(selectedTemporalidad));
        }
        dispatch(setSelectedTypes(updatedTypes));
    };

    const toggleTemporalidad = (temp) => {
        dispatch(setSelectedTemporalidad(temp));
    };

    return (        
        <AlarmToolPanel 
            temporalidades={temporalidades}
            Longtypes={Longtypes}
            Shorttypes={Shorttypes}
            selectedTemporalidad={selectedTemporalidad}
            selectedTypes={selectedTypes}
            toggleTemporalidad={toggleTemporalidad}
            toggleType={toggleType}
        />
    );
}

export default AlarmToolPanelContainer;