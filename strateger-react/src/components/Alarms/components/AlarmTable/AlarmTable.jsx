//Path: src/components/Alarms/components/AlarmTable/AlarmTable.js

//Redux
import { useSelector, useDispatch } from 'react-redux';
import { fetchAlarms } from '../../../../redux/alarm';
import {  selectFilteredByClickAlarms } from '../../../../redux/alarm';

// Components
import Tablita from '../../../common/Tablita';
import AlarmRow from './components/AlarmRow';
import Pagination from './components/Pagination';
import { columnsHeaders } from './configTable';

// Hooks and functions
import handleSelectAlarm from './handleSelectAlarm'; 
import usePagination from './hooks/usePagination';




const AlarmTable = ({ data, page, hasMore, setHasMore, offset, setPage }) => {

  const dispatch = useDispatch();

  const filteredByClickAlarms  = useSelector(selectFilteredByClickAlarms);
  
  
  const { totalDataLength, paginatedData } = usePagination(data, page);

  
  const renderRow = (item, index) => {     

    const rowClassName = filteredByClickAlarms.some((a) => a.id === item.id)
      ? 'bg-green-600 text-white'        
      : 'bg-white text-african_violet-200';
  
    return (      
      <AlarmRow
        key={index}
        alarm={item}
        rowClassName={rowClassName} 
        columnsHeaders={columnsHeaders}
        handleSelectAlarm={(alarm) => handleSelectAlarm(alarm, filteredByClickAlarms, dispatch)}
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
