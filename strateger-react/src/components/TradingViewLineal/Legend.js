// Path: strateger-react/src/components/TradingViewLineal/Legend.js

import React from 'react';

const Legend = ({ seriesData, visibleSeries, toggleSeriesVisibility }) => {
  return (
    <div className="legend-container flex flex-row space-x-4"> {/* Añadir flex y espacio entre botones */}
      {seriesData.map((series, index) => (
        <div key={index} className="legend-item">
          <button
            onClick={() => toggleSeriesVisibility(series.name)}
            className={`flex items-center p-2 border rounded ${
              visibleSeries[series.name] ? 'bg-gray-300' : 'bg-white'
            }`} // Usar clases de Tailwind para estilo y condiciones para visibilidad
          >
            <span className="inline-block w-4 h-2 mr-2" style={{ backgroundColor: series.color }}></span>
            <span>{series.name}</span>
          </button>
        </div>
      ))}
    </div>
  );
}

export default Legend;
