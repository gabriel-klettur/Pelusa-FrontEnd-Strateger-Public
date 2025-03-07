import { format } from 'date-fns';

export const formatTime = (time) => format(new Date(time), 'HH:mm:ss');

export const tradingHours = {
    China: { preOpen: '09:00', open: '09:30', close: '15:00', afterClose: '15:30' },
    US: { preOpen: '04:00', open: '09:30', close: '16:00', afterClose: '20:00' },
    UK: { preOpen: '07:00', open: '08:00', close: '16:30', afterClose: null },
    Germany: { preOpen: null, open: '09:00', close: '17:30', afterClose: null },
  };

export const getMarketStatus = (currentTime, market) => {
    const [currentHour, currentMinute] = format(new Date(currentTime), 'HH:mm').split(':');
    const currentTotalMinutes = parseInt(currentHour) * 60 + parseInt(currentMinute);

    const { preOpen, open, close, afterClose } = tradingHours[market];

    const [openHour, openMinute] = open.split(':');
    const openTotalMinutes = parseInt(openHour) * 60 + parseInt(openMinute);

    const [closeHour, closeMinute] = close.split(':');
    const closeTotalMinutes = parseInt(closeHour) * 60 + parseInt(closeMinute);

    if (preOpen) {
      const [preOpenHour, preOpenMinute] = preOpen.split(':');
      const preOpenTotalMinutes = parseInt(preOpenHour) * 60 + parseInt(preOpenMinute);
      if (currentTotalMinutes >= preOpenTotalMinutes && currentTotalMinutes < openTotalMinutes) {
        return '#FACC15'; // Yellow if pre-market
      }
    }

    if (currentTotalMinutes >= openTotalMinutes && currentTotalMinutes <= closeTotalMinutes) {
      return '#16A34A'; // Green if market is open
    }

    if (afterClose) {
      const [afterCloseHour, afterCloseMinute] = afterClose.split(':');
      const afterCloseTotalMinutes = parseInt(afterCloseHour) * 60 + parseInt(afterCloseMinute);
      if (currentTotalMinutes > closeTotalMinutes && currentTotalMinutes <= afterCloseTotalMinutes) {
        return '#FACC15'; // Yellow if after-market
      }
    }

    return '#DC2626'; // Red if market is closed
  };