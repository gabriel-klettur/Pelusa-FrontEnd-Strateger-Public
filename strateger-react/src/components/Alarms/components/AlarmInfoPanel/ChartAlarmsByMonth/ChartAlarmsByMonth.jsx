//Path: src/components/Alarms/components/AlarmInfoPanel/AlarmInfoChart.jsx

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { selectAlarmsData } from '../../../../../redux/alarm';
import MonthTogglePanel from './MonthTogglePanel';
import { options } from './utils/initChart';
import useUpdateVisibleMonths from './hooks/useUpdateVisibleMonths';
import useGenerateChartData from './hooks/useGenerateChartData';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const allLabels = [
  'Januar', 'February', 'March', 'Abril', 'May', 'Jun', 
  'July', 'August', 'September', 'October', 'November', 'December'
];

const ChartAlarmsByMonth = () => {
  
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });  
  const [visibleMonths, setVisibleMonths] = useState(Array(12).fill(false));
  const alarmsData = useSelector(selectAlarmsData);

  useUpdateVisibleMonths({alarmsData, setVisibleMonths, allLabels});    
  useGenerateChartData({alarmsData, visibleMonths, setChartData, allLabels});  

  return (
    <div className='h-full'>
      {alarmsData && alarmsData.length > 0 ? (
        <div className='h-full'>
          
          <MonthTogglePanel 
            allLabels={allLabels}             
            visibleMonths={visibleMonths}
            setVisibleMonths={setVisibleMonths}
          />

          <div style={{ height: "475px" }}>
            <Bar               
              options={options} 
              data={chartData}                 
            />
          </div>
        </div>
      ) : (
        <p>Loading chart data...</p>
      )}
    </div>
  );
};

export default ChartAlarmsByMonth;
