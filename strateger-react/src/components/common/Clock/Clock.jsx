import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { updateTime } from 'reduxStore/time/timeSlice';
import { format } from 'date-fns';

const Reloj = ({ direction = 'up' }) => {
  const dispatch = useDispatch();
  const { localTime, chinaTime, usTime, germanyTime, ukTime } = useSelector((state) => state.time);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(updateTime());
    }, 1000);
    return () => clearInterval(interval);
  }, [dispatch]);

  const formatTime = (time) => format(new Date(time), 'HH:mm:ss');

  const tradingHours = {
    China: { preOpen: '09:00', open: '09:30', close: '15:00', afterClose: '15:30' },
    US: { preOpen: '04:00', open: '09:30', close: '16:00', afterClose: '20:00' },
    UK: { preOpen: '07:00', open: '08:00', close: '16:30', afterClose: null },
    Germany: { preOpen: null, open: '09:00', close: '17:30', afterClose: null },
  };

  const getMarketStatus = (currentTime, market) => {
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

  const popoverPosition = direction === 'up' ? 'bottom-full mb-2' : 'top-full';

  return (
    <div className="h-full w-40 flex justify-center items-center hover:bg-african_violet-600">
      <Popover className="relative h-full w-full">
        <PopoverButton className="h-full w-full font-semibold text-african_violet-900 hover:text-white transition-colors duration-300">
          {formatTime(localTime)}
        </PopoverButton>
        <PopoverPanel className={`absolute bg-african_violet-100/95 shadow-lg rounded-sm p-4 space-y-4 z-50 ${popoverPosition}`}>
          {Object.entries(tradingHours).map(([market, times]) => {
            const marketTime = {
              China: chinaTime,
              US: usTime,
              UK: ukTime, 
              Germany: germanyTime,
            }[market];

            return (
              <div key={market} className="mb-2" style={{ color: getMarketStatus(marketTime, market) }}>
                <strong>{market}: </strong>
                {formatTime(marketTime)}
              </div>
            );
          })}
        </PopoverPanel>
      </Popover>
    </div>
  );
};

export default Reloj;
