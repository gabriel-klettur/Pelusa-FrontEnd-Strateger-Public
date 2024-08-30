// src/components/TradingViewChart/Reloj.js

import React from 'react';
import RelojComponent from '../../../common/utils/Reloj'; // Importa el componente Reloj que ya existe

const Reloj = ({ direction }) => {
  return (
    <div className="flex justify-center items-center justify-self-end h-12 border-r-4 border-l-4 border-african_violet-500">
      <RelojComponent direction={direction} />
    </div>
  );
};

export default Reloj;
