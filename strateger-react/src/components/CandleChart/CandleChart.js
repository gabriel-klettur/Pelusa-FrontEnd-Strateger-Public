import React, { useEffect, useState, useRef, useMemo } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { fetchData } from './fetchData';
import Toolbar from './Toolbar';
import RangeSelector from './RangeSelector';
import { useSelector } from 'react-redux';
import { getFlags } from './flags';
import { addMinutes, addHours, subMinutes, subHours } from 'date-fns';

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
  const chartParams = useSelector((state) => state.chart);

  useEffect(() => {
    if (chartParams.startDate && chartParams.endDate) {
      setStartDateState(chartParams.startDate);
      setEndDateState(chartParams.endDate);
      setInterval(chartParams.temporalidad);
      setToolbarStartDate(new Date(chartParams.startDate));
      setToolbarEndDate(new Date(chartParams.endDate));
    }
  }, [chartParams]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      // Validar y ajustar la temporalidad
      let temporalidad = interval;
      if (temporalidad === '1') {
        temporalidad = '1m';
      } 
      // Ampliar las fechas de inicio y fin según la temporalidad
      let expandedStartDate = new Date(startDateState);
      let expandedEndDate = new Date(endDateState);

      if (temporalidad === '1m' || temporalidad === '5m' || temporalidad === '15m' || temporalidad === '30m') {
        expandedStartDate = subMinutes(expandedStartDate, 5);
        expandedEndDate = addMinutes(expandedEndDate, 5);
      } else if (temporalidad === '1h') {
        expandedStartDate = subHours(expandedStartDate, 5);
        expandedEndDate = addHours(expandedEndDate, 5);
      } else if (temporalidad === '4h') {
        expandedStartDate = subHours(expandedStartDate, 20);
        expandedEndDate = addHours(expandedEndDate, 20);
      } else if (temporalidad === '1d') {
        expandedStartDate = subHours(expandedStartDate, 120); // 5 days
        expandedEndDate = addHours(expandedEndDate, 120); // 5 days
      } else if (temporalidad === '1w') {
        expandedStartDate = subHours(expandedStartDate, 840); // 5 weeks
        expandedEndDate = addHours(expandedEndDate, 840); // 5 weeks
      } else if (temporalidad === '1M') {
        expandedStartDate = subHours(expandedStartDate, 3600); // 5 months
        expandedEndDate = addHours(expandedEndDate, 3600); // 5 months
      }

      // Validar las fechas
      if (!expandedStartDate || !expandedEndDate) {
        setError(new Error('Fechas inválidas.'));
        setLoading(false);
        return;
      }

      // Asegurar que la fecha de inicio sea anterior a la fecha de fin
      if (expandedStartDate >= expandedEndDate) {
        setError(new Error('La fecha de inicio debe ser anterior a la fecha de fin.'));
        setLoading(false);
        return;
      }

      await fetchData(temporalidad, expandedStartDate.toISOString().slice(0, 19).replace('T', ' '), expandedEndDate.toISOString().slice(0, 19).replace('T', ' '), setData, setError, setLoading);
    };

    loadData();
  }, [interval, startDateState, endDateState]);

  const handleIntervalChange = (newInterval) => {
    setActiveInterval(newInterval);
    setInterval(newInterval);

    const startDateToUse = tempStartDateRef.current;
    const endDateToUse = tempEndDateRef.current;

    setStartDateState(startDateToUse);
    setEndDateState(endDateToUse);

    setToolbarStartDate(new Date(startDateToUse));
    setToolbarEndDate(new Date(endDateToUse));
  };

  const handleDateChange = (newStartDate, newEndDate) => {
    const formattedStartDate = newStartDate.toISOString().slice(0, 19).replace('T', ' ');
    const formattedEndDate = newEndDate.toISOString().slice(0, 19).replace('T', ' ');

    setStartDateState(formattedStartDate);
    setEndDateState(formattedEndDate);
  };

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
  }), [data, selectedAlarms]);

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
