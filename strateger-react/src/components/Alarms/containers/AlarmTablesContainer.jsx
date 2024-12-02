// Path: src/components/Alarms/containers/AlarmTablesContainer.jsx

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

//Redux Selectors
import { selectAlarmsLoading, selectAlarmsError, selectAlarmsData, selectAlarmsPage, selectAlarmsHasMore, selectAlarmsOffset} from '../../../redux/alarm';
import { selectFilteredByClickAlarms, selectFilteredByClickAlarmsPage, selectFilteredByClickAlarmsHasMore } from '../../../redux/alarm';
import { selectFilteredByIntervalAlarms, selectFilteredByIntervalAlarmsPage, selectFilteredByIntervalAlarmsHasMore } from '../../../redux/alarm';
import { selectFilteredByIntervalAndTypeAlarms, selectFilteredByIntervalAndTypeAlarmsPage, selectFilteredByIntervalAndTypeAlarmsHasMore } from '../../../redux/alarm';

//Redux Actions
import { setPageAlarms, setPageFilteredByClickAlarms, setPageFilteredByIntervalAlarms, setPageFilteredByIntervalAndTypeAlarms} from '../../../redux/alarm';
import { setHasMoreAlarms, setHasMoreFilteredByClickAlarms, setHasMoreFilteredByIntervalAlarms, setHasMoreFilteredByIntervalAndTypeAlarms} from '../../../redux/alarm';

const AlarmTablesContainer =({setShowFilterPanel}) => {    
  const loadingAlarms = useSelector(selectAlarmsLoading);
  const errorAlarms = useSelector(selectAlarmsError);  
  const PageAlarm = useSelector(selectAlarmsPage);
  const HasMoreAlarm = useSelector(selectAlarmsHasMore);
  const dataAlarms = useSelector(selectAlarmsData);
  const offsetAlarms = useSelector(selectAlarmsOffset);
  

  const dataFilteredByClickAlarms = useSelector(selectFilteredByClickAlarms);
  const pageFilteredByClickAlarms = useSelector(selectFilteredByClickAlarmsPage);

  const hasMoreFilteredByClickAlarms = useSelector(selectFilteredByClickAlarmsHasMore);

  const dataFilteredByIntervalAlarms = useSelector(selectFilteredByIntervalAlarms);
  const pageFilteredByIntervalAlarms = useSelector(selectFilteredByIntervalAlarmsPage);
  
  const hasMoreFilteredByIntervalAlarms = useSelector(selectFilteredByIntervalAlarmsHasMore);

  const dataFilteredByIntervalAndTypeAlarms = useSelector(selectFilteredByIntervalAndTypeAlarms);
  const pageFilteredByIntervalAndTypeAlarms = useSelector(selectFilteredByIntervalAndTypeAlarmsPage);
  
  const hasMoreFilteredByIntervalAndTypeAlarms = useSelector(selectFilteredByIntervalAndTypeAlarmsHasMore);


  useFetchAlarms();                         // Hook para obtener las alarmas desde la API
  useFilterAlarmsByInterval();              // Hook para filtrar alarmas por intervalo
  useFilterAlarmsByIntervalAndType();       // Hook para filtrar alarmas por intervalo y tipo

  if (errorAlarms) {
    return <ErrorMessage message={errorAlarms}/>;
  }  

  return (
    <div className="relative">
      <LoadingOverlay isLoading={loadingAlarms} />
      <div className="text-sm">
        <TabGroup>
          <TabList className="flex justify-start bg-african_violet-300">
            <AlarmTab 
              tabName="Alarms"
              setShowFilterPanel={setShowFilterPanel}
            />
            <AlarmTab 
              tabName="Selected Alarms"
              setShowFilterPanel={setShowFilterPanel}
            />
            <AlarmTab 
              tabName="Filtered by Selected Interval"
              setShowFilterPanel={setShowFilterPanel}
            />
            <AlarmTab 
              tabName="Filtered by Selected Interval and Type"
              setShowFilterPanel={setShowFilterPanel}
            />            
          </TabList>
          <TabPanels>
            <TabPanel>
              <AlarmTable                
                data={dataAlarms}   
                page={PageAlarm}
                hasMore={HasMoreAlarm} 
                setHasMore={setHasMoreAlarms} 
                offset={offsetAlarms}     
                setPage={setPageAlarms}                                      
              />
            </TabPanel>
            <TabPanel>
              <AlarmTable                
                data={dataFilteredByClickAlarms}                                                
                page={pageFilteredByClickAlarms}
                hasMore={hasMoreFilteredByClickAlarms}                                             
                setHasMore={setHasMoreFilteredByClickAlarms}
                setPage={setPageFilteredByClickAlarms}                                      
              />
            </TabPanel>
            <TabPanel>
              <AlarmTable                
                data={dataFilteredByIntervalAlarms}                                                
                page={pageFilteredByIntervalAlarms}
                hasMore={hasMoreFilteredByIntervalAlarms}                                             
                setHasMore={setHasMoreFilteredByIntervalAlarms}
                setPage={setPageFilteredByIntervalAlarms}                                      
              />
            </TabPanel>
            <TabPanel>
              <AlarmTable                
                data={dataFilteredByIntervalAndTypeAlarms}                                                
                page={pageFilteredByIntervalAndTypeAlarms}
                hasMore={hasMoreFilteredByIntervalAndTypeAlarms}                                                                                             
                setHasMore={setHasMoreFilteredByIntervalAndTypeAlarms}
                setPage={setPageFilteredByIntervalAndTypeAlarms}                                      
              />
            </TabPanel>
          </TabPanels>
        </TabGroup>        
      </div>
    </div>
  );
};

export default AlarmTablesContainer;
