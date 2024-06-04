import React, { useEffect, useState, useRef } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import AnnotationsModule from 'highcharts/modules/annotations';
import { fetchData } from './fetchData';
import Toolbar from './Toolbar';
import { getAnnotations } from './annotations';
import RangeSelector from './RangeSelector';

AnnotationsModule(Highcharts);

const CandleStickChart = ({ initialTemporalidad, initialStartDate, initialEndDate, setStartDate, setEndDate, selectedAlarms = [] }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [interval, setInterval] = useState(initialTemporalidad);
  const [activeInterval, setActiveInterval] = useState(initialTemporalidad);
  const chartComponentRef = useRef(null);

  // Initialize the dates with the props received
  
  const [startDateState, setStartDateState] = useState(initialStartDate);
  const [endDateState, setEndDateState] = useState(initialEndDate);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      console.log('Fetching data... Interval:', interval, 'Start Date:', startDateState, 'End Date:', endDateState);
      await fetchData(interval, startDateState, endDateState, setData, setError, setLoading);
    };

    loadData();
  }, [interval, startDateState, endDateState]);

  const handleIntervalChange = (newInterval) => {
    console.log('Temporalidad Seleccionada:', newInterval);
    setActiveInterval(newInterval);
    setInterval(newInterval);
  };

  const handleStartDateChange = (newStartDate) => {
    console.log('Nueva Fecha de Inicio:', newStartDate);
    setStartDateState(newStartDate);
    setStartDate(newStartDate);  // Notify parent
  };

  const handleEndDateChange = (newEndDate) => {
    console.log('Nueva Fecha de Fin:', newEndDate);
    setEndDateState(newEndDate);
    setEndDate(newEndDate);  // Notify parent
  };

  // --------------------------------- Highcharts configuration ---------------------------

  const options = {
    chart: {
      type: 'candlestick',
    },
    navigator: {
      enabled: false
    },
    rangeSelector: RangeSelector({ setStartDate, setEndDate }),
    xAxis: {
      type: 'datetime',
      minRange: 2,  // Set the minimum range to 5 candles
    },
    yAxis: {
      title: {
        text: 'Price'
      },
      opposite: true
    },
    series: [{
      name: 'Candlestick',
      data: data,
      color: 'red',
      upColor: 'green',
      lineColor: 'red',
      upLineColor: 'green',
      tooltip: {
        valueDecimals: 2
      },
      dataGrouping: {
        enabled: false
      }
    }],
    plotOptions: {
      candlestick: {
        lineColor: 'black',
        upLineColor: 'black',
        color: 'red',
        upColor: 'green'
      }
    },
    tooltip: {
      split: true
    },
    annotations: getAnnotations(selectedAlarms).map(annotation => ({
      labels: [annotation]
    })),
    accessibility: {
      enabled: false
    }
  };

  return (
    <div className="p-4">
      <Toolbar
        activeInterval={activeInterval}
        onIntervalChange={handleIntervalChange}
        onStartDateChange={handleStartDateChange}
        onEndDateChange={handleEndDateChange}
      />
      <div className="relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
            <p className="text-lg font-bold">Loading...</p>
          </div>
        )}
        <HighchartsReact
          highcharts={Highcharts}
          constructorType={'stockChart'}
          options={options}
          ref={chartComponentRef}
        />
      </div>
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default CandleStickChart;
