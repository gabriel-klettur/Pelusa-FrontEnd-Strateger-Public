// Path: strateger-react/src/components/Reloj.js

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Popover } from '@headlessui/react';
import { updateTime } from '../slices/timeSlice';
import { format } from 'date-fns';

const Reloj = ({ direction = 'up' }) => {
  const dispatch = useDispatch();
  const { localTime, chinaTime, usTime, germanyTime } = useSelector((state) => state.time);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(updateTime());
    }, 1000);
    return () => clearInterval(interval);
  }, [dispatch]);

  const formatTime = (time) => format(new Date(time), 'HH:mm:ss');

  const tradingHours = {
    China: { open: '09:30', close: '15:00' },
    US: { open: '09:30', close: '16:00' },
    Germany: { open: '09:00', close: '17:30' }
  };

  const isMarketOpen = (currentTime, market) => {
    const [currentHour, currentMinute] = format(new Date(currentTime), 'HH:mm').split(':');
    const currentTotalMinutes = parseInt(currentHour) * 60 + parseInt(currentMinute);
    
    const [openHour, openMinute] = tradingHours[market].open.split(':');
    const openTotalMinutes = parseInt(openHour) * 60 + parseInt(openMinute);
    
    const [closeHour, closeMinute] = tradingHours[market].close.split(':');
    const closeTotalMinutes = parseInt(closeHour) * 60 + parseInt(closeMinute);

    return currentTotalMinutes >= openTotalMinutes && currentTotalMinutes <= closeTotalMinutes;
  };

  const isMarketPremarketOrAfterHours = (currentTime, market) => {
    const [currentHour, currentMinute] = format(new Date(currentTime), 'HH:mm').split(':');
    const currentTotalMinutes = parseInt(currentHour) * 60 + parseInt(currentMinute);

    const [openHour, openMinute] = tradingHours[market].open.split(':');
    const openTotalMinutes = parseInt(openHour) * 60 + parseInt(openMinute);

    const [closeHour, closeMinute] = tradingHours[market].close.split(':');
    const closeTotalMinutes = parseInt(closeHour) * 60 + parseInt(closeMinute);

    return (
      (currentTotalMinutes >= openTotalMinutes - 60 && currentTotalMinutes < openTotalMinutes) ||
      (currentTotalMinutes > closeTotalMinutes && currentTotalMinutes <= closeTotalMinutes + 120)
    );
  };

  const popoverPosition = direction === 'up' ? 'bottom-full mb-2' : 'top-full mt-2';

  const getColor = (currentTime, market) => {
    if (isMarketOpen(currentTime, market)) return 'text-green-500';
    if (isMarketPremarketOrAfterHours(currentTime, market)) return market === 'US' ? 'text-blue-500' : 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="wrap bg-english_violet-500 rounded-lg p-2 shadow-md">
      <Popover className="relative">
        <Popover.Button className="text-lg font-bold text-white">
          {formatTime(localTime)}
        </Popover.Button>
        <Popover.Panel className={`absolute z-10 p-4 bg-english_violet-400 border border-english_violet-600 rounded-lg shadow-lg ${popoverPosition}`}>
          <div className={`mb-2 ${getColor(chinaTime, 'China')}`}>
            <strong>China: </strong>
            {formatTime(chinaTime)}
          </div>
          <div className={`mb-2 ${getColor(usTime, 'US')}`}>
            <strong>Estados Unidos: </strong>
            {formatTime(usTime)}
          </div>
          <div className={`mb-2 ${getColor(germanyTime, 'Germany')}`}>
            <strong>Alemania: </strong>
            {formatTime(germanyTime)}
          </div>
        </Popover.Panel>
      </Popover>
    </div>
  );
};

export default Reloj;
