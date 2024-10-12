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
    page,
    hasMore,
    loading,
    error,
  } = useSelector((state) => state.alarms);

  useFetchAlarms();                         // Hook para obtener las alarmas desde la API
  useFilterAlarmsByInterval();              // Hook para filtrar alarmas por intervalo
  useFilterAlarmsByIntervalAndType();       // Hook para filtrar alarmas por intervalo y tipo

  // Definir las columnas para la tabla
  const columns = [
    { label: 'ID', key: 'id' },
    { label: 'Ticker', key: 'Ticker' },
    { label: 'T', key: 'Temporalidad' },
    { label: 'Entry Price', key: 'Entry_Price_Alert' },
    { label: 'Exit Price', key: 'Exit_Price_Alert' },
    { label: 'Time', key: 'Time_Alert' },
    { label: 'Type', key: 'Order' },
    { label: 'Estrategia', key: 'Strategy' },
  ];

  // Función para manejar la selección de una alarma por clic
  const handleAlarmSelectionByClick = (alarm) => {
    handleSelectAlarmByClick(alarm, filteredByClickAlarms, dispatch);
  };

  // Función para obtener los datos según el tipo de vista
  const getDataForViewType = (viewTabType) => {
    let listToSort = [];
    
    switch (viewTabType) {
      case 'filteredByIntervalAlarms':        
        listToSort = filteredByIntervalAlarms;        
        break;
      case 'filteredByClickAlarms':        
        listToSort = filteredByClickAlarms;
        break;
      case 'filteredByIntervalAndTypeAlarms':        
        listToSort = filteredByIntervalAndTypeAlarms;
        break;
      default:        
        listToSort = alarms;
    }
    const sortedList = [...listToSort].sort((a, b) => b.id - a.id);
    const currentAlarms = sortedList.slice(page * 20, (page * 20) + 20);

    return { data: currentAlarms, totalLength: sortedList.length };
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
                columns={columns}
                data={getDataForViewType('alarms').data}
                totalLength={getDataForViewType('alarms').totalLength}
                page={page}
                hasMore={hasMore}
                handleAlarmSelectionByClick={handleAlarmSelectionByClick}
                filteredByIntervalAlarms={filteredByIntervalAlarms}
                filteredByClickAlarms={filteredByClickAlarms}
              />
            </TabPanel>
            <TabPanel>
              <AlarmTable
                columns={columns}
                data={getDataForViewType('filteredByClickAlarms').data}
                totalLength={getDataForViewType('filteredByClickAlarms').totalLength}
                page={page}
                hasMore={hasMore}
                handleAlarmSelectionByClick={handleAlarmSelectionByClick}
                filteredByIntervalAlarms={filteredByIntervalAlarms}
                filteredByClickAlarms={filteredByClickAlarms}
              />
            </TabPanel>
            <TabPanel>
              <AlarmTable
                columns={columns}
                data={getDataForViewType('filteredByIntervalAlarms').data}
                totalLength={getDataForViewType('filteredByIntervalAlarms').totalLength}
                page={page}
                hasMore={hasMore}
                handleAlarmSelectionByClick={handleAlarmSelectionByClick}
                filteredByIntervalAlarms={filteredByIntervalAlarms}
                filteredByClickAlarms={filteredByClickAlarms}
              />
            </TabPanel>
            <TabPanel>
              <AlarmTable
                columns={columns}
                data={getDataForViewType('filteredByIntervalAndTypeAlarms').data}
                totalLength={getDataForViewType('filteredByIntervalAndTypeAlarms').totalLength}
                page={page}
                hasMore={hasMore}
                handleAlarmSelectionByClick={handleAlarmSelectionByClick}
                filteredByIntervalAlarms={filteredByIntervalAlarms}
                filteredByClickAlarms={filteredByClickAlarms}
              />
            </TabPanel>
          </TabPanels>
        </TabGroup>        
      </div>
    </div>
  );
};

export default AlarmContainer;
