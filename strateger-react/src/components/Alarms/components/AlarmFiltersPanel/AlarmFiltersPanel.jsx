//Path: strateger-react/src/components/Alarms/components/AlarmToolPanel/AlarmToolPanel.js

import React from 'react';

import IntervalBar from './IntervalBar/IntervalBar';
import DirectionTabs from './DirectionFiltersPanel/DirectionTabs';

const AlarmFiltersPanel = ({temporalidades, selectedTemporalidad, selectedTypes, toggleTemporalidad, toggleType}) => {
  return (
    <div className="h-full flex flex-col">
      <>
        <IntervalBar  
          temporalidades={temporalidades}
          selectedTemporalidad={selectedTemporalidad}
          selectedTypes={selectedTypes}
          toggleTemporalidad={toggleTemporalidad}
        />
      </>
      <div className="h-full">
        <DirectionTabs
          selectedTemporalidad={selectedTemporalidad}
          selectedTypes={selectedTypes}
          toggleType={toggleType}
        />   
      </div>   
    </div>
  );
};

export default AlarmFiltersPanel;
