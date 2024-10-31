// Path: strateger-react/src/components/Diary/DiaryEntryForm/PhotosForm.js

import Ventanita from "../../../common/Ventanita";
import Slider from "react-slick";

const PhotosForm = ({ photos, fileInputRef, handlePhotoChange }) => {
  
  const sliderSettings = {
    dots: true,
    infinite: false, // Cambiar a false para evitar duplicación infinita
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <>  
      <Ventanita
        titulo='Photos'
        contenido={
          <>
            {photos.length > 0 && (
              <Slider {...sliderSettings} className="mb-4">
                {photos.map((photo, index) => (
                  <div key={index} className="flex justify-center items-center">
                    <img
                      src={URL.createObjectURL(photo)} // Utilizar URL.createObjectURL para fotos locales
                      alt={`Attachment ${index + 1}`}
                      className="h-48 w-auto object-cover rounded-lg shadow-md"
                    />
                  </div>
                ))}
              </Slider>
            )}
            <input
              type="file"
              name="photos"
              multiple
              onChange={handlePhotoChange}
              ref={fileInputRef}
              className="                    
                w-full 
                focus:ring focus:ring-blue-200 focus:border-blue-500
                file:bg-african_violet-500          
                file:text-white
                file:py-2 
                file:px-4 
                file:rounded
                file:border-none
                file:cursor-pointer
              "
            />
          </>
        }
      />
    </>
  );
};

export default PhotosForm;
