// Path: strateger-react/src/components/common/Tablita.jsx

import { useState } from 'react';

/**
 * Tablita component renders a table with selectable rows.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.data - The data to be displayed in the table.
 * @param {Array} props.columns - The columns configuration for the table.
 * @param {Function} [props.renderRow] - Optional custom row rendering function.
 *
 * @returns {JSX.Element} The rendered table component.
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
        {data.length === 0 ? (
          <tr>
            <td colSpan={columns.length} className="py-4 px-6 text-center text-gray-500">
              No data
            </td>
          </tr>
        ) : (
          data.map((item, index) => (
            renderRow ? renderRow(item, index) : (
              <tr
                key={index}
                className={`border-b transition-colors duration-200 hover:bg-african_violet-700 cursor-pointer ${
                  selectedRowIndex === index ? 'bg-african_violet-400 text-white' : 'bg-white text-african_violet-200'
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
          ))
        )}
      </tbody>
    </table>
  );
};

export default Tablita;
