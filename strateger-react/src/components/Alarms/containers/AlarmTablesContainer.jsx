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
import  AlarmFiltersPanelContainer  from './AlarmFiltersPanelContainer';

// Hooks
import useFetchAlarms from '../hooks/useFetchAlarms';  

//Redux Selectors
import { selectAlarmsLoading, selectAlarmsError, selectAlarmsData, selectAlarmsPage, selectAlarmsHasMore, selectAlarmsOffset} from '../../../redux/alarm';
import { selectFilteredByClickAlarms, selectFilteredByClickAlarmsPage, selectFilteredByClickAlarmsHasMore } from '../../../redux/alarm';
import { selectFilteredByOptionsAlarms, selectFilteredByOptionsAlarmsPage, selectFilteredByOptionsAlarmsHasMore } from '../../../redux/alarm';

//Redux Actions
import { setPageAlarms, setPageFilteredByClickAlarms, setPageFilteredByOptions} from '../../../redux/alarm';
import { setHasMoreAlarms, setHasMoreFilteredByClickAlarms, setHasMoreFilteredByOptions} from '../../../redux/alarm';

const AlarmTablesContainer =() => {    
  const loadingAlarms = useSelector(selectAlarmsLoading);
  const errorAlarms = useSelector(selectAlarmsError);  
  const PageAlarm = useSelector(selectAlarmsPage);
  const HasMoreAlarm = useSelector(selectAlarmsHasMore);
  const dataAlarms = useSelector(selectAlarmsData);
  const offsetAlarms = useSelector(selectAlarmsOffset);
  
  const dataFilteredByClickAlarms = useSelector(selectFilteredByClickAlarms);
  const pageFilteredByClickAlarms = useSelector(selectFilteredByClickAlarmsPage);
  const hasMoreFilteredByClickAlarms = useSelector(selectFilteredByClickAlarmsHasMore);

  const dataFilteredByOptions = useSelector(selectFilteredByOptionsAlarms);
  const pageFilteredByOptions = useSelector(selectFilteredByOptionsAlarmsPage);
  const hasMoreFilteredByOptions = useSelector(selectFilteredByOptionsAlarmsHasMore);

  useFetchAlarms();                         // Hook para obtener las alarmas desde la API

  if (errorAlarms) {
    return <ErrorMessage message={errorAlarms}/>;
  }  

  return (
    <div className="relative">
      <LoadingOverlay isLoading={loadingAlarms} />
      
      <div className="text-sm">
        <TabGroup>

          <div className="flex justify-between bg-african_violet-300">
            <TabList className="flex justify-start bg-african_violet-300">
              <AlarmTab 
                tabName="Alarms"              
              />
              <AlarmTab 
                tabName="Selected Alarms"              
              />
              <AlarmTab 
                tabName="Filtered"              
              />           
            </TabList>

            <AlarmFiltersPanelContainer />
          </div>

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
                data={dataFilteredByOptions}                                                
                page={pageFilteredByOptions}
                hasMore={hasMoreFilteredByOptions}                                             
                setHasMore={setHasMoreFilteredByOptions}
                setPage={setPageFilteredByOptions}                                      
              />
            </TabPanel>
          </TabPanels>
        </TabGroup>      
      </div>
    </div>
  );
};

export default AlarmTablesContainer;
