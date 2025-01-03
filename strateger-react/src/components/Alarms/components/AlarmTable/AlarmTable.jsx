//Path: src/components/Alarms/components/AlarmTable/AlarmTable.js

//Redux
import { useSelector } from 'react-redux';
import { fetchAlarms } from 'reduxStore/alarm';
import {  selectFilteredByClickAlarms } from 'reduxStore/alarm';

// Components
import Tablita from '../../../common/Tablita';
import AlarmRow from 'Alarms/components/AlarmTable/components/AlarmRow';
import Pagination from 'Alarms/components/AlarmTable/components/Pagination';
import { columnsHeaders } from 'Alarms/components/AlarmTable/configTable';

// Hooks and functions
import useHandleSelectAlarm from 'Alarms/components/AlarmTable/hooks/useHandleSelectAlarm'; 
import usePagination from 'Alarms/components/AlarmTable/hooks/usePagination';



const AlarmTable = ({ data, page, hasMore, setHasMore, offset, setPage }) => {
  const filteredByClickAlarms = useSelector(selectFilteredByClickAlarms);
  
  // Use the custom hook
  const handleSelectAlarm = useHandleSelectAlarm(filteredByClickAlarms);

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
        handleSelectAlarm={(alarm) => handleSelectAlarm(alarm)}
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
