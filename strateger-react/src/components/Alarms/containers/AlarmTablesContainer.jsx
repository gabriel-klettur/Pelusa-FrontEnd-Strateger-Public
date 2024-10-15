// Path: strateger-react/src/components/Alarms/containers/AlarmContainer.js

// React and Redux
import React from 'react';
import { useSelector } from 'react-redux';

// Headless UI
import { TabGroup, TabList, TabPanels, TabPanel } from '@headlessui/react';

// Components
import AlarmTab from '../components/AlarmTab';
import { AlarmTable } from '../components/AlarmTable';
import LoadingOverlay from '../../common/LoadingOverlay/LoadingOverlay';
import ErrorMessage from '../../common/ErrorMessage';

// Hooks
import useFetchAlarms from '../hooks/useFetchAlarms';  
import useFilterAlarmsByIntervalAndType from '../hooks/useFilterAlarmsByIntervalAndType';
import useFilterAlarmsByInterval from '../hooks/useFilterAlarmsByInterval';

/**
 * AlarmContainer component.
 * 
 * This component is responsible for displaying alarms in different filtered views.
 * It uses several custom hooks to fetch and filter alarms, and displays them in a tabbed interface.
 * 
 * @component
 * 
 * @returns {JSX.Element} The rendered component.
 * 
 * @example
 * return (
 *   <AlarmContainer />
 * )
 * 
 * @hook
 * @name useFetchAlarms
 * @description Fetches alarms from the API.
 * 
 * @hook
 * @name useFilterAlarmsByInterval
 * @description Filters alarms by a selected interval.
 * 
 * @hook
 * @name useFilterAlarmsByIntervalAndType
 * @description Filters alarms by a selected interval and type.
 * 
 * @hook
 * @name useSelector
 * @description Retrieves state from the Redux store.
 * 
 * @param {Object} state - The Redux state.
 * @param {Object} state.alarms - The alarms state.
 * @param {boolean} state.alarms.loading - Indicates if alarms are being loaded.
 * @param {string} state.alarms.error - Error message if there was an error loading alarms.
 * @param {Array} state.alarms.alarms - The list of all alarms.
 * @param {Array} state.alarms.filteredByIntervalAlarms - The list of alarms filtered by interval.
 * @param {Array} state.alarms.filteredByIntervalAndTypeAlarms - The list of alarms filtered by interval and type.
 * @param {Array} state.alarms.filteredByClickAlarms - The list of alarms filtered by click.
 * 
 * @requires ErrorMessage
 * @requires LoadingOverlay
 * @requires TabGroup
 * @requires TabList
 * @requires TabPanel
 * @requires TabPanels
 * @requires AlarmTab
 * @requires AlarmTable
 */

const AlarmTablesContainer = () => {    
  const { loading, error } = useSelector((state) => state.alarms);
  const { alarms, filteredByIntervalAlarms, filteredByIntervalAndTypeAlarms, filteredByClickAlarms   } = useSelector((state) => state.alarms);

  useFetchAlarms();                         // Hook para obtener las alarmas desde la API
  useFilterAlarmsByInterval();              // Hook para filtrar alarmas por intervalo
  useFilterAlarmsByIntervalAndType();       // Hook para filtrar alarmas por intervalo y tipo

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
              />
            </TabPanel>
            <TabPanel>
              <AlarmTable                
                data={filteredByClickAlarms}                                                
              />
            </TabPanel>
            <TabPanel>
              <AlarmTable                
                data={filteredByIntervalAlarms}                                                
              />
            </TabPanel>
            <TabPanel>
              <AlarmTable                
                data={filteredByIntervalAndTypeAlarms}                                                
              />
            </TabPanel>
          </TabPanels>
        </TabGroup>        
      </div>
    </div>
  );
};

export default AlarmTablesContainer;
