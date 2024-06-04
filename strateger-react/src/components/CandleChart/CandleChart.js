//Path: strateger-react/src/components/CandleChart/CandleChart.js

import React, { useEffect, useState, useRef } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import AnnotationsModule from 'highcharts/modules/annotations';
import { fetchData } from './fetchData';
import Toolbar from './Toolbar';
import RangeSelector from './RangeSelector';
import { getAnnotations } from './annotations';

AnnotationsModule(Highcharts);

const CandleStickChart = ({ initialTemporalidad, initialStartDate, initialEndDate, setStartDate, setEndDate, selectedAlarms = [] }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [interval, setInterval] = useState(initialTemporalidad);
  const [activeInterval, setActiveInterval] = useState(initialTemporalidad);
  const chartComponentRef = useRef(null);

  // Initialize the dates with the props received
  const [startDateState] = useState(initialStartDate);
  const [endDateState] = useState(initialEndDate);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchData(interval, startDateState, endDateState, setData, setError, setLoading);
    };

    loadData();
  }, [interval, startDateState, endDateState]);

  const handleIntervalChange = (newInterval) => {
    console.log('Interval selected:', newInterval);
    setActiveInterval(newInterval);
    setInterval(newInterval);
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
      <Toolbar activeInterval={activeInterval} onIntervalChange={handleIntervalChange} />
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
