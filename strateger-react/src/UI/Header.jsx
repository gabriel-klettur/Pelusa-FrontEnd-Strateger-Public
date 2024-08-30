import React from 'react';
import ToolbarCharts from '../components/Charts/components/ToolbarCharts/ToolbarCharts';

const Header = ({ selectedTab, initialTemporalidad, selectedStartDate, selectedEndDate, handleDateChange, handleButtonClick }) => {
  const buttonsMap = [
    'Alarmas',
    'Órdenes',
    'Estrategias',
    'Diario',
    'Account',
    'Positions',
    'Backtesting',
    'Config'
  ];

  return (
    <div>
      <div className="w-full flex">
        {buttonsMap.map((buttonLabel, index) => (
          <button
            key={index}
            onClick={() => handleButtonClick(index)}
            className={`w-full h-14 text-sm font-medium transition-colors duration-200 ${
              selectedTab === index
                ? 'bg-african_violet-400 shadow text-african_violet-900'
                : 'text-african_violet-700 hover:bg-african_violet-200 hover:text-african_violet-900'
            }`}
          >
            {buttonLabel}
          </button>
        ))}
      </div>

      <div className="pt-1 bg-african_violet-600">
        <ToolbarCharts
          initialTemporalidad={initialTemporalidad}
          startDate={selectedStartDate}
          endDate={selectedEndDate}
          onDateChange={handleDateChange}
        />
      </div>
    </div>
  );
};

export default Header;
