//Path: strateger-react/src/components/CandleChart/CandleChart.js

import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { useDispatch, useSelector } from 'react-redux';
import Toolbar from './Toolbar';
import RangeSelector from './RangeSelector';
import { fetchChartData, setChartParameters } from '../../slices/chartSlice';
import { getFlags } from './flags';

const CandleStickChart = ({ initialTemporalidad, initialStartDate, initialEndDate }) => {
  const dispatch = useDispatch();
  const chartState = useSelector((state) => state.chart);
  const selectedAlarms = useSelector((state) => state.alarms.selectedAlarms);

  const [interval, setInterval] = useState(initialTemporalidad);
  const [activeInterval, setActiveInterval] = useState(initialTemporalidad);
  const chartComponentRef = useRef(null);

  const [toolbarStartDate, setToolbarStartDate] = useState(new Date(initialStartDate));
  const [toolbarEndDate, setToolbarEndDate] = useState(new Date(initialEndDate));
  
  const tempStartDateRef = useRef(initialStartDate);
  const tempEndDateRef = useRef(initialEndDate);

  useEffect(() => {
    if (chartState.startDate && chartState.endDate) {
      setToolbarStartDate(new Date(chartState.startDate));
      setToolbarEndDate(new Date(chartState.endDate));
      setInterval(chartState.interval);
    }
  }, [chartState]);

  useEffect(() => {
    dispatch(fetchChartData({ 
      interval: interval,
      startDate: tempStartDateRef.current,
      endDate: tempEndDateRef.current 
    }));
  }, [interval, dispatch]);

  const handleIntervalChange = (newInterval) => {
    setActiveInterval(newInterval);
    setInterval(newInterval);

    const startDateToUse = tempStartDateRef.current;
    const endDateToUse = tempEndDateRef.current;

    dispatch(setChartParameters({ startDate: startDateToUse, endDate: endDateToUse, interval: newInterval }));
  };

  const handleDateChange = useCallback((newStartDate, newEndDate) => {
    const formattedStartDate = newStartDate.toISOString().slice(0, 19).replace('T', ' ');
    const formattedEndDate = newEndDate.toISOString().slice(0, 19).replace('T', ' ');

    tempStartDateRef.current = formattedStartDate;
    tempEndDateRef.current = formattedEndDate;

    dispatch(setChartParameters({ startDate: formattedStartDate, endDate: formattedEndDate, interval }));
  }, [dispatch, interval]);

  const options = useMemo(() => ({
    chart: {
      type: 'candlestick',
    },
    navigator: {
      enabled: false
    },
    rangeSelector: RangeSelector(),
    xAxis: {
      type: 'datetime',
      minRange: 2,
      events: {
        afterSetExtremes: function (e) {
          const newStartDate = new Date(e.min).toISOString().slice(0, 19).replace('T', ' ');
          const newEndDate = new Date(e.max).toISOString().slice(0, 19).replace('T', ' ');

          tempStartDateRef.current = newStartDate;
          tempEndDateRef.current = newEndDate;

          handleDateChange(new Date(e.min), new Date(e.max));
        }
      }
    },
    yAxis: {
      title: {
        text: 'Price'
      },
      opposite: true
    },
    series: [{
      name: 'Candlestick',
      data: chartState.data,
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
    },
    {
      type: 'flags',
      name: 'Selected Alarms',
      data: getFlags(selectedAlarms),
      onSeries: 'candlestick',
      shape: 'flag',
      includeInDataExport: true,
      width: 16,
      style: {
        color: 'white'
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
    accessibility: {
      enabled: false
    }
  }), [chartState.data, selectedAlarms, handleDateChange]);

  return (
    <div className="p-4">
      <Toolbar
        activeInterval={activeInterval}
        onIntervalChange={handleIntervalChange}
        startDate={toolbarStartDate}
        endDate={toolbarEndDate}
        onDateChange={handleDateChange}
      />
      <div className="relative">
        {chartState.loading && (
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
      {chartState.error && <p>Error: {chartState.error}</p>}
    </div>
  );
};

export default CandleStickChart;
