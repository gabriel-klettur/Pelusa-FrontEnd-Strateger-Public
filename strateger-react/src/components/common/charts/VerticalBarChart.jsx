// Path: src/components/TransactionBarChart.js
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
      text: 'Cantidad de Transacciones por Tipo y Mes',
    },
  },
  responsive: true,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const getTransactionData = () => {
  const labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'];
  const datasets = [
    {
      label: 'Order Open Long',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: 'rgb(255, 99, 132)',
      stack: 'Stack 0',
    },
    {
      label: 'Order Close Long',
      data: [2, 3, 20, 5, 1, 4],
      backgroundColor: 'rgb(75, 192, 192)',
      stack: 'Stack 0',
    },
    {
      label: 'Indicator Open Long',
      data: [3, 10, 13, 15, 22, 30],
      backgroundColor: 'rgb(53, 162, 235)',
      stack: 'Stack 1',
    },
  ];

  return { labels, datasets };
};

const VerticalBarChart = () => {
  const { labels, datasets } = getTransactionData();

  return <Bar options={options} data={{ labels, datasets }} />;
};

export default VerticalBarChart;
