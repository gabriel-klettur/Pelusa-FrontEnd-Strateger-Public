import DiaryEntryForm from "../components/DiaryEntryForm/DiaryEntryForm";
import useDiary from '../hooks/useDiary';

const DiaryEntryFormContainer = () => {

    const { editingEntry, handleAddOrUpdateEntry, handleCancelEdit } = useDiary();

    return(
        <DiaryEntryForm 
            onSave={handleAddOrUpdateEntry} 
            entry={editingEntry} 
            onCancelEdit={handleCancelEdit}
        />
    )
}

export default DiaryEntryFormContainer;