// Path: src/thunks/loadSlices.js
import { fetchStrategies } from '../redux/strategy';
import { fetchDiaryEntries } from '../redux/diary';
import { fetchPerpCOINMBalance, fetchPerpUSDTMBalance, fetchSpotBalance, fetchTrackRecordBingXAllAccounts } from '../redux/account';
import { fetchPositionsCoinM, fetchPositionsUSDTM } from '../redux/position';
import { fetchCandlestickChartData } from '../redux/charts';
import { fetchTicker } from '../redux/ticker';
import { fetchOrdersCoinm, fetchOrdersSpot, fetchOrdersStandard, fetchOrdersUsdtm } from '../redux/order';
import { createLoadingToast, dismissLoadingToast, handleLoadingError } from './loadSlicesHelpers';
import { fetchAlarms } from '../redux/alarm';

export const loadMinimumInformation = async (dispatch) => {
  const { toastId, intervalId } = createLoadingToast('Loading minimum information');
  try {
    await Promise.all([
      dispatch(fetchTicker('ETH-USDT')),
      dispatch(fetchTicker('BTC-USDT'))
    ]);
    dismissLoadingToast(toastId, intervalId, 'Minimum information loaded');
  } catch (error) {
    handleLoadingError(toastId, intervalId, 'Error loading minimum information', error);
  }
};

export const loadChartsInformation = async (dispatch) => {
  const { toastId, intervalId } = createLoadingToast('Loading Charts information');
  try {
    await dispatch(fetchCandlestickChartData({
      interval: '1d',
      startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1000).toISOString(),
      endDate: new Date().toISOString()
    }));
    dismissLoadingToast(toastId, intervalId, 'Charts information loaded');
  } catch (error) {
    handleLoadingError(toastId, intervalId, 'Error loading Charts information', error);
  }
};

// Repite el mismo patrón para las demás secciones
export const loadOrdersInformation = async (dispatch) => {
  const { toastId, intervalId } = createLoadingToast('Loading Orders information');
  try {
    await dispatch(fetchOrdersCoinm({ limit: 500, offset: 0 }));
    await dispatch(fetchOrdersSpot({ limit: 500, offset: 0 }));
    await dispatch(fetchOrdersStandard({ limit: 500, offset: 0 }));
    await dispatch(fetchOrdersUsdtm({ limit: 500, offset: 0 }));
    dismissLoadingToast(toastId, intervalId, 'Orders information loaded');
  } catch (error) {
    handleLoadingError(toastId, intervalId, 'Error loading Orders information', error);
  }
};

export const loadAlarmsInformation = async (dispatch) => {
  const { toastId, intervalId } = createLoadingToast('Loading Alarms information');
  try {
     await dispatch(fetchAlarms({ limit: 500, offset: 0 }));
    dismissLoadingToast(toastId, intervalId, 'Alarms information loaded');
  } catch (error) {
    handleLoadingError(toastId, intervalId, 'Error loading Alarms information', error);
  }
}

// Crear las demás funciones para cargar información de cuentas, estrategias, diario y posiciones

export const loadAccountInformation = async (dispatch) => {
  const { toastId, intervalId } = createLoadingToast('Loading Account information');
  try {
    await dispatch(fetchPerpCOINMBalance());
    await dispatch(fetchPerpUSDTMBalance());
    await dispatch(fetchSpotBalance());
    await dispatch(fetchTrackRecordBingXAllAccounts());
    dismissLoadingToast(toastId, intervalId, 'Account information loaded');
  } catch (error) {
    handleLoadingError(toastId, intervalId, 'Error loading Account information', error);
  }
};

export const loadStrategiesInformation = async (dispatch) => {
  const { toastId, intervalId } = createLoadingToast('Loading Strategy information');
  try {
    await dispatch(fetchStrategies({ skip: 0, limit: 10 }));
    dismissLoadingToast(toastId, intervalId, 'Strategy information loaded');
  } catch (error) {
    handleLoadingError(toastId, intervalId, 'Error loading Strategy information', error);
  }
};

export const loadDiaryInformation = async (dispatch) => {
  const { toastId, intervalId } = createLoadingToast('Loading Diary information');
  try {
    await dispatch(fetchDiaryEntries({ skip: 0, limit: 10 }));
    dismissLoadingToast(toastId, intervalId, 'Diary information loaded');
  } catch (error) {
    handleLoadingError(toastId, intervalId, 'Error loading Diary information', error);
  }
};

export const loadPositionsInformation = async (dispatch) => {
  const { toastId, intervalId } = createLoadingToast('Loading Positions information');
  try {
    await dispatch(fetchPositionsCoinM());
    await dispatch(fetchPositionsUSDTM());
    dismissLoadingToast(toastId, intervalId, 'Positions information loaded');
  } catch (error) {
    handleLoadingError(toastId, intervalId, 'Error loading Positions information', error);
  }
};
