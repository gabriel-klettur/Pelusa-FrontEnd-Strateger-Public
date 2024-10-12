// Path: strateger-react/src/components/Alarms/AlarmTable/AlarmTable.js

import React from 'react';
import Tablita from '../../../common/Tablita';
import AlarmRow from './AlarmRow';
import Pagination from './Pagination'; // Asegúrate de ajustar la ruta de importación

const AlarmTable = ({
  columns,
  data,
  totalLength,
  page,
  hasMore,
  handleAlarmSelectionByClick,
  filteredByIntervalAlarms,
  filteredByClickAlarms,
}) => {

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
      <Tablita columns={columns} data={data} renderRow={renderRow} />
      <Pagination 
        page={page} 
        hasMore={hasMore} 
        endIndex={page * 20 + data.length} 
        alarmsLength={totalLength}       
      />
    </div>
  );
};

export default AlarmTable;
