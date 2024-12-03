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
  
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);
  
const getRadarChartData = (alarmsByHour) => {

    console.log('alarmsByHour:',alarmsByHour);

    const timeLabels = ['00:00-01:00', '01:00-02:00', '02:00-03:00', '03:00-04:00', 
                        '04:00-05:00', '05:00-06:00', '06:00-07:00', '07:00-08:00',
                        '08:00-09:00', '09:00-10:00', '10:00-11:00', '11:00-12:00', 
                        '12:00-13:00', '13:00-14:00', '14:00-15:00', '15:00-16:00',
                        '16:00-17:00', '17:00-18:00', '18:00-19:00', '19:00-20:00',
                        '20:00-21:00', '21:00-22:00', '22:00-23:00', '23:00-00:00']

    console.log('timeLabels.length:',timeLabels.length);
    console.log('alarmsByHour.length:',alarmsByHour.length);

    console.log('-----------------------------------------------------')

    for(let i=0; i<24 ; i++){
        console.log('i:',i);
        console.log('alarmsByHour[i]:',alarmsByHour[i]);
        console.log('timeLabels[i]:',timeLabels[i]);
    }

    return {
      labels: timeLabels,
      datasets: [
        {
          label: 'Distribución de Métricas',
          data: alarmsByHour, 
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    };
};


const ChartAlarmsByTime = ({alarmsByHour}) => {    

    const data = getRadarChartData(alarmsByHour);
    return <Radar data={data} options={radarOptions}/>;
}

export default ChartAlarmsByTime;




  
  
  

  

  
  