import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { radarOptions } from './configChart';
import { useSelector } from 'react-redux';

import useGenerateRadarChartData from './hooks/useGenerateRadarChartData';
import { selectActiveRadarDataset } from '../../../../../redux/interaction';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const AlarmsRadarChart = ({ alarmsByHour, alarmsByHourFilteredByClick, alarmsByHourFilteredByOptions }) => {
  const activeDataset = useSelector(selectActiveRadarDataset);
  
  const chartData = useGenerateRadarChartData(activeDataset, alarmsByHour, alarmsByHourFilteredByClick, alarmsByHourFilteredByOptions);

  return (
    <div className="h-full w-full flex justify-center items-center" data-testid="alarms-graph-container">
      <div style={{ height: "475px" }} className='w-full mt-8' data-testid="alarms-graph-radar">
        <Radar 
          data={chartData} 
          options={radarOptions}  
          aria-label="radar-chart"         
        />
      </div>
    </div>
  );
};

export default AlarmsRadarChart;
