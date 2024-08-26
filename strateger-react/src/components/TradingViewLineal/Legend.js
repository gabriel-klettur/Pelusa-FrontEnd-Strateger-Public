import React from 'react';

const Legend = ({ seriesData, visibleSeries, toggleSeriesVisibility }) => {
  return (
    <div className="legend-container flex flex-wrap gap-4 p-4 bg-african_violet-100 text-white">
      {seriesData.map((series, index) => (
        <div key={index} className="legend-item">
          <button
            onClick={() => toggleSeriesVisibility(series.name)}
            className={`flex items-center p-2 font-semibold transition-colors duration-300 ease-in-out rounded-lg hover:bg-african_violet-300 ${
              visibleSeries[series.name] 
                ? ' text-african_violet_900 opacity-100' 
                : 'bg-african_violet-100 text-white opacity-40'
            }`}
          >
            <span 
              className="inline-block w-4 h-2 mr-2 rounded-sm transition-opacity duration-300 ease-in-out align-middle"
              style={{ backgroundColor: series.color, opacity: visibleSeries[series.name] ? 1 : 0.5 }}
            ></span>
            <span>{series.name}</span>
          </button>
        </div>
      ))}
    </div>
  );
}

export default Legend;
