import Ventanita from "../../../common/Ventanita";
import Slider from "react-slick";
import config from "../../../../config";

const PhotosForm = ({ photos, fileInputRef, handlePhotoChange }) => {
  
  const sliderSettings = {
    dots: true,
    infinite: false, // Cambia a true si deseas un loop continuo
    speed: 500,
    slidesToShow: 1, // Solo una imagen a la vez
    slidesToScroll: 1,
    arrows: true,
    adaptiveHeight: true, // Ajusta la altura automáticamente
    centerMode: true, // Centra la imagen en el carrusel
    centerPadding: "0px", // Evita padding en los lados
  };

  return (
    <div className="">
      <Ventanita
        titulo='Photos'
        contenido={
          <div className="">
            {photos.length > 0 && (
              console.log('photos:', photos),              
              <Slider {...sliderSettings} className="mb-4">
                {photos.map((photo, index) => (
                  <div key={index} className="flex justify-center items-center">
                    <img
                      src={photo instanceof File ? URL.createObjectURL(photo) : `${config.apiURL}${photo}`} 
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
          </div>
        }
      />
    </div>
  );
};

export default PhotosForm;
