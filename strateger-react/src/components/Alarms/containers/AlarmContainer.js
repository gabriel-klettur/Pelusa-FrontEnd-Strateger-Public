//Path: strateger-react/src/components/Alarms/containers/AlarmContainer.js

// React and Redux
import React from 'react';
import { useSelector } from 'react-redux';

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

const AlarmContainer = () => {
  
  const { loading, error } = useSelector((state) => state.alarms);    
  
  useFetchAlarms();                         // Hook, Fetch alarms from API, save to store               'alarms'  

  // To filter using the AlarmToolPanel
  useFilterAlarmsByInterval();              // Hook, Filter alarms by interval, save to store           'filteredByIntervalAlarms'  
  useFilterAlarmsByIntervalAndType();       // Hook, Filter alarms by interval and type, save to store  'filteredByIntervalAndTypeAlarms'

  if (error) {
    <ErrorMessage message={error}/>
  };

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
              <AlarmTable viewTabType={'alarms'} />
            </TabPanel>
            <TabPanel>
              <AlarmTable viewTabType={'filteredByClickAlarms'} />
            </TabPanel>
            <TabPanel>
              <AlarmTable viewTabType={'filteredByIntervalAlarms'} />
            </TabPanel>
            <TabPanel>
              <AlarmTable viewTabType={'filteredByIntervalAndTypeAlarms'} />
            </TabPanel>
          </TabPanels>
        </TabGroup>        
      </div>
    </div>
  );
};

export default AlarmContainer;
