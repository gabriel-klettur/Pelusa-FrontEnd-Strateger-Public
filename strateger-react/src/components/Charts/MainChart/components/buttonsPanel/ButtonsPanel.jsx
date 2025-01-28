//Path: src/components/Charts/MainChart/components/buttons/ButtonsPanel.jsx

import ItemChartButton from "../buttons/ItemChartButton";
import ExpandableButtonPanel from "../buttons/ExpandableButtonPanel";

import { useDispatch, useSelector } from 'react-redux';
import {
    setToggleChartMainButtons,
    setToggleOrderButton,
    setActiveButton,
    setActiveRadarDataset,
} from 'reduxStore/interaction';

import {
    selectAlarmsDataLength,
    selectFilteredByClickAlarmsLength,
    selectFilteredByOptionsAlarmsLength,
} from "reduxStore/alarm";

import candlestickIcon from '../../../assets/candlestick.svg';
import lineIcon from '../../../assets/line.svg';

const ButtonsPanel = ({ buttonsVisilibity, showButtonsPanel }) => {
    const dispatch = useDispatch();    

    const alarmsDataLength = useSelector(selectAlarmsDataLength);
    const filteredByClickAlarmsLength = useSelector(selectFilteredByClickAlarmsLength);
    const filteredByOptionsAlarmsLength = useSelector(selectFilteredByOptionsAlarmsLength);

    const handleAlarmButtonClick = (buttonReduxId) => {
        dispatch(setActiveButton({ buttonReduxId })); // Sincroniza el estado del botón
        dispatch(setActiveRadarDataset(buttonReduxId)); // Cambia el dataset del radar chart
    };

    return (
        <div className="flex flex-col space-y-1">
            {/* Sección: Charts Buttons */}

            {showButtonsPanel.showChartsButtonsPanel && (
                <div className="flex space-x-1">
                    <ItemChartButton
                        setShow={() => dispatch(setToggleChartMainButtons("candleStickButton"))}
                        icon={candlestickIcon}  
                        isVisible={buttonsVisilibity.showCandlestickSerie}
                    />
                    <ItemChartButton
                        setShow={() => dispatch(setToggleChartMainButtons("lineButton"))}
                        icon={lineIcon}  
                        isVisible={buttonsVisilibity.showLineSerie}
                    />
                </div>
            )}

            {/* Sección: Indicators Buttons */}

            {showButtonsPanel.showChartsButtonsPanel && (
                 <ExpandableButtonPanel
                 title="Indicators"
                 buttons={
                    [
                        {
                            id: "stochastic",
                            setShow: () => dispatch(setToggleChartMainButtons("stochasticButton")),                            
                            indicatorName: "Stochastic",                            
                            isVisible: buttonsVisilibity.showStochasticSerie,                            
                        },
                        {
                            id: "emas",
                            setShow: () => dispatch(setToggleChartMainButtons("emasButton")),
                            indicatorName: "Emas",
                            isVisible: buttonsVisilibity.showEmasSerie,
                        },
                        {
                            id: "sqzMomentum",
                            setShow: () => dispatch(setToggleChartMainButtons("sqzMomentumButton")),
                            indicatorName: "SQZ Momentum",
                            isVisible: buttonsVisilibity.showSQZMOMENTUMSerie,
                        },
                        {
                            id: "adx",
                            setShow: () => dispatch(setToggleChartMainButtons("adxButton")),
                            indicatorName: "ADX",
                            isVisible: buttonsVisilibity.showAdxSerie,
                        },
                        {
                            id: "rsi",
                            setShow: () => dispatch(setToggleChartMainButtons("rsiButton")),
                            indicatorName: "RSI",
                            isVisible: buttonsVisilibity.showRSISerie,
                        },
                        {
                            id: "bollinger",
                            setShow: () => dispatch(setToggleChartMainButtons("bollingerButton")),
                            indicatorName: "Bollinger Bands",
                            isVisible: buttonsVisilibity.showBollingerSerie,
                            disabled: true,
                        },
                    ]}
                />
            )}

            {/* Sección: Alarms Buttons */}
            {showButtonsPanel.showAlarmsButtonsPanel && (
                <div className="flex space-x-1">
                    <ItemChartButton
                        setShow={() => handleAlarmButtonClick("alarms")}
                        indicatorName={`Alarms (${alarmsDataLength})`}
                        isVisible={ buttonsVisilibity.showAlarmsMarkers }
                        disabled={alarmsDataLength === 0}
                    />
                    <ItemChartButton
                        setShow={() => handleAlarmButtonClick("selected")}
                        indicatorName={`Selected Alarms (${filteredByClickAlarmsLength})`}
                        isVisible={ buttonsVisilibity.showSelectedAlarmsMarkers }
                        disabled={filteredByClickAlarmsLength === 0}
                    />
                    <ItemChartButton
                        setShow={() => handleAlarmButtonClick("filtered")}
                        indicatorName={`Filtered Alarms (${filteredByOptionsAlarmsLength})`}
                        isVisible={ buttonsVisilibity.showFilteredAlarmsMarkers }
                        disabled={filteredByOptionsAlarmsLength === 0}
                    />
                </div>
            )}

            {/* Sección: Orders Buttons */}
            {showButtonsPanel.showOrdersButtonsPanel && (
                <div className="flex space-x-1">
                    <ItemChartButton
                        setShow={() => dispatch(setToggleOrderButton("showOrdersUsdmMarkers"))}
                        indicatorName="Usdm Orders"
                        isVisible={ buttonsVisilibity.showOrdersUsdmMarkers }
                    />
                    <ItemChartButton
                        setShow={() => dispatch(setToggleOrderButton("showOrdersCoinmMarkers"))}
                        indicatorName="Coinm Orders"
                        isVisible={ buttonsVisilibity.showOrdersCoinmMarkers }
                    />
                    <ItemChartButton
                        setShow={() => dispatch(setToggleOrderButton("showOrdersSpotMarkers"))}
                        indicatorName="Spot Orders"
                        isVisible={ buttonsVisilibity.showOrdersSpotMarkers }
                    />
                    <ItemChartButton
                        setShow={() => dispatch(setToggleOrderButton("showOrdersStandardMarkers"))}
                        indicatorName="Standard Orders"
                        isVisible={ buttonsVisilibity.showOrdersStandardMarkers }
                    />
                </div>
            )}
        </div>
    );
};

export default ButtonsPanel;
