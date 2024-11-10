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
  const labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio']; // Etiquetas de los meses

  const datasets = [
    {
      label: 'Order Open Long',
      data: [500, 300, 400, 200, 600, 350], // Reemplaza estos datos con los valores reales de cada mes
      backgroundColor: 'rgb(255, 99, 132)',
    },
    {
      label: 'Order Close Long',
      data: [200, 100, 150, 250, 100, 400], // Datos reales para otro tipo de transacción
      backgroundColor: 'rgb(75, 192, 192)',
    },
    {
      label: 'Indicator Open Long',
      data: [300, 400, 250, 300, 200, 500], // Más datos de ejemplo
      backgroundColor: 'rgb(53, 162, 235)',
    },
  ];

  return { labels, datasets };
};

const StackedBarChart = () => {
  const data = getStackedBarData();

  return <Bar options={options} data={data} />;
};

export default StackedBarChart;
