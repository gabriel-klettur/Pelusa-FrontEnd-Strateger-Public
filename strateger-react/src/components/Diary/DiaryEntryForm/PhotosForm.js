// Path: strateger-react/src/components/Diary/DiaryEntryForm/PhotosForm.js

import React from 'react';
import Slider from "react-slick";

const PhotosForm = ({ photos, handlePhotoChange, fileInputRef }) => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-semibold mb-2">Photos</label>
      {photos.length > 0 && (
        <Slider {...sliderSettings} className="mb-4">
          {photos.map((photoUrl, index) => (
            <div key={index} className="flex justify-center items-center">
              <img
                src={photoUrl}
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
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
      />
    </div>
  );
};

export default PhotosForm;
