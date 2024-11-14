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
    labels: ['1m','5m', '15m', '30m', '1h', '4h', '1d', '1w', '1M', '1y'],
    datasets: [
      {
        label: 'Distribución de Métricas',
        data: [124, 93, 74, 55, 33, 20, 10, 4, 2, 1], // Reemplaza con datos reales
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
