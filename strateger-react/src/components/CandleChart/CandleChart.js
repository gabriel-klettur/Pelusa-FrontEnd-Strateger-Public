import React, { useEffect, useState, useRef } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { fetchData } from './fetchData';
import Toolbar from './Toolbar';
import RangeSelector from './RangeSelector';
import { useSelector } from 'react-redux';
import { getFlags } from './flags';

const CandleStickChart = ({ initialTemporalidad, initialStartDate, initialEndDate }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [interval, setInterval] = useState(initialTemporalidad);
  const [activeInterval, setActiveInterval] = useState(initialTemporalidad);
  const chartComponentRef = useRef(null);

  const [startDateState, setStartDateState] = useState(initialStartDate);
  const [endDateState, setEndDateState] = useState(initialEndDate);
  const tempStartDateRef = useRef(initialStartDate);
  const tempEndDateRef = useRef(initialEndDate);

  const [toolbarStartDate, setToolbarStartDate] = useState(new Date(initialStartDate));
  const [toolbarEndDate, setToolbarEndDate] = useState(new Date(initialEndDate));
  
  const selectedAlarms = useSelector((state) => state.alarms.selectedAlarms);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      console.log('useEffect: Fetching data... Interval:', interval, 'Start Date:', startDateState, 'End Date:', endDateState);
      await fetchData(interval, startDateState, endDateState, setData, setError, setLoading);
    };

    loadData();
  }, [interval, startDateState, endDateState]);

  const handleIntervalChange = (newInterval) => {
    //console.log('Temporalidad Seleccionada:', newInterval);
    setActiveInterval(newInterval);
    setInterval(newInterval);

    const startDateToUse = tempStartDateRef.current;
    const endDateToUse = tempEndDateRef.current;

    setStartDateState(startDateToUse);
    setEndDateState(endDateToUse);

    setToolbarStartDate(new Date(startDateToUse)); // Update toolbar start date
    setToolbarEndDate(new Date(endDateToUse)); // Update toolbar end date
  };

  const handleDateChange = (newStartDate, newEndDate) => {
    setStartDateState(newStartDate.toISOString().slice(0, 19).replace('T', ' '));
    setEndDateState(newEndDate.toISOString().slice(0, 19).replace('T', ' '));
  };

  const options = {
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

          //console.log('Temporary new start date:', newStartDate);
          //console.log('Temporary new end date:', newEndDate);

          tempStartDateRef.current = newStartDate;  // Store temporarily
          tempEndDateRef.current = newEndDate;  // Store temporarily
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
    },
    {
      type: 'flags',
      name: 'Selected Alarms',
      data: getFlags(selectedAlarms), // Pass the selectedAlarms to getFlags
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
  };

  return (
    <div className="p-4">
      <Toolbar
        activeInterval={activeInterval}
        onIntervalChange={handleIntervalChange}
        startDate={toolbarStartDate}  // Pass the toolbar start date
        endDate={toolbarEndDate}  // Pass the toolbar end date
        onDateChange={handleDateChange} // Add this line to handle date change
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
