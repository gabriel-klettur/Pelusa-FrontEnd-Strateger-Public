//Slice
import diaryReducer from './diarySlice';

//Thunks
import { uploadImages, fetchDiaryEntries, saveDiaryEntry, removeDiaryEntry } from './diaryThunks';

//Actions
import { setDiaryEntries } from './diarySlice';

//TODO Actions
export { setDiaryEntries };

//TODO Thunks
export { uploadImages, fetchDiaryEntries, saveDiaryEntry, removeDiaryEntry };

//TODO Slice
export default diaryReducer;