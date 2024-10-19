import { createSelector } from '@reduxjs/toolkit';

// Selectors
export const selectCoinMPositions = (state) => state.positions.coinM;
export const selectUSDTMPositions = (state) => state.positions.usdtM;
export const selectSpotRecords = (state) => state.positions.spot;

export const selectCoinMPositionsList = createSelector(
  [selectCoinMPositions],
  (coinM) => coinM?.positions || []
);

export const selectUSDTMPositionsList = createSelector(
  [selectUSDTMPositions],
  (usdtM) => usdtM?.positions || []
);

export const selectSpotRecordsList = createSelector(
  [selectSpotRecords],
  (spot) => spot?.records || []
);

export const selectCoinMLoading = createSelector(
  [selectCoinMPositions],
  (coinM) => coinM?.loading
);

export const selectUSDTMLoading = createSelector(
  [selectUSDTMPositions],
  (usdtM) => usdtM?.loading
);

export const selectSpotLoading = createSelector(
  [selectSpotRecords],
  (spot) => spot?.loading
);

export const selectCoinMError = createSelector(
  [selectCoinMPositions],
  (coinM) => coinM?.error
);

export const selectUSDTMError = createSelector(
  [selectUSDTMPositions],
  (usdtM) => usdtM?.error
);

export const selectSpotError = createSelector(
  [selectSpotRecords],
  (spot) => spot?.error
);