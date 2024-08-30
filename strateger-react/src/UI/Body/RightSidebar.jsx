import React from 'react';

const RightSidebar = ({ component, image, ImageHeight, componentHeight }) => {
  return (
    <div className="flex flex-col bg-african_violet-600 rounded-bl-lg mt-1">
      <div id="box-cambiadora" className="flex flex-col justify-center flex-grow min-h-full">
        <div className={`flex justify-center w-full ${ImageHeight}`}>
          {image && <img src={image} alt="Banner for tab" className="object-cover" />}
        </div>

        <div className={`flex-auto ${componentHeight} bg-african_violet-300 rounded-lg`}>
          {component}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
