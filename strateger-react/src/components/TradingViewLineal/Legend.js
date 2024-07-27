// Path: strateger-react/src/components/TradingViewLineal/Legend.js

import React from 'react';

const Legend = ({ seriesData }) => {
  return (
    <div className="legend-container">
      {seriesData.map((series, index) => (
        <div key={index} className="legend-item" style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
          <span style={{ width: '20px', height: '10px', backgroundColor: series.color, display: 'inline-block', marginRight: '5px' }}></span>
          <span>{series.name}</span>
        </div>
      ))}
    </div>
  );
}

export default Legend;
