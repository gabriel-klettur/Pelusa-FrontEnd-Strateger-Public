// Path: strateger-react/src/components/Alarms/AlarmTable/AlarmTable.js

import React from 'react';
import Tablita from '../../common/Tablita';
import AlarmRow from './AlarmRow';

const AlarmTable = ({ alarms, selectedAlarms, handleSelectAlarm }) => {

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

  // Renderizado de la fila utilizando AlarmRow
  const renderRow = (item, index) => (
    <AlarmRow
      key={index}
      alarm={item}
      isSelected={selectedAlarms.some((a) => a.id === item.id)}
      handleSelectAlarm={handleSelectAlarm}
    />
  );

  return (
    <Tablita columns={columns} data={alarms} renderRow={renderRow} />
  );
};

export default AlarmTable;
