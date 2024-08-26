import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tab } from '@headlessui/react';

import AlarmTable from '../components/AlarmTable/AlarmTable';
import Pagination from '../components/AlarmTable/Pagination';
import LoadingOverlay from '../../common/LoadingOverlay/LoadingOverlay';

import useFetchAlarms from '../hooks/useFetchAlarms';  
import useFilterAlarmsByIntervalAndType from '../hooks/useFilterAlarmsByIntervalAndType';
import useFilterAlarmsByInterval from '../hooks/useFilterAlarmsByInterval';
import useSortAlarmsById from '../hooks/useSortAlarmsById';
import handleSelectAlarm from '../components/AlarmTable/handleSelectAlarm';
import AlarmTab from '../components/AlarmTab';

const AlarmContainer = () => {

  const dispatch = useDispatch();  
  const { alarms, page, selectedAlarms, allSelectedAlarms, hasMore, loading, error } = useSelector((state) => state.alarms);  
  const [viewType, setViewType] = useState('alarms');  

  useFetchAlarms();  
  useFilterAlarmsByInterval();            
  useFilterAlarmsByIntervalAndType();     

  const handleAlarmSelection = (alarm) => handleSelectAlarm(alarm, selectedAlarms, dispatch);
  const sortedAlarms = useSortAlarmsById(viewType, alarms, selectedAlarms, allSelectedAlarms);

  if (error) {
    return <div className="text-center py-4 text-red-600">Error al cargar alarmas: {error}</div>;
  }

  const currentAlarms = sortedAlarms.slice(page * 20, (page * 20) + 20);

  return (
    <div className="relative">
      <LoadingOverlay isLoading={loading} />
      <div className="text-sm">
        <Tab.Group onChange={(index) => setViewType(index === 0 ? 'alarms' : index === 1 ? 'selectedAlarms' : 'allSelectedAlarms')}>
          <Tab.List className="flex justify-start bg-african_violet-300">
            <AlarmTab tabName="Alarms" />
            <AlarmTab tabName="Filtered by Interval" />
            <AlarmTab tabName="Filtered by Interval and Type" />            
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <AlarmTable alarms={currentAlarms} selectedAlarms={selectedAlarms} handleSelectAlarm={handleAlarmSelection} />
            </Tab.Panel>
            <Tab.Panel>
              <AlarmTable alarms={currentAlarms} selectedAlarms={selectedAlarms} handleSelectAlarm={handleAlarmSelection} />
            </Tab.Panel>
            <Tab.Panel>
              <AlarmTable alarms={currentAlarms} selectedAlarms={selectedAlarms} handleSelectAlarm={handleAlarmSelection} />
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
