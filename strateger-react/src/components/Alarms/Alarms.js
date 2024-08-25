// Path: strateger-react/src/components/Alarms/Alarms.js
import React from 'react';

import { useSelector } from 'react-redux'; //Hooks de Redux. Permite acceder al estado de Redux y despachar acciones al store de Redux.


import useFetchAlarms from './hooks/useFetchAlarms';  
import useFilterAlarmsByIntervalAndType from './hooks/useFilterAlarmsByIntervalAndType';
import useFilterAlarmsByInterval from './hooks/useFilterAlarmsByInterval';

import AlarmContainer from './containers/AlarmContainer';

const Alarms = () => {  
  const { alarms, page, selectedAlarms, allSelectedAlarms, 
          hasMore, offset, loading, error } = useSelector((state) => state.alarms);  // Hook de Redux. Permite acceder al estado de Redux. 

  useFetchAlarms();                       // Hook Personalizado. Cargar alarmas al montar el componente  
  useFilterAlarmsByInterval();            // Hook Personalizado. Actualizar las alarmas según la temporalidad seleccionada
  useFilterAlarmsByIntervalAndType();     // Hook Personalizado. Actualizar las alarmas seleccionadas segun los tipos seleccionados

  return (
    <>      
      <AlarmContainer 
        alarms={alarms} 
        selectedAlarms={selectedAlarms} 
        allSelectedAlarms={allSelectedAlarms}         
        loading={loading} 
        error={error} 
        page={page}         
        hasMore={hasMore} 
        offset={offset} 
      />
    </>
  );
};

export default Alarms;
