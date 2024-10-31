//Path: src/components/Diary/containers/DiaryEntryFormContainer.jsx

import DiaryEntryForm from "../components/DiaryEntryForm/DiaryEntryForm";


const DiaryEntryFormContainer = ({onSave, entry, onCancelEdit}) => {

    return(
        <DiaryEntryForm 
            onSave={onSave} 
            entry={entry} 
            onCancelEdit={onCancelEdit}
        />
    )
}

export default DiaryEntryFormContainer;