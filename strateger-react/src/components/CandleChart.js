import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'd3-format';
import { timeFormat } from 'd3-time-format';
import {
  elderRay,
  ema,
  discontinuousTimeScaleProviderBuilder,
  Chart,
  ChartCanvas,
  CurrentCoordinate,
  BarSeries,
  CandlestickSeries,
  ElderRaySeries,
  LineSeries,
  MovingAverageTooltip,
  OHLCTooltip,
  SingleValueTooltip,
  lastVisibleItemBasedZoomAnchor,
  XAxis,
  YAxis,
  CrossHairCursor,
  EdgeIndicator,
  MouseCoordinateX,
  MouseCoordinateY,
  ZoomButtons,
  withDeviceRatio,
  withSize
} from 'react-financial-charts';

const CandleChart = ({ width, height, ratio }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [interval, setInterval] = useState("1h"); // Default interval

  const fetchData = async (interval) => {
    try {
      const response = await axios.get('http://localhost/bingx/get-k-line-data', {
        params: {
          symbol: "BTC-USDT",
          interval: interval,
          limit: "1000",
          start_date: "2024-05-31 00:00:00",
          end_date: "2024-05-31 23:59:59"
        }
      });

      const resultData = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;

      if (resultData.code === 0) {
        const formattedData = resultData.data.map(item => ({
          open: parseFloat(item.open),
          close: parseFloat(item.close),
          high: parseFloat(item.high),
          low: parseFloat(item.low),
          volume: parseFloat(item.volume),
          time: new Date(item.time)
        })).filter(item => !isNaN(item.time)); // Filter out invalid dates

        formattedData.sort((a, b) => a.time - b.time);

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

  useEffect(() => {
    setLoading(true);
    fetchData(interval);
  }, [interval]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const ScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor(
    (d) => d.time
  );

  const margin = { left: 0, right: 48, top: 0, bottom: 24 };
  const pricesDisplayFormat = format('.2f');
  const dateTimeFormat = '%d %b';
  const timeDisplayFormat = timeFormat(dateTimeFormat);

  const ema12 = ema()
    .id(1)
    .options({ windowSize: 12 })
    .merge((d, c) => { d.ema12 = c; })
    .accessor((d) => d.ema12);

  const ema26 = ema()
    .id(2)
    .options({ windowSize: 26 })
    .merge((d, c) => { d.ema26 = c; })
    .accessor((d) => d.ema26);

  const elder = elderRay();

  const calculatedData = elder(ema26(ema12(data)));
  const { data: chartData, xScale, xAccessor, displayXAccessor } = ScaleProvider(calculatedData);

  const max = xAccessor(chartData[chartData.length - 1]);
  const min = xAccessor(chartData[Math.max(0, chartData.length - 100)]);
  const xExtents = [min, max + 5];

  const barChartExtents = (data) => data.volume;
  const candleChartExtents = (data) => [data.high, data.low];
  const yEdgeIndicator = (data) => data.close;

  const volumeColor = (data) => data.close > data.open
    ? 'rgba(38, 166, 154, 0.3)'
    : 'rgba(239, 83, 80, 0.3)';

  const volumeSeries = (data) => data.volume;
  const openCloseColor = (data) => data.close > data.open ? '#26a69a' : '#ef5350'; // Adjusted colors

  return (
    <div>
      <div className="interval-selector">
        <label htmlFor="interval">Interval: </label>
        <select id="interval" value={interval} onChange={(e) => setInterval(e.target.value)}>
          <option value="1m">1 Minute</option>
          <option value="5m">5 Minutes</option>
          <option value="15m">15 Minutes</option>
          <option value="30m">30 Minutes</option>
          <option value="1h">1 Hour</option>
          <option value="4h">4 Hours</option>
          <option value="1d">1 Day</option>
        </select>
      </div>
      <ChartCanvas
        height={height}
        width={width}
        ratio={ratio}
        margin={margin}
        data={chartData}
        displayXAccessor={displayXAccessor}
        seriesName="Data"
        xScale={xScale}
        xAccessor={xAccessor}
        xExtents={xExtents}
        zoomAnchor={lastVisibleItemBasedZoomAnchor}
      >
        <Chart id={2} height={150} origin={(w, h) => [0, h - 150]} yExtents={barChartExtents}>
          <BarSeries fillStyle={volumeColor} yAccessor={volumeSeries} />
        </Chart>
        <Chart id={3} height={height - 300} yExtents={candleChartExtents}>
          <XAxis showGridLines showTickLabel={false} />
          <YAxis showGridLines tickFormat={pricesDisplayFormat} />
          <CandlestickSeries
            stroke={d => d.close > d.open ? '#26a69a' : '#ef5350'}
            wickStroke={d => d.close > d.open ? '#26a69a' : '#ef5350'}
            fill={d => d.close > d.open ? '#26a69a' : '#ef5350'}
          />
          <LineSeries yAccessor={ema26.accessor()} strokeStyle={ema26.stroke()} />
          <CurrentCoordinate yAccessor={ema26.accessor()} fillStyle={ema26.stroke()} />
          <LineSeries yAccessor={ema12.accessor()} strokeStyle={ema12.stroke()} />
          <CurrentCoordinate yAccessor={ema12.accessor()} fillStyle={ema12.stroke()} />
          <MouseCoordinateY rectWidth={margin.right} displayFormat={pricesDisplayFormat} />
          <EdgeIndicator itemType="last" rectWidth={margin.right} fill={openCloseColor} lineStroke={openCloseColor} displayFormat={pricesDisplayFormat} yAccessor={yEdgeIndicator} />
          <MovingAverageTooltip
            origin={[8, 24]}
            options={[
              { yAccessor: ema26.accessor(), type: 'EMA', stroke: ema26.stroke(), windowSize: ema26.options().windowSize },
              { yAccessor: ema12.accessor(), type: 'EMA', stroke: ema12.stroke(), windowSize: ema12.options().windowSize }
            ]}
          />
          <ZoomButtons />
          <OHLCTooltip origin={[8, 16]} />
        </Chart>
        <Chart id={4} height={100} yExtents={[0, elder.accessor()]} origin={(w, h) => [0, h - 100]} padding={{ top: 8, bottom: 8 }}>
          <XAxis showGridLines gridLinesStrokeStyle="#e0e3eb" />
          <YAxis ticks={4} tickFormat={pricesDisplayFormat} />
          <MouseCoordinateX displayFormat={timeDisplayFormat} />
          <MouseCoordinateY rectWidth={margin.right} displayFormat={pricesDisplayFormat} />
          <ElderRaySeries yAccessor={elder.accessor()} />
          <SingleValueTooltip
            yAccessor={elder.accessor()}
            yLabel="Elder Ray"
            yDisplayFormat={(d) => `${pricesDisplayFormat(d.bullPower)}, ${pricesDisplayFormat(d.bearPower)}`}
            origin={[8, 16]}
          />
        </Chart>
        <CrossHairCursor />
      </ChartCanvas>
    </div>
  );
};

export default withSize({ style: { minHeight: 600 } })(withDeviceRatio()(CandleChart));
