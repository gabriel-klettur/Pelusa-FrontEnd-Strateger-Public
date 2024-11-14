// Path: src/components/PolarAreaChart.jsx
import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

// Datos de ejemplo para el gráfico (ajusta con tus datos reales)
const getPolarAreaChartData = () => {
  return {
    labels: ['Order Open Long', 'Order Close Long', 'Indicator Open Long', 'Indicator Close Long'],
    datasets: [
      {
        label: 'Distribución de Transacciones',
        data: [30, 20, 15, 35], // Reemplaza con datos reales
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
        ],
        borderWidth: 1,
      },
    ],
  };
};

const PolarAreaChart = () => {
  const data = getPolarAreaChartData();

  return <PolarArea data={data} />;
};

export default PolarAreaChart;
