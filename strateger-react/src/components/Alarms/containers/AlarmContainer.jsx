
import { useSelector } from 'react-redux';

import MainChart from '../../Charts/MainChart/MainChart';
import AlarmTablesContainer from "./AlarmTablesContainer";
import AlarmInfoPanel from './AlarmInfoPanelContainer';

import { selectAlarmsData } from '../../../redux/alarm';

const AlarmContainer = () => {

    const alarmsData = useSelector(selectAlarmsData);        

    return (
        <div className="flex flex-col">            
            <div className='grid grid-cols-10'>
                <div className='col-span-7'>
                    <MainChart/>
                </div>
                <div className='col-span-3 mt-1 mr-1 mb-1'>
                    <AlarmInfoPanel
                        alarmsData={alarmsData}                        
                    />                                      
                </div>
            </div>
            <div className='mr-1 bg-african_violet-300 rounded-sm'>                
                <AlarmTablesContainer />           
            </div>
        </div>
    );
};

export default AlarmContainer;