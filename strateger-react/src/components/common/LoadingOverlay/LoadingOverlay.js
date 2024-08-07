// Path: strateger-react/src/components/common/LoadingOverlay/LoadingOverlay.js

import React from 'react';
import './LoadingOverlay.css'; // Puedes mantener este import si tienes otros estilos globales

/**
 * Componente para mostrar una superposición de carga.
 * @param {boolean} isLoading - Indica si la superposición de carga debe mostrarse.
 * @returns {JSX.Element|null} - El componente de superposición de carga o null si no está cargando.
 */
const LoadingOverlay = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-night-500 bg-opacity-75 z-50">
      <div className="text-african_violet-500 font-bold text-lg">
        Loading...
      </div>
    </div>
  );
};

export default LoadingOverlay;
