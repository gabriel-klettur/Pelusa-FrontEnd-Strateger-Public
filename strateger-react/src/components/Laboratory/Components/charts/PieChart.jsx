// Path: src/components/TransactionPieChart.js
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

// Función para generar los datos (reemplaza con datos reales)
const getPieChartData = () => {
  return {
    labels: ['Order Open Long', 'Order Close Long', 'Indicator Open Long'], // Reemplaza con etiquetas de tipos de transacción reales
    datasets: [
      {
        label: 'Transacciones por Tipo',
        data: [40, 30, 20], // Reemplaza estos datos con la cantidad real de transacciones por tipo
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
};

const PieChart = () => {
  const data = getPieChartData();

  return <Pie data={data} />;
};

export default PieChart;
