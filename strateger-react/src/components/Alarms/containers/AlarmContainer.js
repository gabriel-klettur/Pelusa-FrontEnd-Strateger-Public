// Path: strateger-react/src/components/Alarms/containers/AlarmContainer.js

// React and Redux
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Headless UI
import { TabGroup, TabList, TabPanels, TabPanel } from '@headlessui/react';

// Components
import AlarmTab from '../components/AlarmTab';
import AlarmTable from '../components/AlarmTable/AlarmTable';
import LoadingOverlay from '../../common/LoadingOverlay/LoadingOverlay';
import ErrorMessage from '../../common/ErrorMessage';

// Hooks
import useFetchAlarms from '../hooks/useFetchAlarms';  
import useFilterAlarmsByIntervalAndType from '../hooks/useFilterAlarmsByIntervalAndType';
import useFilterAlarmsByInterval from '../hooks/useFilterAlarmsByInterval';

// Importa la función de manejo de selección
import handleSelectAlarmByClick from '../components/AlarmTable/handleSelectAlarmByClick';

const AlarmContainer = () => {
  
  const dispatch = useDispatch();

  // Obtener todos los datos necesarios del estado
  const {
    alarms,
    filteredByIntervalAlarms,
    filteredByIntervalAndTypeAlarms,
    filteredByClickAlarms,    
    loading,
    error,
  } = useSelector((state) => state.alarms);

  useFetchAlarms();                         // Hook para obtener las alarmas desde la API
  useFilterAlarmsByInterval();              // Hook para filtrar alarmas por intervalo
  useFilterAlarmsByIntervalAndType();       // Hook para filtrar alarmas por intervalo y tipo

  // Función para manejar la selección de una alarma por clic
  const handleAlarmSelectionByClick = (alarm) => {
    handleSelectAlarmByClick(alarm, filteredByClickAlarms, dispatch);
  };
  
  if (error) {
    return <ErrorMessage message={error}/>;
  }

  return (
    <div className="relative">
      <LoadingOverlay isLoading={loading} />
      <div className="text-sm">
        <TabGroup>
          <TabList className="flex justify-start bg-african_violet-300">
            <AlarmTab tabName="Alarms"/>
            <AlarmTab tabName="Selected Alarms"/>
            <AlarmTab tabName="Filtered by Selected Interval"/>
            <AlarmTab tabName="Filtered by Selected Interval and Type"/>            
          </TabList>
          <TabPanels>
            <TabPanel>
              <AlarmTable                
                data={alarms}                                
                handleAlarmSelectionByClick={handleAlarmSelectionByClick}                
              />
            </TabPanel>
            <TabPanel>
              <AlarmTable                
                data={filteredByClickAlarms}                                
                handleAlarmSelectionByClick={handleAlarmSelectionByClick}                
              />
            </TabPanel>
            <TabPanel>
              <AlarmTable                
                data={filteredByIntervalAlarms}                                
                handleAlarmSelectionByClick={handleAlarmSelectionByClick}                
              />
            </TabPanel>
            <TabPanel>
              <AlarmTable                
                data={filteredByIntervalAndTypeAlarms}                                
                handleAlarmSelectionByClick={handleAlarmSelectionByClick}                
              />
            </TabPanel>
          </TabPanels>
        </TabGroup>        
      </div>
    </div>
  );
};

export default AlarmContainer;
