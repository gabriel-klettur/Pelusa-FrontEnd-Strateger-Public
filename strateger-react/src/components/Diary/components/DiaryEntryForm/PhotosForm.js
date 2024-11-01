import Ventanita from "../../../common/Ventanita";
import config from "../../../../config";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const PhotosForm = ({ photos, fileInputRef, handlePhotoChange }) => {
  const renderPhotoSlider = () => (
    <div className="relative">
      <Swiper
        modules={[Navigation]}
        spaceBetween={10} // Espacio entre slides
        slidesPerView={1} // Cambia a 2 o más si quieres mostrar múltiples imágenes al mismo tiempo
        loop={true} // Habilita el loop continuo del slider
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        className="w-96 " // Asegura que el slider ocupe todo el ancho disponible
      >
        {photos.map((photo, index) => (
          <SwiperSlide key={index} className="flex justify-center items-center">
            <img
              src={photo instanceof File ? URL.createObjectURL(photo) : `${config.apiURL}${photo}`}
              alt={`Attachment ${index + 1}`}
              className="h-48 w-auto rounded-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Botón izquierdo */}
      <button
        className="swiper-button-prev absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-60 text-white p-3 rounded-full hover:bg-gray-700 transition"
        aria-label="Previous slide"
      >
        
      </button>

      {/* Botón derecho */}
      <button
        className="swiper-button-next absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-60 text-white p-3 rounded-full hover:bg-gray-700 transition"
        aria-label="Next slide"
      >
        
      </button>
    </div>
  );

  return (
    <div className="w-full">
      <Ventanita
        titulo="Photos"
        contenido={
          <div className="flex flex-col items-center justify-center space-y-4 p-4">
            {photos.length > 0 && renderPhotoSlider()}
            <input
              type="file"
              name="photos"
              multiple
              onChange={handlePhotoChange}
              ref={fileInputRef}
              className="                    
                w-auto 
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
