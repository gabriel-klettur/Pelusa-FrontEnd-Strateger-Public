//Path: strateger-react/src/components/Alarms/components/AlarmInfoPanel/AlarmsGraphByMonth/AlarmsGraphByMonth.jsx

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { selectAlarmsData } from '../../../../../redux/alarm';
import MonthTogglePanel from './components/MonthTogglePanel';
import { options } from './utils/initChart';
import useUpdateVisibleMonths from './hooks/useUpdateVisibleMonths';
import useGenerateChartData from './hooks/useGenerateChartData';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const allLabels = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const AlarmsGraphByMonth = () => {
  
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });  
  const [visibleMonths, setVisibleMonths] = useState(Array(12).fill(false));
  const alarmsData = useSelector(selectAlarmsData);

  useUpdateVisibleMonths({alarmsData, setVisibleMonths, allLabels});    
  useGenerateChartData({alarmsData, visibleMonths, setChartData, allLabels});  

  return (
    <div className='h-full mt-2' data-testid='alarms-graph-by-month-container'>
      {alarmsData && alarmsData.length > 0 ? (
        <div className='h-full' data-testid='alarms-graph-content'>
          
          <MonthTogglePanel 
            allLabels={allLabels}             
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

export default AlarmsGraphByMonth;
