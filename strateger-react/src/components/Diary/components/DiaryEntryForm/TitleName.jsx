import Ventanita from "../../../common/Ventanita";

const TitleName = ({ text, handleChange, error }) => {
    return (
        <>     
            <Ventanita
                titulo="Title Name"
                contenido={
                    <div className="h-12"> {/* Altura consistente */}
                        <input
                            type="text"
                            name="titleName"
                            value={text}
                            onChange={handleChange}
                            className={`w-full h-full p-2 bg-african_violet-200 rounded-md 
                                text-african_violet-800 text-sm 
                                focus:ring focus:ring-blue-200 focus:border-blue-500
                                ${error ? 'border-red-500' : ''} 
                            `}
                        />
                        {error && (
                            <p className="text-red-500 text-sm mt-1">{error}</p>
                        )}
                    </div>
                }
            />
        </>
    );
}

export default TitleName;
