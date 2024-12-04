// Path: strateger-react/src/components/Strategy/StrategyList/StrategyItem.js

import React, { useState } from 'react';
import './StrategyItems.css';
import { useDispatch, useSelector } from 'react-redux';



import Ventanita from '../../../common/Ventanita'; // Asegúrate de importar Ventanita

import { selectAlarmsData } from '../../../../redux/alarm';

const StrategyItem = ({ strategy, onEdit, onDelete }) => {
  const dispatch = useDispatch();
  const allAlarms = useSelector(selectAlarmsData);
  const [isShowingAlarms, setIsShowingAlarms] = useState(false);
  const [isShowingOrders, setIsShowingOrders] = useState(false);

  const onOffClass = strategy.isOn ? 'bg-green-500 text-white blink-background' : 'bg-gray-500 text-white';
  const borderColorClass = strategy.isOn ? 'border-green-500 blink-border' : 'border-gray-300';

  const handleViewInChart = () => {
    if (isShowingAlarms) {      
      setIsShowingAlarms(false);
      return;
    }

    const startTime = new Date(strategy.onStartDate).getTime();
    const endTime = strategy.offEndDate ? new Date(strategy.offEndDate).getTime() : Date.now();

    const filteredAlarms = [];

    const filterAlarmsByIndicatorsAndOrders = (openAlarms, closeAlarms, entryOrder, closeOrder, entryIndicator, closeIndicator, orderType) => {
      openAlarms.forEach((openAlarm) => {
        const openTime = new Date(openAlarm.Time_Alert).getTime();
        const closeAlarm = closeAlarms.find((alarm) => new Date(alarm.Time_Alert).getTime() > openTime);
        const closeTime = closeAlarm ? new Date(closeAlarm.Time_Alert).getTime() : Date.now();

        const effectiveStartTime = Math.max(openTime, startTime);
        const effectiveEndTime = Math.min(closeTime, endTime);

        const alarmsInRange = allAlarms.filter((alarm) => {
          const alarmTime = new Date(alarm.Time_Alert).getTime();
          return alarmTime >= effectiveStartTime && alarmTime <= effectiveEndTime;
        });

        const relevantAlarms = alarmsInRange.filter((alarm) => {
          const matchesStrategyName = alarm.Strategy === strategy.alarmName;
          const matchesEntryOrder =
            alarm.Temporalidad === entryOrder &&
            (alarm.Order === `order open ${orderType}` || alarm.Order === `indicator open ${orderType}`);
          const matchesCloseOrder =
            alarm.Temporalidad === closeOrder &&
            (alarm.Order === `order close ${orderType}` || alarm.Order === `indicator close ${orderType}`);
          const matchesEntryIndicator =
            alarm.Temporalidad === entryIndicator && alarm.Order === `indicator open ${orderType}`;
          const matchesCloseIndicator =
            alarm.Temporalidad === closeIndicator && alarm.Order === `indicator close ${orderType}`;

          return matchesStrategyName && (matchesEntryOrder || matchesCloseOrder || matchesEntryIndicator || matchesCloseIndicator);
        });

        filteredAlarms.push(...relevantAlarms);
      });
    };

    const openLongAlarms = allAlarms.filter(
      (alarm) => alarm.Temporalidad === strategy.longEntryIndicator && alarm.Order === 'indicator open long'
    );
    const closeLongAlarms = allAlarms.filter(
      (alarm) => alarm.Temporalidad === strategy.longCloseIndicator && alarm.Order === 'indicator close long'
    );

    filterAlarmsByIndicatorsAndOrders(
      openLongAlarms,
      closeLongAlarms,
      strategy.longEntryOrder,
      strategy.longCloseOrder,
      strategy.longEntryIndicator,
      strategy.longCloseIndicator,
      'long'
    );

    const openShortAlarms = allAlarms.filter(
      (alarm) => alarm.Temporalidad === strategy.shortEntryIndicator && alarm.Order === 'indicator open short'
    );
    const closeShortAlarms = allAlarms.filter(
      (alarm) => alarm.Temporalidad === strategy.shortCloseIndicator && alarm.Order === 'indicator close short'
    );

    filterAlarmsByIndicatorsAndOrders(
      openShortAlarms,
      closeShortAlarms,
      strategy.shortEntryOrder,
      strategy.shortCloseOrder,
      strategy.shortEntryIndicator,
      strategy.shortCloseIndicator,
      'short'
    );
    
    setIsShowingAlarms(true);
  };

  const handleViewOrders = () => {
    setIsShowingOrders(!isShowingOrders);
  };

  return (
    <div className={`bg-african_violet-200 rounded-lg p-4 border-4 ${borderColorClass}`}>
      {/* Información básica de la estrategia */}
      <div className="grid grid-cols-10 gap-4">
        {/* Contenedor Princial */}
        {/* Contenedor Ventanita */}

        {/* Información de Estrategia ------------------------------------------------------------*/}
        <div className="col-span-3">
          <Ventanita
            titulo="Información de Estrategia"
            contenido={
              <div className='w-96'>
                <p className={`${onOffClass} p-2 rounded`}>
                  <strong>ON/OFF: </strong> {strategy.isOn ? 'ON' : 'OFF'}
                </p>
                <p>
                  <strong>Alert Name:</strong> {strategy.alarmName}
                </p>
                <p>
                  <strong>Account:</strong> {strategy.account_name}, {strategy.account_type}
                </p>
                <p>
                  <strong>Ticker:</strong> {strategy.ticker}
                </p>
                <p>
                  <strong>Descripción:</strong> {strategy.description}
                </p>
                <p>
                  <strong>Start:</strong> {strategy.onStartDate}
                </p>
                <p>
                  <strong>End:</strong> {strategy.offEndDate}
                </p>
              </div>
            }
          />
        </div>

        {/* Detalles de Long Strategy ------------------------------------------------------------*/}
        <div className="col-span-3">
          <Ventanita
            titulo="Detalles de Long Strategy"
            contenido={
              <div className="grid grid-cols-2 gap-4">
                <Ventanita
                  titulo="Order"
                  contenido={
                    <div>
                      <p>
                        <strong>Entry Order:</strong> {strategy.longEntryOrder}
                      </p>
                      <p>
                        <strong>Close Order:</strong> {strategy.longCloseOrder}
                      </p>
                    </div>
                  }
                />
                <Ventanita
                  titulo="Indicator"
                  contenido={
                    <div>
                      <p>
                        <strong>Entry Indicator:</strong> {strategy.longEntryIndicator}
                      </p>
                      <p>
                        <strong>Close Indicator:</strong> {strategy.longCloseIndicator}
                      </p>
                    </div>
                  }
                />
                <Ventanita
                  titulo="Management"
                  contenido={
                    <div>
                      <p>
                        <strong>Pyramiding:</strong> {strategy.longPyramiding}
                      </p>
                      <p>
                        <strong>Leverage:</strong> {strategy.longLeverage}
                      </p>
                      <p>
                        <strong>Quantity:</strong> {strategy.longQuantity}
                      </p>
                    </div>
                  }
                />
                <Ventanita
                  titulo="Risk Management"
                  contenido={
                    <div>
                      <p>
                        <strong>TP per Order:</strong> {strategy.longTPPerOrder}
                      </p>
                      <p>
                        <strong>TP General:</strong> {strategy.longTPGeneral}
                      </p>
                      <p>
                        <strong>SL per Order:</strong> {strategy.longSLPerOrder}
                      </p>
                      <p>
                        <strong>SL General:</strong> {strategy.longSLGeneral}
                      </p>
                    </div>
                  }
                />
              </div>
            }
          />
        </div>

        {/* Detalles de Short Strategy ------------------------------------------------------------*/}
        <div className="col-span-4">
          <Ventanita
            titulo="Detalles de Short Strategy"
            contenido={
              <div className="grid grid-cols-2 gap-4">
                <Ventanita
                  titulo="Order"
                  contenido={
                    <div>
                      <p>
                        <strong>Entry Order:</strong> {strategy.shortEntryOrder}
                      </p>
                      <p>
                        <strong>Close Order:</strong> {strategy.shortCloseOrder}
                      </p>
                    </div>
                  }
                />
                <Ventanita
                  titulo="Indicator"
                  contenido={
                    <div>
                      <p>
                        <strong>Entry Indicator:</strong> {strategy.shortEntryIndicator}
                      </p>
                      <p>
                        <strong>Close Indicator:</strong> {strategy.shortCloseIndicator}
                      </p>
                    </div>
                  }
                />
                <Ventanita
                  titulo="Management"
                  contenido={
                    <div>
                      <p>
                        <strong>Pyramiding:</strong> {strategy.shortPyramiding}
                      </p>
                      <p>
                        <strong>Leverage:</strong> {strategy.shortLeverage}
                      </p>
                      <p>
                        <strong>Quantity:</strong> {strategy.shortQuantity}
                      </p>
                    </div>
                  }
                />
                <Ventanita
                  titulo="Risk Management"
                  contenido={
                    <div>
                      <p>
                        <strong>TP per Order:</strong> {strategy.shortTPPerOrder}
                      </p>
                      <p>
                        <strong>TP General:</strong> {strategy.shortTPGeneral}
                      </p>
                      <p>
                        <strong>SL per Order:</strong> {strategy.shortSLPerOrder}
                      </p>
                      <p>
                        <strong>SL General:</strong> {strategy.shortSLGeneral}
                      </p>
                    </div>
                  }
                />
              </div>
            }
          />
        </div>
      </div>

      {/* Botones de acción */}
      <div className="grid grid-cols-10 gap-4 mt-4">
        <button
          className="px-4 py-2 font-semibold transition-colors duration-200 shadow-md bg-african_violet-500 text-white rounded col-span-1 hover:bg-african_violet-400"
          onClick={() => onEdit(strategy.id)}
        >
          Editar
        </button>

        <button
          className={`px-4 py-2 font-semibold transition-colors duration-200 shadow-md ${
            isShowingOrders ? 'bg-african_violet-500' : 'bg-african_violet-300'
          } text-african_violet-900 hover:bg-african_violet-400 rounded col-span-2`}
          onClick={handleViewOrders}
        >
          {isShowingOrders ? 'OCULTAR ORDENES' : 'VER ORDENES'}
        </button>

        <button
          className={`px-4 py-2 font-semibold transition-colors duration-200 shadow-md ${
            isShowingAlarms ? 'bg-african_violet-500' : 'bg-african_violet-300'
          } text-african_violet-900 hover:bg-african_violet-400 rounded col-span-2`}
          onClick={handleViewInChart}
        >
          {isShowingAlarms ? 'LIMPIAR GRAFICO' : 'VER EN GRAFICO'}
        </button>

        <div className="col-span-4"></div>

        <button
          className="px-4 py-2 font-semibold transition-colors duration-200 shadow-md bg-african_violet-500 text-white rounded col-span-1 hover:bg-african_violet-400"
          onClick={() => onDelete(strategy.id)}
        >
          Eliminar
        </button>
      </div>

      {isShowingOrders && (
        <div className="mt-4">          
          TABLE WITH ORDERS WALLET USED IN THIS STRATEGY
        </div>
      )}
    </div>
  );
};

export default StrategyItem;
