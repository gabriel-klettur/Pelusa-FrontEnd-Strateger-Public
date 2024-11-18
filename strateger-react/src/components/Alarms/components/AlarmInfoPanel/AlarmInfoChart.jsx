import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { selectAlarmsData } from '../../../../redux/alarm';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  plugins: {
    title: {
      display: true,
      text: 'Alarms catched by Month and Interval',
    },
  },
  responsive: true,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const allLabels = [
  'Januar', 'February', 'March', 'Abril', 'May', 'Jun', 
  'July', 'August', 'September', 'October', 'November', 'December'
];

const organizeIntervalCountsByMonth = (intervalCounts) => {
  const organizedData = Array(12).fill(null).map((_, index) => ({
    month: allLabels[index],
  }));

  Object.keys(intervalCounts).forEach(interval => {
    intervalCounts[interval].forEach((count, monthIndex) => {
      organizedData[monthIndex][interval] = count;
    });
  });

  return organizedData;
};

const detectMonthsWithAlarms = (organizedDataByMonth) => {
  return organizedDataByMonth.map(monthData => 
    Object.keys(monthData).some(key => key !== 'month' && monthData[key] > 0)
  );
};

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
    const month = new Date(alarm.Time_Alert).getMonth();
    const interval = alarm.Temporalidad;

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

const getColorForInterval = (interval) => {
  const colors = {
    '5m': 'rgb(102, 153, 255)',     // Azul claro
    '15m': 'rgb(255, 153, 102)',    // Naranja claro
    '30m': 'rgb(102, 255, 178)',    // Verde claro
    '1h': 'rgb(255, 102, 102)',     // Rojo claro
    '4h': 'rgb(255, 178, 102)',     // Amarillo anaranjado
    'D': 'rgb(153, 102, 255)',      // Violeta claro
    'W': 'rgb(255, 255, 102)',      // Amarillo pastel
    'M': 'rgb(153, 204, 255)',      // Azul pastel
  };
  return colors[interval] || 'gray';
};

const AlarmInfoChart = () => {
  const [visibleMonths, setVisibleMonths] = useState(Array(12).fill(false));
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const alarmsData = useSelector(selectAlarmsData);

  const toggleMonth = (index) => {
    const newVisibleMonths = [...visibleMonths];
    newVisibleMonths[index] = !newVisibleMonths[index];
    setVisibleMonths(newVisibleMonths);
  };

  // useEffect para actualizar visibleMonths solo cuando alarmsData cambia
  useEffect(() => {
    if (alarmsData && alarmsData.length > 0) {
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
        const month = new Date(alarm.Time_Alert).getMonth();
        const interval = alarm.Temporalidad;

        if (intervalCounts[interval]) {
          intervalCounts[interval][month] += 1;
        }
      });

      const organizedDataByMonth = organizeIntervalCountsByMonth(intervalCounts);
      const monthsWithAlarms = detectMonthsWithAlarms(organizedDataByMonth);

      setVisibleMonths(monthsWithAlarms);
    }
  }, [alarmsData]);

  // useEffect para generar chartData cuando visibleMonths cambie
  useEffect(() => {
    if (alarmsData && alarmsData.length > 0) {
      const newChartData = createBarChartElements(visibleMonths, alarmsData);
      setChartData(newChartData);
    }
  }, [visibleMonths, alarmsData]);

  const MonthToggleButtons = () => {
    return (
      <div className="grid grid-cols-6 gap-2 justify-center text-sm rounded-sm">
        {allLabels.map((month, index) => (
          <button
            key={month}
            onClick={() => toggleMonth(index)}
            className={`px-2 py-1 h-10 flex items-center justify-center rounded-sm text-african_violet-900 ${
              visibleMonths[index] ? 'bg-african_violet-300' : 'bg-african_violet-500'
            }`}
          >
            {month}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className='bg-african_violet-200 p-2'>
      {alarmsData && alarmsData.length > 0 ? (
        <>
          <MonthToggleButtons />
          <Bar options={options} data={chartData} />
        </>
      ) : (
        <p>Loading chart data...</p>
      )}
    </div>
  );
};

export default AlarmInfoChart;
