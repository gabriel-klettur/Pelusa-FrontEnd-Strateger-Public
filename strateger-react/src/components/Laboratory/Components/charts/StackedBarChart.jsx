// Path: src/components/StackedBarChart.jsx
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
      text: 'Cantidad de Transacciones por Mes y Tipo (Apiladas)',
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

// Función para obtener los datos del gráfico (ajusta con tus datos reales)
const getStackedBarData = () => {
  const labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  const datasets = [
    {
      label: 'Order Open Long',
      data: [500, 300, 400, 200, 600, 350, 400, 500, 600, 700, 800, 900], // Datos
      backgroundColor: 'rgb(255, 99, 132)',
    },
    {
      label: 'Order Close Long',
      data: [200, 100, 150, 250, 100, 400, 300, 200, 100, 50, 25, 10], // Más datos
      backgroundColor: 'rgb(75, 192, 192)',
    },
    {
      label: 'Indicator Open Long',
      data: [300, 400, 250, 300, 200, 500, 600, 700, 800, 900, 1000, 1100], // Más datos
      backgroundColor: 'rgb(53, 162, 235)',
    },
    {
      label: 'Indicator Close Long',
      data: [300, 400, 250, 300, 200, 500, 600, 700, 800, 900, 1000, 1100], // Más datos
      backgroundColor: 'rgb(255, 205, 86)',
    },
  ];

  return { labels, datasets };
};

const StackedBarChart = () => {
  const data = getStackedBarData();

  return <Bar options={options} data={data} />;
};

export default StackedBarChart;
