// Path: src/components/ScatterChart.jsx
import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

export const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

// Función para obtener los datos del gráfico de dispersión (ajusta con tus datos reales)
const getScatterChartData = () => {
  return {
    datasets: [
      {
        label: 'Relación de Variables',
        data: Array.from({ length: 100 }, () => ({
          x: Math.floor(Math.random() * 200 - 100), // Reemplaza con valores reales
          y: Math.floor(Math.random() * 200 - 100),
        })),
        backgroundColor: 'rgba(255, 99, 132, 1)',
      },
    ],
  };
};

const ScatterChart = () => {
  const data = getScatterChartData();

  return <Scatter options={options} data={data} />;
};

export default ScatterChart;
