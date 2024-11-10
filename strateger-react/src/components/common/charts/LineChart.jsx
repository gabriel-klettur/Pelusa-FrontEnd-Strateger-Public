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
      text: 'Evolución de Transacciones en el Tiempo',
    },
  },
};

// Función para obtener los datos del gráfico (ajusta con tus datos reales)
const getLineChartData = () => {
  const labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio']; // Etiquetas de los meses
  const datasets = [
    {
      label: 'Transacciones Tipo 1',
      data: [500, 600, 800, 700, 650, 720], // Reemplaza con valores reales
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Transacciones Tipo 2',
      data: [400, 300, 500, 450, 600, 550],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ];

  return { labels, datasets };
};

const LineChart = () => {
  const data = getLineChartData();

  return <Line options={options} data={data} />;
};

export default LineChart;
