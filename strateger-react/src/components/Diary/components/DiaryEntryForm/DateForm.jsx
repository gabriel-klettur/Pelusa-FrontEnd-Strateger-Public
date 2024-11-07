// Path: strateger-react/src/components/DateForm.js

import Ventanita from "../../../common/Ventanita";

const DateForm = ({ date, handleChange, name }) => {
  return (
    <>      
      <Ventanita 
        titulo="Date / Time"
        contenido={
          <input
            type="datetime-local"
            name={name}
            value={date}
            onChange={handleChange}
            className="
              w-full
              p-2
              bg-african_violet-200
              text-african_violet-800
              transition duration-300
              text-white
              rounded-md          
            "
          />  
        }
      />
    </>
  );
};

export default DateForm;
