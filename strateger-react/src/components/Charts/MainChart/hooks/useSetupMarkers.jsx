// Path: src/components/Charts/CandlestickChartChart/hooks/useMarkers.js

import { useSelector } from 'react-redux';

import useCreateAlarmMarkers from './useCreateAlarmMarkers';
import useCreateOrderMarkers from './useCreateOrderMarkers';
import useSetMarkersOnSerie from './useSetMarkersOnSerie';

import { selectAlarmsData, selectFilteredByClickAlarms, selectFilteredByIntervalAlarms, selectFilteredByIntervalAndTypeAlarms } from '../../../../redux/alarm';
import { selectMarkersAlarmDefault, selectMarkersAlarmSelectedByClick, selectMarkersAlarmFilteredByInterval, selectMarkersAlarmFilteredByIntervalAndType} from '../../../../redux/charts';
import { setAlarmDefaultMarkers, setAlarmSelectedByClickMarkers, setAlarmFilteredByIntervalMarkers, setAlarmFilteredByIntervalAndTypeMarkers} from '../../../../redux/charts';

import { selectFilteredOrdersUsdtm, selectFilteredOrdersCoinm, selectFilteredOrdersSpot, selectFilteredOrdersStandard} from '../../../../redux/order';
import { selectMarkersOrderUsdm, selectMarkersOrderCoinm, selectMarkersOrderStandard, selectMarkersOrderSpot } from '../../../../redux/charts';
import { setOrderUsdmMarkers, setOrderCoinmMarkers, setOrderStandardMarkers, setOrderSpotMarkers } from '../../../../redux/charts';

const useSetupMarkers = (candlestickSeriesRef, chartInterval, 
                        showAlarmsMarkers, showAlarmsSelectedMarkers, showAlarmsFilteredByIntervalMarkers, showAlarmsFilteredByIntervalAndTypeMarkers,
                        showOrdersUsdmMarkers, showOrdersCoinmMarkers, showOrdersStandardMarkers, showOrdersSpotMarkers) => {

  //!------------------------------------ Create markers for alarms ------------------------------------  

  const alarmDefaultMarkers = useSelector(selectMarkersAlarmDefault);    
  const alarmSelectedByClickMarkers = useSelector(selectMarkersAlarmSelectedByClick);
  const alarmFilteredByIntervalMarkers = useSelector(selectMarkersAlarmFilteredByInterval);
  const alarmFilteredByIntervalAndTypeMarkers = useSelector(selectMarkersAlarmFilteredByIntervalAndType);

  useCreateAlarmMarkers(chartInterval, selectAlarmsData, setAlarmDefaultMarkers);
  useCreateAlarmMarkers(chartInterval, selectFilteredByClickAlarms, setAlarmSelectedByClickMarkers);
  useCreateAlarmMarkers(chartInterval, selectFilteredByIntervalAlarms, setAlarmFilteredByIntervalMarkers);
  useCreateAlarmMarkers(chartInterval, selectFilteredByIntervalAndTypeAlarms, setAlarmFilteredByIntervalAndTypeMarkers);

  //!------------------------------------- Create markers for orders -------------------------------------

  const orderUsdmMarkers = useSelector(selectMarkersOrderUsdm);
  const orderCoinmMarkers = useSelector(selectMarkersOrderCoinm);
  const orderStandardMarkers = useSelector(selectMarkersOrderStandard);
  const orderSpotMarkers = useSelector(selectMarkersOrderSpot);

  useCreateOrderMarkers(chartInterval, selectFilteredOrdersUsdtm, setOrderUsdmMarkers);
  useCreateOrderMarkers(chartInterval, selectFilteredOrdersCoinm, setOrderCoinmMarkers);
  useCreateOrderMarkers(chartInterval, selectFilteredOrdersSpot, setOrderStandardMarkers);
  useCreateOrderMarkers(chartInterval, selectFilteredOrdersStandard, setOrderSpotMarkers);
  
  //!------------------------------- Set markers to the candlestick series -------------------------------
  useSetMarkersOnSerie(candlestickSeriesRef, showAlarmsMarkers, alarmDefaultMarkers);
  useSetMarkersOnSerie(candlestickSeriesRef, showAlarmsSelectedMarkers, alarmSelectedByClickMarkers);
  useSetMarkersOnSerie(candlestickSeriesRef, showAlarmsFilteredByIntervalMarkers, alarmFilteredByIntervalMarkers);
  useSetMarkersOnSerie(candlestickSeriesRef, showAlarmsFilteredByIntervalAndTypeMarkers, alarmFilteredByIntervalAndTypeMarkers);

  useSetMarkersOnSerie(candlestickSeriesRef, showOrdersUsdmMarkers, orderUsdmMarkers);
  useSetMarkersOnSerie(candlestickSeriesRef, showOrdersCoinmMarkers, orderCoinmMarkers);
  useSetMarkersOnSerie(candlestickSeriesRef, showOrdersStandardMarkers, orderStandardMarkers);
  useSetMarkersOnSerie(candlestickSeriesRef, showOrdersSpotMarkers, orderSpotMarkers);      
};

export default useSetupMarkers;
