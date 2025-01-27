

import { selectTemporalidad, selectStartDate, selectCurrentDate } from 'reduxStore/toolBar';

import CandlestickChartContainer from './CandlestickChartContainer';

import useFetchChartData from '../hooks/data/useFetchChartData';                        // Request data from the server
import useSetupChartParameters from '../hooks/charts/useSetupChartParameters';          // Setup chart parameters  
import useChartButtonsVisibility from '../hooks/charts/useChartButtonsVisibility';      // Setup chart components visibility

import LoadingOverlay from '../../../common/LoadingOverlay/LoadingOverlay';             // Loading overlay component
import ButtonsPanel from '../components/buttonsPanel/ButtonsPanel';                     // Buttons panel component
import ChartToolBarChartToolBarContainer from './ChartToolBarContainer';                // Chart toolbar container

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
            
            <div className="absolute top-2 left-14 flex flex-col space-y-1 z-10">                
                <ButtonsPanel
                    showButtonsPanel={showButtonsPanel}                    
                    buttonsVisilibity={chartButtonsVisibility}                                        
                />        
            </div>            
            
            <div className="flex">
                {/* Contenedor interno con altura definida */}
                <div className="flex w-full flex-row bg-african_violet-700" style={{ height: "600px" }}>
                    {/* Toolbar a la izquierda */}
                    <div className="mb-1 mt-1 w-12 flex-shrink-0 bg-african_violet-300">
                        <ChartToolBarChartToolBarContainer />
                    </div>

                    {/* Gráfico de velas a la derecha */}
                    <div className="flex-1 w-96 m-1" >
                        <CandlestickChartContainer
                            data={data}
                            chartSettings={chartButtonsVisibility}
                            chartInterval={chartInterval}
                        />
                    </div>
                </div>
            </div>

        </div>
    );
}

export default ChartContainer;
