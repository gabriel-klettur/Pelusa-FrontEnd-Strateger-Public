// Path: src/components/TransactionBarChart.js
import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  plugins: {
    title: {
      display: true,
      text: 'Cantidad de Transacciones por Tipo y Mes',
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

const getTransactionData = (visibleMonths) => {
  const allLabels = [
    'Januar', 'February', 'March', 'Abril', 'May', 'Jun', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const labels = allLabels.filter((month, index) => visibleMonths[index]); // Filtra los meses visibles

  const datasets = [
    {
      label: '1m',
      data: [0, 19, 3, 5, 2, 3, 10, 13, 15, 22, 30, 45].filter((_, index) => visibleMonths[index]),
      backgroundColor: 'rgb(255, 99, 132)',
      stack: 'Stack 0',
    },
    {
      label: '5m',
      data: [0, 3, 20, 5, 1, 4, 15, 22, 30, 45, 60, 70].filter((_, index) => visibleMonths[index]),
      backgroundColor: 'rgb(75, 192, 192)',
      stack: 'Stack 1',
    },
    {
      label: '15m',
      data: [0, 10, 13, 15, 22, 30, 45, 60, 70, 80, 90, 100].filter((_, index) => visibleMonths[index]),
      backgroundColor: 'rgb(53, 162, 235)',
      stack: 'Stack 2',
    },
    {
      label: '30m',
      data: [0, 10, 13, 15, 22, 30, 45, 60, 70, 80, 90, 100].filter((_, index) => visibleMonths[index]),
      backgroundColor: 'orange',
      stack: 'Stack 3',
    },
    {
      label: '1h',
      data: [0, 10, 13, 15, 22, 30, 45, 60, 70, 80, 90, 100].filter((_, index) => visibleMonths[index]),
      backgroundColor: 'rgb(255, 205, 86)',
      stack: 'Stack 4',
    },
    {
      label: '4h',
      data: [0, 10, 13, 15, 22, 30, 45, 60, 70, 80, 90, 100].filter((_, index) => visibleMonths[index]),
      backgroundColor: 'rgb(255, 159, 64)',
      stack: 'Stack 5',
    },
    {
      label: 'D',
      data: [0, 10, 13, 15, 22, 30, 45, 60, 70, 80, 90, 100].filter((_, index) => visibleMonths[index]),
      backgroundColor: 'rgb(75, 192, 192)',
      stack: 'Stack 6',
    },
    {
      label: 'W',
      data: [0, 10, 13, 15, 22, 30, 45, 60, 70, 80, 90, 100].filter((_, index) => visibleMonths[index]),
      backgroundColor: 'rgb(75, 192, 192)',
      stack: 'Stack 7',
    },
    {
      label: 'M',
      data: [0, 10, 13, 15, 22, 30, 45, 60, 70, 80, 90, 100].filter((_, index) => visibleMonths[index]),
      backgroundColor: 'rgb(75, 192, 192)',
      stack: 'Stack 8',
    }
  ];

  return { labels, datasets };
};

const VerticalBarChart = () => {
  const [visibleMonths, setVisibleMonths] = useState(Array(12).fill(true)); // Estado de visibilidad de cada mes

  const toggleMonth = (index) => {
    const newVisibleMonths = [...visibleMonths];
    newVisibleMonths[index] = !newVisibleMonths[index]; // Cambia la visibilidad del mes
    setVisibleMonths(newVisibleMonths);
  };

  const { labels, datasets } = getTransactionData(visibleMonths);

  return (
    <div>
      <div className="flex space-x-2 mb-4 justify-center text-sm">
        {['Januar', 'February', 'March', 'Abril', 'May', 'Jun', 'July', 'August', 'September', 'October', 'November', 'December'].map((month, index) => (
          <button
            key={month}
            onClick={() => toggleMonth(index)}
            className={`px-2 py-1 border ${visibleMonths[index] ? 'bg-purple-900' : 'bg-purple-500'}`}
          >
            {month}
          </button>
        ))}
      </div>
      <Bar options={options} data={{ labels, datasets }} />
    </div>
  );
};

export default VerticalBarChart;
