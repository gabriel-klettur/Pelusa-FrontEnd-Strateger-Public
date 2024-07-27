// Path: strateger-react/src/components/TradingViewLineal/TradingViewLineal.js

import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';

export const ChartComponent = (props) => {
  const {
    seriesData = [], // Valor por defecto
    colors: {
      backgroundColor = 'white',
      lineColor = '#2962FF',
      textColor = 'black',
      areaTopColor,
      areaBottomColor,
    } = {},
    priceFormat = {
      type: 'price',
      precision: 2,
      minMove: 0.01,
    }
  } = props;

  const chartContainerRef = useRef();

  useEffect(
    () => {
      const handleResize = () => {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      };

      const chart = createChart(chartContainerRef.current, {
        layout: {
          background: { type: ColorType.Solid, color: backgroundColor },
          textColor,
        },
        width: chartContainerRef.current.clientWidth,
        height: 300,
      });
      chart.timeScale().fitContent();

      // Add the series to the chart
      seriesData.forEach(({ data, color }) => {
        const newSeries = chart.addLineSeries({
          color: color,
          lineWidth: 2,
          priceFormat,
        });
        newSeries.setData(data);

        // Add the horizontal line at y = 0
        newSeries.createPriceLine({
          price: 0,
          color: 'red',
          lineWidth: 2,
          lineStyle: 2, // 0: solid, 1: dashed, 2: dotted
          axisLabelVisible: false,
          title: 'Y=0',
        });
      });

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        chart.remove();
      };
    },
    [seriesData, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor, priceFormat]
  );

  return (
    <div ref={chartContainerRef} />
  );
};
