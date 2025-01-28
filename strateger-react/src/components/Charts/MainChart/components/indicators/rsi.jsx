//Path: strateger-react/src/components/Charts/MainChart/components/indicators/rsi.jsx

export const calculateRSI = (data, period = 14) => {
  if (!data || data.length < period) {
    console.error("calculateRSI: Datos insuficientes o mal formateados. Longitud:", data?.length || 0);
    console.table(data);
    return { rsi: [] };
  }

  const rsi = [];
  let avgGain = 0;
  let avgLoss = 0;

  // Inicializar ganancias y pérdidas promedio
  for (let i = 1; i <= period; i++) {
    const prevClose = data[i - 1]?.close ?? 0;
    const currClose = data[i]?.close ?? 0;
    const change = currClose - prevClose;

    if (change > 0) {
      avgGain += change;
    } else if (change < 0) {
      avgLoss += Math.abs(change);
    }
  }

  avgGain /= period;
  avgLoss /= period;

  for (let i = period; i < data.length; i++) {
    const prevClose = data[i - 1]?.close ?? 0;
    const currClose = data[i]?.close ?? 0;
    const change = currClose - prevClose;

    if (change > 0) {
      avgGain = ((avgGain * (period - 1)) + change) / period;
      avgLoss = (avgLoss * (period - 1)) / period;
    } else if (change < 0) {
      avgLoss = ((avgLoss * (period - 1)) + Math.abs(change)) / period;
      avgGain = (avgGain * (period - 1)) / period;
    }

    avgLoss = avgLoss || 0.0001;
    const rs = avgGain / avgLoss;
    const rsiValue = 100 - 100 / (1 + rs);    

    const time = data[i]?.time ?? null;
    if (time !== null) {
      rsi.push({ time, value: rsiValue });
    }
  }

  return { rsi };
};


export const createRSISeries = (chart, color = 'blue') => {
    return chart.addLineSeries({
      priceScaleId: 'rsi',
      color: typeof color === 'string' ? color : String(color), // Asegurar que el color sea una cadena      
      lineWidth: 2,
      lastValueVisible: false,
      crossHairMarkerVisible: false,
      priceLineVisible: false,
    });
};
  

  
  