import React from 'react';
import PositionSummary from './PositionSummary/PositionSummary';

const Position = () => {

  return (
    <div className="p-4 border-4 border-blue-500 grid grid-cols-1 gap-2">
      <div className="border-4 border-green-500">
        <h2 className="text-2xl font-bold mb-4">Positions Overview</h2>
      </div>
      <PositionSummary />    
    </div>
  );
};

export default Position;
