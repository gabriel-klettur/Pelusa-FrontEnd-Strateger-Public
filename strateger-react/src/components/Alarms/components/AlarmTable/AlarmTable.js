// Path: strateger-react/src/components/Alarms/AlarmTable/AlarmTable.js

import React from 'react';
import Tablita from '../../../common/Tablita';
import AlarmRow from './AlarmRow';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../../components/AlarmTable/Pagination';
import useSortAlarmsById from '../../hooks/useSortAlarmsById';

import handleSelectAlarmByClick from './handleSelectAlarmByClick';  // Function, Handle alarm selection by click

const AlarmTable = ({ viewTabType }) => {

  const { alarms, page, filteredByIntervalAlarms, filteredByIntervalAndTypeAlarms, hasMore, filteredByClickAlarms } = useSelector((state) => state.alarms);    

  const dispatch = useDispatch();  

  const sortedAlarms = useSortAlarmsById(viewTabType, alarms, filteredByIntervalAlarms, filteredByIntervalAndTypeAlarms, filteredByClickAlarms);  // Hook, Sort alarms by id
  const currentAlarms = sortedAlarms.slice(page * 20, (page * 20) + 20);

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
      isSelectedByInterval={filteredByIntervalAlarms.some((a) => a.id === item.id)}
      isSelectedByClicks={filteredByClickAlarms.some((a) => a.id === item.id)}
      handleSelectAlarm={handleAlarmSelectionByClick}
    />
  );  

  return (
    <div>
    <Tablita columns={columns} data={currentAlarms} renderRow={renderRow} />
    <Pagination 
          page={page} 
          hasMore={hasMore} 
          endIndex={page * 20 + currentAlarms.length} 
          alarmsLength={sortedAlarms.length}           
    />
    </div>
  );
};

export default AlarmTable;
