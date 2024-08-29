// Path: strateger-react/src/components/Alarms/AlarmTable/AlarmTable.js

import React from 'react';
import Tablita from '../../../common/Tablita';
import AlarmRow from './AlarmRow';
import { useDispatch, useSelector } from 'react-redux';

import handleSelectAlarmByClick from './handleSelectAlarmByClick';  // Function, Handle alarm selection by click

const AlarmTable = ({ alarms, selectedAlarmsByInterval }) => {

  const {filteredByClickAlarms} = useSelector((state) => state.alarms);  

  const dispatch = useDispatch();  

  // Definición de columnas para Tablita (aunque no se utilizarán directamente aquí)
  const columns = [
    { label: 'ID', key: 'id' },
    { label: 'Ticker', key: 'Ticker' },
    { label: 'T', key: 'Temporalidad' },
    { label: 'Entry Price', key: 'Entry_Price_Alert' },
    { label: 'Exit Price', key: 'Exit_Price_Alert' },
    { label: 'Time', key: 'Time_Alert' },
    { label: 'Type', key: 'Order' },
    { label: 'Estrategia', key: 'Strategy' },
  ];

  const handleAlarmSelectionByClick = (alarm) => handleSelectAlarmByClick(alarm, filteredByClickAlarms, dispatch);     // Function, Handle alarm selection by interval

  // Renderizado de la fila utilizando AlarmRow
  const renderRow = (item, index) => (
    <AlarmRow
      key={index}
      alarm={item}
      isSelectedByInterval={selectedAlarmsByInterval.some((a) => a.id === item.id)}
      handleSelectAlarm={handleAlarmSelectionByClick}
    />
  );  

  return (
    <Tablita columns={columns} data={alarms} renderRow={renderRow} />
  );
};

export default AlarmTable;
