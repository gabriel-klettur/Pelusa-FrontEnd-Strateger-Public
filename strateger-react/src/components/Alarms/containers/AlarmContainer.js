import React from 'react';
import { useSelector } from 'react-redux';
import { Tab } from '@headlessui/react';

import AlarmTable from '../components/AlarmTable/AlarmTable';

import LoadingOverlay from '../../common/utils/LoadingOverlay/LoadingOverlay';

import useFetchAlarms from '../hooks/useFetchAlarms';  
import useFilterAlarmsByIntervalAndType from '../hooks/useFilterAlarmsByIntervalAndType';
import useFilterAlarmsByInterval from '../hooks/useFilterAlarmsByInterval';
import AlarmTab from '../components/AlarmTab';

const AlarmContainer = () => {
  
  const { loading, error } = useSelector((state) => state.alarms);    
  
  //Si se modifica [dispatch, alarms.length] se vuelve a ejecutar el hook
  useFetchAlarms();                         // Hook, Fetch alarms from API, save to store               'alarms'

  //Si se modifica [selectedTemporalidad, alarms, dispatch], se vuelve a ejecutar el hook
  useFilterAlarmsByInterval();              // Hook, Filter alarms by interval, save to store           'filteredByIntervalAlarms'

  //Si se modifica [selectedTypes, alarms, dispatch, selectedTemporalidad], se vuelve a ejecutar el hook
  useFilterAlarmsByIntervalAndType();       // Hook, Filter alarms by interval and type, save to store  'filteredByIntervalAndTypeAlarms'

  if (error) {
    return <div className="text-center py-4 text-red-600">Error al cargar alarmas: {error}</div>;
  }

  return (
    <div className="relative">
      <LoadingOverlay isLoading={loading} />
      <div className="text-sm">
        <Tab.Group>
          <Tab.List className="flex justify-start bg-african_violet-300">
            <AlarmTab tabName="Alarms"/>
            <AlarmTab tabName="Selected Alarms"/>
            <AlarmTab tabName="Filtered by Selected Interval"/>
            <AlarmTab tabName="Filtered by Selected Interval and Type"/>            
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <AlarmTable viewTabType={'alarms'} />
            </Tab.Panel>
            <Tab.Panel>
              <AlarmTable viewTabType={'filteredByClickAlarms'} />
            </Tab.Panel>
            <Tab.Panel>
              <AlarmTable viewTabType={'filteredByIntervalAlarms'} />
            </Tab.Panel>
            <Tab.Panel>
              <AlarmTable viewTabType={'filteredByIntervalAndTypeAlarms'} />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>        
      </div>
    </div>
  );
};

export default AlarmContainer;
