// Path: src/components/Alarms/containers/AlarmTablesContainer.jsx

// React and Redux
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Headless UI
import { TabGroup, TabList, TabPanels, TabPanel } from '@headlessui/react';

// Components
import AlarmTab from '../components/AlarmTab';
import AlarmTable from '../components/AlarmTable/AlarmTable';
import ErrorMessage from '../../common/ErrorMessage';
import  AlarmFiltersPanelContainer  from './AlarmFiltersPanelContainer';

// Hooks
import useFetchAlarms from '../hooks/useFetchAlarms';  

//Redux Selectors
import { selectAlarmsError, selectAlarmsData, selectAlarmsPage, selectAlarmsHasMore, selectAlarmsOffset} from '../../../redux/alarm';
import { selectFilteredByClickAlarms, selectFilteredByClickAlarmsPage, selectFilteredByClickAlarmsHasMore } from '../../../redux/alarm';
import { selectFilteredByOptionsAlarms, selectFilteredByOptionsAlarmsPage, selectFilteredByOptionsAlarmsHasMore } from '../../../redux/alarm';
import { selectAlarmsDataLength, selectFilteredByClickAlarmsLength, selectFilteredByOptionsAlarmsLength } from "../../../redux/alarm";
import { setActiveTab } from '../../../redux/interaction';
import { setActiveRadarDataset } from '../../../redux/interaction';

//Redux Actions
import { setPageAlarms, setPageFilteredByClickAlarms, setPageFilteredByOptions} from '../../../redux/alarm';
import { setHasMoreAlarms, setHasMoreFilteredByClickAlarms, setHasMoreFilteredByOptions} from '../../../redux/alarm';

const AlarmTablesContainer =() => { 
  const dispatch = useDispatch();
  const activeTabs = useSelector((state) => state.interaction.Alarms.Tabs);
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
  const alarmsDataLength = useSelector(selectAlarmsDataLength);
  const filteredByClickAlarmsLength = useSelector(selectFilteredByClickAlarmsLength);
  const filteredByOptionsAlarmsLength = useSelector(selectFilteredByOptionsAlarmsLength);

  useFetchAlarms(100000);

  const ErrorMessage = ({ message }) => (
    <div className="error-message" data-testid="error-message">
      {message}
    </div>
  );

  if (errorAlarms) {
    return <ErrorMessage message={errorAlarms} />;
  }  

  return (
    <div className="relative" data-testid="alarm-tables-container">            
      <div className="text-sm">
        <TabGroup
          selectedIndex={Object.values(activeTabs).indexOf(true)}
          onChange={(index) => {
            const tabMapping = ['alarms', 'selected', 'filtered'];
            dispatch(setActiveRadarDataset(tabMapping[index]));
          }}
        >
          <div className="flex justify-between bg-african_violet-300">
            <TabList className="flex justify-start bg-african_violet-300" data-testid="tab-list">
              <AlarmTab
                tabName={`Alarms (${alarmsDataLength})`}              
                disabled={alarmsDataLength === 0}
                selected={activeTabs.alarms}
                onClick={() => dispatch(setActiveTab({ tabReduxId: 'alarms' }))}
              />
              <AlarmTab
                tabName={`Filtered by Click (${filteredByClickAlarmsLength})`}              
                disabled={filteredByClickAlarmsLength === 0}
                selected={activeTabs.selected}
                onClick={() => dispatch(setActiveTab({ tabReduxId: 'selected' }))}
              />
              <AlarmTab
                tabName={`Filtered by Options (${filteredByOptionsAlarmsLength})`}              
                disabled={filteredByOptionsAlarmsLength === 0}
                selected={activeTabs.filtered}
                onClick={() => dispatch(setActiveTab({ tabReduxId: 'filtered' }))}
              />
            </TabList>

            <AlarmFiltersPanelContainer data-testid="alarm-filters-panel" />
          </div>

          <TabPanels data-testid="tab-panels">
            <TabPanel data-testid="tab-panel-alarms">
              <AlarmTable                
                data={dataAlarms}   
                page={PageAlarm}
                hasMore={HasMoreAlarm} 
                setHasMore={setHasMoreAlarms} 
                offset={offsetAlarms}     
                setPage={setPageAlarms}                                      
              />
            </TabPanel>
            <TabPanel data-testid="tab-panel-click">
              <AlarmTable                
                data={dataFilteredByClickAlarms}                                                 
                page={pageFilteredByClickAlarms}
                hasMore={hasMoreFilteredByClickAlarms}                                             
                setHasMore={setHasMoreFilteredByClickAlarms}
                setPage={setPageFilteredByClickAlarms}                                      
              />
            </TabPanel>
            <TabPanel data-testid="tab-panel-filtered">
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