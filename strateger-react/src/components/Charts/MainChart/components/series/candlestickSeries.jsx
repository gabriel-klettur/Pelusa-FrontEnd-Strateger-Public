// Path: strateger-react/src/components/Charts/MainChart/components/series/candlestickSeries.jsx
import { CandlestickSeries } from 'lightweight-charts';

/**
 * Inicializa la serie de velas (candlestick) en el gráfico usando la API unificada.
 * En v5 se usa: chart.addSeries(CandlestickSeries, options)
 */
export const initialCandlestickSeries = (chart) => {
  if (!chart) {
    throw new Error("El chart no ha sido inicializado.");
  }

  // (Opcional) Verificar dimensiones del contenedor
  // Puedes agregar validaciones adicionales aquí si lo consideras necesario

  let candlestickSeries;
  try {
    // Crea la serie usando el nuevo API de v5:
    candlestickSeries = chart.addSeries(CandlestickSeries, {});
  } catch (error) {
    console.error(
      "Error al agregar la serie de velas. Verifica que el chart se haya creado correctamente y que el contenedor tenga dimensiones válidas (ancho/alto > 0).",
      error
    );
    throw error;
  }

  return { candlestickSeries };
};

/**
 * Asigna datos a la serie de velas.
 */
export const setCandlestickSeriesData = (candlestickSeries, sortedData) => {
  if (!candlestickSeries || typeof candlestickSeries.setData !== "function") {
    throw new Error("La serie de velas no es válida.");
  }
  candlestickSeries.setData(sortedData);
};
