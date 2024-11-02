import React from 'react';

/**
 * Componente contenedor para gráficos de cuentas que maneja la carga, 
 * renderizado del gráfico y la leyenda.
 * 
 * @param {Object} props - Las props del componente.
 * @param {boolean} props.isLoading - Indica si el gráfico está en proceso de carga.
 * @param {Object[]} props.seriesData - Datos de las series que se van a graficar.
 * @param {Object} props.colors - Colores a usar en el gráfico.
 * @param {Object} props.priceFormat - Formato de precio (opcional) para el gráfico.
 * @param {Object} props.visibleSeries - Estado que maneja la visibilidad de las series.
 * @param {Function} props.toggleSeriesVisibility - Función para alternar la visibilidad de las series.
 * @param {React.Component} props.ChartComponent - Componente para renderizar el gráfico.
 * @param {React.Component} props.Legend - Componente para renderizar la leyenda del gráfico.
 * @param {React.Component} props.LoadingOverlay - Componente para mostrar una capa de carga.
 * @returns {JSX.Element} - El componente contenedor.
 */
const ContenedorChartWallet = ({
  isLoading,
  seriesData,
  colors,
  priceFormat,
  visibleSeries,
  toggleSeriesVisibility,
  ChartComponent,
  Legend,  
}) => {

  const validatedPriceFormat = priceFormat && typeof priceFormat === 'object' ? priceFormat : {};

  return (
    <div className="grid grid-cols-1">      

      <div className="grid grid-cols-1 gap-4">
        <ChartComponent
          seriesData={seriesData.filter((series) => visibleSeries[series.name])}
          colors={colors}
          priceFormat={validatedPriceFormat}
        />
        <div className="flex justify-center">
          <Legend
            seriesData={seriesData}
            visibleSeries={visibleSeries}
            toggleSeriesVisibility={toggleSeriesVisibility}
          />
        </div>
      </div>
    </div>
  );
};

export default ContenedorChartWallet;
