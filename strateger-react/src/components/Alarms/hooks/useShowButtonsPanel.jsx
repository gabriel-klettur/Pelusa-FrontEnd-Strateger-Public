// Path: strateger-react/src/components/Alarms/hooks/useShowButtonsPanel.js

import { useState, useCallback } from 'react';

/**
 ** ---------------- Hook to manage the visibility of the buttons panel -------------
 * 
 * @param {Object} initialState initial state for the visibility of the buttons panel
 * @returns {Object} state and function to update the visibility of the buttons panel
 */
export const useShowButtonsPanel = (initialState) => {
  const [showButtonsPanel, setShowButtonsPanel] = useState(initialState);

  const updateShowButtonsPanel = useCallback((key, value) => {
    setShowButtonsPanel((prevSettings) => ({
      ...prevSettings,
      [key]: value,
    }));
  }, []);

  return { showButtonsPanel, updateShowButtonsPanel };
};
