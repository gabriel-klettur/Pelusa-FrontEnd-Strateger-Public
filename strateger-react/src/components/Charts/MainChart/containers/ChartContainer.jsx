
import { useSelector } from 'react-redux';

import { selectTemporalidad, selectStartDate, selectCurrentDate } from 'reduxStore/toolBar';

import StochasticChartContainer from './StochasticChartContainer';
import CandlestickChartContainer from './CandlestickChartContainer';

import useFetchChartData from '../hooks/data/useFetchChartData';                        // Request data from the server
import useSetupChartParameters from '../hooks/charts/useSetupChartParameters';          // Setup chart parameters  
import useChartComponentVisibility from '../hooks/charts/useChartComponentVisibility';  // Setup chart components visibility
import useAlarmMarkersVisibility from '../hooks/useAlarmMarkersVisibility';             // Setup alarm markers visibility 

import LoadingOverlay from '../../../common/LoadingOverlay/LoadingOverlay';             // Loading overlay component
import ButtonsPanel from '../components/buttonsPanel/ButtonsPanel';                     // Buttons panel component

const ChartContainer = ({ showButtonsPanel, updateShowButtonsPanel }) => {
    
    //!------------------------------ States Show/Hidden Components ------------------------------!//    
    const chartComponentsVisibility = useChartComponentVisibility();   // Get the chart settings from the store    
    const alarmMarkersVisibility = useAlarmMarkersVisibility(); // Get the alarm markers settings from the store         
    
    //!------------------------------ Parameters ------------------------------!//
    const interval = useSelector(selectTemporalidad);
    const startDate = new Date(useSelector(selectStartDate)).toISOString();
    const endDate = new Date(useSelector(selectCurrentDate)).toISOString();

    const { chartStartDate, chartEndDate } = useSetupChartParameters(interval, startDate, endDate);
    const { data, loading, chartInterval } = useFetchChartData(chartStartDate, chartEndDate);

    //!------------------------------ Render ------------------------------!//
    return (
        <div className="relative">
            <LoadingOverlay isLoading={loading} />

            <div className="absolute top-1 left-1 flex flex-col space-y-1 z-10">                
                <ButtonsPanel
                    chartSettings={chartComponentsVisibility}                    
                    showButtonsPanel={showButtonsPanel}
                    updateShowButtonsPanel={updateShowButtonsPanel}
                    alarmMarkersSettings={alarmMarkersVisibility}                    
                />        
            </div>

            <div className="flex flex-col">
                <div style={{ height: chartComponentsVisibility.showStochasticSerie ? "400px" : "600px" }}>
                    <CandlestickChartContainer
                        data={data}
                        chartSettings={chartComponentsVisibility}
                        chartInterval={chartInterval}
                        alarmMarkersSettings={alarmMarkersVisibility}
                    />
                </div>
                <div style={{ height: chartComponentsVisibility.showStochasticSerie ? "200px" : "0px" }}>
                    <StochasticChartContainer 
                        data={data} 
                        chartSettings={chartComponentsVisibility}                         
                 />
                </div>
            </div>
        </div>
    );
}

export default ChartContainer;
