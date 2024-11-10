// Path: src/components/ChartEvents.jsx
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
import {
  Chart,
  getDatasetAtEvent,
  getElementAtEvent,
  getElementsAtEvent,
} from 'react-chartjs-2';

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

const ChartEvents = () => {
  const chartRef = useRef(null);

  const printDatasetAtEvent = (dataset) => {
    if (!dataset.length) return;
    const datasetIndex = dataset[0].datasetIndex;
    console.log(`Dataset seleccionado: ${data.datasets[datasetIndex].label}`);
  };

  const printElementAtEvent = (element) => {
    if (!element.length) return;
    const { datasetIndex, index } = element[0];
    console.log(`Etiqueta: ${data.labels[index]}, Valor: ${data.datasets[datasetIndex].data[index]}`);
  };

  const printElementsAtEvent = (elements) => {
    if (!elements.length) return;
    console.log(`Número de elementos seleccionados: ${elements.length}`);
  };

  const onClick = (event) => {
    const { current: chart } = chartRef;

    if (!chart) {
      return;
    }

    printDatasetAtEvent(getDatasetAtEvent(chart, event));
    printElementAtEvent(getElementAtEvent(chart, event));
    printElementsAtEvent(getElementsAtEvent(chart, event));
  };

  return (
    <Chart
      ref={chartRef}
      type="bar"
      onClick={onClick}
      options={options}
      data={data}
    />
  );
};

export default ChartEvents;
