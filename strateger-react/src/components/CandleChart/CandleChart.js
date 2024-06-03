import React, { useEffect, useState, useRef } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import AnnotationsModule from 'highcharts/modules/annotations';
import { fetchData } from './fetchData';

AnnotationsModule(Highcharts);

const CandleStickChart = ({ initialInterval }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [interval, setInterval] = useState(initialInterval);
  const chartComponentRef = useRef(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchData(interval, setData, setError, setLoading);
    };

    loadData();
  }, [interval]);

  useEffect(() => {
    if (chartComponentRef.current && data.length) {
      const chart = chartComponentRef.current.chart;
      chart.removeAnnotation('custom-annotation'); // Remove existing annotation if any
      chart.addAnnotation({
        id: 'custom-annotation',
        labels: [{
          point: {
            xAxis: 0,
            yAxis: 0,
            x: Date.UTC(2024, 4, 31, 23, 0, 0),
            y: data.find(d => d[0] === Date.UTC(2024, 4, 31, 23, 0, 0))[4] // Close price at specific time
          },
          text: 'Annotation 1'
        }],
        labelOptions: {
          backgroundColor: 'rgba(255,255,255,0.5)',
          borderColor: 'gray',
          y: 40
        }
      });

      chart.addAnnotation({
        id: 'custom-annotation-2',
        labels: [{
          point: {
            xAxis: 0,
            yAxis: 0,
            x: Date.UTC(2024, 4, 31, 22, 0, 0),
            y: data.find(d => d[0] === Date.UTC(2024, 4, 31, 22, 0, 0))[4] // Close price at specific time
          },
          text: 'Annotation 2'
        }],
        labelOptions: {
          backgroundColor: 'rgba(255,255,255,0.5)',
          borderColor: 'gray',
          y: 40
        }
      });
    }
  }, [data]);

  const options = {
    chart: {
      type: 'candlestick',
      events: {
        load: function () {
          const chart = this;
          Highcharts.addEvent(chart.rangeSelector, 'buttonClick', function (event) {
            let newInterval;
            switch (event.button.text) {
              case '1m':
                newInterval = '1m';
                break;
              case '5m':
                newInterval = '5m';
                break;
              case '15m':
                newInterval = '15m';
                break;
              case '30m':
                newInterval = '30m';
                break;
              case '1h':
                newInterval = '1h';
                break;
              case '4h':
                newInterval = '4h';
                break;
              case 'Diario':
                newInterval = '1d';
                break;
              case 'Semanal':
                newInterval = '1w';
                break;
              case 'Mensual':
                newInterval = '1M';
                break;
              default:
                newInterval = '1h';
            }
            setInterval(newInterval);
          });
        }
      }
    },
    title: {
      text: 'Candlestick Chart with Annotations'
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
      lineColor: 'red', // Border color of the candles
      upLineColor: 'green', // Border color of bullish candles
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
    rangeSelector: {
      selected: 1,
      buttons: [
        {
          type: 'minute',
          count: 1,
          text: '1m'
        },
        {
          type: 'minute',
          count: 5,
          text: '5m'
        },
        {
          type: 'minute',
          count: 15,
          text: '15m'
        },
        {
          type: 'minute',
          count: 30,
          text: '30m'
        },
        {
          type: 'hour',
          count: 1,
          text: '1h'
        },
        {
          type: 'hour',
          count: 4,
          text: '4h'
        },
        {
          type: 'day',
          count: 1,
          text: 'Diario'
        },
        {
          type: 'week',
          count: 1,
          text: 'Semanal'
        },
        {
          type: 'month',
          count: 1,
          text: 'Mensual'
        }
      ]
    },
    tooltip: {
      split: true
    }
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={'stockChart'}
        options={options}
        ref={chartComponentRef}
      />
    </div>
  );
};

export default CandleStickChart;
