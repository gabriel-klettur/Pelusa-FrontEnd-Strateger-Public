//Path: strateger-react/src/components/Alarms/components/AlarmTable/AlarmTable.js

import React from 'react';
import Tablita from '../../../common/Tablita';
import AlarmRow from './AlarmRow';
import Pagination from './Pagination'; // Asegúrate de ajustar la ruta de importación

const AlarmTable = ({
  columns,
  data,  
  page,
  hasMore,
  handleAlarmSelectionByClick,
  filteredByIntervalAlarms,
  filteredByClickAlarms,
}) => {

  const totalAlarmsLength = data.length;
  const paginatedData = data.slice(page * 20, (page * 20) + 20);

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
      <Tablita columns={columns} data={paginatedData} renderRow={renderRow} />
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
