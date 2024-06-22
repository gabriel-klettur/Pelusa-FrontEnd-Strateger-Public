// Path: strateger-react/src/components/Alarms/ToolAlarmBar.js

import React from 'react';

const temporalidades = ['1m', '5m', '15m', '30m', '1h', '4h', 'D', 'W', 'M'];
const types = [
  'order open long', 'order close long', 
  'order open short', 'order close short', 
  'indicator open long', 'indicator close long', 
  'indicator open short', 'indicator close short'
];

const longOrders = types.filter(type => type.includes('long') && type.includes('order'));
const longIndicators = types.filter(type => type.includes('long') && type.includes('indicator'));
const shortOrders = types.filter(type => type.includes('short') && type.includes('order'));
const shortIndicators = types.filter(type => type.includes('short') && type.includes('indicator'));

const ToolAlarmBar = ({ selectedTemporalidad, setSelectedTemporalidad, selectedTypes, setSelectedTypes }) => {
  const toggleType = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const toggleTemporalidad = (temp) => {
    if (selectedTemporalidad === temp) {
      setSelectedTemporalidad('');  // Deseleccionar si ya está seleccionado
    } else {
      setSelectedTemporalidad(temp);
    }
  };

  return (
    <div className="grid grid-cols-10 gap-4">
      <div className="col-span-3 border-2 border-blue-500 flex flex-wrap justify-center items-center">
        {temporalidades.map(temp => (
          <button 
            key={temp} 
            className={`px-4 py-2 rounded m-1 ${selectedTemporalidad === temp ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
            onClick={() => toggleTemporalidad(temp)}
          >
            {temp}
          </button>
        ))}
      </div>
      <div className="col-span-7 border-2 border-green-500 flex flex-wrap justify-center items-center">
        <div className="w-full md:w-1/2 border-r-2 border-gray-300 flex flex-wrap justify-center items-center">


          <div className="w-full text-center mb-2 font-bold">Long - Orders</div>
          {longOrders.map(type => (
            <button 
              key={type} 
              className={`px-4 py-2 rounded m-1 ${selectedTypes.includes(type) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
              onClick={() => toggleType(type)}
            >
              {type}
            </button>
          ))}
          
          <div className="w-full text-center mb-2 font-bold">Long - Indicators</div>
          {longIndicators.map(type => (
            <button 
              key={type} 
              className={`px-4 py-2 rounded m-1 ${selectedTypes.includes(type) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
              onClick={() => toggleType(type)}
            >
              {type}
            </button>
          ))}
        </div>
        <div className="w-full md:w-1/2 flex flex-wrap justify-center items-center">


          <div className="w-full text-center mb-2 font-bold">Short - Orders</div>
          {shortOrders.map(type => (
            <button 
              key={type} 
              className={`px-4 py-2 rounded m-1 ${selectedTypes.includes(type) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
              onClick={() => toggleType(type)}
            >
              {type}
            </button>
          ))}


          <div className="w-full text-center mb-2 font-bold">Short - Indicators</div>
          {shortIndicators.map(type => (
            <button 
              key={type} 
              className={`px-4 py-2 rounded m-1 ${selectedTypes.includes(type) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
              onClick={() => toggleType(type)}
            >
              {type}
            </button>
          ))}


        </div>
      </div>
    </div>
  );
};

export default ToolAlarmBar;
