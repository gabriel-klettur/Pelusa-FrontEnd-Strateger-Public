import { useEffect } from 'react';

import { getColorForInterval } from '../utils/initChart';

const useGenerateChartData = ({alarmsData, visibleMonths, setChartData, allLabels}) => {

    useEffect(() => {

        const createBarChartElements = (visibleMonths, alarmsData) => {
            const labels = allLabels.filter((_, index) => visibleMonths[index]);
          
            const intervalCounts = {
              '5m': Array(12).fill(0),
              '15m': Array(12).fill(0),
              '30m': Array(12).fill(0),
              '1h': Array(12).fill(0),
              '4h': Array(12).fill(0),
              'D': Array(12).fill(0),
              'W': Array(12).fill(0),
              'M': Array(12).fill(0),
            };
          
            alarmsData.forEach(alarm => {  
              if (!alarm || !alarm.Time_Alert || !alarm.Interval) return; // Validación de alarmas inválidas
              
              const month = new Date(alarm.Time_Alert).getMonth();
              const interval = alarm.Interval;
            
              if (intervalCounts[interval]) {
                intervalCounts[interval][month] += 1;
              }
            });
          
            const datasets = Object.keys(intervalCounts).map((interval, index) => ({
              label: interval,
              data: intervalCounts[interval].filter((_, idx) => visibleMonths[idx]),
              backgroundColor: getColorForInterval(interval),
              stack: `Stack ${index}`,
            }));
          
            return { labels, datasets };
        };

        if (alarmsData && alarmsData.length > 0) {
          const newChartData = createBarChartElements(visibleMonths, alarmsData);
          setChartData(newChartData);
        }
    }, [alarmsData, allLabels, setChartData, visibleMonths]);
}

export default useGenerateChartData;