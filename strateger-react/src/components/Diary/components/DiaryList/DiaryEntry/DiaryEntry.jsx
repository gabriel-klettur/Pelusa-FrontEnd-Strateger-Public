import DateLabel from "./DateLabel";
import CommentLabel from "./CommentLabel";
import PhotosDiary from "./PhotosDiary";
import ReferencesLabels from "./ReferencesLabels";
import ActionButtons from "./ActionButtons";

const DiaryEntry = ({ entry, onEdit, onDelete }) => {

  return (    
    <div className="flex flex-col">      
      <DateLabel date={entry.date} />
      <CommentLabel comment={entry.text} />
      <PhotosDiary photos={entry.photos} />
      <ReferencesLabels references={entry.references} />
      <ActionButtons onEdit={onEdit} onDelete={onDelete} id={entry.id} />
    </div>
  );
};

export default DiaryEntry;
