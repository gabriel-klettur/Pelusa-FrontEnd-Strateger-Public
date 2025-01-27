//Path: strateger-react/src/components/Alarms/containers/AlarmContainer.jsx

import { useSelector } from 'react-redux';

//! Components
import MainChart from '../../Charts/MainChart/MainChart';
import AlarmTablesContainer from "Alarms/containers/AlarmTablesContainer";
import AlarmInfoPanel from 'Alarms/containers/AlarmInfoPanelContainer';

//! Hooks
import { useShowButtonsPanel } from 'Alarms/hooks/useShowButtonsPanel';

//! Redux Selectors
import { selectAlarmsData, selectFilteredByClickAlarms, selectFilteredByOptionsAlarms} from 'reduxStore/alarm';

const AlarmsMainView = () => {

    //TODO - Handle the visibility of the buttons panel
    const { showButtonsPanel } = useShowButtonsPanel({
        showChartsButtonsPanel: true,
        showAlarmsButtonsPanel: true,
        showOrdersButtonsPanel: false,
    });

    //TODO - Get the alarms data from the store
    const alarmsData = useSelector(selectAlarmsData);
    const filteredByClickAlarmsData = useSelector(selectFilteredByClickAlarms);
    const filteredByOptionsAlarmsData = useSelector(selectFilteredByOptionsAlarms);

    return (
        <div className="flex flex-col bg-african_violet-700 " data-testid="alarms-container">            
            <div className='grid grid-cols-10'>
                <div className='col-span-7'>
                    <MainChart
                        showButtonsPanel={showButtonsPanel}                        
                    />
                </div>
                <div className='col-span-3 mt-1 mr-1 mb-1'>
                    <AlarmInfoPanel
                        alarmsData={alarmsData}      
                        filteredByClickAlarmsData={filteredByClickAlarmsData}
                        filteredByOptionsAlarmsData={filteredByOptionsAlarmsData}                  
                    />                                      
                </div>
            </div>
            <div className='ml-1 mr-1 bg-african_violet-300 rounded-sm'>                
                <AlarmTablesContainer />           
            </div>
        </div>
    );
};

export default AlarmsMainView;