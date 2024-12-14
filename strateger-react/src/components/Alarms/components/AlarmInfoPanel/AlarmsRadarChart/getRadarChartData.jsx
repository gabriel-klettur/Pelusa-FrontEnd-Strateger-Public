const getRadarChartData = (activeDataset, alarmsByHour, alarmsByHourFilteredByClick, alarmsByHourFilteredByOptions) => {
    const datasets = {
      alarms: {
        label: 'All Alarms',
        data: alarmsByHour,
        backgroundColor: 'rgba(255, 205, 86, 0.4)',
        borderColor: 'rgba(255, 205, 86, 1)',
      },
      selected: {
        label: 'Selected Alarms',
        data: alarmsByHourFilteredByClick,
        backgroundColor: 'rgba(75, 192, 192, 0.4)',
        borderColor: 'rgba(75, 192, 192, 1)',
      },
      filtered: {
        label: 'Filtered Alarms',
        data: alarmsByHourFilteredByOptions,
        backgroundColor: 'rgba(54, 162, 235, 0.4)',
        borderColor: 'rgba(54, 162, 235, 1)',
      },
    };
  
    return {
      labels: ['00:00-01:00', '01:00-02:00', '02:00-03:00', '03:00-04:00', 
        '04:00-05:00', '05:00-06:00', '06:00-07:00', '07:00-08:00',
        '08:00-09:00', '09:00-10:00', '10:00-11:00', '11:00-12:00', 
        '12:00-13:00', '13:00-14:00', '14:00-15:00', '15:00-16:00',
        '16:00-17:00', '17:00-18:00', '18:00-19:00', '19:00-20:00',
        '20:00-21:00', '21:00-22:00', '22:00-23:00', '23:00-00:00'],
      datasets: [datasets[activeDataset]],
    };
  };
  
  export default getRadarChartData;