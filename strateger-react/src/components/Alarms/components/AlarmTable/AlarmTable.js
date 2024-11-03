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

import { selectAlarmsPage, selectAlarmsHasMore, selectFilteredByClickAlarms, selectFilteredByIntervalAlarms } from '../../../../redux/alarm';

const AlarmTable = ({ data }) => {

  const dispatch = useDispatch();

  const page = useSelector(selectAlarmsPage);
  const hasMore = useSelector(selectAlarmsHasMore);

  const filteredByIntervalAlarms = useSelector(selectFilteredByIntervalAlarms);
  const filteredByClickAlarms  = useSelector(selectFilteredByClickAlarms);

  const totalAlarmsLength = data.length;
  const paginatedData = data.slice(page * 20, (page * 20) + 20);

  const columnsHeaders = [
    { label: 'ID', key: 'id' },
    { label: 'Ticker', key: 'Ticker' },
    { label: 'T', key: 'Temporalidad' },
    { label: 'Entry Price', key: 'Entry_Price_Alert' },
    { label: 'Exit Price', key: 'Exit_Price_Alert' },
    { label: 'Time', key: 'Time_Alert' },
    { label: 'Type', key: 'Order' },
    { label: 'Estrategia', key: 'Strategy' },
  ];


  const renderRow = (item, index) => {    
    const rowClassName = filteredByClickAlarms.some((a) => a.id === item.id)
      ? 'bg-green-600 text-white'
      : filteredByIntervalAlarms.some((a) => a.id === item.id)
        ? 'bg-african_violet-200 text-white'
        : 'bg-white text-african_violet-400';
  
    return (
      <AlarmRow
        key={index}
        alarm={item}
        rowClassName={rowClassName} 
        handleSelectAlarm={(alarm) => handleSelectAlarmByClick(alarm, filteredByClickAlarms, dispatch)}
      />
    );
  };  

  return (
    <>
      <Tablita 
        data={paginatedData} 
        columns={columnsHeaders} 
        renderRow={renderRow} 
      />
      <Pagination 
        page={page} 
        hasMore={hasMore} 
        endIndex={page * 20 + paginatedData.length} 
        alarmsLength={totalAlarmsLength}       
      />
    </>
  );
};

export default AlarmTable;
