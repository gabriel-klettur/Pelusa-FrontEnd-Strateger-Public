import React from 'react';
import {
  ChartCanvas,
  Chart,
  BarSeries,
  CandlestickSeries,
  LineSeries,
  ElderRaySeries,
  CurrentCoordinate,
  MovingAverageTooltip,
  OHLCTooltip,
  SingleValueTooltip,
  XAxis,
  YAxis,
  CrossHairCursor,
  MouseCoordinateX,
  MouseCoordinateY,
  EdgeIndicator,
  ZoomButtons,
  discontinuousTimeScaleProviderBuilder,
  ema,
  elderRay,
  lastVisibleItemBasedZoomAnchor
} from 'react-financial-charts';
import { format } from 'd3-format';
import { timeFormat } from 'd3-time-format';

const ChartCanvasWrapper = ({ data, width, height, ratio, showElderRay, showBottomPanel, showVolume }) => {
  // Configuración de la escala y el formato del gráfico.
  const ScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor(
    (d) => d.time
  );

  const margin = { left: 0, right: 48, top: 0, bottom: 24 };
  const pricesDisplayFormat = format('.2f');
  const dateTimeFormat = '%d %b %H:%M:%S';
  const timeDisplayFormat = timeFormat(dateTimeFormat);

  // Configuración de los indicadores EMA.
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

  // Configuración del indicador Elder Ray.
  const elder = elderRay();

  // Calcular los datos del gráfico con los indicadores.
  const calculatedData = elder(ema26(ema12(data)));
  const { data: chartData, xScale, xAccessor, displayXAccessor } = ScaleProvider(calculatedData);

  // Configuración de las extensiones del gráfico.
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
  const openCloseColor = (data) => data.close > data.open ? '#26a69a' : '#ef5350';

  return (
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
      {showBottomPanel && showVolume && (
        <Chart id={2} height={150} origin={(w, h) => [0, h - 150]} yExtents={barChartExtents}>
          <BarSeries fillStyle={volumeColor} yAccessor={volumeSeries} />
          <MouseCoordinateX displayFormat={timeDisplayFormat} />
        </Chart>
      )}
      <Chart id={3} height={showBottomPanel ? (showElderRay && showVolume ? height - 300 : height - 150) : height - 24} yExtents={candleChartExtents}>
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
        <MouseCoordinateX displayFormat={timeDisplayFormat} />
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
      {showBottomPanel && showElderRay && (
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
      )}
      <CrossHairCursor />
    </ChartCanvas>
  );
};

export default ChartCanvasWrapper;
