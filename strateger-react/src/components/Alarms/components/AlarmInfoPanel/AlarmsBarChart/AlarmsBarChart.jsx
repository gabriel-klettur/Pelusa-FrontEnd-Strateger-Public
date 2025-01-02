//Path: strateger-react/src/components/Alarms/components/AlarmInfoPanel/AlarmsBarChart/AlarmsBarChart.jsx

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

import MonthTogglePanel from 'Alarms/components/AlarmInfoPanel/AlarmsBarChart/components/MonthTogglePanel';
import { options, monthsLabels } from 'Alarms/components/AlarmInfoPanel/AlarmsBarChart/configChart';
import useUpdateVisibleMonths from 'Alarms/components/AlarmInfoPanel/AlarmsBarChart/hooks/useUpdateVisibleMonths';
import useGenerateChartData from 'Alarms/components/AlarmInfoPanel/AlarmsBarChart/hooks/useGenerateBarChartData';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AlarmsBarChart = ({alarmsData}) => {
   
  // setVisibleMonths to show avaible the months with data from alarmsData
  const {visibleMonths, toggleMonth} = useUpdateVisibleMonths({alarmsData, monthsLabels});    

  // setChartData based on visible months with alarmsData
  const chartData = useGenerateChartData({alarmsData, visibleMonths, monthsLabels});  

  return (
    <div className='h-full mt-2' data-testid='alarms-graph-by-month-container'>
      {alarmsData && alarmsData.length > 0 ? (
        <div className='h-full' data-testid='alarms-graph-content'>
          
          <MonthTogglePanel 
            monthsLabels={monthsLabels}             
            visibleMonths={visibleMonths}
            toggleMonth={toggleMonth}
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
