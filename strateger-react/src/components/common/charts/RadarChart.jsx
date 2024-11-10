// Path: src/components/RadarChart.jsx
import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

// Datos de ejemplo para el gráfico (ajusta con tus datos reales)
const getRadarChartData = () => {
  return {
    labels: ['Metric 1', 'Metric 2', 'Metric 3', 'Metric 4', 'Metric 5', 'Metric 6'],
    datasets: [
      {
        label: 'Distribución de Métricas',
        data: [2, 9, 3, 5, 2, 3], // Reemplaza estos valores con datos reales
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };
};

const RadarChart = () => {
  const data = getRadarChartData();

  return <Radar data={data} />;
};

export default RadarChart;
