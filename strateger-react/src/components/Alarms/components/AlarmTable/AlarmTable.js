//Path: src/components/Alarms/components/AlarmTable/AlarmTable.js

//Redux
import { useSelector, useDispatch } from 'react-redux';

import { fetchAlarms } from '../../../../redux/alarm';

// Components
import Tablita from '../../../common/Tablita';
import AlarmRow from './AlarmRow';
import Pagination from './Pagination';

// Hooks and functions
import handleSelectAlarmByClick from './handleSelectAlarmByClick'; 

import {  selectFilteredByClickAlarms } from '../../../../redux/alarm';


const AlarmTable = ({ data, page, hasMore, setHasMore, offset, setPage }) => {

  const dispatch = useDispatch();

  const filteredByClickAlarms  = useSelector(selectFilteredByClickAlarms);

  const totalDataLength = data.length;
  const paginatedData = data.slice(page * 20, (page * 20) + 20);

  const columnsHeaders = [
    { label: 'ID', key: 'id' },
    { label: 'Ticker', key: 'Ticker' },
    { label: 'Interval', key: 'Interval' },
    { label: 'Price', key: 'Price_Alert' },
    { label: 'Time', key: 'Time_Alert' },
    { label: 'Type', key: 'Order' },
    { label: 'Strategy', key: 'Strategy' },
  ];


  //! IT should  be refactored to a separate function in separete file
  const renderRow = (item, index) => {     

    const rowClassName = filteredByClickAlarms.some((a) => a.id === item.id)
      ? 'bg-green-600 text-white'        
      : 'bg-white text-african_violet-200';
  
    return (
      //! CHECK! AlarmRow in the fase of refactoring!
      <AlarmRow
        key={index}
        alarm={item}
        rowClassName={rowClassName} 
        columnsHeaders={columnsHeaders}
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
        setHasMore={setHasMore}
        endIndex={page * 20 + paginatedData.length} 
        totalDataLength={totalDataLength}  
        offset={offset}   
        setPage={setPage} 
        fetchData={fetchAlarms} 
      />
    </>
  );
};

export default AlarmTable;
