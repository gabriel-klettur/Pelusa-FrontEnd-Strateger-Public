import axios from 'axios';

export const fetchData = async (interval, setData, setError, setLoading) => {
  try {
    const response = await axios.get('http://localhost/bingx/get-k-line-data', {
      params: {
        symbol: "BTC-USDT",
        interval: interval,
        limit: "1000",
        start_date: "2024-05-01 00:00:00",
        end_date: "2024-06-4 23:59:59"
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
