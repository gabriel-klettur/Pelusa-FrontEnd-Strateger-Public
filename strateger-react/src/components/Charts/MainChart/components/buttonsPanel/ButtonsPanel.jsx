import ItemChartButton from "../buttons/ItemChartButton";

const ButtonsPanel = ({ chartSettings, updateChartSetting, showButtonsPanel, updateShowButtonsPanel }) => {
    return (
        <div className="flex flex-col space-y-1">
            {/* Sección: Charts Buttons */}
            {showButtonsPanel.showChartsButtonsPanel && (
                <div className="flex space-x-1">
                    <ItemChartButton
                        setShow={() =>
                            updateChartSetting("showStochasticSerie", !chartSettings.showStochasticSerie)
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
                            updateChartSetting("showEmasSerie", !chartSettings.showEmasSerie)
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
                            updateChartSetting("showCandlestickSerie", !chartSettings.showCandlestickSerie)
                        }
                        indicatorName="Candlesticks"
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
                        setShow={() =>
                            updateChartSetting("showAlarmsMarkers", !chartSettings.showAlarmsMarkers)
                        }
                        indicatorName="Alarms"
                        bgColor={
                            chartSettings.showAlarmsMarkers
                                ? "bg-african_violet-300"
                                : "bg-african_violet-500"
                        }
                    />
                    <ItemChartButton
                        setShow={() =>
                            updateChartSetting(
                                "showAlarmsSelectedMarkers",
                                !chartSettings.showAlarmsSelectedMarkers
                            )
                        }
                        indicatorName="Selected Alarms"
                        bgColor={
                            chartSettings.showAlarmsSelectedMarkers
                                ? "bg-african_violet-300"
                                : "bg-african_violet-500"
                        }
                    />
                    <ItemChartButton
                        setShow={() =>
                            updateChartSetting(
                                "showAlarmsFilteredMarkers",
                                !chartSettings.showAlarmsFilteredMarkers
                            )
                        }
                        indicatorName="Filtered Alarms"
                        bgColor={
                            chartSettings.showAlarmsFilteredMarkers
                                ? "bg-african_violet-300"
                                : "bg-african_violet-500"
                        }
                    />                   
                </div>
            )}

            {/* Sección: Orders Buttons */}
            {showButtonsPanel.showOrdersButtonsPanel && (
                <div className="flex space-x-1">
                    <ItemChartButton
                        setShow={() =>
                            updateChartSetting("showOrdersUsdmMarkers", !chartSettings.showOrdersUsdmMarkers)
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
                            updateChartSetting("showOrdersCoinmMarkers", !chartSettings.showOrdersCoinmMarkers)
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
                            updateChartSetting("showOrdersSpotMarkers", !chartSettings.showOrdersSpotMarkers)
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
                            updateChartSetting(
                                "showOrdersStandardMarkers",
                                !chartSettings.showOrdersStandardMarkers
                            )
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
