
import  AlarmFiltersPanelContainer  from './AlarmFiltersPanelContainer';
import CandlestickChart from '../../Charts/CandlestickChartChart/CandlestickChart';
import AlarmTablesContainer from "./AlarmTablesContainer";
import Toolbar from '../../ToolBar/Toolbar';

const AlarmContainer = () => {
    return (
        <div className="flex flex-col">
            <Toolbar/>
            <div className='grid grid-cols-10'>
                <div className='col-span-7'>
                    <CandlestickChart/>
                </div>
                <div className='col-span-3'>
                    <AlarmFiltersPanelContainer/>
                </div>
            </div>
            <AlarmTablesContainer/>            
        </div>
    );
};

export default AlarmContainer;