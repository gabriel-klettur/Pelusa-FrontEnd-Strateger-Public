// Path: src/components/LineChart.jsx
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Evolución en Dolares de Cantidades de Activos',
    },
  },
};

// Función para obtener los datos del gráfico (ajusta con tus datos reales)
const getLineChartData = () => {
  const labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const datasets = [
    {
      label: 'BTC',
      data: [500, 600, 800, 700, 650, 720, 750, 800, 900, 1000, 1100, 1200],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'ETH',
      data: [400, 300, 500, 450, 600, 550, 700, 850, 900, 950, 1000, 0],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
      label: 'USDT',
      data: [1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000, 2100],
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
    },
  ];

  return { labels, datasets };
};

const LineChart = () => {
  const data = getLineChartData();

  return <Line options={options} data={data} />;
};

export default LineChart;
