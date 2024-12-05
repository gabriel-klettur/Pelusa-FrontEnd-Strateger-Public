//Path: src/components/Charts/MainChart/components/buttons

import ItemChartButton from "../buttons/ItemChartButton";

import { useDispatch, useSelector } from 'react-redux';
import { setToggleChartMainButtons, setToggleChartAlarmButtons, setToggleOrderButton } from '../../../../../redux/interaction';
import { setActiveButton } from '../../../../../redux/interaction';
import { selectAlarmsDataLength, selectFilteredByClickAlarmsLength, selectFilteredByOptionsAlarmsLength } from "../../../../../redux/alarm";

const ButtonsPanel = ({ chartSettings, showButtonsPanel, alarmMarkersSettings }) => {

    const dispatch = useDispatch();
    const activeButtons = useSelector((state) => state.interaction.Chart.ButtonsPanel.AlarmButtons);


    const alarmsDataLength = useSelector(selectAlarmsDataLength);
    const filteredByClickAlarmsLength = useSelector(selectFilteredByClickAlarmsLength);
    const filteredByOptionsAlarmsLength = useSelector(selectFilteredByOptionsAlarmsLength);

    return (
        <div className="flex flex-col space-y-1">
            {/* Sección: Charts Buttons */}
            {showButtonsPanel.showChartsButtonsPanel && (
                <div className="flex space-x-1">
                    <ItemChartButton
                        setShow={() =>
                            dispatch(setToggleChartMainButtons("stochasticButton"))
                        }
                        indicatorName="Stochastic"                        
                        bgColor={
                            chartSettings.showStochasticSerie
                                ? "bg-african_violet-300"
                                : "bg-african_violet-500"
                        }
                    />
                    <ItemChartButton
                        setShow={() =>
                            dispatch(setToggleChartMainButtons("emasButton"))
                        }
                        indicatorName="Emas"                        
                        bgColor={
                            chartSettings.showEmasSerie
                                ? "bg-african_violet-300"
                                : "bg-african_violet-500"
                        }
                    />
                    <ItemChartButton
                        setShow={() =>
                            dispatch(setToggleChartMainButtons("candleStickButton"))
                        }
                        indicatorName="Candlesticks"
                        buttonReduxId="candleStickButton"
                        bgColor={
                            chartSettings.showCandlestickSerie
                                ? "bg-african_violet-300"
                                : "bg-african_violet-500"
                        }
                    />
                </div>
            )}

            {/* Sección: Alarms Buttons */}
            {showButtonsPanel.showAlarmsButtonsPanel && (
                <div className="flex space-x-1">
                    <ItemChartButton
                        setShow={() => dispatch(setActiveButton({ buttonReduxId: 'alarms' }))}
                        indicatorName={`Alarms (${alarmsDataLength})`}
                        bgColor={activeButtons.alarms ? 'bg-african_violet-300' : 'bg-african_violet-500'}
                        disabled={alarmsDataLength === 0}
                    />
                    <ItemChartButton
                        setShow={() => dispatch(setActiveButton({ buttonReduxId: 'selected' }))}
                        indicatorName={`Selected Alarms (${filteredByClickAlarmsLength})`}
                        bgColor={activeButtons.selected ? 'bg-african_violet-300' : 'bg-african_violet-500'}
                        disabled={filteredByClickAlarmsLength === 0}
                    />
                    <ItemChartButton
                        setShow={() => dispatch(setActiveButton({ buttonReduxId: 'filtered' }))}
                        indicatorName={`Filtered Alarms (${filteredByOptionsAlarmsLength})`}
                        bgColor={activeButtons.filtered ? 'bg-african_violet-300' : 'bg-african_violet-500'}
                        disabled={filteredByOptionsAlarmsLength === 0}
                    />
                </div>
            )}

            {/* Sección: Orders Buttons */}
            {showButtonsPanel.showOrdersButtonsPanel && (
                <div className="flex space-x-1">
                    <ItemChartButton
                        setShow={() =>
                            dispatch(setToggleOrderButton("showOrdersUsdmMarkers"))
                        }
                        indicatorName="Usdm Orders"
                        bgColor={
                            chartSettings.showOrdersUsdmMarkers
                                ? "bg-african_violet-300"
                                : "bg-african_violet-500"
                        }
                    />
                    <ItemChartButton
                        setShow={() =>
                            dispatch(setToggleOrderButton("showOrdersCoinmMarkers"))
                        }
                        indicatorName="Coinm Orders"
                        bgColor={
                            chartSettings.showOrdersCoinmMarkers
                                ? "bg-african_violet-300"
                                : "bg-african_violet-500"
                        }
                    />
                    <ItemChartButton
                        setShow={() =>
                            dispatch(setToggleOrderButton("showOrdersSpotMarkers"))
                        }
                        indicatorName="Spot Orders"
                        bgColor={
                            chartSettings.showOrdersSpotMarkers
                                ? "bg-african_violet-300"
                                : "bg-african_violet-500"
                        }
                    />
                    <ItemChartButton
                        setShow={() =>
                            dispatch(setToggleOrderButton("showOrdersStandardMarkers"))
                        }
                        indicatorName="Standard Orders"
                        bgColor={
                            chartSettings.showOrdersStandardMarkers
                                ? "bg-african_violet-300"
                                : "bg-african_violet-500"
                        }
                    />
                </div>
            )}
        </div>
    );
};

export default ButtonsPanel;
