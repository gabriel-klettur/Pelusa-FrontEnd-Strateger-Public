// Path: src/components/BubbleChart.jsx
import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bubble } from 'react-chartjs-2';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

export const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

// Función para generar datos de ejemplo para el gráfico de burbujas
const getBubbleChartData = () => {
  return {
    datasets: [
      {
        label: 'Dataset Rojo',
        data: Array.from({ length: 50 }, () => ({
          x: Math.floor(Math.random() * 200 - 100),
          y: Math.floor(Math.random() * 200 - 100),
          r: Math.floor(Math.random() * 15 + 5),
        })),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset Azul',
        data: Array.from({ length: 50 }, () => ({
          x: Math.floor(Math.random() * 200 - 100),
          y: Math.floor(Math.random() * 200 - 100),
          r: Math.floor(Math.random() * 15 + 5),
        })),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
};

const BubbleChart = () => {
  const data = getBubbleChartData();

  return <Bubble options={options} data={data} />;
};

export default BubbleChart;
