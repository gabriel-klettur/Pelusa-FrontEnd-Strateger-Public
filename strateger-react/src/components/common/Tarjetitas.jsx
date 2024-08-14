// Path: strateger-react/src/components/common/Tarjetitas.jsx

import React from 'react';

/**
 * Componente para renderizar una tarjeta informativa.
 * @param {Object} props - Las props del componente.
 * @param {string} props.descripcion - La descripción o título de la tarjeta.
 * @param {string|number} props.contenido - El contenido que se mostrará en la tarjeta.
 * @returns {JSX.Element} - El componente de la tarjeta.
 */
const Tarjetitas = ({ descripcion, contenido }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h4 className="text-lg font-bold">{descripcion}</h4>
      <p className="text-2xl">{contenido}</p>
    </div>
  );
};

export default Tarjetitas;
