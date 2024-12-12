// Path: src/components/Alarms/Alarms.jsx
import React from 'react';

import AlarmsContainer from './containers/AlarmContainer';

const Alarms = () => {  
  return (
    <div data-testid="alarms-component">     
      <AlarmsContainer />
    </div>
  );
};

export default Alarms;
