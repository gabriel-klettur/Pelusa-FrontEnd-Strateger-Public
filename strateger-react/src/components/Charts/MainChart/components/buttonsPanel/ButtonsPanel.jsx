// Path: src/components/Charts/MainChart/components/buttons/ButtonsPanel.jsx

import React from 'react';
import ItemChartButton from "../buttons/ItemChartButton";
import ExpandableButtonPanel from "../buttons/ExpandableButtonPanel";
import { useDispatch, useSelector } from 'react-redux';
import {
  setToggleChartMainButtons,
  setToggleOrderButton,
  setToggleChartAlarmButtons,
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
    dispatch(setToggleChartAlarmButtons(buttonReduxId));
    dispatch(setActiveRadarDataset(buttonReduxId)); 
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
          buttons={[
            {
              id: "stochastic",
              setShow: () => dispatch(setToggleChartMainButtons("stochasticButton")),
              buttonName: "Stochastic",
              isVisible: buttonsVisilibity.showStochasticSerie,
            },
            {
              id: "emas",
              setShow: () => dispatch(setToggleChartMainButtons("emasButton")),
              buttonName: "Emas",
              isVisible: buttonsVisilibity.showEmasSerie,
            },
            {
              id: "sqzMomentum",
              setShow: () => dispatch(setToggleChartMainButtons("sqzMomentumButton")),
              buttonName: "SQZ Momentum",
              isVisible: buttonsVisilibity.showSQZMOMENTUMSerie,
            },
            {
              id: "adx",
              setShow: () => dispatch(setToggleChartMainButtons("adxButton")),
              buttonName: "ADX",
              isVisible: buttonsVisilibity.showAdxSerie,
            },
            {
              id: "rsi",
              setShow: () => dispatch(setToggleChartMainButtons("rsiButton")),
              buttonName: "RSI",
              isVisible: buttonsVisilibity.showRSISerie,
            },
            {
              id: "bollinger",
              setShow: () => dispatch(setToggleChartMainButtons("bollingerButton")),
              buttonName: "Bollinger Bands",
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
            buttonName={`Alarms (${alarmsDataLength})`}
            isVisible={buttonsVisilibity.showAlarmsMarkers}
            disabled={alarmsDataLength === 0}
          />
          <ItemChartButton
            setShow={() => handleAlarmButtonClick("selected")}
            buttonName={`Selected Alarms (${filteredByClickAlarmsLength})`}
            isVisible={buttonsVisilibity.showSelectedAlarmsMarkers}
            disabled={filteredByClickAlarmsLength === 0}
          />
          <ItemChartButton
            setShow={() => handleAlarmButtonClick("filtered")}
            buttonName={`Filtered Alarms (${filteredByOptionsAlarmsLength})`}
            isVisible={buttonsVisilibity.showFilteredAlarmsMarkers}
            disabled={filteredByOptionsAlarmsLength === 0}
          />
        </div>
      )}

      {/* Sección: Orders Buttons */}
      {showButtonsPanel.showOrdersButtonsPanel && (
        <div className="flex space-x-1">
          <ItemChartButton
            setShow={() => dispatch(setToggleOrderButton("showOrdersUsdmMarkers"))}
            buttonName="Usdm Orders"
            isVisible={buttonsVisilibity.showOrdersUsdmMarkers}
          />
          <ItemChartButton
            setShow={() => dispatch(setToggleOrderButton("showOrdersCoinmMarkers"))}
            buttonName="Coinm Orders"
            isVisible={buttonsVisilibity.showOrdersCoinmMarkers}
          />
          <ItemChartButton
            setShow={() => dispatch(setToggleOrderButton("showOrdersSpotMarkers"))}
            buttonName="Spot Orders"
            isVisible={buttonsVisilibity.showOrdersSpotMarkers}
          />
          <ItemChartButton
            setShow={() => dispatch(setToggleOrderButton("showOrdersStandardMarkers"))}
            buttonName="Standard Orders"
            isVisible={buttonsVisilibity.showOrdersStandardMarkers}
          />
        </div>
      )}
    </div>
  );
};

export default ButtonsPanel;
