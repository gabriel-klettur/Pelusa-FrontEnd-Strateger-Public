import React from 'react';

const Toolbar = ({ interval, setInterval, showElderRay, setShowElderRay, showBottomPanel, setShowBottomPanel, showVolume, setShowVolume }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="interval-selector flex items-center">
        <label htmlFor="interval" className="mr-2">Interval: </label>
        <select
          id="interval"
          value={interval}
          onChange={(e) => setInterval(e.target.value)}
          className="border border-gray-300 rounded px-2 py-2 w-32 mr-4 h-12 text-base leading-6"
        >
          <option value="1m">1 Minute</option>
          <option value="5m">5 Minutes</option>
          <option value="15m">15 Minutes</option>
          <option value="30m">30 Minutes</option>
          <option value="1h">1 Hour</option>
          <option value="4h">4 Hours</option>
          <option value="1d">1 Day</option>
        </select>
      </div>      
      <div className="buttons flex gap-4">
        <button
          onClick={() => setShowElderRay(!showElderRay)}
          className="border border-gray-300 rounded px-4 py-2 h-12 text-base leading-6 w-60"
        >
          {showElderRay ? 'Hide Elder Ray' : 'Show Elder Ray'}
        </button>
        <button
          onClick={() => setShowBottomPanel(!showBottomPanel)}
          className="border border-gray-300 rounded px-4 py-2 h-12 text-base leading-6 w-60"
        >
          {showBottomPanel ? 'Hide Bottom Panel' : 'Show Bottom Panel'}
        </button>
        <button
          onClick={() => setShowVolume(!showVolume)}
          className="border border-gray-300 rounded px-4 py-2 h-12 text-base leading-6 w-60"
        >
          {showVolume ? 'Hide Volume' : 'Show Volume'}
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
