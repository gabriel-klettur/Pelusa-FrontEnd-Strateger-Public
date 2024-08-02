// src/components/common/LoadingOverlay/LoadingOverlay.js

import React from 'react';
import './LoadingOverlay.css'; // Importar el archivo de estilos

/**
 * Componente para mostrar una superposición de carga.
 * @param {boolean} isLoading - Indica si la superposición de carga debe mostrarse.
 * @returns {JSX.Element|null} - El componente de superposición de carga o null si no está cargando.
 */
const LoadingOverlay = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="loading-overlay">
      <div className="loading-text">
        Loading...
      </div>
    </div>
  );
};

export default LoadingOverlay;
