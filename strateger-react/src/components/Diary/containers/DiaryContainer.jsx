
import DiaryEntryForm from "../components/DiaryEntryForm/DiaryEntryForm";
import useDiary from '../hooks/useDiary';
import DiaryListContainer from "./DiaryListContainer";
import MainChart from "../../Charts/MainChart/MainChart";
import DiaryCalendar from "../components/DiaryCalendar/DiaryCalendar";

const DiaryContainer = () => {
    
    const { editingEntry, handleAddOrUpdateEntry, handleCancelEdit } = useDiary();
    
    const results = [
        {
          date: '2024-10-01', // Fecha en formato ISO
          pnl: 200,           // Ganancia o pérdida del día
        },
        {
          date: '2024-10-05',
          pnl: -50,
        },
        {
          date: '2024-10-12',
          pnl: 120,
        },
        {
          date: '2024-10-20',
          pnl: 'Test',
        },
        {
          date: '2024-10-25',
          pnl: 300,
        },
    ];

    return(
        <div className="flex flex-col bg-african_violet-500">
            <div className="grid grid-cols-10">
                <div className="col-span-7 p-1">
                    <MainChart />                                   {/* CANDLESTICK CHART */}
                </div>
                <div className="col-span-3 p-1">
                    <DiaryCalendar results={results}/>              {/* CALENDAR */}
                </div>
            </div>
            <div className="grid grid-cols-10">
                <div className="col-span-4 p-1">                    {/* COLUMN LEFT */}
                    <DiaryEntryForm
                        onSave={handleAddOrUpdateEntry}
                        entry={editingEntry}
                        onCancelEdit={handleCancelEdit}
                    />                          
                </div>      
                <div className="col-span-6 pt-1 pr-1 pb-1">        {/* COLUMN RIGHT */}
                    <DiaryListContainer />         
                </div>
            </div>
        </div>
    );
}

export default DiaryContainer;