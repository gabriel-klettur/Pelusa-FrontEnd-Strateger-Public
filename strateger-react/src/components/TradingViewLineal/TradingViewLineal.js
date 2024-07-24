// Path: strateger-react/src/components/TradingViewLineal/TradingViewLineal.js

import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';

export const ChartComponent = props => {
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

            seriesData.forEach(({ data, color }) => {
                const newSeries = chart.addAreaSeries({
                    lineColor: color,
                    topColor: areaTopColor || 'rgba(0, 0, 0, 0)', // Color transparente por defecto
                    bottomColor: areaBottomColor || 'rgba(0, 0, 0, 0)', // Color transparente por defecto
                    priceFormat
                });
                newSeries.setData(data);
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
