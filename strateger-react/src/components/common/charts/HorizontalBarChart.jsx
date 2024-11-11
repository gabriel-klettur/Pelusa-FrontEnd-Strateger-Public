// Path: src/components/TransactionHorizontalBarChart.jsx
import React from 'react';
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
  indexAxis: 'y', // Configuración para barras horizontales
  elements: {
    bar: {
      borderWidth: 4,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'BTC Alarms per Year',
    },
  },
};

// Función para obtener los datos del gráfico (ajusta con tus datos reales)
const getHorizontalBarData = (labeltext, labelData, seriesData) => {
  const labels = labelData; // Etiquetas de ejemplo
  const datasets = [
    {
      label: labeltext,
      data: seriesData, 
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
    },
  ];

  return { labels, datasets };
};

const HorizontalBarChart = () => {

  const labeltext = 'Amout of Alarms';
  const labelData = ['5m', '15m', '30m', '1h', '4h', 'D', 'W', 'M'];
  const seriesData = [72, 55, 40, 33, 20, 18, 5, 2];

  const data = getHorizontalBarData(labeltext, labelData, seriesData);

  return <Bar options={options} data={data} />;
};

export default HorizontalBarChart;
