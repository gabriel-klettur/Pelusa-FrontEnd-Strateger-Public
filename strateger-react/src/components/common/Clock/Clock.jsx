import { useSelector } from 'react-redux';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';

import { formatTime, getMarketStatus, tradingHours } from './utils';
import useClockTimer from './useClockTimer';

const Reloj = ({ direction = 'up' }) => {
  const { localTime, chinaTime, usTime, germanyTime, ukTime } = useSelector((state) => state.time);

  useClockTimer();    // Hook to update Clock time each second
  
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
