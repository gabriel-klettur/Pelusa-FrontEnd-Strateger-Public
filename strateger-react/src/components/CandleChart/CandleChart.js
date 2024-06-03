import React, { useEffect, useState, useRef } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import AnnotationsModule from 'highcharts/modules/annotations';
import { fetchData } from './fetchData';
import Toolbar from './Toolbar'; // Importa el componente Toolbar
import RangeSelector from './RangeSelector'; // Importa el componente RangeSelector

AnnotationsModule(Highcharts);

const CandleStickChart = ({ initialTemporalidad, initialStartDate, initialEndDate, setStartDate, setEndDate, selectedAlarms = [] }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [interval, setInterval] = useState(initialTemporalidad);
  const [activeInterval, setActiveInterval] = useState(initialTemporalidad);

  // Initialize the dates with the props received
  const [startDateState] = useState(initialStartDate);
  const [endDateState] = useState(initialEndDate);
  
  const chartComponentRef = useRef(null);

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

  const getAnnotations = () => {
    return selectedAlarms.map(alarm => {
      const time = new Date(alarm.Time_Alert).getTime();
      const price = alarm.Entry_Price_Alert || alarm.Exit_Price_Alert;

      console.log(`Alarm time: ${time}, Alarm price: ${price}`); // Consola para verificar

      return {
        point: { x: time, y: price },
        text: 'A',
        backgroundColor: 'yellow',
        borderColor: 'black',
        borderRadius: 3,
        borderWidth: 1
      };
    });
  };

  const options = {
    chart: {
      type: 'candlestick',
    },
    navigator: {
      enabled: false // Disable the navigator
    },
    rangeSelector: RangeSelector({ setStartDate, setEndDate }), // Usa el componente RangeSelector
    title: {
      text: 'Candlestick Chart'
    },
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
      color: 'red', // Color for bearish candles
      upColor: 'green', // Color for bullish candles
      lineColor: 'red', // Border color for bearish candles
      upLineColor: 'green', // Border color for bullish candles
      tooltip: {
        valueDecimals: 2
      },
      dataGrouping: {
        enabled: false // Disable data grouping
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
      split: true // Split tooltip into multiple boxes, one for each series
    },
    annotations: [{
      labels: getAnnotations()
    }]
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
