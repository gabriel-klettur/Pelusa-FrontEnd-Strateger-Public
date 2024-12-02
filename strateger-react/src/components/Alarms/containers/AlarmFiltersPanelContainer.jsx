//Path: src/components/Alarms/containers/AlarmFiltersPanelContainer.jsx

import IntervalBar from '../components/AlarmFiltersPanel/IntervalBar/IntervalBar';
import OrderTypePanel from '../components/AlarmFiltersPanel/OrderTypePanel/OrderTypePanel';
import { useSelector } from 'react-redux';

import {   
  selectSelectedTemporalidad, 
  selectSelectedTypes 
} from '../../../redux/alarm/filtersPanel';
  
const AlarmFiltersPanelContainer = () => {
    const selectedTemporalidad = useSelector(selectSelectedTemporalidad);       // temporalidad seleccionada en el panel
    const selectedTypes = useSelector(selectSelectedTypes);                     // objeto que guarda la temporalidad y los tipos seleccionados en el panel  
  
    return (
      <div className="flex space-x-12">
        <div>
          <IntervalBar            
            selectedTemporalidad={selectedTemporalidad}
            selectedTypes={selectedTypes}          
          />
        </div>
        <div className="p-1 text-african_violet-700">
          |
        </div>
        <div className="">
          <OrderTypePanel
            selectedTemporalidad={selectedTemporalidad}
            selectedTypes={selectedTypes}          
          />   
        </div>   
      </div>
    );
}

export default AlarmFiltersPanelContainer;