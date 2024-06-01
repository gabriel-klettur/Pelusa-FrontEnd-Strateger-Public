// Importación principal de React y hooks para gestionar el estado y efectos.
import React, { useEffect, useState } from 'react';

// Importación de Axios para hacer peticiones HTTP.
import axios from 'axios';

// Importaciones de D3 para formateo de números y fechas.
import { format } from 'd3-format';
import { timeFormat } from 'd3-time-format';

// Importaciones de react-financial-charts para crear gráficos financieros.
import {
  elderRay, // Indicador técnico Elder Ray.
  ema, // Indicador técnico Exponential Moving Average (EMA).
  discontinuousTimeScaleProviderBuilder, // Proveedor de escalas de tiempo discontinuas.
  Chart, // Contenedor de un gráfico individual.
  ChartCanvas, // Lienzo para renderizar múltiples gráficos.
  CurrentCoordinate, // Coordenadas actuales para indicadores.
  BarSeries, // Serie de barras para volumen.
  CandlestickSeries, // Serie de velas japonesas.
  ElderRaySeries, // Serie del indicador Elder Ray.
  LineSeries, // Serie de líneas para indicadores como EMA.
  MovingAverageTooltip, // Tooltip para medias móviles.
  OHLCTooltip, // Tooltip para mostrar datos OHLC (Open, High, Low, Close).
  SingleValueTooltip, // Tooltip para mostrar un solo valor.
  lastVisibleItemBasedZoomAnchor, // Anclaje de zoom basado en el último ítem visible.
  XAxis, // Eje X del gráfico.
  YAxis, // Eje Y del gráfico.
  CrossHairCursor, // Cursor en forma de cruz para precisión.
  EdgeIndicator, // Indicador en el borde del gráfico.
  MouseCoordinateX, // Coordenadas del mouse en el eje X.
  MouseCoordinateY, // Coordenadas del mouse en el eje Y.
  ZoomButtons, // Botones para hacer zoom.
  withDeviceRatio, // HOC para ajustar la relación de píxeles del dispositivo.
  withSize // HOC para ajustar el tamaño del gráfico.
} from 'react-financial-charts';

// Componente principal del gráfico de velas.
const CandleChart = ({ width, height, ratio }) => {
  // Estado del componente
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [interval, setInterval] = useState("1h");
  const [showElderRay, setShowElderRay] = useState(true);
  const [showBottomPanel, setShowBottomPanel] = useState(false);
  const [showVolume, setShowVolume] = useState(true);

  // Función para obtener datos de la API.
  const fetchData = async (interval) => {
    try {
      const response = await axios.get('http://localhost/bingx/get-k-line-data', {
        params: {
          symbol: "BTC-USDT",
          interval: interval,
          limit: "1000",
          start_date: "2024-05-01 00:00:00",
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
        })).filter(item => !isNaN(item.time));

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

  // useEffect para obtener datos cuando el intervalo cambia.
  useEffect(() => {
    setLoading(true);
    fetchData(interval);
  }, [interval]);

  // Renderizado condicional mientras se cargan los datos o hay un error.
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

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

  // Renderizado del componente ChartCanvas y sus hijos.
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="interval-selector flex items-center">
          <label htmlFor="interval" className="mr-2">Interval: </label>
          <select
            id="interval"
            value={interval}
            onChange={(e) => setInterval(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1"
          >
            <option value="1m">1 Minute</option>
            <option value="5m">5 Minutes</option>
            <option value="15m">15 Minutes</option>
            <option value="30m">30 Minutes</option>
            <option value="1h">1 Hour</option>
            <option value="4h">4 Hours</option>
            <option value="1d">1 Day</option>
          </select>
        </div>
        <div className="buttons flex gap-4">
          <button
            onClick={() => setShowElderRay(!showElderRay)}
            className="border border-gray-300 rounded px-4 py-2"
          >
            {showElderRay ? 'Hide Elder Ray' : 'Show Elder Ray'}
          </button>
          <button
            onClick={() => setShowBottomPanel(!showBottomPanel)}
            className="border border-gray-300 rounded px-4 py-2"
          >
            {showBottomPanel ? 'Hide Bottom Panel' : 'Show Bottom Panel'}
          </button>
          <button
            onClick={() => setShowVolume(!showVolume)}
            className="border border-gray-300 rounded px-4 py-2"
          >
            {showVolume ? 'Hide Volume' : 'Show Volume'}
          </button>
        </div>
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
    </div>
  );
};

// Exportación del componente con HOCs para manejar el tamaño y la relación de píxeles del dispositivo.
export default withSize({ style: { minHeight: 600 } })(withDeviceRatio()(CandleChart));
