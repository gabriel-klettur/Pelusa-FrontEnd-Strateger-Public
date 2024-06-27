// Path: strateger-react/src/components/Strategy/StrategyItem.js

import React from 'react';
import './StrategyItem.css';
import { useDispatch, useSelector } from 'react-redux';
import { setStrategyFilteredAlarms } from '../../slices/alarmSlice';

const StrategyItem = ({ strategy, onEdit, onDelete }) => {
  const dispatch = useDispatch();
  const allAlarms = useSelector((state) => state.alarms.alarms);

  const onOffClass = strategy.isOn ? 'bg-green-500 text-white blink-background' : 'bg-gray-500 text-white';
  const borderColorClass = strategy.isOn ? 'border-green-500 blink-border' : 'border-gray-300';  

  const handleViewInChart = () => {
    // Obtener las alarmas de 'indicator open long' y 'indicator close long'
    const openLongAlarms = allAlarms.filter(alarm => 
      alarm.Temporalidad === strategy.longEntryIndicator && alarm.Order === 'indicator open long'
    );
    const closeLongAlarms = allAlarms.filter(alarm => 
      alarm.Temporalidad === strategy.longCloseIndicator && alarm.Order === 'indicator close long'
    );

    const startTime = new Date(strategy.onStartDate).getTime();
    const endTime = strategy.offEndDate ? new Date(strategy.offEndDate).getTime() : Date.now();

    const filteredAlarms = [];

    // Iterar sobre las alarmas de 'indicator open long' y 'indicator close long'
    openLongAlarms.forEach(openLongAlarm => {
      const openLongTime = new Date(openLongAlarm.Time_Alert).getTime();
      const closeLongAlarm = closeLongAlarms.find(alarm => 
        new Date(alarm.Time_Alert).getTime() > openLongTime
      );
      const closeLongTime = closeLongAlarm ? new Date(closeLongAlarm.Time_Alert).getTime() : Date.now();

      // Ajustar el rango de tiempo con 'strategy.onStartDate' y 'strategy.offEndDate'
      const effectiveStartTime = Math.max(openLongTime, startTime);
      const effectiveEndTime = Math.min(closeLongTime, endTime);

      // Filtrar alarmas en el rango de tiempo entre 'indicator open long' y 'indicator close long'
      const alarmsInRange = allAlarms.filter(alarm => {
        const alarmTime = new Date(alarm.Time_Alert).getTime();
        return alarmTime >= effectiveStartTime && alarmTime <= effectiveEndTime;
      });

      const relevantAlarms = alarmsInRange.filter(alarm => {
        const matchesStrategyName = alarm.Strategy === strategy.name;
        const matchesLongEntryOrder = alarm.Temporalidad === strategy.longEntryOrder && 
          (alarm.Order === 'order open long' || alarm.Order === 'indicator open long');
        const matchesLongCloseOrder = alarm.Temporalidad === strategy.longCloseOrder && 
          (alarm.Order === 'order close long' || alarm.Order === 'indicator close long');
        const matchesLongEntryIndicator = alarm.Temporalidad === strategy.longEntryIndicator && 
          alarm.Order === 'indicator open long';
        const matchesLongCloseIndicator = alarm.Temporalidad === strategy.longCloseIndicator && 
          alarm.Order === 'indicator close long';

        return matchesStrategyName && (
          matchesLongEntryOrder ||
          matchesLongCloseOrder ||
          matchesLongEntryIndicator ||
          matchesLongCloseIndicator
        );
      });

      filteredAlarms.push(...relevantAlarms);
    });

    dispatch(setStrategyFilteredAlarms(filteredAlarms));
  };

  return (
    <div className={`bg-white shadow rounded-lg p-4 mb-4 border-2 ${borderColorClass}`}>
      <div className="grid grid-cols-10 gap-4">
        <div className="col-span-2 border border-gray-300 p-4">
          <h2 className="text-lg font-bold">{strategy.name}</h2>
          <p className={`${onOffClass} p-2 rounded`}><strong>ON/OFF: </strong> {strategy.isOn ? 'ON' : 'OFF'}</p>
          <p><strong>API KEY:</strong> {strategy.apiKey}</p>
          <p><strong>SECRET KEY:</strong> {strategy.secretKey}</p>
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
          onClick={() => onDelete(strategy.id)}
        >
          VER ORDENES
        </button>

        <button 
          className="bg-pink-500 text-white px-4 py-2 rounded col-span-2"
          onClick={handleViewInChart}
        >
          VER EN GRAFICO
        </button>

        <div className="col-span-4"></div>

        <button 
          className="bg-red-500 text-white px-4 py-2 rounded col-span-1"
          onClick={() => onDelete(strategy.id)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default StrategyItem;
