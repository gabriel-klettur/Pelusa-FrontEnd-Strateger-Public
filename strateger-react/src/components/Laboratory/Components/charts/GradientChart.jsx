// Path: src/components/GradientChart.jsx
import React, { useRef, useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'];
const colors = ['red', 'orange', 'yellow', 'lime', 'green', 'teal', 'blue', 'purple'];

const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => Math.floor(Math.random() * 2000 - 1000)),
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => Math.floor(Math.random() * 2000 - 1000)),
    },
    {
      label: 'Dataset 3',
      data: labels.map(() => Math.floor(Math.random() * 2000 - 1000)),
    },
  ],
};

function createGradient(ctx, area) {
  const colorStart = colors[Math.floor(Math.random() * colors.length)];
  const colorMid = colors.filter(color => color !== colorStart)[Math.floor(Math.random() * (colors.length - 1))];
  const colorEnd = colors.filter(color => color !== colorStart && color !== colorMid)[Math.floor(Math.random() * (colors.length - 2))];

  const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);

  gradient.addColorStop(0, colorStart);
  gradient.addColorStop(0.5, colorMid);
  gradient.addColorStop(1, colorEnd);

  return gradient;
}

const GradientChart = () => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({ datasets: [] });

  useEffect(() => {
    const chart = chartRef.current;

    if (!chart) return;

    const updatedData = {
      ...data,
      datasets: data.datasets.map(dataset => ({
        ...dataset,
        borderColor: createGradient(chart.ctx, chart.chartArea),
        backgroundColor: createGradient(chart.ctx, chart.chartArea),
      })),
    };

    setChartData(updatedData);
  }, []);

  return <Chart ref={chartRef} type="line" data={chartData} options={{ responsive: true }} />;
};

export default GradientChart;
