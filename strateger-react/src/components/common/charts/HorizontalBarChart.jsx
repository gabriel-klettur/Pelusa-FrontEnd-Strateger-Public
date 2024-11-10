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
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Transacciones por Tipo',
    },
  },
};

// Función para obtener los datos del gráfico (ajusta con tus datos reales)
const getHorizontalBarData = () => {
  const labels = ['Order Open Long', 'Order Close Long', 'Indicator Open Long']; // Etiquetas de ejemplo
  const datasets = [
    {
      label: 'Cantidad de Transacciones',
      data: [50, 30, 20], // Reemplaza estos datos con la cantidad real de transacciones por tipo
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
    },
  ];

  return { labels, datasets };
};

const HorizontalBarChart = () => {
  const data = getHorizontalBarData();

  return <Bar options={options} data={data} />;
};

export default HorizontalBarChart;
