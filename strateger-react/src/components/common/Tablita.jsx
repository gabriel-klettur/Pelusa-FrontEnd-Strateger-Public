// Path: strateger-react/src/components/common/Tablita.jsx

import React, { useState } from 'react';

/**
 * Componente para renderizar una tabla estilizada.
 * @param {Object} props - Las props del componente.
 * @param {Array} props.data - Los datos que se mostrarán en la tabla.
 * @param {Array} props.columns - Los encabezados de las columnas y las claves de datos correspondientes.
 * @param {Function} [props.renderRow] - Función opcional para renderizar filas personalizadas.
 * @returns {JSX.Element} - El componente de la tabla.
 */
const Tablita = ({ data, columns, renderRow }) => {
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  return (
    <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
      <thead>
        <tr className="w-full bg-african_violet-500 text-white">
          {columns.map((column, index) => (
            <th key={index} className="py-2 px-4 border-r">
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          renderRow ? renderRow(item, index) : (
            <tr
              key={index}
              className={`border-b transition-colors duration-200 hover:bg-african_violet-700 cursor-pointer ${
                selectedRowIndex === index ? 'bg-african_violet-400 text-white' : 'bg-white text-african_violet-400'
              }`}
              onClick={() => setSelectedRowIndex(index)}
            >
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="py-2 px-4 border-r">
                  {item[column.key]}
                </td>
              ))}
            </tr>
          )
        ))}
      </tbody>
    </table>
  );
};

export default Tablita;
