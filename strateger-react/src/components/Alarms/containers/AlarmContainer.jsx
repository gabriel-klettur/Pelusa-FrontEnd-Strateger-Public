
import  AlarmFiltersPanelContainer  from './AlarmFiltersPanelContainer';
import CandlestickChart from '../../Charts/CandlestickChartChart/CandlestickChart';
import AlarmTablesContainer from "./AlarmTablesContainer";
import Toolbar from '../../ToolBar/Toolbar';
import AlarmInfoPanel from './AlarmInfoPanel';

const AlarmContainer = () => {
    return (
        <div className="flex flex-col">
            <Toolbar/>
            <div className='grid grid-cols-10'>
                <div className='col-span-7'>
                    <CandlestickChart/>
                </div>
                <div className='flex flex-col h-full col-span-3'>
                    <AlarmInfoPanel/>
                    <AlarmFiltersPanelContainer/>                

                </div>
            </div>
            <AlarmTablesContainer/>            
        </div>
    );
};

export default AlarmContainer;