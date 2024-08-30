import React from 'react';

/**
 * Componente para renderizar una tarjeta informativa con estilo similar a Ventanita.
 * @param {Object} props - Las props del componente.
 * @param {string} props.descripcion - La descripción o título de la tarjeta.
 * @param {string|number} props.contenido - El contenido que se mostrará en la tarjeta.
 * @returns {JSX.Element} - El componente de la tarjeta.
 */
const Tarjetitas = ({ descripcion, contenido }) => {
  return (
    <div className="w-full mx-auto rounded-lg">
      <div className="grid grid-rows-[auto,1fr]">
        {/* Sección de la Descripción */}
        <div className="bg-african_violet-300 text-white px-4 py-2 font-semibold text-lg">
          {descripcion}
        </div>
        
        {/* Sección del Contenido */}
        <div className="bg-african_violet-100 text-african_violet-900 px-6 py-4">
          {contenido}
        </div>
      </div>
    </div>
  );
};

export default Tarjetitas;
