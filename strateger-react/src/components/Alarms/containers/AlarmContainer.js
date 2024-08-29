import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Tab } from '@headlessui/react';

import AlarmTable from '../components/AlarmTable/AlarmTable';
import Pagination from '../components/AlarmTable/Pagination';
import LoadingOverlay from '../../common/LoadingOverlay/LoadingOverlay';

import useFetchAlarms from '../hooks/useFetchAlarms';  
import useFilterAlarmsByIntervalAndType from '../hooks/useFilterAlarmsByIntervalAndType';
import useFilterAlarmsByInterval from '../hooks/useFilterAlarmsByInterval';
import useSortAlarmsById from '../hooks/useSortAlarmsById';
import AlarmTab from '../components/AlarmTab';

const AlarmContainer = () => {
  
  const { alarms, page, filteredByIntervalAlarms, filteredByIntervalAndTypeAlarms, hasMore, loading, error } = useSelector((state) => state.alarms);  
  const [viewType, setViewType] = useState('alarms');
  

  //Si se modifica [dispatch, alarms.length] se vuelve a ejecutar el hook
  useFetchAlarms();                         // Hook, Fetch alarms from API, save to store               'alarms'

  //Si se modifica [selectedTemporalidad, alarms, dispatch], se vuelve a ejecutar el hook
  useFilterAlarmsByInterval();              // Hook, Filter alarms by interval, save to store           'filteredByIntervalAlarms'

  //Si se modifica [selectedTypes, alarms, dispatch, selectedTemporalidad], se vuelve a ejecutar el hook
  useFilterAlarmsByIntervalAndType();       // Hook, Filter alarms by interval and type, save to store  'filteredByIntervalAndTypeAlarms'


  const sortedAlarms = useSortAlarmsById(viewType, alarms, filteredByIntervalAlarms, filteredByIntervalAndTypeAlarms);  // Hook, Sort alarms by id

  if (error) {
    return <div className="text-center py-4 text-red-600">Error al cargar alarmas: {error}</div>;
  }

  const currentAlarms = sortedAlarms.slice(page * 20, (page * 20) + 20);

  return (
    <div className="relative">
      <LoadingOverlay isLoading={loading} />
      <div className="text-sm">
      <Tab.Group onChange={(index) => 
        {
          if (index === 0) {
            setViewType('alarms');
          } else if (index === 1) {
            setViewType('filteredByIntervalAlarms');
          } else if (index === 2) {
            setViewType('filteredByIntervalAlarms');
          } else {
            setViewType('filteredByIntervalAndTypeAlarms');
          }
        }}>
          <Tab.List className="flex justify-start bg-african_violet-300">
            <AlarmTab tabName="Alarms" />
            <AlarmTab tabName="Selected Alarms" />
            <AlarmTab tabName="Filtered by Selected Interval" />
            <AlarmTab tabName="Filtered by Selected Interval and Type" />            
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <AlarmTable alarms={currentAlarms} selectedAlarmsByInterval={filteredByIntervalAlarms}  />
            </Tab.Panel>
            <Tab.Panel>
              <AlarmTable alarms={currentAlarms} selectedAlarmsByInterval={filteredByIntervalAlarms} />
            </Tab.Panel>
            <Tab.Panel>
              <AlarmTable alarms={currentAlarms} selectedAlarmsByInterval={filteredByIntervalAlarms}  />
            </Tab.Panel>
            <Tab.Panel>
              <AlarmTable alarms={currentAlarms} selectedAlarmsByInterval={filteredByIntervalAlarms}  />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
        <Pagination 
          page={page} 
          hasMore={hasMore} 
          endIndex={page * 20 + currentAlarms.length} 
          alarmsLength={sortedAlarms.length}           
        />
      </div>
    </div>
  );
};

export default AlarmContainer;
