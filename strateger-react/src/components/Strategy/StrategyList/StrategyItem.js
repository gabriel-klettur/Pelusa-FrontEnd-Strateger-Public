//Path: strateger-react/src/components/Strategy/StrategyList/StrategyItem.js

import React, { useState } from 'react';
import './StrategyItem.css';
import { useDispatch, useSelector } from 'react-redux';
import { setStrategyFilteredAlarms } from '../../../slices/alarmSlice';
import { FilteredOrderList } from '../../Orders';

const StrategyItem = ({ strategy, onEdit, onDelete }) => {
  const dispatch = useDispatch();
  const allAlarms = useSelector((state) => state.alarms.alarms);
  const [isShowingAlarms, setIsShowingAlarms] = useState(false);
  const [isShowingOrders, setIsShowingOrders] = useState(false);

  const onOffClass = strategy.isOn ? 'bg-green-500 text-white blink-background' : 'bg-gray-500 text-white';
  const borderColorClass = strategy.isOn ? 'border-green-500 blink-border' : 'border-gray-300';  

  const handleViewInChart = () => {
    if (isShowingAlarms) {
      dispatch(setStrategyFilteredAlarms([]));
      setIsShowingAlarms(false);
      return;
    }

    const startTime = new Date(strategy.onStartDate).getTime();
    const endTime = strategy.offEndDate ? new Date(strategy.offEndDate).getTime() : Date.now();

    const filteredAlarms = [];

    const filterAlarmsByIndicatorsAndOrders = (openAlarms, closeAlarms, entryOrder, closeOrder, entryIndicator, closeIndicator, orderType) => {
      openAlarms.forEach(openAlarm => {
        const openTime = new Date(openAlarm.Time_Alert).getTime();
        const closeAlarm = closeAlarms.find(alarm => 
          new Date(alarm.Time_Alert).getTime() > openTime
        );
        const closeTime = closeAlarm ? new Date(closeAlarm.Time_Alert).getTime() : Date.now();

        const effectiveStartTime = Math.max(openTime, startTime);
        const effectiveEndTime = Math.min(closeTime, endTime);

        const alarmsInRange = allAlarms.filter(alarm => {
          const alarmTime = new Date(alarm.Time_Alert).getTime();
          return alarmTime >= effectiveStartTime && alarmTime <= effectiveEndTime;
        });

        const relevantAlarms = alarmsInRange.filter(alarm => {
          const matchesStrategyName = alarm.Strategy === strategy.alarmName;
          const matchesEntryOrder = alarm.Temporalidad === entryOrder && 
            (alarm.Order === `order open ${orderType}` || alarm.Order === `indicator open ${orderType}`);
          const matchesCloseOrder = alarm.Temporalidad === closeOrder && 
            (alarm.Order === `order close ${orderType}` || alarm.Order === `indicator close ${orderType}`);
          const matchesEntryIndicator = alarm.Temporalidad === entryIndicator && 
            (alarm.Order === `indicator open ${orderType}`);
          const matchesCloseIndicator = alarm.Temporalidad === closeIndicator && 
            (alarm.Order === `indicator close ${orderType}`);

          return matchesStrategyName && (
            matchesEntryOrder ||
            matchesCloseOrder ||
            matchesEntryIndicator ||
            matchesCloseIndicator
          );
        });

        filteredAlarms.push(...relevantAlarms);
      });
    };

    const openLongAlarms = allAlarms.filter(alarm => 
      alarm.Temporalidad === strategy.longEntryIndicator && alarm.Order === 'indicator open long'
    );
    const closeLongAlarms = allAlarms.filter(alarm => 
      alarm.Temporalidad === strategy.longCloseIndicator && alarm.Order === 'indicator close long'
    );

    filterAlarmsByIndicatorsAndOrders(openLongAlarms, closeLongAlarms, strategy.longEntryOrder, strategy.longCloseOrder, strategy.longEntryIndicator, strategy.longCloseIndicator, 'long');

    const openShortAlarms = allAlarms.filter(alarm => 
      alarm.Temporalidad === strategy.shortEntryIndicator && alarm.Order === 'indicator open short'
    );
    const closeShortAlarms = allAlarms.filter(alarm => 
      alarm.Temporalidad === strategy.shortCloseIndicator && alarm.Order === 'indicator close short'
    );

    filterAlarmsByIndicatorsAndOrders(openShortAlarms, closeShortAlarms, strategy.shortEntryOrder, strategy.shortCloseOrder, strategy.shortEntryIndicator, strategy.shortCloseIndicator, 'short');

    dispatch(setStrategyFilteredAlarms(filteredAlarms));
    setIsShowingAlarms(true);
  };

  const handleViewOrders = () => {
    setIsShowingOrders(!isShowingOrders);
  };

  return (
    <div className={`bg-white shadow rounded-lg p-4 mb-4 border-2 ${borderColorClass}`}>
      <div className="grid grid-cols-10 gap-4">
        <div className="col-span-2 border border-gray-300 p-4">
          <h2 className="text-lg font-bold">{strategy.alarmName}</h2>
          <p className={`${onOffClass} p-2 rounded`}><strong>ON/OFF: </strong> {strategy.isOn ? 'ON' : 'OFF'}</p>
          <p><strong>WORKING IN ACCOUNT:</strong> {strategy.account_name}, {strategy.account_type}</p>
          <p><strong>Ticker:</strong> {strategy.ticker}</p>
          <p><strong>Resultado Acc:</strong> {strategy.resultadoAcc}</p>
          <p><strong>Descripción:</strong> {strategy.description}</p>
          <p><strong>On Start Date:</strong> {strategy.onStartDate}</p>
          <p><strong>Off End Date:</strong> {strategy.offEndDate}</p>
        </div>

        <div className="col-span-4 grid grid-cols-4 gap-4 border border-gray-300 p-4 bg-green-100">
          <div className="col-span-2 grid grid-cols-1">
            <div className="border border-gray-300 p-2">
              <p><strong>Long Entry Order:</strong> {strategy.longEntryOrder}</p>
              <p><strong>Long Close Order:</strong> {strategy.longCloseOrder}</p>
              <p><strong>Long Entry Indicator:</strong> {strategy.longEntryIndicator}</p>
              <p><strong>Long Close Indicator:</strong> {strategy.longCloseIndicator}</p>
            </div>
            <div className="border border-gray-300 p-2 mt-2">
              <p><strong>Long Pyramiding:</strong> {strategy.longPyramiding}</p>
              <p><strong>Long Leverage:</strong> {strategy.longLeverage}</p>
              <p><strong>Long Quantity:</strong> {strategy.longQuantity}</p>
            </div>
          </div>
          <div className="col-span-2">
            <div className="border border-gray-300 p-2">
              <p><strong>TP per Order:</strong> {strategy.longTPPerOrder}</p>
              <p><strong>TP General:</strong> {strategy.longTPGeneral}</p>
              <p><strong>SL per Order:</strong> {strategy.longSLPerOrder}</p>
              <p><strong>SL General:</strong> {strategy.longSLGeneral}</p>
            </div>
          </div>
        </div>

        <div className="col-span-4 grid grid-cols-4 gap-4 border border-gray-300 p-4 bg-red-100">
          <div className="col-span-2 grid grid-cols-1">
            <div className="border border-gray-300 p-2">              
              <p><strong>Short Entry Order:</strong> {strategy.shortEntryOrder}</p>
              <p><strong>Short Close Order:</strong> {strategy.shortCloseOrder}</p>
              <p><strong>Short Entry Indicator:</strong> {strategy.shortEntryIndicator}</p>
              <p><strong>Short Close Indicator:</strong> {strategy.shortCloseIndicator}</p>
            </div>

            <div className="border border-gray-300 p-2 mt-2">
              <p><strong>Short Pyramiding:</strong> {strategy.shortPyramiding}</p>
              <p><strong>Short Leverage:</strong> {strategy.shortLeverage}</p>
              <p><strong>Short Quantity:</strong> {strategy.shortQuantity}</p>            
            </div>

          </div>
          <div className="col-span-2">
            <div className="border border-gray-300 p-2">
              <p><strong>TP per Order:</strong> {strategy.shortTPPerOrder}</p>
              <p><strong>TP General:</strong> {strategy.shortTPGeneral}</p>
              <p><strong>SL per Order:</strong> {strategy.shortSLPerOrder}</p>
              <p><strong>SL General:</strong> {strategy.shortSLGeneral}</p>            
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-10 gap-4 mt-4">
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded col-span-1"
          onClick={() => onEdit(strategy.id)}
        >
          Editar
        </button>
        
        <button 
          className="bg-orange-500 text-white px-4 py-2 rounded col-span-2"
          onClick={handleViewOrders}
        >
          {isShowingOrders ? 'OCULTAR ORDENES' : 'VER ORDENES'}
        </button>

        <button 
          className={`bg-pink-500 text-white px-4 py-2 rounded col-span-2 ${isShowingAlarms ? 'bg-red-500' : 'bg-pink-500'}`}
          onClick={handleViewInChart}
        >
          {isShowingAlarms ? 'LIMPIAR GRAFICO' : 'VER EN GRAFICO'}
        </button>

        <div className="col-span-4"></div>

        <button 
          className="bg-red-500 text-white px-4 py-2 rounded col-span-1"
          onClick={() => onDelete(strategy.id)}
        >
          Eliminar
        </button>
      </div>

      {isShowingOrders && (
        <div className="mt-4">
          <FilteredOrderList strategy={strategy} />
        </div>
      )}
    </div>
  );
};

export default StrategyItem;
