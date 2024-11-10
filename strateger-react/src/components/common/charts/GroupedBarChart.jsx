// Path: src/components/GroupedBarChart.jsx
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
  plugins: {
    title: {
      display: true,
      text: 'Cantidad de Transacciones por Mes y Tipo (Agrupadas)',
    },
  },
  responsive: true,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  scales: {
    x: {
      stacked: false, // Configuración para barras agrupadas (no apiladas)
    },
    y: {
      stacked: false,
    },
  },
};

// Función para obtener los datos del gráfico (ajusta con tus datos reales)
const getGroupedBarData = () => {
  const labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio']; // Etiquetas de los meses

  const datasets = [
    {
      label: 'Order Open Long',
      data: [500, 300, 400, 200, 600, 350], // Reemplaza estos datos con los valores reales
      backgroundColor: 'rgb(255, 99, 132)',
      stack: 'Stack 0',
    },
    {
      label: 'Order Close Long',
      data: [200, 100, 150, 250, 100, 400],
      backgroundColor: 'rgb(75, 192, 192)',
      stack: 'Stack 0',
    },
    {
      label: 'Indicator Open Long',
      data: [300, 400, 250, 300, 200, 500],
      backgroundColor: 'rgb(53, 162, 235)',
      stack: 'Stack 1',
    },
  ];

  return { labels, datasets };
};

const GroupedBarChart = () => {
  const data = getGroupedBarData();

  return <Bar options={options} data={data} />;
};

export default GroupedBarChart;
