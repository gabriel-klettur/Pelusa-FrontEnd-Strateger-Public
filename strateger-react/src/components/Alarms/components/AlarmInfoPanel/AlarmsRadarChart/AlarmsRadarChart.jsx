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

import  getRadarChartData from './getRadarChartData';
import { selectActiveRadarDataset } from '../../../../../redux/interaction';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const AlarmsRadarChart = ({ alarmsByHour, alarmsByHourFilteredByClick, alarmsByHourFilteredByOptions }) => {
  const activeDataset = useSelector(selectActiveRadarDataset);

  return (
    <div className="h-full w-full flex justify-center items-center" data-testid="alarms-graph-container">
      <div style={{ height: "475px" }} className='w-full mt-8' data-testid="alarms-graph-radar">
        <Radar 
          data={getRadarChartData(activeDataset, alarmsByHour, alarmsByHourFilteredByClick, alarmsByHourFilteredByOptions)} 
          options={radarOptions}  
          aria-label="radar-chart"         
        />
      </div>
    </div>
  );
};

export default AlarmsRadarChart;