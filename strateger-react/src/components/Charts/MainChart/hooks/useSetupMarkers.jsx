// Path: src/components/Charts/CandlestickChartChart/hooks/useMarkers.js

import { useSelector } from 'react-redux';

import useCreateAlarmMarkers from './useCreateAlarmMarkers';
import useCreateOrderMarkers from './useCreateOrderMarkers';
import useSetMarkersOnSerie from './useSetMarkersOnSerie';

import { selectAlarmsData, selectFilteredByClickAlarms, selectFilteredByOptionsAlarms } from '../../../../redux/alarm';
import { selectMarkersAlarmDefault, selectMarkersAlarmSelectedByClick, selectMarkersAlarmFiltered } from '../../../../redux/charts';
import { setAlarmDefaultMarkers, setAlarmSelectedByClickMarkers, setAlarmFilteredMarkers } from '../../../../redux/charts';

import { selectFilteredOrdersUsdtm, selectFilteredOrdersCoinm, selectFilteredOrdersSpot, selectFilteredOrdersStandard} from '../../../../redux/order';
import { selectMarkersOrderUsdm, selectMarkersOrderCoinm, selectMarkersOrderStandard, selectMarkersOrderSpot } from '../../../../redux/charts';
import { setOrderUsdmMarkers, setOrderCoinmMarkers, setOrderStandardMarkers, setOrderSpotMarkers } from '../../../../redux/charts';

const useSetupMarkers = (
  candlestickSeriesRef, 
  chartInterval, 
  showAlarmsMarkers, 
  showAlarmsSelectedMarkers, 
  showAlarmsFilteredMarkers,
  showOrdersUsdmMarkers, 
  showOrdersCoinmMarkers, 
  showOrdersStandardMarkers, 
  showOrdersSpotMarkers
) => {
  //!------------------------------------ Create markers for alarms ------------------------------------  

  const alarmDefaultMarkers = useSelector(selectMarkersAlarmDefault);    
  const alarmSelectedByClickMarkers = useSelector(selectMarkersAlarmSelectedByClick);
  const alarmFiltered = useSelector(selectMarkersAlarmFiltered);

  useCreateAlarmMarkers(chartInterval, selectAlarmsData, setAlarmDefaultMarkers);
  useCreateAlarmMarkers(chartInterval, selectFilteredByClickAlarms, setAlarmSelectedByClickMarkers);
  useCreateAlarmMarkers(chartInterval, selectFilteredByOptionsAlarms, setAlarmFilteredMarkers);  

  //!------------------------------------- Create markers for orders -------------------------------------

  const orderUsdmMarkers = useSelector(selectMarkersOrderUsdm);
  const orderCoinmMarkers = useSelector(selectMarkersOrderCoinm);
  const orderStandardMarkers = useSelector(selectMarkersOrderStandard);
  const orderSpotMarkers = useSelector(selectMarkersOrderSpot);

  useCreateOrderMarkers(chartInterval, selectFilteredOrdersUsdtm, setOrderUsdmMarkers);
  useCreateOrderMarkers(chartInterval, selectFilteredOrdersCoinm, setOrderCoinmMarkers);
  useCreateOrderMarkers(chartInterval, selectFilteredOrdersSpot, setOrderStandardMarkers);
  useCreateOrderMarkers(chartInterval, selectFilteredOrdersStandard, setOrderSpotMarkers);
  
  //!------------------------------- Combine markers -------------------------------
  const combinedMarkers = [];

// Solo un conjunto de marcadores será seleccionado
if (showAlarmsMarkers) {
  combinedMarkers.push(...alarmDefaultMarkers);
} else if (showAlarmsSelectedMarkers) {
  combinedMarkers.push(...alarmSelectedByClickMarkers);
} else if (showAlarmsFilteredMarkers) {
  combinedMarkers.push(...alarmFiltered);
} else if (showOrdersUsdmMarkers) {
  combinedMarkers.push(...orderUsdmMarkers);
} else if (showOrdersCoinmMarkers) {
  combinedMarkers.push(...orderCoinmMarkers);
} else if (showOrdersStandardMarkers) {
  combinedMarkers.push(...orderStandardMarkers);
} else if (showOrdersSpotMarkers) {
  combinedMarkers.push(...orderSpotMarkers);
} else {
  // Si ninguno de los marcadores está activado, asegura que el array esté vacío
  combinedMarkers.length = 0;
}

  //!------------------------------- Set markers to the candlestick series -------------------------------
  useSetMarkersOnSerie(candlestickSeriesRef, combinedMarkers);   
};

export default useSetupMarkers;
