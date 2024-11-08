

import DiaryListContainer from "./DiaryListContainer";
import MainChart from "../../Charts/MainChart/MainChart";
import DiaryCalendar from "../components/DiaryCalendar/DiaryCalendar";
import DiaryEntryFormContainer from "./DiaryEntryFormContainer";

import useDiary from '../hooks/useDiary';

const DiaryContainer = () => {
  const { editingEntry, entries, handleAddOrUpdateEntry, handleCancelEdit,  handleDeleteEntry, handleEditEntry } = useDiary();
   
  const sortedEntriesByDate = [...entries].sort((a, b) => new Date(b.date) - new Date(a.date));

  const formattedEntries = entries.map(entry => {
    const formattedDate = new Date(entry.date).toISOString().split('T')[0];     // Fortmat the date to 'YYYY-MM-DD' removing the time part of the string.
    return {
        id: entry.id,
        date: formattedDate
    };
  });

  const dataCalendar = Object.values(
    formattedEntries.reduce((acc, entry) => {
      // Si la fecha no existe en el acumulador, inicializa el objeto
      if (!acc[entry.date]) {
        acc[entry.date] = { date: entry.date, textCalendar: 0 };
      }
      // Incrementa el conteo de entradas para esa fecha
      acc[entry.date].textCalendar += 1;
      return acc;
    }, {})
  );
  console.log(entries);

  return(
      <div className="flex flex-col bg-african_violet-500">
          <div className="grid grid-cols-10">
              <div className="col-span-7 p-1">
                  <MainChart />                                   {/* CANDLESTICK CHART */}
              </div>
              <div className="col-span-3 p-1">
                  <DiaryCalendar results={dataCalendar}/>         {/* CALENDAR */}
              </div>
          </div>
          <div className="grid grid-cols-10">
              <div className="col-span-4 p-1">                    {/* COLUMN LEFT */}
                  <DiaryEntryFormContainer 
                      onSave={handleAddOrUpdateEntry} 
                      entry={editingEntry} 
                      onCancelEdit={handleCancelEdit}
                  />                          
              </div>      
              <div className="col-span-6 pt-1 pr-1 pb-1">        {/* COLUMN RIGHT */}
                  <DiaryListContainer 
                      entries={sortedEntriesByDate}
                      onEdit={handleEditEntry} 
                      onDelete={handleDeleteEntry}
                  />         
              </div>
          </div>
      </div>
  );
}

export default DiaryContainer;