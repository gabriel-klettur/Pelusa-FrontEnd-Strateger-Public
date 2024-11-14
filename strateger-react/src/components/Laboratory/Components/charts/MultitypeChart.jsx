// Path: src/components/MultitypeChart.jsx
import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);

const labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'];

const getMultitypeChartData = () => {
  return {
    labels,
    datasets: [
      {
        type: 'line',
        label: 'Transacciones Línea',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 2,
        fill: false,
        data: labels.map(() => Math.floor(Math.random() * 2000 - 1000)),
      },
      {
        type: 'bar',
        label: 'Transacciones Barra 1',
        backgroundColor: 'rgb(75, 192, 192)',
        data: labels.map(() => Math.floor(Math.random() * 2000 - 1000)),
        borderColor: 'white',
        borderWidth: 2,
      },
      {
        type: 'bar',
        label: 'Transacciones Barra 2',
        backgroundColor: 'rgb(53, 162, 235)',
        data: labels.map(() => Math.floor(Math.random() * 2000 - 1000)),
      },
    ],
  };
};

const MultitypeChart = () => {
  const data = getMultitypeChartData();

  return <Chart type="bar" data={data} />;
};

export default MultitypeChart;
