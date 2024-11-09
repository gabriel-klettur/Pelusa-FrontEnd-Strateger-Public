// Path: src/thunks/loadSlices.js
import { fetchStrategies } from '../redux/strategy';
import { fetchDiaryEntries } from '../redux/diary';
import { fetchPerpCOINMBalance, fetchPerpUSDTMBalance, fetchSpotBalance, fetchTrackRecordBingXAllAccounts } from '../redux/account';
import { fetchPositionsCoinM, fetchPositionsUSDTM } from '../redux/position';
import { fetchCandlestickChartData } from '../redux/charts';
import { fetchTicker } from '../redux/ticker';
import { fetchOrdersCoinm, fetchOrdersSpot, fetchOrdersStandard, fetchOrdersUsdtm } from '../redux/order';
import { toast } from 'react-toastify';

export const loadSlicesInOrder = () => async (dispatch) => {
  let toastId;
  let intervalId;

  try {
    // Carga de información mínima
    toastId = toast.info('Loading minimum information', { autoClose: false });
    intervalId = setInterval(() => {
      toast.update(toastId, { render: 'Loading minimum information...', autoClose: false });
    }, 2000);

    await Promise.all([
      dispatch(fetchTicker('ETH-USDT')),
      dispatch(fetchTicker('BTC-USDT'))
    ]);

    clearInterval(intervalId);
    toast.dismiss(toastId);
    toast.success('Minimum information loaded');

    // Carga de información de gráficos
    toastId = toast.info('Loading Charts information', { autoClose: false });
    intervalId = setInterval(() => {
      toast.update(toastId, { render: 'Loading Charts information...', autoClose: false });
    }, 2000);

    await dispatch(fetchCandlestickChartData({
      interval: '1d',
      startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1000).toISOString(), // 1000 días atrás
      endDate: new Date().toISOString()
    }));

    clearInterval(intervalId);
    toast.dismiss(toastId);
    toast.success('Charts information loaded');

    // Carga de información de órdenes
    toastId = toast.info('Loading Orders information', { autoClose: false });
    intervalId = setInterval(() => {
      toast.update(toastId, { render: 'Loading Orders information...', autoClose: false });
    }, 2000);

    await dispatch(fetchOrdersCoinm({ limit: 500, offset: 0 }));
    await dispatch(fetchOrdersSpot({ limit: 500, offset: 0 }));
    await dispatch(fetchOrdersStandard({ limit: 500, offset: 0 }));
    await dispatch(fetchOrdersUsdtm({ limit: 500, offset: 0 }));

    clearInterval(intervalId);
    toast.dismiss(toastId);
    toast.success('Orders information loaded');

    // Carga de información de cuentas
    toastId = toast.info('Loading Account information', { autoClose: false });
    intervalId = setInterval(() => {
      toast.update(toastId, { render: 'Loading Account information...', autoClose: false });
    }, 2000);

    await dispatch(fetchPerpCOINMBalance());
    await dispatch(fetchPerpUSDTMBalance());
    await dispatch(fetchSpotBalance());
    await dispatch(fetchTrackRecordBingXAllAccounts());

    clearInterval(intervalId);
    toast.dismiss(toastId);
    toast.success('Account information loaded');

    // Carga de estrategias
    toastId = toast.info('Loading Strategy information', { autoClose: false });
    intervalId = setInterval(() => {
      toast.update(toastId, { render: 'Loading Strategy information...', autoClose: false });
    }, 2000);

    await dispatch(fetchStrategies({ skip: 0, limit: 10 }));

    clearInterval(intervalId);
    toast.dismiss(toastId);
    toast.success('Strategy information loaded');

    // Carga de entradas del diario
    toastId = toast.info('Loading Diary information', { autoClose: false });
    intervalId = setInterval(() => {
      toast.update(toastId, { render: 'Loading Diary information...', autoClose: false });
    }, 2000);

    await dispatch(fetchDiaryEntries({ skip: 0, limit: 10 }));

    clearInterval(intervalId);
    toast.dismiss(toastId);
    toast.success('Diary information loaded');

    // Carga de posiciones
    toastId = toast.info('Loading Positions information', { autoClose: false });
    intervalId = setInterval(() => {
      toast.update(toastId, { render: 'Loading Positions information...', autoClose: false });
    }, 2000);

    await dispatch(fetchPositionsCoinM());
    await dispatch(fetchPositionsUSDTM());

    clearInterval(intervalId);
    toast.dismiss(toastId);
    toast.success('Positions information loaded');

    // Mensaje final de éxito
    toast.success('All Redux slices loaded successfully');
  } catch (error) {
    clearInterval(intervalId);
    toast.dismiss(toastId);
    toast.error('Error loading slices');
    console.error('Error loading slices:', error);
  }
};
