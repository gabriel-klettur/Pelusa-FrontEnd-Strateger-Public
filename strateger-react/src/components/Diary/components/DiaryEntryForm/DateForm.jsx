import Ventanita from "../../../common/Ventanita";

const DateForm = ({ date, handleChange, name }) => {
  return (
    <>      
      <Ventanita 
        titulo="Date / Time"
        contenido={
          <div className="h-12"> {/* Altura consistente */}
            <input
              type="datetime-local"
              name={name}
              value={date}
              onChange={handleChange}
              className="w-full h-full p-2 bg-african_violet-200 rounded-md"
            />  
          </div>
        }
      />
    </>
  );
};

export default DateForm;
