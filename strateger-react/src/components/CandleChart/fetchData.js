// Path: strateger-react/src/components/CandleChart/fetchData.js

import axios from 'axios';

export const fetchData = async (interval, startDate, endDate, setData, setError, setLoading) => {
  try {
    const response = await axios.get('http://51.21.128.53/bingx/get-k-line-data', {
      params: {
        symbol: "BTC-USDT",
        interval: interval,
        limit: "1440",
        start_date: startDate,
        end_date: endDate
      }
    });

    const resultData = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;

    if (resultData.code === 0) {
      const formattedData = resultData.data.map(item => [
        new Date(item.time).getTime(),
        parseFloat(item.open),
        parseFloat(item.high),
        parseFloat(item.low),
        parseFloat(item.close)
      ]).filter(item => !isNaN(item[0]));

      // Ordenar los datos por la primera columna (el tiempo)
      formattedData.sort((a, b) => a[0] - b[0]);

      setData(formattedData);
      setError(null);
    } else {
      setError(new Error(resultData.msg || 'Unknown error from API'));
    }
  } catch (err) {
    setError(err);
  } finally {
    setLoading(false);
  }
};
