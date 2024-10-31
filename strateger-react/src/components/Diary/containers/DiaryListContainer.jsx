//Path: src/components/Diary/containers/DiaryListContainer.jsx

import Ventanita from "../../common/Ventanita";
import DiaryEntry from "../components/DiaryList/DiaryEntry/DiaryEntry";

const DiaryListContainer = ({entries, onEdit, onDelete}) => {
    
    return (
        <div>
          <Ventanita
            titulo="Diary Entries"
            contenido={      
              entries.length === 0 ? (
                <p>No entries found.</p>
              ) : (
                entries.map((entry) => (
                  <div key={`diary-entry-${entry.id}`} className='mb-4'>
                    <Ventanita
                      titulo={`Diary Entry ${entry.id}`}
                      contenido={
                        <DiaryEntry
                          key={`diary-entry-${entry.id}`}
                          entry={entry}
                          onEdit={onEdit}
                          onDelete={onDelete}
                        />
                      }
                    />
                  </div>
                ))
              )}    
          />
        </div>
    );
}

export default DiaryListContainer;