// Path: src/components/GetChartRef.jsx
import React, { useRef } from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(LinearScale, CategoryScale, BarElement, PointElement, LineElement, Legend, Tooltip);

export const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'];

const data = {
  labels,
  datasets: [
    {
      type: 'line',
      label: 'Dataset Línea',
      borderColor: 'rgb(255, 99, 132)',
      borderWidth: 2,
      fill: false,
      data: labels.map(() => Math.floor(Math.random() * 2000 - 1000)),
    },
    {
      type: 'bar',
      label: 'Dataset Barra 1',
      backgroundColor: 'rgb(75, 192, 192)',
      data: labels.map(() => Math.floor(Math.random() * 2000 - 1000)),
      borderColor: 'white',
      borderWidth: 2,
    },
    {
      type: 'bar',
      label: 'Dataset Barra 2',
      backgroundColor: 'rgb(53, 162, 235)',
      data: labels.map(() => Math.floor(Math.random() * 2000 - 1000)),
    },
  ],
};

const GetChartRef = () => {
  const chartRef = useRef(null);

  const handlePrintChartInfo = () => {
    const chart = chartRef.current;

    if (!chart) return;

    console.log('Información del gráfico:', {
      datasets: chart.data.datasets.map(ds => ds.label),
      labels: chart.data.labels,
    });
  };

  return (
    <div>
      <Chart ref={chartRef} type="bar" options={options} data={data} />
      <button onClick={handlePrintChartInfo}>Imprimir Información del Gráfico</button>
    </div>
  );
};

export default GetChartRef;
