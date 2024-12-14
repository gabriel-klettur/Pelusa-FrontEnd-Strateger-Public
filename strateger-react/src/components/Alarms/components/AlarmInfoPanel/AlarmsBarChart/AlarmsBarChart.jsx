//Path: strateger-react/src/components/Alarms/components/AlarmInfoPanel/AlarmsBarChart/AlarmsBarChart.jsx

import { useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import MonthTogglePanel from './components/MonthTogglePanel';
import { options, monthsLabels } from './configChart';
import useUpdateVisibleMonths from './hooks/useUpdateVisibleMonths';
import useGenerateChartData from './hooks/useGenerateBarChartData';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);



const AlarmsBarChart = ({alarmsData}) => {
  

  const [visibleMonths, setVisibleMonths] = useState(Array(12).fill(false));

  // setVisibleMonths to show avaible the months with data from alarmsData
  useUpdateVisibleMonths({alarmsData, setVisibleMonths, monthsLabels});    

  // setChartData based on visible months with alarmsData
  const chartData = useGenerateChartData({alarmsData, visibleMonths, monthsLabels});  

  return (
    <div className='h-full mt-2' data-testid='alarms-graph-by-month-container'>
      {alarmsData && alarmsData.length > 0 ? (
        <div className='h-full' data-testid='alarms-graph-content'>
          
          <MonthTogglePanel 
            monthsLabels={monthsLabels}             
            visibleMonths={visibleMonths}
            setVisibleMonths={setVisibleMonths}
            data-testid='month-toggle-panel-container'
          />

          <div style={{ height: "440px" }} data-testid='bar-chart-container'>
            <Bar               
              options={options} 
              data={chartData}  
              aria-label='bar-chart'               
            />
          </div>
        </div>
      ) : (
        <p data-testid='loading-message'>Loading chart data...</p>
      )}
    </div>
  );
};

export default AlarmsBarChart;
