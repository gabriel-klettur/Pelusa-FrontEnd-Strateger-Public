// Path: strateger-react/src/components/Diary/DiaryEntryForm/TextForm.js

import Ventanita from "../../../common/Ventanita";

const CommentTextarea = ({ text, handleChange, error }) => {
  return (
    <>     
      <Ventanita
        titulo="Comment"
        contenido={
          <>
            <textarea
              name="text"
              value={text}
              onChange={handleChange}
              rows="4"
              className={`           
                w-full  
                p-2               
                bg-african_violet-200    
                rounded-md
                text-sm
                text-african_violet-800
                focus:ring focus:ring-blue-200 focus:border-blue-500 
                ${error ? 'border-red-500' : ''} 
              `}        
            ></textarea>
            {error && (
              <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
          </>
        }
      />  
    </>
  );
};

export default CommentTextarea;
