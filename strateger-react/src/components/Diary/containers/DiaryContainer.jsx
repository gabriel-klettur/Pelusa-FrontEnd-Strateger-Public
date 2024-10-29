
import DiaryEntryForm from "../components/DiaryEntryForm/DiaryEntryForm";
import useDiary from '../hooks/useDiary';
import DiaryList from '../components/DiaryList/DiaryList';

const DiaryContainer = () => {

    const { entries, handleDeleteEntry, handleEditEntry } = useDiary();
    const { editingEntry, handleAddOrUpdateEntry, handleCancelEdit } = useDiary();

    return(
        <div className="grid grid-cols-10 bg-african_violet-400">
            <div className="col-span-4 p-2">        {/* COLUMN LEFT */}        
                <DiaryEntryForm
                    onSave={handleAddOrUpdateEntry}
                    entry={editingEntry}
                    onCancelEdit={handleCancelEdit}
                />                          
            </div>      
            <div className="col-span-6 p-2">        {/* COLUMN RIGHT */}
                <DiaryList 
                    entries={entries} 
                    onEdit={handleEditEntry} 
                    onDelete={handleDeleteEntry} 
                />         
            </div>
        </div>
    );
}

export default DiaryContainer;