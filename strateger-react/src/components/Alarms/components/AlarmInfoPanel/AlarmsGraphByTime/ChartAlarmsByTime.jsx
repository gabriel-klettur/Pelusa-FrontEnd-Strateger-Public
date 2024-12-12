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
import { radarOptions } from './utils/configChart';
import { useSelector } from 'react-redux';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const AlarmsGraphByTime = ({ alarmsByHour, alarmsByHourFilteredByClick, alarmsByHourFilteredByOptions }) => {
  const activeDataset = useSelector((state) => state.interaction.activeRadarDataset);

  const getRadarChartData = () => {
    const datasets = {
      alarms: {
        label: 'All Alarms',
        data: alarmsByHour,
        backgroundColor: 'rgba(255, 205, 86, 0.4)',
        borderColor: 'rgba(255, 205, 86, 1)',
      },
      selected: {
        label: 'Selected Alarms',
        data: alarmsByHourFilteredByClick,
        backgroundColor: 'rgba(75, 192, 192, 0.4)',
        borderColor: 'rgba(75, 192, 192, 1)',
      },
      filtered: {
        label: 'Filtered Alarms',
        data: alarmsByHourFilteredByOptions,
        backgroundColor: 'rgba(54, 162, 235, 0.4)',
        borderColor: 'rgba(54, 162, 235, 1)',
      },
    };

    return {
      labels: [
        '00:00-01:00', '01:00-02:00', '02:00-03:00', 
        '03:00-04:00', '04:00-05:00', '05:00-06:00', 
        '06:00-07:00', '07:00-08:00', '08:00-09:00',
        // Continúan las horas hasta 23:00-00:00
      ],
      datasets: [datasets[activeDataset]],
    };
  };

  return (
    <div className="h-full w-full flex justify-center items-center" data-testid="alarms-graph-container">
      <div style={{ height: "475px" }} className='w-full mt-8' data-testid="alarms-graph-radar">
        <Radar 
          data={getRadarChartData()} 
          options={radarOptions}  
          aria-label="radar-chart"         
        />
      </div>
    </div>
  );
};

export default AlarmsGraphByTime;
