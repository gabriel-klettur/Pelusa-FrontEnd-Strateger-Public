// Path: src/components/DoughnutChart.jsx
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

// Datos de ejemplo para el gráfico (ajusta con tus datos reales)
const getDoughnutChartData = () => {
  return {
    labels: ['Order Open Long', 'Order Close Long', 'Indicator Open Long', 'Indicator Close Long'],
    datasets: [
      {
        label: 'Distribución de Transacciones',
        data: [30, 20, 15, 35], // Reemplaza con datos reales
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
};

const DoughnutChart = () => {
  const data = getDoughnutChartData();

  return <Doughnut data={data} />;
};

export default DoughnutChart;
