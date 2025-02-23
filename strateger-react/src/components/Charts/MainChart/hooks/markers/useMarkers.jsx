// Path: src/components/Charts/CandlestickChartChart/hooks/useMarkers.js

import { useSelector } from 'react-redux';

import useCreateAlarmMarkers from './useCreateAlarmMarkers';
import useCreateOrderMarkers from './useCreateOrderMarkers';
import useSetMarkersOnSerie from './useSetMarkersOnSerie';

import {
  selectAlarmsData,
  selectFilteredByClickAlarms,
  selectFilteredByOptionsAlarms,
} from 'reduxStore/alarm';
import {
  selectMarkersAlarmDefault,
  selectMarkersAlarmSelectedByClick,
  selectMarkersAlarmFiltered,
} from 'reduxStore/charts';
import {
  setAlarmDefaultMarkers,
  setAlarmSelectedByClickMarkers,
  setAlarmFilteredMarkers,
} from 'reduxStore/charts';

import {
  selectFilteredOrdersUsdtm,
  selectFilteredOrdersCoinm,
  selectFilteredOrdersSpot,
  selectFilteredOrdersStandard,
} from 'reduxStore/order';
import {
  selectMarkersOrderUsdm,
  selectMarkersOrderCoinm,
  selectMarkersOrderStandard,
  selectMarkersOrderSpot,
} from 'reduxStore/charts';
import {
  setOrderUsdmMarkers,
  setOrderCoinmMarkers,
  setOrderStandardMarkers,
  setOrderSpotMarkers,
} from 'reduxStore/charts';

const useMarkers = ({ candlestickSeriesRef, chartInterval, chartSettings }) => {    

  const alarmDefaultMarkers = useSelector(selectMarkersAlarmDefault);
  const alarmSelectedByClickMarkers = useSelector(selectMarkersAlarmSelectedByClick);
  const alarmFiltered = useSelector(selectMarkersAlarmFiltered);

  useCreateAlarmMarkers(chartInterval, selectAlarmsData, setAlarmDefaultMarkers);
  useCreateAlarmMarkers(chartInterval, selectFilteredByClickAlarms, setAlarmSelectedByClickMarkers);
  useCreateAlarmMarkers(chartInterval, selectFilteredByOptionsAlarms, setAlarmFilteredMarkers);
  
  const orderUsdmMarkers = useSelector(selectMarkersOrderUsdm);
  const orderCoinmMarkers = useSelector(selectMarkersOrderCoinm);
  const orderStandardMarkers = useSelector(selectMarkersOrderStandard);
  const orderSpotMarkers = useSelector(selectMarkersOrderSpot);

  useCreateOrderMarkers(chartInterval, selectFilteredOrdersUsdtm, setOrderUsdmMarkers);
  useCreateOrderMarkers(chartInterval, selectFilteredOrdersCoinm, setOrderCoinmMarkers);
  useCreateOrderMarkers(chartInterval, selectFilteredOrdersSpot, setOrderStandardMarkers);
  useCreateOrderMarkers(chartInterval, selectFilteredOrdersStandard, setOrderSpotMarkers);  
    
  const combinedMarkers = [];  

  if (chartSettings.showAlarmsMarkers) {        
    combinedMarkers.push(...alarmDefaultMarkers);        
  } else if (chartSettings.showSelectedAlarmsMarkers) {    
    combinedMarkers.push(...alarmSelectedByClickMarkers);    
  } else if (chartSettings.showFilteredAlarmsMarkers) {    
    combinedMarkers.push(...alarmFiltered);    
  } else if (chartSettings.showOrdersUsdmMarkers) {
    combinedMarkers.push(...orderUsdmMarkers);
  } else if (chartSettings.showOrdersCoinmMarkers) {
    combinedMarkers.push(...orderCoinmMarkers);
  } else if (chartSettings.showOrdersStandardMarkers) {
    combinedMarkers.push(...orderStandardMarkers);
  } else if (chartSettings.showOrdersSpotMarkers) {
    combinedMarkers.push(...orderSpotMarkers);
  } else {    
    combinedMarkers.length = 0;
  }

  useSetMarkersOnSerie(candlestickSeriesRef, combinedMarkers);
    
};

export default useMarkers;
