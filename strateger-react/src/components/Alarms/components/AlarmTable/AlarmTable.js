//Path: strateger-react/src/components/Alarms/components/AlarmTable/AlarmTable.js

import React from 'react';
import { useSelector } from 'react-redux';
import Tablita from '../../../common/Tablita';
import AlarmRow from './AlarmRow';
import Pagination from './Pagination'; // Asegúrate de ajustar la ruta de importación

const AlarmTable = ({
  data,  
  handleAlarmSelectionByClick,
}) => {

  const { page, hasMore } = useSelector((state) => state.alarms);
  const { filteredByIntervalAlarms, filteredByClickAlarms } = useSelector((state) => state.alarms);

  const totalAlarmsLength = data.length;
  const paginatedData = data.slice(page * 20, (page * 20) + 20);

  // Definir las columnas para la tabla
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
