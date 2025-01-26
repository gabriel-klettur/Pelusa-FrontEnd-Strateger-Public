

import { selectTemporalidad, selectStartDate, selectCurrentDate } from 'reduxStore/toolBar';

import StochasticChartContainer from './StochasticChartContainer';
import CandlestickChartContainer from './CandlestickChartContainer';

import useFetchChartData from '../hooks/data/useFetchChartData';                        // Request data from the server
import useSetupChartParameters from '../hooks/charts/useSetupChartParameters';          // Setup chart parameters  
import useChartButtonsVisibility from '../hooks/charts/useChartButtonsVisibility';      // Setup chart components visibility

import LoadingOverlay from '../../../common/LoadingOverlay/LoadingOverlay';             // Loading overlay component
import ButtonsPanel from '../components/buttonsPanel/ButtonsPanel';                     // Buttons panel component

const ChartContainer = ({ showButtonsPanel }) => {
    
    //!------------------------------ States Show/Hidden Components ------------------------------!//    
    const chartButtonsVisibility = useChartButtonsVisibility();   // Get the chart settings from the store    
            
    //!------------------------------ Parameters ------------------------------!//
    const { chartStartDate, chartEndDate } = useSetupChartParameters(selectTemporalidad, selectStartDate, selectCurrentDate);   // Get the chart parameters
    const { data, loading, chartInterval } = useFetchChartData(chartStartDate, chartEndDate);       // Get the data from the server

    //!------------------------------ Render ------------------------------!//
    return (
        <div className="relative">
            <LoadingOverlay isLoading={loading} />

            <div className="absolute top-1 left-1 flex flex-col space-y-1 z-10">                
                <ButtonsPanel
                    showButtonsPanel={showButtonsPanel}                    
                    buttonsVisilibity={chartButtonsVisibility}                                        
                />        
            </div>

            <div className="flex flex-col">
                <div style={{ height: chartButtonsVisibility.showStochasticSerie ? "400px" : "600px" }}>
                    <CandlestickChartContainer
                        data={data}
                        chartSettings={chartButtonsVisibility}
                        chartInterval={chartInterval}                        
                    />
                </div>
                <div style={{ height: chartButtonsVisibility.showStochasticSerie ? "200px" : "0px" }}>
                    <StochasticChartContainer 
                        data={data} 
                        chartSettings={chartButtonsVisibility}                         
                 />
                </div>
            </div>
        </div>
    );
}

export default ChartContainer;
