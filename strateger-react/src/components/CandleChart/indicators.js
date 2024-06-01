// Path: src/components/CandleChart/indicators.js

import { ema, elderRay } from 'react-financial-charts';

export const configureEMA = (data) => {
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
  return { ema12, ema26, elder, calculatedData };
};
