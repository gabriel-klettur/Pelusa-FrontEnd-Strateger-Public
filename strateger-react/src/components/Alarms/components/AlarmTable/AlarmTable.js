//Path: strateger-react/src/components/Alarms/components/AlarmTable/AlarmTable.js

//React and Redux
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Components
import Tablita from '../../../common/Tablita';
import AlarmRow from './AlarmRow';
import Pagination from './Pagination';

// Hooks and functions
import handleSelectAlarmByClick from './handleSelectAlarmByClick'; 

const AlarmTable = ({ data }) => {
  const dispatch = useDispatch();
  const { page, hasMore } = useSelector((state) => state.alarms);
  const { filteredByIntervalAlarms, filteredByClickAlarms } = useSelector((state) => state.alarms);

  const totalAlarmsLength = data.length;
  const paginatedData = data.slice(page * 20, (page * 20) + 20);

  // Column headers
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

  // Renderizado de la fila utilizando AlarmRow
  const renderRow = (item, index) => {
    // Calcular la clase aquí
    const rowClassName = filteredByClickAlarms.some((a) => a.id === item.id)
      ? 'bg-green-600 text-white'
      : filteredByIntervalAlarms.some((a) => a.id === item.id)
        ? 'bg-african_violet-200 text-white'
        : 'bg-white text-african_violet-400';
  
    return (
      <AlarmRow
        key={index}
        alarm={item}
        rowClassName={rowClassName}  // Pasar la clase como prop
        handleSelectAlarm={(alarm) => handleSelectAlarmByClick(alarm, filteredByClickAlarms, dispatch)}
      />
    );
  };  

  return (
    <div>
      <Tablita data={paginatedData} columns={columns} renderRow={renderRow} />
      <Pagination 
        page={page} 
        hasMore={hasMore} 
        endIndex={page * 20 + paginatedData.length} 
        alarmsLength={totalAlarmsLength}       
      />
    </div>
  );
};

export default AlarmTable;
