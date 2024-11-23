import { useState } from 'react';

import  AlarmFiltersPanelContainer  from './AlarmFiltersPanelContainer';
import MainChart from '../../Charts/MainChart/MainChart';
import AlarmTablesContainer from "./AlarmTablesContainer";
import AlarmInfoPanel from './AlarmInfoPanel';

const AlarmContainer = () => {

    const [showFilterPanel, setShowFilterPanel] = useState(false);

    return (
        <div className="flex flex-col">            
            <div className='grid grid-cols-10'>
                <div className='col-span-6'>
                    <MainChart/>
                </div>
                <div className='flex flex-col h-full col-span-4'>
                    <div className='h-92 mt-1 mr-1 mb-1'>                        
                        <AlarmInfoPanel/>
                    </div>                    
                </div>
            </div>
            <div className='mr-1 bg-african_violet-300 rounded-sm'>

                {showFilterPanel && <AlarmFiltersPanelContainer />}

                <AlarmTablesContainer setShowFilterPanel={setShowFilterPanel} />           
            </div>
        </div>
    );
};

export default AlarmContainer;