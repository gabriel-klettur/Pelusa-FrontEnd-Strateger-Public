
import DiaryEntryForm from "../components/DiaryEntryForm/DiaryEntryForm";
import useDiary from '../hooks/useDiary';
import DiaryListContainer from "./DiaryListContainer";

const DiaryContainer = () => {
    
    const { editingEntry, handleAddOrUpdateEntry, handleCancelEdit } = useDiary();
    
    return(
        <div className="grid grid-cols-10 bg-african_violet-400">
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
    );
}

export default DiaryContainer;