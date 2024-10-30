//Path: strateger-react/src/components/Diary/containers/DiaryListContainer.jsx

import Ventanita from "../../common/Ventanita";
import DiaryEntry from "../components/DiaryList/DiaryEntry/DiaryEntry";
import useDiary from '../hooks/useDiary';

const DiaryListContainer = () => {

    const { entries, handleDeleteEntry, handleEditEntry } = useDiary();

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
                          onEdit={handleEditEntry}
                          onDelete={handleDeleteEntry}
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