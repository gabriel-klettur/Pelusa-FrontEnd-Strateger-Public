// Path: src/components/MultiaxisLineChart.jsx
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: 'Comparación de Transacciones y Volumen (Multi Eje)',
    },
  },
  scales: {
    y: {
      type: 'linear',
      display: true,
      position: 'left',
    },
    y1: {
      type: 'linear',
      display: true,
      position: 'right',
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

// Función para obtener los datos del gráfico (ajusta con tus datos reales)
const getMultiaxisLineData = () => {
  const labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio']; // Etiquetas de los meses

  const datasets = [
    {
      label: 'Cantidad de Transacciones',
      data: [500, 600, 800, 700, 650, 720], // Reemplaza estos datos con valores reales
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      yAxisID: 'y',
    },
    {
      label: 'Volumen de Transacciones',
      data: [2000, 1800, 2200, 2100, 1900, 2300],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      yAxisID: 'y1',
    },
  ];

  return { labels, datasets };
};

const MultiaxisLineChart = () => {
  const data = getMultiaxisLineData();

  return <Line options={options} data={data} />;
};

export default MultiaxisLineChart;
